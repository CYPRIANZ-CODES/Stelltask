# 🪐 Stellar Open Work Platform — MILESTONES

> **Stack:** Next.js 14 (App Router) · NestJS 10 · PostgreSQL · Prisma ORM · Redis · Stellar SDK
>
> This document breaks the entire platform build into **3 Milestones**, each with phases, epics, tasks, acceptance criteria, and technical implementation details. Read every section before beginning work on a phase.

---

## ⚠️ PRE-MILESTONE: FOUNDATION SETUP

> Must be completed before any milestone work begins. Non-negotiable.

### Repository & Monorepo Structure

```
stellar-work-platform/
├── apps/
│   ├── web/                   # Next.js 14 (App Router)
│   │   ├── app/
│   │   │   ├── (auth)/        # Auth group routes
│   │   │   ├── (dashboard)/   # Protected dashboard routes
│   │   │   ├── tasks/         # Task discovery & detail pages
│   │   │   ├── repos/         # Repository bounty pages
│   │   │   ├── profile/       # Contributor profile pages
│   │   │   └── admin/         # Admin moderation panel
│   │   ├── components/
│   │   │   ├── ui/            # shadcn/ui base components
│   │   │   ├── tasks/         # Task cards, filters, forms
│   │   │   ├── wallet/        # Stellar wallet UI components
│   │   │   └── shared/        # Reusable layout components
│   │   └── lib/
│   │       ├── stellar.ts     # Stellar SDK client helpers
│   │       ├── api.ts         # API client (fetch wrappers)
│   │       └── auth.ts        # NextAuth config
│   └── api/                   # NestJS backend
│       ├── src/
│       │   ├── auth/          # Auth module (JWT, OAuth)
│       │   ├── users/         # User module
│       │   ├── tasks/         # Task CRUD module
│       │   ├── repos/         # Repository management module
│       │   ├── submissions/   # Submission & review module
│       │   ├── payments/      # Stellar payment module
│       │   ├── reputation/    # Reputation engine module
│       │   ├── admin/         # Admin moderation module
│       │   ├── notifications/ # Notification module
│       │   └── common/        # Guards, pipes, decorators
│       └── prisma/
│           └── schema.prisma
├── packages/
│   ├── types/                 # Shared TypeScript types
│   ├── stellar-utils/         # Shared Stellar SDK wrappers
│   └── config/                # Shared ESLint, TSConfig
├── docker-compose.yml
├── .env.example
├── turbo.json                 # Turborepo config
└── README.md
```

### Infrastructure Requirements (Pre-Milestone)

- [ ] Turborepo monorepo initialized with `pnpm` workspaces
- [ ] Docker Compose: PostgreSQL 15, Redis 7, pgAdmin
- [ ] Prisma initialized in `apps/api`, base schema committed
- [ ] Husky + lint-staged + Commitlint configured
- [ ] GitHub Actions CI: lint, typecheck, test on every PR
- [ ] Environment variables documented in `.env.example`
- [ ] Shared `@stellar-work/types` package published internally

---

---

# MILESTONE 1 — Core Platform: Auth, Tasks, Payments & Discovery

**Goal:** A fully functional, deployable platform where users can register, post fixed-price tasks, fund them with XLM, browse tasks, claim them, submit work, and get paid — all end-to-end.

**Target Duration:** 8–10 weeks  
**Team:** 2 full-stack engineers + 1 Stellar/blockchain engineer  
**Outcome:** Public beta ready. Real transactions processed on Stellar Testnet, then Mainnet.

---

## MILESTONE 1 — PHASE 1: Authentication & User Identity

### Overview
Every interaction on the platform is tied to a verified identity. This phase implements the full auth system — email/password, GitHub OAuth, JWT sessions, role-based access, and Stellar wallet linking. No placeholder auth. No shortcuts.

---

### Epic 1.1 — Backend Auth Module (NestJS)

#### Task 1.1.1 — Prisma User Schema

**File:** `apps/api/prisma/schema.prisma`

```prisma
model User {
  id              String        @id @default(cuid())
  email           String        @unique
  emailVerified   Boolean       @default(false)
  passwordHash    String?
  githubId        String?       @unique
  githubUsername  String?
  stellarPublicKey String?      @unique
  role            Role          @default(CONTRIBUTOR)
  trustScore      Float         @default(50.0)
  isActive        Boolean       @default(true)
  isBanned        Boolean       @default(false)
  bannedReason    String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  profile         UserProfile?
  tasksCreated    Task[]        @relation("TaskCreator")
  submissions     Submission[]
  reviews         Review[]
  reputationLogs  ReputationLog[]
  notifications   Notification[]

  @@index([email])
  @@index([githubId])
}

model UserProfile {
  id              String    @id @default(cuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id])
  displayName     String
  bio             String?
  avatarUrl       String?
  skills          String[]  // Array of skill tags
  githubUrl       String?
  websiteUrl      String?
  timezone        String?
  country         String?
  preferredLanguage String  @default("en")
  completedTasks  Int       @default(0)
  totalEarned     Float     @default(0.0) // In XLM
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

enum Role {
  CONTRIBUTOR
  MAINTAINER
  TASK_OWNER
  REVIEWER
  ADMIN
}
```

**Acceptance Criteria:**
- [ ] Migration runs cleanly with `prisma migrate dev`
- [ ] All fields have correct types and constraints
- [ ] Indexes exist on frequently queried fields

---

#### Task 1.1.2 — Email/Password Registration & Login

**NestJS Module:** `apps/api/src/auth/`

```typescript
// auth.service.ts — Key methods to implement

async register(dto: RegisterDto): Promise<AuthResponse> {
  // 1. Validate email is not already registered
  // 2. Hash password with bcrypt (rounds: 12)
  // 3. Create User record in DB
  // 4. Create empty UserProfile record
  // 5. Send verification email via queue (do NOT block response)
  // 6. Return JWT access token (15min) + refresh token (7 days)
}

async login(dto: LoginDto): Promise<AuthResponse> {
  // 1. Find user by email
  // 2. Check user is not banned
  // 3. Compare password with bcrypt
  // 4. Check email is verified (warn but allow during beta)
  // 5. Return JWT + refresh token
  // 6. Log login event to audit table
}

async refreshToken(refreshToken: string): Promise<AuthResponse> {
  // 1. Verify refresh token signature and expiry
  // 2. Check token is not in revocation list (Redis)
  // 3. Return new access + refresh token pair
  // 4. Revoke old refresh token (rotation)
}
```

**DTO Validation (class-validator):**
```typescript
// register.dto.ts
export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d)/, { message: 'Password must contain uppercase and number' })
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  displayName: string;
}
```

