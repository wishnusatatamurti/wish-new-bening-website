# Wish New Bening — International Website v1.5

**Brand:** Muzike Indonesia  
**Official domain:** https://wishnewbening.com  
**Languages:** English (`/en/`) and Bahasa Indonesia (`/id/`)  
**Tagline:** Clear Mind • Calm Breath • Better Day

## What's new in v1.5 — Mobile Breath Studio, Voice Guidance, Calm Sounds previews

- More comfortable mobile Breath Studio controls: large Start / Pause / End buttons near the breathing circle on screens ≤640px; the original desktop controls remain.
- Optional **Voice Guidance** with browser/device speech synthesis: voice selection when voices are installed, volume, enable/disable and a voice test. Instructions are triggered only when inhaling, holding, exhaling and resting phases change; paused/ended sessions cancel speech.
- Voice prompts in all **16 UI languages**, but actual installed voices and pronunciation depend on browser and operating system. Some devices may not offer native voices for all languages. No external/cloud TTS service or prerecorded male/female voice is bundled.
- Interactive **Calm Sounds previews** for Rain, Ocean, Nature, and Fireplace generated locally by Web Audio. They are **synthesized demos, not authentic field recordings** or premium soundscapes. A single sound plays at a time, user controls volume, and audio stops after 20 minutes.
- New `wellness-extras.js` and `wellness-extras.css` (all 16 language homepages); minimal `wnb:breath` lifecycle event emissions from `app.js`.
- Existing session logic, preset durations, custom patterns, browser localStorage history keys, preview language SEO flags, CNAME/DNS, theme controls and privacy statement remain unchanged.
- Performance: no CDN or third-party speech/audio dependencies and no new network requests for sound generation.
- Test on actual Chrome Android, iOS Safari and desktop browsers before describing voice or background playback as universally supported.

## What's new in v1.3 (international preview + blue day/night experience)

- Reference-led light sky blue `#83C8E4` → royal deep blue `#0056CA` palette, with deep navy dark mode.
- Header theme switcher with preference saved as `wnb_theme_v1`; default honors system preference.
- Native global language chooser offering 16 languages, with first-visit detection/suggestion and persistent `wnb_language_v1`.
- Reviewed complete English / Indonesian experiences remain at `/en/` and `/id/`.
- 14 additional language-specific preview routes (`/es/`, `/fr/`, `/de/`, `/pt/`, `/it/`, `/ru/`, `/ar/`, `/hi/`, `/zh/`, `/ja/`, `/ko/`, `/th/`, `/vi/`, `/ms/`). These translate the principal navigation, hero, session controls, phases and progress labels; some detailed sections/journal/legal material remains in English. They are **noindex** until complete editorial and legal review. Do not claim these pages are fully translated yet.
- Expanded global language selection must not erase the prior `wnb_web_sessions_v1` or `wnb_custom_patterns_v1` keys; no server sync added.
- Theme implemented in `theme.css` and `theme-init.js`; translations in `locale-runtime.js` and language switching in `language.js`.
- Existing official domain/CNAME and GitHub Pages publishing settings unchanged.

## What's new in v1.2

- New bilingual **Mind & Body** section at `/en/#mindbody` and `/id/#mindbody` covering six user-requested topics: Breathwork, Acupuncture, Traditional Herbal, Yoga, Hypnotherapy, and Neuro-Linguistic Programming (NLP).
- Native, accessible expandable summaries and original responsive 3/2/1-column card layout.
- Responsible educational content and sources: qualified practitioners for acupuncture; herb–medicine interaction risk; limited health evidence for NLP. Never claim treatment or cure.
- Breathwork links back to the already working Breath Studio. No new medical, practitioner-booking or personalized treatment function has been added.
- Existing breathing engine, custom patterns, local progress, language settings, DNS and CNAME are preserved.

## What's new in v1.1

- First-visit bilingual language chooser at the domain root.
- Always-visible EN / ID switcher in the header on desktop and mobile.
- `/en/` and `/id/` each provide real localized static HTML, metadata, `canonical` and `hreflang` links, for discoverability without JavaScript.
- Translations for all sections, legal drafts, three journal articles, and interactive Breath Studio (including phase guidance, custom patterns, messages, dates and progress labels).
- Language choice is stored under `localStorage['wnb_language_v1']` and restored when visiting the domain root.
- Existing custom patterns and completed browser sessions remain under the same keys as v1.0; language switching does **not** reset them.
- XML sitemap and robots.txt for English/Indonesian pages.

## File layout

- `index.html` — first-visit EN/ID chooser, with English accessible for crawlers.
- `en/index.html`, `id/index.html` — English and Indonesian homepage.
- `en/privacy.html`, `id/privacy.html` — localized privacy policy draft.
- `en/terms.html`, `id/terms.html` — localized terms draft.
- `app.js` — unchanged breathing mechanics, with translated dynamic UI.
- `language.js`, `language.css` — language preference and responsive switcher / welcome modal.
- `styles.css`, `assets/` — base styles and icons.
- `CNAME` — preserves the GitHub Pages custom domain `wishnewbening.com`.
- `robots.txt`, `sitemap.xml` — crawler discovery.
- Original `privacy.html` and `terms.html` remain as English legacy URLs for older links. New navigation routes to per-language legal pages.

## Update the existing GitHub Pages site

Repository: `wishnusatatamurti/wish-new-bening-website`. Current GitHub Pages: Deploy from `main`, root folder. **Do not create a new repository**.

1. Download ZIP, extract it on your computer. **Do not upload the ZIP itself.**
2. Open the existing repository at https://github.com/wishnusatatamurti/wish-new-bening-website
3. Select `Add file` → `Upload files`.
4. Drag **the contents** of this extracted folder (all root files and both the `en/` and `id/` directories) to the upload page. If folder drag/drop fails, use GitHub Desktop or a local Git push to preserve directories. Existing files may be replaced intentionally.
5. Review the list of changes and click `Commit changes` on `main`.
6. Confirm GitHub Pages deploy is successful under Actions/Settings → Pages. Check https://wishnewbening.com/ and `/en/`, `/id/`.
7. Check the domain is still configured and **Enforce HTTPS** remains enabled. Keep the `CNAME` file.

## Important privacy and safety notes

- Web session history remains **local to the browser**, not synchronized with Android SQLite.
- LocalStorage keys: `wnb_custom_patterns_v1`, `wnb_web_sessions_v1`, `wnb_language_v1`.
- Website is for **general wellness and relaxation**, not medical diagnosis or treatment.
- Soundscapes, Android public download, cloud sync, subscription and real contacts are **not yet live**.
- Legal pages are **drafts**; obtain appropriate review, a verified contact channel, and finalized dates before treating them as production policies.
- Brand icons remain temporary original assets pending definitive app assets.

## Test locally

Serve the extracted root directory (not the `en` or `id` subfolder):

```bash
python -m http.server 8000
```

Then browse to `http://localhost:8000/`, `http://localhost:8000/en/`, or `http://localhost:8000/id/`.

## SEO

- English canonical: `https://wishnewbening.com/en/`
- Indonesian canonical: `https://wishnewbening.com/id/`
- Root `/`: English fallback + first-visit language chooser, `x-default` hreflang.
- Legal pages have localized canonical/hreflang.
- `https://wishnewbening.com/sitemap.xml` is included.
