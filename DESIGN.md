---
version: alpha
name: Vansh Pandav portfolio
description: Portfolio of a software engineer who builds AI analytics, backend systems and full-stack products, for recruiters and hiring managers; it should read as clear, considered and easy to navigate.
colors:
  ground: "#F7F7F4"     # dark: #14181D
  surface: "#ECEDE7"    # dark: #1C2128
  ink: "#1C2127"        # dark: #E8E9E4
  muted: "#57606A"      # dark: #A3ABB4
  signal: "#1F4F8F"     # dark: #8FB6EA
  contour: "#8A5A2E"    # dark: #D39D66
  rule: "#D6D8D1"       # dark: #2C333B
  rule-strong: "#9BA1A8" # dark: #4D5661
  error: "#B3261E"      # dark: #F2B8B5
typography:
  display:
    fontFamily: Literata Variable (optical sizes)
    fontWeight: 600
    letterSpacing: -0.025em at hero size, -0.015em at section size
  body:
    fontFamily: Public Sans Variable
    fontSize: 16px
    lineHeight: 1.6
rounded:
  sm: 4px   # buttons, inputs, toggles
  md: 6px   # contact panel, dialog, media
spacing:
  section: 104px (64px on mobile)
  legend-gap: 72px
  entry: 40px
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ground}"
    rounded: "{rounded.sm}"
    padding: 12px 22px
---

## Overview

A portfolio for a new-grad software engineer whose flagship project is called *Atlas*, whose skills section is a globe, who studied in Boulder, and whose one-line pitch is "software that makes complex systems easier to use." The look comes from the printed USGS topographic sheet: a map makes complex ground readable with white paper, black type, blue for water and brown for contours. Each section reads like a map, with its title in a legend column on the left and the content on the right.

## Colors

- **Ground:** map paper. Cool white, deliberately not parchment or cream.
- **Ink:** blue-black printing ink. 15:1 on ground.
- **Muted:** secondary text. 6:1 on ground (7.7:1 in dark).
- **Signal (survey blue):** one job: action. Links, primary buttons and focus rings only. 7.6:1 on ground.
- **Contour (brown):** one job: structure. Category and date labels, the globe graticule and the availability dot. Never used for actions. 5.5:1 on ground.
- **Rule / rule-strong:** hairlines between entries; borders on inputs and secondary buttons.
- **Section tints**: plains green `#9FBB82`, wheat `#E2CF8F`, ochre `#D7A968`, canyon `#B98660`, lake blue `#2D5D8F`. Each legend column carries a swatch in one of these. Soft washes of them (`--wash-*`) fill the highlight cards and the contact panel. Experience sits on a full-width lake-blue band (`#1D3E63`, light text, tokens re-scoped on `.band-lake`).
- Dark mode is a full "night map" palette (values above), not one accent on black.

## Typography

Literata (headings, the hero statement, the about paragraph and case-study reading text) with Public Sans (UI, labels and homepage body). Public Sans is the US government's design-system face, plain like map lettering. Literata is a reading face, chosen for long case-study prose. The one loud place is the name in the hero. Labels are sentence case in Public Sans 14px/600.

## Layout

Container is 1200px. Content sections use `.legend-section`: a 300px sticky legend column (h2 and intro) beside a fluid body; this collapses to one column under 900px. Projects and experience are entries separated by hairlines, not cards.

## Texture & motion

A fine paper grain (SVG noise, fixed, multiply in light, screen in dark) covers the page. Motion is limited to: section fade-ups, legend swatches growing in, and hover lifts on highlight cards and project entries. No bounce, no glow.

## Elevation & Depth

Mostly flat. Hover lifts are a small translate, not a shadow. Only the booking dialog casts a shadow. No offset shadows, glows or backdrop blur.

## Shapes

4px on controls, 6px on panels and media. No pills.

## Components

Header, footer, buttons (`.button.primary`, `.button.secondary`), `.text-link` and the legend layout are shared by the homepage and every case study through `src/styles.css`. Case studies add only `src/caseStudy.css`.

## Do's and Don'ts

- Do reuse these tokens and components on every page; add a token here before a page uses a new value.
- Do keep labels as plain sentence-case text that carries information.
- Don't use: cream with a terracotta/orange accent (SD1); near-black with one vermilion accent (SD2); one italic or colored word in a headline (SD5); `01 /` section numbers or all-caps tracked labels (SD4, SD6); `·`-joined metadata; arrow glyphs on links; pills, offset shadows, glass blur, bounce easing.
- Don't change: the content in `src/content.js` and `src/caseStudies.js` except to fix wording.
