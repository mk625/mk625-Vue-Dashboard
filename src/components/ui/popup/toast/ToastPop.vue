
<script setup>
    defineProps({
        message: {
            type: String,
            required: true,
        }
    })
</script>


<template>
    <div class="toaster-container status-theme-green">
        <div class="d-flx aI-C g-10">
            <div class="icon-box">
                <i class="bi bi-check2 f20 c-status"></i>
            </div>
            <div class="fG-1">
                <p> {{ message }} </p>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .toaster-container {
        position: fixed;
        top: 20px;
        left: 50%;
        padding-block: 8px;
        padding-inline: 12px 18px;
        transform: translateX(-50%);
        background-color: var(--c-status-98);
        box-shadow: var(--c-shadow);
        border-radius: 8px;
        border: 1px solid var(--c-status-90);
    }
    .icon-box {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: var(--c-status-95);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
