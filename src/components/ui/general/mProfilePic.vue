<script setup>
    import { computed, ref, useSlots, watch } from 'vue'
    import {
        formatBadgeValue,
        getInitials,
        pickAvatarVariant,
        resolveAvatarSize
    } from '@/js/utils/ui/avatar.js'

    /**
     * MProfilePic - avatar component (API modelled on Element Plus `el-avatar`,
     * plus status / badge / initials / loading from modern avatar libraries).
     *
     * Fallback order: image -> default slot -> icon -> initials (name) -> person icon
     */

    const STATUS_LABELS = {
        online: 'Online',
        away: 'Away',
        busy: 'Busy',
        offline: 'Offline'
    }

    const props = defineProps({
        /* image */
        src: {
            type: String,
            default: ''
        },
        srcSet: {
            type: String,
            default: ''
        },
        alt: {
            type: String,
            default: ''
        },
        fit: {
            type: String,
            default: 'cover',
            validator: value => ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(value)
        },
        lazy: {
            type: Boolean,
            default: false
        },
        crossorigin: {
            type: String,
            default: undefined,
            validator: value => ['anonymous', 'use-credentials'].includes(value)
        },
        referrerpolicy: {
            type: String,
            default: undefined
        },

        /* look */
        size: {
            type: [String, Number],
            default: 'default'
        },
        shape: {
            type: String,
            default: 'circle',
            validator: value => ['circle', 'square', 'rounded'].includes(value)
        },
        variant: {
            type: String,
            default: '',
            validator: value => ['', 'gray', 'blue', 'green', 'orange', 'red', 'yellow'].includes(value)
        },
        bordered: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },

        /* identity (initials + auto color) */
        name: {
            type: String,
            default: ''
        },
        maxInitials: {
            type: Number,
            default: 2
        },

        /* presence */
        status: {
            type: String,
            default: '',
            validator: value => ['', 'online', 'away', 'busy', 'offline'].includes(value)
        },
        isOnline: {
            type: Boolean,
            default: false
        },
        statusColor: {
            type: String,
            default: ''
        },

        /* notification badge */
        badge: {
            type: [String, Number],
            default: ''
        },
        badgeMax: {
            type: Number,
            default: 99
        },
        badgeDot: {
            type: Boolean,
            default: false
        },
        badgeHidden: {
            type: Boolean,
            default: false
        },
        badgeShowZero: {
            type: Boolean,
            default: false
        },
        badgeVariant: {
            type: String,
            default: 'red',
            validator: value => ['gray', 'blue', 'green', 'orange', 'red', 'yellow'].includes(value)
        },

        /* behaviour */
        tag: {
            type: String,
            default: 'button',
            validator: value => ['button', 'a', 'span'].includes(value)
        },
        disabled: {
            type: Boolean,
            default: false
        }
    })

    // `click` is not declared on purpose: parent listeners (e.g. MDropdown trigger) fall through to the root.
    const emit = defineEmits(['load', 'error'])

    const slots = useSlots()

    // reactive state
    const hasError = ref(false)
    const isLoaded = ref(false)

    // computed
    const hasImageSource = computed(() => Boolean(props.src || props.srcSet))
    const showImage = computed(() => hasImageSource.value && !hasError.value)
    const isImageLoading = computed(() => showImage.value && !isLoaded.value)

    const initials = computed(() => getInitials(props.name, props.maxInitials))

    const resolvedVariant = computed(() => {
        if (props.variant) return props.variant
        return initials.value ? pickAvatarVariant(props.name) : ''
    })

    const resolvedStatus = computed(() => props.status || (props.isOnline ? 'online' : ''))

    const hasBadgeValue = computed(() => {
        if (props.badge === '' || props.badge === null || props.badge === undefined) return false
        if (Number(props.badge) === 0 && !props.badgeShowZero) return false
        return true
    })
    const showBadge = computed(() => !props.badgeHidden && (props.badgeDot || hasBadgeValue.value))
    const badgeText = computed(() => (props.badgeDot ? '' : formatBadgeValue(props.badge, props.badgeMax)))

    const isInteractive = computed(() => props.tag === 'button' || props.tag === 'a')
    const hasFallbackSlot = computed(() => Boolean(slots.default))

    const accessibleLabel = computed(() => {
        const parts = [props.alt || props.name || 'Profile picture']

        if (resolvedStatus.value) parts.push(STATUS_LABELS[resolvedStatus.value])
        if (showBadge.value && badgeText.value) parts.push(`${badgeText.value} notifications`)

        return parts.join(', ')
    })

    const rootClasses = computed(() => [
        'm-profile-pic',
        `m-profile-pic--${props.shape}`,
        resolvedVariant.value && `m-profile-pic--${resolvedVariant.value}`,
        {
            'm-profile-pic--interactive': isInteractive.value && !props.disabled,
            'm-profile-pic--bordered': props.bordered,
            'm-profile-pic--disabled': props.disabled
        }
    ])

    const rootStyle = computed(() => ({
        '--m-pp-size': resolveAvatarSize(props.size),
        ...(props.statusColor ? { '--m-pp-status-custom': props.statusColor } : {})
    }))

    // methods
    function onImageLoad(event) {
        isLoaded.value = true
        emit('load', event)
    }

    function onImageError(event) {
        hasError.value = true
        emit('error', event)
    }

    // allows retrying after a failed load (e.g. network came back)
    function reload() {
        hasError.value = false
        isLoaded.value = false
    }

    watch(() => [props.src, props.srcSet], reload)

    defineExpose({ hasError, isLoaded, reload })
