# 🌐 Stellar Remit — Level 1 (White Belt) Submission

**Stellar Remit** is a lightweight, non-custodial cross-border payment web application built on the **Stellar Testnet**. It enables users to connect their Freighter wallet, check real-time XLM balances, fund accounts using Friendbot, and send fast XLM payments directly to any Stellar public key with immediate transaction verification.

---

## 🎯 Problem Statement & Strategic Scope

Traditional cross-border remittances are plagued by high fees, slow multi-day settlements, and lack of transparency. **Stellar Remit** solves this by leveraging Stellar's fast ledger finality (3-5 seconds) and sub-cent transaction fees.

### Belt Progression Roadmap (Level 1 → Level 7)
- **⚪️ Level 1 (White Belt):** Core wallet connection, testnet balance fetching, native payment transaction building/signing, and Horizon submission.
- **🟡 Level 2 (Yellow Belt):** Multi-wallet support (Albedo, xBull), Soroban smart contract escrow & time-locked payments.
- **🟠 Level 3 (Orange Belt):** Anchor integration for fiat on/off-ramps (SEP-24 / SEP-31) to target real remittance flows.
- **🟢 Level 4–7 (Green to Master):** Production MVP on Mainnet with active user onboarding, audit, and startup track grants.

---

## ✨ Features & Requirements Met

- [x] **Wallet Setup:** Integrated with Freighter Wallet on Stellar Testnet.
- [x] **Wallet Connection:** Connect and disconnect wallet with status indicator and address formatting.
- [x] **Balance Handling:** Fetch real-time XLM balance via Horizon API (`https://horizon-testnet.stellar.org`).
- [x] **Testnet Faucet:** One-click account funding via Friendbot for new/empty testnet accounts.
- [x] **Transaction Flow:** Build, sign via Freighter extension, and submit XLM native payment operations to Horizon.
- [x] **Transaction Feedback:** Real-time success/failure feedback displaying the base64 signed XDR, transaction hash, and direct link to StellarExpert Explorer.
- [x] **Recent History:** Display recent payment operations for the connected account.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 + Lucide Icons
- **Wallet SDK:** `@stellar/freighter-api` (v6)
- **Stellar SDK:** `@stellar/stellar-sdk` (v16)
- **Network:** Stellar Testnet (`https://horizon-testnet.stellar.org`)

```
[ User Browser ]
      │
      ├──> [ Freighter Extension ]  ──> Signs Transaction XDR (No Private Keys Exposed)
      │
      └──> [ Stellar Horizon API ] ──> Reads Balances / Submits Signed Payment Tx
```

---

## 🚀 Local Setup Instructions

### Prerequisites
1. **Node.js**: v18 or higher (v24 recommended).
2. **Freighter Wallet Extension**: Installed in your browser ([Download Freighter](https://www.freighter.app/)).
3. **Switch Freighter to Testnet**: Open Freighter settings -> Network -> Select **Testnet**.

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/stellar-remit.git
   cd stellar-remit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📸 Screenshots & Verification Checklist

*(Note: Replace placeholder image paths with actual screenshots after running the app)*

### 1. Wallet Connected State
![Wallet Connected](https://raw.githubusercontent.com/placeholder/stellar-remit/main/docs/screenshots/01-wallet-connected.png)
> *Shows Freighter wallet connected with address `G...` displayed.*

### 2. Balance Displayed & Friendbot Funding
![Balance Displayed](https://raw.githubusercontent.com/placeholder/stellar-remit/main/docs/screenshots/02-balance-displayed.png)
> *Shows live XLM balance fetched from Stellar Testnet Horizon server.*

### 3. Payment Form & Freighter Signing Prompt
![Transaction Sign Prompt](https://raw.githubusercontent.com/placeholder/stellar-remit/main/docs/screenshots/03-freighter-signing.png)
> *Shows destination address input, XLM amount, and Freighter extension popup asking user to sign.*

### 4. Successful Testnet Transaction & Hash Result
![Successful Transaction](https://raw.githubusercontent.com/placeholder/stellar-remit/main/docs/screenshots/04-transaction-success.png)
> *Shows transaction result modal with confirmed transaction hash and StellarExpert Explorer link.*

---

## 📄 License

MIT License — free for use in the Stellar ecosystem.
