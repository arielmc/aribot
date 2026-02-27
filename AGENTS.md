# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

AriBot is a React chatbot widget (Vite + React 18) with a Netlify serverless function backend that proxies to the Anthropic Claude API. See `README.md` for tech stack details.

### Running locally

Use `netlify dev` (not `npm run dev`) to run the full stack locally. This starts both the Vite dev server and the Netlify Functions runtime on port 8888. Running `npm run dev` alone only starts the Vite frontend without the serverless function backend.

### Required secrets

- `ANTHROPIC_API_KEY` — needed by `netlify/functions/chat.js` to call the Anthropic API. Without it the chatbot returns "Connection hiccup" errors. Set it via environment variable before running `netlify dev`.

### Build & dev commands

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server (full stack) | `netlify dev` |
| Frontend only | `npm run dev` |
| Production build | `npm run build` |
| Preview build | `npm run preview` |

### Gotchas

- The project uses `"type": "module"` in `package.json`, but `netlify/functions/chat.js` uses CommonJS `module.exports`. Netlify CLI logs a warning about this — it is harmless and the function loads correctly.
- No lockfile exists in the repo; `npm install` resolves versions from `package.json` ranges.
- No linter or test framework is configured in this project.
- The Netlify CLI is required globally (`npm install -g netlify-cli`) and is installed by the VM snapshot.
