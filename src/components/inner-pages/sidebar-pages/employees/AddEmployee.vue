
<script setup>
    // imports
        import { ref, reactive } from 'vue';
        import {
            addDoc,
            collection,
            getDocs,
            limit,
            orderBy,
            query,
            serverTimestamp,
            where
        } from 'firebase/firestore';
        import db from '@/firebase';

        import MInput from '@/components/ui/input/MInput.vue';
        import MInputLabel from '@/components/ui/input/MInputLabel.vue';
        import MButton from '@/components/ui/buttons/MButton.vue';
        import ToastPop from '@/components/ui/popup/toast/ToastPop.vue';
    // \\\ imports

    // steps definition
        const steps = [
            { id: 1, title: 'Basic Information' },
            { id: 2, title: 'Employment Details' },
            { id: 3, title: 'Compensation' },
            { id: 4, title: 'Attendance' }
        ];

        const currentStep = ref(1);
    // \\\ steps definition

    // global variables / form state
        const form = reactive({
            // Step 1: Basic Information
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            location: '',

            // Step 2: Employment Details
            department: '',
            designation: '',
            joiningDate: '',
            employmentType: '',

            // Step 3: Compensation
            salary: '',
            bankAccount: '',
            ifscCode: '',
            taxId: '',

            // Step 4: Attendance & Work Settings
            shift: '',
            workMode: '',
            reportingManager: ''
        });

        const isLoading = ref(false);
        const isError = ref(false);
        const errorMessage = ref('');
        const showToast = ref(false);
    // \\\ global variables

    async function getLastId() {
        const usersRef = collection(db, 'users-list');
        const q = query(usersRef, orderBy('id', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return 0;
        }

        const lastDoc = querySnapshot.docs[0];
        return Number(lastDoc.data().id) || 0;
    }

    function resetForm() {
        Object.keys(form).forEach((key) => {
            form[key] = '';
        });
        currentStep.value = 1;
        isError.value = false;
        errorMessage.value = '';
    }

    // Step Validation
    function validateStep(step) {
        isError.value = false;
        errorMessage.value = '';

        if (step === 1) {
            if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.toString().trim() || !form.location.trim()) {
                isError.value = true;
                errorMessage.value = 'Please fill in all basic information fields';
                return false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(form.email.trim())) {
                isError.value = true;
                errorMessage.value = 'Please enter a valid email address';
                return false;
            }
        } else if (step === 2) {
            if (!form.department.trim() || !form.designation.trim() || !form.joiningDate || !form.employmentType.trim()) {
                isError.value = true;
                errorMessage.value = 'Please fill in all employment detail fields';
                return false;
            }
        } else if (step === 3) {
            if (!form.salary || !form.bankAccount.trim() || !form.ifscCode.trim()) {
                isError.value = true;
                errorMessage.value = 'Please fill in all compensation fields';
                return false;
            }
        } else if (step === 4) {
            if (!form.shift.trim() || !form.workMode.trim()) {
                isError.value = true;
                errorMessage.value = 'Please fill in the attendance & work settings';
                return false;
            }
        }

        return true;
    }

    function nextStep() {
        if (validateStep(currentStep.value)) {
            if (currentStep.value < steps.length) {
                currentStep.value++;
            }
        }
    }

    function prevStep() {
        isError.value = false;
        errorMessage.value = '';
        if (currentStep.value > 1) {
            currentStep.value--;
        }
    }

    async function handleSubmit() {
        if (isLoading.value) {
            return;
        }

        // Validate current/final step
        if (!validateStep(currentStep.value)) {
            return;
        }

        const employee = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.toString().trim(),
            location: form.location.trim(),
            department: form.department.trim(),
            designation: form.designation.trim(),
            joiningDate: form.joiningDate,
            employmentType: form.employmentType.trim(),
            salary: form.salary,
            bankAccount: form.bankAccount.trim(),
            ifscCode: form.ifscCode.trim(),
            taxId: form.taxId.trim(),
            shift: form.shift.trim(),
            workMode: form.workMode.trim(),
            reportingManager: form.reportingManager.trim()
        };

        isError.value = false;
        errorMessage.value = '';
        isLoading.value = true;

        try {
            const duplicateEmailQuery = query(
                collection(db, 'users-list'),
                where('email', '==', employee.email),
                limit(1)
            );
            const duplicateEmailSnapshot = await getDocs(duplicateEmailQuery);

            if (!duplicateEmailSnapshot.empty) {
                isError.value = true;
                errorMessage.value = 'An employee with this email already exists';
                currentStep.value = 1;
                return;
            }

            const lastId = await getLastId();
            const newId = lastId + 1;

            await addDoc(collection(db, 'users-list'), {
                id: newId,
                ...employee,
                name: `${employee.firstName} ${employee.lastName}`,
                createdAt: serverTimestamp()
            });

            isError.value = false;
            resetForm();
            showToast.value = true;
        } catch (error) {
            console.error('Error adding document: ', error);
            isError.value = true;
            errorMessage.value = 'Employee could not be added. Please try again';
        } finally {
            isLoading.value = false;
        }
    }
</script>


