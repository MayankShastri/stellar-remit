# Stellar Remit

A simple, non-custodial cross-border payment dApp on Stellar Testnet. Connect a Freighter wallet, fund your account with free testnet XLM via Friendbot, and send payments to any Stellar public key with instant on-chain confirmation.

## Problem

Traditional cross-border remittances involve high fees, multi-day settlement, and opaque intermediary chains. Stellar settles in 3-5 seconds for sub-cent fees, but most tooling is either too technical (raw CLI/wallet usage) or too narrow (single-purpose demos). Stellar Remit starts from "send money to someone else, simply" and is built to evolve into a real remittance/group-payment tool across the Stellar Builder Challenge belt levels.

## Features

- **Wallet Connect / Disconnect** — Freighter browser extension, testnet only
- **XLM Balance Display** — real-time balance fetched from Horizon testnet
- **Friendbot Faucet** — one-click testnet XLM funding for new/empty accounts
- **Send XLM Payments** — build, sign (via Freighter), and submit native payment transactions
- **Transaction Feedback** — success/failure modal with transaction hash and StellarExpert explorer link
- **Recent Payments** — last 10 payment operations for the connected account

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 6, Tailwind CSS 4 |
| Icons | Lucide React |
| Wallet SDK | `@stellar/freighter-api` v6 |
| Stellar SDK | `@stellar/stellar-sdk` v16 |
| Network | Stellar Testnet (`https://horizon-testnet.stellar.org`) |

## Architecture

```
[Browser] ──> [Freighter Extension] ──> Signs XDR (private keys never leave extension)
   │
   └──> [Stellar Horizon API] ──> Reads balances / submits signed transactions
```

## Setup

### Prerequisites

- Node.js v18+
- [Freighter wallet extension](https://www.freighter.app/) installed in your browser
- Freighter network set to **Testnet** (Settings > Network > Testnet)

### Install & Run

```bash
git clone https://github.com/YOUR_USERNAME/stellar-remit.git
cd stellar-remit
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy the `dist/` folder to any static host (GitHub Pages, Vercel, Netlify).

## Screenshots

> Replace the placeholder paths below with actual screenshot files after running the app.

### Wallet Connected
![Wallet Connected](docs/screenshots/01-wallet-connected.png)

### Balance Displayed
![Balance Displayed](docs/screenshots/02-balance-displayed.png)

### Successful Testnet Transaction
![Transaction Success](docs/screenshots/03-transaction-success.png)

### Transaction Result Shown to User
![Transaction Result](docs/screenshots/04-transaction-result.png)

## What's Next

Built as part of the Stellar Journey to Mastery builder program. Current belt: **Level 1 (White Belt)**.

- **Level 2 (Yellow Belt):** Multi-wallet support (Albedo, xBull), first Soroban smart contract (escrow/split-holding logic)
- **Level 3 (Orange Belt):** Full mini dApp with tests, production hardening, Anchor-facing idea pitch for remittance/group settlement
- **Level 4+:** Production MVP, user onboarding, mainnet launch

## License

MIT
