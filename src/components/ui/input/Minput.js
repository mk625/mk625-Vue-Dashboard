
import { computed, nextTick, ref, watch } from 'vue';

export function useInput(props, modelValue) {
    const passwordVisible = ref(false);
    const inputRef = ref(null);

    const actualType = computed(() => {
        if (props.type === 'password' && passwordVisible.value) {
            return 'text';
        }

        return props.type;
    });

    const hasValue = computed(() => {
        return modelValue.value !== '' && modelValue.value !== null;
    });

    const showClearButton = computed(() => {
        return props.clearable
            && hasValue.value
            && !props.disabled
            && !props.readonly;
    });

    const showPasswordButton = computed(() => {
        return props.show_password
            && props.type === 'password'
            && !props.disabled
            && !props.readonly;
    });

    const characterCount = computed(() => {
        return String(modelValue.value ?? '').length;
    });

    function clear() {
        modelValue.value = '';
        nextTick(() => inputRef.value?.focus());
    }

    function togglePassword() {
        passwordVisible.value = !passwordVisible.value;
    }

    function focus() {
        inputRef.value?.focus();
    }

    function blur() {
        inputRef.value?.blur();
    }

    function select() {
        inputRef.value?.select();
    }

    function resizeTextarea() {
        const element = inputRef.value;

        if (!element || props.type !== 'textarea' || !props.autosize) {
            return;
        }

        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    }

    watch(
        () => [modelValue.value, props.autosize, props.rows],
        () => nextTick(resizeTextarea)
    );

    return {
        inputRef,
        actualType,
        hasValue,
        showClearButton,
        showPasswordButton,
        characterCount,
        clear,
        togglePassword,
        focus,
        blur,
        select,
        resizeTextarea
    };
}

