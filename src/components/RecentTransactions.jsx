import React from "react";
import { History, ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react";
import { CornerBrackets } from "./CornerBrackets";

export function RecentTransactions({ address, payments }) {
  const formatShortAddr = (addr) => {
    if (!addr || addr === "N/A") return "N/A";
    return `${addr.substring(0, 5)}...${addr.substring(addr.length - 5)}`;
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const hasPayments = address && payments.length > 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070707]/80 p-6 sm:p-8">
      <CornerBrackets className="border-white/20" />

      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-white/70" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18rem] text-zinc-400">
            03 / Transaction Log
          </span>
        </div>
        <span className="font-mono text-[10px] text-zinc-500 border border-white/10 rounded px-2 py-0.5">
          Testnet
        </span>
      </div>

      <div className="relative z-10 space-y-0">
        {!hasPayments ? (
          <div className="text-center py-10 border border-white/5 bg-white/[0.02] rounded-xl">
            <History className="w-5 h-5 text-zinc-600 mx-auto mb-3" />
            <p className="font-mono text-xs text-zinc-500">
              {address
                ? "No recent payments found for this account."
                : "Connect wallet to view transaction history."}
            </p>
          </div>
        ) : (
          payments.map((p, index) => {
            const isSent = p.isSender;
            return (
              <div
                key={p.id || p.transactionHash}
                className="flex items-center justify-between py-3.5 border-t border-white/5 first:border-t-0 transition-colors hover:bg-white/[0.02] px-2 -mx-2 rounded"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      isSent
                        ? "bg-white/[0.03] text-zinc-300 border-white/10"
                        : "bg-white/[0.06] text-white border-white/20"
                    }`}
                  >
                    {isSent ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-mono text-xs text-zinc-200 font-medium">
                      {isSent ? "Sent to" : "Received from"}{" "}
                      <span className="text-white">
                        {formatShortAddr(isSent ? p.to : p.from)}
                      </span>
                    </p>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {formatDate(p.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSent ? "text-zinc-400" : "text-white"
                    }`}
                  >
                    {isSent ? "-" : "+"}
                    {parseFloat(p.amount).toFixed(2)} XLM
                  </span>
                  {p.transactionHash && (
                    <a
                      href={`https://stellar.expert/explorer/testnet/tx/${p.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-zinc-600 hover:text-zinc-300 transition-colors rounded"
                      title="View on StellarExpert"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
