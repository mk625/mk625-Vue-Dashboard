
<script setup>
    // imports
        import { inject, computed } from 'vue';
    // \\\ imports

    // inject
        const inputGroupProps = inject('inputGroupProps', null);
    // \\\ inject

    // props (for standalone use)
        const props = defineProps({
            field_name: {
                type: String,
                default: '',
            },
        });
    // \\\ props

    // computed (use injected value or prop)
        const fieldName = computed(() => inputGroupProps?.label_name?.value ?? props.field_name);
    // \\\ computed
</script>


<template>
    <label class="input-label">
        <span class="input-label__text">{{ fieldName }}</span>
    </label>
</template>


<style scoped>
    .input-label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        color: var(--c-black);
    }

    .input-label__text {
        display: inline-block;
    }
</style>

