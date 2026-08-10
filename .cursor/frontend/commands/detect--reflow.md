---
alwaysApply: false
---
# Reflow detection command (strict mode)

Detect forced reflows, layout thrashing, and layout-triggering patterns in this project.

## Scope
- `.js` under `WebContent/js/`
- Inline `<script>` in JSP/JSPF/HTML
- Event handlers: scroll, resize, mousemove, input, animation loops

## Flag as HIGH IMPACT
- Layout reads after DOM writes in the same block: `offsetWidth`, `offsetHeight`, `getBoundingClientRect()`, `getComputedStyle()`, etc.
- READ → WRITE → READ → WRITE cycles in one function or loop
- Layout reads in loops or unthrottled scroll/resize/mousemove handlers

## DOM writes that invalidate layout
`element.style.*`, `classList`, `className`, `innerHTML`, `appendChild`, `removeChild`

## Rules
- Explain WHY reflow happens; separate CONFIRMED vs POTENTIAL
- Recommend batching reads then writes; use `requestAnimationFrame` for writes

## Output

```md
## ❌ High Impact Issues
### 1. Forced reflow detected
- **File**: `path/to/file.js`
- **Lines**: 100–110
- **Pattern**: DOM write then layout read
- **Fix**: Separate read and write phases

## ⚠️ Medium Impact Issues
### 1. ...
- **File**: ...
- **Lines**: ...
- **Issue**: ...
- **Fix**: ...

## 🟡 Low Impact Issues
### 1. ...
- **File**: ...
- **Lines**: ...
- **Issue**: ...
- **Fix**: ...

## 💡 Suggestions
### 1. Use requestAnimationFrame batching
- **Benefit**: Prevents layout thrashing

## 🧾 Summary
- **Total issues**:
- **High**:
- **Medium**:
- **Low**:
- **Risk level**:
```

If analysis exceeds limits, STOP and ask which files to prioritize.
