# Design: Asta's Preparation Dashboard

## Stitch status (please read first)

**The design in this repository was not made in Google Stitch yet.** Stitch needs a signed-in Google account, and it would not load in the coding agent's browser: the page stayed blank without a Google session. So this version of the interface was designed directly in code from the PRD and UI/UX guidelines (see "Design method" below), and checked in the browser at phone and desktop sizes.

The Stitch step uses the prompt below (with sections 4, 7, and 8 of `docs/PRD.md`). Its results go in `docs/evidence/stitch-before-*.png` and `stitch-after-*.png`, and the Stitch link and refinement go in the "Stitch design" section at the end of this file.

<details>
<summary>Stitch prompt (starter prompt from the brief, unchanged)</summary>

```
Design a responsive web dashboard called Asta's Preparation Dashboard.

User: Asta, a determined fighter preparing for Lucifero.
Purpose: help him follow a training plan and see completed tasks.

Include a brief Lucifero threat card, three training cards,
completion controls, a completed/total count, and a progress indicator.
Tasks: Sword control, Physical endurance, Team coordination.
Show clear incomplete and completed states.

Use the requirements from my PRD below.
Prioritize readable text, strong contrast, clear hierarchy, and easy-to-tap
controls. Show desktop and mobile versions.
Make the core actions usable without knowing the anime.

The progress percentage means training-plan completion, not a prediction
that Asta will win. Do not add login, payments, chat, or extra features.

[Paste PRD sections 4, 7 and 8 here.]
```

</details>

## Design method

1. Sections and rules came from `docs/PRD.md` (sections 7 and 8).
2. A UI/UX guidelines reference was searched for "training progress tracker, dark mode". Used: *Dark Mode (OLED)* style, green for positive/completed states, visible focus states, `prefers-reduced-motion`, and its checklist (SVG icons, not emoji; 44px touch targets; 150–300ms transitions; animate `transform`, not `width`). Not used: its "webinar registration" page pattern and its esports fonts (Russo One and Chakra Petch), which don't fit a calm planning tool and are less readable at body size.
3. A structured design critique (first impression, usability, hierarchy, consistency, accessibility) found the mobile problem fixed in the refinement below.

## Selected design

### Sections (top to bottom)

1. **Header:** eyebrow "Black Bulls · Training plan", title, one-sentence goal.
2. **Preparation progress:** `n / 3 tasks complete`, large percentage, progress bar, and the sentence "The percentage shows how much of Asta's training plan is complete. It is not a prediction of the fight with Lucifero."
3. **Threat brief:** Lucifero, gravity magic, status "Approaching". Compact, read-only, with no fake buttons.
4. **Training tasks:** three cards, each with a priority badge, a status (icon + text), name, description, and one full-width button.
5. **Footer note:** progress resets on refresh; fictional-scenario credit.

On wide screens, progress and the threat brief sit side by side and the tasks form a three-column grid. On phones everything is one column.

### Colour

| Token | Hex | Used for | Contrast |
| --- | --- | --- | --- |
| `charcoal` | `#141518` | Page background | — |
| `surface` | `#1d1f24` | Cards | — |
| `raised` | `#262930` | Completed cards, inner boxes, empty progress track | — |
| `line` | `#3a3d46` | Borders | — |
| `warm` | `#f5efe4` | Main text, focus outline | 15.95:1 on charcoal |
| `dim` | `#bdb5a8` | Secondary text | 8.12:1 on surface |
| `ember` | `#c8202f` | Primary button, progress fill (the one red accent) | white text 5.67:1 |
| `ember-text` | `#ff7a85` | Red labels and "High priority" on dark | 6.57:1 on surface |
| `done` | `#7ad19a` | "Completed" status | 7.91:1 on raised |

Every text pair passes WCAG AA (4.5:1). Status never relies on colour alone: a completed card also changes its icon (empty circle → check), its text ("Not started" → "Completed"), its background, and its button label.

### Typography

- **Inter** (body, 16–18px, line height 1.75) for readability.
- **Oswald** (headings and numbers only, uppercase) for a bold, story-inspired feel without hurting body text.
- Both are loaded with `next/font/google`.

### Spacing and shape

- 4px base scale (Tailwind). Cards: `p-5` on phones, `p-6` on desktop. Gaps of 16px between cards and 32px between sections.
- Rounded cards (16px radius), buttons with a 12px radius, and pill badges.
- Buttons are at least 44px tall and full width inside each card.

### Interaction states

| State | Look |
| --- | --- |
| Not started | Red "Mark complete" button, empty-circle icon, grey status text |
| Completed | Outlined "Undo" button, check icon, green "Completed", raised background with a green-tinted border |
| Hover | Darker red, or a surface tint on Undo (200ms colour transition) |
| Keyboard focus | 3px warm-white outline with a 3px offset, visible on every background |
| Reduced motion | No transitions. The bar and colours change instantly. |

## Refinement after the first design

**Change:** on phones, the progress summary moved **above** the threat brief, the intro was cut to one sentence, and the count was made one size smaller so it fits on one line.

**Why:** in the first version at 360px wide, the long intro and the full threat brief came first, and "0 / 3 TASKS COMPLETE" wrapped onto two lines. The progress summary, the thing Asta checks most, only started near the bottom of the first screen, and the tasks were well below it. Asta needs to see his progress at a glance, and the threat brief is background he already knows.

**Result (measured at 360 × 780):** the progress card now ends at 478px, fully on the first screen. In the first version the card only started at about 660px, and its numbers were cut off at the bottom of the screen. The count fits on one line.

| Before | After |
| --- | --- |
| `evidence/design-before-mobile-360.jpg` | `evidence/design-after-mobile-360.jpg` |
| `evidence/design-before-desktop.jpg` | `evidence/design-after-desktop.png` |

Other fixes made during review:

- The progress bar first animated `width`. It now animates `transform: scaleX()` with ease-out, which is smoother and recommended for performance.
- Added `prefers-reduced-motion` support (the first version ignored it).
- The two button styles had different heights (44px vs 45.6px, because only one had a border). Both now have a border, so both are 45.6px.

## Stitch design

*(Pending: Stitch link, before/after screenshots, the refinement made in Stitch and why, and any mismatch fixed between the Stitch design and this implementation.)*
