# Stellar Remit

A simple, non-custodial cross-border payment dApp on Stellar Testnet. Connect a Freighter wallet, fund your account with free testnet XLM via Friendbot, and send payments to any Stellar public key with instant on-chain confirmation.

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

## Setup

### Prerequisites

- Node.js v18+
- [Freighter wallet extension](https://www.freighter.app/) installed in your browser
- Freighter network set to **Testnet** (Settings > Network > Testnet)

### Install & Run

```bash
git clone https://github.com/MayankShastri/stellar-remit.git
cd stellar-remit
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

## Screenshots

### Wallet Connected
![Wallet Connected](docs/screenshots/Wallet%20Connected.png)

### Balance Displayed
![Balance Displayed](docs/screenshots/Balance%20Displayed.png)

### Successful Testnet Transaction
![Transaction Success](docs/screenshots/Successful%20Testnet%20Transaction.png)

### Transaction Result Shown to User
![Transaction Result](docs/screenshots/Transaction%20Result%20Shown%20to%20User.png)

## What's Next

Built as part of the Stellar Journey to Mastery builder program. Current belt: **Level 1 (White Belt)**.

- **Level 2 (Yellow Belt):** Multi-wallet support, Soroban smart contract ([stellar-remit-crowdfund](https://github.com/MayankShastri/stellar-remit-crowdfund))
- **Level 3 (Orange Belt):** Full mini dApp with tests, production hardening
- **Level 4+:** Production MVP, user onboarding, mainnet launch

## License

MIT
