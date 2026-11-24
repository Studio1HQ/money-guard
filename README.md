<div align="center">

<img src="https://raw.githubusercontent.com/Studio1HQ/Studio1HQ/main/assets/banners/money-guard.webp" alt="Money Guard Financial Assistant with Nebius: A finance dashboard with an AI assistant powered by Nebius" width="100%" />

<br />
<br />

# Money Guard Financial Assistant with Nebius

### A finance dashboard with an AI assistant powered by Nebius

A Next.js financial dashboard with mock transactions, subscriptions and cards, plus an AI assistant that answers money questions using Llama 3.1 70B on Nebius AI Studio.

<br />

[![Built by Studio1](https://img.shields.io/badge/Built_by_Studio1-f97316?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMzVDMCAxNi42ODA3IDE0LjA3NDQgMS42NDg0NCAzMiAwLjEyNjk1M1YxNDFINTEuMDUyM0M1Mi40MzA4IDEzNy4zNDQgNTQuNzQ0NiAxMzMuNjg5IDU3Ljk5MzggMTMwLjAzM0M2MS4xNDQ2IDEyNi41MDggNjQuNjg5MiAxMjMuNDQgNjguNjI3NyAxMjAuODI5QzcyLjU2NjIgMTE4LjM0OSA3Ni4zNTY5IDExNi43ODIgODAgMTE2LjEyOVY4Ni43NTQ0Qzc1LjQ3MDggODcuOTI5MiA3MS4zODQ2IDg5LjY5MTkgNjcuNzQxNSA5Mi4wNDE1QzY0IDk0LjUyMjUgNjAuNzUwOCA5Ny40NiA1Ny45OTM4IDEwMC44NTRDNTYuNTM0NSAxMDIuNzIgNTUuMjU0NSAxMDQuNjU5IDU0LjE1MzkgMTA2LjY3MVYwSDEyNUMxNDQuMzMgMCAxNjAgMTUuNjY5OSAxNjAgMzVWMTI1QzE2MCAxNDQuMzMgMTQ0LjMzIDE2MCAxMjUgMTYwSDEyNFYxOEgxMDQuOTQ4QzEwMy41NjkgMjEuNjgxNiAxMDEuMjU1IDI1LjM2MjggOTguMDA2MiAyOS4wNDQ0Qzk0Ljg1NTQgMzIuNTk0MiA5MS4zMTA4IDM1LjY4NDEgODcuMzcyMyAzOC4zMTRDODMuNDMzOCA0MC44MTIgNzkuNjQzMSA0Mi4zODk2IDc2IDQzLjA0NzRWNzIuNjMwNEM4MC41MjkyIDcxLjQ0NzMgODQuNjE1NCA2OS42NzI0IDg4LjI1ODUgNjcuMzA1N0M5MiA2NC44MDc2IDk1LjI0OTIgNjEuODQ5MSA5OC4wMDYyIDU4LjQzMDdDOTkuNDY1NSA1Ni41NTEzIDEwMC43NDUgNTQuNTk4NiAxMDEuODQ2IDUyLjU3MjNWMTYwSDM1QzE1LjY3IDE2MCAwIDE0NC4zMyAwIDEyNVYzNVoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4K)](https://studio1hq.com)
[![Built with Nebius](https://img.shields.io/badge/Built_with_Nebius-141414?style=for-the-badge)](https://nebius.com)
[![Live demo](https://img.shields.io/badge/Live_demo-1c1917?style=for-the-badge&logo=vercel&logoColor=white)](https://nebius-money-guard.vercel.app/)

[Nebius docs](https://docs.tokenfactory.nebius.com) &nbsp;·&nbsp; [Nebius](https://nebius.com) &nbsp;·&nbsp; [More examples](https://github.com/Studio1HQ) &nbsp;·&nbsp; [studio1hq.com](https://studio1hq.com)

</div>

<br />

## Overview

Money Guard is a full-stack Next.js financial dashboard. It shows a balance, recent transactions, subscriptions and cards, and pairs them with an AI assistant that answers questions about your finances. The assistant calls a Llama 3.1 70B model on [Nebius AI Studio](https://docs.nebius.com/studio/inference/) from a Next.js API route.

State lives in a [Zustand](https://zustand-demo.pmnd.rs) store, and the financial data is mock data bundled with the app. It is a reference for wiring an LLM assistant into a data-heavy dashboard.

## Features

- **Transactions**: a list of income and expense transactions.
- **Subscriptions and cards**: recurring subscriptions and card balances shown next to the transaction list.
- **Financial summary**: totals for income, expenses and balance are computed from the transactions, with mock percentage changes for savings, income and expenses.
- **AI assistant**: preset prompts ("List my subscriptions", "More on my bills...", "Should I buy or rent?") and a free-text prompt box send questions to Nebius.
- **Markdown answers**: model replies are rendered as Markdown with a typing effect.
- **Loading states**: buttons and the response area show progress while a request runs.

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 14 and [React](https://react.dev) |
| State | [Zustand](https://zustand-demo.pmnd.rs) |
| LLM | [Nebius AI Studio](https://docs.nebius.com/studio/inference/), `meta-llama/Meta-Llama-3.1-70B-Instruct` |
| Client | [OpenAI Node SDK](https://github.com/openai/openai-node) with a custom base URL |
| UI | [Tailwind CSS](https://tailwindcss.com), shadcn/ui components |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Deployment | [Vercel](https://vercel.com) |

## Getting started

### Prerequisites

- Node.js 18 or later
- A Nebius AI Studio API key

### Installation

```bash
git clone https://github.com/Studio1HQ/money-guard.git
cd money-guard
npm install
```

### Environment variables

Create `.env.local`:

| Variable | Description |
| --- | --- |
| `NEBIUS_API_KEY` | Nebius AI Studio API key from the [Nebius Studio inference docs](https://docs.nebius.com/studio/inference/). |

### Run

```bash
npm run dev
```

Open <http://localhost:3000>. A live deployment is at <https://nebius-money-guard.vercel.app/>.

## How it works

```text
app/page.tsx                  dashboard page
app/api/nebius/route.ts       POST: chat messages -> Nebius completion
store/useNebius.ts            Zustand store: data, totals, assistant state
lib/mockData.ts               mock transactions, subscriptions, cards
lib/financialApi.ts           client call to /api/nebius
utils/financialUtils.ts       response parsing
components/features/          summary, cards, transactions, prompt input, Markdown renderer
```

The store loads mock data and calculates totals. When you click a preset or submit a prompt, `handleButtonClick` sends the messages to `/api/nebius`. That route forwards them to `https://api.studio.nebius.ai/v1/` with `max_tokens` defaulting to 500 and `temperature` to 0.7, and returns the model's message to the UI.

## Resources

- [Nebius AI Studio inference docs](https://docs.nebius.com/studio/inference/): API keys and models.
- [Nebius Token Factory docs](https://docs.tokenfactory.nebius.com): current docs for Nebius inference.
- [Nebius](https://nebius.com): the platform site.
- [Live demo](https://nebius-money-guard.vercel.app/): deployed app.

<br />

---

<div align="center">

<a href="https://studio1hq.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-dark.svg" />
    <img src="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-light.svg" alt="Studio1" width="160" />
  </picture>
</a>

Built by **[Studio1](https://studio1hq.com)**, the technical content and DevRel partner for devtool teams. Made with [Nebius](https://nebius.com).<br />
Browse more open-source examples at [github.com/Studio1HQ](https://github.com/Studio1HQ).

[![Website](https://img.shields.io/badge/studio1hq.com-0b0807?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studio1hq.com)
[![Book a call](https://img.shields.io/badge/Book_a_strategy_call-f97316?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://cal.com/studio1/collab)
[![X](https://img.shields.io/badge/%40Studio1HQ-141414?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Studio1HQ)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/studio1hq/)

<sub><a href="https://studio1hq.com">studio1hq.com</a> · Technical content, docs, video and DevRel for devtools</sub>

</div>
