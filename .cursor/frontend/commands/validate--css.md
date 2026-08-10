---
alwaysApply: false
---
## CSS audit command (strict mode)

Senior frontend CSS auditor. Full static audit. Follow project rules in `.cursor/frontend/rules/css-rules-and-standards.md` and `crm-plus-components-rules.md`.

## Scope
SCAN:
1. `.css` files under `WebContent/styles/`
2. Style blocks in `.jsp`, `.jspf`, `.html`, `.js`
3. Inline `style=""` attributes
4. Class usage in `class=""` attributes

## Exclude
- `node_modules`, `build/` output, `.hg/`
- Third-party minified files (`d3.min.js`, etc.)

## Validate
- CSS syntax, invalid properties, undefined `var(--*)`
- Class used in markup but not defined (CONFIRMED vs POTENTIAL)
- Duplicate/conflicting selectors, cascade issues
- Global selector risks (`*`, tag, `body`)
- RTL pairs: `*_ltr.css` changes without matching `*_rtl.css`

## Output
Write `CSS_AUDIT_REPORT.md` at repo root:

```md
## ❌ High impact issues
### 1) Issue title
- **File**: `path/to/file.css`
- **Lines**: 100–105
- **Issue**: Description
- **Impact**: Consequence

## ⚠️ Medium impact issues
### 1) Issue title
- **File**: `path/to/file.css`
- **Lines**: 100–105
- **Issue**: Description
- **Impact**: Consequence

## 🟡 Low impact issues
### 1) Issue title
- **File**: `path/to/file.css`
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

If analysis exceeds limits, STOP and ask which folders to prioritize.
