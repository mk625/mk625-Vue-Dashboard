
<script setup>
import MInput from './MInput.vue';
import MInputError from './MInputError.vue';
import MInputLabel from './MInputLabel.vue';

defineProps({
    view: {
        type: String,
        default: "input_only",
    },
    isRequired: {
        type: Boolean,
        default: false
    },

    // input
        toValue: {
            type: [String, Number],
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        input_type: {
            type: String,
            default: 'text',
        },
        have_type_icon: {
            type: Boolean,
            default: false,
        },
    // \\\ input


    // label
        label_name: {
            type: String,
        },
    // \\\ label


    // Error
        error: {
            type: Boolean,
        },
    // Error
})

const emit = defineEmits(['update:toValue']);

const handleUpdate = (value) => {
    emit('update:toValue', value);
};
</script>


<template>
    <template v-if="view === 'labled'">
        <div>
            <MInputLabel :field_name="label_name"/>

            <div class="input-ele-parent">
                <div>
                    <MInput :input_type="input_type" :toValue="toValue" :placeholder="placeholder" @update:toValue="handleUpdate"/>
                    <i v-if="have_type_icon" class="fa-solid fa-magnifying-glass input-type-icon"></i>
                </div>
                <MInputError :isError="error"/>
            </div>
        </div>
    </template>

    <template v-else-if="view === 'search_box'">
        <div class="pos-rel">
            <i class="fa-solid fa-magnifying-glass pos"></i>
            <MInput :input_type="input_type" :toValue="toValue" :placeholder="placeholder" @update:toValue="handleUpdate"/>
        </div>
    </template>
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