**Acceptance Criteria:**
- [ ] Registration returns 201 with JWT pair
- [ ] Duplicate email returns 409 Conflict with clear message
- [ ] Password never returned in any response
- [ ] Login failure does not reveal whether email exists (generic error)
- [ ] Banned users receive 403 with reason
- [ ] Refresh token rotation works; old token becomes invalid

---

#### Task 1.1.3 — GitHub OAuth Integration

```typescript
// github.strategy.ts (Passport)
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/github/callback`,
      scope: ['user:email', 'read:user'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    // 1. Extract primary verified email from profile.emails
    // 2. Check if User with this githubId already exists → return them
    // 3. Check if User with same email exists → link accounts
    // 4. Otherwise → create new User with GitHub data
    // 5. Store githubUsername for display and repo verification
    return this.authService.findOrCreateGithubUser(profile, accessToken);
  }
}
```

**Acceptance Criteria:**
- [ ] GitHub OAuth flow works end-to-end (redirect → callback → JWT)
- [ ] Existing email users can link GitHub to their account
- [ ] GitHub username stored and visible in profile
- [ ] GitHub access token encrypted at rest (for repo API calls later)

---

#### Task 1.1.4 — JWT Guard & Role Guard

```typescript
// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some(role => user.role === role || user.role === Role.ADMIN);
  }
}

// Usage on any controller endpoint:
@Roles(Role.ADMIN, Role.MAINTAINER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Post('repos/accept')
acceptRepository(@Body() dto: AcceptRepoDto) {}
```

**Acceptance Criteria:**
- [ ] Non-authenticated requests to protected routes return 401
- [ ] Wrong role returns 403
- [ ] ADMIN role passes all role checks
- [ ] Public routes accessible without token

---

#### Task 1.1.5 — Stellar Wallet Linking

```typescript
// stellar-wallet.service.ts
async linkWallet(userId: string, dto: LinkWalletDto): Promise<void> {
  // 1. Validate dto.publicKey is a valid Stellar public key (StrKey.isValidEd25519PublicKey)
  // 2. Check this public key isn't already linked to another user
  // 3. Verify ownership: user must sign a challenge message with their private key
  //    - Platform generates: `stellar-work-platform:link:${userId}:${Date.now()}`
  //    - User signs offline, sends signature
  //    - Verify with Stellar SDK: Keypair.fromPublicKey(key).verify(message, signature)
  // 4. Save publicKey to User record
  // 5. Log wallet link event
}
```

**Acceptance Criteria:**
- [ ] Invalid Stellar public key returns 422
- [ ] Duplicate wallet key returns 409
- [ ] Challenge/response signature verification works
- [ ] Wallet linked appears on user profile immediately

---

### Epic 1.2 — Frontend Auth (Next.js)

#### Task 1.2.1 — NextAuth Configuration

```typescript
// app/api/auth/[...nextauth]/route.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();
        if (res.ok && user.accessToken) return user;
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.userId = user.id;
      }
      // Token refresh logic: check expiry, call /auth/refresh
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.id = token.userId;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};
```

#### Task 1.2.2 — Auth Pages UI

Pages to build (with full form validation, loading states, error messages):

- `/login` — Email/password + GitHub OAuth button
- `/register` — Registration form with real-time validation
- `/verify-email` — Email verification landing page
- `/forgot-password` — Password reset request
- `/reset-password/[token]` — New password form

**UX Requirements:**
- Forms use React Hook Form + Zod for client-side validation
- All inputs show inline error messages (not toast-only)
- Loading spinners on submit buttons during API calls
- GitHub OAuth opens in same tab (no popup)
- After login, redirect to previous page or `/dashboard`

---

## MILESTONE 1 — PHASE 2: Task System (Fixed-Price Tasks)

### Overview
The beating heart of the platform. Task owners create tasks with a budget, description, acceptance criteria, and deadline. Tasks live through a defined lifecycle: `DRAFT → FUNDING → OPEN → IN_PROGRESS → IN_REVIEW → COMPLETED | DISPUTED | CANCELLED`.

---

### Epic 2.1 — Task Data Model

```prisma
model Task {
  id                String        @id @default(cuid())
  title             String
  description       String        @db.Text
  acceptanceCriteria String       @db.Text
  category          TaskCategory
  status            TaskStatus    @default(DRAFT)
  difficulty        Difficulty    @default(MEDIUM)
  skillTags         String[]
  rewardXLM         Float
  fundingTxHash     String?       // Stellar transaction hash proving funds locked
  escrowPublicKey   String?       // Escrow account holding funds
  deadlineAt        DateTime
  claimWindowHours  Int           @default(48)  // Hours to start after assignment
  maxAssignees      Int           @default(1)   // For parallel tasks
  isPublic          Boolean       @default(true)
  isPaid            Boolean       @default(true)
  viewCount         Int           @default(0)
  
  creatorId         String
  creator           User          @relation("TaskCreator", fields: [creatorId], references: [id])
  assigneeId        String?
  assignee          User?         @relation("TaskAssignee", fields: [assigneeId], references: [id])
  repoId            String?       // If linked to a GitHub repo
  repo              Repository?   @relation(fields: [repoId], references: [id])
  
  submissions       Submission[]
  taskUpdates       TaskUpdate[]
  disputes          Dispute[]
  
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
  publishedAt       DateTime?
  completedAt       DateTime?

  @@index([status, category])
  @@index([creatorId])
  @@index([assigneeId])
  @@index([deadlineAt])
  @@fulltext([title, description]) // Enable full-text search
}

enum TaskStatus {
  DRAFT           // Created but not yet funded or published
  FUNDING         // Awaiting XLM escrow deposit confirmation
  OPEN            // Funded and accepting contributor claims
  ASSIGNED        // Claimed by a contributor, work in progress
  IN_REVIEW       // Submission received, awaiting maintainer review
  REVISION_REQUESTED // Reviewer requested changes
  COMPLETED       // Approved and paid out
  DISPUTED        // Contested by contributor or creator
  CANCELLED       // Creator cancelled (must refund if funded)
  EXPIRED         // Deadline passed with no submission
}

enum TaskCategory {
  BUG_FIX
  FEATURE
  DOCUMENTATION
  DESIGN
  TESTING
  CODE_CLEANUP
  DEVOPS
  STELLAR_INTEGRATION
  TOKEN_WORKFLOW
  REPO_MAINTENANCE
  SUPPORT
  OTHER
}

