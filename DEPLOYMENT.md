# Deployment Guide

This guide shows how to deploy the scoreboard using environment variables to keep your API key secure.

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/JoshhdjUV/Centralcomp.git
   cd Centralcomp
   ```

2. **Create your `.env` file** (for local testing)
   ```bash
   cp .env.example .env
   # Edit .env and add your API key and URL
   ```

3. **Choose a deployment platform** (see below)

---

## Platform-Specific Guides

### 🔷 Netlify (Easiest)

**Step 1**: Push your code to GitHub (already done!)

**Step 2**: Go to [Netlify](https://app.netlify.com) and click **Add new site** → **Import an existing project**

**Step 3**: Choose GitHub and select your repository

**Step 4**: Netlify will auto-detect the settings from `netlify.toml`
- Build command: `npm run build`
- Publish directory: `dist`

**Step 5**: Before deploying, add environment variables:
- Click **Site settings** → **Environment variables** → **Add a variable**
- Add these two variables:
  ```
  SCOREBOARD_API_KEY = your-actual-api-key
  SCOREBOARD_API_URL = https://your-api.com/api/public/competition/scoreboard
  ```

**Step 6**: Click **Deploy site**!

Your scoreboard will be live at `https://your-site-name.netlify.app`

---

### 🔷 Vercel

**Step 1**: Push your code to GitHub (already done!)

**Step 2**: Go to [Vercel](https://vercel.com) and click **Add New** → **Project**

**Step 3**: Import your GitHub repository

**Step 4**: Before deploying, add environment variables:
- Expand **Environment Variables** section
- Add these two variables:
  ```
  SCOREBOARD_API_KEY = your-actual-api-key
  SCOREBOARD_API_URL = https://your-api.com/api/public/competition/scoreboard
  ```

**Step 5**: Click **Deploy**!

Your scoreboard will be live at `https://your-project.vercel.app`

---

### 🔷 GitHub Pages (with GitHub Actions)

**Step 1**: Add secrets to your GitHub repository
- Go to your repo: https://github.com/JoshhdjUV/Centralcomp
- Click **Settings** → **Secrets and variables** → **Actions**
- Click **New repository secret**
- Add these two secrets:
  ```
  SCOREBOARD_API_KEY = your-actual-api-key
  SCOREBOARD_API_URL = https://your-api.com/api/public/competition/scoreboard
  ```

**Step 2**: Enable GitHub Pages
- Go to **Settings** → **Pages**
- Under **Source**, select **Deploy from a branch**
- Select branch: `gh-pages` and folder: `/ (root)`
- Click **Save**

**Step 3**: Push to trigger deployment
```bash
git add .
git commit -m "Enable GitHub Actions deployment"
git push origin main
```

**Step 4**: Wait for the GitHub Action to complete
- Go to **Actions** tab to see the build progress
- Once complete, your site will be live at:
  ```
  https://joshhdjuv.github.io/Centralcomp/
  ```

---

### 🔷 Cloudflare Pages

**Step 1**: Go to [Cloudflare Pages](https://pages.cloudflare.com)

**Step 2**: Click **Create a project** → **Connect to Git**

**Step 3**: Select your repository

**Step 4**: Configure build settings:
- Build command: `npm run build`
- Build output directory: `dist`

**Step 5**: Add environment variables:
- Expand **Environment variables**
- Add:
  ```
  SCOREBOARD_API_KEY = your-actual-api-key
  SCOREBOARD_API_URL = https://your-api.com/api/public/competition/scoreboard
  ```

**Step 6**: Click **Save and Deploy**!

---

## Local Testing

Test the build process locally before deploying:

```bash
# 1. Create .env file
cp .env.example .env

# 2. Edit .env with your actual values
# (Use your text editor)

# 3. Run the build
npm run build

# 4. Open the built file
# The file will be in: dist/index.html
# Open it in your browser to test
```

---

## Security Notes

✅ **DO:**
- Store API keys in environment variables on your deployment platform
- Use `.env` file for local testing (it's in `.gitignore`)
- Rotate API keys if they're exposed

❌ **DON'T:**
- Commit `.env` file to Git (it's already in `.gitignore`)
- Put API keys directly in HTML files that get committed
- Share your `.env` file or API keys publicly

---

## Understanding Client-Side Security

⚠️ **Important**: Even with environment variables, the API key will be visible in the browser's source code after deployment. This is because:

1. The scoreboard runs entirely in the browser (client-side JavaScript)
2. The browser needs the API key to make requests
3. Anyone can view the page source and see the key

**This is OK because:**
- The API key is read-only (scoreboard data only)
- The scoreboard endpoint shows no sensitive information
- The key is the same one used for the public booking embed

**For additional security:**
- Use API rate limiting on your backend
- Restrict the API key to specific domains/IPs if possible
- Rotate keys periodically
- Monitor API usage for abuse

---

## Troubleshooting

### Build fails with "API key not set"
This is just a warning. The build will complete, but the scoreboard won't work without a key. Make sure you've set the environment variable on your deployment platform.

### "Invalid API key" error on the deployed site
- Double-check your environment variable name is exactly `SCOREBOARD_API_KEY`
- Verify the key is correct (try it in Postman or curl first)
- Redeploy after changing environment variables

### GitHub Actions workflow not triggering
- Make sure the workflow file is in `.github/workflows/deploy.yml`
- Check the Actions tab for any errors
- Verify repository secrets are set correctly

### Environment variables not being injected
- Make sure you're running `npm run build` (not just copying the HTML)
- Check the build logs to see if environment variables were read
- Verify the variable names match exactly (case-sensitive)

---

## Custom Domain Setup

All platforms support custom domains:

**Netlify/Vercel/Cloudflare:**
1. Go to domain settings in your dashboard
2. Add your custom domain
3. Update your DNS records as instructed

**GitHub Pages:**
1. Add a `CNAME` file with your domain
2. Go to Settings → Pages → Custom domain
3. Update your DNS records

---

## Need Help?

Check the main [README.md](README.md) for more information about the scoreboard features and customization options.
