# Review: Asta's Preparation Dashboard

## 1. PRD review: what was corrected in the AI draft

The unreviewed draft from the AI planning partner is in Git history (`Draft PRD with AI planning partner (before review)`) and the corrected version is the next commit (`Review PRD: …`), so the changes can be compared with `git log -p -- docs/PRD.md`.

| AI draft said | Problem | Changed to |
| --- | --- | --- |
| "readiness percentage", "battle readiness … how prepared I am to face Lucifero" | Reads as a prediction of winning the fight. The brief says the number means plan completion only. | "Plan-completion percentage", with an on-screen sentence saying it is not a prediction of the fight. |
| `completed / total × 100`, no rounding rule | 1 of 3 gives 33.333…%. The behaviour was undefined and untestable. | `Math.round`, clamped to 0–100, with a table of the exact expected values (0, 33, 67, 100). |
| "A nice improvement would be saving it in `localStorage`" | Unrequested persistence. It makes "refresh behaviour" unclear, and the brief says session-only is fine if stated. | Session-only state, stated in the PRD, the page, and the README. `localStorage` is listed as excluded. |
| "A 'Reset all' button can help Asta start a new training day" | A fourth feature. The scope is exactly three. | Removed and listed as out of scope. |
| Acceptance criteria such as "the layout works on mobile and desktop" | Not checkable. | 13 numbered criteria with concrete checks (360px, 44px buttons, keyboard keys, exact counts). |

Two more changes came later (PRD v1.1), from the POC and the build:

- **`aria-pressed` was removed.** PRD v1.0 asked for `aria-pressed` on the toggle buttons. But the visible label also changes ("Mark complete" ↔ "Undo"). Combining a changing label with `aria-pressed` makes screen readers say things like "Undo, toggle button, pressed", which is confusing. The fix is labels that change and include the task ("Mark complete – Sword control"), plus a live-region announcement.
- **Progress moved above the threat brief** to fix the mobile first screen (see DESIGN.md).

## 2. Verification (actual results)

**Scripts** (run on Next.js 16.4.0):

| Script | Result |
| --- | --- |
| `npm run lint` | Passed, no warnings or errors |
| `npx tsc --noEmit` | Passed |
| `npm run build` | Passed. `/` prerendered as static content |

**Acceptance criteria**, checked by hand in the browser (`npm run dev`), with button clicks and key presses, then reading the rendered page:

| # | Criterion | Result |
| --- | --- | --- |
| 1 | Title, goal and short Lucifero threat brief | ✅ |
| 2 | Three cards with name, description and priority (High / Medium / High) | ✅ Read from the page: "Sword control: High priority", "Physical endurance: Medium priority", "Team coordination: High priority" |
| 3 | Starts at "Not started", `0 / 3`, `0%` | ✅ |
| 4 | One button per card; label and status change | ✅ "Mark complete" ↔ "Undo", "Not started" ↔ "Completed" |
| 5 | Count and percentage always match the cards | ✅ Sequence: 0/3·0% → 1/3·33% → 2/3·67% → 3/3·100% → undo → 2/3·67%. Then 15 mixed toggles were checked after every click, all consistent, and 30 rapid clicks on one task ended at the right state. The progress bar's `aria-valuenow` and scale matched too (`scaleX(0.33)` at 33%). |
| 6 | Never below 0% or above 100% | ✅ Clamped in `calculateProgress`. The reachable values are only 0/33/67/100. |
| 7 | Label explains plan completion, not a prediction | ✅ |
| 8 | Keyboard operable, visible focus | ✅ Tab reached each button; Enter and Space both toggled. Focus shows a 3px warm-white outline (screenshot `evidence/mvp-desktop-2-of-3-keyboard-focus.jpg`). |
| 9 | Accessible names and announcements | ✅ Button names, for example "Undo – Physical endurance". Live region: "Physical endurance completed. 2 of 3 tasks complete, 67% of the plan." |
| 10 | Readable at 360px, no horizontal scroll, 44px buttons | ✅ `scrollWidth` = 360 at a 360px viewport. Body text is 16px. Buttons are 45.6px tall. |
| 11 | Refresh resets, and the page says so | ✅ `2 / 3` → reload → `0 / 3`, all "Not started" |
| 12 | No decorative buttons or links | ✅ The page has exactly 3 buttons (the task toggles) and 0 links |
| 13 | No credentials in the repository | ✅ `git grep` for key, secret and token patterns found none. There are no `.env` files. |

