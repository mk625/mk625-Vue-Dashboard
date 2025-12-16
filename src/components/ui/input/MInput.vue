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
    <div class="input-box">
        <div class="d-flx aI-C g-8 h100pe">
            <slot v-if="pre_icon" name="prefix">
                <i :class="['bi', pre_icon]"></i>
            </slot>
            <input
                class="fG-1 m-input"
                :type="type"
                v-model="modelValue"
                :placeholder="placeholder"
            />
            <slot v-if="suf_icon" name="suffix">
                <i :class="['bi', suf_icon]"></i>
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
