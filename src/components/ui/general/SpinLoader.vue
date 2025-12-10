
<script setup>
    defineProps({
        size: {
            type: String,
            default: 'md',
            validator: value => ['sm', 'md', 'lg', 'xlg'].includes(value)
        }
    })

</script>


<template>
    <i :class="`spin-loader spin-loader-${size}`"></i>
</template>


<style scoped>
    @keyframes spinner-load { 
        to { transform: rotate(360deg); } 
    }

    .spin-loader {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid var(--c-gray-50);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spinner-load 0.8s linear infinite;
    }

    .spin-loader-sm {
        width: 16px;
        height: 16px;
        border-width: 1px;
    }

    .spin-loader-md {
        width: 20px;
        height: 20px;
        border-width: 2px;
    }

    .spin-loader-lg {
        width: 32px;
        height: 32px;
        border-width: 3px;
    }

    .spin-loader-xlg {
        width: 48px;
        height: 48px;
        border-width: 4px;
    }
</style>

