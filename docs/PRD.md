# PRD: Asta's Preparation Dashboard

**Status:** Draft v0.1 (AI-assisted draft, not reviewed yet)
**Stack:** Next.js, TypeScript, Tailwind CSS

## 1. Summary

Asta's Preparation Dashboard is a single-screen web app that shows Asta his training tasks for the fight against Lucifero, lets him mark each task as done, and shows how ready he is.

## 2. User and problem

**Primary user:** Asta, a fictional Magic Knight of the Black Bulls with no magic of his own, who fights using anti-magic swords.

**Problem:** Lucifero, a devil who uses gravity magic, is approaching. Asta's training tasks are scattered across notes. He forgets what he has finished and cannot quickly see how prepared he is.

## 3. Goal of the first version

Give Asta one place to see his training tasks, mark them complete, and see his readiness at a glance.

## 4. Core features

1. **View training tasks:** show the three predefined tasks with description and priority.
2. **Toggle completion:** each task can be marked complete and marked incomplete again.
3. **See calculated progress:** show completed / total and a readiness percentage (`completed / total × 100`).

## 5. User stories

- As Asta, I want to see all my training tasks in one place so that I know what to practise next.
- As Asta, I want to mark a task as complete so that I remember what I have finished.
- As Asta, I want to undo a completion in case I marked the wrong task.
- As Asta, I want to see my battle readiness percentage so that I know how prepared I am to face Lucifero.

## 6. Sample data

| Task | Description | Priority | Initial state |
| --- | --- | --- | --- |
| Sword control | Practise precise anti-magic sword movements. | High | Incomplete |
| Physical endurance | Complete a focused strength and stamina session. | Medium | Incomplete |
| Team coordination | Review a preparation plan with the Black Bulls. | High | Incomplete |

## 7. Acceptance criteria

- The dashboard shows the three tasks with their descriptions and priorities.
- Each task has a button to mark it complete, and the button can undo it.
- The count shows completed / total.
- The readiness percentage updates when tasks change.
- The layout works on mobile and desktop.

## 8. Design and accessibility

- Dark theme inspired by the Black Bulls: charcoal background, warm white text, red accent.
- A brief Lucifero threat card at the top.
- Progress bar for readiness.
- Buttons must be keyboard accessible.

## 9. Assumptions and limitations

- Tasks are hard-coded.
- Progress is stored in React state. A nice improvement would be saving it in `localStorage` so it survives refresh.
- A "Reset all" button can help Asta start a new training day.

## 10. Out of scope

Login, accounts, database, payments, chatbot, combat simulation, multiplayer, live anime data, adding/editing/deleting tasks, extra routes.
