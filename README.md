# Kumar Harsh | Freelance AI Engineer

Source for [kumarharsh.in](https://kumarharsh.in): a small, fast, static portfolio set in Cormorant Garamond and Hanken Grotesk, with one red dot as the only accent.

## Pages

| Route | File | What it is |
| --- | --- | --- |
| `/` | `index.html` | Home: hero, selected work, services, process, reviews, toolkit |
| `/work/` | `work/index.html` | Contact sheet and a filterable index of all nine apps |
| `/work/honey/` | `work/honey/index.html` | Honey case study, with a live provider-outage demo |
| `/services/` | `services/index.html` | Services and the scope estimator |
| `/services/ai-agents/`, `/rag/`, `/mvp-sprint/`, `/ai-reliability/` | `services/<slug>/index.html` | One landing page per service, each with FAQs |
| `/writing/` | `writing/index.html` | Index of articles |
| `/writing/<slug>/` | `writing/<slug>/index.html` | Three articles on WhatsApp agents, LLM failover and build timelines |
| `/about/` | `about/index.html` | Story, career timeline, how I work, recommendations |
| `/contact/` | `contact/index.html` | Brief form and other ways to reach me |

Each page is plain HTML with its content written in place, so editing a sentence means editing that file. No framework is needed to render them.

- `src/site.css` holds the styles shared by every page. Anything specific to one page sits in that page's `<style>`.
- `src/site.js` holds all behaviour: the phone menu, the work filter, the outage demo, the estimator and the contact form. Each block only runs on pages that contain its markup.
- The contact form and the estimator open a pre-written email to hello@kumarharsh.in. There is no backend.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs dist/, one folder per route
npm run preview  # serve the built site
```

`vite.config.ts` lists every page in `build.rollupOptions.input`. When you add a page, add it there and to `public/sitemap.xml`. A new article also goes in `public/feed.xml` and the Writing list on `/` and `/writing/`.

Vercel builds the site with `vite build` and serves `dist/`.

## Site files

- `404.html` is shown for any unknown URL (Vercel serves it automatically).
- `public/` holds the favicon, the touch icon, `og.png` (the 1200 by 630 share card), `robots.txt`, `sitemap.xml` and `feed.xml` (RSS for `/writing/`).
- `public/fonts/` holds the self-hosted Cormorant Garamond and Hanken Grotesk files (SIL Open Font License, licences included). The `@font-face` rules sit at the top of `src/site.css`.
- `vercel.json` adds security headers, long caching for `/assets/` and `/fonts/`, and trailing slashes on routes.
- Canonical URLs, the sitemap and the JSON-LD use `https://www.kumarharsh.in`, because the bare domain redirects to `www`. If you flip that redirect in Vercel, change them to match.

## Content to keep current

- The arch illustration on `/about/` stands in for a portrait. Swap it for a photo when you have one.
- Counts such as "9 live apps" and "68+ repositories" appear on several pages. Search for them when they change.
- Career dates live on `/` and `/about/`.
- Timelines (10–14 days, 2–3 weeks, 1–2 weeks) appear on `/services/`, the four service pages and `/writing/how-long-to-build-an-ai-agent/`. Change them together.
- Article dates are in each article's byline, its JSON-LD, `public/feed.xml` and `public/sitemap.xml`.

## Say hello

[hello@kumarharsh.in](mailto:hello@kumarharsh.in) · [LinkedIn](https://www.linkedin.com/in/kumarharshn/) · [X](https://x.com/bhaksaalaa) · [GitHub](https://github.com/haarsh24)
