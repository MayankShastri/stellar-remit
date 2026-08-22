import React, { useState } from "react";
import { Wallet, LogOut, Download, AlertCircle, Check, Copy } from "lucide-react";

export function WalletConnect({
  address,
  isInstalled,
  isConnecting,
  onConnect,
  onDisconnect,
}) {
  const [copied, setCopied] = useState(false);

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 6)}`;
  };

  const handleCopy = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isInstalled) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-zinc-900/90 px-3.5 py-2 text-xs backdrop-blur-md">
        <div className="flex items-center gap-2 text-zinc-300">
          <AlertCircle className="w-4 h-4 text-zinc-400 shrink-0" />
          <span className="font-mono text-xs hidden sm:inline text-zinc-300">
            Freighter extension required
          </span>
        </div>
        <a
          href="https://www.freighter.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white text-[#030303] font-mono font-medium px-3 py-1 text-xs transition-all duration-200 hover:bg-zinc-200"
        >
          <Download className="w-3.5 h-3.5" />
          Install
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {address ? (
        <>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-mono backdrop-blur-md">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse-subtle shrink-0" />
            <span className="text-zinc-300">{formatAddress(address)}</span>
            <button
              onClick={handleCopy}
              className="ml-1 p-1 text-zinc-500 hover:text-white transition-colors duration-150"
              title="Copy full public key"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <button
            onClick={onDisconnect}
            className="group inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-mono text-zinc-400 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
            title="Disconnect wallet"
          >
            <LogOut className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <span className="hidden sm:inline">Disconnect</span>
          </button>
        </>
      ) : (
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white px-4 py-2 text-xs font-semibold font-mono text-[#030303] transition-all duration-300 hover:bg-zinc-200 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
        >
          <Wallet className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-6" />
          <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
        </button>
      )}
    </div>
  );
}
