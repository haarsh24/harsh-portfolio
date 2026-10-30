# Kumar Harsh | Freelance AI Engineer

Source for [kumarharsh.in](https://kumarharsh.in): a small, fast, static portfolio set in Cormorant Garamond and Hanken Grotesk, with one red dot as the only accent.

## Pages

| Route | File | What it is |
| --- | --- | --- |
| `/` | `index.html` | Home: hero, selected work, services, process, reviews, toolkit |
| `/work/` | `work/index.html` | Contact sheet and a filterable index of all nine apps |
| `/work/honey/` | `work/honey/index.html` | Honey case study, with a live provider-outage demo |
| `/services/` | `services/index.html` | Services and the scope estimator |
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

`vite.config.ts` lists every page in `build.rollupOptions.input`. When you add a page, add it there and to `public/sitemap.xml`.

Vercel builds the site with `vite build` and serves `dist/`.

## Content to keep current

- The arch illustration on `/about/` stands in for a portrait. Swap it for a photo when you have one.
- Counts such as "9 live apps" and "68+ repositories" appear on several pages. Search for them when they change.
- Career dates live on `/` and `/about/`.

## Say hello

[hello@kumarharsh.in](mailto:hello@kumarharsh.in) · [LinkedIn](https://www.linkedin.com/in/kumarharshn/) · [X](https://x.com/bhaksaalaa) · [GitHub](https://github.com/haarsh24)
