# Aurelia Fine Jewels — Netlify Deployment Guide

This project is fully configured for continuous deployment on **Netlify**.

---

## 1. Quick Deploy via Netlify Dashboard (Recommended)

1. **Push your repository** to GitHub, GitLab, or Bitbucket.
2. Log in to [Netlify](https://app.netlify.com/).
3. Click **"Add new site"** → **"Import an existing project"**.
4. Select your Git provider and choose the `aurelia-fine-jewels` repository.
5. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `20`
6. Click **"Deploy site"**. Your site will be live with full client-side routing support.

---

## 2. Deploy via Netlify CLI

If you prefer using the command line:

```bash
# 1. Install Netlify CLI globally
npm install -g netlify-cli

# 2. Build the production bundle
npm run build

# 3. Deploy to Netlify
netlify deploy --prod --dir=dist
```

---

## 3. Pre-configured Netlify Settings Included

- **`netlify.toml`**: Configures the build pipeline, Node.js 20 runtime, security headers, and Single Page Application rewrite rules.
- **`public/_redirects`**: Automatically copied to `dist/_redirects` on build:
  ```text
  /*    /index.html   200
  ```
  This ensures that direct deep links (e.g. `/collections/gold`, `/products/celeste-solitaire-diamond-ring`, `/checkout`, `/account`, `/admin`) reload without returning 404 errors.
