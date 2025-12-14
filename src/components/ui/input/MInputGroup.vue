<script setup>
    // imports
        import { provide, toRefs } from 'vue';
        import MInput from './MInput.vue';
        import MInputError from './MInputError.vue';
        import MInputLabel from './MInputLabel.vue';
    // \\\ imports

    // props
    const props = defineProps({
        // view
            view: {
                type: String,
                default: 'input_only',
                validator: (value) => ['input_only', 'labeled'].includes(value)
            },
        // \\\ view

        // input
            placeholder: {
                type: String,
                default: ''
            },
            input_type: {
                type: String,
                default: 'text'
            },
            have_type_icon: {
                type: Boolean,
                default: false
            },
        // \\\ input

        // label
            label_name: {
                type: String,
                default: ''
            },
        // \\\ label

        // Error
            error: {
                type: Boolean,
                default: false
            }
        // \\\ Error
    });

    // model
        const modelValue = defineModel({
            type: [String, Number],
            default: ''
        });
    // \\\ model

    // provide
        provide('inputGroupProps', toRefs(props));
    // \\\ provide
</script>


<template>
    <!-- input_only view -->
    <template v-if="view === 'input_only'">
        <div class="input-ele-parent">
            <div>
                <MInput v-model="modelValue" />
                <i
                    v-if="have_type_icon"
                    class="fa-solid fa-magnifying-glass input-type-icon"
                ></i>
            </div>
            <MInputError />
        </div>
    </template>
    <!-- \\\ input_only view -->

    <!-- labeled view -->
    <template v-if="view === 'labeled'">
        <div>
            <MInputLabel />

            <div class="input-ele-parent">
                <div>
                    <MInput v-model="modelValue" />
                    <i
                        v-if="have_type_icon"
                        class="fa-solid fa-magnifying-glass input-type-icon"
                    ></i>
                </div>
                <MInputError />
            </div>
        </div>
    </template>
    <!-- \\\ labeled view -->
</template>


<style scoped>
    .input-ele-parent {
        display: inline-block;
        position: relative;
    }

    /* input icons */
        .input-type-icon {
            position: absolute;
            inset-inline-end: 0px;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    /* \\\ input icons */
</style>
