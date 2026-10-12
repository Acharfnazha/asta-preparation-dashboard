# MCP: Connecting the coding agent to Stitch

## Result: documented fallback (Stitch MCP was not connected)

**No Stitch MCP tool call was made.** This file records why, and what was used instead, as the brief allows: "An honestly documented fallback is accepted; do not claim a connection you did not make."

## Roles in this assignment

| Role | In this project |
| --- | --- |
| **Host** | Claude Code, the AI coding agent, running in the Claude desktop app (Code tab) on Windows 11. |
| **Client** | The MCP client built into Claude Code. It connects to each configured MCP server, lists the tools the server exposes, and sends tool calls when the agent decides to use one. |
| **Server** | The **Stitch MCP server** (a remote HTTP server from Google) would expose Stitch tools such as listing projects and reading screens. It was **not** configured. |

## What was attempted and the actual limitation

1. **Opening Stitch.** The agent opened `https://stitch.withgoogle.com/` in its built-in browser. The page loaded only an empty shell (blank body, with just a hidden Google API frame) because that browser has no signed-in Google account. The agent is not allowed to sign in to accounts or type passwords for the user, so it could not continue.
2. **Getting an API key.** Stitch MCP authenticates with a Stitch API key created in Stitch settings while signed in. Creating or handling that key has to be done by the account owner, so the agent did not create one.
3. **Configuring the server.** Without a key there was nothing to configure. No Stitch credentials exist anywhere in this repository.

So the agent never listed the Stitch server's tools and never called one. Any claim of a Stitch MCP result would be false.

## Fallback used

- The design was created in code from `docs/PRD.md` (sections 7 and 8) and a design-guidance skill, then checked in the browser at 360px and 1280px (`docs/DESIGN.md`).
- The agent did use MCP in its workflow, just not for Stitch. Its built-in browser is an MCP server. Real tool calls from this session include: `preview_start` (start the dev server), `navigate`, `javascript_tool` (click the task buttons and read the summary text for the POC and acceptance tests), `computer` with `key` (Tab, Enter, Space for the keyboard test), and `computer` with `screenshot` (the files in `docs/evidence/`). This shows the same host → client → server pattern: the agent called tools that the browser server exposed and received real results, such as `Completed: 2 / 3 (67%)` after two clicks.

## How the fallback differs from using Stitch MCP

| | Stitch MCP | Fallback used here |
| --- | --- | --- |
| Where the design lives | In a Stitch project, created by the designer | In the code and `DESIGN.md` |
| How the agent gets design context | Calls a Stitch tool and receives structured screens, code or images directly from the selected design | Reads the PRD and DESIGN.md, then inspects its own rendered output in the browser |
| Risk | The agent may still misread the design, but it works from the real source | No independent design to compare against, so "matches the selected design" can only be checked against DESIGN.md |
| Evidence | Screenshot of a successful tool call | This file and the browser screenshots |

A screenshot pasted into a chat is also not MCP. It is a manual handoff of an image, not a tool call to a server.

## How to connect it (for the student to complete)

These steps follow community setup guides. If they differ, use Google's current official Stitch MCP instructions.

1. Sign in at stitch.withgoogle.com, open **Stitch settings → API keys**, and create a key. Keep it private.
2. Register the server with Claude Code in a terminal, replacing the placeholder. Don't paste the key into chat, screenshots, or the repository:
   ```bash
   claude mcp add stitch --transport http https://stitch.googleapis.com/mcp --header "X-Goog-Api-Key: YOUR-API-KEY" -s user
   ```
3. Restart Claude Code and ask it to run the verification prompt from the brief: inspect the tools the server actually exposes, list your Stitch projects, retrieve the design context for Asta's Preparation Dashboard, and summarise what was returned and what is missing.
4. Replace this file's "Result" section with the real tool name, what you asked, a short description of the result, and a screenshot of the call with the key hidden.
