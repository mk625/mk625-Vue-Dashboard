<script setup>
    // imports
        import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
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
                    'top',
                    'top-start',
                    'top-end',
                    'bottom',
                    'bottom-start',
                    'bottom-end'
                ].includes(value)
            },
            trigger: {
                type: String,
                default: 'click',
                validator: (value) => ['hover', 'click', 'contextmenu'].includes(value)
            },
            disabled: {
                type: Boolean,
                default: false
            },
            hideOnClick: {
                type: Boolean,
                default: true
            },
            showTimeout: {
                type: Number,
                default: 150
            },
            hideTimeout: {
                type: Number,
                default: 150
            },
            maxHeight: {
                type: [Number, String],
                default: 280
            },
            loop: {
                type: Boolean,
                default: true
            },
            teleported: {
                type: Boolean,
                default: true
            },
            popperClass: {
                type: String,
                default: ''
            },
            role: {
                type: String,
                default: 'menu'
            },
            tabindex: {
                type: [Number, String],
                default: 0
            }
        });

        const isOpen = defineModel('open', {
            type: Boolean,
            default: false
        });

        const emit = defineEmits(['select', 'command', 'visible-change']);
    // \\\ props / model / emits


    // local state
        const menuId = `m-dropdown-${useId()}`;
        const rootRef = ref(null);
        const triggerRef = ref(null);
        const panelRef = ref(null);
        const itemEls = [];
        const activeIndex = ref(-1);
        const floatingStyle = ref({});

        const PANEL_OFFSET = 6;
        const VIEWPORT_GAP = 8;

        let showTimer = 0;
        let hideTimer = 0;
        let resizeObserver = null;
        let pendingFocusIndex = -1;
    // \\\ local state


    // derived
        const hasItems = computed(() => Array.isArray(props.items) && props.items.length > 0);

        const enabledIndexes = computed(() => {
            if (!hasItems.value) return [];

            return props.items
                .map((item, index) => (!item?.divider && !item?.disabled ? index : -1))
                .filter((index) => index >= 0);
        });

        const panelClass = computed(() => {
            const classes = ['m-dropdown__panel'];

            if (props.popperClass) classes.push(props.popperClass);

            if (props.teleported) {
                classes.push('m-dropdown__panel--teleported');
            } else {
                classes.push(`m-dropdown__panel--${props.placement}`);
            }

            return classes;
        });

        const panelStyle = computed(() => {
            const style = {};

            if (props.maxHeight !== '' && props.maxHeight != null) {
                style.maxHeight = typeof props.maxHeight === 'number'
                    ? `${props.maxHeight}px`
                    : props.maxHeight;
            }

            if (props.teleported) {
                Object.assign(style, floatingStyle.value);
            }

            return style;
        });

        const triggerProps = computed(() => {
            const bindings = {
                'aria-haspopup': props.role === 'menu' ? 'menu' : 'listbox',
                'aria-expanded': isOpen.value,
                'aria-controls': menuId,
                tabindex: props.tabindex
            };

            if (props.disabled) bindings.disabled = true;

            return bindings;
        });
    // \\\ derived


    // actions
        function open() {
            if (props.disabled || isOpen.value) return;
            isOpen.value = true;
        }

        function close(restoreFocus = false) {
            if (!isOpen.value) return;
            const shouldRestore = restoreFocus === true;
            isOpen.value = false;
            activeIndex.value = -1;
            pendingFocusIndex = -1;

            if (shouldRestore) {
                nextTick(() => focusTrigger());
            }
        }

        function toggle() {
            isOpen.value ? close() : open();
        }

        function selectItem(item, restoreFocus = false) {
            if (!item || item.divider || item.disabled) return;

            emit('select', item);
            emit('command', item.command ?? item.value ?? item);

            if (props.hideOnClick) close(restoreFocus);
        }

        function clearShowTimer() {
            if (!showTimer) return;
            clearTimeout(showTimer);
            showTimer = 0;
        }

        function clearHideTimer() {
            if (!hideTimer) return;
            clearTimeout(hideTimer);
            hideTimer = 0;
        }

        function scheduleOpen() {
            clearHideTimer();
            clearShowTimer();
            showTimer = setTimeout(() => open(), props.showTimeout);
        }

        function scheduleClose() {
            clearShowTimer();
            clearHideTimer();
            hideTimer = setTimeout(() => close(), props.hideTimeout);
        }

        function onTriggerClick() {
            if (props.disabled || props.trigger !== 'click') return;
            toggle();
        }

        function onTriggerContextMenu(event) {
            if (props.trigger !== 'contextmenu') return;
            event.preventDefault();
            if (props.disabled) return;
            open();
        }

        function onTriggerEnter() {
            if (props.trigger !== 'hover' || props.disabled) return;
            scheduleOpen();
        }

        function onTriggerLeave() {
            if (props.trigger !== 'hover') return;
            scheduleClose();
        }

        function onPanelEnter() {
            if (props.trigger !== 'hover') return;
            clearHideTimer();
        }

        function onPanelLeave() {
            if (props.trigger !== 'hover') return;
            scheduleClose();
        }

        function onTriggerKeydown(event) {
            if (props.disabled) return;

            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                if (!isOpen.value) open();
                if (event.key === 'ArrowDown') focusFirstItem();
                else focusLastItem();
                return;
            }

            if (event.key === 'Escape' && isOpen.value) {
                event.preventDefault();
                close(true);
            }
        }

        function onMenuKeydown(event) {
            if (!isOpen.value) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                close(true);
                return;
            }

            if (event.key === 'Tab') {
                close();
                return;
            }

            if (!hasItems.value) return;

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                moveActive(1);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                moveActive(-1);
            } else if (event.key === 'Home') {
                event.preventDefault();
                focusFirstItem();
            } else if (event.key === 'End') {
                event.preventDefault();
                focusLastItem();
            }
        }

        function setItemEl(index, el) {
            itemEls[index] = el || null;
        }

        function focusItem(index) {
            activeIndex.value = index;
            pendingFocusIndex = index;
            nextTick(() => {
                requestAnimationFrame(() => applyPendingFocus());
            });
        }

        function applyPendingFocus() {
            if (pendingFocusIndex < 0) return;
            const element = itemEls[pendingFocusIndex];
            if (!element?.isConnected) return;
            pendingFocusIndex = -1;
            element.focus();
        }

        function focusFirstItem() {
            const indexes = enabledIndexes.value;
            if (indexes.length) focusItem(indexes[0]);
        }

        function focusLastItem() {
            const indexes = enabledIndexes.value;
            if (indexes.length) focusItem(indexes[indexes.length - 1]);
        }

        function moveActive(step) {
            const indexes = enabledIndexes.value;
            if (!indexes.length) return;

            const current = indexes.indexOf(activeIndex.value);

            if (current === -1) {
                focusItem(step > 0 ? indexes[0] : indexes[indexes.length - 1]);
                return;
            }

            const next = current + step;

            if (next < 0 || next >= indexes.length) {
                if (!props.loop) return;
                focusItem(indexes[(next + indexes.length) % indexes.length]);
                return;
            }

            focusItem(indexes[next]);
        }

        function focusTrigger() {
            const child = triggerRef.value?.firstElementChild;
            if (child instanceof HTMLElement) child.focus();
        }

        function updatePosition() {
            const trigger = triggerRef.value;
            const panel = panelRef.value;
            if (!props.teleported || !trigger || !panel) return;

            const triggerRect = trigger.getBoundingClientRect();
            const panelRect = panel.getBoundingClientRect();
            const placement = resolvePlacement(props.placement, triggerRect, panelRect.height);

            let top = placement.startsWith('top')
                ? triggerRect.top - panelRect.height - PANEL_OFFSET
                : triggerRect.bottom + PANEL_OFFSET;

            let left = triggerRect.left;

            if (placement.endsWith('-end')) {
                left = triggerRect.right - panelRect.width;
            } else if (!placement.endsWith('-start')) {
                left = triggerRect.left + (triggerRect.width - panelRect.width) / 2;
            }

            const maxLeft = window.innerWidth - panelRect.width - VIEWPORT_GAP;
            const maxTop = window.innerHeight - panelRect.height - VIEWPORT_GAP;

            left = Math.min(Math.max(left, VIEWPORT_GAP), Math.max(VIEWPORT_GAP, maxLeft));
            top = Math.min(Math.max(top, VIEWPORT_GAP), Math.max(VIEWPORT_GAP, maxTop));

            const nextStyle = {
                top: `${Math.round(top)}px`,
                left: `${Math.round(left)}px`
            };

            if (
                floatingStyle.value.top !== nextStyle.top
                || floatingStyle.value.left !== nextStyle.left
            ) {
                floatingStyle.value = nextStyle;
            }

            requestAnimationFrame(() => applyPendingFocus());
        }

        function resolvePlacement(placement, triggerRect, panelHeight) {
            const spaceBelow = window.innerHeight - triggerRect.bottom;
            const spaceAbove = triggerRect.top;
            const needed = panelHeight + PANEL_OFFSET;

            if (placement.startsWith('bottom') && spaceBelow < needed && spaceAbove > spaceBelow) {
                return placement.replace('bottom', 'top');
            }

            if (placement.startsWith('top') && spaceAbove < needed && spaceBelow > spaceAbove) {
                return placement.replace('top', 'bottom');
            }

            return placement;
        }

        function bindPanelObserver() {
            resizeObserver?.disconnect();
            resizeObserver = null;

            if (!props.teleported || !panelRef.value || typeof ResizeObserver === 'undefined') return;

            resizeObserver = new ResizeObserver(() => updatePosition());
            resizeObserver.observe(panelRef.value);
        }

        function addOpenListeners() {
            document.addEventListener('pointerdown', onDocumentPointerDown);
            document.addEventListener('keydown', onDocumentKeydown);

            if (!props.teleported) return;

            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition, true);
            nextTick(() => {
                updatePosition();
                bindPanelObserver();
            });
        }

        function removeOpenListeners() {
            document.removeEventListener('pointerdown', onDocumentPointerDown);
            document.removeEventListener('keydown', onDocumentKeydown);
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
            resizeObserver?.disconnect();
            resizeObserver = null;
        }

        function onDocumentPointerDown(event) {
            if (!isOpen.value) return;
            const target = event.target;
            if (rootRef.value?.contains(target)) return;
            if (panelRef.value?.contains(target)) return;
            close();
        }

        function onDocumentKeydown(event) {
            if (event.key === 'Escape' && isOpen.value) {
                event.preventDefault();
                close(true);
            }
        }
    // \\\ actions


    // lifecycle
        watch(isOpen, (open) => {
            if (open && props.disabled) {
                isOpen.value = false;
                return;
            }

            emit('visible-change', open);

            if (open) {
                addOpenListeners();
            } else {
                removeOpenListeners();
                clearShowTimer();
                clearHideTimer();
                activeIndex.value = -1;
                pendingFocusIndex = -1;
            }
        });

        watch(() => props.disabled, (disabled) => {
            if (disabled) close();
        });

        watch(() => [props.placement, props.maxHeight, props.teleported], () => {
            if (isOpen.value && props.teleported) nextTick(() => updatePosition());
        });

        onMounted(() => {
            if (!isOpen.value || props.disabled) return;
            addOpenListeners();
        });

        onBeforeUnmount(() => {
            removeOpenListeners();
            clearShowTimer();
            clearHideTimer();
        });

        defineExpose({
            open,
            close,
            toggle,
            handleOpen: open,
            handleClose: () => close()
        });
    // \\\ lifecycle
