
<script setup>
    // imports
        import HovIconCirlce from '@/components/ui/buttons/HovIconCirlce.vue';
        import MButton from '@/components/ui/buttons/MButton.vue';
    // \\\ imports


    defineProps({
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Edit employee'
        }
    });

    const emit = defineEmits(['close', 'update:show']);

    const handleClose = () => {
        emit('update:show', false);
        emit('close');
    };
</script>


<template>
    <div class="right-dialog" v-if="show">
        <header class="right-dialog-header">
            <div class="h100pe d-flx aI-C jC-SB g-20 h100">
                <div>
                    <h4 class="f18"> {{ title }} </h4>
                </div>

                <div>
                    <HovIconCirlce class="right-dialog-close-btn" @click="handleClose" />
                </div>
            </div>
        </header>

        <section class="right-dialog-body">
            <slot name="body"></slot>
        </section>

        <footer class="right-dialog-footer">
            <div class="d-flx aI-C g-10">
                <MButton variant="secondary" size="size-sm" @click="handleClose">
                    Cancel
                </MButton>
                <MButton variant="primary" size="size-sm" @click="handleSubmit">
                    Save
                </MButton>
            </div>
        </footer>
    </div>
</template>


<style scoped>
    .right-dialog {
        --h-right-dialog-width: 560px;
        --h-right-dialog-height: 100vh;

        --h-right-dialog-header: 64px;
        --h-right-dialog-footer: 72px;

        width: var(--h-right-dialog-width);
        height: var(--h-right-dialog-height);
        background-color: var(--c-white);
        box-shadow: -7px 0px 26px 0px rgb(0 0 0 / 6%);
        position: fixed;
        top: 0px;
        bottom: 0px;
        inset-inline-end: 0px;
        border-inline-start: 1px solid var(--c-gray-90);
        z-index: 10;
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