</script>


<template>
    <component
        :is="tag"
        :class="rootClasses"
        :style="rootStyle"
        :type="tag === 'button' ? 'button' : undefined"
        :disabled="tag === 'button' && disabled ? true : undefined"
        :aria-disabled="tag !== 'button' && disabled ? 'true' : undefined"
        :role="tag === 'span' ? 'img' : undefined"
        :aria-label="accessibleLabel"
    >
        <!-- avatar content (clipped to shape) -->
            <span class="m-profile-pic__inner">
                <!-- image -->
                    <template v-if="showImage">
                        <span
                            v-if="isImageLoading"
                            class="m-profile-pic__skeleton"
                            aria-hidden="true"
                        ></span>

                        <!-- decorative: the root already carries the accessible name -->
                        <img
                            class="m-profile-pic__image"
                            :class="{ 'm-profile-pic__image--loaded': isLoaded }"
                            :src="src || undefined"
                            :srcset="srcSet || undefined"
                            :style="{ objectFit: fit }"
                            :loading="lazy ? 'lazy' : undefined"
                            :crossorigin="crossorigin"
                            :referrerpolicy="referrerpolicy"
                            alt=""
                            draggable="false"
                            @load="onImageLoad"
                            @error="onImageError"
                        />
                    </template>
                <!-- \\\ image -->

                <!-- fallbacks -->
                    <span v-else-if="hasFallbackSlot" class="m-profile-pic__fallback">
                        <slot />
                    </span>

                    <span v-else-if="icon" class="m-profile-pic__fallback">
                        <i :class="[icon, 'm-profile-pic__icon']" aria-hidden="true"></i>
                    </span>

                    <span
                        v-else-if="initials"
                        class="m-profile-pic__fallback m-profile-pic__fallback--initials"
                        aria-hidden="true"
                    >
                        {{ initials }}
                    </span>

                    <span v-else class="m-profile-pic__fallback m-profile-pic__fallback--default">
                        <i class="bi-person-fill m-profile-pic__icon" aria-hidden="true"></i>
                    </span>
                <!-- \\\ fallbacks -->
            </span>
        <!-- \\\ avatar content -->

        <!-- presence status -->
            <span
                v-if="resolvedStatus"
                class="m-profile-pic__status"
                :class="`m-profile-pic__status--${resolvedStatus}`"
                aria-hidden="true"
            ></span>
        <!-- \\\ presence status -->

        <!-- notification badge -->
            <span
                v-if="showBadge"
                class="m-profile-pic__badge"
                :class="[
                    `m-profile-pic__badge--${badgeVariant}`,
                    { 'm-profile-pic__badge--dot': badgeDot }
                ]"
                aria-hidden="true"
            >
                {{ badgeText }}
            </span>
        <!-- \\\ notification badge -->
    </component>
</template>


