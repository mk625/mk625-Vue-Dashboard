# Project Guidelines & Coding Standards (mk-dashboard)

## Purpose & Overview
Comprehensive standards for Vue 3 SFCs, Semantic HTML, JavaScript/TypeScript, Accessibility (A11y), and CSS/SCSS design system architecture for `mk-dashboard`.

---

## 1. Vue 3 SFC & JavaScript Standards

### 1.1 SFC Structure & Order
Always use Vue 3 Composition API with `<script setup>` in the following order:

```vue
<script setup>
// 1. Imports (Components, Composables, Utilities)
// 2. Props & Emits (defineProps, defineEmits)
// 3. Reactive state & refs
// 4. Computed properties
// 5. Methods & Lifecycle hooks
</script>

<template>
    <!-- Semantic Markup -->
</template>

<style scoped lang="scss">
    /* Component-scoped SCSS */
</style>
```

### 1.2 Component Structure & Reusability
- **UI Primitives**: Prefer existing UI components in `src/components/ui/` (`MButton`, `MInput`, `RightDialog`, `BaseCard`, etc.).
- **Layout Shell**: Lives in `src/components/home/` (`AppHome`, `AppHeader`, `AppSideBar`, `AppLayout`).
- **Route Pages**: Placed under `src/components/inner-pages/sidebar-pages/...`.
- **Imports**: Always use the `@/` alias mapped to `src/` (e.g. `import MButton from '@/components/ui/buttons/MButton.vue'`). Avoid deep relative paths (`../../..`).

### 1.3 Routing & Navigation
- Routes are generated from `src/api/navigation.json` in `src/router/index.js`.
- When adding a sidebar page: update `navigation.json`, map the component in the router `componentMap`, and add the component file under `inner-pages/`.

### 1.4 Data, State & DOM Interaction
- **Firestore / Database**: Default database instance is imported from `@/firebase.js` (`db`).
- **Shared Helpers**: Place helper functions in `src/js/services/` and `src/js/utils/`.
- **Global State**: Use Pinia when sharing reactive client state across multiple views.
- **No Tag Selectors in JS**: Do **not** use `querySelector('div')` or `closest('span')`. Use template refs (`ref` / `useTemplateRef`) or explicit class names.
- **Never use legacy libraries**: Do not introduce jQuery, global `$`, or Handlebars.

---

## 2. Semantic HTML & Accessibility (A11y)

### 2.1 Text & Heading Semantics
- **No `<div>` for Text**: Always use semantic tags (`<h1>`-`<h6>`, `<p>`, `<span>`, `<strong>`, `<em>`, `label`).
  - *Bad:* `<div>Testimonials</div>`
  - *Good:* `<h2>Testimonials</h2>`
- **One `<main>` and one `<h1>` per view**: Only one `<main>` landmark and one page-level `<h1>` per route.
- **Emphasis**: Use `<strong>` and `<em>` for semantic importance/emphasis. Reserve `<b>` and `<i>` for typographic styling or icon fonts (`bi-*`, `fa-*`).

### 2.2 Interactive Elements & Event Handlers
- **Click Handlers**: Attach `@click` only to interactive elements (`<button>`, `<a>`, or UI components like `MButton`).
- **Non-button clickables**: If a non-button element must trigger an action, provide `role="button"`, `tabindex="0"`, `@keydown.enter.space`, and visible `:focus` styling.
- **No Invalid Nesting**:
  - Never nest interactive elements (e.g. `<a><button>...</button></a>`).
  - Never nest block elements inside inline containers (e.g. `<p><div>...</div></p>`).
  - Avoid `<br>` for spacing; use CSS spacing/margins instead.

### 2.3 Forms & Accessibility Checklist
- **Form Inputs**: Every input must have an associated label (`<label for="...">` or `aria-label`).
- **Images**: Always include meaningful `alt` attributes (`alt=""` if purely decorative).
- **Focus & Keyboard Navigation**: Do not remove `:focus` outlines without providing a high-contrast replacement.
- **Unique IDs**: Never duplicate `id` attributes across elements in a page.

---

## 3. CSS / SCSS Rules & Design System Standards

### 3.1 Universal Reset & Body Base Styles
- **Universal Selector**: Only standard reset is permitted (defined in `global-reset.scss`):
  ```scss
  * { padding: 0; margin: 0; }
  *, *::before, *::after { box-sizing: border-box; }
  ```
- **Body Base Styles**: Define base typography on `body`:
  ```scss
  body {
      font-family: var(--app-font);
      color: var(--c-text-primary);
      font-size: 14px;
      line-height: 1.5;
      text-align: left;
  }
  ```
  **Rule:** Never repeat body baseline styles on child leaves (e.g. do not re-declare `color: #999` if inherited from body or token).
