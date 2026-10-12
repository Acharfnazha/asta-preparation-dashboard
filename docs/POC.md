# POC: Training progress consistency

## Question

Can task completion and the progress summary (`completed / total` and percentage) stay consistent when tasks are completed, undone, and toggled repeatedly?

## Approach

A deliberately small experiment, committed as `Test training progress proof of concept`:

- `src/lib/tasks.ts`: the three fictional tasks as a typed constant.
- `src/lib/progress.ts`: two pure functions.
  - `toggleTask(completedIds, taskId)` returns a **new** `Set` with the task added or removed.
  - `calculateProgress(taskIds, completedIds)` derives `completed`, `total`, and `percentage = round(completed / total × 100)`, clamped to 0–100.
- `src/components/poc-progress.tsx`: a Client Component holding **one piece of state**, the `Set` of completed task IDs. The count and the percentage are calculated from it on every render and never stored separately. The update uses the functional form, `setCompletedIds((ids) => toggleTask(ids, task.id))`, so each click works from the latest state.
- `src/app/page.tsx`: plain page with the question, the summary line, and three buttons. No design work.

The test was run in the browser against `npm run dev` (Next.js 16.4.0), by clicking the real buttons and reading the rendered summary text after each step.

## Actual results

| Action | Expected | Actual | Pass |
| --- | --- | --- | --- |
| Start with no tasks complete | 0 / 3 and 0% | `Completed: 0 / 3 (0%)` | ✅ |
| Complete one task (Sword control) | 1 / 3 and 33% | `Completed: 1 / 3 (33%)` | ✅ |
| Complete a second task (Physical endurance) | 2 / 3 and 67% | `Completed: 2 / 3 (67%)` | ✅ |
| Complete all tasks (Team coordination) | 3 / 3 and 100% | `Completed: 3 / 3 (100%)` | ✅ |
| Undo one completed task (Physical endurance) | 2 / 3 and 67% | `Completed: 2 / 3 (67%)`, with Sword control and Team coordination still "done" | ✅ |
| Toggle the same task repeatedly (Sword control, 9 clicks from 2 / 3) | Count stays between 0 and 3 and reflects current states | Alternated `1 / 3 (33%)` ↔ `2 / 3 (67%)` on every click; ended at `1 / 3 (33%)` after an odd number of clicks, matching the task list | ✅ |

Extra checks:

| Check | Result |
| --- | --- |
| 20 rapid clicks on one task with no pause, then 21 more | Even count returned to the starting state (`1 / 3`), odd count flipped it (`0 / 3`). No lost or doubled updates. |
| Keyboard: Tab to the first button, press Space | Focus moved to the button and the task toggled (`0 / 3` → `1 / 3`). |
| Refresh the page | Reset to `0 / 3 (0%)`, as the PRD expects for session-only state. |

Screenshot: `docs/evidence/poc-2-of-3.jpg` (two tasks complete, summary shows `2 / 3 (67%)`).

## Issues and observations

1. **The controls don't look like controls.** Tailwind's base reset removes the browser's default button styling, so "Complete" and "Undo" render as plain text next to the task name (see the screenshot). Someone who doesn't already know where to click would not find them. The browser's default focus ring is also only a thin 0.8px outline. **MVP change:** style the toggle as a clear, full-width button at least 44px tall, with a thick, high-contrast focus outline.
2. **"Undo" has no context on its own.** A screen reader moving from button to button hears "Undo, toggle button, pressed" without hearing which task it belongs to. **MVP change:** keep the short visible label, but give each button an accessible name that includes the task ("Undo Sword control").
3. **Rounding needs to be explicit.** `1 / 3` is 33.33…%. Without `Math.round` the summary would show long decimals. The rule is now written in the PRD.

## What the POC did not prove

It proves the state and calculation logic works for three fixed tasks in one browser session. It does not prove that the final design is readable, that the mobile layout works, that Asta would find the dashboard useful, or that the product is wanted.

## Decision

**Continue.** The single-source-of-truth approach (one `Set` of completed IDs, with everything else derived) passed every test, so `src/lib/progress.ts` is reused unchanged in the MVP. The three observations above become MVP requirements.
