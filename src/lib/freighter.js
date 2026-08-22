import {
  isConnected,
  requestAccess,
  getAddress,
  signTransaction
} from "@stellar/freighter-api";

/**
 * Checks if the Freighter browser extension is installed.
 * @returns {Promise<boolean>}
 */
export async function checkFreighterInstalled() {
  try {
    const res = await isConnected();
    if (typeof res === "boolean") return res;
    if (res && typeof res.isConnected === "boolean") return res.isConnected;
    return !!res;
  } catch (err) {
    console.error("Error checking Freighter installation:", err);
    return false;
  }
}

/**
 * Prompts the user to connect their Freighter wallet.
 * @returns {Promise<{ address: string|null, error: string|null }>}
 */
export async function connectWallet() {
  try {
    const installed = await checkFreighterInstalled();
    if (!installed) {
      return { address: null, error: "Freighter wallet is not installed in your browser." };
    }

    const res = await requestAccess();
    if (!res) {
      return { address: null, error: "Failed to connect to Freighter." };
    }

    if (res.error) {
      return { address: null, error: typeof res.error === "string" ? res.error : res.error.message || "Connection rejected" };
    }

    const address = res.address || (typeof res === "string" ? res : null);
    if (!address) {
      return { address: null, error: "No public key returned from wallet." };
    }

    return { address, error: null };
  } catch (err) {
    console.error("Error connecting wallet:", err);
    return { address: null, error: err.message || "User denied wallet access." };
  }
}

/**
 * Gets the current address from Freighter.
 * @returns {Promise<string|null>}
 */
export async function getCurrentAddress() {
  try {
    const res = await getAddress();
    if (!res) return null;
    if (typeof res === "string") return res;
    if (res.address) return res.address;
    return null;
  } catch (err) {
    console.error("Error getting address:", err);
    return null;
  }
}

/**
 * Prompts Freighter to sign a built transaction XDR.
 * @param {string} xdr - Base64 transaction XDR
 * @param {string} networkPassphrase - Stellar network passphrase (e.g. Networks.TESTNET)
 * @param {string} userAddress - Source account address
 * @returns {Promise<{ signedTxXdr: string|null, error: string|null }>}
 */
export async function signTx(xdr, networkPassphrase, userAddress) {
  try {
    const res = await signTransaction(xdr, {
      networkPassphrase,
      address: userAddress,
    });

    if (!res) {
      return { signedTxXdr: null, error: "No response from wallet signing." };
    }

    if (res.error) {
      return {
        signedTxXdr: null,
        error: typeof res.error === "string" ? res.error : res.error.message || "Signing was cancelled or failed."
      };
    }

    const signedTxXdr = res.signedTxXdr || (typeof res === "string" ? res : null);
    if (!signedTxXdr) {
      return { signedTxXdr: null, error: "No signed XDR returned." };
    }

    return { signedTxXdr, error: null };
  } catch (err) {
    console.error("Error signing transaction with Freighter:", err);
    return { signedTxXdr: null, error: err.message || "Failed to sign transaction with wallet." };
  }
}
