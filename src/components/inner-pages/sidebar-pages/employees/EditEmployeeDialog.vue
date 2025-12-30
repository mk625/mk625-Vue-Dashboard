<script setup>
    // imports
        import RightDialog from '@/components/ui/dialog/RightDialog.vue';
    // \\\ imports

    defineProps({
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
        },
    })

    const handleClose = () => {
        emit('close');
    };

    const emit = defineEmits(['close']);
</script>


<template>
    <RightDialog
        v-model:show="showEditEmployeeDialog"
        :title="title"
        :description="rightDialogDescription"
        @close="handleClose"
    >
        <template #body>
            <div data-v-b6553223="" class="d-flx fD-C g-20">
                <div data-v-b6553223="" class="d-flx aI-C jC-S g-20">
                    <div data-v-b6553223="" class="w50pe">
                        <div data-v-131757a0="" data-v-b6553223="" class="mB5">
                            <label data-v-131757a0="" class="input-label"><span data-v-131757a0="" class="input-label__text">First Name</span></label>
                        </div>
                        <div data-v-673fc4e2="" data-v-b6553223="" class="input-box">
                            <div data-v-673fc4e2="" class="d-flx aI-C g-8 h100pe">
                                <!--v-if-->
                                <input data-v-673fc4e2="" class="fG-1 m-input" type="text" placeholder="Enter First Name" />
                                <!--v-if-->
                            </div>
                        </div>
                    </div>
                    <div data-v-b6553223="" class="w50pe">
                        <div data-v-131757a0="" data-v-b6553223="" class="mB5">
                            <label data-v-131757a0="" class="input-label"><span data-v-131757a0="" class="input-label__text">Last Name</span></label>
                        </div>
                        <div data-v-673fc4e2="" data-v-b6553223="" class="input-box">
                            <div data-v-673fc4e2="" class="d-flx aI-C g-8 h100pe">
                                <!--v-if-->
                                <input data-v-673fc4e2="" class="fG-1 m-input" type="text" placeholder="Enter Last Name" />
                                <!--v-if-->
                            </div>
                        </div>
                    </div>
                </div>
                <div data-v-b6553223="">
                    <div data-v-b6553223="" class="d-flx aI-C jC-S g-20">
                        <div data-v-b6553223="" class="w50pe">
                            <div data-v-131757a0="" data-v-b6553223="" class="mB5">
                                <label data-v-131757a0="" class="input-label"><span data-v-131757a0="" class="input-label__text">Email</span></label>
                            </div>
                            <div data-v-673fc4e2="" data-v-b6553223="" class="input-box">
                                <div data-v-673fc4e2="" class="d-flx aI-C g-8 h100pe">
                                    <!--v-if-->
                                    <input data-v-673fc4e2="" class="fG-1 m-input" type="email" placeholder="Enter Email" />
                                    <!--v-if-->
                                </div>
                            </div>
                        </div>
                        <div data-v-b6553223="" class="w50pe">
                            <div data-v-131757a0="" data-v-b6553223="" class="mB5">
                                <label data-v-131757a0="" class="input-label"><span data-v-131757a0="" class="input-label__text">Phone</span></label>
                            </div>
                            <div data-v-673fc4e2="" data-v-b6553223="" class="input-box">
                                <div data-v-673fc4e2="" class="d-flx aI-C g-8 h100pe">
                                    <!--v-if-->
                                    <input data-v-673fc4e2="" class="fG-1 m-input" type="tel" placeholder="Enter Phone" />
                                    <!--v-if-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-v-b6553223="">
                    <div data-v-b6553223="">
                        <div data-v-b6553223="" class="w50pe">
                            <div data-v-131757a0="" data-v-b6553223="" class="mB5">
                                <label data-v-131757a0="" class="input-label"><span data-v-131757a0="" class="input-label__text">Location</span></label>
                            </div>
                            <div data-v-673fc4e2="" data-v-b6553223="" class="input-box">
                                <div data-v-673fc4e2="" class="d-flx aI-C g-8 h100pe">
                                    <!--v-if-->
                                    <input data-v-673fc4e2="" class="fG-1 m-input" type="text" placeholder="Enter Location" />
                                    <!--v-if-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </template>
    </RightDialog>
</template>


<style scoped>

</style>
