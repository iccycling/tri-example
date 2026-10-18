---
title: "Website guide: how to run the IC Tri website"
date: 2026-10-01
summary: "Folder map, one-time GitHub setup, how to add news, posts, people and photos — plus notes on privacy, SEO, security and accessibility."
authors: ["frederik-beck"]
tags: ["guide", "website"]
---
This guide explains how the website works and how to look after it. You do **not** need to know how to code: almost everything is a plain text file.

> **The short version.** News, blog posts and people are folders with a file called `index.md` inside `content/`. Add or edit a file on GitHub, click **Commit changes**, and after one or two minutes the website is updated.

## 1. How it works

```
You write text files (Markdown)  →  GitHub builds the site with Hugo  →  GitHub Pages publishes it
     content/…/index.md               (automatic, about a minute)          https://iccycling.github.io/tri/
```

- **Hugo** turns your text files into web pages. You never have to run it yourself (a local preview is optional, see section 9).
- **GitHub Actions** runs Hugo for you after every change, and once every night.
- **GitHub Pages** hosts the result for free.

## 2. Folder map: what is where

```
tri/                                   ← the repository
├── hugo.toml                          MAIN SETTINGS: web address, contact links, SEO and security switches
├── README.md                          Short description of the repository
├── .github/
│   ├── workflows/hugo.yml             Builds and publishes the website on every change and every night
│   └── dependabot.yml                 Keeps the publishing tools up to date (security)
├── archetypes/                        Templates for new files when using the command line (hugo new)
├── assets/
│   ├── main.css                       All colours, fonts and layout (the colours are at the top, in :root)
│   ├── main.js                        Menus, FAQ, gallery, WhatsApp dialog, consent for videos, copy-link button
│   └── images/default-preview.jpg     Default preview image for posts without a photo (replace with your own)
├── content/                           ★ EVERYTHING YOU EDIT REGULARLY
│   ├── _index.md                      Start page (only the title; layout is in layouts/home.html)
│   ├── about.md, swim.md, bike.md,    One small file per page: title, description for search engines,
│   │   run.md, racing.md, beyond.md   which menu item is highlighted, which FAQ belongs to it
│   ├── privacy.md                     Privacy notice and legal notice
│   ├── blog/                          One FOLDER per post: index.md + its photos (preview.jpg = preview image)
│   ├── news/                          One FOLDER per news item: index.md (optional expiryDate)
│   ├── committee/                     One FOLDER per member: index.md + photo.jpg
│   └── authors/                       One FOLDER per blog author: index.md + photo.jpg (optional)
├── data/
│   └── faq/                           Questions and answers of each page, one .yaml file per page
├── layouts/                           The page templates (HTML)
│   ├── baseof.html                    Frame around every page: head, menu, footer, scripts
│   ├── home.html                      Start page (news and blog sections are filled automatically)
│   ├── pages/                         The pages Swim, Bike, Run, Racing, Beyond, About
│   ├── blog/, news/, committee/,      Layouts for the overview and single pages of each section
│   │   authors/, tags/
│   ├── _partials/                     Reusable pieces: menu (nav), mobile menu (drawer), footer, head,
│   │                                  share buttons, FAQ, schema.html (search engine data) …
│   ├── _shortcodes/                   Building blocks for posts: photo, gallery, youtube, instagram, callout, button
│   ├── _markup/                       How images, links and tables written in Markdown are displayed
│   ├── 404.html                       "Page not found" page
│   ├── robots.txt                     Instructions for search engine crawlers
│   └── home.llms.txt                  Plain-text summary of the site for AI assistants (llms.txt)
└── static/                            Files that are copied to the website unchanged
    ├── fonts/                         The fonts (Archivo, Inter)
    ├── images/                        Logo, page photos, partner logos
    └── favicon.ico                    The small icon in the browser tab
```

## 3. One-time setup on GitHub

