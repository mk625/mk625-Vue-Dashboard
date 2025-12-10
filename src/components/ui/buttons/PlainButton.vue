<script setup>
    const props = defineProps({
        tag: {
            type: String,
            default: "button",
            validator: value => ['button', 'a', 'span'].includes(value)
        },
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'button'
        },
        ariaLabel: {
            type: String,
            default: ''
        },
        testId: {
            type: String,
            default: ''
        }
    })

    const emit = defineEmits(['click'])

    const handleClick = (event) => {
        if (props.disabled) {
            event.preventDefault()
            return
        }
        emit('click', event)
    }
</script>


<template>
    <component
        :is="tag"
        class="plain-btn"
        :disabled="disabled"
        :type="type"
        :aria-label="ariaLabel"
        :data-testid="testId"
        @click="handleClick"
    >
        <slot></slot>
    </component>
</template>


<style scoped lang="scss">
    .plain-btn {
        display: inline-block;
        @include btn-reset;
    }
</style>
