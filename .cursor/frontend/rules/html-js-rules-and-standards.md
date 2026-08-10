# Vue / HTML / JS Rules & Standards (mk-dashboard)

## Purpose
Standards for Vue SFCs, semantic markup, accessibility, naming, and script organization in this project.

---

## Overview
- Vue 3 Composition API with `<script setup>`
- Semantic HTML in `<template>`
- Accessible (A11y)
- BEM-like / namespaced classes
- Minimal DOM depth
- No inline styles
- Import via `@/` alias (`src/`)

---

## Common mistakes to avoid
- Nested interactive elements (e.g. `<a><button></button></a>`)
- Missing `alt` on images
- Unlabeled form inputs
- Using `<br>` for spacing (use CSS / utilities)
- Using `<b>` / `<i>` for meaning — prefer `<strong>` / `<em>` (icon fonts like `bi-*` / `fa-*` on `<i>` are fine)
- Duplicate `id`s
- Skipping semantic landmarks (`header`, `main`, `nav`, …)

---

## 1. Vue SFC structure

Preferred order:

```vue
<script setup>
    // imports, props, state, logic
</script>

<template>
    <!-- markup -->
</template>

<style scoped lang="scss">
    /* component styles */
</style>
```

- Use `defineProps` / `defineEmits` in `<script setup>`
- Prefer existing UI: `src/components/ui/` (`MButton`, `MInput`, `RightDialog`, `BaseCard`, …)
- Layout shell: `src/components/home/` (`AppHome`, `AppHeader`, `AppSideBar`, …)
- Route pages: `src/components/inner-pages/sidebar-pages/...`

---

## 2. Formatting templates
Keep templates readable: consistent indentation, one primary attribute group per line when long, clear HTML comments for sections (match existing `<!-- section -->` / `<!-- \\\ section -->` style when editing those files).

---

## 3. Click handlers (semantic HTML)
Bind `@click` (and keyboard equivalents) only on interactive elements:

- Prefer **`<button>`** or **`<a>`** (or UI wrappers like `MButton` / `PlainButton`)
- For non-link / non-submit clickables: `role="button"`, keyboard Enter/Space, and a visible focus style

---

## 4. Selectors in JS / Vue: avoid tag names
Do **not** use tag selectors (`querySelector('div')`, `closest('span')` for logic).

**Do:** class names, `ref=""`, or template refs (`ref` + `useTemplateRef` / `ref` on elements).

`id` only for a single unique target (rare).

---

## 5. Avoid invalid nesting
Do not nest block elements inside invalid parents (e.g. `<p><div></div></p>`).

---

## 6. Emphasis
Use `<strong>` / `<em>` for meaning. Reserve `<b>` / `<i>` for icons or typographic cases.

---

## 7. Class names
- Avoid generic single-word component classes (`.card`, `.button`, `.title`) — prefer `.base-card`, `.m-btn`, `.card-title`
- **Exception:** project utilities (`d-flx`, `g-10`, `f14`, …) from `styleBits.scss` / `flex.scss`
- BEM where it helps: `.app-header__action-btn`

---

## 8. Routing & navigation

- Routes are generated from `src/api/navigation.json` in `src/router/index.js`
- Adding a sidebar page: update `navigation.json`, map the component in the router `componentMap` / child maps, and add the page under `inner-pages/`
- Layout uses nested routes under `AppHome` (`AppLayout`)

---

## 9. Data & services

- Firebase / Firestore: `src/firebase.js` (default export `db`)
- Shared JS helpers: `src/js/services/`, `src/js/utils/`
- Prefer Pinia for shared client state when introducing cross-view state
- Do not introduce jQuery, global `$`, or Handlebars — this is a Vue SPA

---

## 10. Imports

```js
import MButton from '@/components/ui/buttons/MButton.vue'
import { fetchNavigationItems } from '@/js/services/navigationApi.js'
```

Use `@/` instead of long relative paths across feature folders.

---

## 11. Accessibility checklist
- One `<main>` and one page-level `<h1>` (or clear document title via header) per view
- Labels for inputs (`MInputLabel` / associated `for`+`id` or `aria-label`)
- Dialogs: focus management and dismiss affordance (`RightDialog` patterns)
- Do not remove focus outlines without an equivalent visible state
