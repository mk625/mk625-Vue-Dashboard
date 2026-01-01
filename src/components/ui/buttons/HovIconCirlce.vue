
<script setup>
    // imports
        import PlainButton from './PlainButton.vue';
    // \\\ imports
</script>


<template>
    <PlainButton class="hov-icon-circle">
        <i class="bi bi-x-lg f16"></i>
    </PlainButton>
</template>


<style scoped lang="scss">
    .hov-icon-circle {
        @include btn-reset;
        @include Inflex-AI-JC;

        width: 28px;
        height: 28px;
        color: var(--c-gray-50);
        border-radius: 50%;
        position: relative;
        z-index: 0;
        transition: var(--fast-trans);
    }
    .hov-icon-circle:hover {
        color: var(--c-gray-10);
    }
    .hov-icon-circle::before {
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 50%;
        @include pos-abs-xy-center;
        scale: 0.5;
        z-index: -1;
        transition: var(--fast-trans);
    }
    .hov-icon-circle:hover::before {
        scale: 1.15;
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
