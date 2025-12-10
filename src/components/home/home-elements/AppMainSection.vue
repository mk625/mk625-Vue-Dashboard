
<script setup>
    import { RouterView } from 'vue-router'
</script>

<template>
    <main class="app-main-section">
        <RouterView />
    </main>
</template>

<style>
    .app-main-section {
        height: calc(100vh - var(--h-app-header));
        padding: 20px;
        overflow-y: auto;
    }
</style>