enum Difficulty {
  BEGINNER
  EASY
  MEDIUM
  HARD
  EXPERT
}
```

---

### Epic 2.2 — Task Lifecycle State Machine (NestJS)

> All task status transitions must go through `TaskStateMachine`. No direct status updates in controllers.

```typescript
// task-state-machine.service.ts
@Injectable()
export class TaskStateMachine {
  private readonly transitions: Record<TaskStatus, TaskStatus[]> = {
    [TaskStatus.DRAFT]:              [TaskStatus.FUNDING, TaskStatus.CANCELLED],
    [TaskStatus.FUNDING]:            [TaskStatus.OPEN, TaskStatus.CANCELLED],
    [TaskStatus.OPEN]:               [TaskStatus.ASSIGNED, TaskStatus.CANCELLED, TaskStatus.EXPIRED],
    [TaskStatus.ASSIGNED]:           [TaskStatus.IN_REVIEW, TaskStatus.OPEN, TaskStatus.DISPUTED, TaskStatus.EXPIRED],
    [TaskStatus.IN_REVIEW]:          [TaskStatus.COMPLETED, TaskStatus.REVISION_REQUESTED, TaskStatus.DISPUTED],
    [TaskStatus.REVISION_REQUESTED]: [TaskStatus.IN_REVIEW, TaskStatus.DISPUTED, TaskStatus.EXPIRED],
    [TaskStatus.COMPLETED]:          [],
    [TaskStatus.DISPUTED]:           [TaskStatus.COMPLETED, TaskStatus.CANCELLED],
    [TaskStatus.CANCELLED]:          [],
    [TaskStatus.EXPIRED]:            [TaskStatus.OPEN], // Admin can reopen
  };

  transition(current: TaskStatus, next: TaskStatus): void {
    const allowed = this.transitions[current];
    if (!allowed.includes(next)) {
      throw new BadRequestException(
        `Invalid transition: ${current} → ${next}. Allowed: ${allowed.join(', ')}`
      );
    }
  }
}
```

---

### Epic 2.3 — Task CRUD Endpoints (NestJS)

**Full endpoint specification:**

```
POST   /tasks                    Create task (TASK_OWNER, MAINTAINER, ADMIN)
GET    /tasks                    List tasks (public, with filters)
GET    /tasks/:id                Get task detail (public)
PATCH  /tasks/:id                Update task (creator only, DRAFT status only)
DELETE /tasks/:id                Cancel task (creator only, if not ASSIGNED)
POST   /tasks/:id/publish        Move DRAFT → FUNDING (triggers escrow flow)
POST   /tasks/:id/claim          Contributor claims an OPEN task
POST   /tasks/:id/unclaim        Contributor gives up an ASSIGNED task
POST   /tasks/:id/extend         Request deadline extension
GET    /tasks/:id/submissions    List submissions for a task (creator/assignee/admin)
GET    /tasks/:id/updates        Task activity timeline
```

**Key Service Methods:**

```typescript
// tasks.service.ts

async createTask(creatorId: string, dto: CreateTaskDto): Promise<Task> {
  // 1. Validate creator has TASK_OWNER or MAINTAINER role (or verified email)
  // 2. Validate deadline is at minimum 3 days from now
  // 3. Validate rewardXLM >= 1 XLM minimum
  // 4. If repoId provided, verify repo is ACCEPTED in system
  // 5. Create task in DRAFT status
  // 6. Return full task object
}

async publishTask(taskId: string, creatorId: string): Promise<EscrowInitResponse> {
  // 1. Verify task is in DRAFT status and belongs to creator
  // 2. Verify all required fields are complete (title, description, criteria, deadline)
  // 3. Generate Stellar escrow keypair (never exposed to user)
  // 4. Return escrow public key and exact XLM amount for creator to send
  // 5. Set task status to FUNDING
  // 6. Start a 1-hour timer via Bull queue to check for funding
}

async claimTask(taskId: string, contributorId: string): Promise<Assignment> {
  // 1. Verify task is OPEN
  // 2. Verify contributor is not already assigned to max active tasks (limit: 3)
  // 3. Verify contributor's trust score >= minimum for this difficulty level
  // 4. Check contributor has not previously abandoned this specific task
  // 5. For HARD/EXPERT tasks: verify contributor has completed >= 5 tasks
  // 6. Assign task: set assigneeId, status → ASSIGNED, startedAt timestamp
  // 7. Notify task creator of assignment
  // 8. Start deadline enforcement queue job
}

async listTasks(filters: TaskFilterDto): Promise<PaginatedResult<Task>> {
  // Supports all combinations of:
  // - status, category, difficulty, skillTags
  // - minReward, maxReward (XLM ranges)
  // - deadline range (closingSoon: tasks expiring within 48h)
  // - search (full-text on title + description)
  // - sortBy: newest, highestValue, closingSoon, easiest
  // - page, limit (max 50 per page)
}
```

---

### Epic 2.4 — Task Frontend (Next.js)

#### Pages & Components to Build:

**`/tasks` — Task Discovery Page**
- Server component fetches initial list (SSR for SEO)
- Sidebar filter panel: category, difficulty, reward range, skills, deadline
- Task cards grid with status badge, reward, deadline countdown, difficulty chip
- Search bar with debounced input (300ms)
- Sort dropdown
- Infinite scroll or pagination
- "Beginner Friendly" prominent section at top
- "Stellar Ecosystem" tasks highlighted with Stellar logo badge

**`/tasks/[id]` — Task Detail Page**
- Full description with Markdown rendering (react-markdown)
- Acceptance criteria (formatted checklist)
- Reward display (XLM amount + USD equivalent via CoinGecko API)
- Deadline with countdown timer
- Creator profile snippet (avatar, name, completed tasks)
- "Claim Task" button (disabled with tooltip for ineligible users)
- Task activity timeline (TaskUpdates)
- Submission section (only visible to assignee and creator)

**`/dashboard/tasks/create` — Task Creation Form**
- Multi-step form: Details → Reward & Deadline → Acceptance Criteria → Review
- Markdown editor for description and acceptance criteria (with preview tab)
- XLM amount input with live USD conversion
- Skill tag selector (autocomplete from predefined list)
- Difficulty selector with descriptions
- Deadline date picker (minimum 3 days out)
- Draft save (auto-save every 30 seconds to localStorage)

---

## MILESTONE 1 — PHASE 3: Stellar Payment System

### Overview
This is the most critical and technically challenging phase. All payments use the Stellar network. No payment processor. No fiat. The platform operates escrow accounts that hold XLM during task execution and release funds only on approval.

---

### Epic 3.1 — Stellar Integration Architecture

```
PAYMENT FLOW DIAGRAM:

Task Creator              Platform Escrow              Contributor Wallet
      |                         |                              |
      |── (1) POST /publish ────>|                              |
      |<── escrowPublicKey ─────|                              |
      |                         |                              |
      |── (2) Send XLM ────────>|  (Stellar Testnet/Mainnet)  |
      |      (XDR transaction)  |                              |
      |                         |                              |
      |── (3) POST /confirm ───>|                              |
      |      (txHash)           |── Verify txHash on Horizon ─>|
      |                         |── Confirm amount correct     |
      |                         |── Move task to OPEN ─────────>
      |                         |                              |
      ... (work happens) ...    |                              |
      |                         |                              |
      |── (4) POST /approve ───>|                              |
      |      (submissionId)     |── Release escrow ───────────>|
      |                         |   Payment to contributor     |
      |                         |   Platform fee: 2.5% ────────>platform wallet
