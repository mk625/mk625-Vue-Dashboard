# HTML & JS Rules & Standards

## Purpose
Standards for HTML and JavaScript: semantic markup, accessibility (A11y), naming (e.g. BEM), validation, minimal DOM, documentation, and no inline styles.

---

## Overview
- Use semantic elements
- Be accessible (A11y)
- Naming & organization (e.g. BEM)
- Validate & lint
- Minimize DOM depth and nodes
- Document & comment
- No inline styles

---

## Common mistakes to avoid
- Nested interactive elements (e.g. `<a><button></button></a>`)
- Missing `alt` text on images
- Unlabeled form inputs
- Using `<br>` for spacing (use CSS instead)
- Using `<b>` or `<i>` — prefer `<strong>` or `<em>`
- Duplicate `id`s
- Skipping semantic tags

---

## 1. Formatting HTML code
All HTML must be formatted. Prefer standards similar to htmlformatter.com (consistent indentation, line breaks, attribute order).

---

## 2. Handling on-click events (semantic HTML)
`onclick` (or equivalent) must be on interactive elements only:

- Prefer **`<button>`** or **`<a>`** for click handlers.
- When you need a clickable element that is not a link or submit, use **`<span role="button">`** (and ensure keyboard support: Enter/Space, focus outline).

**Why button and anchor?**
- Semantically correct for interactive actions
- Keyboard & accessibility: Enter/Space activate them
- Default styles: cursor pointer, focus outline
- Screen readers treat them as clickable

Always use semantic HTML for interactive UI.

---

## 3. Selectors in JS: avoid tag names
Do **not** use tag names as selectors in JavaScript (e.g. `document.querySelector('div')`).

**Why?**
- **Breaks easily:** HTML structure changes; reordering or adding tags can break logic.
- **Multiple matches:** Tags like `<div>` appear everywhere; a tag selector may match many elements when you need one.
- **Poor scalability:** Large codebases need precise selectors; tag names don’t scale across teams.

**Do:** Use **class names** as selectors in JS. Use **id** only when you need a single, unique element.

---

## 4. Avoid invalid nesting
Do not nest block elements inside inline or invalid containers. Example to avoid: `<p><div></div></p>` (invalid; `<div>` is not allowed inside `<p>`).

---

## 5. Use `<strong>` or `<em>` for meaning
Use `<strong>` for importance and `<em>` for emphasis. Avoid using `<b>` or `<i>` for styling; reserve them only if you have a specific reason (e.g. typographic convention).

---

## 6. Class names: avoid single-word names (except utilities)
Do not use single-word class names for components or blocks (e.g. `.card`, `.button`, `.title`). They are too generic and can clash.

**Exception:** Utility classes are allowed, e.g. `.fs14 { font-size: 14px; }` where the name describes the utility.

Prefer descriptive, namespaced or BEM-like names (e.g. `.data-card`, `.zcrmp-button`, `.card-title`).

---

## 7. JSP and Handlebars

- Reusable includes use `.jspf` fragments (e.g. `staticresources.jspf`)
- Handlebars templates in JSP: `<script id="templateId" type="text/x-handlebars-template">`
- Compile via `Component.getHandlebarTemplate(templateId, data, helpers)` (`js/components/component.js`)
- One `<main>` and one `<h1>` per page

---

## 8. Project DOM APIs

```javascript
function $(id) { return document.getElementById(id); }  // common.js
$j = jQuery.noConflict();
```

- `$('myId')` — getElementById only; never use bare `$` for jQuery
- `$j('.my-class')` — jQuery selectors and plugins

---

## 9. Module and state patterns

- `Common` (`common.js`) — shared state, API prefix `/api/v1`, CSRF cookie `cmcsr`
- `ZCPConstants` (`constants.js`) — app constants
- `MainPage` / `Module` (`Module.js`) — navigation and module registry
- `Services` (`services.js`) — iframe-loaded Zoho service UIs

---

## 10. i18n

- Hardcoded user-visible strings in JS: append `//No I18N` unless using existing i18n helpers
- Locale bundles: `crmplusi18n_{locale}.js`; RTL splits: `common_ltr.js` / `common_rtl.js`
