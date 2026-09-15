# Wuyue and the road of the sutras

A single-page map of how Buddhist texts travelled from India to the kingdom of Wuyue
(907–978), and on to Korea and Japan.

Static site, no build step, no dependencies. Spectral and Noto Serif TC load from
Google Fonts.

| Path | Role |
| --- | --- |
| `index.html` | Page shell, copy, timeline |
| `css/site.css` | Theme tokens, layout, map styles |
| `js/site.js` | Map fetch, draw animation, tooltips |
| `maps/routes.svg` | India→Japan route map |
| `maps/wuyue.svg` | Wuyue kingdom inset |

Maps are fetched at runtime into `[data-map]` mounts so node tooltips stay in the DOM.
Serve over HTTP (not `file://`), or the maps and assets will not load.

Source: Claude artifact https://claude.ai/artifact/8RScD7bpSLN4SU2H9piNT9

## Run locally

```sh
npx serve .
```

## Deploy

Vercel serves the folder as a static site with no config: `vercel deploy`.
