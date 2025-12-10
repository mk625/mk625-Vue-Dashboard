
<script setup>
    defineProps({
        title: {
            type: String,
        },
        count: {
            type: String,
        },
        description: {
            type: String
        }
    })
</script>


<template>
    <div class="base-card">
        <div class="mB10">
            <h4 class="f16 txt-t-capital"> {{ title }} </h4>
        </div>
        <div class="mB10">
            <h2 class="f26 fw-sbold"> {{ count }} </h2>
        </div>
        <div>
            <p class="txt-secondary">
                {{ description }}
            </p>
        </div>
    </div>
</template>


<style scoped>
    .base-card {
        height: 150px;
        padding: 20px;
        border: 1px solid var(--c-border);
        border-radius: 6px;
        box-shadow: var(--box-shadow-default);
    }
</style>