1. Log in to GitHub as the club account (`iccycling`) and click **New repository**. Name it exactly **`tri`** (public, no README). The website address will then be `https://iccycling.github.io/tri/`. With another name or account, change `baseURL` in `hugo.toml`.
2. Unzip the project and drag **the contents** of the folder into the new repository (**Add file → Upload files**), then **Commit changes**.
3. The folder `.github` starts with a dot and is hidden on many computers. If `.github/workflows/hugo.yml` is missing after the upload, use **Add file → Create new file**, type `.github/workflows/hugo.yml` as the name (typing `/` creates folders) and paste the file contents.
4. Open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. Tick **Enforce HTTPS** if it is shown.
5. Open the **Actions** tab. When the run *Deploy Hugo site to Pages* shows a green tick, open the website.

Copy these files from the old prototype into the project: `fonts/inter-*.woff2` → `static/fonts/`, `images/*` (logo `ictri-archivo.svg`, photos) → `static/images/`, `favicon.ico` → `static/`. Delete the old `tri/` folder in the repository `iccycling.github.io`, but keep the redirect file there.

## 4. Adding news

1. Open `content/news/`, **Add file → Create new file**, name `my-news-title/index.md` (lowercase and hyphens; the slash creates the folder).
2. Paste, edit and commit:

```markdown
---
title: "Kit order opens"
date: 2026-10-05
summary: "One line that is shown in the list."
expiryDate: 2026-10-31
---
The full text of the news. You can use **bold**, links and lists.
```

**Expiry date (optional):** after that day the news leaves the start page and appears in grey in the **Archive** on `/news/`. Without `expiryDate` it stays current. The start page shows the three newest current items. Expiry is applied by the nightly rebuild (about 03:15 UK time); to apply it immediately, go to **Actions → Deploy Hugo site → Run workflow**.

## 5. Adding a blog post

Open `content/blog/`, create `my-post-title/index.md`:

```markdown
---
title: "My post title"
date: 2026-10-05
summary: "One sentence for the overview and for link previews."
authors: ["sam-patel"]
tags: ["beginners", "swim"]
---
Your text starts here.

## A heading

More text.
```

Then upload photos into the **same folder** (**Add file → Upload files**).

- **Preview image:** put a picture in the post folder and name it in the front matter, for example `preview: "preview.jpg"`. It is used on the blog overview (cropped to 5:4), on the start page and in link previews (WhatsApp, Instagram messages, social media).
- **Without `preview`:** the cards on the blog overview and start page show a subtle grey default image with the IC TRI watermark (`assets/images/card-default.jpg`, 1250 × 1000 px). Link previews show the red social card with the club name (`assets/images/social-card.jpg`, 1200 × 630 px, keep the text in the middle). Replace either file to change the look.
- **Photos in the text:** there is no big title image on top of a post. Place photos wherever you like with the `photo` shortcode (see section 6), including right at the start.
- **Other photos:** any file name, same folder. Big camera photos are fine; the site shrinks them.
- **Authors:** use the folder name of an author profile (`sam-patel`) and the name becomes a link. Any other text (`"Guest writer"`) is shown as plain text.
- **Tags:** lowercase, always the same spelling. Tags are clickable and "More from the blog" prefers posts with shared tags.
- **Draft / scheduled:** `draft: true` hides a post. A `date` in the future hides it until that day (applied by the nightly rebuild).

**Remember: the repository is public.** Drafts and everything else in it can be read by anyone on GitHub. Never put anything private in it.

### Everything you can do in a post
The example post **"Style guide: everything you can do in a post"** shows headings, text styles, lists, quotes, tables, images, galleries, callouts, code, collapsible sections and more. Open its file side by side with the published page and copy what you need. HTML is allowed anywhere in a post.

## 6. Photos, galleries, videos: the building blocks (shortcodes)

Shortcodes are short commands in double curly brackets and angle brackets.

