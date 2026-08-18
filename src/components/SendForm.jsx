import React, { useState } from "react";
import { Send, AlertCircle, ArrowRight, UserCheck } from "lucide-react";

export function SendForm({
  address,
  balance,
  isSending,
  onSendPayment,
  onError,
}) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address) {
      onError("Please connect your wallet first.");
      return;
    }

    const trimmedRecipient = recipient.trim();
    if (!trimmedRecipient || !trimmedRecipient.startsWith("G") || trimmedRecipient.length !== 56) {
      onError("Please enter a valid Stellar public key starting with 'G' (56 characters).");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      onError("Please enter a valid positive XLM amount.");
      return;
    }

    if (parsedAmount > parseFloat(balance)) {
      onError(`Insufficient XLM balance. Available: ${balance} XLM.`);
      return;
    }

    onSendPayment({
      recipient: trimmedRecipient,
      amount: amount.toString(),
      memo: memo.trim(),
    });
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Send className="w-5 h-5 text-indigo-400" />
        <h3 className="text-base font-semibold text-white">Send XLM Payment</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipient Address */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Recipient Public Key (Stellar Address)
          </label>
          <div className="relative">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="G..."
              disabled={!address || isSending}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
            />
            {recipient.startsWith("G") && recipient.length === 56 && (
              <UserCheck className="w-4 h-4 text-emerald-400 absolute right-3 top-3" />
            )}
          </div>
        </div>

        {/* Amount */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Amount (XLM)
            </label>
            {address && (
              <button
                type="button"
                onClick={() => setAmount((parseFloat(balance) - 1 > 0 ? parseFloat(balance) - 1 : 0).toString())}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Max ({Math.max(0, parseFloat(balance) - 1).toFixed(2)} XLM)
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0.0000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              disabled={!address || isSending}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
            />
            <span className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400">XLM</span>
          </div>
        </div>

        {/* Optional Memo */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Memo <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="e.g. Dinner split, Invoice #102"
            maxLength={28}
            disabled={!address || isSending}
            className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!address || isSending}
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all disabled:text-slate-400 disabled:shadow-none"
        >
          {isSending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Signing & Submitting Transaction...</span>
            </>
          ) : (
            <>
              <span>Send XLM via Freighter</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
