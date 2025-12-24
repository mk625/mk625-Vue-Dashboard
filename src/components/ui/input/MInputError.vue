
<script setup>
    // imports
        import { inject, computed } from 'vue';
    // \\\ imports

    // inject
        const inputGroupProps = inject('inputGroupProps', null);
    // \\\ inject

    // props (for standalone use)
    const props = defineProps({
        isError: {
            type: Boolean,
            default: false,
        },
        error_message: {
            type: String,
            default: 'This field is required',
        },
    });
    // \\\ props

    // computed (use injected values or props)
        const isErrorValue = computed(() => inputGroupProps?.error?.value ?? props.isError);
        const errorMessage = computed(() => props.error_message);
    // \\\ computed
</script>


<template>
    <div v-if="isErrorValue" class="input-error">
        <p class="input-error__text">{{ errorMessage }}</p>
    </div>
</template>


<style scoped>
    .input-error {
        margin-top: 4px;
    }

    .input-error__text {
        display: inline-block;
        font-size: 12px;
        color: var(--c-status__red);
    }
</style>

