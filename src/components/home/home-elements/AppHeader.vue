<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { fetchNavigationItems } from '@/js/services/navigationApi.js';
    import profilePic from '@/assets/images/general/profile-pic.jpg';
    import PlainButton from '@/components/ui/buttons/PlainButton.vue';
    import MInput from '@/components/ui/input/MInput.vue';
    import MProfilePic from '@/components/ui/general/mProfilePic.vue';
    import MDropdown from '@/components/ui/popup/toast/dropdown/MDropdown.vue';

    const route = useRoute();
    const navigationItems = ref([]);
    const fileInputRef = ref(null);
    const currentProfilePic = ref(profilePic);

    const profilePhotoItems = [
        { label: 'Add photo', value: 'add-photo', icon: 'bi-image' },
        { label: 'Remove photo', value: 'remove-photo', icon: 'bi-trash', danger: true }
    ];

    function onProfilePhotoSelect(item) {
        if (item.value === 'add-photo') {
            fileInputRef.value?.click();
        } else if (item.value === 'remove-photo') {
            currentProfilePic.value = '';
            if (fileInputRef.value) fileInputRef.value.value = '';
        }
    }

    function onProfilePhotoChange(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        currentProfilePic.value = URL.createObjectURL(file);
    }

    const pageTitle = computed(() => {
        const currentPath = route.path;

        const allItems = navigationItems.value.flatMap(item => [
            item,
            ...(item.children || [])
        ]);

        const matchedItem = allItems.find(item => item.path === currentPath);
        return matchedItem?.label || 'Dashboard';
    });

    onMounted(async () => {
        try {
            navigationItems.value = await fetchNavigationItems();
        } catch (error) {
            console.error('Error loading navigation for header:', error);
        }
    });
</script>


<template>
    <header class="app-header">
        <div class="h100pe d-flx aI-C jC-SB h100">
            <div>
                <div>
                    <h2>{{ pageTitle }}</h2>
                </div>
            </div>

            <div class="d-flx aI-C g-15">
                <!-- input -->
                <MInput placeholder="Search..." type="search"/>
                <!-- \\\ input -->

                <!-- app actions -->
                    <ul class="d-flx aI-C g-8">
                        <li>
                            <PlainButton class="app-header__action-btn">
                                <i class="bi-bell muse-icon s16"></i>
                            </PlainButton>
                        </li>
                        <li>
                            <PlainButton class="app-header__action-btn">
                                <i class="bi-gear muse-icon s16"></i>
                            </PlainButton>
                        </li>
                    </ul>
                <!-- \\\ app actions -->

                <!-- profile picture -->
                    <input
                        ref="fileInputRef"
                        type="file"
                        accept="image/*"
                        hidden
                        @change="onProfilePhotoChange"
                    />

                    <MDropdown
                        :items="profilePhotoItems"
                        @select="onProfilePhotoSelect"
                    >
                        <template #trigger="{ toggle }">
                            <MProfilePic
                                :src="currentProfilePic"
                                @click="toggle"
                            />
                        </template>
                    </MDropdown>
                <!-- \\\ profile picture -->
            </div>
        </div>
    </header>
</template>


<style scoped lang="scss">
    .app-header {
        height: var(--h-app-header);
        padding-inline: 24px;
    }
    .app-header__action-btn {
        @include flex-AI-JC;
        width: 28px;
        height: 28px;
        color: var(--c-gray-50);
        border-radius: 4px;
        transition: var(--fast-trans);
    }
    .app-header__action-btn:hover,
    .app-header__action-btn:focus {
        background-color: var(--c-gray-90);
        color: var(--c-gray-10);
    }
</style>