</script>


<template>
    <div
        ref="rootRef"
        class="m-dropdown"
        :class="{ 'm-dropdown--open': isOpen, 'm-dropdown--disabled': disabled }"
    >
        <div
            ref="triggerRef"
            class="m-dropdown__trigger"
            @click="onTriggerClick"
            @keydown="onTriggerKeydown"
            @contextmenu="onTriggerContextMenu"
            @mouseenter="onTriggerEnter"
            @mouseleave="onTriggerLeave"
        >
            <slot
                name="trigger"
                :open="isOpen"
                :toggle="toggle"
                :close="close"
                :trigger-props="triggerProps"
            />
        </div>

        <Teleport to="body" :disabled="!teleported">
            <Transition name="m-dropdown">
                <div
                    v-if="isOpen"
                    :id="menuId"
                    ref="panelRef"
                    :class="panelClass"
                    :style="panelStyle"
                    :role="role"
                    aria-orientation="vertical"
                    @keydown="onMenuKeydown"
                    @mouseenter="onPanelEnter"
                    @mouseleave="onPanelLeave"
                >
                    <slot :close="close">
                        <template v-if="hasItems">
                            <template
                                v-for="(item, index) in items"
                                :key="item.value ?? item.command ?? item.label ?? index"
                            >
                                <div
                                    v-if="item.divider"
                                    class="m-dropdown__divider"
                                    role="separator"
                                />

                                <div
                                    v-if="item.divided"
                                    class="m-dropdown__divider"
                                    role="separator"
                                />

                                <button
                                    v-if="!item.divider"
                                    :ref="(el) => setItemEl(index, el)"
                                    type="button"
                                    class="m-dropdown__item"
                                    :class="{ 'm-dropdown__item--danger': item.danger }"
                                    role="menuitem"
                                    :disabled="item.disabled"
                                    :tabindex="activeIndex === index ? 0 : -1"
                                    @click="selectItem(item, true)"
                                >
                                    <slot name="item" :item="item" :index="index">
                                        <i
                                            v-if="item.icon"
                                            :class="[item.icon, 'm-dropdown__item-icon']"
                                            aria-hidden="true"
                                        />
                                        <span class="m-dropdown__item-label">{{ item.label }}</span>
                                    </slot>
                                </button>
                            </template>
                        </template>
                    </slot>
                </div>
            </Transition>
        </Teleport>
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
        padding: 6px;
        overflow-y: auto;
        background-color: var(--c-white);
        color: var(--c-text-primary);
        border: 1px solid var(--c-border-default);
        border-radius: 8px;
        box-shadow: var(--box-shadow-default, var(--c-shadow));
        z-index: 1000;
        position: absolute;
    }

    .m-dropdown__panel--teleported {
        z-index: 2000;
        position: fixed;
    }

    .m-dropdown__panel--bottom {
        top: calc(100% + var(--m-dropdown-offset));
        left: 50%;
        translate: -50% 0;
    }

    .m-dropdown__panel--bottom-start {
        top: calc(100% + var(--m-dropdown-offset));
        left: 0;
    }

    .m-dropdown__panel--bottom-end {
        top: calc(100% + var(--m-dropdown-offset));
        right: 0;
    }

    .m-dropdown__panel--top {
        bottom: calc(100% + var(--m-dropdown-offset));
        left: 50%;
        translate: -50% 0;
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

    .m-dropdown__item:focus-visible {
        background-color: var(--c-dropdown-list-btn__hov, var(--c-gray-95));
        outline: 2px solid var(--c-app-theme);
        outline-offset: -2px;
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

    @media (prefers-reduced-motion: reduce) {
        .m-dropdown-enter-active,
        .m-dropdown-leave-active {
            transition: none;
        }
    }
</style>
