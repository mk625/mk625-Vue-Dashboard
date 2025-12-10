
<script setup>
    defineProps({
        field_name: {
            type: String,
            default: '',
        },
    })
</script>


<template>
    <label class="input-label">
        <span class="input-label__text">{{ field_name }}</span>
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

