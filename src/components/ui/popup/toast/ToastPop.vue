
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
        padding: 10px 15px;
        transform: translateX(-50%);
        background-color: var(--c-status-light);
        box-shadow: var(--c-shadow);
        border-radius: 8px;
        border: 1px solid var(--c-status-border);
    }
    .icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        background-color: var(--c-status-shade__50);
        border-radius: 50%;
    }
</style>
