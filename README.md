# Ariel McNichol - Case Study Chatbot

A floating chatbot widget that answers questions about my portfolio case studies.

## Quick Deploy via Netlify

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
