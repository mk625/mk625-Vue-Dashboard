<script setup>
const modelValue = defineModel({
    type: [String, Number],
    default: ''
});

defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    input_type: {
        type: String,
        default: 'text'
    }
});
</script>


<template>
    <input
        class="input-ele"
        :type="input_type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="modelValue = $event.target.value"
    />
</template>


<style scoped>
    .input-ele {
        display: inline-block;
        height: 100%;
        flex-shrink: 0;

        background-color: transparent;
        border: none;
        outline: none;

        text-overflow: ellipsis;
    }
</style>
