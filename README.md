# Competition Scoreboard

A TV-friendly competition scoreboard that displays team rankings and scores without requiring authentication.

## Features

- **No login required**: Uses API key authentication
- **Auto-refreshing**: Updates every 60 seconds
- **TV-optimized**: Large text, high contrast, dark theme with smooth gradient effects
- **Responsive**: Works on any screen size
- **Animated**: Smooth transitions and rankings with staggered loading effects
- **Self-contained**: Single HTML file with no external dependencies

## Quick Start

The scoreboard is located at `client/public/scoreboard.html` and can be:
- Served from your existing web server
- Hosted on any static hosting platform (Netlify, Vercel, GitHub Pages, etc.)
- Opened directly in a browser for testing

## Configuration

### Method 1: Environment Variables (Recommended)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your values:
   ```env
   SCOREBOARD_API_KEY=your-api-key-here
   SCOREBOARD_API_URL=https://your-api-domain.com/api/public/competition/scoreboard
   ```

3. Build the configured scoreboard:
   ```bash
   npm run build
   ```

4. Deploy the `dist/index.html` file

**Note**: `.env` is in `.gitignore` and won't be committed to Git.

### Method 2: Direct Configuration

Open `client/public/scoreboard.html` and add your configuration:

```html
<script>
  window.SCOREBOARD_API_KEY = 'your-api-key-here';
  window.SCOREBOARD_API_URL = 'https://your-api-domain.com/api/public/competition/scoreboard';
</script>
```

Place this script **before** the closing `</body>` tag or at the top of the file.

### Method 3: Query Parameter (Testing Only)

Pass the API key via URL:

```
https://your-domain.com/scoreboard.html?key=your-api-key-here
```

**Note**: This is less secure as the key appears in the URL.

## API Key Setup

1. Go to **Admin Hub** → **Embed API Key** (or `/admin/embed-key`)
2. Click **"Generate new key"**
3. Copy the generated key and save it securely (it won't be shown again)
4. Add it to your scoreboard configuration

## API Endpoint

The scoreboard expects the following API endpoint:

**GET** `/api/public/competition/scoreboard`

**Headers:**
- `X-Embed-Api-Key`: Your embed API key

**Response Format:**

```json
{
  "competition": {
    "name": "Q4 Competition",
    "startDate": "2026-10-01",
    "endDate": "2026-12-31",
    "status": "active"
  },
  "leaderboard": [
    { "name": "Team Alpha", "points": 450 },
    { "name": "Team Beta", "points": 380 },
    { "name": "Team Gamma", "points": 320 }
  ],
  "lastUpdated": "2026-09-28T12:30:00.000Z"
}
```

## Customization

Edit `client/public/scoreboard.html` to customize:

- **Refresh interval**: Change `REFRESH_INTERVAL` constant (default: 60000ms = 60 seconds)
- **Colors**: Modify CSS gradient values in the `<style>` section
- **Font sizes**: Adjust font-size values for different elements
- **Animation timing**: Change animation duration and delay values
- **Layout**: Modify flexbox and spacing properties

## TV Display Setup

For optimal TV display:

1. **Full-screen mode**: Press F11 in Chrome/Firefox
2. **Disable sleep**: Configure browser/system to prevent sleep
3. **Auto-start**: Set browser to launch on boot with the scoreboard URL
4. **Dedicated account**: Use a separate user account with no notifications
5. **Hide cursor**: Use a browser extension or system setting to auto-hide the cursor

## Deployment

### Netlify

1. Push your code to GitHub
2. Connect your repo in Netlify dashboard
3. Go to **Site settings** → **Environment variables**
4. Add:
   - `SCOREBOARD_API_KEY`: your-key-here
   - `SCOREBOARD_API_URL`: https://your-api.com/...
5. Deploy! Netlify will run `npm run build` automatically

Configuration: `netlify.toml` is already set up.

### Vercel

1. Push your code to GitHub
2. Import your repo in Vercel dashboard
3. Go to **Settings** → **Environment Variables**
4. Add the same variables as above
5. Deploy! Vercel will run the build command automatically

Configuration: `vercel.json` is already set up.

### GitHub Pages (with GitHub Actions)

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets:
   - `SCOREBOARD_API_KEY`: your-key-here
   - `SCOREBOARD_API_URL`: https://your-api.com/...
3. Push to `main` branch - GitHub Actions will automatically build and deploy
4. Enable GitHub Pages: **Settings** → **Pages** → Source: `gh-pages` branch

Configuration: `.github/workflows/deploy.yml` is already set up.

### Cloudflare Pages

1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set build output: `dist`
4. Add environment variables in dashboard
5. Deploy!

### Local Testing

```bash
# Install dependencies (if needed)
npm install

# Build with your .env file
npm run build

# Open dist/index.html in your browser
```

## Free Hosting Options Summary

All these platforms support environment variables and custom domains:

- **[Netlify](https://www.netlify.com/)**: Free tier, auto-deploy from Git
- **[Vercel](https://vercel.com/)**: Free tier, auto-deploy from Git  
- **[GitHub Pages](https://pages.github.com/)**: Free with GitHub Actions
- **[Cloudflare Pages](https://pages.cloudflare.com/)**: Free tier, auto-deploy from Git
- **AWS S3 + CloudFront**: Static hosting (~$0.50/month)

## Troubleshooting

### "Invalid API key" error
- Verify the key is correct (no extra spaces)
- Check the `X-Embed-Api-Key` header is being sent
- Regenerate the key if it was rotated

### "API key not configured" error
- Ensure you've set `window.SCOREBOARD_API_KEY` or passed `?key=...`
- Check the script block is placed before the main scoreboard script

### "No active competition" message
- Create and activate a competition in Admin Hub
- Ensure competition has teams assigned
- Verify competition dates include today's date

### Scores not updating
- Server refreshes scores every 15 minutes
- Scoreboard polls every 60 seconds
- Use Admin Hub → "Refresh Scores Now" to force update
- Check browser console for API errors

### CORS errors
- Ensure your API server allows requests from the scoreboard domain
- Add appropriate CORS headers on the API endpoint

## Security Notes

- The API key is read-only for scoreboard data
- Rotating the embed API key will break existing scoreboards until updated
- Consider IP rate limiting if hosting publicly
- The scoreboard displays no sensitive data

## File Structure

```
client/
└── public/
    └── scoreboard.html    # Source scoreboard file (HTML/CSS/JS)
dist/
└── index.html             # Built scoreboard (generated by npm run build)
```

## License

[Add your license here]
