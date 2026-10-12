# PRD: Asta's Preparation Dashboard

**Status:** v1.0, reviewed (see `docs/REVIEW.md` for what changed from the AI draft)
**Owner:** Achraf Nazha
**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4

## 1. Product name and summary

**Asta's Preparation Dashboard** is a single-screen web app. It shows Asta his three training tasks before Lucifero arrives, lets him mark each one as complete (and undo it), and shows how much of his training plan is finished as a count and a percentage.

## 2. Primary user and problem

**Primary user:** Asta, a fictional young Magic Knight of the Black Bulls. He was born without magic and fights with anti-magic swords. He is determined, but his preparation is disorganised.

**Problem:** Lucifero, a powerful devil who uses gravity magic, is approaching. Asta's training tasks are scattered across notes, he forgets what he has already completed, and he cannot quickly see how much of his plan is done.

**What Asta needs:** to know what to practise next, what he has finished, and how much of his preparation plan is complete. He does not need motivation or predictions.

> This is a fictional teaching scenario. No user research was done, and nothing in this PRD claims the product is validated.

## 3. Goal of the first version

Let Asta follow a fixed three-task training plan on one screen: see every task, mark tasks complete or incomplete, and read an accurate completion summary at a glance, on a phone or a laptop.

## 4. Core features (exactly three)

1. **View training tasks.** Show the three predefined tasks, each with its name, description, priority, and current status.
2. **Toggle completion.** Each task has one button that marks it complete. Pressing it again undoes the completion.
3. **See calculated progress.** Show `completed / total` (for example `2 / 3`) and a plan-completion percentage derived from it.

**Progress rule:** `percentage = Math.round((completed / total) × 100)`, kept between 0 and 100. This gives 0%, 33%, 67%, and 100% for 0–3 completed tasks. The count and the percentage are both calculated from the task list on every render. They are never stored separately, so they cannot drift apart.

## 5. User stories

- As Asta, I want to see all my training tasks in one place, so that I know what to practise next.
- As Asta, I want to mark a task as complete, so that I remember what I have finished.
- As Asta, I want to undo a completion, so that I can fix a task I marked by mistake.
- As Asta, I want to see how many tasks are done and what percentage of my plan is complete, so that I know how much preparation is left.

## 6. Sample data and expected behaviour

| Task | Description | Priority | Initial state |
| --- | --- | --- | --- |
| Sword control | Practise precise anti-magic sword movements. | High | Incomplete |
| Physical endurance | Complete a focused strength and stamina session. | Medium | Incomplete |
| Team coordination | Review a preparation plan with the Black Bulls. | High | Incomplete |

These are teaching examples, not official character statistics.

| Action | Expected count | Expected percentage |
| --- | --- | --- |
| Page loads | 0 / 3 | 0% |
| Complete one task | 1 / 3 | 33% |
| Complete a second task | 2 / 3 | 67% |
| Complete the third task | 3 / 3 | 100% |
| Undo one completed task | 2 / 3 | 67% |
| Toggle the same task repeatedly | Always between 0 / 3 and 3 / 3, matching the tasks currently marked complete | Always 0–100% |
| Refresh the page | 0 / 3 | 0% (state is session-only) |

## 7. Acceptance criteria

Each item can be checked by hand in the browser.

1. The page shows a title, a one- or two-sentence introduction to Asta's goal, and a short Lucifero threat brief.
2. Exactly three task cards appear, each showing the name, description, and priority from section 6.
3. Every task starts as "Not started", and the summary starts at `0 / 3` and `0%`.
4. Each card has one button. Its label says what it will do ("Mark complete" or "Undo"), and the card's status text changes between "Not started" and "Completed".
5. After any sequence of clicks, the count equals the number of cards showing "Completed", and the percentage equals the progress rule in section 4.
6. The percentage never shows below 0% or above 100%.
7. A visible label explains that the percentage measures training-plan completion and is not a prediction of the fight.
8. All buttons can be reached with Tab and pressed with Enter or Space, and show a clearly visible focus outline.
9. The button exposes its state to assistive technology (`aria-pressed`), and progress changes are announced through a polite live region.
10. At 360px wide there is no horizontal scrolling, text is readable without zooming, and buttons are at least 44px tall. The layout also works on a desktop screen.
11. Refreshing the page resets all tasks to "Not started". The page says so.
12. There are no buttons or links that look clickable but do nothing.
13. The repository contains no API keys or other credentials.

## 8. Design and accessibility requirements

- **Sections, in order:** header (title + goal), Lucifero threat brief, progress summary, three task cards, short note about refresh behaviour.
- **Palette:** dark charcoal background, warm white text, one restrained red accent for primary actions and progress. Status must not rely on colour alone: completed cards also change their text and icon.
- **Contrast:** body text and button labels meet WCAG AA (4.5:1).
- **Typography:** one readable sans-serif for body text, at least 16px. A condensed display font is allowed for headings only.
- **Controls:** real `<button>` elements, at least 44px tall, with a visible focus indicator.
- **Responsive:** one column on phones, a three-column task grid on wide screens.
- **Images:** optional. If used, they must not reduce text contrast or push the tasks below the fold on a phone.

## 9. Stack, assumptions, and limitations

- **Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4. The page itself is a Server Component. The interactive part (task list and progress) is one small Client Component, because it needs `useState` and click handlers.
- **Data:** the three tasks are a typed constant in `src/lib/tasks.ts`.
- **State:** held in React state for the current session only. Refreshing resets progress. This is stated on the page and in the README.
- **Assumptions:** Asta uses a modern browser. One user, one device. No network data is needed.
- **Limitations:** no persistence, no history of training days, tasks cannot be changed.

## 10. Explicitly excluded (out of scope for v1)

- Login, accounts, database, payments.
- Chatbots, AI assistants, combat simulation, multiplayer, live anime data.
- Adding, editing, deleting, or reordering tasks.
- Saving progress after refresh (`localStorage` or otherwise).
- A "Reset all" button or any other control beyond the per-task toggle.
- Any route other than `/`.

## Appendix: clarification questions

The planning prompt asks for up to three clarification questions before drafting. These are the questions and the answers used, all taken from the assignment brief:

1. **Should the percentage be rounded?** Yes, to the nearest whole number, so 1 of 3 shows 33% and 2 of 3 shows 67%, matching the POC test table.
2. **Should progress survive a refresh?** No. Session-only state is acceptable in the brief, so v1 resets on refresh and says so.
3. **Can tasks be added or edited?** No. The three tasks are fixed for v1.
