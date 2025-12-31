
<script setup>
    defineProps({
        disabled: {
            type: Boolean,
            default: false
        }
    });

    const modelValue = defineModel({
        type: Boolean,
        default: false
    });
</script>


<template>
    <label
        :class="['m-toggle', {'m-toggle__disabled': disabled}]"
    >
        <input
            type="checkbox"
            class="m-toggle__input"
            :disabled="disabled"
            v-model="modelValue"
        />

        <span class="m-toggle__track">
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
