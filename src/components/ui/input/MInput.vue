
<script setup>
    // props (for standalone use)
        defineProps ({
            placeholder: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text',
                validator: (value) => ['text', 'email', 'password', 'tel', 'search'].includes(value)
            },
            pre_icon: {
                type: String,
            },
            suf_icon: {
                type: String,
            },
            full_width: {
                type: Boolean,
                default: false
            },
            input_id: {
                type: String,
                default: ''
            },
            autocomplete: {
                type: String,
                default: ''
            },
            aria_invalid: {
                type: Boolean,
                default: false
            }
        });
    // \\\ props

    // model
        const modelValue = defineModel({
            type: [String, Number],
            default: ''
        });
    // \\\ model
</script>


<template>
    <div :class="['input-box', { 'input-box--full': full_width }]">
        <div class="d-flx aI-C g-8 h100pe">
            <slot v-if="pre_icon || $slots.prefix" name="prefix">
                <i :class="['bi', pre_icon]" aria-hidden="true"></i>
            </slot>
            <input
                class="fG-1 m-input"
                :id="input_id || undefined"
                :type="type"
                v-model="modelValue"
                :placeholder="placeholder"
                :autocomplete="autocomplete || undefined"
                :aria-invalid="aria_invalid || undefined"
            />
            <slot v-if="suf_icon || $slots.suffix" name="suffix">
                <i :class="['bi', suf_icon]" aria-hidden="true"></i>
            </slot>
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
    .m-input {
        height: 100%;
        border: none;
        background-color: transparent;
        font-size: inherit;
        color: inherit;
        line-height: inherit;
        font-family: inherit;
        outline: none;
    }
</style>
