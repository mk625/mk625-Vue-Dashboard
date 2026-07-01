<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import defaultProfilePic from '@/assets/images/general/profile-pic.jpg';

/**
 * Pipeline-style data table — visual match for CRM / deal pipeline layouts.
 * Self-contained: no chrome outside the <table>.
 */

const props = defineProps({
    /** Optional: override row data */
    rows: {
        type: Array,
        default: null,
    },
});

const defaultRows = [
    {
        id: 'r0',
        fullName: 'Esther Howard',
        handle: '@estherhoward',
        avatar: defaultProfilePic,
        date: 'April 01.03.2025',
        new: 118_622.91,
        qualified: 98_400.0,
        proposition: 76_200.5,
        negotiation: 54_100.25,
        won: 32_050.0,
    },
    {
        id: 'r1',
        fullName: 'Esther Howard',
        handle: '@estherhoward',
        avatar: defaultProfilePic,
        date: 'May 01.04.2025',
        new: 122_100.0,
        qualified: 101_200.33,
        proposition: 79_880.1,
        negotiation: 58_400.0,
        won: 35_200.75,
    },
    {
        id: 'r2',
        fullName: 'Esther Howard',
        handle: '@estherhoward',
        avatar: defaultProfilePic,
        date: 'June 01.05.2025',
        new: 125_400.5,
        qualified: 104_000.0,
        proposition: 82_300.0,
        negotiation: 61_150.5,
        won: 38_900.2,
    },
    {
        id: 'r3',
        fullName: 'Esther Howard',
        handle: '@estherhoward',
        avatar: defaultProfilePic,
        date: 'July 01.06.2025',
        new: 128_900.0,
        qualified: 106_500.25,
        proposition: 85_000.0,
        negotiation: 63_800.0,
        won: 41_300.0,
    },
    {
        id: 'r4',
        fullName: 'Esther Howard',
        handle: '@estherhoward',
        avatar: defaultProfilePic,
        date: 'August 01.07.2025',
        new: 131_200.4,
        qualified: 108_900.0,
        proposition: 87_400.0,
        negotiation: 65_500.5,
        won: 43_750.8,
    },
    {
        id: 'r5',
        fullName: 'Esther Howard',
        handle: '@estherhoward',
        avatar: defaultProfilePic,
        date: 'Septem,14.08.2025',
        new: 134_000.0,
        qualified: 110_200.0,
        proposition: 89_100.0,
        negotiation: 67_000.0,
        won: 45_200.0,
    },
    {
        id: 'r6',
        fullName: 'Esther Howard',
        handle: '@estherhoward',
        avatar: defaultProfilePic,
        date: 'Octo.01.09.2025',
        new: 136_500.75,
        qualified: 112_400.0,
        proposition: 90_800.25,
        negotiation: 68_900.0,
        won: 47_100.0,
    },
    {
        id: 'r7',
        fullName: 'Esther Howard',
        handle: '@estherhoward',
        avatar: defaultProfilePic,
        date: 'Novem01.10.2025',
        new: 139_100.0,
        qualified: 114_800.0,
        proposition: 92_500.0,
        negotiation: 70_300.0,
        won: 49_400.5,
    },
];

const tableRows = computed(() => (props.rows?.length ? props.rows : defaultRows));

const selectedIds = ref(new Set(['r0', 'r3']));

const allIds = computed(() => tableRows.value.map((r) => r.id));

const allSelected = computed(
    () => allIds.value.length > 0 && allIds.value.every((id) => selectedIds.value.has(id)),
);

const someSelected = computed(() => selectedIds.value.size > 0 && !allSelected.value);

