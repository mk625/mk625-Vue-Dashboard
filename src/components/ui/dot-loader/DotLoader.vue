
<script setup>
    defineProps({
        isLoading: {
            type: Boolean,
            default: false
        }
    })
</script>


<template>
    <div v-if="isLoading" class="dot-loader-lists">
        <span class="dot-loader-design"></span>
        <span class="dot-loader-design"></span>
        <span class="dot-loader-design"></span>
    </div>
</template>


<style scoped>
    .dot-loader-lists {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    .dot-loader-design {
        display: inline-block;
        width: 8px;
        height: 8px;
        border: 2px solid var(--c-gray-30);
        border-radius: 50%;
        transform: scale(0);
        opacity: 0;
        animation: dot-loader 1s ease infinite;
    }
    .dot-loader-design:nth-child(2) {
        animation-delay: 0.2s;
    }
    .dot-loader-design:nth-child(3) {
        animation-delay: 0.4s;
    }
    @keyframes dot-loader {
        50% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>