```

---

### Epic 3.2 — Escrow Service (NestJS)

```typescript
// stellar-escrow.service.ts
@Injectable()
export class StellarEscrowService {
  private readonly server: Horizon.Server;
  private readonly platformKeypair: Keypair;

  constructor() {
    this.server = new Horizon.Server(process.env.STELLAR_HORIZON_URL);
    this.platformKeypair = Keypair.fromSecret(process.env.PLATFORM_STELLAR_SECRET);
  }

  async createEscrowAccount(taskId: string, requiredXLM: number): Promise<EscrowAccount> {
    // 1. Generate new Keypair for this specific task's escrow
    const escrowKeypair = Keypair.random();
    
    // 2. Platform funds the new account with minimum XLM for account activation (1 XLM base reserve)
    // Platform pays the activation cost, task creator pays the actual reward + platform fee
    
    // 3. Build transaction: createAccount operation from platform to escrow
    const account = await this.server.loadAccount(this.platformKeypair.publicKey());
    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET, // Switch to MAINNET for production
    })
      .addOperation(Operation.createAccount({
        destination: escrowKeypair.publicKey(),
        startingBalance: '2', // Minimum reserve for Stellar account
      }))
      .setTimeout(30)
      .build();
    
    tx.sign(this.platformKeypair);
    await this.server.submitTransaction(tx);
    
    // 4. Encrypt and store escrow secret key (NEVER expose to users)
    const encryptedSecret = await this.encryptSecret(escrowKeypair.secret());
    
    // 5. Save to DB: EscrowAccount record linked to taskId
    return this.saveEscrowAccount(taskId, escrowKeypair.publicKey(), encryptedSecret);
  }

  async verifyFundingReceived(taskId: string, txHash: string): Promise<boolean> {
    // 1. Load transaction from Stellar Horizon by txHash
    const tx = await this.server.transactions().transaction(txHash).call();
    
    // 2. Parse operations: find payment to escrow account
    const ops = await tx.operations();
    const paymentOp = ops.records.find(op => 
      op.type === 'payment' && 
      op.to === escrowAccount.publicKey &&
      op.asset_type === 'native' // XLM
    );
    
    // 3. Verify amount: must be >= taskReward + 2.5% platform fee
    const expectedAmount = taskReward * 1.025;
    if (parseFloat(paymentOp.amount) < expectedAmount) {
      throw new PaymentShortfallException(expectedAmount, parseFloat(paymentOp.amount));
    }
    
    // 4. Update task: fundingTxHash, status → OPEN
    return true;
  }

  async releasePayment(taskId: string, approvedByUserId: string): Promise<PayoutResult> {
    // 1. Load task and escrow account from DB
    // 2. Verify task status is IN_REVIEW (approval is valid)
    // 3. Verify approvedByUserId has authority (task creator, maintainer, or admin)
    // 4. Decrypt escrow secret key
    // 5. Load contributor's Stellar public key
    
    // 6. Calculate amounts:
    //    - contributorAmount = taskReward (full reward to contributor)
    //    - platformFee = taskReward * 0.025
    //    - Both were already in escrow from creator's funding
    
    // 7. Build multi-operation transaction:
    const escrowAccount = await this.server.loadAccount(escrowKeypair.publicKey());
    const tx = new TransactionBuilder(escrowAccount, { fee: BASE_FEE, ... })
      .addOperation(Operation.payment({
        destination: contributor.stellarPublicKey,
        asset: Asset.native(),
        amount: contributorAmount.toFixed(7),
      }))
      .addOperation(Operation.payment({
        destination: this.platformKeypair.publicKey(),
        asset: Asset.native(),
        amount: platformFee.toFixed(7),
      }))
      .addOperation(Operation.accountMerge({
        destination: this.platformKeypair.publicKey(), // Reclaim minimum reserve
      }))
      .setTimeout(30)
      .build();
    
    tx.sign(escrowKeypair);
    const result = await this.server.submitTransaction(tx);
    
    // 8. Record PayoutTransaction in DB
    // 9. Update task status to COMPLETED
    // 10. Trigger reputation score update for contributor
    // 11. Send payment confirmation notification to contributor
    return { txHash: result.hash, amount: contributorAmount, currency: 'XLM' };
  }

  async refundCreator(taskId: string): Promise<RefundResult> {
    // Called when task is CANCELLED or EXPIRED with no accepted submission
    // Same pattern as releasePayment but sends full amount back to creator
  }
}
```

---

### Epic 3.3 — Payment Webhook & Confirmation

```typescript
// Horizon payment listener (long-polling or SSE)
// apps/api/src/payments/payment-monitor.service.ts

@Injectable()
export class PaymentMonitorService implements OnModuleInit {
  onModuleInit() {
    this.startFundingWatcher();
  }

  private startFundingWatcher() {
    // For each task in FUNDING status, watch its escrow account
    // Use Stellar Horizon's SSE streaming endpoint:
    // GET /accounts/:escrowPublicKey/payments?cursor=now
    
    this.server.payments()
      .forAccount(escrowPublicKey)
      .cursor('now')
      .stream({
        onmessage: (payment) => this.handleIncomingPayment(payment),
        onerror: (error) => this.handleStreamError(error),
      });
  }
}
```

**Fallback:** Bull queue job runs every 5 minutes to check Horizon API for any FUNDING tasks that didn't get streamed payments.

---

### Epic 3.4 — Payment UI (Next.js)

**Wallet Connection Component:**
```
- Display connected Stellar address (truncated: GABC...XYZ)
- XLM balance display (fetched from Horizon)
- "Connect Wallet" button if no wallet linked
- Link to Stellar Laboratory for testnet funding
```

**Task Funding Flow UI:**
```
Step 1: Review task details + total cost breakdown
  - Task reward: X XLM
  - Platform fee (2.5%): Y XLM  
  - Total to send: Z XLM
  
Step 2: Escrow address display
  - Large QR code of escrow address
  - Copy button for address
  - "I've sent the payment" confirmation button
  - Deep link to Stellar Wallet apps (Lobstr, Solar)
  
Step 3: Verification pending
  - Animated spinner "Monitoring Stellar network..."
  - Real-time status via WebSocket
  - Auto-advance to task OPEN state when confirmed
```

---

## MILESTONE 1 — PHASE 4: Submissions & Approval Flow

### Epic 4.1 — Submission Model

```prisma
model Submission {
  id              String          @id @default(cuid())
  taskId          String
  task            Task            @relation(fields: [taskId], references: [id])
  contributorId   String
  contributor     User            @relation(fields: [contributorId], references: [id])
  status          SubmissionStatus @default(PENDING)
  submissionUrl   String          // PR link, deployed URL, file URL
  description     String          @db.Text
  notes           String?         @db.Text
  version         Int             @default(1) // Increment on revision
  
  reviews         Review[]
  
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  reviewedAt      DateTime?

  @@index([taskId, status])
}

