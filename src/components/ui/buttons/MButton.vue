<script setup>
    // imports
        import { computed, useAttrs } from 'vue';
        import SpinLoader from '../general/SpinLoader.vue';
    // \\\ imports

    defineOptions({
        inheritAttrs: false
    })

    const props = defineProps({
        tag: {
            type: String,
            default: 'button',
            validator: value => ['button', 'a', 'span'].includes(value)
        },
        variant: {
            type: String,
            default: 'primary',
            validator: value => ['primary', 'primary-2', 'secondary', 'green', 'red', 'orange', 'icon'].includes(value)
        },
        size: {
            type: String,
            default: '',
            validator: value => ['', 'size-sm', 'size-lg'].includes(value)
        },
        type: {
            type: String,
            default: 'button',
            validator: value => ['button', 'submit', 'reset'].includes(value)
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        btn_view: {
            type: String,
            default: 'normal',
            validator: value => ['normal', 'loader', 'with_icon', 'single_icon', 'two_icon'].includes(value)
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        icon_name: {
            type: String,
            default: ''
        },
        // with export, filter icons case
        icon_count: {
            type: String,
            default: 'one',
            validator: value => ['one', 'two'].includes(value)
        },
        full_width: {
            type: Boolean,
            default: false
        }
    })

    const attrs = useAttrs()

    const isDisabled = computed(() => props.disabled || props.isLoading)

    const buttonClasses = computed(() => [
        'm-btn',
        `m-btn-${props.variant}`,
        props.size,
        {
            'btn-loading': props.isLoading,
            'm-btn--full': props.full_width,
            'm-btn--icon-only': props.btn_view === 'single_icon' || props.btn_view === 'two_icon',
        }
    ])

    const nativeType = computed(() => (props.tag === 'button' ? props.type : undefined))

    const trailingIcon = computed(() => props.icon_name || 'fa-solid fa-chevron-down')

    const primaryIcon = computed(() => {
        if (props.icon_name) {
            return props.icon_name
        }

        if (props.btn_view === 'single_icon') {
            return 'fa-solid fa-upload'
        }

        if (props.btn_view === 'two_icon') {
            return 'fa-solid fa-arrow-down-wide-short'
        }

        return 'fa-solid fa-chevron-down'
    })
</script>



<template>
    <!-- default button styles -->
    <component
        :is="tag"
        v-bind="attrs"
        :class="buttonClasses"
        :type="nativeType"
        :disabled="tag === 'button' ? isDisabled : undefined"
        :aria-disabled="tag !== 'button' ? isDisabled : undefined"
        :tabindex="tag !== 'button' && isDisabled ? -1 : attrs.tabindex"
    >

        <!-- default button -->
            <template v-if="btn_view === 'normal'">
                <span class="btn-title"><slot /></span>
            </template>
        <!-- \\\ default button -->

        <!-- button with loader -->
            <template v-else-if="btn_view === 'loader'">
                <span v-show="!isLoading" class="btn-title"><slot /></span>
                <SpinLoader v-show="isLoading" size="sm" />
            </template>
        <!-- \\\ button with loader -->

        <!-- default button with icon -->
            <template v-else-if="btn_view === 'with_icon'">
                <span class="m-btn__content m-btn__content--with-icon">
                    <span class="btn-title"><slot /></span>
                    <template v-if="icon_count === 'two'">
                        <i class="fa-solid fa-arrow-down-wide-short" aria-hidden="true"></i>
                        <i :class="trailingIcon" aria-hidden="true"></i>
                    </template>
                    <i v-else :class="trailingIcon" aria-hidden="true"></i>
                </span>
            </template>
        <!-- \\\ default button with icon -->

        <!-- single icon -->
            <template v-else-if="btn_view === 'single_icon'">
                <i :class="primaryIcon" aria-hidden="true"></i>
            </template>
        <!-- \\\ single icon -->

        <!-- 2 icons -->
            <template v-else-if="btn_view === 'two_icon'">
                <span class="m-btn__content m-btn__content--two-icon">
                    <i :class="primaryIcon" aria-hidden="true"></i>
                    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                </span>
            </template>
        <!-- \\\ 2 icons -->

    </component>
</template>



<style scoped lang="scss">
    .m-btn {
        @include btn-reset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-width: 80px;
        height: var(--h-input);
        padding-inline: 16px;
        background-color: transparent;
        color: var(--c-white);
        font-size: 14px;
        line-height: 1.2;
        text-align: center;
        border: 1px solid transparent;
        border-radius: var(--br-radius-input);
        cursor: pointer;
        transition: background-color var(--fast-trans, 0.15s ease),
            border-color var(--fast-trans, 0.15s ease),
            color var(--fast-trans, 0.15s ease),
            opacity var(--fast-trans, 0.15s ease);
        position: relative;
    }

    .m-btn:focus-visible {
        outline: 2px solid var(--c-app-theme);
        outline-offset: 2px;
    }

    .m-btn.m-btn--full {
        width: 100%;
    }

    .m-btn.m-btn--icon-only {
        min-width: var(--h-input);
        padding-inline: 10px;
    }

    .m-btn.size-sm {
        min-width: 64px;
        height: 28px;
        padding-inline: 10px;
        font-size: 12px;
    }

    .m-btn.size-sm.m-btn--icon-only {
        min-width: 28px;
        padding-inline: 6px;
    }

    .m-btn.size-lg {
        min-width: 96px;
        height: 44px;
        padding-inline: 20px;
        font-size: 16px;
    }

    .m-btn.size-lg.m-btn--icon-only {
        min-width: 44px;
        padding-inline: 12px;
    }

    .m-btn:disabled,
    .m-btn[aria-disabled='true'] {
        opacity: 0.65;
        cursor: not-allowed;
        pointer-events: none;
    }

    .m-btn__content {
        display: inline-flex;
        align-items: center;
        gap: 10px;
    }

    .m-btn__content--with-icon {
        justify-content: space-between;
        width: 100%;
    }

    /* variants */
    .m-btn.m-btn-primary {
        background-color: var(--c-app-theme);
        border-color: var(--c-app-theme);
    }

    .m-btn.m-btn-primary:hover {
        background-color: var(--c-app-theme-hover);
        border-color: var(--c-app-theme-hover);
    }

    .m-btn.m-btn-primary-2 {
        background-color: var(--c-white);
        color: var(--c-black);
        border-color: var(--c-app-theme);
    }

    .m-btn.m-btn-primary-2:hover {
        background-color: var(--c-app-theme);
        color: var(--c-white);
        border-color: var(--c-app-theme);
    }

    .m-btn.m-btn-secondary {
        background-color: var(--c-white);
        color: var(--c-gray-50);
        border-color: var(--c-gray-60);
    }

    .m-btn.m-btn-secondary:hover {
        color: var(--c-black);
        border-color: var(--c-black);
    }

    .m-btn.m-btn-green {
        background-color: var(--c-status__green);
        color: var(--c-white);
        border-color: var(--c-status__green);
    }

    .m-btn.m-btn-green:hover {
        background-color: color-mix(in oklab, var(--c-status__green), black 10%);
        border-color: color-mix(in oklab, var(--c-status__green), black 10%);
    }

    .m-btn.m-btn-red {
        background-color: var(--c-status__red);
        color: var(--c-white);
        border-color: var(--c-status__red);
    }

    .m-btn.m-btn-red:hover {
        background-color: color-mix(in oklab, var(--c-status__red), black 10%);
        border-color: color-mix(in oklab, var(--c-status__red), black 10%);
    }

    .m-btn.m-btn-orange {
        background-color: var(--c-status__orange);
        color: var(--c-white);
        border-color: var(--c-status__orange);
    }

    .m-btn.m-btn-orange:hover {
        background-color: color-mix(in oklab, var(--c-status__orange), black 10%);
        border-color: color-mix(in oklab, var(--c-status__orange), black 10%);
    }

    .m-btn.m-btn-icon {
        min-width: var(--h-input);
        padding-inline: 10px;
        background-color: var(--c-gray-90);
        color: var(--c-gray-50);
        border-color: var(--c-gray-85);
    }

    .m-btn.m-btn-icon:hover {
        color: var(--c-black);
        border-color: var(--c-gray-50);
    }

    /* btn loading */
    .m-btn .spin-loader {
        border-color: var(--c-white);
        border-top-color: transparent;
    }

    .m-btn.m-btn-secondary .spin-loader,
    .m-btn.m-btn-primary-2 .spin-loader,
    .m-btn.m-btn-icon .spin-loader {
        border-color: var(--c-gray-50);
        border-top-color: transparent;
    }

    .m-btn.btn-loading {
        min-width: 35px;
        padding-inline: 0;
        pointer-events: none;
    }
    /* \\\ btn loading */
</style>
