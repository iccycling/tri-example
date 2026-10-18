---
title: "Style guide: everything you can do in a post"
date: 2026-09-30
summary: "A tour of headings, images, tables, quotes, callouts and more. Copy what you need and delete the rest."
authors: ["sam-patel", "lena-rossi"]      # Ordnernamen aus content/authors/ → Name wird klickbar. Freier Text geht auch (dann ohne Link).
preview: "preview.jpg"                  # Bild für Übersicht, Startseite und Link-Vorschau (Datei im selben Ordner)
tags: ["guide", "website"]
---
This post is both a demo and a cheat sheet. Everything below is plain Markdown, and a few extras. Open `content/blog/style-guide/index.md` next to this page to see how each element is written.

## Headings

Use `##` for sections. Every heading gets an anchor automatically, so you can link straight to it.

### A smaller heading

`###` is good for sub-sections within a section.

#### And the smallest

`####` renders as a small accent-coloured label — handy for short labels like "Pros" and "Cons".

## Text

Normal text is comfortable to read: a moderate line length, generous spacing and a dark grey that is easy on the eyes. You can write **bold**, *italic*, ***both***, ~~strikethrough~~ and `inline code`. Highlights work with <mark>HTML marks</mark>, and keyboard shortcuts look like <kbd>Ctrl</kbd> + <kbd>K</kbd>.

Links look like [this external link](https://www.imperialcollegeunion.org/) (opens in a new tab) or [this internal one](/swim/) (just start with a slash). Footnotes are supported too.[^1]

[^1]: Footnotes appear at the bottom of the post, with a link back to where you came from.

---

## Lists

A bullet list:

- Swim on Monday evening
- Bike on Tuesday and Wednesday
  - Spinning at the gym
  - Laps in Richmond Park
- Run on Friday morning

A numbered list:

1. Warm up for ten minutes
2. Do the main set
3. Cool down and stretch

A checklist:

- [x] Register for the club
- [x] Buy a swim cap
- [ ] Sign up for your first race

## Quotes

> The hardest part of triathlon is not the swim, the bike or the run. It is turning up.
>
> <cite>— A club member, after her first sprint triathlon</cite>

## Tables

| Distance   | Swim    | Bike   | Run    |
|:-----------|--------:|-------:|-------:|
| Super sprint | 400 m | 10 km  | 2.5 km |
| Sprint     | 750 m   | 20 km  | 5 km   |
| Olympic    | 1.5 km  | 40 km  | 10 km  |
| Half       | 1.9 km  | 90 km  | 21.1 km |

Tables scroll sideways on small screens instead of breaking the layout.

## Images

A normal Markdown image fills the text width. Photos in the post folder are automatically resized, so camera originals are fine:

![Open-water start in a lake](square.jpg)

For captions and more control, use the `photo` shortcode. The default size matches the text:

{{< photo src="portrait.jpg" alt="Swimmers entering the water" caption="A portrait photo at normal size. Use the caption for who, where and when." credit="ICTRI" />}}

`size="wide"` is wider than the text — great for landscape photos:

{{< photo src="wide.jpg" size="wide" alt="Swimmers at the start of a race" caption="Wide: breaks out of the text column on large screens." />}}

Photos can also sit next to the text. `align="right"` (or `left`) floats a smaller image:

{{< photo src="square.jpg" align="right" alt="Swimmer in the water" caption="Floated to the right." />}}

Text wraps around the floated image, which is perfect for short portraits or detail shots. Keep the paragraph long enough to fill the space beside it, otherwise the next heading will look a bit lonely. The text simply continues until the image has been passed, and then goes back to full width.

## Galleries

Several photos can be combined into a gallery that visitors swipe or click through. Put the `photo` shortcodes inside a `gallery` shortcode:

{{< gallery >}}
{{< photo src="wide.jpg" alt="Swimmers at a race start" caption="Swipe on a phone, or use the arrows on a computer." />}}
{{< photo src="portrait.jpg" alt="Swimmers entering the water" caption="Portrait and landscape photos can be mixed." />}}
{{< photo src="square.jpg" alt="A swimmer in the water" caption="Every photo can have its own caption." />}}
{{< /gallery >}}

## Callouts

{{< callout type="info" title="Good to know" >}}
Callouts are great for rules, deadlines or anything readers should not miss. You can use **Markdown** inside.
{{< /callout >}}

{{< callout type="tip" title="Tip" >}}
Green is for tips and encouragement.
{{< /callout >}}

{{< callout type="warning" title="Careful" >}}
Orange is for warnings, for example about open-water safety.
{{< /callout >}}

## Code

```yaml
title: "My first post"
date: 2026-10-01
tags: ["beginners"]
```

## Collapsible sections

<details>
<summary>What does a typical session look like?</summary>

Warm-up, drills, main set, cool-down. Details are on the [Swim page](/swim/).

</details>

## Buttons

{{< button href="https://www.imperialcollegeunion.org/" >}}Join via the Union{{< /button >}}

## Videos and social posts

YouTube videos and Instagram posts are **not loaded automatically**. Visitors first see a neutral box with a short privacy notice, and a connection to YouTube or Instagram is only made after they click. That keeps the site free of cookies and tracking by default.

{{< youtube id="jNQXAC9IVRw" title="Example video — replace the id with your own" >}}

The ID is the part after `v=` in a YouTube address. For Instagram, use the code from the post address (`instagram.com/p/CODE/`):

{{< instagram id="CODE_FROM_YOUR_POST" >}}

Other things (maps, forms) can be added with plain HTML, but anything that loads from another website must be allowed in `hugo.toml` first (see the website guide).

## Definitions

Brick session
: A bike ride followed straight away by a run, to get your legs used to the change.

Transition
: The area where you swap swim gear for bike gear, and bike gear for running shoes.

---

That is the whole toolbox. Write something great.