<template>
    <!-- steps design -->
    <div class="mB50 mT30">
        <ul class="d-flx aI-C jC-C g-80 c-status-shades__green">
            <li
                v-for="(step, index) in steps"
                :key="step.id"
                :class="{
                    'step-completed': currentStep > step.id,
                    'step-active': currentStep === step.id,
                    'step-reached': currentStep >= step.id
                }"
            >
                <div class="txt-a-center">
                    <div class="design-container">
                        <div>
                            <div class="status-circle">
                                <i v-if="currentStep > step.id" class="bi bi-check-lg f20"></i>
                                <span v-else class="f14 font-w-600">{{ step.id }}</span>
                            </div>
                            <div>
                                <span>Step {{ step.id }}</span>
                            </div>
                        </div>
                        <div v-if="index !== 0" class="progress-line"></div>
                    </div>

                    <div>
                        <h3 class="f18">{{ step.title }}</h3>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <!-- \\\ steps design -->

    <div>
        <div class="max-w-600 w100pe m0-auto">
            <form class="d-block" @submit.prevent>
                <!-- Step 1: Basic Information -->
                <div v-show="currentStep === 1" class="d-flx fD-C g-20">
                    <div class="d-flx aI-C jC-S g-20">
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="First Name"/>
                            <MInput v-model="form.firstName" placeholder="Enter First Name"/>
                        </div>
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Last Name"/>
                            <MInput v-model="form.lastName" placeholder="Enter Last Name"/>
                        </div>
                    </div>

                    <div class="d-flx aI-C jC-S g-20">
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Email"/>
                            <MInput v-model="form.email" type="email" placeholder="Enter Email"/>
                        </div>
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Phone"/>
                            <MInput v-model="form.phone" type="tel" placeholder="Enter Phone"/>
                        </div>
                    </div>

                    <div class="w50pe">
                        <MInputLabel class="mB5" label_name="Location"/>
                        <MInput v-model="form.location" placeholder="Enter Location"/>
                    </div>
                </div>

                <!-- Step 2: Employment Details -->
                <div v-show="currentStep === 2" class="d-flx fD-C g-20">
                    <div class="d-flx aI-C jC-S g-20">
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Department"/>
                            <MInput v-model="form.department" placeholder="e.g. Engineering"/>
                        </div>
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Designation"/>
                            <MInput v-model="form.designation" placeholder="e.g. Frontend Developer"/>
                        </div>
                    </div>

                    <div class="d-flx aI-C jC-S g-20">
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Joining Date"/>
                            <MInput v-model="form.joiningDate" type="date"/>
                        </div>
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Employment Type"/>
                            <MInput v-model="form.employmentType" placeholder="e.g. Full-Time, Part-Time"/>
                        </div>
                    </div>
                </div>

                <!-- Step 3: Compensation -->
                <div v-show="currentStep === 3" class="d-flx fD-C g-20">
                    <div class="d-flx aI-C jC-S g-20">
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Monthly Salary / CTC"/>
                            <MInput v-model="form.salary" type="number" placeholder="Enter Salary"/>
                        </div>
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Bank Account No"/>
                            <MInput v-model="form.bankAccount" placeholder="Enter Account Number"/>
                        </div>
                    </div>

                    <div class="d-flx aI-C jC-S g-20">
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="IFSC Code"/>
                            <MInput v-model="form.ifscCode" placeholder="Enter IFSC Code"/>
                        </div>
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Tax ID / PAN"/>
                            <MInput v-model="form.taxId" placeholder="Enter PAN / Tax ID"/>
                        </div>
                    </div>
                </div>

                <!-- Step 4: Attendance & Work Settings -->
                <div v-show="currentStep === 4" class="d-flx fD-C g-20">
                    <div class="d-flx aI-C jC-S g-20">
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Work Shift"/>
                            <MInput v-model="form.shift" placeholder="e.g. Day Shift (9 AM - 6 PM)"/>
                        </div>
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Work Mode"/>
                            <MInput v-model="form.workMode" placeholder="e.g. On-site, Hybrid, Remote"/>
                        </div>
                    </div>

                    <div class="w50pe">
                        <MInputLabel class="mB5" label_name="Reporting Manager"/>
                        <MInput v-model="form.reportingManager" placeholder="Enter Manager Name"/>
                    </div>
                </div>

                <!-- Error Message -->
                <div v-if="isError" class="mT15">
                    <p class="c-status-red">{{ errorMessage }}</p>
                </div>

                <!-- Step Navigation Controls -->
                <div class="d-flx aI-C jC-SB mT30">
                    <div>
                        <MButton
                            v-if="currentStep > 1"
                            type="button"
                            variant="secondary"
                            :disabled="isLoading"
                            @click="prevStep"
                        >
                            Back
                        </MButton>
                    </div>

                    <div>
                        <MButton
                            v-if="currentStep < steps.length"
                            type="button"
                            @click="nextStep"
                        >
                            Next Step
                        </MButton>

                        <MButton
                            v-else
                            type="button"
                            btn_view="loader"
                            :isLoading="isLoading"
                            :disabled="isLoading"
                            @click="handleSubmit"
                        >
                            Add Employee
                        </MButton>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <ToastPop message="Employee added successfully" type="success" v-model="showToast"/>
</template>


<style scoped>
    .design-container {
        position: relative;
        margin-bottom: 5px;
    }
    .status-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: var(--c-gray-90);
        color: var(--c-white);
        margin: 0 auto;
        transform: var(--fast-trans);
        margin-bottom: 10px;
    }
    .step-completed .status-circle {
        background-color: var(--c-status);
    }
    .step-active .status-circle {
        background-color: var(--c-status);
        box-shadow: 0 0 0 3px var(--c-status__90);
    }
    .progress-line {
        width: 100px;
        height: 6px;
        border-radius: 8px;
        background-image: linear-gradient(to right, var(--c-status__green) 50%, var(--c-gray-90) 50%);
        background-size: 200%;
        background-position: right;
        position: absolute;
        inset-inline-start: -100px;
        top: 50%;
        translate: 0 -50%;
        transition: var(--default-trans);
    }
    .step-reached .progress-line {
        background-position: left;
    }
</style>

