import React, { useEffect, useCallback } from "react";
import { CheckCircle2, XCircle, ExternalLink, X } from "lucide-react";
import { CornerBrackets } from "./CornerBrackets";

export function TransactionStatus({ txResult, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (txResult) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [txResult, handleKeyDown]);

  if (!txResult) return null;

  const { success, hash, error } = txResult;

  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-8 animate-slideDown"
      style={{
        border: `1px solid ${success ? "rgba(255,255,255,0.12)" : "rgba(239,68,68,0.2)"}`,
      }}
    >
      <CornerBrackets className="border-white/15" />

      <div className="bg-[#0a0a0a]/90 backdrop-blur-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {success ? (
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold text-white">
                {success ? "Payment Successfully Submitted" : "Transaction Failed"}
              </h3>
              <p className="text-[11px] font-mono text-zinc-400">
                {success
                  ? "Incorporated into the Stellar ledger"
                  : error || "Rejected or cancelled"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-500 hover:text-white transition-colors rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success && hash && (
          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3 mb-4">
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
              Transaction Hash
            </label>
            <p className="text-xs font-mono text-emerald-400 break-all select-all leading-relaxed">
              {hash}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3">
          {success && hash && (
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white px-4 py-2.5 text-xs font-semibold font-mono text-[#030303] transition-all duration-300 hover:bg-zinc-200"
            >
              <span>View on Explorer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-mono text-zinc-300 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
