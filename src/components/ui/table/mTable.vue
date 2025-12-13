
<script setup>
    defineProps ({
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
        }
    })
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
                        <span>
                            {{ column.label }}
                        </span>
                    </div>
                </th>
            </tr>
        </thead>

        <tbody>
            <template v-if="loading">
                <tr v-for="n in 4" :key="n">
                    <td>
                        <div> <span class="sk-table-td"></span> </div>
                    </td>
                    <td>
                        <div> <span class="sk-table-td"></span> </div>
                    </td>
                    <td>
                        <div> <span class="sk-table-td"></span> </div>
                    </td>
                    <td>
                        <div> <span class="sk-table-td"></span> </div>
                    </td>
                </tr>
            </template>

            <tr
                v-else-if="!loading"
                v-for="row in rows"
                :key="row.id"
            >
                <td
                    v-for="col in columns"
                    :key="col.key"
                    >
                    {{ row[col.key] || '-' }}
                </td>
            </tr>

            <!-- <tr v-else-if="rows.length===0" style="display: none;">
                <td colspan="4">
                    <div class="txt-a-center">
                        <p class="text-secondary">No results found</p>
                    </div>
                </td>
            </tr> -->
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
        width: 90%;
        height: 6px;
        background: linear-gradient( 90deg, var(--c-gray-90) 25%, var(--c-gray-95) 37%, var(--c-gray-90) 63%);
        background-size: 400% 100%;
        border-radius: 8px;
        animation: sk-animation 1.4s ease infinite;
    }
</style>
