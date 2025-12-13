<script setup>
    // imports
        import { onMounted, ref, computed } from 'vue';
        import db from '@/firebase';
        import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

        // components
            import mTable from '@/components/ui/table/mTable.vue';
            import MSearchBox from '@/components/ui/input/MSearchBox.vue';
        // \\\ components
    // \\\ imports


    // global variables
        const users_list = ref([]);
        const searchingText = ref('');
        const isLoading = ref(true);

        const tableHeaderList = [
            {
                key: 'id',
                label: "ID",
                width: "w10pe"
            },
            {
                key: 'name',
                label: 'Name',
                width: "w30pe"

            },
            {
                key: 'email',
                label: 'Email',
                width: "w30pe"
            },
            {
                key: 'location',
                label: 'Location',
                width: "w30pe"
            }
        ]
    // \\\ global variables


    function getUsersList() {
        const usersListQuery = query(
            collection(db, 'users-list'),
            orderBy('id', 'asc')
        )

        onSnapshot(usersListQuery, (snapshot) => {
            users_list.value = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            isLoading.value = false;
        });
    }

    const filteredUserList = computed(() => {
        const searchingTextUpdated = searchingText.value.toLowerCase().trim();

        if(!searchingTextUpdated) {
            return users_list.value;
        }

        return users_list.value.filter((user) =>{
            return(
                user.name?.toLowerCase().includes(searchingTextUpdated) ||
                user.email?.toLowerCase().includes(searchingTextUpdated) ||
                user.mailId?.toLowerCase().includes(searchingTextUpdated) ||
                user.location?.toLowerCase().includes(searchingTextUpdated)
            )
        })
    });

    onMounted(() => {
        getUsersList();
    });
</script>


<template>
    <div class="mB20">
        <div class="d-flx jC-FE">
            <MSearchBox
                placeholder="Search"
                v-model="searchingText"
            />
        </div>
    </div>

    <div>
        <mTable
            :columns="tableHeaderList"
            :rows="filteredUserList"
            :loading="isLoading"
        />
    </div>
</template>


<style scoped>

</style>

