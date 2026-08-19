import React, { useState } from "react";
import { Send, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";
import { CornerBrackets } from "./CornerBrackets";

export function SendForm({
  address,
  balance,
  isSending,
  onSendPayment,
  onError,
}) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const parsedBalance = parseFloat(balance) || 0;

  const handleQuickAmount = (fraction) => {
    const maxAvailable = Math.max(0, parsedBalance - 1);
    if (fraction === 1) {
      setAmount(maxAvailable > 0 ? maxAvailable.toFixed(4) : "0");
    } else {
      setAmount((maxAvailable * fraction).toFixed(4));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address) {
      onError("Please connect your Freighter wallet first.");
      return;
    }

    const trimmedRecipient = recipient.trim();
    if (
      !trimmedRecipient ||
      !trimmedRecipient.startsWith("G") ||
      trimmedRecipient.length !== 56
    ) {
      onError(
        "Please enter a valid 56-character Stellar public key starting with 'G'."
      );
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      onError("Please specify a positive XLM payment amount.");
      return;
    }

    if (parsedAmount > parsedBalance) {
      onError(`Insufficient XLM balance. Available: ${balance} XLM.`);
      return;
    }

    onSendPayment({
      recipient: trimmedRecipient,
      amount: amount.toString(),
      memo: memo.trim(),
    });
  };

  const isValidPublicKey =
    recipient.trim().startsWith("G") && recipient.trim().length === 56;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070707]/80 p-6 sm:p-8">
      <CornerBrackets className="border-white/20" />

      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-white/70" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18rem] text-zinc-400">
            02 / Payment Dispatcher
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          <span>Non-Custodial</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-mono text-xs uppercase tracking-[0.14rem] text-zinc-400">
              Recipient Stellar Address
            </label>
            {isValidPublicKey && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400">
                <UserCheck className="w-3.5 h-3.5" />
                Valid G-Key
              </span>
            )}
          </div>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="e.g. GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN"
            disabled={!address || isSending}
            className="w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-mono text-white placeholder:text-zinc-600 outline-none transition-all duration-150 hover:border-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/10 disabled:opacity-40"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-mono text-xs uppercase tracking-[0.14rem] text-zinc-400">
              Payment Amount
            </label>
            {address && (
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => handleQuickAmount(0.25)}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-zinc-400 hover:border-white/30 hover:bg-white/[0.08] hover:text-white transition-colors"
                >
                  25%
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAmount(0.5)}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-zinc-400 hover:border-white/30 hover:bg-white/[0.08] hover:text-white transition-colors"
                >
                  50%
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAmount(1)}
                  className="rounded-md border border-white/15 bg-white/[0.06] px-2 py-0.5 text-zinc-300 hover:border-white/40 hover:bg-white/[0.12] hover:text-white transition-colors font-medium"
                >
                  MAX
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0.0000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0000"
              disabled={!address || isSending}
              className="w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-mono text-white placeholder:text-zinc-600 outline-none transition-all duration-150 hover:border-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/10 disabled:opacity-40"
            />
            <span className="absolute right-4 top-3 font-mono text-xs text-zinc-500 font-medium">
              XLM
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-mono text-xs uppercase tracking-[0.14rem] text-zinc-400">
              Transaction Memo
            </label>
            <span className="font-mono text-[10px] text-zinc-600">
              {memo.length}/28 bytes · optional
            </span>
          </div>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="e.g. invoice-4092 or remittance"
            maxLength={28}
            disabled={!address || isSending}
            className="w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-150 hover:border-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/10 disabled:opacity-40"
          />
        </div>

        <div className="rounded-md border border-white/10 bg-white/[0.02] p-3.5 text-xs font-mono flex items-center justify-between text-zinc-400">
          <span>Estimated Network Fee</span>
          <span className="text-zinc-200">0.00001 XLM (100 stroops)</span>
        </div>

        <button
          type="submit"
          disabled={!address || isSending}
          className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white px-5 py-3.5 text-sm font-semibold font-mono text-[#030303] transition-all duration-300 hover:bg-zinc-200 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.99]"
        >
          {isSending ? (
            <>
              <div className="size-4 rounded-full border-2 border-zinc-400 border-t-[#030303] animate-spin" />
              <span>Signing via Freighter...</span>
            </>
          ) : (
            <>
              <span>Sign &amp; Submit Payment</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
