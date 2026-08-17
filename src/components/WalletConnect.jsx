import React from "react";
import { Wallet, LogOut, Download, AlertCircle } from "lucide-react";

export function WalletConnect({
  address,
  isInstalled,
  isConnecting,
  onConnect,
  onDisconnect,
}) {
  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 6)}`;
  };

  if (!isInstalled) {
    return (
      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-amber-200">
          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <h4 className="font-semibold text-sm">Freighter Wallet Not Detected</h4>
            <p className="text-xs text-amber-300/80">
              Install the Freighter browser extension to interact with Stellar Testnet.
            </p>
          </div>
        </div>
        <a
          href="https://www.freighter.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Download className="w-4 h-4" />
          Install Freighter
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <Wallet className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-medium text-slate-400">Wallet Connection</h2>
          {address ? (
            <p className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {formatAddress(address)}
            </p>
          ) : (
            <p className="text-xs text-slate-500 mt-0.5">Not connected</p>
          )}
        </div>
      </div>

      {address ? (
        <button
          onClick={onDisconnect}
          className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Disconnect
        </button>
      ) : (
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Wallet className="w-4 h-4" />
          {isConnecting ? "Connecting..." : "Connect Freighter"}
        </button>
      )}
    </div>
  );
}
