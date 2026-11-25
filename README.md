# YokeTV website

The site for YokeTV at [tv.yokebeat.com](https://tv.yokebeat.com): the landing page, the changelog, and the
privacy policy and terms for the Roku channel (`roku/privacy.html`, `roku/terms.html`).

Static files served with GitHub Pages. No build step: edit, push, and the site updates.

- **Download buttons** follow the newest release in
  [yoketv-releases](https://github.com/Itz-Stickman/yoketv-releases) by themselves (`assets/releases.js`).
  The version in the HTML is only the fallback.
- **Changelog:** add a new `<details class="release">` at the top of `changelog.html` for each version, and
  move the "Latest" badge to it.
- **Screenshots** use a made-up demo library (no real movies or shows), so they're safe for store listings.