function formatMoney(n) {
    return n.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

/** Share of “Won” vs row total — subtle bar fill for richer paint */
function wonShare(row) {
    const total = Math.max(
        1,
        row.new + row.qualified + row.proposition + row.negotiation + row.won,
    );
    return Math.min(100, Math.round((row.won / total) * 100));
}

function avatarSrc(row) {
    return row.avatar ?? defaultProfilePic;
}

function onAvatarError(event) {
    const el = event.target;
    if (el instanceof HTMLImageElement) {
        el.src = defaultProfilePic;
        el.onerror = null;
    }
}

function toggleRow(id) {
    const next = new Set(selectedIds.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selectedIds.value = next;
}

function toggleAll() {
    if (allSelected.value) {
        selectedIds.value = new Set();
    } else {
        selectedIds.value = new Set(allIds.value);
    }
}

const headerCheckboxRef = ref(null);

watch(
    [allSelected, someSelected],
    () => {
        nextTick(() => {
            const el = headerCheckboxRef.value;
            if (!el) return;
            el.indeterminate = someSelected.value;
            el.checked = allSelected.value;
        });
    },
    { immediate: true },
);
</script>

<template>
    <div class="pipeline-table-wrap">
        <table class="pipeline-table" role="grid">
            <thead>
                <tr>
                    <th class="pipeline-th pipeline-th--check" scope="col">
                        <label class="pipeline-sr-only" for="pipeline-select-all">Select all</label>
                        <input
                            id="pipeline-select-all"
                            ref="headerCheckboxRef"
                            type="checkbox"
                            class="pipeline-cb"
                            :checked="allSelected"
                            @change="toggleAll"
                        />
                    </th>
                    <th class="pipeline-th pipeline-th--name" scope="col">
                        <button type="button" class="pipeline-th-btn">
                            <span>Full Name</span>
                            <i class="bi bi-arrow-down-up pipeline-sort" aria-hidden="true" />
                        </button>
                    </th>
                    <th class="pipeline-th" scope="col">
                        <button type="button" class="pipeline-th-btn">
                            <span>Date</span>
                            <i class="bi bi-arrow-down-up pipeline-sort" aria-hidden="true" />
                        </button>
                    </th>
                    <th class="pipeline-th pipeline-th--num" scope="col">
                        <button type="button" class="pipeline-th-btn">
                            <span>New</span>
                            <i class="bi bi-arrow-down-up pipeline-sort" aria-hidden="true" />
                        </button>
                    </th>
                    <th class="pipeline-th pipeline-th--num" scope="col">
                        <button type="button" class="pipeline-th-btn">
                            <span>Qualified</span>
                            <i class="bi bi-arrow-down-up pipeline-sort" aria-hidden="true" />
                        </button>
                    </th>
                    <th class="pipeline-th pipeline-th--num" scope="col">
                        <button type="button" class="pipeline-th-btn">
                            <span>Proposition</span>
                            <i class="bi bi-arrow-down-up pipeline-sort" aria-hidden="true" />
                        </button>
                    </th>
                    <th class="pipeline-th pipeline-th--num" scope="col">
                        <button type="button" class="pipeline-th-btn">
                            <span>Negotiation</span>
                            <i class="bi bi-arrow-down-up pipeline-sort" aria-hidden="true" />
                        </button>
                    </th>
                    <th class="pipeline-th pipeline-th--num pipeline-th--won" scope="col">
                        <button type="button" class="pipeline-th-btn">
                            <span>Won</span>
                            <i class="bi bi-arrow-down-up pipeline-sort" aria-hidden="true" />
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in tableRows"
                    :key="row.id"
                    class="pipeline-tr"
                    :class="{ 'pipeline-tr--selected': selectedIds.has(row.id) }"
                >
                    <td class="pipeline-td pipeline-td--check">
                        <label class="pipeline-sr-only" :for="`cb-${row.id}`">Select row</label>
                        <input
                            :id="`cb-${row.id}`"
                            type="checkbox"
                            class="pipeline-cb"
                            :checked="selectedIds.has(row.id)"
                            @change="toggleRow(row.id)"
                        />
                    </td>
                    <td class="pipeline-td pipeline-td--person">
                        <div class="pipeline-person">
                            <img
                                class="pipeline-avatar"
                                :class="`pipeline-avatar--t${rowIndex % 8}`"
                                :src="avatarSrc(row)"
                                width="40"
                                height="40"
                                alt=""
                                loading="lazy"
                                decoding="async"
                                @error="onAvatarError"
                            />
                            <div class="pipeline-person-text">
                                <div class="pipeline-name">{{ row.fullName }}</div>
                                <div class="pipeline-handle">{{ row.handle }}</div>
                            </div>
                        </div>
                    </td>
                    <td class="pipeline-td pipeline-td--date">{{ row.date }}</td>
                    <td class="pipeline-td pipeline-td--num pipeline-num--emph">
                        {{ formatMoney(row.new) }}
                    </td>
                    <td class="pipeline-td pipeline-td--num">{{ formatMoney(row.qualified) }}</td>
                    <td class="pipeline-td pipeline-td--num">{{ formatMoney(row.proposition) }}</td>
                    <td class="pipeline-td pipeline-td--num">{{ formatMoney(row.negotiation) }}</td>
                    <td class="pipeline-td pipeline-td--num pipeline-td--won-cell">
                        <div class="pipeline-won-stack">
                            <span class="pipeline-num--won">{{ formatMoney(row.won) }}</span>
                            <span class="pipeline-won-track" aria-hidden="true">
                                <span
                                    class="pipeline-won-fill"
                                    :style="{ width: `${wonShare(row)}%` }"
                                />
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.pipeline-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.pipeline-table-wrap {
    /* Table only — no extra layout chrome */
    border-radius: 10px;
    border: 1px solid var(--c-border-default, #e7e8ee);
    background: linear-gradient(
        180deg,
        oklch(99.2% 0.004 250) 0%,
        oklch(100% 0 0) 18%,
        oklch(100% 0 0) 100%
    );
    box-shadow:
        0 1px 0 oklch(100% 0 0 / 0.65) inset,
        0 12px 28px oklch(20% 0.02 250 / 0.05);
    overflow: hidden;
}

.pipeline-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
    font-family:
        'Inter',
        system-ui,
        -apple-system,
        'Segoe UI',
        Roboto,
        sans-serif;
    font-size: 14px;
    color: var(--c-text-primary, #1a1c22);
}

.pipeline-th {
    text-align: left;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.01em;
    color: var(--c-text-primary, #1a1c22);
    background: linear-gradient(
        180deg,
        oklch(96.5% 0.012 250) 0%,
        oklch(95.2% 0.014 250) 55%,
        oklch(94.8% 0.012 250) 100%
    );
    border-bottom: 1px solid var(--c-border-light, #eef3f9);
    box-shadow: 0 1px 0 oklch(100% 0 0 / 0.55) inset;
    padding: 0;
    vertical-align: middle;
    white-space: nowrap;
}

.pipeline-th:first-child {
    width: 44px;
    padding-inline-start: 16px;
    border-start-start-radius: 9px;
}

.pipeline-th:last-child {
    border-start-end-radius: 9px;
    padding-inline-end: 16px;
}

.pipeline-th-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    margin: 0;
    padding: 14px 16px;
    border: none;
    background: transparent;
    font: inherit;
    font-weight: 600;
    color: inherit;
    cursor: default;
    text-align: left;
}

.pipeline-th--check .pipeline-th-btn,
.pipeline-th--check {
    padding: 0;
}

.pipeline-th--name {
    width: 26%;
}

.pipeline-sort {
    font-size: 11px;
    opacity: 0.55;
    font-weight: 600;
}

.pipeline-th--num .pipeline-th-btn {
    justify-content: flex-start;
}

.pipeline-td {
    padding: 14px 16px;
    vertical-align: middle;
    border-bottom: 1px solid #eef3f9;
    background: var(--c-white, #fff);
    transition: background-color 0.15s ease;
}

.pipeline-tr:last-child .pipeline-td {
    border-bottom: none;
}

.pipeline-tr:hover .pipeline-td {
    background: linear-gradient(90deg, oklch(99.4% 0.006 250) 0%, #fff 38%);
}

.pipeline-tr--selected .pipeline-td {
    background: linear-gradient(
        90deg,
        color-mix(in srgb, var(--c-app-theme, #2d6ae0) 7%, #fff) 0%,
        #fff 42%
    );
    box-shadow: inset 3px 0 0 var(--c-app-theme, #2d6ae0);
}

.pipeline-td--check {
    width: 44px;
    padding-inline-start: 16px;
    vertical-align: middle;
}

.pipeline-td--person {
    min-width: 0;
}

.pipeline-person {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}

.pipeline-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    box-shadow: 0 0 0 1px oklch(0% 0 0 / 0.06);
}

/* Same bundled photo, slight per-row tint so rows stay distinct (optional) */
.pipeline-avatar--t0 {
    filter: hue-rotate(0deg) saturate(1.06);
}
.pipeline-avatar--t1 {
    filter: hue-rotate(-14deg) saturate(1.08);
}
.pipeline-avatar--t2 {
    filter: hue-rotate(22deg) saturate(1.05);
}
.pipeline-avatar--t3 {
    filter: hue-rotate(-28deg) saturate(1.07);
}
.pipeline-avatar--t4 {
    filter: hue-rotate(35deg) saturate(1.04);
}
.pipeline-avatar--t5 {
    filter: hue-rotate(-8deg) saturate(1.09);
}
.pipeline-avatar--t6 {
    filter: hue-rotate(18deg) saturate(1.06);
}
.pipeline-avatar--t7 {
    filter: hue-rotate(-22deg) saturate(1.05);
}

.pipeline-name {
    font-weight: 700;
    font-size: 14px;
    line-height: 1.25;
    color: var(--c-text-primary, #1a1c22);
}

.pipeline-handle {
    font-size: 12px;
    line-height: 1.3;
    color: var(--c-text-secondary, #808290);
    margin-top: 2px;
}

.pipeline-td--date {
    color: var(--c-text-secondary, #666875);
    font-size: 13px;
}

.pipeline-td--num {
    font-variant-numeric: tabular-nums;
    font-size: 14px;
    color: var(--c-text-primary, #1a1c22);
}

.pipeline-num--emph {
    font-weight: 700;
}

.pipeline-num--won {
    font-weight: 700;
    display: block;
}

.pipeline-won-stack {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
}

.pipeline-won-track {
    display: block;
    width: 100%;
    max-width: 120px;
    height: 4px;
    border-radius: 999px;
    background: oklch(94% 0.01 250);
    overflow: hidden;
}

.pipeline-won-fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
        90deg,
        color-mix(in srgb, var(--c-app-theme, #2d6ae0) 55%, transparent),
        color-mix(in srgb, var(--c-app-theme, #2d6ae0) 95%, #fff)
    );
    transition: width 0.35s ease;
}

/* Custom checkboxes */
.pipeline-cb {
    appearance: none;
    width: 18px;
    height: 18px;
    margin: 0;
    border: 1.5px solid var(--c-gray-75, #bfc2d0);
    border-radius: 5px;
    background: var(--c-white, #fff);
    cursor: pointer;
    vertical-align: middle;
    transition:
        border-color 0.15s ease,
        background 0.15s ease,
        box-shadow 0.15s ease;
}

.pipeline-cb:hover {
    border-color: color-mix(in srgb, var(--c-app-theme, #2d6ae0) 45%, var(--c-gray-75));
}

.pipeline-cb:checked {
    background: var(--c-app-theme, #2d6ae0);
    border-color: var(--c-app-theme, #2d6ae0);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M3.5 8.5L6.5 11.5L12.5 4.5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 12px;
}

.pipeline-cb:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--c-app-theme, #2d6ae0) 55%, transparent);
    outline-offset: 2px;
}
</style>
