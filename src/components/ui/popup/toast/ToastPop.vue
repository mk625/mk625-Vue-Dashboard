
<script setup>
    // imports
        import { watch, onBeforeUnmount } from 'vue';
    // \\\ imports

    // global variables
        let closeTimer = null;
        const emit = defineEmits(['update:show']);
    // \\\ global variables


    const props = defineProps({
        message: {
            type: String,
            required: true,
        },
        show: {
            type: Boolean,
            default: false,
        }
    });

    watch(() => props.show, (newVal) => {
        if (newVal) {
            if (closeTimer) {
                clearTimeout(closeTimer);
            }

            closeTimer = setTimeout(() => {
                emit('update:show', false);
            }, 2000);
        }
    });

    onBeforeUnmount(() => {
        if (closeTimer) {
            clearTimeout(closeTimer);
        }
    });
</script>


<template>
    <Teleport to="body">
        <Transition name="toast">
            <div v-if="show" class="toaster-container c-status-shades__green">
                <div class="d-flx aI-C g-10">
                    <div class="icon-box">
                        <i class="bi bi-check2 f20 c-status"></i>
                    </div>
                    <div class="fG-1">
                        <p> {{ message }} </p>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>


<style scoped>
    .toast-enter-from,
    .toast-leave-to {
        top: 10px;
        opacity: 0;
        visibility: hidden;
    }

    .toast-enter-to,
    .toast-leave-from {
        top: 30px;
        opacity: 1;
        visibility: visible;
    }

    .toast-enter-active,
    .toast-leave-active {
        transition: var(--fast-trans);
    }

    .toaster-container {
        padding-block: 8px;
        padding-inline: 12px 18px;
        background-color: var(--c-status__98);
        position: fixed;
        top: 30px;
        inset-inline-start: 50%;
        translate: -50% -15px;
        border: 1px solid var(--c-status__90);
        box-shadow: var(--c-shadow);
        border-radius: 8px;
        z-index: 10;
    }
    .icon-box {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: var(--c-status__95);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
