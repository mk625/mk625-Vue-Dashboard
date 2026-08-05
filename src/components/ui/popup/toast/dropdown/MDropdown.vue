<script setup>
    // imports
        import { computed, onBeforeUnmount, ref, watch } from 'vue';
    // \\\ imports


    // props / model / emits
        const props = defineProps({
            items: {
                type: Array,
                default: null
            },
            placement: {
                type: String,
                default: 'bottom-end',
                validator: (value) => [
                    'bottom-start',
                    'bottom-end',
                    'top-start',
                    'top-end'
                ].includes(value)
            },
            disabled: {
                type: Boolean,
                default: false
            }
        });

        const isOpen = defineModel('open', {
            type: Boolean,
            default: false
        });

        const emit = defineEmits(['select']);
    // \\\ props / model / emits


    // local state
        const rootRef = ref(null);
    // \\\ local state


    // derived
        const hasItems = computed(() => Array.isArray(props.items) && props.items.length > 0);

        const panelClass = computed(() => `m-dropdown__panel m-dropdown__panel--${props.placement}`);
    // \\\ derived


    // actions
        function open() {
            if (props.disabled || isOpen.value) return;
            isOpen.value = true;
        }

        function close() {
            if (!isOpen.value) return;
            isOpen.value = false;
        }

        function toggle() {
            isOpen.value ? close() : open();
        }

        function selectItem(item) {
            if (!item || item.divider || item.disabled) return;
            emit('select', item);
            close();
        }

        function onDocumentPointerDown(event) {
            if (!isOpen.value) return;
            if (rootRef.value?.contains(event.target)) return;
            close();
        }

        function onDocumentKeydown(event) {
            if (event.key === 'Escape' && isOpen.value) {
                close();
            }
        }
    // \\\ actions


    // lifecycle
        watch(isOpen, (open) => {
            if (open) {
                document.addEventListener('pointerdown', onDocumentPointerDown);
                document.addEventListener('keydown', onDocumentKeydown);
            } else {
                document.removeEventListener('pointerdown', onDocumentPointerDown);
                document.removeEventListener('keydown', onDocumentKeydown);
            }
        });

        onBeforeUnmount(() => {
            document.removeEventListener('pointerdown', onDocumentPointerDown);
            document.removeEventListener('keydown', onDocumentKeydown);
        });

        defineExpose({ open, close, toggle });
    // \\\ lifecycle
</script>


<template>
    <div
        ref="rootRef"
        class="m-dropdown"
        :class="{ 'm-dropdown--open': isOpen, 'm-dropdown--disabled': disabled }"
    >
        <div class="m-dropdown__trigger">
            <slot
                name="trigger"
                :open="isOpen"
                :toggle="toggle"
            />
        </div>

        <Transition name="m-dropdown">
            <div
                v-if="isOpen"
                :class="panelClass"
                role="menu"
            >
                <slot :close="close">
                    <template v-if="hasItems">
                        <template
                            v-for="(item, index) in items"
                            :key="item.value ?? item.label ?? index"
                        >
                            <div
                                v-if="item.divider"
                                class="m-dropdown__divider"
                                role="separator"
                            />

                            <button
                                v-else
                                type="button"
                                class="m-dropdown__item"
                                :class="{ 'm-dropdown__item--danger': item.danger }"
                                role="menuitem"
                                :disabled="item.disabled"
                                @click="selectItem(item)"
                            >
                                <i
                                    v-if="item.icon"
                                    :class="[item.icon, 'm-dropdown__item-icon']"
                                    aria-hidden="true"
                                />
                                <span class="m-dropdown__item-label">{{ item.label }}</span>
                            </button>
                        </template>
                    </template>
                </slot>
            </div>
        </Transition>
    </div>
</template>


<style scoped lang="scss">
    .m-dropdown {
        position: relative;
        display: inline-flex;
        vertical-align: middle;
    }

    .m-dropdown--disabled {
        opacity: 0.6;
        pointer-events: none;
    }

    .m-dropdown__trigger {
        display: inline-flex;
    }

    .m-dropdown__panel {
        --m-dropdown-min-width: 180px;
        --m-dropdown-offset: 6px;

        min-width: var(--m-dropdown-min-width);
        max-height: 280px;
        padding: 6px;
        overflow-y: auto;
        background-color: var(--c-white);
        border: 1px solid var(--c-border-default);
        border-radius: 8px;
        box-shadow: var(--box-shadow-default, var(--c-shadow));
        z-index: 1000;
        position: absolute;
    }

    .m-dropdown__panel--bottom-start {
        top: calc(100% + var(--m-dropdown-offset));
        left: 0;
    }

    .m-dropdown__panel--bottom-end {
        top: calc(100% + var(--m-dropdown-offset));
        right: 0;
    }

    .m-dropdown__panel--top-start {
        bottom: calc(100% + var(--m-dropdown-offset));
        left: 0;
    }

    .m-dropdown__panel--top-end {
        bottom: calc(100% + var(--m-dropdown-offset));
        right: 0;
    }

    .m-dropdown__item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 8px 10px;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: var(--c-text-primary);
        font: inherit;
        text-align: start;
        cursor: pointer;
        transition: var(--fast-trans);
    }

    .m-dropdown__item:hover:not(:disabled) {
        background-color: var(--c-dropdown-list-btn__hov, var(--c-gray-95));
    }

    .m-dropdown__item:disabled {
        color: var(--c-text-tertiary);
        cursor: not-allowed;
        opacity: 0.7;
    }

    .m-dropdown__item--danger {
        color: var(--c-status__red, #c0392b);
    }

    .m-dropdown__item-icon {
        flex-shrink: 0;
        font-size: 14px;
        color: var(--c-text-secondary);
    }

    .m-dropdown__item--danger .m-dropdown__item-icon {
        color: inherit;
    }

    .m-dropdown__item-label {
        flex: 1;
        line-height: 1.3;
    }

    .m-dropdown__divider {
        height: 1px;
        margin: 4px 6px;
        background-color: var(--c-border-default);
    }

    .m-dropdown-enter-from,
    .m-dropdown-leave-to {
        opacity: 0;
        transform: translateY(-4px);
    }

    .m-dropdown-enter-active,
    .m-dropdown-leave-active {
        transition: var(--fast-trans);
    }
</style>
