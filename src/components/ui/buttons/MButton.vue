
<script setup>
    import SpinLoader from '../general/SpinLoader.vue';

    defineProps({
        tag: {
            type: String,
            default: "button",
            validator: value => ['button', 'a', 'span'].includes(value)
        },
        variant: {
            type: String,
            default: 'primary',
            validator: value => ['primary', 'primary-2', 'secondary', 'green', 'red', 'orange', 'icon'].includes(value)
        },
        size: {
            type: String,
            validator: value => ['size-sm', 'size-lg'].includes(value)
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
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        icon_name: {
            type: String
        },

        // with export, filter icons case
        icon_count: {
            type: String,
            default: 'one'
        }
    })
</script>



<template>
    <!-- default button styles -->
    <component
        :is="tag"
        :class="['m-btn', `m-btn-${variant}`, { 'btn-loading': isLoading }]"
        :type="type">

        <!-- default button -->
            <template v-if="btn_view === 'normal'">
                <span class="btn-title"> <slot/> </span>
            </template>
        <!-- \\\ default button -->

        <!-- button with loader -->
            <template v-else-if="btn_view === 'loader'">
                <span v-show="!isLoading" class="btn-title"> <slot/> </span>
                <SpinLoader v-show="isLoading"/>
            </template>
        <!-- \\\ button with loader -->

        <!-- default button with icon -->
            <template v-if="btn_view === 'with_icon'">
                <span class="d-flx aI-C jC-SB g-10">
                    <span class="btn-title"> <slot/> </span>
                    <i class="fa-solid fa-chevron-down"></i>
                </span>
            </template>
        <!-- \\\ default button with icon -->

        <!-- single icon -->
        <template v-else-if="btn_view === 'single_icon'">
            <i class="fa-solid fa-upload"></i>
        </template>

        <!-- 2 icons icon -->
        <template v-else-if="btn_view === 'two_icon'">
            <span class="d-flx aI-C g-10">
                <i class="fa-solid fa-arrow-down-wide-short"></i>
                <i class="fa-solid fa-chevron-down"></i>
            </span>
        </template>

    </component>
</template>



<style scoped lang="scss">
    .m-btn {
        @include btn-reset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 80px;
        height: var(--h-input);
        padding-inline: 16px;
        color: var(--c-white);
        border-radius: 5px;
        text-align: center;
        border: 1px solid transparent;
        position: relative;
    }
    .m-btn.m-btn-primary {
        background-color: var(--c-app-theme);
        border-color: var(--c-app-theme);
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
    .m-btn.m-btn-icon {
        padding-inline: 10px;
        background-color: #eff2f6;
        color: var(--c-gray-50);
        border-color: var(--c-gray-85);
    }
    .m-btn.m-btn-icon:hover {
        border-color: #334255;
    }


    /* btn loading */
        .m-btn .spin-loader {
            border-color: var(--c-white);
            border-top-color: transparent;
        }

        .m-btn.btn-loading {
            min-width: 35px;
            padding-inline: 0px;
            pointer-events: none;
        }
    /* \\\ btn loading */
</style>

