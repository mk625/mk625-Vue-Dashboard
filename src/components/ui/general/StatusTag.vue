
<script setup>
    defineProps({
        tag: {
            type: String,
            default: "span",
            validator: value => ['span', 'button'].includes(value)
        },
        variant: {
            type: String,
            default: 'green',
        },
    })
</script>


<template>
    <span class="status-tag" :class="`status-${variant}`">
        <span> <slot/> </span>
    </span>
</template>


<style scoped>
    .status-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 16px;
        padding-inline: 4px;
        font-size: 10px;
        text-transform: uppercase;
        color: var(--c-status);
        border: 1px solid var(--c-status);
        background-color: var(--c-status__light);
        border-radius: 2px;
    }
</style>
