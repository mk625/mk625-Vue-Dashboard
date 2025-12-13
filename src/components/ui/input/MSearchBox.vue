
<script setup>
    import MInput from './MInput.vue';
    import NavButton from '../buttons/NavButton.vue';

</script>


<template>
    <div class="input-box">
        <div class="d-flx aI-C g-8 h100pe">
            <i class="bi bi-search"></i>
            <MInput class="fG-1"/>
            <NavButton/>
        </div>
    </div>
</template>


<style scoped>
    .input-box {
        max-width: 250px;
        width: 100%;
        height: var(--h-input);
        padding-inline: 12px;
        border-radius: var(--br-radius-input);
        border: 1px solid var(--c-input-br);
        transition: var(--default-trans);
    }
    .input-box:hover {
        border-color: var(--c-gray-80);
        box-shadow: var(--input-box-shad-hov);
    }
    .input-box:focus-within {
        border-color: var(--c-input-br-foc);
        box-shadow: var(--input-box-shad-foc);
    }
</style>
