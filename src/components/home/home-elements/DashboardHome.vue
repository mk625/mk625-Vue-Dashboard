
<script setup>
    import BaseCard from '@/components/ui/card/BaseCard.vue';
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import db  from '@/firebase';
    import { collection, onSnapshot } from 'firebase/firestore'

    // variables
        let dashboard_items = ref([]);
    // \\\ variables


    function dashboard_data() {
        let usersDb = collection(db, 'dashboard-items');

        onSnapshot(usersDb, (snapshot) => {
            dashboard_items.value = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
        })

        console.log(dashboard_items)
    }

    onMounted(function() {
        dashboard_data();
    })
</script>


<template>
    <div>
        <div class="dashboard-card-container">
            <BaseCard
                v-for="(item, index) in dashboard_items"
                :key="index"

                :title="item.title"
                :count="item.count"
                :description="item.description"
            >
            </BaseCard>
        </div>
    </div>
</template>


<style scoped>
    .dashboard-card-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 30px;
    }
</style>