<style scoped lang="scss">
    .m-profile-pic {
        --m-pp-radius: 50%;
        --m-pp-color: var(--c-status__gray);

        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: var(--m-pp-size, 32px);
        height: var(--m-pp-size, 32px);
        padding: 0;
        background-color: var(--c-gray-80);
        border: none;
        border-radius: var(--m-pp-radius);
        transition: var(--fast-trans);
        position: relative;
    }

    /* shapes */
    .m-profile-pic--circle {
        --m-pp-radius: 50%;
    }

    .m-profile-pic--square {
        --m-pp-radius: 4px;
    }

    .m-profile-pic--rounded {
        --m-pp-radius: calc(var(--m-pp-size, 32px) * 0.25);
    }

    /* variants */
    .m-profile-pic--gray {
        --m-pp-color: var(--c-status__gray);
    }

    .m-profile-pic--blue {
        --m-pp-color: var(--c-status__blue);
    }

    .m-profile-pic--green {
        --m-pp-color: var(--c-status__green);
    }

    .m-profile-pic--orange {
        --m-pp-color: var(--c-status__orange);
    }

    .m-profile-pic--red {
        --m-pp-color: var(--c-status__red);
    }

    .m-profile-pic--yellow {
        --m-pp-color: var(--c-status__yellow);
    }

    /* states */
    .m-profile-pic--bordered {
        box-shadow: 0 0 0 2px var(--c-white);
    }

    .m-profile-pic--interactive {
        cursor: pointer;
    }

    .m-profile-pic--interactive:hover,
    .m-profile-pic--interactive:focus-visible,
    .m-profile-pic.dropdown-opened {
        box-shadow: 0 0 0 2px var(--c-gray-80);
    }

    .m-profile-pic--interactive:focus-visible {
        outline: 2px solid var(--c-status__blue);
        outline-offset: 2px;
    }

    .m-profile-pic--disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    }

    /* content */
    .m-profile-pic__inner {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: inherit;
        position: relative;
    }

    .m-profile-pic__image {
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }

    .m-profile-pic__image--loaded {
        opacity: 1;
    }

    .m-profile-pic__skeleton {
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, var(--c-gray-90) 25%, var(--c-gray-95) 50%, var(--c-gray-90) 75%);
        background-size: 200% 100%;
        position: absolute;
        inset: 0;
        animation: m-profile-pic-shimmer 1.2s linear infinite;
    }

    .m-profile-pic__fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: var(--m-pp-color);
        font-size: calc(var(--m-pp-size, 32px) * 0.5);
        color: var(--c-white);
    }

    .m-profile-pic__fallback--initials {
        font-size: calc(var(--m-pp-size, 32px) * 0.4);
        font-weight: 600;
        letter-spacing: 0.5px;
        line-height: 1;
        text-transform: uppercase;
    }

    .m-profile-pic__fallback--default {
        background-color: var(--c-gray-96);
        color: var(--c-gray-50);
    }

    .m-profile-pic__icon {
        line-height: 1;
    }

    /* presence status (`statusColor` prop overrides the preset through --m-pp-status-custom) */
    .m-profile-pic__status {
        --m-pp-status-preset: var(--c-status__gray);

        width: max(8px, calc(var(--m-pp-size, 32px) * 0.3));
        height: max(8px, calc(var(--m-pp-size, 32px) * 0.3));
        background-color: var(--m-pp-status-custom, var(--m-pp-status-preset));
        border: 2px solid var(--c-white);
        border-radius: 50%;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 1;
        transform: translate(10%, 10%);
    }

    .m-profile-pic__status--online {
        --m-pp-status-preset: var(--c-status__green);
    }

    .m-profile-pic__status--away {
        --m-pp-status-preset: var(--c-status__yellow);
    }

    .m-profile-pic__status--busy {
        --m-pp-status-preset: var(--c-status__red);
    }

    .m-profile-pic__status--offline {
        --m-pp-status-preset: var(--c-status__gray);
    }

    /* notification badge */
    .m-profile-pic__badge {
        --m-pp-badge-color: var(--c-status__red);

        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        background-color: var(--m-pp-badge-color);
        font-size: 10px;
        font-weight: 600;
        line-height: 1;
        color: var(--c-white);
        border: 2px solid var(--c-white);
        border-radius: 999px;
        box-sizing: content-box;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        transform: translate(40%, -40%);
    }

    .m-profile-pic__badge--dot {
        min-width: 0;
        width: 8px;
        height: 8px;
        padding: 0;
    }

    .m-profile-pic__badge--gray {
        --m-pp-badge-color: var(--c-status__gray);
    }

    .m-profile-pic__badge--blue {
        --m-pp-badge-color: var(--c-status__blue);
    }

    .m-profile-pic__badge--green {
        --m-pp-badge-color: var(--c-status__green);
    }

    .m-profile-pic__badge--orange {
        --m-pp-badge-color: var(--c-status__orange);
    }

    .m-profile-pic__badge--red {
        --m-pp-badge-color: var(--c-status__red);
    }

    .m-profile-pic__badge--yellow {
        --m-pp-badge-color: var(--c-status__yellow);
    }

    @keyframes m-profile-pic-shimmer {
        from {
            background-position: 200% 0;
        }

        to {
            background-position: -200% 0;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .m-profile-pic,
        .m-profile-pic__image {
            transition: none;
        }

        .m-profile-pic__skeleton {
            animation: none;
        }
    }
</style>
