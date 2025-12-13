
<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        modelValue: {
            type: [String, Number],
            default: "",
        },
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

    const emit = defineEmits(['update:modelValue', 'update:toValue']);

    const inputValue = computed(() => {
        return props.modelValue !== "" ? props.modelValue : props.toValue;
    });

    const handleInput = (event) => {
        const value = event.target.value;
        emit('update:modelValue', value);
        emit('update:toValue', value);
    };
</script>


<template>
    <input
        :type="input_type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleInput"
        class="input-ele"
    />
</template>


<style scoped>
    .input-ele {
        display: inline-block;
        height: 100%;
        flex-shrink: 0;
        background-color: transparent;
        resize: none;
        text-overflow: ellipsis;
        border: none;
        outline: none;
    }
</style>