model Review {
  id            String        @id @default(cuid())
  submissionId  String
  submission    Submission    @relation(fields: [submissionId], references: [id])
  reviewerId    String
  reviewer      User          @relation(fields: [reviewerId], references: [id])
  verdict       ReviewVerdict
  feedback      String        @db.Text  // Required — no empty approvals or rejections
  checklist     Json          // Array of { criteriaId, passed: boolean, note: string }
  createdAt     DateTime      @default(now())
}

enum SubmissionStatus {
  PENDING
  APPROVED
  REVISION_REQUESTED
  REJECTED
}

enum ReviewVerdict {
  APPROVED
  REVISION_REQUESTED
  REJECTED
}
```

---

### Epic 4.2 — Submission & Review Service

```typescript
// submissions.service.ts

async submitWork(contributorId: string, taskId: string, dto: CreateSubmissionDto) {
  // 1. Verify task is ASSIGNED and assignee is this contributor
  // 2. Verify task deadline has not passed
  // 3. Validate submissionUrl is reachable (HEAD request, 3s timeout)
  // 4. Create Submission record
  // 5. Move task to IN_REVIEW
  // 6. Notify task creator and any assigned reviewers
  // 7. Start 72-hour review timer (if creator doesn't review, auto-escalate to admin)
}

async reviewSubmission(reviewerId: string, submissionId: string, dto: ReviewDto) {
  // 1. Verify reviewer has authority (task creator or assigned reviewer)
  // 2. Verify submission is in PENDING status
  // 3. Require feedback text (minimum 50 characters)
  // 4. Require checklist completion (all acceptance criteria checked)
  
  if (dto.verdict === 'APPROVED') {
    // 5a. Trigger escrow payment release
    await this.escrowService.releasePayment(task.id, reviewerId);
    // 6a. Update contributor reputation: +positive signal
    await this.reputationService.recordSuccess(contributorId, taskId);
  }
  
  if (dto.verdict === 'REVISION_REQUESTED') {
    // 5b. Move task back to REVISION_REQUESTED
    // 6b. Contributor can resubmit (increment version counter)
    // 7b. If version >= 3, flag for admin review
  }
  
  if (dto.verdict === 'REJECTED') {
    // 5c. Move task back to OPEN (reassignable)
    // 6c. Update contributor reputation: -negative signal
    // 7c. If creator wants dispute instead of reopen, start dispute flow
  }
}
```

---

## MILESTONE 1 — DELIVERABLES CHECKLIST

- [ ] Full auth system: email + GitHub OAuth, JWT, role system
- [ ] Stellar wallet linking with signature verification
- [ ] Task CRUD with full lifecycle state machine
- [ ] Task discovery with filtering, search, sorting
- [ ] Stellar escrow creation and funding verification
- [ ] Payment release on approval (XLM to contributor)
- [ ] Refund on cancellation (XLM back to creator)
- [ ] Submission and review flow
- [ ] Email notifications for task events
- [ ] WebSocket real-time updates (payment confirmed, submission reviewed)
- [ ] Testnet deployment (Vercel + Railway/Render)
- [ ] API documentation (Swagger at `/api/docs`)

---
---

# MILESTONE 2 — Open Source Bounties, Reputation & Fair Assignment

**Goal:** Layer the full GitHub repository integration onto the platform. Repos get vetted and accepted. Issues become bounties. A reputation system tracks contributor reliability. Fair queue-based assignment replaces ad-hoc claiming.

**Target Duration:** 8–10 weeks  
**Requires:** Milestone 1 fully deployed and stable.  
**Outcome:** Fully operational bounty marketplace for open-source contributors.

---

## MILESTONE 2 — PHASE 5: Repository Acceptance System

### Epic 5.1 — Repository & Issue Data Models

```prisma
model Repository {
  id                String        @id @default(cuid())
  githubId          Int           @unique
  fullName          String        @unique // e.g. "stellar/js-stellar-sdk"
  owner             String
  name              String
  description       String?
  language          String?
  topics            String[]
  stars             Int           @default(0)
  forks             Int           @default(0)
  htmlUrl           String
  status            RepoStatus    @default(PENDING_REVIEW)
  rejectionReason   String?
  acceptedAt        DateTime?
  reviewedById      String?
  reviewedBy        User?         @relation(fields: [reviewedById], references: [id])
  
  maintainers       RepoMaintainer[]
  bounties          Task[]
  githubIssues      GithubIssue[]
  
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  @@index([status])
}

model GithubIssue {
  id            String          @id @default(cuid())
  repoId        String
  repo          Repository      @relation(fields: [repoId], references: [id])
  githubNumber  Int
  title         String
  body          String?         @db.Text
  labels        String[]
  state         String          // "open" | "closed"
  htmlUrl       String
  linkedTaskId  String?         @unique
  linkedTask    Task?           @relation(fields: [linkedTaskId], references: [id])
  syncedAt      DateTime        @default(now())

  @@unique([repoId, githubNumber])
}

enum RepoStatus {
  PENDING_REVIEW    // Submitted by maintainer, awaiting admin check
  UNDER_REVIEW      // Admin is actively reviewing
  ACCEPTED          // Approved and live on platform
  REJECTED          // Did not meet criteria
  SUSPENDED         // Temporarily removed (abuse, inactivity)
}
```

---

### Epic 5.2 — Repository Review Service

```typescript
// repository-review.service.ts

interface RepoCheckResult {
  passed: boolean;
  score: number; // 0-100
  checks: {
    isPublic: boolean;
    hasReadme: boolean;
    hasContributing: boolean;
    hasLicense: boolean;
    hasOpenIssues: boolean;
    hasRecentActivity: boolean; // Commit in last 6 months
    maintainerVerified: boolean;
    issueQualityScore: number;  // Sample 10 issues, rate their clarity
    isStellarRelated: boolean;  // Optional bonus
  };
  warnings: string[];
  failReasons: string[];
}

async checkRepository(githubFullName: string): Promise<RepoCheckResult> {
  // GitHub API calls (using submitting maintainer's stored OAuth token):
  
  // 1. GET /repos/:owner/:repo → verify public, check stars, forks, language
  // 2. GET /repos/:owner/:repo/readme → verify README exists and has content
  // 3. GET /repos/:owner/:repo/contents/CONTRIBUTING.md → check if exists
  // 4. GET /repos/:owner/:repo/license → verify open source license
  // 5. GET /repos/:owner/:repo/issues?state=open&per_page=10 → check open issues
  // 6. GET /repos/:owner/:repo/commits?per_page=1 → verify recent activity
  // 7. GET /repos/:owner/:repo/collaborators → verify maintainer is collaborator
  
  // Scoring:
  // - Public: required (fail if false)
  // - README: 20 points
  // - CONTRIBUTING: 15 points
  // - License: 15 points
  // - Open issues: 20 points
  // - Recent activity (< 3 months): 20 points
  // - Maintainer verified: 10 points
  // Pass threshold: 60/100 (and must not fail any required checks)
}
```

---

### Epic 5.3 — Issue Import & Sync

```typescript
// github-sync.service.ts

