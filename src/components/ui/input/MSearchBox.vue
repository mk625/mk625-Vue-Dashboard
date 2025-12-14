
<script setup>
    import MInput from './MInput.vue';
    import NavButton from '../buttons/NavButton.vue';

    const modelValue = defineModel({ type: String });

    const props = defineProps({
        placeholder: {
            type: String,
            default: "",
        },
        searchIcon: {
            type: String,
            default: "bi bi-search",
        },
        showClearButton: {
            type: Boolean,
            default: true,
        },
    });

    const clearInput = () => {
        modelValue.value = "";
    };

    const shouldShowClearButton = () => {
        return props.showClearButton && modelValue.value && modelValue.value.length > 0;
    };
    // \\\ props
</script>


<template>
    <MInput
        v-model="modelValue"
        :placeholder="placeholder"
    >
        <template #prefix>
            <i :class="searchIcon"></i>
        </template>
        
        <template #suffix>
            <NavButton v-if="shouldShowClearButton()" @click="clearInput"/>
        </template>
    </MInput>
</template>


<style scoped>

</style>
