# 🌌 Stellar Drips: Crypto Payment System Architecture

This architecture combines the **Streaming and Splitting** protocol concepts of Drips.network with the high-speed, low-cost **Stellar Blockchain** and **Soroban Smart Contracts**.

## 🏗️ Project Directory Structure

```text
stellar-drips-platform/
├── apps/
│   ├── api/                        # NestJS Backend
│   │   ├── src/
│   │   │   ├── app.module.ts       # Main entry point
│   │   │   ├── streaming/          # Drips-style streaming logic (Continuous Payouts)
│   │   │   │   ├── streaming.module.ts
│   │   │   │   ├── streaming.service.ts
│   │   │   │   └── streaming.controller.ts
│   │   │   ├── splits/             # Reward splitting & Drip List management
│   │   │   │   ├── splits.module.ts
│   │   │   │   ├── splits.service.ts
│   │   │   │   └── splits.controller.ts
│   │   │   ├── escrow/             # Stellar-native escrow (XLM/USDC locking)
│   │   │   │   ├── escrow.module.ts
│   │   │   │   ├── escrow.service.ts
│   │   │   │   └── escrow.processor.ts # BullMQ processor for escrow lifecycle
│   │   │   ├── ingestion/          # Blockchain event monitoring (Horizon/Soroban)
│   │   │   │   ├── ingestion.service.ts # Watcher for payment/contract events
│   │   │   │   └── listeners/      # Specific event handlers
│   │   │   ├── contracts/          # Soroban contract interaction wrappers
│   │   │   │   ├── soroban.service.ts # XDR generation and transaction submission
│   │   │   │   └── abis/           # Contract WASM/JSON interfaces
│   │   │   ├── payments/           # General payment & transaction history
│   │   │   ├── reputation/         # Contributor trust & performance tracking
│   │   │   └── common/             # Global filters, interceptors, and decorators
│   │   └── prisma/
│   │       └── schema.prisma       # Database models for Streams, Splits, and Tasks
│   │
│   └── web/                        # Next.js 14 Frontend (App Router)
│       ├── app/
│       │   ├── page.tsx            # Main Landing Page
│       │   ├── dashboard/          # Merchant/Contributor Dashboard
│       │   ├── streams/            # Active payment streams monitoring
│       │   ├── explore/            # Task & Bounty discovery
│       │   └── (auth)/             # Login/Register routes
│       ├── components/
│       │   ├── ui/                 # Base components (shadcn/ui style)
│       │   ├── streaming/          # Visualizers for flowing funds (Progress bars/charts)
│       │   ├── splits/             # Configuration UI for splitting rewards
│       │   ├── wallet/             # Stellar wallet connectors (Freighter/Albedo)
│       │   └── layout/             # Navigation and Shell components
│       ├── lib/
│       │   ├── stellar.ts          # Frontend Stellar SDK helpers
│       │   ├── hooks/              # Custom React hooks for blockchain state
│       │   └── api.ts              # Fetch wrappers for the NestJS API
│       └── store/
│           └── useWalletStore.ts   # Global state for wallet and user session
│
├── packages/
│   ├── types/                      # Shared TS interfaces (Stream, Split, Transaction)
│   ├── stellar-utils/              # Shared Stellar SDK & Soroban helpers
│   └── config/                     # Shared ESLint/TSConfig/Tailwind config
│
├── contracts/                      # Soroban Smart Contracts (Rust)
│   ├── stream/                     # Logic for continuous balance updates
│   ├── split/                      # Logic for recursive fund distribution
│   └── Cargo.toml
│
├── docker-compose.yml              # PostgreSQL, Redis, Horizon (optional local)
└── turbo.json                      # Turborepo configuration
```

## 📂 Folder & File Descriptions

### BACKEND (NestJS)
*   **`src/streaming/`**: Implements the core "Drips" logic where funds are not paid out in a single lump sum but flow to the recipient over a defined duration.
*   **`src/splits/`**: Manages the "Drip Lists." For example, if a project receives a bounty, this module handles automatically splitting 70% to the developer and 30% to the repository's maintenance fund.
*   **`src/ingestion/`**: A background service that streams events from the Stellar Horizon API or Soroban RPC to update the database state in real-time when on-chain payments occur.
*   **`src/contracts/`**: High-level abstractions for interacting with Rust-based Soroban smart contracts, handling transaction building, signing orchestration, and error handling.

### FRONTEND (Next.js)
*   **`app/streams/`**: Dedicated dashboard for users to see money "dripping" into their wallets in real-time with live animations.
*   **`components/streaming/`**: Contains specialized UI components like `FlowingBalance.tsx` and `StreamTimeline.tsx` to visualize continuous payments.
*   **`components/wallet/`**: Integrated Stellar wallet connectivity (Freighter, Rabe, or Albedo) to handle on-chain signatures for setting up streams or splits.

---

## 🔑 Core Payment Logic Files

1.  **`apps/api/src/streaming/streaming.service.ts`**: The engine for calculating real-time balances, handling stream creation/cancellation, and triggering on-chain Soroban contract calls.
2.  **`apps/api/src/splits/splits.service.ts`**: Logic for recursive splitting—allowing recipients to define their own dependencies so funds flow through multiple levels (Project -> Maintainer -> Contributor).
3.  **`apps/api/src/escrow/escrow.service.ts`**: Manages the locking of XLM/USDC in temporary Stellar accounts, ensuring funds are collateralized before a stream begins.
4.  **`packages/stellar-utils/src/soroban-client.ts`**: A shared utility for encoding/decoding Soroban types and submitting transactions to the Stellar network.
5.  **`apps/web/lib/hooks/useStream.ts`**: React hook that provides the frontend with real-time "streamed" balance updates by interpolating time between blockchain checkpoints.

---

## 🎨 Landing Page Structure (`apps/web/app/page.tsx`)

### 1. Hero Section: "The Future of Programmable Cash Flow on Stellar"
*   **Headline**: Empower your project with streaming crypto payments.
*   **Subheadline**: Build on Stellar with the power of Drips. Automate payroll, fund open source, and split rewards with millisecond precision.
*   **Visual**: Abstract animation of "dripping" assets (XLM/USDC) flowing into multiple nodes.
*   **Primary CTA**: "Get Started as a Merchant" (Link to Dashboard)
*   **Secondary CTA**: "Explore Active Streams"

### 2. How It Works (4 Steps)
1.  **Fund Your Account**: Deposit XLM or USDC into a secure Stellar escrow.
2.  **Configure Your Drips**: Set a monthly budget and define recipients (contributors, maintainers, or repos).
3.  **Real-Time Streaming**: Funds begin "dripping" to recipients every second, visible in their real-time dashboard.
4.  **Automated Splitting**: Recipients can "split" their incoming drips to automatically support their own dependencies or contributors.

### 3. Features: "Stellar Powered, Drips Inspired"
*   **Native Stellar Speed**: Transactions settle in seconds with near-zero fees.
*   **Soroban Smart Contracts**: Trustless, programmable logic for complex streaming and splitting rules.
*   **Asset Versatility**: Stream XLM or any Stellar-issued asset like USDC.
*   **GitHub Integration**: Fund repositories directly; rewards flow to contributors based on verified activity.

### 4. Merchant Call-to-Action
*   **Title**: Ready to automate your project's economy?
*   **Body**: Join the next wave of Stellar-native organizations using programmable money to scale their impact.
*   **Form/Button**: "Connect Merchant Wallet" or "Register Your Repository"
