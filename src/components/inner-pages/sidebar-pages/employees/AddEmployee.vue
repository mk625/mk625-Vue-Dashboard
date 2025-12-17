
<script setup>
    // imports
        import { ref } from 'vue';
        import { addDoc, collection } from 'firebase/firestore';
        import db from '@/firebase';

        import MInput from '@/components/ui/input/MInput.vue';
        import MInputLabel from '@/components/ui/input/MInputLabel.vue';
        import MButton from '@/components/ui/buttons/MButton.vue';
    // \\\ imports

    // global variables
        const first_name = ref('');
        const last_name = ref('');
        const email = ref('');
        const phone = ref('');
        const location = ref('');

        const isError = ref(false);
    // \\\ global variables


    async function handleSubmit() {
        if (first_name.value === '' || last_name.value === '' || email.value === '' || phone.value === '' || location.value === '') {
            isError.value = true;
            return;
        }

        await addDoc(collection(db, 'users-list'),{
            name: first_name.value + ' ' + last_name.value,
            email: email.value,
            location: location.value,
        })

        // reset form
        first_name.value = "";
        last_name.value = "";
        email.value = "";
        phone.value = "";
        location.value = "";
    }
</script>


<template>
    <!-- steps design -->
    <div class="mB50 mT30">
        <ul class="d-flx aI-C jC-C g-80">
            <li class="step-completed">
                <div class="txt-a-center">
                    <div class="design-container">
                        <div>
                            <div class="status-circle">
                                <i class="bi bi-check-lg f20"></i>
                            </div>
                            <div>
                                <span>Step 1</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="f18">Basic Information</h3>
                    </div>
                </div>
            </li>

            <li>
                <div class="txt-a-center">
                    <div class="design-container">
                        <div>
                            <div class="status-circle">
                                <i class="bi bi-check-lg f20"></i>
                            </div>
                            <div>
                                <span>Step 2</span>
                            </div>
                        </div>
                        <div class="progress-line"></div>
                    </div>

                    <div>
                        <h3 class="f18">Employement Details</h3>
                    </div>
                </div>
            </li>

            <li>
                <div class="txt-a-center">
                    <div class="design-container">
                        <div>
                            <div class="status-circle">
                                <i class="bi bi-check-lg f20"></i>
                            </div>
                            <div>
                                <span>Step 3</span>
                            </div>
                        </div>
                        <div class="progress-line"></div>
                    </div>

                    <div>
                        <h3 class="f18">Compensation</h3>
                    </div>
                </div>
            </li>

            <li>
                <div class="txt-a-center">
                    <div class="design-container">
                        <div>
                            <div class="status-circle">
                                <i class="bi bi-check-lg f20"></i>
                            </div>
                            <div>
                                <span>Step 4</span>
                            </div>
                        </div>
                        <div class="progress-line"></div>
                    </div>

                    <div>
                        <h3 class="f18">Attendance</h3>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <!-- \\\ steps design -->

    <div>
        <div class="max-w-600 w100pe m0-auto">
            <form class="d-block" @submit.prevent="handleSubmit">
                <div class="d-flx fD-C g-20">
                    <div class="d-flx aI-C jC-S g-20">
                        <div class="w50pe">
                            <MInputLabel v-model="first_name" class="mB5" label_name="First Name"/>
                            <MInput placeholder="Enter First Name"/>
                        </div>
                        <div class="w50pe">
                            <MInputLabel v-model="last_name" class="mB5" label_name="Last Name"/>
                            <MInput placeholder="Enter Last Name"/>
                        </div>
                    </div>

                    <div>
                        <div class="d-flx aI-C jC-S g-20">
                            <div class="w50pe">
                                <MInputLabel v-model="email" class="mB5" label_name="Email"/>
                                <MInput type="email" placeholder="Enter Email"/>
                            </div>
                            <div class="w50pe">
                                <MInputLabel class="mB5" label_name="Phone"/>
                                <MInput  v-model="phone" type="tel" placeholder="Enter Phone"/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div class="w50pe">
                                <MInputLabel class="mB5" label_name="Location"/>
                                <MInput v-model="location" placeholder="Enter Location"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="isError" class="mT15">
                    <p class="c-status-red">Please fill in all the fields</p>
                </div>

                <div class="txt-a-center mT30">
                    <MButton type="submit">Save</MButton>
                </div>
            </form>
        </div>
    </div>
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
        background-color: var(--c-status-green);
    }
    .progress-line {
        width: 100px;
        height: 6px;
        border-radius: 8px;
        background-image: linear-gradient(to right, var(--c-status-green) 50%, var(--c-gray-90) 50%);
        background-size: 200%;
        background-position: right;
        position: absolute;
        inset-inline-start: -100px;
        top: 50%;
        translate: 0 -50%;
        transition: var(--fast-trans);
    }
    .step-completed .progress-line {
        background-position: left;
    }
</style>
