
<script setup>
    // props (for standalone use)
        defineProps({
            label_name: {
                type: String,
                default: '',
            },
            html_for: {
                type: String,
                default: '',
            },
        });
    // \\\ props
</script>


<template>
    <div>
        <label class="input-label" :for="html_for || undefined">
            <span class="input-label__text">{{ label_name }}</span>
        </label>
    </div>
</template>


<style scoped>
    .input-label {
        display: block;
        font-weight: var(--fw-medium);
    }
    .input-label__text {
        display: inline-block;
    }
</style>

