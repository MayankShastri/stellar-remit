import React from "react";
import { CheckCircle2, XCircle, ExternalLink, X } from "lucide-react";

export function TransactionStatus({ txResult, onClose }) {
  if (!txResult) return null;

  const { success, hash, error } = txResult;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          {success ? (
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8" />
            </div>
          )}

          <h3 className="text-lg font-bold text-white mb-1">
            {success ? "Transaction Submitted Successfully!" : "Transaction Failed"}
          </h3>

          <p className="text-xs text-slate-400 mb-6">
            {success
              ? "Your XLM payment has been included in a testnet block and confirmed."
              : error || "The transaction was cancelled or rejected by the Stellar network."}
          </p>

          {success && hash && (
            <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-6 text-left">
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">
                Transaction Hash
              </label>
              <p className="text-xs font-mono text-emerald-400 break-all select-all">
                {hash}
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 w-full">
            {success && hash && (
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <span>View on Explorer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium py-2.5 px-4 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
