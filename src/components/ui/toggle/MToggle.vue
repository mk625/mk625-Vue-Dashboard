
<script setup>
    import { computed, watch } from 'vue';

    // Props that mirror Element Plus Switch essential features
    const props = defineProps({
        disabled: { type: Boolean, default: false },
        size: { type: String, default: 'default' }, // 'large' | 'default' | 'small'
        loading: { type: Boolean, default: false },
        activeColor: { type: String, default: '' },
        inactiveColor: { type: String, default: '' },
        activeText: { type: String, default: '' },
        inactiveText: { type: String, default: '' },
        activeIcon: { type: String, default: '' }, // name of icon component (e.g., 'Check')
        inactiveIcon: { type: String, default: '' },
        width: { type: Number, default: null }, // custom width in px when set
        beforeChange: { type: Function, default: null }
    });

    const emit = defineEmits(['change', 'update:modelValue']);

    // v-model binding for the boolean value
    const modelValue = defineModel({
        type: Boolean,
        default: false
    });

    // Compute classes based on state
    const sizeClass = computed(() => {
        return {
            large: 'm-toggle--large',
            small: 'm-toggle--small',
            default: ''
        }[props.size] || '';
    });
    const loadingClass = computed(() => (props.loading ? 'm-toggle--loading' : ''));
    const disabledClass = computed(() => (props.disabled ? 'm-toggle__disabled' : ''));

    // Inline style for track (colors & width)
    const trackStyle = computed(() => {
        const style = {};
        if (modelValue.value) {
            if (props.activeColor) style['background-color'] = props.activeColor;
        } else {
            if (props.inactiveColor) style['background-color'] = props.inactiveColor;
        }
        if (props.width) style['width'] = `${props.width}px`;
        return style;
    });

    // Handle click / change with optional beforeChange hook
    const toggle = async () => {
        if (props.disabled || props.loading) return;
        if (props.beforeChange) {
            const result = await props.beforeChange();
            if (result === false) return;
        }
        const newVal = !modelValue.value;
        modelValue.value = newVal;
        emit('update:modelValue', newVal);
        emit('change', newVal);
    };

    // Sync external changes to emit event (optional, for completeness)
    watch(() => modelValue.value, (val) => {
        emit('change', val);
    });
</script>


<template>
    <label
        :class="['m-toggle', sizeClass, loadingClass, disabledClass]"
        @click.prevent="toggle"
    >
        <input
            type="checkbox"
            class="m-toggle__input"
            :disabled="disabled || loading"
            v-model="modelValue"
        />

        <span class="m-toggle__track" :style="trackStyle">
            <!-- optional texts -->
            <span v-if="modelValue && activeText" class="m-toggle__text m-toggle__text--active">{{ activeText }}</span>
            <span v-else-if="!modelValue && inactiveText" class="m-toggle__text m-toggle__text--inactive">{{ inactiveText }}</span>
            <!-- optional icons -->
            <component v-if="modelValue && activeIcon" :is="activeIcon" class="m-toggle__icon m-toggle__icon--active" />
            <component v-else-if="!modelValue && inactiveIcon" :is="inactiveIcon" class="m-toggle__icon m-toggle__icon--inactive" />
            <span class="m-toggle__knob"></span>
        </span>
    </label>
</template>


<style scoped>
    .m-toggle {
        display: inline-flex;
        align-items: center;
        width: 30px;
        height: 18px;
        cursor: pointer;
    }
    /* size variants */
    .m-toggle--large {
        width: 40px;
        height: 24px;
    }
    .m-toggle--large .m-toggle__knob {
        width: 20px;
        height: 20px;
        transform: translateX(0);
    }
    .m-toggle--large .m-toggle__input:checked + .m-toggle__track .m-toggle__knob {
        transform: translateX(16px);
    }
    .m-toggle--small {
        width: 24px;
        height: 14px;
    }
    .m-toggle--small .m-toggle__knob {
        width: 10px;
        height: 10px;
        transform: translateX(0);
    }
    .m-toggle--small .m-toggle__input:checked + .m-toggle__track .m-toggle__knob {
        transform: translateX(8px);
    }
    /* loading state */
    .m-toggle--loading {
        opacity: 0.6;
        pointer-events: none;
    }
    /* text */
    .m-toggle__text {
        font-size: 12px;
        margin: 0 4px;
    }
    .m-toggle__icon {
        font-size: 14px;
        margin: 0 2px;
    }

    /* real checkbox hidden */
    .m-toggle__input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    }

    /* track */
    .m-toggle__track {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 2px;
        background-color: var(--c-gray-85);
        border-radius: 12px;
        position: relative;
        transition: var(--fast-trans);
    }

    /* knob */
    .m-toggle__knob {
        width: 14px;
        height: 14px;
        background-color: var(--c-white);
        border-radius: 50%;
        transform: translateX(0);
        transition: var(--fast-trans);
    }

    /* checked */
    .m-toggle__input:checked + .m-toggle__track {
        background-color: var(--c-status__green);
    }

    .m-toggle__input:checked + .m-toggle__track .m-toggle__knob {
        transform: translateX(12px);
    }

    /* focus */
    .m-toggle__input:focus-visible + .m-toggle__track {
        outline: 2px solid var(--c-status__green);
        outline-offset: 2px;
    }

    /* disabled (IMPORTANT PART) */
    .m-toggle__disabled {
        cursor: not-allowed;
    }

    .m-toggle__input:disabled + .m-toggle__track {
        background-color: var(--c-gray-85);
        opacity: 0.6;
    }

    .m-toggle__input:disabled + .m-toggle__track .m-toggle__knob {
        background-color: var(--c-gray-95);
    }
</style>
