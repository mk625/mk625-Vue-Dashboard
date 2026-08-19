
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
                type: {
                    type: String,
                    default: 'primary',
                    validator: (value) => ['primary', 'secondary'].includes(value)
                },
                title: {
                    type: String,
                    default: 'Edit employee'
                },
                isLoading: {
                    type: Boolean,
                    default: false
                }
            });
        // \\\ from parent

        // local
            const emit = defineEmits(['close', 'update:show', 'submit', 'know-more']);

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
    <Teleport to="body">
        <div :class="['right-dialog', `dialog__${type}`]" v-if="show">
            <header class="right-dialog-header">
                <slot name="header">
                    <div class="h100pe d-flx aI-C jC-SB g-20 h100">
                        <div>
                            <div>
                                <h4 class="f18"> {{ title }} </h4>
                            </div>
                        </div>
        
                        <div>
                            <HovIconCirlce class="right-dialog-close-btn" @click="handleClose" />
                        </div>
                    </div>
                </slot>
            </header>
    
    
            <section class="right-dialog-body">
                <slot name="body"></slot>
            </section>
    
            
            <footer class="right-dialog-footer">
                <slot name="footer">
                    <div class="d-flx aI-C g-10">
                        <MButton
                            variant="secondary"
                            @click="handleClose"
                        >
                            Cancel
                        </MButton>
    
                        <MButton
                            type="submit"
                            btn_view="loader"
                            :isLoading="isLoading"
                            @click="emit('submit')"
                        >
                            Save
                        </MButton>
                    </div>
                </slot>
            </footer>
        </div>
    </Teleport>
</template>


<style scoped>
    .right-dialog {
        --w-right-dialog: var(--w-dialog-primary, 560px);        
        --h-right-dialog-height: var(--h-dialog-primary, 100vh);

        --h-right-dialog-header: var(--h-dialog-primary-header, 64px);
        --h-right-dialog-footer: var(--h-dialog-primary-footer, 72px);

        width: var(--w-right-dialog);
        height: var(--h-right-dialog-height);
        background-color: var(--c-white);
        box-shadow: -7px 0px 26px 0px rgb(0 0 0 / 6%);
        position: fixed;
        top: 0px;
        bottom: 0px;
        border-inline-start: 1px solid var(--c-gray-90);
        z-index: 10;
    }
    .right-dialog.dialog__primary {
        inset-inline-end: 0px;
    }
    .right-dialog.dialog__primary.size__sm {
        --w-right-dialog: var(--w-dialog-secondary, 480px);
    }
    .right-dialog.dialog__primary.size__lg {
        --w-right-dialog: 660px;
    }
    
    /* secondary dialog */
    .right-dialog.dialog__secondary {
        --w-secondary-dialog: var(--w-dialog-secondary, 480px);
        width: var(--w-secondary-dialog);
        inset-inline-end: var(--w-dialog-primary, 560px);
    }
    .right-dialog.dialog__secondary.size__sm {
        --w-secondary-dialog: 420px;
    }
    .right-dialog.dialog__secondary.size__lg {
        --w-secondary-dialog: 560px;
    }


    .right-dialog .right-dialog-header {
        height: var(--h-right-dialog-header);
        padding: 0px 20px;
        border-bottom: 1px solid var(--c-border-default);
    }
    .right-dialog .right-dialog-close-btn {
        font-size: 18px;
    }
    .right-dialog .right-dialog-body {
        height: calc(100% - (var(--h-right-dialog-header) + var(--h-right-dialog-footer)));
        padding: 20px;
        overflow-y: auto;
    }
    .right-dialog .right-dialog-body.without-padding {
        padding: 0px;
    }
    .right-dialog-footer {
        display: flex;
        align-items: center;
        height: var(--h-right-dialog-footer);
        padding: 0px 20px;
        border-top: 1px solid var(--c-border-default);
    }
</style>
