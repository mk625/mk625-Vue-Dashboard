
<script setup>
    defineProps({
        isError: {
            type: Boolean,
            default: false,
        },
        error_message: {
            type: String,
            default: 'This field is required',
        },
    })
</script>


<template>
    <p v-if="isError" class="input-error">
        <span class="input-error__text">{{ error_message }}</span>
    </p>
</template>


<style scoped>
    .input-error {
        display: block;
        margin-top: 4px;
        font-size: 12px;
        color: var(--c-status-red);
    }

    .input-error__text {
        display: inline-block;
    }
</style>

