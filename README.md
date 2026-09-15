# Wuyue and the road of the sutras

A single-page map of how Buddhist texts travelled from India to the kingdom of Wuyue
(907–978), and on to Korea and Japan.

Static site: no build step, no package manager, no dependencies beyond Google Fonts
(Spectral and Noto Serif TC).

## Layout

```
index.html          Page shell — header, copy, timeline, footer
css/site.css        Theme tokens, layout, map presentation
js/site.js          Theme switcher, map load, draw animation, tooltips
maps/routes.svg     India→Japan route map
maps/wuyue.svg      Wuyue kingdom inset
```

`index.html` mounts maps with `data-map="maps/....svg"`. The script fetches those SVGs
and injects them into the DOM so place-name tooltips work. Open the site over HTTP
(`npx serve .` or Vercel); `file://` cannot load the maps or other assets.

Edit prose and timeline in `index.html`, look-and-feel in `css/site.css`, geography
and place tooltips in the SVG files under `maps/`.

Theme: Light / Dark / Auto in the top bar. Choice is stored in `localStorage` under
`theme`; Auto follows `prefers-color-scheme`. A tiny head script applies a saved
theme before paint to avoid a flash.

Source: Claude artifact https://claude.ai/artifact/8RScD7bpSLN4SU2H9piNT9

## Run locally

```sh
npx serve .
```

## Deploy

Vercel serves the folder as a static site with no config:

```sh
vercel deploy
```
