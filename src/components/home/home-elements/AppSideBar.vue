<script setup>
    import { ref, onMounted } from 'vue'
    import Slide from '@/js/utils/ui/SlideToggle.js'
    import { fetchNavigationItems } from '@/js/services/navigationApi.js'

    const vSlide = Slide

    const activeNavItem = ref('dashboard')
    const expandedMenus = ref({
        employees: false
    })

    const navigationItems = ref([])

    const isLoading = ref(false)
    const error = ref(null)

    async function loadNavigationItems() {
        isLoading.value = true
        error.value = null

        try {
            const items = await fetchNavigationItems()
            navigationItems.value = items
            items.forEach(item => {
                if (item.hasChildren && !expandedMenus.value[item.id]) {
                    expandedMenus.value[item.id] = false
                }
            })
        } catch (err) {
            error.value = err.message || 'Failed to load navigation items'
            console.error('Error loading navigation:', err)
        } finally {
            isLoading.value = false
        }
    }

    function setActiveNav(itemKey, event) {
        if (event) {
            event.preventDefault()
        }
        activeNavItem.value = itemKey
    }

    function toggleMenu(menuKey, event) {
        event.preventDefault()
        expandedMenus.value[menuKey] = !expandedMenus.value[menuKey]
    }

    onMounted(() => {
        loadNavigationItems()
    })
</script>


<template>
    <aside class="app-sidebar">
        <!-- logo -->
            <div class="app-sidebar__logo-container">
                <div class="app-sidebar__logo">
                    <img class="app-sidebar__logo-img" src="../../../assets/images/logo/" alt="MK logo">
                    <h4 class="app-sidebar__company-name">MK Corp</h4>
                </div>
            </div>
        <!-- \\\ logo -->


        <!-- nav lists -->
            <nav class="app-sidebar__nav">
                <ul class="app-sidebar__nav-lists">
                    <li
                        v-for="item in navigationItems"
                        :key="item.id"
                        class="app-sidebar__nav-list"
                    >
                        <button
                            v-if="item.hasChildren"
                            class="app-sidebar__nav-link plain-btn w100pe"
                            @click="toggleMenu(item.id, $event)"
                        >
                            <div class="app-sidebar__nav-content">
                                <i :class="`${item.icon} app-sidebar__nav-list-icon`"></i>
                                <span class="app-sidebar__nav-text">{{ item.label }}</span>
                            </div>
                            <div class="app-sidebar__nav-arrow-icon-container">
                                <i class="bi-chevron-down app-sidebar__nav-icon"></i>
                            </div>
                        </button>

                        <RouterLink
                            v-else
                            :to="item.path"
                            class="app-sidebar__nav-link"
                            @click="setActiveNav(item.id, $event)"
                        >
                            <div class="app-sidebar__nav-content">
                                <i :class="`${item.icon} app-sidebar__nav-list-icon`"></i>
                                <span class="app-sidebar__nav-text">{{ item.label }}</span>
                            </div>
                        </RouterLink>

                        <!-- sub links -->
                            <ul v-if="item.hasChildren" v-slide="expandedMenus[item.id]" class="app-sidebar__sub-lists">
                                <li
                                    v-for="(child) in item.children"
                                    :key="child.id"
                                    class="app-sidebar__sub-list"
                                >
                                    <RouterLink
                                        :to="child.path"
                                        class="app-sidebar__nav-link app-sidebar__sub-link"
                                        @click="setActiveNav(child.id, $event)"
                                    >
                                        {{ child.label }}
                                    </RouterLink>
                                </li>
                            </ul>
                        <!-- sub links -->
                    </li>
                </ul>
            </nav>
        <!-- \\\ nav lists -->
    </aside>


</template>


<style scoped>
    .app-sidebar {
        /* variables */
            --h-app-sidebar-logo-container: 64px;
        /* \\\ variables */


        /* layout */
            width: var(--w-app-sidebar);
            display: flex;
            flex-direction: column;
            background-color: #f3f6f7;
            height: 100%;
            border-right: 1px solid #DDE1E8;
        /* \\\ layout */
    }

    .app-sidebar__logo-container {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        height: var(--h-app-sidebar-logo-container);
        padding-inline: 20px;
    }

    .app-sidebar__logo {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .app-sidebar__logo-img {
        width: 32px;
        height: 32px;
    }

    .app-sidebar__company-name {
        color: var(--c-gray-20);
        font-size: 16px;
    }

    .app-sidebar__nav {
        flex-grow: 1;
        overflow-y: auto;
        padding-block: 16px;
    }

    .app-sidebar__nav-lists {
        display: flex;
        gap: 4px;
        flex-direction: column;
        padding-inline: 12px;
    }

    .app-sidebar__nav-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        color: var(--c-gray-30);
        border-radius: 6px;
        transition: var(--fast-trans);
    }

    .app-sidebar__nav-link:hover {
        background-color: #e0ebeb;
    }

    .app-sidebar__nav-link.router-link-exact-active {
        background-color: #dbe8e9;
        color: #136e8c;
    }

    .app-sidebar__nav-list-icon {
        font-size: 18px;
    }

    .app-sidebar__nav-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }

    .app-sidebar__nav-text {
        flex: 1;
    }

    .app-sidebar__nav-arrow-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        color: var(--c-gray-50);
        transition: transform 0.3s ease;
    }

    .app-sidebar__nav-list--expanded .app-sidebar__nav-arrow-icon-container {
        transform: rotate(180deg);
    }

    .app-sidebar__sub-lists {
        display: flex;
        flex-direction: column;
        gap: 2px;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        overflow: hidden;
        margin-top: 4px;
    }

    .app-sidebar__sub-link {
        padding-inline-start: 40px;
    }
</style>