**Colour contrast:** all text pairs pass WCAG AA. The lowest is white on the red button at 5.67:1 (full table in DESIGN.md).

**What could not be verified:**

- Real screen-reader output (NVDA or VoiceOver) was not tested. The accessible names and live-region text were read from the page, not heard.
- Only Chromium-based browsers were used (Chrome engine and headless Edge).
- No automated test suite exists. The checks above were run by hand through browser automation.

## 3. Design vs implementation

There is no Stitch design yet (see DESIGN.md and MCP.md), so the implementation was compared with DESIGN.md and PRD section 8. Mismatches found and fixed:

1. **Mobile first screen:** progress was below the fold at 360px. Fixed by moving it first and shortening the intro (before/after screenshots in `evidence/`).
2. **Unequal button heights:** "Mark complete" was 44px and "Undo" 45.6px, because only one had a border. Fixed.
3. **Motion:** the bar animated `width` and ignored reduced-motion settings. Fixed: it now animates `transform`, and transitions turn off with `prefers-reduced-motion`.

When the Stitch design exists, compare it with the running app and record at least one mismatch here.

## 4. Try it with one person

*(Pending: filled in after a real test with one person.)*

A classmate or friend is asked to (1) find the training tasks, (2) complete a task, and (3) explain what the percentage means.

- **Who** (first name or "a classmate") and the device used:
- **What they did** for each of the three steps:
- **What they said the percentage means**, in their words:
- **What confused them:**
- **One improvement made or planned because of it:**

## 5. Notes from the build

- The Tailwind CSS loader in this Next.js 16.4 setup did not hot-reload `globals.css` theme changes. After editing theme colours, the dev server had to be restarted before the new colours appeared.
- Browser screenshots taken immediately after a click sometimes caught the 300ms transition halfway through. The final state was confirmed by reading the computed styles.

## 6. Answers to the reflection questions

**How did your PRD prevent an unnecessary feature?**
The AI draft suggested a "Reset all" button and saving progress in `localStorage`. The scope says exactly three features and allows session-only state, so the reviewed PRD lists both under "Explicitly excluded". When building, there was a clear rule to point to instead of adding them "because they're nice".

**What did the POC test, and what did it not prove?**
It tested one question: do the count and percentage stay correct when tasks are completed, undone, and toggled repeatedly, including rapid clicks? Every case passed. It did not prove that the design is readable, that the mobile layout works, or that Asta (or anyone) wants this tool.

**Why is this MVP useful even though it is small?**
It solves the exact problem in the brief: Asta can see his three tasks, mark them done, undo mistakes, and see how much of the plan is complete, on a phone or laptop. Because it is small, it is easy to test fully and to get feedback on before adding anything.

**What did MCP allow your agent to do, or how did your fallback work?**
Stitch MCP was not connected: it needs a signed-in Google account and an API key, which only the account owner can create. The fallback was designing from the PRD in code and checking it in the browser. The agent did use MCP for its browser tools (clicking buttons, reading the page, taking screenshots), which shows the host / client / server roles in practice.

**Which AI-generated decision did you correct?**
The AI draft called the percentage "battle readiness … how prepared I am to face Lucifero". That suggests a prediction of winning, which the brief rules out, so it became "plan completion", with a sentence on the page. The draft's `aria-pressed` requirement was also replaced, because it conflicts with button labels that change.

**Explain the task state and progress calculation.**
There is one piece of state: a `Set` of completed task IDs, held with `useState` in the `TrainingPlan` Client Component. Clicking a button calls `toggleTask`, which returns a new `Set` with that ID added or removed, using the functional form of `setState` so it always works from the latest state. Nothing else is stored. On every render, `calculateProgress` counts how many of the three task IDs are in the Set, divides by 3, multiplies by 100, rounds, and clamps between 0 and 100. Because the count, percentage, card status and bar all come from that one Set, they can't disagree.

**If agents can generate code, what decisions and checks were still your responsibility?**
Deciding the scope and what to leave out, rejecting AI suggestions that broke the brief, checking that the numbers are right in a real browser rather than trusting that the build passed, making sure the docs don't claim things that didn't happen (such as a Stitch connection or user feedback), testing with a real person, and keeping credentials out of the repository.