async syncRepositoryIssues(repoId: string): Promise<SyncResult> {
  // 1. Load all open issues from GitHub API (handle pagination)
  // 2. For each issue:
  //    a. Check if already exists in GithubIssue table
  //    b. Update if changed (title, body, labels, state)
  //    c. Create if new
  // 3. Mark closed issues as closed
  // 4. Return sync statistics

  // Schedule: run every 6 hours via Bull queue for all ACCEPTED repos
}

async convertIssueToBounty(
  issueId: string,
  maintainerId: string,
  dto: ConvertIssueToBountyDto
): Promise<Task> {
  // 1. Verify maintainer is linked to this repository
  // 2. Verify issue is not already linked to a task
  // 3. Create Task with:
  //    - title: issue title
  //    - description: issue body (converted from GitHub Markdown)
  //    - category: mapped from issue labels
  //    - repoId: linked
  //    - difficulty: set by maintainer
  //    - rewardXLM: set by maintainer
  //    - deadline: set by maintainer
  // 4. Link GithubIssue.linkedTaskId to new task
  // 5. Task starts in DRAFT, goes through normal publish → escrow flow
}
```

---

## MILESTONE 2 — PHASE 6: Reputation System

### Epic 6.1 — Reputation Engine

```prisma
model ReputationLog {
  id          String            @id @default(cuid())
  userId      String
  user        User              @relation(fields: [userId], references: [id])
  eventType   ReputationEvent
  points      Float             // Can be negative
  taskId      String?
  description String
  createdAt   DateTime          @default(now())

  @@index([userId])
  @@index([createdAt])
}

enum ReputationEvent {
  TASK_COMPLETED          // +20 to +50 based on difficulty
  TASK_COMPLETED_EARLY    // +5 bonus
  FIRST_TASK_COMPLETED    // +10 one-time bonus
  SUBMISSION_APPROVED     // +15
  SUBMISSION_REVISION     // -3 per revision requested
  SUBMISSION_REJECTED     // -15
  TASK_ABANDONED          // -25 (unclaimed after assignment)
  DEADLINE_MISSED         // -20
  LATE_COMPLETION         // -10
  REPEATED_LOW_QUALITY    // -30 (3+ rejections in 30 days)
  DISPUTE_RAISED          // -5 (for raising frivolous disputes)
  DISPUTE_WON             // +10
  DISPUTE_LOST            // -20
  ACCOUNT_VERIFIED        // +10 (email + GitHub linked)
  POSITIVE_REVIEW         // +5 (creator leaves positive feedback)
}
```

```typescript
// reputation.service.ts

async calculateTrustScore(userId: string): Promise<number> {
  // Weighted rolling score:
  // - Last 90 days events: full weight
  // - 90-180 days: 0.5 weight
  // - 180+ days: 0.25 weight
  
  const logs = await this.getRecentLogs(userId, 365); // 1 year history
  
  const weightedPoints = logs.reduce((total, log) => {
    const age = daysSince(log.createdAt);
    const weight = age < 90 ? 1 : age < 180 ? 0.5 : 0.25;
    return total + (log.points * weight);
  }, 0);
  
  // Normalize to 0-100 scale
  // New users start at 50 (neutral)
  // Floor: 0, Ceiling: 100
  return Math.max(0, Math.min(100, 50 + weightedPoints));
}

getAccessLevel(trustScore: number): AccessLevel {
  if (trustScore < 20)  return AccessLevel.RESTRICTED;  // Beginner tasks only
  if (trustScore < 40)  return AccessLevel.BASIC;       // Easy + Medium tasks
  if (trustScore < 60)  return AccessLevel.STANDARD;    // All tasks
  if (trustScore < 80)  return AccessLevel.TRUSTED;     // Priority queue access
  return AccessLevel.ELITE;                              // All access + featured profile
}
```

---

## MILESTONE 2 — PHASE 7: Fair Assignment Queue

### Epic 7.1 — Queue System (Bull + Redis)

```typescript
// assignment-queue.service.ts

// Queue entry structure:
interface QueueEntry {
  userId: string;
  taskId: string;
  queuedAt: Date;
  priorityScore: number; // Calculated, not user-set
  eligibilityChecks: EligibilityResult;
}

calculatePriorityScore(user: User, task: Task): number {
  let score = 0;
  
  // Base: trust score contribution (0-40 points)
  score += user.trustScore * 0.4;
  
  // Skill match bonus (0-20 points)
  const skillOverlap = intersection(user.profile.skills, task.skillTags);
  score += (skillOverlap.length / task.skillTags.length) * 20;
  
  // First-come bonus for same priority tier (+5 for earlier queue entry)
  // Prevents ties from always favoring same user
  const waitTimeBonus = Math.min(5, minutesSinceQueued / 60);
  score += waitTimeBonus;
  
  // Beginner task special rule: new users get priority for BEGINNER tasks
  if (task.difficulty === Difficulty.BEGINNER && user.profile.completedTasks < 3) {
    score += 25;
  }
  
  // Active task load penalty (each active task reduces score)
  const activeTasks = await this.getActiveTaskCount(user.id);
  score -= activeTasks * 10;
  
  return score;
}

async processQueue(taskId: string): Promise<void> {
  // 1. Get top N candidates from queue for this task
  // 2. Run full eligibility check on top candidate
  // 3. If eligible: assign task, notify user, remove from queue
  // 4. If not eligible: move to next candidate, flag user for review
  // 5. If queue exhausted: keep task OPEN, notify admin
}
```

---

## MILESTONE 2 — PHASE 8: Deadline Enforcement & Late Work

### Epic 8.1 — Deadline Monitor (Bull Queue)

```typescript
// deadline-monitor.processor.ts
@Processor('deadline-monitor')
export class DeadlineMonitorProcessor {

  @Process('check-start-deadline')
  async checkStartDeadline(job: Job<{ taskId: string }>) {
    // 48 hours after assignment: has contributor made any updates?
    // If no TaskUpdate with type STARTED: send warning notification
    // If 72 hours: reassign task back to OPEN, apply reputation penalty
  }

  @Process('check-submission-deadline')
  async checkSubmissionDeadline(job: Job<{ taskId: string }>) {
    // On task deadline day: send 24-hour warning to assignee
    // On deadline: if no submission, move task to EXPIRED
    // Apply DEADLINE_MISSED reputation event
    // Notify creator, offer to reassign
    // Offer creator one-click extension (extends 72 hours, allowed once)
  }

