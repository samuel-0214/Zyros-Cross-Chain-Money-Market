# Zyros: Cross-Chain Money Market Protocol

**One Market. Multiple Chains. Zero Friction.**

Zyros is a universal cross-chain liquidity layer enabling users to deposit assets as collateral on one chain (e.g., Solana) and borrow assets on another (e.g., Base). Powered by Wormhole and LayerZero, Zyros abstracts cross-chain complexity into a single-step, user-friendly borrowing/lending experience.

---

## 🚀 Why Zyros?

Despite DeFi's growth, liquidity is fragmented across chains. Users have to:

* Bridge tokens manually
* Manage wrapped assets
* Interact with unfamiliar tools and UIs

This results in poor UX and high risk.

Zyros solves this by enabling:

* 🔁 One-click cross-chain borrowing/lending
* 🔗 Unified liquidity aggregation
* 🛡 Stablecoin-first risk engine

---

## 🔧 Architecture Overview

```
Solana Chain (Collateral Layer)
  |
  |-- Deposit USDC/SOL
  |-- Anchor smart contract
  |-- Message published to Wormhole
  |
 Wormhole / LayerZero
  |-- Delivers VAA to Base
  |
Base Chain (Borrow Layer)
  |-- Receives VAA
  |-- Decodes payload
  |-- Releases tokens from vault to user
```

---

## 🧱 Smart Contract Structure

### Solana (Anchor)

* **Program Name**: `zyros-collateral-vault`
* **Functionality**:

  * Accept USDC as collateral
  * Store and update collateral accounts
  * Publish Wormhole message after deposit

### EVM (Base)

* **Contract Name**: `ZyrosBaseReceiver.sol`
* **Functionality**:

  * Receive Wormhole VAA
  * Decode user + amount
  * Emit event / release ERC20 (mock)

---

## 🧪 MVP Demo Flow

1. ✅ User deposits USDC on **Solana Devnet** using Anchor program
2. ✅ Wormhole emits message (VAA)
3. ✅ Message is sent to **Base Sepolia**
4. ✅ EVM contract validates VAA, emits event, and mock "releases" funds

> UI simulates this flow with transaction status indicators

---

## 🧪 Dev/Test Environment

* **Solana**: Devnet
* **Base**: Sepolia Testnet
* **Wormhole Bridge**: Devnet Core Bridge on Solana & Base
* **Stablecoin**: Devnet USDC (mock/mintable)

---

## 🛠 Repository Structure

```
/zyros-collateral-vault     # Solana Anchor Program
  |- programs/
  |- tests/

/zyros-evm                  # Hardhat EVM Contracts
  |- contracts/
  |- scripts/
  |- test/
  |- hardhat.config.ts

/src                        # Frontend (Vite + Phantom + Ethers)
  |- components/
  |- context/
  |- WalletConnect.tsx
```

---

## 🛡 Security Notes

* No production deployment
* Stablecoin collateral used to reduce liquidation volatility
* VAA replay protection with `processed[msgHash]` map
* Only valid emitters and chains accepted in VAA

---

## 🧬 Integrations

* [Wormhole](https://wormhole.com): Cross-chain messaging layer
* [LayerZero (Planned)](https://layerzero.network): Additional fallback for routing
* [Phantom Wallet](https://phantom.app): Solana UX
* [Base Wallet / MetaMask](https://base.org): EVM side interaction

---

## 🗺 Roadmap

| Quarter | Milestone                                 |
| ------- | ----------------------------------------- |
| Q2 2025 | Complete smart contracts + UI MVP         |
| Q3 2025 | Testnet audit, expand to Base + Polygon   |
| Q4 2025 | Mainnet on Solana + EVM, target \$10M TVL |
| Q1 2026 | Support 5+ chains and \$50M in TVL        |

---

## 🧑‍💻 Contributing

Zyros is currently under solo development. If you're interested in collaborating:

* Fork this repo
* Clone and install dependencies
* PRs welcome (with issues created)

```bash
# Solana Setup
anchor build && anchor test

# EVM Setup
cd zyros-evm
npx hardhat compile
npx hardhat test

# Frontend
cd src
npm install && npm run dev
```

---

## 📜 License

MIT License. Use freely, attribution appreciated.

---

## 🤝 Contact

Built by [@azielmathe](https://twitter.com/azielmathe)

DMs open for feedback, support, or partnerships!
