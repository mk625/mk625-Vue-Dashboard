

<script setup>
    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default: undefined
        },
        name: {
            type: String,
            default: undefined
        },
        disabled: {
            type: Boolean,
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        },
        ariaLabel: {
            type: String,
            default: undefined
        },
        ariaControls: {
            type: String,
            default: undefined
        }
    });

    const emit = defineEmits(['update:modelValue', 'change']);

    function handleChange(event) {
        const checked = event.target.checked;

        emit('update:modelValue', checked);
        emit('change', checked);
    }
</script>


<template>
    <label
        :class="[
            'app-checkbox',
            'aI-C',
            'g-8',
            disabled ? 'cur-not-allowed' : 'cur-pointer',
            {
                'app-checkbox--disabled': disabled,
                'app-checkbox--checked': modelValue,
                'app-checkbox--indeterminate': indeterminate
            }
        ]"
    >
        <input
            :id="id"
            class="app-checkbox__input"
            type="checkbox"
            :name="name"
            :checked="modelValue"
            :disabled="disabled"
            :aria-label="ariaLabel"
            :aria-checked="indeterminate ? 'mixed' : modelValue"
            :aria-controls="indeterminate ? ariaControls : undefined"
            @change="handleChange"
        >

        <span class="app-checkbox__box s16 fS-0" aria-hidden="true">
            <span class="app-checkbox__indicator hide"></span>
        </span>

        <span class="app-checkbox__label">
            <slot />
        </span>
    </label>
</template>


<style scoped lang="scss">
    .app-checkbox {
        display: inline-flex;
    }

    .app-checkbox__input {
        @include visually-hidden;

        @include focus-visible {
            + .app-checkbox__box {
                outline: 2px solid var(--c-app-theme);
                outline-offset: 2px;
            }
        }
    }

    .app-checkbox__box {
        @include Inflex-AI-JC;

        background-color: var(--c-white);
        border: 1px solid var(--c-input-br);
        border-radius: 3px;
    }

    .app-checkbox__indicator {
        width: 4px;
        height: 8px;
        border-style: solid;
        border-color: var(--c-white);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .app-checkbox--checked .app-checkbox__box,
    .app-checkbox--indeterminate .app-checkbox__box {
        background-color: var(--c-app-theme);
        border-color: var(--c-app-theme);
    }

    .app-checkbox--checked .app-checkbox__indicator,
    .app-checkbox--indeterminate .app-checkbox__indicator {
        display: block;
    }

    .app-checkbox--indeterminate .app-checkbox__indicator {
        width: 8px;
        height: 2px;
        background-color: var(--c-white);
        border: 0;
        transform: none;
    }

    .app-checkbox--disabled {
        opacity: 0.5;
    }
</style>

