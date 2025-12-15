
<script setup>
    // imports
        import MInput from '@/components/ui/input/MInput.vue';
        import MInputLabel from '@/components/ui/input/MInputLabel.vue';
        import MButton from '@/components/ui/buttons/MButton.vue';
    // \\\ imports


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
                                <span class="c-txt-secondary">Step 1</span>
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
                                <span class="c-txt-secondary">Step 2</span>
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
                                <span class="c-txt-secondary">Step 3</span>
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
                                <span class="c-txt-secondary">Step 4</span>
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
            <form class="d-block" action="">
                <div>
                    <div class="d-flx aI-C jC-S g-20 mB30">
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="First Name"/>
                            <MInput input_type="text" placeholder="Enter First Name"/>
                        </div>
                        <div class="w50pe">
                            <MInputLabel class="mB5" label_name="Last Name"/>
                            <MInput input_type="text" placeholder="Enter Last Name"/>
                        </div>
                    </div>

                    <div class="mB30">
                        <div class="d-flx aI-C jC-S g-20">
                            <div class="w50pe">
                                <MInputLabel class="mB5" label_name="Email"/>
                                <MInput input_type="email" placeholder="Enter Email"/>
                            </div>
                            <div class="w50pe">
                                <MInputLabel class="mB5" label_name="Phone"/>
                                <MInput input_type="tel" placeholder="Enter Phone"/>
                            </div>
                        </div>
                    </div>

                    <div class="mB40">
                        <div>
                            <div class="w50pe">
                                <MInputLabel class="mB5" label_name="Location"/>
                                <MInput input_type="text" placeholder="Enter Location"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="txt-a-center">
                    <MButton button_type="primary" button_text="Save">Save</MButton>
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
