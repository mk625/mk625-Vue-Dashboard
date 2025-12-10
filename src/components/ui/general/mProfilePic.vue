<script setup>

defineProps({
    src: {
        type: String,
        default: ''
    },
    size: {
        type: [String, Number],
        default: 48
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: ''
    },
    statusColor: {
        type: String,
        default: 'var(--green)'
    },
    tag: {
        type: String,
        default: 'button',
        validator: value => ['button', 'span'].includes(value)
    },
    className: {
        type: String,
        default: 's32'
    }
});

</script>


<template>
    <component :is="tag" :class="['m-profile-pic', className]">
        <img
            v-if="src"
            :src="src"
            alt="Profile Picture"
            class="m-profile-pic__image"
        />

        <span
            v-else-if="initials"
            class="m-profile-pic__fallback"
            :class="`m-profile-pic__fallback--${fallbackBgClass}`"
        >
            {{ initials }}
        </span>

        <span v-else class="m-profile-pic__default">

        </span>

        <span
            v-if="isOnline"
            class="m-profile-pic__status"
            :style="{ '--status-color': statusColor }"
        ></span>
    </component>
</template>


<style scoped>
    .m-profile-pic {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        background-color: var(--c-gray-80);
        flex-shrink: 0;
        border: none;
    }

    .m-profile-pic__image {
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .m-profile-pic__fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: var(--c-white);
        font-weight: 600;
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .m-profile-pic__default {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: var(--c-gray-50);
        background-color: var(--c-gray-96);
    }

    .m-profile-pic__status {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 12px;
        height: 12px;
        background-color: var(--status-color, var(--green));
        border-radius: 50%;
        border: 2px solid var(--c-white);
        transform: translate(10%, 10%);
        z-index: 1;
    }
</style>
