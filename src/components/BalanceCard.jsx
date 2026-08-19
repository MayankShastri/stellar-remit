import React, { useState, useEffect } from "react";
import { RefreshCw, Coins, ExternalLink, Copy, Check, Sparkles } from "lucide-react";
import { CornerBrackets } from "./CornerBrackets";

export function BalanceCard({
  address,
  balance,
  isRefreshing,
  isFunding,
  onRefresh,
  onFund,
}) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      setBalanceVisible(false);
      const timer = setTimeout(() => setBalanceVisible(true), 150);
      return () => clearTimeout(timer);
    }
  }, [isRefreshing, balance]);

  const handleCopy = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parsedBalance = parseFloat(balance) || 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070707]/80 p-6 sm:p-8">
      <CornerBrackets className="border-white/20" />

      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-white/70" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18rem] text-zinc-400">
            01 / Account Balance
          </span>
        </div>
        {address && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="group flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-xs text-zinc-400 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
            title="Refresh balance from Horizon API"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}
            />
            <span className="text-[11px] hidden sm:inline">Sync</span>
          </button>
        )}
      </div>

      <div className="relative z-10 my-4">
        <div
          className={`flex items-baseline gap-3 transition-opacity duration-150 ${
            balanceVisible ? "opacity-100" : "opacity-40"
          }`}
        >
          <span className="text-6xl md:text-7xl font-bold font-mono tabular-nums tracking-tighter text-white">
            {address
              ? parsedBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 7,
                })
              : "0.00"}
          </span>
          <span className="font-mono text-lg font-medium text-zinc-500">XLM</span>
        </div>

        {address ? (
          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-xs text-zinc-500 truncate max-w-[260px] sm:max-w-md">
              {address}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Copy address"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        ) : (
          <p className="font-mono text-xs text-zinc-600 mt-3">
            Connect wallet to inspect live testnet reserves.
          </p>
        )}
      </div>

      {address && (
        <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={onFund}
            disabled={isFunding}
            className="group flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white px-5 py-3 text-xs font-semibold font-mono text-[#030303] transition-all duration-300 hover:bg-zinc-200 disabled:opacity-50 active:scale-[0.99]"
          >
            {isFunding ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Requesting Friendbot XLM...</span>
              </>
            ) : (
              <>
                <Coins className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
                <span>Fund 10,000 Testnet XLM</span>
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              </>
            )}
          </button>

          <a
            href={`https://stellar.expert/explorer/testnet/account/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 text-zinc-400 hover:text-white font-mono text-xs py-3 px-3.5 transition-all duration-200"
            title="Inspect account on StellarExpert"
          >
            <span>Explorer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
