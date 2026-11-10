<script setup>
    import { computed, ref } from 'vue';

    const props = defineProps({
        columns: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            default: true,
        },
        skCount: {
            type: Number,
            default: 5,
        },
        rowClick: {
            type: Function,
            default: null,
        },
        rowKey: {
            type: [String, Function],
            default: 'id',
        },
    });

    const emit = defineEmits(['sort-change']);
    const sortState = ref({ key: null, direction: null });

    const sortedRows = computed(() => {
        const { key, direction } = sortState.value;

        if (!key || !direction) {
            return props.rows;
        }

        const multiplier = direction === 'asc' ? 1 : -1;

        return props.rows
            .map((row, index) => ({ row, index }))
            .sort((a, b) => {
                const first = a.row[key];
                const second = b.row[key];

                if (first == null || second == null) {
                    if (first == null && second == null) {
                        return a.index - b.index;
                    }

                    return first == null ? 1 : -1;
                }

                const comparison =
                    typeof first === 'number' && typeof second === 'number'
                        ? first - second
                        : String(first).localeCompare(String(second), undefined, {
                                numeric: true,
                                sensitivity: 'base',
                            });

                return comparison === 0 ? a.index - b.index : comparison * multiplier;
            })
            .map(({ row }) => row);
    });

    function toggleSort(column) {
        if (!column.sortable) {
            return;
        }

        const isCurrentColumn = sortState.value.key === column.key;
        const direction = !isCurrentColumn
            ? 'asc' : sortState.value.direction === 'asc' ? 'desc' : sortState.value.direction === 'desc' ? null : 'asc';

        sortState.value = {
            key: direction ? column.key : null,
            direction,
        };
        emit('sort-change', { key: sortState.value.key, direction });
    }

    function getRowKey(row, index) {
        return typeof props.rowKey === 'function' ? props.rowKey(row) : (row[props.rowKey] ?? index);
    }

    function handleRowClick(row) {
        props.rowClick?.(row);
    }

    function handleRowKeydown(event, row) {
        if (event.target !== event.currentTarget || !['Enter', ' '].includes(event.key)) {
            return;
        }

        event.preventDefault();
        handleRowClick(row);
    }
</script>