- **Non-inheritable Elements**: Form controls must explicitly inherit font properties:
  ```scss
  input, textarea, button, select {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
  }
  ```

### 3.2 CSS Selectors & Architecture
- **Class Selectors Only**: Never style elements using HTML tag names (`header`, `h4`) or IDs (`#sidebar`). Tag selectors belong only in reset files.
  - *Bad:* `header { height: 60px; }` | *Good:* `.app-header { height: var(--h-app-header); }`
  - *Bad:* `#sidebar { width: 240px; }` | *Good:* `.app-sidebar { width: var(--w-app-sidebar); }`
  - *Bad:* `.user-list h4 { color: red; }` | *Good:* `.user-list .user-name { color: red; }`
- **No Utility Classes as Selectors**: Never style against shared utility classes.
  - *Bad:* `.data-card .f14 { color: green; }` | *Good:* `.data-card .card-title { color: green; }`
- **Avoid Overusing Direct Child Selector (`>`)**: Use specific class names. Reserve `>` only for identically nested recursive structures.
- **BEM Conventions**: Use BEM naming where helpful (`.app-header__action-btn`, `.m-btn--primary`).
- **No `!important`**: Strictly avoid `!important`.
- **Scoped Styles**: Always use `<style scoped lang="scss">` in Vue SFCs.

### 3.3 CSS Properties Ordering
Maintain the following standard property order for readability:
`Display & Flex/Grid -> Width & Height (Dimensions) -> Padding (Internal spacing) -> Background -> Typography & Fonts -> Outline, Border & Shadow -> Margin (External spacing) -> Positioning`

```scss
.box-example {
    /* 1. Display & Flex/Grid */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    /* 2. Dimensions */
    width: 100%;
    height: 100%;

    /* 3. Spacing (Internal) */
    padding: 10px;

    /* 4. Background */
    background-color: var(--c-white);

    /* 5. Typography */
    font-size: 14px;
    color: var(--c-text-primary);

    /* 6. Spacing (External) */
    margin: 0 auto;

    /* 7. Borders, Outlines & Shadows */
    border: 1px solid var(--c-border-default);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

    /* 8. Positioning */
    position: absolute;
    top: 0;
    left: 0;
}
```

### 3.4 CSS Variables & Token System
Use design tokens from `src/assets/css/utils/sources/` instead of hardcoded values:

| Concern | Source File | Variable Examples |
|---|---|---|
| **Colors** | `app-colors.scss` | `--c-text-primary`, `--c-text-secondary`, `--c-gray-90`, `--c-border-default` |
| **Themes / Status** | `app-themes.scss`, `app-status-colors.scss` | Status & theme color tokens |
| **Fonts** | `app-fonts.scss` | `--app-font` |
| **Layout Dimensions** | `app-layout.scss` | `--w-app-sidebar`, `--h-app-header`, `--h-input` |
| **Transitions & Motion** | `styleBits.scss` | `--fast-trans`, `--default-trans` |

### 3.5 Utilities-First Pattern
Reuse shared project utilities from `src/assets/css/` before writing one-off CSS:
- **Flexbox**: `d-flx`, `aI-C`, `jC-SB`, `g-10`, `fD-C` (`flex.scss`)
- **Typography & Spacing**: `.f14`, `.p-10`, `.m-auto` (`styleBits.scss`)
- **Grid & Responsive**: `grid.scss`, `responsive.scss`

### 3.6 CSS File Loading Order (`main.scss`)
```scss
// 1. Sources (Tokens)
@import "utils/sources/app-fonts.scss";
@import "utils/sources/app-themes.scss";
@import "utils/sources/app-colors.scss";
@import "utils/sources/app-status-colors.scss";
@import "utils/sources/app-layout.scss";

// 2. Global Mixins & Functions
@import "utils/components/functions.scss";
@import "utils/components/mixins.scss";
@import "utils/global-reset.scss";

// 3. Source Styles
@import "utils/sources/sources-styles/*";

// 4. Utils
@import "utils/styleBits.scss";
@import "utils/flex.scss";
@import "utils/grid.scss";
@import "utils/mini-components.scss";
@import "utils/responsive.scss";

// 5. Component / Page Styles
// Encapsulated inside Vue SFCs (<style scoped lang="scss">)
```

---

## 4. Code Quality & Maintainability
- **Indentation**: 4 spaces across HTML, CSS, and JS/Vue.
- **Naming**: Lowercase for CSS properties and values. Kebab-case or BEM for CSS classes. PascalCase for Vue components.
- **One per line**: One CSS selector per line, one CSS declaration per line, ending with `;`.
- **Comments**: Add section comments for complex logic (`<!-- section -->` and `/* section */`).
- **Linting**: Run `npm run lint` and `npm run lint:css` when updating scripts or styles.
