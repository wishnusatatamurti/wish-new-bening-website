# Wish New Bening — International Website v1.2

**Brand:** Muzike Indonesia  
**Official domain:** https://wishnewbening.com  
**Languages:** English (`/en/`) and Bahasa Indonesia (`/id/`)  
**Tagline:** Clear Mind • Calm Breath • Better Day

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
