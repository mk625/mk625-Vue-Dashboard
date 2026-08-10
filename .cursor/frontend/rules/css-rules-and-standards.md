# CSS / SCSS Rules & Standards (mk-dashboard)

## Purpose
Standards for scalable, minimal, responsive styles in this Vue 3 app. Design system lives under `src/assets/css/`. Component-local styles belong in Vue SFCs (`<style scoped lang="scss">`).

---

## Overview
CSS/SCSS should be: scalable, understandable, minimal, responsive, and token-driven.

---

## 1. Entry & file order

Styles load through `src/assets/css/main.scss` (imported from `src/main.js`). Keep this order:

**Sources (tokens)**
- `utils/sources/app-fonts.scss`
- `utils/sources/app-themes.scss`
- `utils/sources/app-colors.scss`
- `utils/sources/app-status-colors.scss`
- `utils/sources/app-layout.scss`

**Global**
- `utils/components/_functions.scss`, `_mixins.scss`
- `utils/global-reset.scss`

**Source styles**
- `utils/sources/sources-styles/*`

**Utils**
- `styleBits.scss`, `flex.scss`, `grid.scss`, `mini-components.scss`, `responsive.scss`

**Component / page styles** — in the Vue SFC that owns the UI (scoped). Do not dump page CSS into `main.scss`.

Vite injects mixins globally via `vite.config.js` (`additionalData` → `_mixins.scss`).

---

## 2. Universal selector (compulsory)

Only this pattern for the universal reset (already in `global-reset.scss`). Other `*` rules are highly restricted.

```scss
* { padding: 0; margin: 0; }
*, *::before, *::after { box-sizing: border-box; }
```

---

## 3. Body tag (compulsory)

Body may only set baseline inheritance (already in `global-reset.scss`):

- `font-family`, `color`, `font-size`, `line-height`, `text-align`, app-level `background` / `overflow`

**Never repeat body styles on leaves:**
- Bad: `body { color: #999; }` and `.card-description { color: #999; }`
- Good: use `var(--c-text-secondary)` (or inherit)

---

## 4. Non-inheritable elements

Form controls do not inherit from body. Keep (or extend) the reset pattern:

```scss
input, textarea, button, select {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
```

---

## 5. Variables (required for)

Use CSS custom properties from sources — do not hardcode hex for themeable values:

| Concern | Where | Examples |
|---------|--------|----------|
| Colors | `app-colors.scss` | `--c-text-primary`, `--c-gray-90`, `--c-border-default` |
| Status / theme | `app-status-colors.scss`, `app-themes.scss` | status tones |
| Fonts | `app-fonts.scss` | `--app-font` |
| Layout sizes | `app-layout.scss` | `--w-app-sidebar`, `--h-app-header`, `--h-input` |
| Motion | `styleBits.scss` | `--fast-trans`, `--default-trans` |

Prefer existing tokens. Add new variables to the matching source file, not ad-hoc in a component.

---

## 6. Utilities first

Reuse project utilities before writing one-off layout CSS:

- Flex: `d-flx`, `aI-C`, `jC-SB`, `g-*`, `fD-C` (`flex.scss`)
- Spacing / type / misc: `styleBits.scss` (e.g. `.f14`, padding helpers)
- Grid / responsive: `grid.scss`, `responsive.scss`

Utility single-word / short names are allowed. Do **not** style against utilities as selectors (see §8.4).

---

## 7. CSS property order

display → dimensions → spacing → background → typography → border/outline → margin → positioning.

**Example:**
```scss
.box-example {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: var(--c-white);
    font-size: 14px;
    color: var(--c-text-primary);
    margin: 0 auto;
    border: 1px solid var(--c-border-default);
    position: absolute;
    top: 0;
    left: 0;
}
```

---

## 8. Inner styles best practices

1. **Never use `!important`** (Stylelint: `declaration-no-important`). Rare exceptions only (e.g. autofill hacks already in reset).

2. **Never use `<div>` for text** — use semantic tags (`h1`–`h6`, `p`, `span`).

3. **Never use tag or id as selector** — class selectors only (Stylelint: `selector-max-type: 0`). Tag selectors belong only in `global-reset.scss`.

4. **Never use a utility/common class as a styling hook**
   - Bad: `.data-card .f14 { color: green; }`
   - Good: `.data-card .card-title { color: green; }`

5. **Never overuse `>`** — prefer a class on the child. Use `>` only for the same nested UI pattern.

6. **Never use id as a CSS selector** for styling.

7. **One `<main>` and one `<h1>` per view** (route page).

8. **BEM-style naming** where applicable: `.app-header`, `.app-header__action-btn`, `.m-btn--primary`.

9. **Scoped SFC styles**
   - Prefer `<style scoped lang="scss">`
   - Class names must be component-specific (`m-btn`, `app-header`, …)
   - Do not pierce unrelated components with deep selectors unless required for a slot root

10. **Clean & consistent style**
    - Indentation: 4 spaces
    - Lowercase properties/values
    - One selector / one declaration per line
    - End declarations with `;`

11. **Accessibility & UX**
    - High contrast via tokens
    - Visible `:focus` / `:hover` (do not strip focus without a replacement)

12. **Maintainability**
    - Comment complex blocks
    - Keep SFC style blocks small; extract shared bits to `src/assets/css/` when reused 2+ times
    - Run `npm run lint:css` when touching global CSS

13. **Never use tag name as selector** outside reset
    - Bad: `header { height: var(--h-app-header); }`
    - Good: `.app-header { height: var(--h-app-header); }`
