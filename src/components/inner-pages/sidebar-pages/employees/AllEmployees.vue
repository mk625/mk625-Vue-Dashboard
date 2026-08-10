<script setup>
    // imports
        import { onMounted, ref, computed } from 'vue';
        import db from '@/firebase';
        import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';

        // ui components
            import MTable from '@/components/ui/table/MTable.vue';
            import MSearchBox from '@/components/ui/input/MSearchBox.vue';
            import MButton from '@/components/ui/buttons/MButton.vue';
            import EditEmployeeDialog from './EditEmployeeDialog.vue';
            import NoficationPop from '@/components/ui/popup/toast/NoficationPop.vue';
        // \\\ ui components
    // \\\ imports


    // global variables
        const users_list = ref([]);
        const searchingText = ref('');
        const isLoading = ref(true);
        const deletingEmployeeId = ref(null);

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

        const showEditEmployeeDialog = ref(false);
        const selectedEmployee = ref(null);
    // \\\ global variables


    function getUsersList() {
        const usersListQuery = query(
            collection(db, 'users-list'),
            orderBy('id', 'asc')
        )

        onSnapshot(usersListQuery, (snapshot) => {
            users_list.value = snapshot.docs.map((doc) => ({
                docId: doc.id,
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
                user.docId?.toString().includes(searchingTextUpdated) ||
                user.id?.toString().includes(searchingTextUpdated) ||
                user.name?.toLowerCase().includes(searchingTextUpdated) ||
                user.email?.toLowerCase().includes(searchingTextUpdated) ||
                user.mailId?.toLowerCase().includes(searchingTextUpdated) ||
                user.location?.toLowerCase().includes(searchingTextUpdated)
            )
        })
    });

    function handleEditEmployee(row) {
        selectedEmployee.value = row;
        showEditEmployeeDialog.value = true;
    }

    async function handleDeleteEmployee(row) {
        if (!row.docId || deletingEmployeeId.value) {
            return;
        }

        if (!window.confirm(`Delete ${row.name || 'this employee'}? This action cannot be undone.`)) {
            return;
        }

        try {
            deletingEmployeeId.value = row.docId;
            await deleteDoc(doc(db, 'users-list', row.docId));
        } catch (error) {
            console.error('Error deleting employee: ', error);
            window.alert('Employee could not be deleted. Please try again.');
        } finally {
            deletingEmployeeId.value = null;
        }
    }

    function handleUpdate() {
        console.log('Employee updated successfully');
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
                <div class="employee-actions" @click.stop>
                    <MButton
                        variant="secondary"
                        size="size-sm"
                        @click="handleEditEmployee(row)"
                    >
                        Edit
                    </MButton>
                    <MButton
                        variant="red"
                        size="size-sm"
                        btn_view="loader"
                        :isLoading="deletingEmployeeId === row.docId"
                        :disabled="Boolean(deletingEmployeeId)"
                        @click="handleDeleteEmployee(row)"
                    >
                        Delete
                    </MButton>
                </div>
            </template>
        </MTable>
    </div>


    <!-- child components -->
        <EditEmployeeDialog
            v-model:show="showEditEmployeeDialog"
            title="Edit Employee"
            :employee="selectedEmployee"
            @updated="handleUpdate"
        />

        <!-- <NoficationPop/> -->
    <!-- \\\ child components -->
</template>


<style scoped>
    .employee-actions {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>

