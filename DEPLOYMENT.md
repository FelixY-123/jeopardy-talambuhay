# Deployment Guide

This app is a SvelteKit + Express + Socket.io multiplayer Jeopardy game. It requires a **persistent Node.js server** (not serverless), so we use [Render](https://render.com) for free hosting.

## No API Keys Required

This app has no external service dependencies — no database, no third-party APIs. You only need a GitHub account and a Render account.

## Prerequisites

1. Push this repo to GitHub (if it isn't already):
   ```bash
   git remote add origin https://github.com/<your-username>/jeopardy-talambuhay.git
   git push -u origin main
   ```

## Deploy on Render (Free)

### 1. Create a Render account

Go to [render.com](https://render.com) and sign up with your GitHub account. 

### 2. Create a new Web Service

- Click **New → Web Service**
- Connect your GitHub account and select the `jeopardy-talambuhay` repository
- Click **Connect**

### 3. Configure the service

Fill in the following settings:

| Setting | Value |
|---|---|
| **Name** | `jeopardy-talambuhay` |
| **Region** | Oregon (US West) — or closest to your users |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `NODE_ENV=production npm start` |
| **Instance Type** | `Free` |

> **Domain:** Render will give you `https://jeopardy-talambuhay.onrender.com` if the name is available. If taken, pick a variation like `jeopardy-talambuhay-app`.

### 4. Add environment variable

In the **Environment** section, add:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |

Render automatically sets `PORT`, so you don't need to add that.

### 5. Deploy

Click **Create Web Service**. Render will:
1. Clone your repo
2. Run `npm install && npm run build` (builds the SvelteKit frontend)
3. Start the Express server with `NODE_ENV=production npm start`

The first deploy takes ~3–5 minutes. After that, every `git push` to `main` triggers an automatic redeploy.

## Free Tier Limitations

- **Spin-down:** The free tier pauses the server after 15 minutes of inactivity. The first request after a pause takes ~30 seconds to wake up.
- **750 hours/month:** Enough to run one service continuously.
- **In-memory state:** Game state resets whenever the server restarts or spins down. This is expected for this app.

## Custom Domain (Optional)

If you own a custom domain (e.g., `jeopardy-talambuhay.com`):
1. In Render, go to your service → **Settings → Custom Domains**
2. Add your domain and follow the DNS instructions Render provides
3. Render provides free SSL automatically

## Local Development

```bash
npm install
npm run dev        # Start SvelteKit dev server (frontend only, port 5173)
npm start          # Start Express + Socket.io server (requires build first)
```

For full local testing with Socket.io:
```bash
npm run build      # Build SvelteKit first
NODE_ENV=production npm start   # Then run the full server on port 3000
```
