import React from "react";
import { useStellarWallet } from "./hooks/useStellarWallet";
import { WalletConnect } from "./components/WalletConnect";
import { BalanceCard } from "./components/BalanceCard";
import { SendForm } from "./components/SendForm";
import { TransactionStatus } from "./components/TransactionStatus";
import { RecentTransactions } from "./components/RecentTransactions";
import { Globe, AlertCircle, ShieldCheck, Zap } from "lucide-react";

export default function App() {
  const {
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
    clearTxResult,
  } = useStellarWallet();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Header / Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white">Stellar Remit</h1>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Testnet
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Simple cross-border XLM payments on Stellar
              </p>
            </div>
          </div>

          <WalletConnect
            address={address}
            isInstalled={isInstalled}
            isConnecting={isConnecting}
            onConnect={connect}
            onDisconnect={disconnect}
          />
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 mt-4 w-full">
          <div className="bg-rose-950/50 border border-rose-800/60 rounded-xl p-3.5 flex items-center justify-between text-rose-200 text-xs">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-white text-xs font-semibold underline ml-4"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {/* Hero Section */}
        <div className="mb-8 bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
              Send XLM Anywhere on Stellar Testnet
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
              Connect your Freighter wallet, request free testnet XLM via Friendbot, and submit fast native payment transactions directly to the Stellar Horizon network.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Non-custodial (Freighter)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Sub-second settlement</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>Horizon API</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Balance & Send Form */}
          <div className="lg:col-span-7 space-y-6">
            <BalanceCard
              address={address}
              balance={balance}
              isRefreshing={isRefreshingBalance}
              isFunding={isFunding}
              onRefresh={refreshBalance}
              onFund={fundAccount}
            />

            <SendForm
              address={address}
              balance={balance}
              isSending={isSending}
              onSendPayment={sendPayment}
              onError={setError}
            />
          </div>

          {/* Right Column: History & Guide */}
          <div className="lg:col-span-5 space-y-6">
            <RecentTransactions
              address={address}
              payments={recentPayments}
            />

            {/* How it Works / Educational Sidebar */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 text-xs space-y-3">
              <h4 className="font-semibold text-slate-200">How Stellar Remit Works</h4>
              <ol className="list-decimal list-inside text-slate-400 space-y-2 leading-relaxed">
                <li>
                  <strong className="text-slate-300">Connect:</strong> Link your Freighter wallet extension set to Stellar Testnet.
                </li>
                <li>
                  <strong className="text-slate-300">Fund:</strong> Use the Friendbot button to receive free testnet XLM.
                </li>
                <li>
                  <strong className="text-slate-300">Build & Sign:</strong> Enter a recipient address (G...) and amount. Freighter prompts you to sign the transaction XDR.
                </li>
                <li>
                  <strong className="text-slate-300">Verify:</strong> View the submitted transaction hash on StellarExpert.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      {/* Transaction Status Modal */}
      <TransactionStatus
        txResult={txResult}
        onClose={clearTxResult}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/30 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>Stellar Remit — Built for Stellar Builder Challenge Level 1 (White Belt)</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://developers.stellar.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              Stellar Docs
            </a>
            <a
              href="https://www.freighter.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              Freighter
            </a>
            <a
              href="https://stellar.expert/explorer/testnet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              Explorer
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
