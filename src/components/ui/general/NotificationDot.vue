
<script setup>
    defineProps({
        visible: {
            type: Boolean,
            default: true,
        },
        size: {
            type: String,
            default: 'default',
            validator: value => ['small', 'default', 'large'].includes(value),
        },
        position: {
            type: String,
            default: 'top-right',
            validator: value => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value),
        },
        color: {
            type: String,
            default: 'var(--c-status__red)',
        },
        label: {
            type: String,
            default: 'New notification',
        },
    })
</script>


<template>
    <span class="notification-dot">
        <slot />
        <span
            v-if="visible"
            class="notification-dot__indicator"
            :class="[
                `notification-dot__indicator--${size}`,
                `notification-dot__${position}`,
            ]"
            :style="{ '--notification-dot-color': color }"
            :role="label ? 'img' : undefined"
            :aria-label="label || undefined"
            :aria-hidden="label ? undefined : 'true'"
        ></span>
    </span>
</template>


<style scoped lang="scss">
    .notification-dot {
        display: inline-flex;
        position: relative;
    }

    .notification-dot__indicator {
        display: block;
        width: 8px;
        height: 8px;
        background-color: var(--notification-dot-color);
        border: 2px solid var(--c-white);
        border-radius: 50%;
        box-shadow: 0 0 0 1px var(--notification-dot-color);
        pointer-events: none;
        position: absolute;
        z-index: 1;
    }

    .notification-dot__indicator--small {
        width: 6px;
        height: 6px;
    }

    .notification-dot__indicator--large {
        width: 10px;
        height: 10px;
    }

    .notification-dot__top-right {
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
    }

    .notification-dot__top-left {
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }

    .notification-dot__bottom-right {
        right: 0;
        bottom: 0;
        transform: translate(50%, 50%);
    }

    .notification-dot__bottom-left {
        bottom: 0;
        left: 0;
        transform: translate(-50%, 50%);
    }
</style>
