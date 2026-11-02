<script setup>
    import { closeToast, pauseToast, resumeToast, toasts } from '@/js/utils/ui/mToast.js'

    const TYPE_ICONS = {
        success: 'bi bi-check-circle-fill',
        warning: 'bi bi-exclamation-circle-fill',
        info: 'bi bi-info-circle-fill',
        error: 'bi bi-x-circle-fill',
    }

    const TYPE_SHADES = {
        success: 'c-status-shades__green',
        warning: 'c-status-shades__orange',
        info: 'c-status-shades__blue',
        error: 'c-status-shades__red',
    }

    function toastRole(type) {
        return type === 'error' || type === 'warning' ? 'alert' : 'status'
    }
</script>

<template>
    <Teleport to="body">
        <TransitionGroup
            tag="div"
            name="m-toast"
            class="m-toast-host"
            :role="toasts.length ? 'region' : undefined"
            :aria-label="toasts.length ? 'Messages' : undefined"
        >
            <div
                v-for="toast in toasts"
                :key="toast.id"
                class="m-toast"
                :class="[TYPE_SHADES[toast.type], `m-toast--${toast.type}`]"
                :role="toastRole(toast.type)"
                @mouseenter="pauseToast(toast.id)"
                @mouseleave="resumeToast(toast.id)"
            >
                <i
                    class="m-toast__icon"
                    :class="TYPE_ICONS[toast.type]"
                    aria-hidden="true"
                ></i>
                <p class="m-toast__message">{{ toast.message }}</p>
                <button
                    v-if="toast.showClose"
                    type="button"
                    class="m-toast__close"
                    aria-label="Close message"
                    @click="closeToast(toast.id)"
                >
                    <i class="bi bi-x-lg" aria-hidden="true"></i>
                </button>
            </div>
        </TransitionGroup>
    </Teleport>
</template>

<style scoped lang="scss">
    .m-toast-host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        width: max-content;
        max-width: calc(100% - 32px);
        position: fixed;
        top: 16px;
        left: 50%;
        z-index: 2000;
        translate: -50% 0;
        pointer-events: none;
    }

    .m-toast {
        display: flex;
        align-items: center;
        gap: 8px;
        width: max-content;
        max-width: min(420px, 100%);
        padding: 11px 15px;
        background-color: var(--c-status__98);
        font-size: 14px;
        line-height: 1.4;
        color: var(--c-status__20);
        border: 1px solid var(--c-status__90);
        border-radius: 8px;
        box-shadow: var(--c-shadow);
        pointer-events: auto;
    }

    .m-toast__icon {
        display: flex;
        flex-shrink: 0;
        font-size: 16px;
        line-height: 1;
        color: var(--c-status);
    }

    .m-toast__message {
        margin: 0;
        overflow-wrap: anywhere;
    }

    .m-toast__close {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        padding: 0;
        background-color: transparent;
        font-size: 12px;
        line-height: 1;
        color: inherit;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .m-toast__close:hover {
        background-color: var(--c-status__95);
    }

    .m-toast__close:focus-visible {
        background-color: var(--c-status__95);
        outline: 2px solid var(--c-status);
        outline-offset: 1px;
    }

    .m-toast-enter-active,
    .m-toast-leave-active,
    .m-toast-move {
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .m-toast-enter-from,
    .m-toast-leave-to {
        opacity: 0;
        transform: translateY(-8px);
    }

    .m-toast-leave-active {
        position: absolute;
        left: 50%;
        translate: -50% 0;
    }

    @media (prefers-reduced-motion: reduce) {
        .m-toast-enter-active,
        .m-toast-leave-active,
        .m-toast-move {
            transition: none;
        }
    }
</style>