  @Process('check-review-deadline')
  async checkReviewDeadline(job: Job<{ taskId: string }>) {
    // 72 hours after submission received: has creator reviewed?
    // If not: escalate to admin, warn creator
    // Prevents creators from ignoring submissions while funds are locked
  }
}
```

---

## MILESTONE 2 — PHASE 9: Dispute Resolution

### Epic 9.1 — Dispute System

```prisma
model Dispute {
  id            String        @id @default(cuid())
  taskId        String
  task          Task          @relation(fields: [taskId], references: [id])
  raisedById    String
  raisedBy      User          @relation(fields: [raisedById], references: [id])
  respondentId  String
  reason        String        @db.Text
  evidence      String?       @db.Text // Links to PRs, screenshots, etc.
  status        DisputeStatus @default(OPEN)
  resolution    String?       @db.Text
  resolvedById  String?
  resolvedBy    User?
  resolvedAt    DateTime?
  outcome       DisputeOutcome?
  
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

enum DisputeStatus {
  OPEN
  UNDER_REVIEW
  RESOLVED
  ESCALATED
}

enum DisputeOutcome {
  CREATOR_WINS    // Funds returned to creator
  CONTRIBUTOR_WINS // Funds released to contributor
  SPLIT           // Partial payment (admin decision)
  WITHDRAWN       // Dispute withdrawn by raiser
}
```

**Dispute Rules:**
- Either party (creator or contributor) can raise a dispute
- Funds stay locked in escrow until dispute is resolved — **no automatic release**
- Admin reviews evidence from both sides (max 5 business days SLA)
- Admin resolution is final; triggers appropriate payment action
- Frivolous disputes (3+ in 90 days) result in account review

---

## MILESTONE 2 — DELIVERABLES CHECKLIST

- [ ] GitHub OAuth token storage for repo API access
- [ ] Repository submission form and admin review queue
- [ ] Automated repository quality checks (GitHub API)
- [ ] Repository bounty page with issue listings
- [ ] Issue-to-bounty conversion flow for maintainers
- [ ] 6-hour GitHub issue sync cron job
- [ ] Reputation system: all event types tracked
- [ ] Trust score calculation with time weighting
- [ ] Access level gating by trust score
- [ ] Bull queue-based fair assignment system
- [ ] Priority scoring with skill matching
- [ ] Deadline enforcement system (start + submission + review)
- [ ] Dispute creation and admin resolution flow
- [ ] Funds locked during dispute (no auto-release)
- [ ] Contributor profile page with reputation history
- [ ] Admin moderation dashboard (repo approval, disputes, suspensions)

---
---

# MILESTONE 3 — Stellar Ecosystem Expansion, Analytics & Scale

**Goal:** Extend the platform to fully serve the Stellar ecosystem, add smart matching, harden fraud controls, build analytics dashboards, and prepare the platform for high-volume scale.

**Target Duration:** 8–12 weeks  
**Requires:** Milestones 1 & 2 fully deployed and stable.  
**Outcome:** Production-grade platform. Stellar ecosystem integrations live. Self-sustaining moderation.

---

## MILESTONE 3 — PHASE 10: Stellar Ecosystem Task Layer

### Epic 10.1 — Stellar-Specific Task Categories & Tooling

```typescript
// Stellar ecosystem task enrichment:

const STELLAR_TASK_TYPES = {
  ANCHOR_INTEGRATION: {
    label: "Anchor Integration",
    description: "Build deposit/withdrawal flows for fiat on/off ramps",
    requiredSkills: ['stellar-sdk', 'sep-24', 'sep-31'],
    minTrustScore: 60,
  },
  SEP_IMPLEMENTATION: {
    label: "SEP Implementation",
    description: "Implement Stellar Ecosystem Proposals (SEP-6, SEP-10, SEP-24, SEP-31, etc.)",
    requiredSkills: ['stellar-sdk'],
    minTrustScore: 50,
  },
  SOROBAN_CONTRACT: {
    label: "Soroban Smart Contract",
    description: "Write, test, or audit Soroban (Stellar smart contract) code",
    requiredSkills: ['rust', 'soroban'],
    minTrustScore: 70,
  },
  WALLET_FEATURE: {
    label: "Wallet Feature",
    description: "Add functionality to a Stellar wallet application",
    requiredSkills: ['stellar-sdk'],
    minTrustScore: 40,
  },
  TOKEN_FLOW: {
    label: "Token/Asset Flow",
    description: "Implement custom asset issuance, distribution, or flow logic",
    requiredSkills: ['stellar-sdk', 'asset-management'],
    minTrustScore: 55,
  },
};
```

### Epic 10.2 — Multi-Asset Payment Support

```typescript
// Extend payment service to support Stellar-issued assets
// beyond native XLM (e.g., USDC on Stellar, AQUA, etc.)

async createEscrowForAsset(
  taskId: string,
  asset: { code: string; issuer: string },
  amount: number
): Promise<EscrowAccount> {
  // 1. Create escrow account (same as XLM flow)
  // 2. Add trustline: escrow account must trust the asset before receiving it
  const trustlineTx = new TransactionBuilder(escrowAccount, ...)
    .addOperation(Operation.changeTrust({
      asset: new Asset(asset.code, asset.issuer),
      limit: (amount * 2).toFixed(7), // Allow some buffer
    }))
    .build();
  
  // Platform pays for trustline (0.5 XLM base reserve increase)
  // This cost is included in the platform fee calculation
}
```

---

## MILESTONE 3 — PHASE 11: Smart Contributor Matching

### Epic 11.1 — Recommendation Engine

```typescript
// recommendation.service.ts

async getRecommendedTasksForUser(userId: string, limit = 10): Promise<Task[]> {
  const user = await this.getUserWithHistory(userId);
  
  // Build preference vector:
  const preferences = {
    // Skills from completed tasks
    skills: this.extractSkillsFromHistory(user.completedTasks),
    // Preferred difficulty (based on success rate by difficulty)
    difficulty: this.inferPreferredDifficulty(user),
    // Preferred reward range (median of completed tasks ± 50%)
    rewardRange: this.inferRewardPreference(user),
    // Ecosystem preference (Stellar vs general)
    stellarAffinity: this.calculateStellarAffinity(user),
  };
  
  // Score all OPEN tasks against preference vector
  const candidateTasks = await this.getOpenTasks();
  const scored = candidateTasks.map(task => ({
    task,
    score: this.scoreTaskForUser(task, preferences, user.trustScore),
  }));
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.task);
}
```

---

## MILESTONE 3 — PHASE 12: Anti-Fraud & Abuse Protection

### Epic 12.1 — Fraud Detection System

```typescript
// fraud-detection.service.ts

