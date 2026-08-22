import {
  Horizon,
  TransactionBuilder,
  Operation,
  Asset,
  Memo,
  Networks,
  BASE_FEE
} from "@stellar/stellar-sdk";

export const HORIZON_TESTNET_URL = "https://horizon-testnet.stellar.org";
export const NETWORK_PASSPHRASE = Networks.TESTNET;

export const server = new Horizon.Server(HORIZON_TESTNET_URL);

/**
 * Fetches the XLM balance for a given Stellar testnet address.
 * @param {string} address - Public key
 * @returns {Promise<{ balance: string, rawBalances: Array, error: string|null }>}
 */
export async function fetchXLMBalance(address) {
  try {
    const account = await server.loadAccount(address);
    const nativeBalance = account.balances.find(
      (b) => b.asset_type === "native"
    );

    return {
      balance: nativeBalance ? nativeBalance.balance : "0.0000000",
      rawBalances: account.balances,
      error: null,
    };
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return {
        balance: "0.0000000",
        rawBalances: [],
        error: "Account not found on testnet. Fund it using Friendbot below!",
      };
    }
    console.error("Error fetching XLM balance:", err);
    return {
      balance: "0.0000000",
      rawBalances: [],
      error: err.message || "Failed to fetch account balance.",
    };
  }
}

/**
 * Request testnet XLM funding via Friendbot.
 * @param {string} address - Public key
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function fundWithFriendbot(address) {
  try {
    const response = await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(address)}`);
    if (response.ok) {
      return { success: true, message: "Successfully funded account with testnet XLM!" };
    } else {
      const data = await response.json().catch(() => ({}));
      return { success: false, message: data.detail || "Friendbot funding failed." };
    }
  } catch (err) {
    return { success: false, message: err.message || "Failed to connect to Friendbot." };
  }
}

/**
 * Builds an unsigned XLM payment transaction XDR.
 * @param {string} senderAddress - Public key of sender
 * @param {string} recipientAddress - Public key of recipient
 * @param {string} amount - Amount of XLM in string format (e.g. "10")
 * @param {string} [memo] - Optional text memo
 * @returns {Promise<{ xdr: string|null, error: string|null }>}
 */
export async function buildPaymentTx(senderAddress, recipientAddress, amount, memo = "") {
  try {
    const sourceAccount = await server.loadAccount(senderAddress);
    let fee = BASE_FEE;

    try {
      fee = await server.fetchBaseFee();
    } catch {
      fee = BASE_FEE;
    }

    let txBuilder = new TransactionBuilder(sourceAccount, {
      fee: fee.toString(),
      networkPassphrase: NETWORK_PASSPHRASE,
    }).addOperation(
      Operation.payment({
        destination: recipientAddress,
        asset: Asset.native(),
        amount: amount.toString(),
      })
    ).setTimeout(180);

    if (memo && memo.trim() !== "") {
      txBuilder = txBuilder.addMemo(Memo.text(memo.trim()));
    }

    const tx = txBuilder.build();
    const xdr = tx.toXDR();

    return { xdr, error: null };
  } catch (err) {
    console.error("Error building payment transaction:", err);
    let errMsg = err.message || "Failed to build transaction.";
    if (err.response && err.response.status === 404) {
      errMsg = "Sender account does not exist on testnet. Please fund it first.";
    }
    return { xdr: null, error: errMsg };
  }
}

/**
 * Submits a signed transaction XDR to Stellar Horizon testnet.
 * @param {string} signedXdr - Signed transaction XDR base64
 * @returns {Promise<{ success: boolean, hash: string|null, error: string|null }>}
 */
export async function submitSignedTx(signedXdr) {
  try {
    const tx = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE);
    const result = await server.submitTransaction(tx);

    return {
      success: true,
      hash: result.hash,
      error: null,
    };
  } catch (err) {
    console.error("Error submitting transaction to Horizon:", err);
    let errorMessage = "Transaction failed on network.";

    if (err.response && err.response.data && err.response.data.extras) {
      const codes = err.response.data.extras.result_codes;
      if (codes) {
        errorMessage = `Transaction error: ${codes.transaction} (Operations: ${codes.operations ? codes.operations.join(", ") : "none"})`;
      }
    } else if (err.message) {
      errorMessage = err.message;
    }

    return {
      success: false,
      hash: null,
      error: errorMessage,
    };
  }
}

/**
 * Fetches recent payments for a given Stellar address.
 * @param {string} address - Public key
 * @returns {Promise<Array>}
 */
export async function fetchRecentPayments(address) {
  try {
    const response = await server.payments().forAccount(address).limit(10).order("desc").call();
    return response.records.map((p) => {
      const isSender = p.from === address;
      return {
        id: p.id,
        type: p.type,
        amount: p.amount || (p.starting_balance ? p.starting_balance : "N/A"),
        asset: p.asset_type === "native" ? "XLM" : p.asset_code || "Asset",
        from: p.from || p.funder || "N/A",
        to: p.to || p.account || "N/A",
        isSender,
        createdAt: p.created_at,
        transactionHash: p.transaction_hash,
      };
    });
  } catch (err) {
    console.error("Error fetching recent payments:", err);
    return [];
  }
}
