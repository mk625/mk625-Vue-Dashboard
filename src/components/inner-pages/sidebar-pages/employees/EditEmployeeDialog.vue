<script setup>
    // imports
        import { ref, watch } from 'vue';
        import { doc, updateDoc, getDoc } from 'firebase/firestore';
        import db from '@/firebase';
        import MInput from '@/components/ui/input/MInput.vue';
        import MInputLabel from '@/components/ui/input/MInputLabel.vue';
        import RightDialog from '@/components/ui/dialog/RightDialog.vue';
        import ToastPop from '@/components/ui/popup/toast/ToastPop.vue';
    // \\\ imports

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
        },
    })

    const emit = defineEmits(['close', 'update:show', 'updated']);

    // Local form state for editing
    const formData = ref({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: ''
    });

    const isError = ref(false);
    const isLoading = ref(false);
    const showToast = ref(false);

    // Sync employee prop to local form state when employee changes
    watch(() => props.employee, (newEmployee) => {
        if (newEmployee) {
            formData.value = {
                firstName: newEmployee.firstName || newEmployee.name?.split(' ')[0] || '',
                lastName: newEmployee.lastName || newEmployee.name?.split(' ').slice(1).join(' ') || '',
                email: newEmployee.email || '',
                phone: newEmployee.phone || '',
                location: newEmployee.location || ''
            };
        }
    }, { immediate: true });

    async function handleSubmit() {
        isError.value = false;

        // Validate form
        if (!formData.value.firstName || !formData.value.lastName || !formData.value.email || !formData.value.phone || !formData.value.location) {
            isError.value = true;
            return;
        }

        const employeeId = props.employee.docId;
        console.log("Employee ID: ", props.employee.docId);

        isLoading.value = true;

        try {
            const employeeRef = doc(db, 'users-list', employeeId.toString());
            const fullName = formData.value.firstName + ' ' + formData.value.lastName;

            console.log("Employee Reference: ", employeeRef);

            const snap = await getDoc(employeeRef);

            if(snap.exists()) {
                console.log("This data already exists");
                console.log(snap.data());
            }else{
                console.log("This data does not exist");
            }


            await updateDoc(employeeRef, {
                name: fullName,
                email: formData.value.email,
                phone: formData.value.phone,
                location: formData.value.location,
            });

            isError.value = false;
            showToast.value = true;

            // Emit updated event for parent component
            emit('updated', {
                id: employeeId,
                ...formData.value,
                name: fullName
            });

            // Close dialog after a short delay to show toast
            setTimeout(() => {
                handleClose();
            }, 1500);

        } catch (error) {
            console.error('Error updating employee: ', error);
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    }

    const handleClose = () => {
        emit('update:show', false);
        emit('close');
    };
</script>


<template>
    <RightDialog
        :show="show"
        :title="title"
        @close="handleClose"
    >
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
                    <p class="c-status-red">Please fill in all the fields</p>
                </div>

            </form>
        </template>
    </RightDialog>

    <ToastPop message="Employee updated successfully" v-model:show="showToast"/>
</template>


<style scoped>

</style>