// Rules engine (evaluated on task claim, submission, and payment events):
const FRAUD_RULES: FraudRule[] = [
  {
    id: 'task-hoarding',
    description: 'User claims tasks but never completes them',
    check: async (userId) => {
      const ratio = await getAbandonmentRatio(userId, '30d');
      return ratio > 0.5; // More than 50% abandoned in 30 days
    },
    action: 'restrict-claiming',
    severity: 'medium',
  },
  {
    id: 'sock-puppet',
    description: 'Multiple accounts from same IP/device claiming tasks to same wallet',
    check: async (userId) => {
      return this.detectLinkedAccounts(userId);
    },
    action: 'flag-for-admin',
    severity: 'high',
  },
  {
    id: 'reward-washing',
    description: 'Creator and contributor are same person or coordinating (circular payments)',
    check: async (taskId) => {
      return this.detectCircularPayment(taskId);
    },
    action: 'freeze-payment',
    severity: 'critical',
  },
  {
    id: 'spam-submissions',
    description: 'Submitting clearly off-topic or AI-generated garbage',
    check: async (submissionId) => {
      const rejectionRate = await getRecentRejectionRate(userId, '14d');
      return rejectionRate > 0.7; // 70%+ rejection rate
    },
    action: 'require-admin-review',
    severity: 'medium',
  },
];
```

---

## MILESTONE 3 — PHASE 13: Analytics & Dashboards

### Epic 13.1 — Platform Analytics (Admin)

```typescript
// Metrics to track and display:

interface PlatformMetrics {
  // Volume
  totalTasksPosted: number;
  totalTasksCompleted: number;
  totalXLMTransacted: number;
  totalContributors: number;
  totalTaskOwners: number;
  totalRepositories: number;
  
  // Health
  averageTimeToCompletion: number; // Days
  approvalRate: number;            // % submissions approved first time
  disputeRate: number;             // % tasks that enter dispute
  abandonmentRate: number;         // % assigned tasks abandoned
  
  // Growth (7d / 30d / 90d windows)
  newUsersGrowth: TimeSeries;
  taskVolumeGrowth: TimeSeries;
  paymentVolumeGrowth: TimeSeries;
  
  // Ecosystem
  stellarTaskPercentage: number;   // % of tasks that are Stellar-specific
  topRepositories: Repository[];
  topContributors: UserProfile[];
  topCategories: CategoryBreakdown[];
}
```

### Epic 13.2 — Contributor Dashboard

```typescript
// Personal analytics for logged-in contributor:
interface ContributorDashboard {
  // Activity
  tasksCompleted: number;
  tasksInProgress: Task[];
  submissionsPending: Submission[];
  
  // Earnings
  totalEarnedXLM: number;
  earningsThisMonth: number;
  earningsChart: MonthlyEarnings[]; // Last 12 months
  pendingPayments: PendingPayment[];
  
  // Reputation
  currentTrustScore: number;
  trustScoreHistory: TimeSeries; // Last 90 days
  recentReputationEvents: ReputationLog[];
  accessLevel: AccessLevel;
  
  // Recommendations
  recommendedTasks: Task[]; // 5 personalized picks
  skillGaps: string[];      // Skills to learn to unlock higher-value tasks
}
```

---

## MILESTONE 3 — PHASE 14: Performance, SEO & Scale

### Epic 14.1 — Performance Targets

| Metric | Target | Approach |
|--------|--------|----------|
| Task list page LCP | < 1.8s | SSR with ISR (revalidate: 60s) |
| Task detail page LCP | < 2.0s | SSR with on-demand revalidation |
| API p99 latency | < 200ms | Redis caching on hot queries |
| DB query time | < 50ms | Composite indexes on filter columns |
| Concurrent users | 1,000+ | Horizontal NestJS scaling via PM2 |
| Stellar payment confirmation | < 30s | Horizon SSE streaming |

### Epic 14.2 — Caching Strategy

```typescript
// Redis caching layers:

// 1. Task list cache (TTL: 60 seconds, bust on any task status change)
const CACHE_KEY = `tasks:list:${JSON.stringify(filters)}`;

// 2. Task detail cache (TTL: 30 seconds, bust on task update)
const TASK_CACHE_KEY = `task:${taskId}`;

// 3. Repository page cache (TTL: 5 minutes, bust on issue sync)
const REPO_CACHE_KEY = `repo:${repoId}:tasks`;

// 4. User reputation score cache (TTL: 5 minutes)
const REP_CACHE_KEY = `user:${userId}:reputation`;

// 5. XLM/USD price cache (TTL: 5 minutes, from CoinGecko)
const PRICE_CACHE_KEY = `xlm:usd:price`;
```

---

## MILESTONE 3 — DELIVERABLES CHECKLIST

- [ ] Stellar ecosystem task type taxonomy with skill tagging
- [ ] Multi-asset escrow (USDC on Stellar + other assets)
- [ ] Recommendation engine (personalized task suggestions)
- [ ] Fraud detection rules engine with admin alerts
- [ ] Sock puppet detection (IP/device fingerprint linking)
- [ ] Circular payment detection
- [ ] Platform-wide analytics dashboard for admins
- [ ] Contributor personal analytics dashboard
- [ ] Task owner analytics (spend, completion rate, top contributors)
- [ ] Redis caching strategy fully implemented
- [ ] Full-text search with PostgreSQL `ts_vector` or Meilisearch
- [ ] Email digest: weekly summary of recommended tasks
- [ ] SEO: metadata, sitemap, Open Graph for task pages
- [ ] Performance: all pages meeting LCP targets
- [ ] Load testing: k6 scripts for 1,000 concurrent users
- [ ] Mainnet Stellar payments enabled (with feature flag)
- [ ] Production deployment: Docker + CI/CD pipeline
- [ ] Security audit: OWASP Top 10 reviewed
- [ ] Rate limiting on all API endpoints (per-user + per-IP)
- [ ] GDPR compliance: data export and account deletion flows

---

## CROSS-MILESTONE TECHNICAL STANDARDS

### Every pull request must:
- Pass TypeScript strict mode (no `any` without documented justification)
- Pass all unit tests (Jest, coverage ≥ 80% on new code)
- Pass E2E tests for affected flows (Playwright)
- Include Swagger doc updates for any new/changed API endpoints
- Not introduce N+1 queries (use Prisma `include` with care, prefer explicit joins for lists)
- Handle all Stellar network errors gracefully (retry with exponential backoff)

### Security non-negotiables:
- Escrow private keys encrypted at rest (AES-256-GCM, key from env)
- All user inputs sanitized (class-validator + helmet)
- SQL injection impossible (Prisma parameterized queries only)
- JWT secrets rotatable without downtime
- Rate limiting on auth endpoints (5 attempts/15 min per IP)
- CORS whitelist in production
