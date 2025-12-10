<script setup>
    // imports
        import { onMounted, ref } from 'vue';
        import db from '@/firebase';
        import { collection, onSnapshot } from 'firebase/firestore';

        // components
            import MInput from '@/components/ui/input/MInput.vue';
        // \\\ components
    // \\\ imports


    // global variables
        const users_list = ref([]);
        const isLoading = ref(true)
    // \\\ global variables


    // watcher
        // watch(searchTtx, (val) => {
        //     if(!val.trim()) {

        //     }
        // })
    // \\\ watcher


    function getUsersList() {
        const usersListDb = collection(db, 'users-list');

        onSnapshot(usersListDb, (snapshot) => {
            users_list.value = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            isLoading.value = false;
        });
    }

    onMounted(() => {
        getUsersList();
    });
</script>


<template>
    <div class="mB20">
        <div class="d-flx jC-FE">
            <MInput placeholder="Search"></MInput>
        </div>
    </div>


    <div>
        <div v-if="isLoading">
            <h3 class="f20">Loading...</h3>
        </div>

        <div v-else>
            <table class="m-table">
                <thead>
                    <tr>
                        <th>
                            <div><span>ID</span></div>
                        </th>
                        <th>
                            <div><span>Name</span></div>
                        </th>
                        <th>
                            <div><span>Mail ID</span></div>
                        </th>
                        <th>
                            <div><span>Location</span></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users_list" :key="user.id">
                        <td><div><span>{{ index + 1 }}</span></div></td>
                        <td><div><span>{{ user.name || 'N/A' }}</span></div></td>
                        <td><div><span>{{ user.email || user.mailId || 'N/A' }}</span></div></td>
                        <td><div><span>{{ user.location || 'N/A' }}</span></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
