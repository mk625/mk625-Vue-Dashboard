
<script setup>
    import PlainButton from './PlainButton.vue';
</script>


<template>
    <PlainButton class="hov-icon-circle">
        <i class="bi bi-x-lg"></i>
    </PlainButton>
</template>


<style scoped>
    .hov-icon-circle {
        border: none;
        outline: none;
        background: none;
        display: inline-block;
        padding: 10px;
        position: relative;
        z-index: 0;
        color: var(--c-gray-60);
        transition: var(--fast-trans), 0.1s ease-in-out transform;
        border-radius: 50%;
    }
    .hov-icon-circle:hover {
        color: var(--c-gray-10);
    }
    .hov-icon-circle::before {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        content: '';
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0.6);
        z-index: -1;
        transition: var(--fast-trans);
    }
    .hov-icon-circle:hover::before {
        transform: translate(-50%, -50%) scale(1);
        background-color: #EFF1F6;
    }

    /* variations */
        .hov-icon-circle.red-icon {
            color: var(--c-status-red);
        }
        .hov-icon-circle.red-icon:hover::before {
            background-color: #f6efef;
        }
    /* \\\ variations */
</style>
