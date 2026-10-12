# MCP: Connecting the coding agent to Stitch

## Result: documented fallback (Stitch MCP was not connected)

**No Stitch MCP tool call was made.** This file records why, and what was used instead, as the brief allows: "An honestly documented fallback is accepted; do not claim a connection you did not make."

## Roles in this assignment

| Role | In this project |
| --- | --- |
| **Host** | My AI coding agent, a desktop coding application running on Windows 11. |
| **Client** | The MCP client built into that application. It connects to each configured MCP server, lists the tools the server exposes, and sends tool calls when the agent decides to use one. |
| **Server** | The **Stitch MCP server** (a remote HTTP server from Google) would expose Stitch tools such as listing projects and reading screens. It was **not** configured. |

## What was attempted and the actual limitation

1. **Opening Stitch.** The coding agent opened `https://stitch.withgoogle.com/` in its built-in browser. The page loaded only an empty shell (blank body, with just a hidden Google API frame) because that browser had no signed-in Google account.
2. **Getting an API key.** Stitch MCP authenticates with a Stitch API key, created in Stitch settings while signed in. No key was created for this version.
3. **Configuring the server.** Without a key there was nothing to configure. No Stitch credentials exist anywhere in this repository.

So the Stitch server's tools were never listed and never called. Any claim of a Stitch MCP result would be false.

## Fallback used

- The design was created in code from `docs/PRD.md` (sections 7 and 8) and UI/UX guidelines, then checked in the browser at 360px and 1280px (`docs/DESIGN.md`).
- MCP was still part of the workflow, just not for Stitch. The coding agent's built-in browser is itself an MCP server, and the agent used its tools to start the dev server, open the page, click the task buttons and read the summary text (the POC and acceptance tests), press Tab, Enter and Space (the keyboard test), and take screenshots (the files in `docs/evidence/`). This is the same host → client → server pattern: the agent called tools the browser server exposed and got real results back, such as `Completed: 2 / 3 (67%)` after two clicks.

## How the fallback differs from using Stitch MCP

| | Stitch MCP | Fallback used here |
| --- | --- | --- |
| Where the design lives | In a Stitch project, created by the designer | In the code and `DESIGN.md` |
| How the agent gets design context | Calls a Stitch tool and receives structured screens, code or images directly from the selected design | Reads the PRD and DESIGN.md, then inspects its own rendered output in the browser |
| Risk | The agent may still misread the design, but it works from the real source | No independent design to compare against, so "matches the selected design" can only be checked against DESIGN.md |
| Evidence | Screenshot of a successful tool call | This file and the browser screenshots |

A screenshot pasted into a chat is also not MCP. It is a manual handoff of an image, not a tool call to a server.

## How to connect it

Follow Google's current official Stitch MCP instructions for your coding application. In short:

1. Sign in at stitch.withgoogle.com, open **Stitch settings → API keys**, and create a key. Keep it private.
2. Add the remote Stitch MCP server (`https://stitch.googleapis.com/mcp`) in the coding application's MCP server settings, with the key in its private configuration (an `X-Goog-Api-Key` header). Never commit the key or show it in screenshots.
3. Restart the application and run the verification prompt from the brief: inspect the tools the server actually exposes, list the Stitch projects, retrieve the design context for Asta's Preparation Dashboard, and summarise what was returned and what is missing.
4. Replace this file's "Result" section with the real tool name, what was asked, a short description of the result, and a screenshot of the call with the key hidden.
