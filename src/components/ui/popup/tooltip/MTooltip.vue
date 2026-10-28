
<script setup>
import { computed, ref, useId } from 'vue'

import {
    autoUpdate,
    flip,
    offset,
    shift,
    useFloating
} from '@floating-ui/vue'

defineOptions({
    name: 'MTooltip'
})

const props = defineProps({
    content: {
        type: [String, Number],
        default: ''
    },
    placement: {
        type: String,
        default: 'top',
        validator: (value) => [
            'top',
            'bottom',
            'left',
            'right'
        ].includes(value)
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const tooltipId = `m-tooltip-${useId()}`

const triggerRef = ref(null)
const tooltipRef = ref(null)
const visible = ref(false)

const { floatingStyles } = useFloating(
    triggerRef,
    tooltipRef,
    {
        placement: computed(() => props.placement),
        middleware: [
            offset(8),
            flip(),
            shift({ padding: 8 })
        ],
        whileElementsMounted: autoUpdate
    }
)

const tooltipStyle = computed(() => ({
    ...floatingStyles.value,
    display: 'block'
}))

function show() {
    if (!props.disabled && props.content !== '') {
        visible.value = true
    }
}

function hide() {
    visible.value = false
}
</script>


<template>
    <span
        ref="triggerRef"
        class="m-tooltip__trigger"
        :aria-describedby="visible ? tooltipId : undefined"
        @mouseenter="show"
        @mouseleave="hide"
        @focus="show"
        @blur="hide"
    >
        <slot />
    </span>

    <Teleport to="body">
        <Transition name="m-tooltip">
            <div
                v-if="visible && !disabled"
                :id="tooltipId"
                ref="tooltipRef"
                class="m-tooltip"
                :style="tooltipStyle"
                role="tooltip"
            >
                {{ content }}
            </div>
        </Transition>
    </Teleport>
</template>


<style>
.m-tooltip__trigger {
    display: inline-flex;
    max-width: 100%;
}

.m-tooltip {
    position: absolute;
    z-index: 2000;
    max-width: 250px;
    padding: 8px 12px;
    border-radius: 4px;
    background: #303133;
    color: #ffffff;
    font-size: 12px;
    line-height: 1.5;
    overflow-wrap: anywhere;
}

.m-tooltip-enter-active,
.m-tooltip-leave-active {
    transition: opacity 0.15s ease;
}

.m-tooltip-enter-from,
.m-tooltip-leave-to {
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .m-tooltip-enter-active,
    .m-tooltip-leave-active {
        transition: none;
    }
}
</style>