<template>
    <div class="m-table">
        <div class="m-table__scroll" tabindex="0" aria-label="Scrollable table">
            <table class="m-table__table" :aria-busy="loading">
                <thead class="m-table__head">
                    <tr class="m-table__row m-table__row--head">
                        <th
                            v-for="column in columns"
                            :key="column.key"
                            class="m-table__header"
                            :class="column.width"
                            :aria-sort="
                                sortState.key === column.key
                                    ? sortState.direction === 'asc'
                                        ? 'ascending'
                                        : 'descending'
                                    : undefined
                            "
                            scope="col"
                        >
                            <slot :name="`header-${column.key}`" :column="column">
                                <button
                                    v-if="column.sortable"
                                    class="m-table__sort-button"
                                    type="button"
                                    :aria-label="`Sort by ${column.label}`"
                                    @click="toggleSort(column)"
                                >
                                    <span>{{ column.label }}</span>
                                    <span class="m-table__sort-indicator" aria-hidden="true">
                                        {{
                                            sortState.key === column.key
                                                ? sortState.direction === 'asc'
                                                    ? '↑'
                                                    : sortState.direction === 'desc'
                                                        ? '↓'
                                                        : '↕'
                                                : '↕'
                                        }}
                                    </span>
                                </button>
                                <span v-else>{{ column.label }}</span>
                            </slot>
                        </th>
                    </tr>
                </thead>

                <tbody class="m-table__body">
                    <template v-if="loading">
                        <tr v-for="rowIndex in skCount" :key="rowIndex" class="m-table__row">
                            <td
                                v-for="column in columns"
                                :key="column.key"
                                class="m-table__cell m-table__cell--skeleton"
                            >
                                <span class="m-table__skeleton" aria-hidden="true"></span>
                            </td>
                        </tr>
                    </template>

                    <template v-else-if="sortedRows.length">
                        <tr
                            v-for="(row, rowIndex) in sortedRows"
                            :key="getRowKey(row, rowIndex)"
                            class="m-table__row"
                            :class="{ 'm-table__row--clickable': rowClick }"
                            :tabindex="rowClick ? 0 : undefined"
                            @click="handleRowClick(row)"
                            @keydown="handleRowKeydown($event, row)"
                        >
                            <td
                                v-for="column in columns"
                                :key="column.key"
                                class="m-table__cell"
                            >
                                <slot
                                    :name="`cell-${column.key}`"
                                    :row="row"
                                    :column="column"
                                    :value="row[column.key]"
                                >
                                    {{ row[column.key] ?? '-' }}
                                </slot>
                            </td>
                        </tr>
                    </template>

                    <tr v-else class="m-table__row m-table__row--empty">
                        <td class="m-table__cell m-table__empty-cell" :colspan="columns.length">
                            <slot name="empty">
                                <p>No results found</p>
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .m-table {
        width: 100%;
        border: 1px solid var(--c-gray-93, #e5e7eb);
        border-radius: 12px;
        background-color: var(--c-white, #fff);
    }

    .m-table__scroll {
        overflow-x: auto;
        border-radius: inherit;
        outline-offset: 3px;
    }

    .m-table__table {
        width: 100%;
        border-spacing: 0;
        text-align: start;
    }

    .m-table__header,
    .m-table__cell {
        padding: 14px 20px;
        text-align: start;
        vertical-align: middle;
        white-space: nowrap;
    }

    .m-table__header {
        background-color: var(--c-app-theme__shade-80, #f3f5f8);
        color: var(--c-text-primary, #24252b);
        font-weight: var(--fw-sbold, 600);
    }

    .m-table__row--head .m-table__header:first-child {
        border-start-start-radius: 11px;
    }

    .m-table__row--head .m-table__header:last-child {
        border-start-end-radius: 11px;
    }

    .m-table__row:not(:last-child) .m-table__cell {
        border-bottom: 1px solid var(--c-border-default, #eef0f3);
    }

    .m-table__body .m-table__row:not(.m-table__row--empty):hover .m-table__cell {
        background-color: var(--c-app-theme__shade-90, #f8f9fb);
    }

    .m-table__row--clickable {
        cursor: pointer;
    }

    .m-table__row--clickable:focus-visible .m-table__cell {
        outline: 2px solid var(--c-app-theme, #4f46e5);
        outline-offset: -2px;
    }

    .m-table__sort-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 0;
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        text-align: inherit;
        cursor: pointer;
    }

    .m-table__sort-button:focus-visible {
        border-radius: 3px;
        outline: 2px solid var(--c-app-theme, #4f46e5);
        outline-offset: 3px;
    }

    .m-table__sort-indicator {
        color: var(--c-text-secondary, #777984);
        font-size: 12px;
    }

    .m-table__empty-cell {
        padding: 36px 20px;
        color: var(--c-text-secondary, #777984);
        text-align: center;
    }

    .m-table__skeleton {
        display: block;
        width: min(100%, 150px);
        height: 8px;
        border-radius: 8px;
        background: linear-gradient(
            90deg,
            var(--c-skeleton-darker, #e5e7eb) 25%,
            var(--c-skeleton-lighter, #f3f4f6) 37%,
            var(--c-skeleton-darker, #e5e7eb) 63%
        );
        background-size: 400% 100%;
        animation: m-table-skeleton 1.4s ease infinite;
    }

    @keyframes m-table-skeleton {
        from {
            background-position: 100% 0;
        }

        to {
            background-position: -100% 0;
        }
    }

    @media (max-width: 640px) {
        .m-table__header,
        .m-table__cell {
            padding: 12px 14px;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .m-table__skeleton {
            animation: none;
        }
    }
</style>
