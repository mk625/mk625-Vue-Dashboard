<script setup>
    // imports
        import { onMounted, ref, computed } from 'vue';
        import db from '@/firebase';
        import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

        // components
            import MInput from '@/components/ui/input/MInput.vue';
        // \\\ components
    // \\\ imports


    // global variables
        const users_list = ref([]);
        const searchingText = ref('');
        const isLoading = ref(true)
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
            <MInput
                placeholder="Search"
                v-model="searchingText"
            />
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
                        <th class="w10pe">
                            <div><span>ID</span></div>
                        </th>
                        <th class="w30pe">
                            <div><span>Name</span></div>
                        </th>
                        <th class="w30pe">
                            <div><span>Mail ID</span></div>
                        </th>
                        <th class="w30pe">
                            <div><span>Location</span></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="filteredUserList.length !== 0">
                        <tr v-for="(user) in filteredUserList" :key="user.id">
                            <td><div><span>{{ user.id }}</span></div></td>
                            <td><div><span>{{ user.name || 'N/A' }}</span></div></td>
                            <td><div><span>{{ user.email || user.mailId || 'N/A' }}</span></div></td>
                            <td><div><span>{{ user.location || 'N/A' }}</span></div></td>
                        </tr>
                    </template>

                    <tr v-else>
                        <td colspan="4">
                            <div class="txt-a-center">
                                <p class="text-secondary">No results found</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
