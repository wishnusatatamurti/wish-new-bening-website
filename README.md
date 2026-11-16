# Wish New Bening — Official Website (Initial Prototype)

**Brand:** Muzike Indonesia  
**Tagline:** Clear Mind • Calm Breath • Better Day  
**Stack:** HTML + CSS + vanilla JavaScript. No build pipeline, external fonts, analytics, or paid dependencies.

## What's inside

- `index.html`: responsive website with hero, 8 guided practices, interactive Breath Studio, 4 wellness themes, soundscape previews, progress, journal articles, About, app availability, footer.
- `styles.css`: responsive premium wellness style using the official brand palette.
- `app.js`: breathing engine, start/pause/resume/end, 8 preset patterns, custom patterns, session recording, current-week progress, local history, article dialogs.
- `privacy.html` and `terms.html`: **drafts for review** before public deployment.
- `assets/brandmark.svg` and `assets/favicon.svg`: original placeholder brandmark for the website. Replace with your definitive Wish New Bening logo if available.

## Preview locally

Open `index.html` in Chrome or Edge. For a more representative local preview:

```bash
cd wish-new-bening-website
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publishing to GitHub Pages

1. Create a **new repository** for the website or use a repository designated for Wish New Bening.
2. Upload all files and the `assets` directory to the **repository root**. Keep relative paths unchanged.
3. In GitHub, go to **Settings → Pages → Build and deployment → Deploy from a branch**, and choose `main` / `/ (root)`.
4. Open the Pages URL GitHub provides. Connect a custom domain only after its ownership and DNS settings are ready.
5. Replace the temporary logo, approve policy drafts, and provide an official contact method before public launch.

The website does not need Vercel, Firebase, npm, a paid server, or an API key.

## Data behavior

- Website custom patterns stored under `localStorage['wnb_custom_patterns_v1']`.
- Completed website sessions stored under `localStorage['wnb_web_sessions_v1']`, capped at 300 sessions.
- Progress is calculated from website browser data. **It does NOT sync with Android SQLite**, and should not be presented as the Android app's progress.
- Custom breathing holds may be set to 0, with a range of 0–20 seconds; inhale and exhale are 1–20 seconds; exercise duration is 1–60 minutes.
- The weekly chart runs **Monday through Sunday** in local browser time.
- No session is counted until the full selected duration completes.

## Not yet implemented

- Real Rain/Ocean/Nature/Fireplace audio playback (audio cards are labeled *Coming soon*).
- Official APK / Google Play download link (no public link has been provided).
- An actual contact email/form backend (contact placeholders must be replaced).
- Indonesian translation and language selector (recommended next phase).
- Account / cloud sync, subscriptions, premium features.
- Official app screenshots and final logo assets.

## Development notes / quality checks

- Mobile-friendly down to 360px.
- `prefers-reduced-motion` is respected for decorative animations and automatic scroll.
- In-browser breathing animation derives position from elapsed time (rather than per-second timer drift).
- Browser-local storage can be disabled or cleared; users should not assume cross-device persistence.
- Informational wellness content avoids diagnosis, treatment, cure, and sleep-speed guarantees.
- This is a ready-to-preview static prototype, not a representation of a public production app release.
