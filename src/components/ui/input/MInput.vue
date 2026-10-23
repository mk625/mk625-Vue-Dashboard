
<script setup>
import { useInput } from './useInput.js';
import SpinLoader from '../general/SpinLoader.vue';

// Props
const props = defineProps({
    type: {
        type: String,
        default: 'text',
        validator: (value) => [
            'text',
            'email',
            'password',
            'tel',
            'search',
            'url',
            'number',
            'textarea'
        ].includes(value)
    },
    placeholder: {
        type: String,
        default: ''
    },
    input_id: {
        type: String,
        default: ''
    },
    autocomplete: {
        type: String,
        default: ''
    },
    pre_icon: {
        type: String,
        default: ''
    },
    suf_icon: {
        type: String,
        default: ''
    },
    full_width: {
        type: Boolean,
        default: false
    },
    aria_invalid: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    clearable: {
        type: Boolean,
        default: false
    },
    show_password: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    maxlength: {
        type: Number,
        default: undefined
    },
    minlength: {
        type: Number,
        default: undefined
    },
    show_word_limit: {
        type: Boolean,
        default: false
    },
    rows: {
        type: Number,
        default: 2
    },
    autosize: {
        type: Boolean,
        default: false
    }
});

// Model
const modelValue = defineModel({
    type: [String, Number],
    default: ''
});

// Events
const emit = defineEmits(['input', 'change', 'focus', 'blur', 'clear']);

// Input logic
const {
    inputRef,
    actualType,
    showClearButton,
    showPasswordButton,
    characterCount,
    clear,
    togglePassword,
    focus,
    blur,
    select,
    resizeTextarea
} = useInput(props, modelValue);

// Exposed methods
defineExpose({
    focus,
    blur,
    select,
    clear
});

// Event handlers
function handleInput(event) {
    emit('input', event);
    resizeTextarea();
}

function handleChange(event) {
    emit('change', event);
}

function handleFocus(event) {
    emit('focus', event);
}

function handleBlur(event) {
    emit('blur', event);
}

function handleClear() {
    clear();
    emit('clear');
}
</script>


<template>
    <div
        :class="[
            'input-box',
            {
                'input-box--full': full_width,
                'input-box--disabled': disabled
            }
        ]"
    >
        <div class="d-flx aI-C g-8 h100pe">
            <!-- Prefix -->
            <slot name="prefix">
                <i
                    v-if="pre_icon"
                    :class="['bi', pre_icon]"
                    aria-hidden="true"
                ></i>
            </slot>

            <!-- Input -->
            <textarea
                v-if="type === 'textarea'"
                ref="inputRef"
                v-model="modelValue"
                v-bind="$attrs"
                class="fG-1 m-input m-textarea"
                :id="input_id || undefined"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :maxlength="maxlength"
                :minlength="minlength"
                :rows="rows"
                :aria-invalid="aria_invalid ? 'true' : undefined"
                @input="handleInput"
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
            ></textarea>

            <input
                v-else
                ref="inputRef"
                v-model="modelValue"
                v-bind="$attrs"
                class="fG-1 m-input"
                :id="input_id || undefined"
                :type="actualType"
                :placeholder="placeholder"
                :autocomplete="autocomplete || undefined"
                :disabled="disabled"
                :readonly="readonly"
                :maxlength="maxlength"
                :minlength="minlength"
                :aria-invalid="aria_invalid ? 'true' : undefined"
                @input="handleInput"
                @change="handleChange"
                @focus="handleFocus"
                @blur="handleBlur"
            />

            <!-- Loading -->
            <SpinLoader v-if="loading" />

            <!-- Clear button -->
            <button
                v-if="showClearButton"
                type="button"
                aria-label="Clear input"
                @click="handleClear"
            >
                <i class="bi bi-x-circle" aria-hidden="true"></i>
            </button>

            <!-- Password toggle -->
            <button
                v-if="showPasswordButton"
                type="button"
                :aria-label="actualType === 'password' ? 'Show password' : 'Hide password'"
                @click="togglePassword"
            >
                <i
                    :class="[
                        'bi',
                        actualType === 'password' ? 'bi-eye' : 'bi-eye-slash'
                    ]"
                    aria-hidden="true"
                ></i>
            </button>

            <!-- Suffix -->
            <slot name="suffix">
                <i
                    v-if="suf_icon"
                    :class="['bi', suf_icon]"
                    aria-hidden="true"
                ></i>
            </slot>
        </div>

        <!-- Character count -->
        <div
            v-if="show_word_limit && maxlength"
            class="input-count"
        >
            {{ characterCount }} / {{ maxlength }}
        </div>
    </div>
</template>


<style scoped>
.input-box {
    max-width: 280px;
    width: 100%;
    height: var(--h-input);
    padding-inline: 12px;
    border-radius: var(--br-radius-input);
    border: 1px solid var(--c-input-br);
    transition: var(--default-trans);
}

.input-box--full {
    max-width: none;
}

.input-box:hover {
    border-color: var(--c-gray-80);
    box-shadow: var(--input-box-shad-hov);
}

.input-box:focus-within {
    border-color: var(--c-input-br-foc);
    box-shadow: var(--input-box-shad-foc);
}

.input-box--disabled {
    cursor: not-allowed;
    opacity: 0.6;
}

.m-input {
    min-width: 0;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    line-height: inherit;
    font-family: inherit;
    outline: none;
}

.m-textarea {
    resize: vertical;
    overflow: auto;
}

.input-count {
    padding-top: 4px;
    text-align: right;
    font-size: 12px;
    color: var(--c-gray-60);
}
</style>

