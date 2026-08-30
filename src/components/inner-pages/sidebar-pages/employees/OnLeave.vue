
<script setup>
    // libraries
    import { ref, onMounted, computed } from "vue";
    import { collection, query, where, getDocs } from "firebase/firestore";
    import { db } from "../../../../firebase"


    // variables
    const onLeaveEmployees = ref([]);
    const loading = ref(true);


    // methods
    async function fetchonLeaveEmployees() {
        try {
            const q = await getDocs(
                query(
                    collection(db, 'users-list'),
                    where('leaveStatus', '==', 'leaveStatus')
                )
            )
        } catch(error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    }


    // onload
    onMounted (() => {
        fetchonLeaveEmployees();
    })
</script>


<template>
    <div>

    </div>
</template>


<style>

</style>

