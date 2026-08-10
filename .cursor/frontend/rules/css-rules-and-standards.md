# CSS Rules & Standards (General)

## Purpose
General CSS standards for scalable, understandable, minimal, responsive, modern styles. For component classes and file order, also follow `crm-plus-components-rules.md`. Design system lives under `WebContent/styles/core/`.

---

## Overview
CSS should be: scalable, understandable, minimal, responsive, and follow modern standards.

---

## 1. Universal selector (compulsory)
Use only this for the universal selector; other universal styles are highly restricted.

```css
* { padding: 0; margin: 0; box-sizing: border-box; }
```

---

## 2. Body tag (compulsory)
Body should only set these; other body styles are highly restricted.

- `body { font-family; color; font-size; line-height; text-align }`

**Warning – never repeat body styles:**
- Bad: `body { color: #999999; }` and elsewhere `.card-description { color: #999999; }`
- Good: set color once (e.g. on body or a variable); use that variable or inheritance for `.card-description`.

---

## 3. Non-inheritable elements
These tags do not inherit from body or parent. Inherit explicitly where needed.

```css
input, textarea, button { font-family: inherit; font-size: inherit; color: inherit; line-height: inherit; }
```
Apply to all input-like elements as needed.

---

## 4. CSS property order
Use this order for readability: display → dimensions → spacing → background → typography → border/outline → margin → positioning.

**Order:** display props → width → height → padding → background-color → font props → outline, border → margin → positioning

**Example:**
```css
.box-example {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 10px;
   width: 100%;
   height: 100%;
   padding: 10px;
   background-color: white;
   font-size: 14px;
   color: white;
   margin: 0 auto;
   border: 1px solid black;
   box-shadow: 4px 4px 4px 4px #c4c4c4;
   position: absolute;
   top: 0;
   left: 0;
}
```

---

## 5. CSS file order
Common styles must be linked first; page-specific (module) CSS last.

**Example order:**

**Common**
- **Sources:** (I) fonts.css, (II) colors.css
- **Utils:** (III) global.css, (IV) style-bits.css, (V) flex.css
- **Components:** (VI) dialog.css, (VII) form-elements.css, (VIII) tabs.css

**Modules (page-specific)**  
- (IX) home.css, (X) setting-page.css, etc.

First group = common; from the first module file onward = specific page CSS.

---

## 6. Variables (required for)
Use variables for:
- (i) Colors
- (ii) Fonts
- (iii) Heights (e.g. header, sometimes footer)
- (iv) Widths (e.g. sidebar)

---

## Best practices (general)
- Use file compression/minification for HTML, CSS, and JS to improve load time.

---

## Inner styles best practices

1. **Never use `!important`** (only one or two exceptions if truly required.)
   - Bad: `.data-card .card-title { color: green !important; }`
   - Good: `.data-card .card-title { color: green; }`

2. **Never use `<div>` for text** – use semantic tags (h1–h6, p, span).
   - Bad: `<div> Testimonials </div>`
   - Good: `<h2> Testimonials </h2>`

3. **Never use tag or id as selector** – use class selectors only.
   - Bad: `.user-lists h4 { color: var(--c-txt-primary); }`
   - Good: `.user-lists .user-name { color: var(--c-txt-primary); }`

4. **Never use a generic/common class as selector** – use component-specific classes.
   - Bad: `.data-card .font-bold { color: green; }`
   - Good: `.data-card .card-title { color: green; }`

5. **Never overuse direct child selector `>`** – prefer class on the direct child. Use `>` only for the same UI element nested in the same UI.
   - Bad: `.user-lists > .user-list { margin-bottom: 5px; }`
   - Good: `.user-lists .user-list { margin-bottom: 5px; }`

6. **Never use id as CSS selector** for styling.
   - Bad: `#sidebar { width: 200px; }`
   - Good: `.sidebar { width: 200px; }`

7. **Never use multiple `<main>` or multiple `<h1>`** on the same page.

8. **Use BEM-style naming** where applicable (block__element--modifier).

9. **Clean & consistent style**
   - Indentation: 4 spaces
   - Lowercase for properties and values
   - One selector per line
   - One declaration per line
   - End each line with `;`

10. **Accessibility & UX**
    - Maintain high contrast colors
    - Provide focus states (`:focus`, `:hover`)

11. **Maintainability**
    - Add comments for complex logic
    - Keep file size small
    - Split large CSS into modules (e.g. app-header.css, user-card.css)
    - Use a style guide or design system

12. **Never use tag name as selector**
    - Bad: `header { height: var(--h-app-header); }`
    - Good: `.app-header { height: var(--h-app-header); }`
