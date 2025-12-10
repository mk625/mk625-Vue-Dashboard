
<script setup>
    defineProps({
        toValue: {
            type: [String, Number],
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        input_type: {
            type: String,
            default: "text",
        },
    });

    const emit = defineEmits(['update:toValue']);

    const handleInput = (event) => {
        emit('update:toValue', event.target.value);
    };
</script>


<template>
    <input
        :type="input_type"
        :value="toValue"
        :placeholder="placeholder"
        @input="handleInput"
        class="input-ele"
    />
</template>


<style scoped>
    .input-ele {
        display: inline-block;
        max-width: 300px;
        width: 100%;
        height: var(--h-input);
        padding-inline: 12px;
        background-color: var(--c-white);
        font-size: 14px;
        resize: none;
        text-overflow: ellipsis;
        border-radius: var(--br-radius-input);
        border: 1px solid var(--c-input-br);
        outline: none;
        transition: var(--default-trans);
    }

    .input-ele:hover {
        border-color: var(--c-gray-80);
        box-shadow: var(--input-box-shad-hov);
    }

    .input-ele:focus {
        border-color: var(--c-input-br-foc);
        box-shadow: var(--input-box-shad-foc);
    }
</style>

