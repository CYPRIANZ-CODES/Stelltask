export interface DocEntry {
  id: string;
  path: string;
  title: string;
  section: string;
  description: string;
  content: string;
  keywords: string[];
}

export const docsEntries: DocEntry[] = [
  {
    id: 'getting-started',
    path: '/docs/getting-started',
    title: 'Introduction',
    section: 'Getting Started',
    description: 'Learn how Stelltask works — contributors earn crypto, maintainers fund bounties, and funders support open source on Stellar.',
    content: 'Stelltask is a Stellar-native open work platform connecting contributors, maintainers, and funders. Contributors browse open tasks, claim matching work, submit completed work, and earn crypto rewards. Maintainers create bounties from GitHub issues, set rewards in XLM or USDC, review submissions, and release payments from escrow. Funders can fund individual tasks, run RetroPGF rounds, or set up continuous payment streams. Every task uses a dedicated on-chain escrow wallet — funds are held on the Stellar network until work is approved and released. Transactions settle in 3-5 seconds at fractions of a cent.',
    keywords: ['introduction', 'overview', 'contributors', 'maintainers', 'funders', 'how it works'],
  },
  {
    id: 'architecture',
    path: '/docs/architecture',
    title: 'Architecture',
    section: 'Platform',
    description: 'How Stelltask works — fund flow, escrow system, and key principles.',
    content: 'Stelltask uses a non-custodial architecture where funds flow through dedicated on-chain escrow wallets on the Stellar network. Process: a creator publishes a task, a unique escrow wallet is generated, the creator funds it, a contributor completes the work, and on approval funds release directly to the contributor. The platform never holds funds. Key principles: non-custodial (funds always on-chain), transparent (all transactions verifiable on Stellar), secure (encrypted communications, rate limiting, smart contract-enforced payouts), fast (3-5 second settlement). Participants: creators (post tasks, set rewards), contributors (claim work, earn crypto), platform (coordinates, enforces rules).',
    keywords: ['architecture', 'fund flow', 'escrow', 'stellar', 'principles', 'non-custodial'],
  },
  {
    id: 'platform-guide',
    path: '/docs/platform',
    title: 'Platform Guide',
    section: 'Platform',
    description: 'Task lifecycle, escrow system, reputation scores, deadlines, and fair assignment queue.',
    content: 'Task lifecycle: DRAFT (created, unfunded), FUNDING (awaiting escrow), OPEN (accepting claims), ASSIGNED (work in progress), IN_REVIEW (submission received), COMPLETED (approved and paid), DISPUTED (contested), CANCELLED (refunded). Escrow system: dedicated on-chain escrow account per task, creator sends reward plus fee, funding confirmed via Stellar network. Reputation: trust scores 0-100, time-weighted event history, access levels from RESTRICTED to ELITE. Deadlines: 48h start deadline, 72h review window, one-click extension. Fair assignment: priority scoring based on trust score, skill match, wait time, beginner bonus, active task penalty.',
    keywords: ['tasks', 'lifecycle', 'escrow', 'reputation', 'trust', 'deadlines', 'queue', 'assignment'],
  },
  {
    id: 'contributors',
    path: '/docs/contributors',
    title: 'Contributors',
    section: 'Community',
    description: 'How to contribute and earn on Stellar. Wallet setup, task claiming, submissions, and reputation building.',
    content: 'Contributor flow: connect Stellar wallet (Freighter or Rabe), browse open tasks, claim matching tasks, submit completed work, get paid on approval. Reputation building: complete tasks on time (+20 to +50), first task bonus (+10), submission approved (+15), account verified (+10), early completion (+5). Avoiding penalties: task abandonment (-25), missed deadlines (-20), rejected submissions (-15), frivolous disputes (-5). Tips: read acceptance criteria carefully, communicate with creators, start with beginner tasks, keep skills updated, submit early for bonus points.',
    keywords: ['contributor', 'earn', 'wallet', 'claim', 'submit', 'reputation', 'tips', 'getting started'],
  },
  {
    id: 'maintainers',
    path: '/docs/maintainers',
    title: 'Maintainers',
    section: 'Community',
    description: 'Repository management, bounty creation, submission review, and best practices for maintainers.',
    content: 'Repository acceptance: submit GitHub repo for review, checked against scoring criteria (public, README 20pts, CONTRIBUTING 15pts, License 15pts, Open Issues 20pts, Recent Activity 20pts). Pass threshold: 60/100. Converting issues to bounties: browse repo issues, set difficulty and reward in XLM, define acceptance criteria. Review workflow: submissions appear for 72-hour review window, approve to release payment or request revisions. Best practices: clear acceptance criteria, realistic deadlines, prompt reviews, constructive feedback, relevant skill tags, organized issues.',
    keywords: ['maintainer', 'repository', 'bounty', 'review', 'issues', 'github', 'management'],
  },
  {
    id: 'funders',
    path: '/docs/funders',
    title: 'Funders',
    section: 'Community',
    description: 'Funding models, Stellar advantages, and impact tracking for organizations funding open source.',
    content: 'Funding models: Task Funding (fixed rewards per task), RetroPGF Rounds (retroactive public goods funding), Continuous Streams (recurring payments that drip in real-time). Why Stellar: 3-5 second settlement, fractions of a cent per transaction, 100% on-chain transparency, 2.5% platform fee. Multi-asset support: native XLM, USDC on Stellar, other Stellar-issued assets. Impact tracking: every transaction recorded on Stellar blockchain, analytics on funding distribution, task completion rates, community growth metrics.',
    keywords: ['funder', 'funding', 'retropgf', 'streams', 'donate', 'support', 'open source'],
  },
  {
    id: 'api-reference',
    path: '/docs/api',
    title: 'API Reference',
    section: 'Reference',
    description: 'API integration guide — authentication, capabilities, and security.',
    content: 'The Stelltask API provides secure programmatic access to the platform. All requests are authenticated using industry-standard token-based auth with automatic session management. Capabilities include authentication, task management, payment processing, user profiles, repository management, and administration. All API traffic is encrypted, rate limited per-user and per-IP, with automatic abuse detection. Full interactive API documentation is available to authorized developers through the platform interface.',
    keywords: ['api', 'integration', 'authentication', 'security', 'capabilities'],
  },
  {
    id: 'privacy-policy',
    path: '/docs/privacy',
    title: 'Privacy Policy',
    section: 'Reference',
    description: 'Privacy policy covering data collection, usage, security, sharing, cookies, and user rights.',
    content: 'Information collected: account info (email, GitHub username, Stellar public key), profile data (bio, skills, timezone), transaction data (task details, submissions, reviews, Stellar hashes), technical data (IP address, browser, device). Data usage: provide platform, process transactions, calculate reputation scores, communicate with users, detect fraud, comply with legal obligations. Security: industry-standard encryption at rest and in transit, strong password hashing, automatic session expiry, regular security audits. Data sharing: no sale of personal data, shared with Stellar network (by design), hosting infrastructure, legal compliance. User rights: access, correct, delete, export, object, withdraw consent.',
    keywords: ['privacy', 'data', 'gdpr', 'security', 'cookies', 'rights', 'policy'],
  },
  {
    id: 'terms-conditions',
    path: '/docs/terms',
    title: 'Terms & Conditions',
    section: 'Reference',
    description: 'Terms of service, eligibility, platform rules, prohibited activities, and dispute resolution.',
    content: 'Acceptance: using platform constitutes agreement to terms. Eligibility: 18+ years, legal capacity to contract, not in prohibited jurisdiction, not on sanctions lists. Platform rules: task creators must fund escrow before publishing, contributors must complete work as specified, disputes reviewed by admins, 2.5% platform fee. Prohibited activities: multiple accounts, collusion/fraud, malicious code, reputation manipulation, money laundering, harassment. Account suspension: violations lead to suspension or ban, funds in escrow resolved before release. Dispute resolution: built-in dispute system, admin decisions final, funds locked until resolution.',
    keywords: ['terms', 'conditions', 'legal', 'rules', 'prohibited', 'disputes', 'service'],
  },
];
