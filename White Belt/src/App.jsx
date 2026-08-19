import React from "react";
import { useStellarWallet } from "./hooks/useStellarWallet";
import { CanvasBackground } from "./components/CanvasBackground";
import { CornerBrackets } from "./components/CornerBrackets";
import { WalletConnect } from "./components/WalletConnect";
import { BalanceCard } from "./components/BalanceCard";
import { SendForm } from "./components/SendForm";
import { TransactionStatus } from "./components/TransactionStatus";
import { RecentTransactions } from "./components/RecentTransactions";
import { AlertCircle, ArrowRight } from "lucide-react";

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
    <div className="relative min-h-screen bg-[#030303] text-white flex flex-col selection:bg-white/20 selection:text-white antialiased">
      <CanvasBackground />

      <a
        href="#console"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#030303]"
      >
        Skip to content
      </a>

      {/* Floating Nav */}
      <header className="fixed left-0 right-0 top-4 sm:top-5 z-50 px-4">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between rounded-xl border border-white/10 bg-[#070707]/80 p-1.5 backdrop-blur-xl"
          aria-label="Primary navigation"
        >
          <a
            href="#home"
            className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
          >
            <span className="grid size-7 place-items-center rounded-md bg-white text-[#030303] text-xs font-bold font-mono tracking-tighter">
              SR
            </span>
            <span className="text-sm font-medium tracking-tight text-white">
              Stellar Remit
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            <a
              href="#console"
              className="rounded-lg px-3 py-2 text-xs font-medium font-mono text-white bg-white/10 border border-white/15 transition-all duration-300 hover:bg-white/15"
            >
              Console
            </a>
          </div>

          <WalletConnect
            address={address}
            isInstalled={isInstalled}
            isConnecting={isConnecting}
            onConnect={connect}
            onDisconnect={disconnect}
          />
        </nav>
      </header>

      {/* Main Content */}
      <main id="main" className="relative z-10 flex-1">
        {/* Hero Section */}
        <section id="home" className="relative px-4 pt-28 sm:pt-32 pb-6">
          <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#030303]/40 p-6 backdrop-blur-md sm:p-8 lg:p-12 relative">
            <CornerBrackets className="border-white/30" />

            <div className="relative z-10 text-center max-w-3xl mx-auto py-8 sm:py-12">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold font-mono uppercase tracking-[0.18rem] text-zinc-300">
                <span className="size-1.5 rounded-full bg-white animate-pulse-subtle" />
                Stellar Testnet · Non-Custodial
              </div>

              <h1 className="max-w-3xl mx-auto text-5xl font-bold leading-[0.98] tracking-tighter text-white sm:text-6xl md:text-7xl">
                Send XLM anywhere on Stellar
              </h1>

              <p className="mt-7 max-w-xl mx-auto text-base leading-7 text-zinc-400 sm:text-lg">
                Connect your Freighter wallet, request testnet XLM, and submit payment operations on the Stellar network. Non-custodial, open-source, auditable.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row justify-center">
                <a
                  href="#console"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white px-6 py-3.5 text-sm font-semibold text-[#030303] transition-all duration-300 hover:bg-zinc-200 active:translate-y-0"
                >
                  <span className="relative flex items-center gap-2">
                    Launch Console
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-left">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Step 01</p>
                  <p className="mt-1 text-xs text-zinc-300 font-medium">Connect Freighter</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Step 02</p>
                  <p className="mt-1 text-xs text-zinc-300 font-medium">Fund with Friendbot</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Step 03</p>
                  <p className="mt-1 text-xs text-zinc-300 font-medium">Sign & submit XLM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Error Alert */}
        {error && (
          <div className="max-w-6xl mx-auto px-4 mb-6 w-full">
            <div className="relative overflow-hidden rounded-xl bg-[#0a0a0a]/90 border border-red-500/40 p-4 flex items-center justify-between backdrop-blur-md animate-slideDown">
              <CornerBrackets className="border-red-500/30" />
              <div className="flex items-center gap-3 relative z-10">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span className="font-mono text-xs text-zinc-200">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="relative z-10 font-mono text-zinc-500 hover:text-white text-xs font-medium ml-4 transition-colors duration-150"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Console Section */}
        <section id="console" className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <TransactionStatus txResult={txResult} onClose={clearTxResult} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
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

              <div>
                <RecentTransactions
                  address={address}
                  payments={recentPayments}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 pb-6 pt-4">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#050505]/80 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-md bg-white text-[#030303] text-xs font-bold font-mono tracking-tighter">
                  SR
                </span>
                <span className="text-lg font-medium tracking-tight text-white">
                  Stellar Remit
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">
                Non-custodial cross-border payment dispatcher built for the Stellar Builder Challenge. Powered by Freighter API and Stellar SDK.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16rem] text-zinc-500">
                Resources
              </h3>
              <div className="mt-4 space-y-3 text-sm text-zinc-400">
                <a href="https://developers.stellar.org/" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                  Stellar Developers
                </a>
                <a href="https://www.freighter.app/" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                  Freighter Wallet
                </a>
                <a href="https://stellar.expert/explorer/testnet" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                  StellarExpert
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16rem] text-zinc-500">
                App
              </h3>
              <div className="mt-4 space-y-3 text-sm text-zinc-400">
                <a href="#console" className="block transition-colors hover:text-white">
                  Console
                </a>
                <a href="#home" className="block transition-colors hover:text-white">
                  Back to Top
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 font-mono text-xs text-zinc-600 sm:flex-row">
            <p>© 2026 Stellar Remit · Stellar Builder Challenge</p>
            <div className="flex gap-4">
              <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-300">
                Stellar.org
              </a>
              <a href="https://github.com/MayankShastri/stellar-remit" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-zinc-300">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
