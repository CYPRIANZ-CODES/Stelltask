# 🪐 Stellar Open Work Platform

> **A fair, transparent work marketplace for open-source contributors and digital task workers, built natively on the Stellar blockchain.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com)
[![Stellar](https://img.shields.io/badge/Stellar-Network-blue?logo=stellar)](https://stellar.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://postgresql.org)

---

## ⚠️ MUST READ BEFORE TOUCHING ANY CODE

This is a financial application that processes real cryptocurrency transactions on the Stellar network. The following rules are **mandatory** for every contributor:

1. **Never commit secrets.** No private keys, API tokens, or wallet secrets in any file, ever. Use `.env.local` (gitignored).
2. **Never hardcode Stellar keypairs.** All escrow keys are generated at runtime and encrypted in the database.
3. **Always use Testnet first.** All development and staging work uses Stellar Testnet (`https://horizon-testnet.stellar.org`). The Mainnet flag is only flipped in production by an authorized admin.
4. **State machine is law.** Task status transitions only happen through `TaskStateMachine`. Never update `task.status` directly in a controller or service bypassing the state machine.
5. **Funds in dispute are frozen.** The payment release logic must check for active disputes before executing any payout. Do not skip this check.
6. **Read `MILESTONES.md` in full** before starting work on any feature. The milestone document contains detailed architecture decisions, data models, and acceptance criteria that this README summarizes.

---

## What Is This?

The Stellar Open Work Platform is a structured work marketplace where:

- **Task owners and open-source maintainers** post software tasks, fund them with XLM (Stellar's native currency), and pay contributors automatically on approval.
- **Contributors** discover work, join a fair queue, complete tasks, and receive XLM directly to their Stellar wallet — no middleman, no bank, no delay.

It is **not** a chat group, forum, or private handoff system. It is a transparent, fair, Stellar-native platform for real work.

### What Makes It Different

| Feature | This Platform | Typical Bounty Board |
|--------|---------------|---------------------|
| Payment method | XLM via Stellar escrow | PayPal / Bank transfer |
| Funds locked before work starts | ✅ Always | Sometimes |
| Dispute protection | ✅ Frozen escrow | Manual/slow |
| Fair assignment queue | ✅ Score-based | First-come or manual |
| Reputation system | ✅ Time-weighted | None or stars |
| GitHub repo vetting | ✅ Required | Open/spam-prone |
| Anti-favoritism rules | ✅ Enforced | Rarely |

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend | Next.js (App Router) | 14.x | SSR + client UI |
| Backend | NestJS | 10.x | REST API + business logic |
| Database | PostgreSQL | 15.x | Primary data store |
| ORM | Prisma | 5.x | Type-safe DB access |
| Cache / Queues | Redis | 7.x | Caching + Bull job queues |
| Blockchain | Stellar SDK (`@stellar/stellar-sdk`) | latest | Payments + escrow |
| Auth | NextAuth.js + JWT + Passport | — | Sessions + OAuth |
| Monorepo | Turborepo + pnpm | — | Workspace management |
| Testing | Jest + Playwright | — | Unit + E2E tests |
| CI/CD | GitHub Actions | — | Lint, test, deploy |
| Containerization | Docker + Docker Compose | — | Local dev environment |

---

## Project Structure

```
stellar-work-platform/
├── apps/
│   ├── web/          # Next.js 14 frontend (App Router)
│   └── api/          # NestJS backend + Prisma
├── packages/
│   ├── types/        # Shared TypeScript interfaces
│   ├── stellar-utils/ # Shared Stellar SDK helpers
│   └── config/       # Shared ESLint, TSConfig, Prettier
├── docker-compose.yml
├── turbo.json
├── MILESTONES.md     # ← Detailed build plan (read this)
└── README.md         # ← You are here
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- Docker Desktop (for PostgreSQL + Redis)
- A Stellar Testnet account (free at [Stellar Laboratory](https://laboratory.stellar.org))

### 1. Clone & Install

```bash
git clone https://github.com/your-org/stellar-work-platform.git
cd stellar-work-platform
pnpm install
```

### 2. Environment Variables

```bash
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local
```

Open both files and fill in all required values. See the table below.

**Required Environment Variables:**

| Variable | Location | Description |
|----------|----------|-------------|
| `DATABASE_URL` | `api/.env` | PostgreSQL connection string |
| `REDIS_URL` | `api/.env` | Redis connection string |
| `JWT_ACCESS_SECRET` | `api/.env` | 64-char random secret for access tokens |
| `JWT_REFRESH_SECRET` | `api/.env` | 64-char random secret for refresh tokens |
| `GITHUB_CLIENT_ID` | Both | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | Both | GitHub OAuth app client secret |
| `STELLAR_HORIZON_URL` | `api/.env` | Use `https://horizon-testnet.stellar.org` for dev |
| `STELLAR_NETWORK` | `api/.env` | `testnet` or `mainnet` — use `testnet` always in dev |
| `PLATFORM_STELLAR_SECRET` | `api/.env` | Platform's Stellar secret key (testnet only in dev) |
| `ESCROW_ENCRYPTION_KEY` | `api/.env` | AES-256 key for encrypting escrow secrets at rest |
| `NEXTAUTH_SECRET` | `web/.env.local` | Random secret for NextAuth |
| `NEXTAUTH_URL` | `web/.env.local` | `http://localhost:3000` in dev |
| `NEXT_PUBLIC_API_URL` | `web/.env.local` | `http://localhost:4000` in dev |

Generate secure random secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Start Infrastructure

```bash
docker-compose up -d   # Starts PostgreSQL 15 + Redis 7
```

### 4. Database Setup

```bash
cd apps/api
pnpm prisma migrate dev    # Run all migrations
pnpm prisma db seed        # Seed with demo data (dev only)
```

### 5. Start Development Servers

```bash
# From repo root — starts both Next.js and NestJS concurrently
pnpm dev
```

| Service | URL |
|---------|-----|
| Next.js frontend | http://localhost:3000 |
| NestJS API | http://localhost:4000 |
| Swagger API docs | http://localhost:4000/api/docs |
| pgAdmin (DB UI) | http://localhost:5050 |

---

## Milestone Overview

The platform is built in **3 Milestones**. See `MILESTONES.md` for full detail.

### Milestone 1 — Core Platform *(Weeks 1–10)*
Auth, fixed-price tasks, Stellar escrow payments, submission + approval flow, task discovery. **End result:** Real XLM transactions on Testnet, beta-ready.

### Milestone 2 — Bounties & Reputation *(Weeks 11–20)*
GitHub repo vetting, open-source issue bounties, reputation engine, fair assignment queue, deadline enforcement, dispute resolution. **End result:** Open-source bounty marketplace operational.

### Milestone 3 — Ecosystem & Scale *(Weeks 21–32)*
Stellar ecosystem task types, multi-asset payments (USDC on Stellar), smart matching, fraud detection, analytics dashboards, production hardening. **End result:** Production-grade, Mainnet-ready.

---

## Key Concepts

### Task Lifecycle

```
DRAFT → FUNDING → OPEN → ASSIGNED → IN_REVIEW → COMPLETED
                    ↓         ↓            ↓
                CANCELLED  DISPUTED   REVISION_REQUESTED
```

Every transition is enforced by `TaskStateMachine`. No status can be set directly.

### Payment Flow

1. Creator posts task and initiates funding
2. Platform generates a unique Stellar escrow account for this task
3. Creator sends exact XLM amount to escrow address (on-chain, verifiable)
4. Platform monitors Horizon SSE stream; confirms receipt
5. Task becomes OPEN when funds are verified
6. Contributor completes and submits work
7. Creator reviews and approves
8. Platform releases escrow: contributor receives reward, platform takes 2.5% fee
9. Escrow account is closed, minimum reserve reclaimed

**No approval = no payment. Ever. Funds never auto-release.**

### Reputation System

Contributors accumulate a trust score (0–100) based on:
- Completed tasks (+20 to +50 depending on difficulty)
- Approval rate, delivery speed, revision history
- Time-weighted: recent events count more than old ones
- New users start at 50 (neutral access)

Trust score determines which tasks you can claim and your queue priority.

### Repository Acceptance

Not every GitHub repo can list bounties. A repository must pass automated checks:
- Public and accessible
- Has README, license, and open issues
- Maintainer is a verified collaborator
- Recent activity (commit within 6 months)
- Score ≥ 60/100 on the quality rubric

Admin final-approves all repos before they go live.

---

## API Reference

Interactive Swagger docs: **http://localhost:4000/api/docs**

Key endpoint groups:

| Group | Base Path | Description |
|-------|-----------|-------------|
| Auth | `/auth` | Register, login, OAuth, token refresh |
| Tasks | `/tasks` | CRUD, publish, claim, discovery |
| Submissions | `/submissions` | Submit work, request review |
| Payments | `/payments` | Escrow creation, funding confirmation |
| Repositories | `/repos` | Submit, accept, issue sync |
| Reputation | `/reputation` | Score lookup, history |
| Users | `/users` | Profiles, wallet linking |
| Admin | `/admin` | Moderation, disputes, analytics |

---

## Contributing

### Branch Naming

```
feat/milestone-1/task-claim-flow
fix/milestone-2/queue-priority-bug
chore/upgrade-stellar-sdk
docs/api-submission-endpoints
```

### Commit Format (Conventional Commits)

```
feat(tasks): add deadline extension endpoint
fix(payments): handle horizon timeout on escrow confirmation
chore(deps): upgrade stellar-sdk to 12.1.0
docs(readme): update environment variable table
```

### Pull Request Checklist

Before opening a PR, verify:

- [ ] `pnpm typecheck` passes with zero errors
- [ ] `pnpm lint` passes with zero errors
- [ ] `pnpm test` passes (all unit tests green)
- [ ] New endpoints have Swagger `@ApiOperation` decorators
- [ ] New Prisma models have corresponding migration file
- [ ] Any new env vars are added to `.env.example` with description
- [ ] No `console.log` left in production code paths
- [ ] Stellar operations handle `SubmitTransactionResponse` error cases

---

## Deployment

### Staging (Testnet)
- Frontend: Vercel (auto-deploy from `staging` branch)
- API: Railway or Render (Docker container, auto-deploy from `staging` branch)
- DB: Managed PostgreSQL (Railway or Supabase)
- Redis: Upstash (serverless Redis)
- Stellar: Testnet only (`STELLAR_NETWORK=testnet`)

### Production (Mainnet)
- Same infrastructure, separate environment
- `STELLAR_NETWORK=mainnet` — only set by authorized maintainers
- Mainnet requires security audit completion (Milestone 3 gate)
- Database backups: daily automated snapshots, 30-day retention

---

## Security

- Escrow private keys are **never** stored in plaintext. They are AES-256-GCM encrypted using a key that lives only in environment variables.
- JWT tokens use RS256 with rotating secrets (access: 15 min, refresh: 7 days with rotation)
- All endpoints behind rate limiting (auth: 5/15min per IP, API: 100/min per user)
- Parameterized queries only (Prisma — no raw SQL injection vectors)
- GitHub OAuth tokens encrypted at rest
- CORS whitelist in production (no wildcard)

To report a security vulnerability: **security@your-domain.com** — do not open a public issue.

---

## License

MIT — see [LICENSE](LICENSE) for full text.

---

## Glossary

| Term | Meaning |
|------|---------|
| **Escrow** | A Stellar account created per-task, holding task reward funds until release |
| **XLM** | Stellar Lumens — the native currency of the Stellar network |
| **Horizon** | Stellar's HTTP API for querying the blockchain and submitting transactions |
| **Trust Score** | 0–100 reputation metric per contributor, affects queue priority and task access |
| **State Machine** | The enforced set of valid task status transitions in `TaskStateMachine` |
| **SEP** | Stellar Ecosystem Proposal — standardized protocol for Stellar integrations |
| **Soroban** | Stellar's smart contract platform (Rust-based) |
| **Testnet** | Stellar's test network — free, no real money, for development only |
| **Mainnet** | Stellar's live network — real XLM, real money |
| **Base Reserve** | Minimum XLM (currently 1 XLM) required to keep a Stellar account active |
