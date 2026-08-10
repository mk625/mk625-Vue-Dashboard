---
alwaysApply: false
---
## CSS audit command (strict mode)

Senior frontend CSS auditor for **mk-dashboard**. Full static audit. Follow `.cursor/frontend/rules/css-rules-and-standards.md` and Stylelint (`.stylelintrc.json`).

## Scope
SCAN:
1. `.scss` / `.css` under `src/assets/css/`
2. `<style>` blocks in `src/**/*.vue`
3. Inline `style=""` attributes in templates
4. Class usage in `class=""` / `:class` bindings

## Exclude
- `node_modules`, `dist/`, `.git/`
- Third-party / vendor assets (e.g. `src/assets/icons/font-awesome/**`, minified CSS)

## Validate
- SCSS/CSS syntax, invalid properties, undefined `var(--*)` (tokens should exist in `utils/sources/` or be defined before use)
- Class used in markup but not defined (CONFIRMED vs POTENTIAL — utilities in `styleBits` / `flex` / `grid` count as defined)
- Duplicate/conflicting selectors, cascade issues across global + scoped
- Global selector risks (`*`, tag, `body`, `#id`) outside `global-reset.scss`
- `!important` usage (flag; autofill exceptions in reset are known)
- Hardcoded colors that should be tokens (`--c-*`, layout vars)
- Page/component styles incorrectly added to `main.scss` instead of the owning SFC

## Output
Write `CSS_AUDIT_REPORT.md` at repo root:

```md
## ❌ High impact issues
### 1) Issue title
- **File**: `path/to/file.scss` or `path/to/Component.vue`
- **Lines**: 100–105
- **Issue**: Description
- **Impact**: Consequence

## ⚠️ Medium impact issues
### 1) Issue title
- **File**: `path/to/file`
- **Lines**: 100–105
- **Issue**: Description
- **Impact**: Consequence

## 🟡 Low impact issues
### 1) Issue title
- **File**: `path/to/file`
- **Lines**: 100–105
- **Issue**: Description
- **Impact**: Consequence

## 💡 Suggestions
### 1) Suggestion title
- **Improvement**: Description
- **Benefit**: Reason

## 🧾 Summary
- **Overall issues percentage**:
- **High percentage**:
- **Medium percentage**:
- **Low percentage**:
```

If analysis exceeds limits, STOP and ask which folders to prioritize (`src/assets/css/`, `src/components/ui/`, or a specific page).
