<script setup>
    // imports
        import { onMounted, onUnmounted } from 'vue';
        import HovIconCirlce from '@/components/ui/buttons/HovIconCirlce.vue';
        import MButton from '@/components/ui/buttons/MButton.vue';
    // \\\ imports


    // global variables
        // from parent
            const props = defineProps({
                show: {
                    type: Boolean,
                    default: false
                },
                title: {
                    type: String,
                    default: 'Know More'
                },
                isLoading: {
                    type: Boolean,
                    default: false
                }
            });
        // \\\ from parent

        // local
            const emit = defineEmits(['close', 'update:show', 'submit']);

            const handleClose = () => {
                emit('update:show', false);
                emit('close');
            };

            const handleEscapeKey = (event) => {
                if (event.key === 'Escape' && props.show) {
                    handleClose();
                }
            };

            onMounted(() => {
                document.addEventListener('keydown', handleEscapeKey);
            });

            onUnmounted(() => {
                document.removeEventListener('keydown', handleEscapeKey);
            });
        // \\\ local
    // \\\ global variables
</script>


<template>
    <div class="know-more-dialog" v-if="show">
        <header class="know-more-dialog-header">
            <slot name="header">
                <div class="h100pe d-flx aI-C jC-SB g-20 h100">
                    <div>
                        <h4 class="f18"> {{ title }} </h4>
                    </div>
    
                    <div>
                        <HovIconCirlce class="know-more-dialog-close-btn" @click="handleClose" />
                    </div>
                </div>
            </slot>
        </header>


        <section class="know-more-dialog-body">
            <slot name="body"></slot>
        </section>

        
        <footer class="know-more-dialog-footer">
            <slot name="footer">
                <div class="d-flx aI-C g-10">
                    <MButton
                        variant="secondary"
                        @click="handleClose"
                    >
                        Close
                    </MButton>

                    <MButton
                        type="submit"
                        btn_view="loader"
                        :isLoading="isLoading"
                        @click="emit('submit')"
                    >
                        Confirm
                    </MButton>
                </div>
            </slot>
        </footer>
    </div>
</template>


<style scoped>
    .know-more-dialog {
        --h-know-more-dialog-width: var(--w-dialog-secondary, 480px);
        --h-know-more-dialog-height: var(--h-dialog-secondary, 100vh);

        --h-know-more-dialog-header: var(--h-dialog-secondary-header, 56px);
        --h-know-more-dialog-footer: var(--h-dialog-secondary-footer, 64px);

        width: var(--h-know-more-dialog-width);
        height: var(--h-know-more-dialog-height);
        background-color: var(--c-white);
        box-shadow: -7px 0px 26px 0px rgb(0 0 0 / 8%);
        position: fixed;
        top: 0px;
        bottom: 0px;
        inset-inline-end: 0px;
        border-inline-start: 1px solid var(--c-border-default);
        z-index: 20;
    }
    .know-more-dialog .know-more-dialog-header {
        height: var(--h-know-more-dialog-header);
        padding: 0px 20px;
        border-bottom: 1px solid var(--c-border-default);
    }
    .know-more-dialog .know-more-dialog-close-btn {
        font-size: 16px;
    }
    .know-more-dialog .know-more-dialog-body {
        height: calc(100% - (var(--h-know-more-dialog-header) + var(--h-know-more-dialog-footer)));
        padding: 20px;
        overflow-y: auto;
    }
    .know-more-dialog .know-more-dialog-body.without-padding {
        padding: 0px;
    }
    .know-more-dialog-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: var(--h-know-more-dialog-footer);
        padding: 0px 20px;
        border-top: 1px solid var(--c-border-default);
    }
</style>
