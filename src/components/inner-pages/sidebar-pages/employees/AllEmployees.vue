<script setup>
    // imports
        import { onMounted, ref, computed } from 'vue';
        import db from '@/firebase';
        import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

        // components
            import MTable from '@/components/ui/table/MTable.vue';
            import MSearchBox from '@/components/ui/input/MSearchBox.vue';
            import MButton from '@/components/ui/buttons/MButton.vue';
            import RightDialog from '@/components/ui/dialog/RightDialog.vue';
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
            },
            {
                key: 'actions',
                label: 'Actions',
                width: "w20pe"
            }
        ]

        const showRightDialog = ref(true);
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

    function handleEdit(row) {
        console.log('Edit employee:', row);
        // Add your edit logic here
    }

    function handleDelete(row) {
        console.log('Delete employee:', row);
        // Add your delete logic here
    }

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
        <MTable
            :columns="tableHeaderList"
            :rows="filteredUserList"
            :loading="isLoading"
        >
            <template #cell-actions="{ row }">
                <div class="employee-actions">
                    <MButton
                        variant="primary-2"
                        size="size-sm"
                        @click="handleEdit(row)"
                    >
                        Edit
                    </MButton>
                    
                    <MButton
                        variant="red"
                        size="size-sm"
                        @click="handleDelete(row)"
                    >
                        Delete
                    </MButton>
                </div>
            </template>
        </MTable>
    </div>


    <!-- child components -->
        <RightDialog
            v-model:show="showRightDialog"
            :title="rightDialogTitle"
            :description="rightDialogDescription"
            @close="handleClose"
        />


    <!-- \\\ child components -->
</template>


<style scoped>
    .employee-actions {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>

