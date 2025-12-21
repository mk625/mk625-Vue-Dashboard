
<script setup>
    // imports
        import { watch } from 'vue';
        import { defineEmits } from 'vue';
    // \\\ imports

    const emit = defineEmits(['update:show']);


    const props = defineProps({
        message: {
            type: String,
            required: true,
        },
        show: {
            type: Boolean,
            default: false,
        }
    });
    watch(props.show, (newVal) => {
        if (newVal) {
            setTimeout(() => {
                emit('update:show', false);
            }, 3000);
        }
    });
</script>


<template>
    <Transition>
        <div v-if="show" class="toaster-container status-theme-green">
            <div class="d-flx aI-C g-10">
                <div class="icon-box">
                    <i class="bi bi-check2 f20 c-status"></i>
                </div>
                <div class="fG-1">
                    <p> {{ message }} </p>
                </div>
            </div>
        </div>
    </Transition>
</template>


<style scoped>
    .v-enter-active,
    .v-leave-active {
        transition: var(--fast-trans);
    }
    .v-enter-from,
    .v-leave-to {
        top: 20px;
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(-10px);
    }

    .toaster-container {
        position: fixed;
        top: 5px;
        opacity: 0;
        visibility: hidden;
        left: 50%;
        padding-block: 8px;
        padding-inline: 12px 18px;
        transform: translateX(-50%);
        background-color: var(--c-status-98);
        box-shadow: var(--c-shadow);
        border-radius: 8px;
        border: 1px solid var(--c-status-90);
    }
    .icon-box {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: var(--c-status-95);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
