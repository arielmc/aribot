# Ariel McNichol - Case Study Chatbot

A floating chatbot widget that answers questions about your portfolio case studies.

## Quick Deploy to Netlify

### 1. Push to GitHub

```bash
cd ariel-chatbot
git init
git add .
git commit -m "Initial commit"
gh repo create ariel-chatbot --public --push
```

Or create a repo manually and push.

### 2. Deploy on Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repo
4. Build settings should auto-detect:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy"

### 3. Add your Anthropic API Key

1. In Netlify, go to **Site settings** → **Environment variables**
2. Add: `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
3. Trigger a redeploy

### 4. Embed on Your WordPress Site

Once deployed, you'll get a URL like `https://your-site.netlify.app`

Add this to your WordPress site (via Custom HTML block or theme footer):

```html
<div id="ariel-chatbot-root"></div>
<script type="module" src="https://your-site.netlify.app/ariel-chatbot.js"></script>
```

Or use an iframe:

```html
<iframe 
  src="https://your-site.netlify.app" 
  style="position:fixed;bottom:0;right:0;width:420px;height:600px;border:none;z-index:9999;"
  allow="clipboard-write"
></iframe>
```

## Local Development

```bash
npm install
npm run dev
```

Note: The chat won't work locally without the Netlify function. Use `netlify dev` for full testing:

```bash
npm install -g netlify-cli
netlify dev
```

## Customization

- Edit `src/ChatBot.jsx` to change:
  - Colors and styling (in the `<style>` section)
  - Suggested questions
  - System prompt / case study content

- The `CASE_STUDY_CONTEXT` variable contains all the knowledge about your work. Update it as you add new projects.

## Cost Estimate

Using Claude 3.5 Sonnet:
- ~$0.003 per message exchange
- 1000 conversations/month ≈ $3-5

## Tech Stack

- React 18
- Vite
- Netlify Functions (serverless)
- Anthropic Claude API
