<script setup>
    import AppHeader from './home-elements/AppHeader.vue'
    import AppSideBar from './home-elements/AppSideBar.vue'
    import AppMainSection from './home-elements/AppMainSection.vue'
</script>


<template>
    <div class="app-container">
        <AppSideBar />
        <div class="app-home__main-section">
            <AppHeader />
            <AppMainSection />
        </div>
    </div>
</template>


<style scoped>
    .app-container {
        display: flex;
        width: 100vw;
        height: 100vh;
        position: fixed;
        inset: 0;
        z-index: 1;
    }
    .app-home__main-section {
        flex-grow: 1;
        height: 100%;
        background-color: var(--c-white);
    }
</style>
