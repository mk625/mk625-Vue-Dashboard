
<script setup>

</script>


<template>
    <button class="module-nav-btn">
        <i class="bi bi-x-lg"></i>
    </button>
</template>


<style scoped lang="scss">
    .module-nav-btn {
        @include btn-reset;

        display: inline-flex;
        align-items: center;
        justify-self: center;
        width: 16px;
        height: 16px;
        color: var(--c-gray-60);
        position: relative;
        z-index: 0;
        transition: var(--fast-trans), 0.1s ease-in-out transform;
        border-radius: 50%;
    }
    .module-nav-btn:hover {
        color: var(--c-gray-10);
    }
    .module-nav-btn::before {
        content: '';
        width: calc(100% + 6px);
        height: calc(100% + 6px);
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        translate: -50% -50%;
        scale: 0.6;
        z-index: -1;
        transition: var(--fast-trans);
    }
    .module-nav-btn:hover::before {
        scale: 1;
        background-color: var(--c-gray-95);
    }
</style>
