import React from "react";
import { History, ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react";

export function RecentTransactions({ address, payments }) {
  if (!address || payments.length === 0) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-semibold text-white">Recent Payments</h3>
        </div>
        <p className="text-xs text-slate-500 text-center py-8">
          {address ? "No recent payments found for this account on testnet." : "Connect wallet to view transaction history."}
        </p>
      </div>
    );
  }

  const formatShortAddr = (addr) => {
    if (!addr || addr === "N/A") return "N/A";
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
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

  return (
    <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-semibold text-white">Recent Payments</h3>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Testnet</span>
      </div>

      <div className="space-y-2.5">
        {payments.map((p) => {
          const isSent = p.isSender;
          return (
            <div
              key={p.id || p.transactionHash}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isSent
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}
                >
                  {isSent ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownLeft className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">
                      {isSent ? "Sent to" : "Received from"} {formatShortAddr(isSent ? p.to : p.from)}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {formatDate(p.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p
                    className={`text-xs font-mono font-bold ${
                      isSent ? "text-rose-400" : "text-emerald-400"
                    }`}
                  >
                    {isSent ? "-" : "+"}{parseFloat(p.amount).toFixed(2)} XLM
                  </p>
                </div>

                {p.transactionHash && (
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${p.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
                    title="View transaction on StellarExpert"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
