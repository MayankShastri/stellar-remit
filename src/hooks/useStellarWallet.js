import { useState, useEffect, useCallback } from "react";
import {
  checkFreighterInstalled,
  connectWallet,
  getCurrentAddress,
  signTx
} from "../lib/freighter";
import {
  fetchXLMBalance,
  fundWithFriendbot,
  buildPaymentTx,
  submitSignedTx,
  fetchRecentPayments,
  NETWORK_PASSPHRASE
} from "../lib/stellar";

export function useStellarWallet() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState("0");
  const [isInstalled, setIsInstalled] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false);
  const [isFunding, setIsFunding] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);
  const [txResult, setTxResult] = useState(null); // { success: boolean, hash: string|null, error: string|null }

  // Check if Freighter is installed on mount
  useEffect(() => {
    async function init() {
      const installed = await checkFreighterInstalled();
      setIsInstalled(installed);

      if (installed) {
        const savedAddr = await getCurrentAddress();
        if (savedAddr) {
          setAddress(savedAddr);
        }
      }
    }
    init();
  }, []);

  // Fetch balance and payments when address changes
  const loadAccountData = useCallback(async (addr) => {
    if (!addr) return;
    setIsRefreshingBalance(true);

    const balRes = await fetchXLMBalance(addr);
    setBalance(balRes.balance);

    if (balRes.error && !balRes.error.includes("Account not found")) {
      setError(balRes.error);
    } else {
      setError(null);
    }

    const payments = await fetchRecentPayments(addr);
    setRecentPayments(payments);

    setIsRefreshingBalance(false);
  }, []);

  useEffect(() => {
    if (address) {
      loadAccountData(address);
    }
  }, [address, loadAccountData]);

  // Connect wallet
  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    setTxResult(null);

    const res = await connectWallet();
    if (res.error) {
      setError(res.error);
    } else if (res.address) {
      setAddress(res.address);
    }

    setIsConnecting(false);
  };

  // Disconnect wallet
  const disconnect = () => {
    setAddress(null);
    setBalance("0");
    setRecentPayments([]);
    setError(null);
    setTxResult(null);
  };

  // Refresh balance
  const refreshBalance = async () => {
    if (address) {
      await loadAccountData(address);
    }
  };

  // Fund with Friendbot
  const fundAccount = async () => {
    if (!address) return;
    setIsFunding(true);
    setError(null);

    const res = await fundWithFriendbot(address);
    if (res.success) {
      await loadAccountData(address);
    } else {
      setError(res.message);
    }

    setIsFunding(false);
  };

  // Execute payment transaction
  const sendPayment = async ({ recipient, amount, memo }) => {
    if (!address) {
      setError("Please connect your Freighter wallet first.");
      return;
    }

    setIsSending(true);
    setError(null);
    setTxResult(null);

    try {
      // 1. Build transaction
      const buildRes = await buildPaymentTx(address, recipient, amount, memo);
      if (buildRes.error) {
        setError(buildRes.error);
        setIsSending(false);
        return;
      }

      // 2. Sign transaction with Freighter
      const signRes = await signTx(buildRes.xdr, NETWORK_PASSPHRASE, address);
      if (signRes.error) {
        setTxResult({
          success: false,
          hash: null,
          error: signRes.error
        });
        setIsSending(false);
        return;
      }

      // 3. Submit transaction to Horizon
      const submitRes = await submitSignedTx(signRes.signedTxXdr);
      setTxResult(submitRes);

      if (submitRes.success) {
        // Refresh balance & payment history on success
        setTimeout(() => loadAccountData(address), 1000);
      }
    } catch (err) {
      console.error("Unexpected error in sendPayment flow:", err);
      setTxResult({
        success: false,
        hash: null,
        error: err.message || "An unexpected error occurred during payment."
      });
    } finally {
      setIsSending(false);
    }
  };

  return {
    address,
    balance,
    isInstalled,
    isConnecting,
    isRefreshingBalance,
    isFunding,
    isSending,
    error,
    recentPayments,
    txResult,
    connect,
    disconnect,
    refreshBalance,
    fundAccount,
    sendPayment,
    setError,
    clearTxResult: () => setTxResult(null),
  };
}
