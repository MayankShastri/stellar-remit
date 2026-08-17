import React from "react";
import { RefreshCw, Coins, PlusCircle, ExternalLink } from "lucide-react";

export function BalanceCard({
  address,
  balance,
  isRefreshing,
  isFunding,
  onRefresh,
  onFund,
}) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-indigo-400 font-medium text-xs tracking-wider uppercase">
          <Coins className="w-4 h-4" />
          <span>Testnet XLM Balance</span>
        </div>
        {address && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
            title="Refresh balance"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-indigo-400" : ""}`} />
          </button>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white tracking-tight font-mono">
            {address ? parseFloat(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 7 }) : "0.00"}
          </span>
          <span className="text-lg font-semibold text-indigo-400">XLM</span>
        </div>
        {address && (
          <p className="text-xs text-slate-400 mt-1 font-mono truncate">
            {address}
          </p>
        )}
      </div>

      {address && (
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-700/50">
          <button
            onClick={onFund}
            disabled={isFunding}
            className="flex-1 bg-slate-700/80 hover:bg-slate-700 text-indigo-300 hover:text-indigo-200 text-xs font-medium py-2 px-3 rounded-xl flex items-center justify-center gap-2 border border-slate-600/50 transition-all disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            {isFunding ? "Funding via Friendbot..." : "Get Free Testnet XLM (Friendbot)"}
          </button>

          <a
            href={`https://stellar.expert/explorer/testnet/account/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl transition-colors"
            title="View account on StellarExpert Explorer"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}
