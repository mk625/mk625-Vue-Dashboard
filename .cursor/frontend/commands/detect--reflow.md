---
alwaysApply: false
---
# Reflow detection command (strict mode)

Detect forced reflows, layout thrashing, and layout-triggering patterns in **mk-dashboard** (Vue 3).

## Scope
- `<script>` / `<script setup>` in `src/**/*.vue`
- `.js` under `src/js/`
- Event handlers: scroll, resize, mousemove, input, animation / `requestAnimationFrame` loops
- Direct DOM APIs on `ref` / `el` (including libraries that measure layout)

## Flag as HIGH IMPACT
- Layout reads after DOM writes in the same tick/block: `offsetWidth`, `offsetHeight`, `clientWidth`, `scrollTop`, `getBoundingClientRect()`, `getComputedStyle()`, etc.
- READ → WRITE → READ → WRITE cycles in one function or loop
- Layout reads in loops or unthrottled scroll/resize/mousemove handlers
- Measuring layout in `watch` / `watchEffect` without batching when the effect also mutates DOM/styles

## DOM writes that invalidate layout
`el.style.*`, `classList`, `className`, Vue class/style bindings that change geometry, `innerHTML`, `appendChild`, `removeChild`, toggling `v-if` on large subtrees followed by immediate measure

## Rules
- Explain WHY reflow happens; separate CONFIRMED vs POTENTIAL
- Prefer: batch reads then writes; `requestAnimationFrame` for writes; throttle/debounce scroll/resize
- Prefer Vue reactivity and CSS (transitions, utilities) over manual measure/mutate loops
- Note Vue-specific patterns: measuring in `onMounted` immediately after large `v-for` updates; sync layout work inside `nextTick` chains

## Output

```md
## ❌ High Impact Issues
### 1. Forced reflow detected
- **File**: `path/to/file.vue` or `path/to/file.js`
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

If analysis exceeds limits, STOP and ask which areas to prioritize (`src/components/ui/`, tables/dialogs, or a specific page).
