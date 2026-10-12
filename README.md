# Asta's Preparation Dashboard

**Student:** Achraf Nazha
**Course:** TechTalks · Assignment 02: Asta's Plan Against Lucifero
**Branch:** `assignment-2-asta-mvp`
**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4

A single-screen web app that helps Asta follow his training plan before Lucifero arrives. It shows three training tasks with descriptions and priorities, lets him mark each one complete (and undo it), and shows how much of the plan is done as a count (`2 / 3`) and a percentage (`67%`). The percentage measures plan completion only. It is not a prediction of the fight.

This is a fictional teaching scenario. Characters come from *Black Clover* by Yuki Tabata. The dashboard, tasks, and scenario were created for this assignment.

## Run it locally

You need Node.js 20.9 or newer.

```bash
git clone https://github.com/Acharfnazha/asta-preparation-dashboard.git
cd asta-preparation-dashboard
git switch assignment-2-asta-mvp
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts: `npm run lint`, `npm run build`, `npm start` (after a build).

## How it works

- `src/app/page.tsx` is a **Server Component** with the static content: header, threat brief, footer.
- `src/components/training-plan.tsx` is the only **Client Component**. It needs `useState` and click handlers. It holds one piece of state, a `Set` of completed task IDs.
- `src/lib/progress.ts` contains two pure functions reused from the POC: `toggleTask` (add or remove an ID, returning a new Set) and `calculateProgress` (count, total, and a rounded, clamped percentage). The count, percentage, card status, and progress bar are all derived from the same Set, so they always agree.
- `src/lib/tasks.ts` contains the three predefined tasks.

## Limitations

- **Progress is session-only.** Refreshing the page resets every task to "Not started". This is intentional for v1 and is stated on the page.
- Tasks are fixed: they can't be added, edited, or deleted.
- One screen and one user. No login, database, or saved history.
- Tested in Chromium-based browsers. Not tested with a real screen reader.
- **Stitch:** the design was not made in Google Stitch yet, and Stitch MCP was not connected. The documented fallback is in `docs/MCP.md` and `docs/DESIGN.md`.

## Documents

| File | Contents |
| --- | --- |
| [`docs/PRD.md`](docs/PRD.md) | Reviewed requirements (v1.1): user, problem, three features, acceptance criteria, scope |
| [`docs/DESIGN.md`](docs/DESIGN.md) | Visual decisions (colours with contrast, typography, spacing, sections), the refinement with before/after screenshots, Stitch status |
| [`docs/MCP.md`](docs/MCP.md) | Host, client, and server roles, why Stitch MCP wasn't connected, the fallback, how to connect it |
| [`docs/POC.md`](docs/POC.md) | Feasibility question, actual test results, observations, decision |
| [`docs/REVIEW.md`](docs/REVIEW.md) | PRD corrections, verification results, design vs implementation, one-person test, reflection |
| [`docs/evidence/`](docs/evidence/) | Screenshots of the POC and the MVP (before/after, desktop/mobile, keyboard focus) |

## Git history

The commits follow the assignment workflow:

1. `Initial Next.js starter`
2. `Draft PRD with AI planning partner (before review)`
3. `Review PRD: …` (the corrections listed in REVIEW.md)
4. `Test training progress proof of concept`
5. `Complete Asta preparation MVP`
