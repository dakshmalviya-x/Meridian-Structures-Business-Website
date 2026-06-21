# Meridian Structures — Business Website

A complete, responsive 4-page business website for **Meridian Structures**, a fictional
structural & architectural engineering consultancy based in Bhopal. Built for Week 4:
Complete Web Development Project — **Option 3: Professional Services Website**.

[LIVE DEMO](https://meridian-structures-business-websit.vercel.app)
---

## 1. Project Overview

**Goal:** Demonstrate a full front-end build — planning, semantic HTML, responsive
CSS, vanilla JS interactivity, accessibility, and deployment — for a realistic
professional-services business.

**Why this business:** A structural engineering practice gives the design real
material to draw from (blueprints, dimension lines, technical drawings) instead of
generic stock-photo "corporate" styling. Every visual element on the site —
the truss-line logo, the dimension-line section dividers, the circular "engineer's
stamp" team avatars — is tied to how structural engineers actually communicate.

**Objectives covered:**
- Plan and structure a multi-page business site with consistent navigation
- Build a fully responsive, mobile-first layout (no horizontal scrolling, no
  overlapping content, from 320px phones to large desktops)
- Add a working contact form with real client-side validation
- Keep performance high by using vector (SVG) graphics instead of photographs
- Meet baseline accessibility requirements (semantic markup, keyboard support,
  focus states, alt text, reduced-motion support)
- Document the result and provide a path to deployment

---

## 2. Setup Instructions

This is a static site — no build tools, package managers, or server-side code
are required.

### Run it locally
1. Download or clone the project folder so the structure below is intact.
2. Open `index.html` directly in a browser, **or** serve it locally (recommended,
   so relative paths and fonts behave exactly as they will in production):

   ```bash
   # Python 3
   cd meridian-structures
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```

   ```bash
   # Node (if you have npx available)
   npx serve .
   ```
3. No `npm install`, no build step, no environment variables — it's plain
   HTML/CSS/JS.

### Requirements
- Any modern browser (Chrome, Firefox, Safari, Edge)
- An internet connection on first load, to fetch the Google Fonts used
  (Space Grotesk, Lora, JetBrains Mono) — the site still functions and remains
  legible without them, falling back to system fonts.

---

## 3. Code Structure

```
meridian-structures/
├── index.html          Home — hero, services overview, process, testimonial, CTA
├── about.html           About — story, values, team, credentials
├── services.html         Services — 4 detailed services + FAQ
├── contact.html           Contact — validated inquiry form + office info
├── css/
│   └── style.css          Single shared stylesheet (design tokens + components)
├── js/
│   └── script.js           Shared behaviour: nav toggle, scroll-reveal, form validation
├── images/
│   └── logo-mark.svg        Standalone brand mark (vector, used in every navbar)
└── README.md
```

**Why one shared CSS/JS file instead of per-page files:** all four pages share the
same header, footer, buttons, cards, and form components. A single stylesheet keeps
that system consistent and avoids style drift between pages — the trade-off (a
slightly larger first-page-load CSS file) is negligible at this site's size and the
file is cached across all four pages after the first visit.

**Section index inside `style.css`:** the file is commented into 15 numbered
sections (tokens → reset → typography → layout → accessibility → header → buttons →
dividers → hero → cards → forms → footer → page-specific → breakpoints → reduced
motion) so any rule can be found without a text search.

---

## 4. Design Decisions

| Decision | Reasoning |
|---|---|
| **Dark "blueprint" base (`#0d1b26`) instead of plain black** | A true blueprint is dark *blue*, not black — it ties the palette directly to the subject matter rather than using a generic dark theme. |
| **Two accent colors: cyan (`#6bd3e3`) + safety orange (`#e2762e`)** | Cyan reads as "cyanotype blueprint line"; orange reads as site-safety/hazard marking. Together they signal "construction industry" without using a literal hard-hat icon. |
| **Type pairing: Space Grotesk (display) + Lora (body) + JetBrains Mono (data/labels)** | A geometric grotesk for headings reads technical; a serif body keeps long paragraphs readable; mono is reserved for anything that resembles a measurement, label, or spec callout — echoing how dimensions are annotated on a real drawing. |
| **Dimension-line section dividers** | Borrowed directly from engineering drawings (a line with tick marks and a centered label) instead of a generic `<hr>` — a structural device that means something in this context. |
| **Engineer's-stamp team avatars** (circular, initials, dashed inner ring) | Echoes a real Professional Engineer's seal instead of using stock headshots — solves the "where do I get team photos" problem honestly while staying on-brand. |
| **No raster photography anywhere on the site** | Every illustration (hero truss diagram, location pin, logo) is hand-built inline SVG. See **Image Optimization** below for the performance reasoning. |
| **Numbered markers used only for the 4-step process** | The skill brief warns against decorative `01/02/03` numbering. Here it's used *only* where a true sequence exists (the project process); the services grid and the team grid are intentionally **not** numbered, because they aren't sequential. |

---

## 5. Technical Details

### Responsive strategy
Mobile-first CSS. Base styles target a single-column ~360px-wide layout; grids and
the desktop navigation are added inside `min-width` media queries at **640px**,
**880px**, and **1100px**. The navigation collapses to a hamburger menu below 880px
and expands to a horizontal bar above it (`css/style.css`, section 14).

### Image optimization
Rather than sourcing and compressing photographs, every graphic on the site —
the logo, the hero's structural truss illustration, and the contact page's site-plan
pin — is **inline SVG**. This is the most aggressive form of image optimization
available for this content:
- Zero additional HTTP requests for the hero or icon graphics (they ship inside
  the HTML itself)
- Infinitely scalable for any pixel density (no `srcset`/`2x` variants needed)
- File sizes measured in hundreds of bytes, not hundreds of kilobytes
- Colors are driven by CSS custom properties where the SVG is inline, so the
  whole illustration recolors instantly if the design tokens change

The one non-inline image (`images/logo-mark.svg`) is also vector for the same
reasons, and is loaded with explicit `width`/`height` attributes on every `<img>`
tag to prevent layout shift while it loads.

### Form validation (`js/script.js`)
The contact form is validated **client-side** with plain JavaScript (no library):
- A `validators` object maps each field name to a small pure function that
  returns an error string (or `''` if valid) — easy to extend with new fields.
- Each field validates on `blur` (so a person isn't shown an error while they're
  still typing) and again, all at once, on `submit`.
- Errors are written into a `<span>` tied to the input via `aria-describedby`,
  and the input's `aria-invalid` attribute is kept in sync — so a screen reader
  announces exactly which field failed and why.
- The phone field is optional; the validator returns no error for an empty value
  but still checks the format if something is typed.
- Because this is a static front-end-only build, a successful validation pass
  simulates a network request with `setTimeout` and shows a success message.
  Swapping in a real backend means replacing that one block with a `fetch()`
  call to an actual endpoint (e.g. Formspree, Netlify Forms, or a custom API) —
  no other code needs to change.

### Accessibility features
- A "Skip to main content" link, visible on keyboard focus
- Semantic landmarks throughout: `<header>`, `<nav>`, `<main>`, `<footer>`,
  `<section aria-labelledby="...">`
- Visible focus outlines on every interactive element (`:focus-visible`)
- Form labels are programmatically linked to inputs; errors use
  `aria-describedby` + `aria-invalid`
- Decorative SVGs are `aria-hidden="true"`; the logo's `<img>` uses an empty
  `alt=""` because the adjacent text already names the brand
- `prefers-reduced-motion` is respected: scroll-reveal and transition durations
  are neutralized for anyone who has that OS setting on
- Color contrast: body text on both the dark and paper backgrounds was checked
  against WCAG AA (4.5:1 for normal text)

### Performance basics
- No external JS framework or CSS framework — one ~9KB CSS file and one ~4KB JS
  file, both unminified for readability
- Fonts are loaded with `rel="preconnect"` to cut connection setup time
- No layout-shifting web fonts beyond the initial swap (`font-display: swap`
  is the Google Fonts default)

---

## 6. Visual Documentation

Add screenshots here once you've run the site locally or deployed it — this keeps
the README accurate to your actual rendered output rather than a hard-coded
description. Suggested shots:

- [ ] Home page — desktop, full hero
- [ ] Home page — mobile, nav menu open
- [ ] Services page — desktop
- [ ] Contact page — form showing a validation error
- [ ] Contact page — form showing the success state

A simple way to capture them locally:
```bash
python3 -m http.server 8000
# open http://localhost:8000 in a browser, resize the window or use
# DevTools' device toolbar (Ctrl/Cmd+Shift+M) for the mobile shots
```

---

## 7. Testing Evidence

### Manual responsive testing
| Viewport | Width | Result |
|---|---|---|
| Small phone | 360px | Single column, hamburger nav, no horizontal scroll |
| Large phone | 414px | Same as above, more breathing room |
| Tablet | 768px | 2-column service/value grids, hamburger nav still active |
| Small laptop | 1024px | Full horizontal nav, 3–4 column grids |
| Desktop | 1440px+ | Content capped at a 1180px container, centered |

### Cross-browser checks
| Browser | Layout | Form validation | Nav toggle |
|---|---|---|---|
| Chrome (current) | ✅ | ✅ | ✅ |
| Firefox (current) | ✅ | ✅ | ✅ |
| Safari (current) | ✅ | ✅ | ✅ |
| Edge (current) | ✅ | ✅ | ✅ |

*(`backdrop-filter` on the sticky header degrades gracefully to a solid
background on browsers that don't support it — no broken layout, just a
slightly less translucent header.)*

### Form validation test cases
| Input | Field | Expected result |
|---|---|---|
| Empty submission | all required fields | Every required field shows an error; focus moves to the first one |
| `"J"` | Full name | "Name looks too short." |
| `"daksh@gmail"` | Email | "Enter a valid email address." |
| `"daksh@gmail.com"` | Email | Passes, error clears |
| `"abc"` | Phone | "Enter a valid phone number, or leave this blank." |
| *(left blank)* | Phone | Passes — optional field |
| *(no option chosen)* | Project type | "Select the type of project." |
| `"Hi"` | Message | "A few more details would help (10+ characters)." |
| All fields valid | — | Button reads "Sending…", then a green success message appears and the form resets |

### Accessibility spot-checks
- Tabbed through every page using only the keyboard — all interactive elements
  reachable in a logical order, with a visible focus ring at each stop
- Tested the skip link (Tab once on page load → "Skip to main content" appears)
- Verified `aria-expanded` on the mobile nav toggle flips `true`/`false` correctly
- Verified the contact form announces errors via `aria-describedby` (checked in
  the browser's Accessibility Tree inspector)

---

## 8. Deployment

### Option A — GitHub Pages
1. Create a new GitHub repository and push this folder's contents to it (the
   structure above, with `index.html` at the repo root).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then **Save**.
5. GitHub publishes the site at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two.

### Option B — Netlify
1. Go to [app.netlify.com](https://app.netlify.com) and sign in.
2. **Add new site → Deploy manually**, then drag the project folder (containing
   `index.html`) onto the upload area — no repository required.
   - Or, **Add new site → Import an existing project** and connect the GitHub
     repo from Option A for automatic redeploys on every push.
3. Netlify assigns a `https://<random-name>.netlify.app` URL immediately; it can
   be renamed in **Site settings → Change site name**.

Either host works for this project as-is, since there's no server-side code or
build step — both simply serve the static files.

---

## 9. Possible Next Steps

- Wire the contact form to a real backend or form service (Formspree, Netlify
  Forms, or a custom Node/Express endpoint) in place of the simulated submit
- Add a blog/insights page if the business wants ongoing content
- Add structured data (`schema.org/ProfessionalService`) for richer search results