| What | How to write it |
|---|---|
| Photo with caption | `{{</* photo src="pic.jpg" alt="Description" caption="Caption" /*/>}}` |
| Wider photo / small photo beside the text | add `size="wide"` (or `size="full"`) / `align="right"` (or `left`); `credit="Name"` adds a photo credit |
| Gallery (swipe or click through) | `{{</* gallery */>}}` then several `photo` lines, then `{{</* /gallery */>}}` |
| YouTube video | `{{</* youtube id="VIDEO_ID" title="Title" */>}}` (the ID follows `v=` in the address) |
| Instagram post | `{{</* instagram id="CODE" */>}}` (CODE is in `instagram.com/p/CODE/`); reels: add `type="reel"` |
| Highlighted box | `{{</* callout type="tip" title="Tip" */>}}Text{{</* /callout */>}}` (types: info, tip, warning) |
| Button | `{{</* button href="https://…" */>}}Label{{</* /button */>}}` |

**YouTube and Instagram are never loaded automatically.** Visitors see a neutral box with a short privacy notice; only after they click is a connection to YouTube or Instagram made. This is why the website needs no cookie banner. Please always use these two shortcodes and never paste an embed code from the providers.

## 7. People

**Committee members:** one folder per person in `content/committee/` with `index.md` and an optional `photo.jpg` (a square-ish photo with the face in the middle; it is cropped to a circle; without a photo the initials are shown).

```markdown
---
title: "Jordan Lee"
role: "President"
weight: 1
info: "Third-year Mechanical Engineering."
---
Everybody writes their own text here.
```

`weight` sets the order (small first). The circles appear on the About page and at the bottom of each member page. To remove someone, delete the folder.

**Blog authors** work the same way in `content/authors/` (fields `title`, `role`, `bio`). The folder name is what you write in a post's `authors:` list; the author page lists all their posts automatically. The footer line "Designed & built by Frederik Beck" links to his profile in `content/authors/frederik-beck/`.

## 8. Pages, FAQs, menu, design

- **Page content** (Swim, Bike, Run, Racing, Beyond, About, start page) is plain HTML in `layouts/pages/*.html` and `layouts/home.html`. Search for `TODO` and `tbc` to find placeholders.
- **FAQs** are not in the HTML but in `data/faq/<page>.yaml`: one `q:` and one `a:` per question. Edit them there. They also feed the search-engine data.
- **Add a page:** copy `layouts/pages/swim.html` and `content/swim.md` to a new name, adjust the front matter (`layout:`, `url:`) and, if needed, add it to the menu in `layouts/_partials/nav.html` and `drawer.html`.
- **Menu / footer:** `layouts/_partials/nav.html`, `drawer.html`, `footer.html`.
- **Colours, fonts, spacing:** `assets/main.css`; at the top (`:root`) are the accent colour `--accent`, its hover colour `--accent-dark` and the light tint `--accent-tint`. If you change the accent colour, also change `theme-color` in `layouts/_partials/head.html` (browser bar on phones) and the dot in the logo file.
- **Links** in HTML files: `{{ "swim/" | relURL }}`; images from `static/images/`: `{{ "images/name.jpg" | relURL }}`. In Markdown posts simply write `/swim/`.
- **Contact details** (email, Instagram, Strava, Union link) are in `hugo.toml` under `[params]`.

## 9. Optional: preview on your computer

Install Hugo (extended, version 0.167 or newer: `brew install hugo` on Mac, `winget install Hugo.Hugo.Extended` on Windows), run `hugo server -D` in the project folder and open the address it prints. `-D` also shows drafts.

## 10. Privacy and embeds

- The website sets **no cookies**, uses **no analytics** and loads **no third-party resources** by itself. The text is on the Privacy & Legal page; please have the committee or the Union read it once.
- A security setting (Content-Security-Policy) blocks scripts and frames from other websites. Allowed frames are listed in `hugo.toml` → `embedHosts` (YouTube and Instagram). To embed something else (for example a map), add its web address there **and** mention it on the privacy page.
- If you ever add analytics, a form or any other service, update the privacy page first.

## 11. SEO and AI search

Already built in, you do not need to do anything for these:

