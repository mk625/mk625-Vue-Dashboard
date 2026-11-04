<script setup>
    import { computed } from 'vue'

    const props = defineProps({
        tag: {
            type: String,
            default: 'span',
            validator: value => ['span', 'button'].includes(value),
        },
        type: {
            type: String,
            default: '',
            validator: value => ['', 'primary', 'success', 'info', 'warning', 'danger'].includes(value),
        },
        variant: {
            type: String,
            default: 'green',
            validator: value => ['green', 'blue', 'gray', 'yellow', 'orange', 'red'].includes(value),
        },
        effect: {
            type: String,
            default: 'light',
            validator: value => ['dark', 'light', 'plain'].includes(value),
        },
        size: {
            type: String,
            default: 'default',
            validator: value => ['large', 'default', 'small'].includes(value),
        },
        closable: {
            type: Boolean,
            default: false,
        },
        round: {
            type: Boolean,
            default: false,
        },
        hit: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: '',
        },
        closeLabel: {
            type: String,
            default: 'Close tag',
        },
        disableTransitions: {
            type: Boolean,
            default: false,
        },
    })

    const emit = defineEmits(['close', 'click'])

    const typeColors = {
        primary: 'blue',
        success: 'green',
        info: 'gray',
        warning: 'orange',
        danger: 'red',
    }

    const resolvedVariant = computed(() => typeColors[props.type] || props.variant)

    const tagClasses = computed(() => [
        'status-tag',
        `status-tag--${resolvedVariant.value}`,
        `status-tag--${props.effect}`,
        `status-tag--${props.size}`,
        {
            'status-tag--round': props.round,
            'status-tag--hit': props.hit,
            'status-tag--no-transition': props.disableTransitions,
        },
    ])

    const closeTag = event => {
        event.stopPropagation()
        emit('close', event)
    }
</script>

<template>
    <span
        v-if="tag === 'button' && closable"
        :class="tagClasses"
        :style="color ? { '--tag-color': color } : undefined"
    >
        <button class="status-tag__action" type="button" @click="emit('click', $event)">
            <span class="status-tag__content"><slot /></span>
        </button>
        <button
            class="status-tag__close"
            type="button"
            :aria-label="closeLabel"
            @click.stop="closeTag"
        >
            <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="m3 3 6 6M9 3 3 9" />
            </svg>
        </button>
    </span>
    <component
        v-else
        :is="tag"
        :class="tagClasses"
        :style="color ? { '--tag-color': color } : undefined"
        :type="tag === 'button' ? 'button' : undefined"
        @click="emit('click', $event)"
    >
        <span class="status-tag__content"><slot /></span>
        <button
            v-if="closable"
            class="status-tag__close"
            type="button"
            :aria-label="closeLabel"
            @click.stop="closeTag"
        >
            <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="m3 3 6 6M9 3 3 9" />
            </svg>
        </button>
    </component>
</template>

<style scoped lang="scss">
    .status-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        min-height: 24px;
        padding: 0 9px;
        background-color: color-mix(in srgb, var(--tag-color) 10%, var(--c-white));
        color: var(--tag-color);
        font-size: 12px;
        line-height: 1;
        white-space: nowrap;
        border: 1px solid color-mix(in srgb, var(--tag-color) 35%, var(--c-white));
        border-radius: 4px;
        transition: color var(--fast-trans), background-color var(--fast-trans), border-color var(--fast-trans);
    }

    .status-tag--green {
        --tag-color: var(--c-status__green);
    }

    .status-tag--blue {
        --tag-color: var(--c-status__blue);
    }

    .status-tag--gray {
        --tag-color: var(--c-status__gray);
    }

    .status-tag--yellow {
        --tag-color: var(--c-status__yellow);
    }

    .status-tag--orange {
        --tag-color: var(--c-status__orange);
    }

    .status-tag--red {
        --tag-color: var(--c-status__red);
    }

    .status-tag--dark {
        background-color: var(--tag-color);
        color: var(--c-white);
        border-color: var(--tag-color);
    }

    .status-tag--plain {
        background-color: transparent;
        border-color: var(--tag-color);
    }

    .status-tag--large {
        min-height: 32px;
        padding-inline: 11px;
        font-size: 14px;
    }

    .status-tag--small {
        min-height: 20px;
        padding-inline: 7px;
        font-size: 11px;
    }

    .status-tag--round {
        border-radius: 999px;
    }

    .status-tag--hit {
        border-color: var(--tag-color);
    }

    .status-tag--no-transition {
        transition: none;
    }

    button.status-tag {
        cursor: pointer;
    }

    .status-tag__content {
        display: inline-flex;
        align-items: center;
    }

    .status-tag__action,
    .status-tag__close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        background: transparent;
        border: 0;
        cursor: pointer;
    }

    .status-tag__action {
        color: inherit;
        font: inherit;
    }

    .status-tag__close {
        width: 14px;
        height: 14px;
        color: inherit;
        border-radius: 50%;
    }

    .status-tag__action:focus-visible,
    .status-tag__close:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 1px;
    }

    .status-tag__close svg {
        width: 10px;
        height: 10px;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-width: 1.5;
    }
</style>
