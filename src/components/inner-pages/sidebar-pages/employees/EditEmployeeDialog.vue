<script setup>
    // imports
        import { ref, watch } from 'vue';
        import { doc, updateDoc } from 'firebase/firestore';
        import db from '@/firebase';

        // ui components
            import MButton from '@/components/ui/buttons/MButton.vue';
            import MInput from '@/components/ui/input/MInput.vue';
            import MInputLabel from '@/components/ui/input/MInputLabel.vue';
            import RightDialog from '@/components/ui/dialog/RightDialog.vue';            import KnowMoreDialog from '@/components/ui/dialog/KnowMoreDialog.vue';            import ToastPop from '@/components/ui/popup/toast/ToastPop.vue';
        // \\\ ui components
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
                },
                employee: {
                    type: Object,
                    default: null,
                }
            })
        // \\\ from parent

        // local
            const formData = ref({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                location: ''
            });

            const isError = ref(false);
            const errorMessage = ref('');
            const showToast = ref(false);
            const toastMessage = ref('');
            const isLoading = ref(false);
            const showKnowMoreDialog = ref(false);
            const emit = defineEmits(['close', 'update:show', 'updated']);
        // \\\ local
    // \\\ global variables


    watch(() => props.employee, (newEmployee) => {
        if (newEmployee) {
            const employeeName = newEmployee.name || newEmployee.Name || '';

            formData.value = {
                firstName: newEmployee.firstName || employeeName.split(' ')[0] || '',
                lastName: newEmployee.lastName || employeeName.split(' ').slice(1).join(' ') || '',
                email: newEmployee.email || '',
                phone: newEmployee.phone || '',
                location: newEmployee.location || newEmployee.Location || ''
            };
        }
    }, { immediate: true });

    watch(() => props.show, (show) => {
        if (show) {
            isError.value = false;
            errorMessage.value = '';
        }
    });


    async function handleSubmit() {
        isError.value = false;
        errorMessage.value = '';

        if (isLoading.value) {
            return;
        }

        const updatedEmployee = {
            firstName: formData.value.firstName.trim(),
            lastName: formData.value.lastName.trim(),
            email: formData.value.email.trim(),
            phone: formData.value.phone.toString().trim(),
            location: formData.value.location.trim()
        };

        // Validate form
        if (Object.values(updatedEmployee).some((value) => !value)) {
            isError.value = true;
            errorMessage.value = 'Please fill in all the fields';
            return;
        }

        const employeeDocumentId = props.employee?.docId;

        if (!employeeDocumentId) {
            isError.value = true;
            errorMessage.value = 'Unable to find this employee in Firebase';
            return;
        }

        try {
            isLoading.value = true;

            const employeeRef = doc(db, 'users-list', employeeDocumentId);
            const fullName = `${updatedEmployee.firstName} ${updatedEmployee.lastName}`;

            await updateDoc(employeeRef, {
                name: fullName,
                email: updatedEmployee.email,
                phone: updatedEmployee.phone,
                location: updatedEmployee.location,
            });

            isError.value = false;
            toastMessage.value = 'Employee updated successfully';
            showToast.value = true;

            // Emit updated event for parent component
            emit('updated', {
                ...props.employee,
                docId: employeeDocumentId,
                ...updatedEmployee,
                name: fullName
            });

        } catch (error) {
            console.error('Error updating employee: ', error);
            isError.value = true;
            errorMessage.value = 'Employee could not be saved. Please try again';
        } finally {
            isLoading.value = false;
        }
    }

    function handleClose() {
        emit('update:show', false);
        emit('close');
    }

    function openKnowMoreDialog() {
        showKnowMoreDialog.value = true;
    }

    function closeKnowMoreDialog() {
        showKnowMoreDialog.value = false;
    }
</script>


<template>
    <RightDialog
        :show="show"
        :title="title"
        @submit="handleSubmit"
        :isLoading="isLoading"
        @update:show="emit('update:show', $event)"
        @close="handleClose"
    >
        <template #header>
            <div class="h100pe d-flx aI-C jC-SB g-20 h100">
                <div>
                    <div class="d-flx aI-C g-10">
                        <h4 class="f18"> {{ title }} </h4>
                        <button type="button" class="btn-link" @click="openKnowMoreDialog">Know More</button>
                    </div>
                </div>

                <div>
                    <button type="button" class="btn-link" @click="handleClose">Close</button>
                </div>
            </div>
        </template>

        <template #body>
            <form class="d-block" @submit.prevent="handleSubmit">
                <div class="d-flx fD-C g-20">
                    <div class="d-flx aI-C jC-S g-20">
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="First Name"/>
                            <MInput v-model="formData.firstName" placeholder="Enter First Name"/>
                        </div>
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Last Name"/>
                            <MInput v-model="formData.lastName" placeholder="Enter Last Name"/>
                        </div>
                    </div>

                    <div>
                        <div class="d-flx aI-C jC-S g-20">
                            <div class="w50pe">
                                <MInputLabel class="mB5" label_name="Email"/>
                                <MInput v-model="formData.email" type="email" placeholder="Enter Email"/>
                            </div>
                            <div class="w50pe">
                                <MInputLabel class="mB5" label_name="Phone"/>
                                <MInput v-model="formData.phone" type="tel" placeholder="Enter Phone"/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div class="w50pe">
                                <MInputLabel class="mB5" label_name="Location"/>
                                <MInput v-model="formData.location" placeholder="Enter Location"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="isError" class="mT15">
                    <p class="c-status-red">{{ errorMessage }}</p>
                </div>

            </form>
        </template>

        <template #footer>
            <div class="edit-employee-footer">
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
                        @click="handleSubmit"
                    >
                        Save
                    </MButton>
                </div>
            </div>
        </template>
    </RightDialog>

    <KnowMoreDialog
        v-model:show="showKnowMoreDialog"
        title="Employee Details"
        @close="closeKnowMoreDialog"
    >
        <template #body>
            <div class="d-flx fD-C g-15">
                <div>
                    <p class="f12 c-gray-60">Name</p>
                    <p class="f16 c-gray-100">{{ props.employee?.name || 'N/A' }}</p>
                </div>

                <div>
                    <p class="f12 c-gray-60">Email</p>
                    <p class="f16 c-gray-100">{{ props.employee?.email || 'N/A' }}</p>
                </div>

                <div>
                    <p class="f12 c-gray-60">Phone</p>
                    <p class="f16 c-gray-100">{{ props.employee?.phone || 'N/A' }}</p>
                </div>

                <div>
                    <p class="f12 c-gray-60">Location</p>
                    <p class="f16 c-gray-100">{{ props.employee?.location || 'N/A' }}</p>
                </div>
            </div>
        </template>
    </KnowMoreDialog>

    <ToastPop :message="toastMessage" v-model:show="showToast"/>
</template>


<style scoped>
    .edit-employee-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
    }
</style>
