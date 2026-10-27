
<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    message: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'info',
        validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    duration: {
        type: Number,
        default: 3000
    },
    closable: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['update:modelValue', 'close']);

const timer = ref(null);

const toastClasses = computed(() => ({
    [`m-toast--${props.type}`]: true
}));

function close() {
    clearTimer();

    emit('update:modelValue', false);
    emit('close');
}

function clearTimer() {
    if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
    }
}

function startTimer() {
    clearTimer();

    if (props.duration > 0 && props.modelValue) {
        timer.value = setTimeout(() => {
            close();
        }, props.duration);
    }
}

watch(
    () => props.modelValue,
    (isVisible) => {
        if (isVisible) {
            startTimer();
        } else {
            clearTimer();
        }
    }
);

watch(
    () => [props.message, props.duration],
    () => {
        if (props.modelValue) {
            startTimer();
        }
    }
);

onMounted(() => {
    if (props.modelValue) {
        startTimer();
    }
});

onBeforeUnmount(() => {
    clearTimer();
});
</script>


<template>
    <Transition name="m-toast">
        <div
            v-if="modelValue"
            class="m-toast"
            :class="toastClasses"
            :role="type === 'error' ? 'alert' : 'status'"
            aria-live="polite"
        >
            <span class="m-toast__message">
                {{ message }}
            </span>

            <button
                v-if="closable"
                class="m-toast__close"
                type="button"
                aria-label="Close notification"
                @click="close"
            >
                &times;
            </button>
        </div>
    </Transition>
</template>


<style scoped lang="scss">
.m-toast {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: fit-content;
    max-width: min(420px, calc(100vw - 32px));
    padding: 12px 16px;
    border: 1px solid transparent;
    border-radius: 8px;
    background-color: #ffffff;
    color: #303133;
    font-size: 14px;
    line-height: 1.5;
    box-shadow: 0 4px 16px rgb(0 0 0 / 12%);
}

.m-toast__message {
    overflow-wrap: anywhere;
}

.m-toast__close {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    opacity: 0.65;

    &:hover {
        opacity: 1;
    }

    &:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
        border-radius: 4px;
    }
}

.m-toast--success {
    border-color: #b3e6c8;
    background-color: #f0f9eb;
    color: #237a45;
}

.m-toast--error {
    border-color: #f5b7b1;
    background-color: #fef0f0;
    color: #c0392b;
}

.m-toast--warning {
    border-color: #f5d69a;
    background-color: #fdf6ec;
    color: #9a6700;
}

.m-toast--info {
    border-color: #b3d8ff;
    background-color: #ecf5ff;
    color: #2468a2;
}

.m-toast-enter-active,
.m-toast-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

.m-toast-enter-from,
.m-toast-leave-to {
    transform: translateY(-8px);
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .m-toast-enter-active,
    .m-toast-leave-active {
        transition: none;
    }
}
</style>