- A title, description, canonical address and link preview (Open Graph) for every page; the preview image of a post is used for WhatsApp, Instagram and Google link previews.
- **Structured data (schema.org):** the club as a sports organisation within Imperial College London, plus the website, breadcrumbs, blog posts, news, people and the FAQs of each page. It is invisible to visitors and helps search engines and AI assistants understand the site. It is created automatically in `layouts/_partials/schema.html` from your content.
- `sitemap.xml`, `robots.txt`, an RSS feed for the blog and `llms.txt` (a plain-text summary for AI assistants, rebuilt automatically).

What you should do:

1. **At launch** set `noindex = false` in `hugo.toml`. Until then search engines are asked to ignore the site.
2. Give every post a good `title`, a `summary` (one clear sentence) and `alt` text on photos. Clear headings (`##`) help people and machines.
3. Keep news and blog fresh, and link to the website from the Union page, Instagram and Strava.
4. After launch, register the site in **Google Search Console** and **Bing Webmaster Tools** and submit `sitemap.xml`.
5. `llms.txt` is a plain-text summary of the site for AI assistants (a young convention; no search engine promises to use it, but it is free). If you do not want AI companies to use your texts for training, set `blockAiTraining = true` in `hugo.toml`: `robots.txt` then asks the well-known AI crawlers (GPTBot, ClaudeBot, CCBot …) to stay away. This is a polite request, not a technical block, and it does not affect Google or Bing search.

The email address is not included in the structured data on purpose.

## 12. Security

A static website has very little that can be attacked: no database, no login, no forms. The weak point is the **GitHub account**.

- Switch on **two-factor authentication** for every person with access. Give write access only to people who need it, and remove it when they leave the committee.
- Keep two or more **owners** of the repository (or put it in a GitHub organisation) so access survives the yearly committee change. Write the handover into your committee checklist.
- Because HTML is allowed in posts, whoever can edit content can add code. Keep access limited to trusted committee members. The Content-Security-Policy limits the damage.
- Optional: **Settings → Branches → add rule for `main`** (require a pull request) so changes are reviewed before they go live.
- Dependabot keeps the publishing tools current; accept its monthly pull requests.
- Never commit passwords, member lists, phone numbers or private photos.

## 13. Accessibility checklist for editors

- Describe photos with `alt="…"` (what is shown, short). Leave it empty only for pure decoration.
- Use headings in order (`##`, then `###`) and never skip levels for looks.
- Write link text that makes sense alone ("the Swim page", not "click here").
- Do not rely on colour alone. Keep captions short.
- The site already provides a skip link, keyboard-friendly menus and galleries, visible focus and reduced animation for people who ask for it.

## 14. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Actions shows a red cross | Click the run and the failed step. Most often the block between the `---` lines is broken. |
| "failed to unmarshal YAML" | Put titles in quotes (`"Race: report"`), no tabs, one space after each colon. |
| Post or news is not visible | `draft: true`, a future `date`, or an `expiryDate` in the past. Wait about two minutes after committing. |
| News did not expire yet | It runs with the nightly rebuild. Start it manually: Actions → Deploy Hugo site → Run workflow. |
| A photo is missing in a post | File name must match exactly (upper/lower case) and the file must be in the post's folder. |
| A video/embed does nothing | Check the ID, and that the host is in `embedHosts` in `hugo.toml`. |
| Every link gives 404 | `baseURL` in `hugo.toml` does not match the real address, or Pages source is not GitHub Actions. |
| Nightly rebuild stopped | GitHub pauses scheduled runs after 60 days without any activity. Any commit re-enables it. |

## 15. Launch checklist

- [ ] `noindex = false` in `hugo.toml`
- [ ] Real committee names, photos and texts; remove demo people, news and posts (hide the style guide with `draft: true` if you like)
- [ ] Real times, venues and prices (search for `TODO` and `tbc`)
- [ ] Privacy & Legal page reviewed by the committee or the Union (address, names, retention)
- [ ] Favicon and a good default share image (`ogImage` in `hugo.toml`)
- [ ] Strava link in `hugo.toml`
- [ ] Two or more repository owners, two-factor authentication for everyone
- [ ] Old prototype folder deleted, redirect kept
