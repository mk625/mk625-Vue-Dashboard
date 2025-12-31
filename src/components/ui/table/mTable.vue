
<script setup>
    const props = defineProps ({
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
        }
    })

    function handleRowClick(row) {
        if (props.rowClick) {
            console.log(row);
            props.rowClick(row);
        }
    }
</script>


<template>
    <table class="m-table">
        <thead>
            <tr>
                <th
                    v-for="column in columns"
                    :key="column.key"
                    :class="[`${column.width}`]"
                    >
                    <div>
                        <slot
                            :name="`header-${column.key}`"
                            :column="column"
                            >
                            <span>
                                {{ column.label }}
                            </span>
                        </slot>
                    </div>
                </th>
            </tr>
        </thead>

        <tbody>
            <!-- skeleton -->
                <template v-if="loading">
                    <tr v-for="n in 4" :key="n">
                        <td>
                            <div>
                                <!-- data skeleton -->
                                    <span class="sk-table-td"></span>
                                <!-- /// data skeleton -->
                            </div>
                        </td>
                        <td>
                            <div>
                                <!-- data skeleton -->
                                    <span class="sk-table-td"></span>
                                <!-- /// data skeleton -->
                            </div>
                        </td>
                        <td>
                            <div>
                                <!-- data skeleton -->
                                    <span class="sk-table-td"></span>
                                <!-- /// data skeleton -->
                            </div>
                        </td>
                        <td>
                            <div>
                                <!-- data skeleton -->
                                    <span class="sk-table-td"></span>
                                <!-- /// data skeleton -->
                            </div>
                        </td>
                    </tr>
                </template>
            <!-- skeleton -->

            <!-- real data -->
                <tr
                    v-else-if="!loading && rows.length > 0"
                    v-for="row in rows"
                    :key="row.id"
                    @click="handleRowClick(row)"
                    :class="[(rowClick ? 'c-pointer' : ''), 'test-class test-class-2']"
                >
                    <td
                        v-for="col in columns"
                        :key="col.key"
                        >
                        <slot
                            :name="`cell-${col.key}`"
                            :row="row"
                            :column="col"
                            :value="row[col.key]"
                            >
                            {{ row[col.key] || '-' }}
                        </slot>
                    </td>
                </tr>
            <!-- \\\ real data -->

            <!-- no results -->
                <tr v-else-if="!loading && rows.length === 0">
                    <td :colspan="columns.length">
                        <div class="txt-a-center">
                            <p class="text-secondary">No results found</p>
                        </div>
                    </td>
                </tr>
            <!-- \\\ no results -->
        </tbody>
    </table>
</template>


<style scoped>
    .m-table {
        width: 100%;
        border: 1px solid var(--c-gray-93);
        border-spacing: 0;
        border-radius: 12px;
        overflow: hidden;
    }
    .m-table th {
        background-color: #f3f8f9;
        font-weight: var(--fw-sbold);
        white-space: nowrap;
    }
    .m-table th:first-child {
        border-start-start-radius: 11px;
    }
    .m-table th:last-child {
        border-start-end-radius: 11px;
    }
    .m-table th,
    .m-table td {
        padding: 14px 25px 14px;
        text-align: start;
        vertical-align: middle;
        transition: var(--fast-trans);
    }
    .m-table tr:not(:last-child) td {
        border-bottom: 1px solid #eef3f9;
    }
    .m-table tr:hover td {
        background-color: var(--c-gray-98);
    }

    @keyframes sk-animation {
        0% {
            background-position: 100% 0;
        }
        100% {
            background-position: -100% 0;
        }
    }

    .sk-table-td {
        display: inline-block;
        width: 50%;
        height: 6px;
        background: linear-gradient( 90deg, var(--c-gray-90) 25%, var(--c-gray-95) 37%, var(--c-gray-90) 63%);
        background-size: 400% 100%;
        border-radius: 8px;
        animation: sk-animation 1.4s ease infinite;
    }
</style>
