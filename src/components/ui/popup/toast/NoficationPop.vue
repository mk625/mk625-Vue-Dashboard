<script setup>
    // imports
        import { ref, nextTick } from 'vue';

        // ui components
            import MButton from '../../buttons/MButton.vue';
        // \\\ ui components
    // \\\ imports


    // global variables
        const notificationPopNotificationsListsIn = ref(null);
        const notifications = ref([])
    // \\\ global variables



    function addPop() {
        let popType = 'chat';

        if(notifications.value.length + 1 == 3 || notifications.value.length + 1 == 5) {
            popType = 'reminder';
        }

        notifications.value.push({
            id: notifications.value.length + 1,
            user_name: 'Meeha',
            text: 'What are you doing?',
            type: popType,
        });

        console.log(notifications.value);

        nextTick(() => {
            const el = notificationPopNotificationsListsIn.value;
            if (el) el.scrollTop = el.scrollHeight;
        });
    }
</script>


<template>
    <Teleport to="body">
        <!-- new pop button -->
            <div class="d-flx g-20 aI-E pTB20 pos-fixed left-30 bottom-10 zi-2">
                <MButton @click="addPop">Add Popup</MButton>
            </div>
        <!-- \\\ new pop button -->


        <!-- notifications notifications -->
            <div
                class="notification-pop-lists notification-pop-lists"
                ref="notificationPopNotificationsListsIn"
                key="key-notifications-lists"
            >
                <TransitionGroup tag="div" name="notification-pop">
                    <div
                        v-for="item in notifications"
                        :key="item.id"
                        :class="`notification-pop ${item.type || ''}-pop`"
                    >
                        <!-- chat -->
                            <div v-if="item.type === 'chat'">
                                <template>
                                    <h4 class="mB5">{{ item.user_name }}</h4>
                                    <p>{{ item.text }}</p>
                                </template>
                            </div>
                        <!-- \\\ chat -->

                        <!-- reminder -->
                            <div v-else-if="item.type === 'reminder'">
                                <template>
                                    <h4 class="mB5"><strong class="c-status-orange fw-bold">Reminder:</strong> {{ item.user_name }}</h4>
                                    <p>{{ item.text }}</p>
                                </template>
                            </div>
                        <!-- \\\ reminder -->
                    </div>
                </TransitionGroup>
            </div>
        <!-- \\\ notifications notifications -->

    </Teleport>
</template>


<style scoped>
    .notification-pop-lists {
        /* sources */
            --w-notification-pop: 300px;
        /* \\\ sources */


        max-height: 100vh;
        padding: 15px;
        overflow-y: auto;
        overflow-x: hidden;
        scroll-behavior: smooth;

        position: fixed;
        bottom: 0px;
        z-index: 2;
    }
    .notification-pop {
        width: var(--w-notification-pop);
        padding: 15px;
        background-color: #dbe2ec;
        border: 1px solid var(--c-border-default);
        margin-bottom: 12px;
        border-radius: 10px;
    }
    .notification-pop.reminder-pop {
        background-color: #f0e4d2;
    }
    .notification-pop:last-child {
        margin-bottom: 0px;
    }


    /* notification-pop-lists */
        .notification-pop-lists {
            inset-inline-end: 0px;
            z-index: 2;
        }
        .notification-pop-lists-in {
            padding-block: 20px;
        }

        /* common animation frames */
            .notification-pop-move {
                transition: transform 0.5s ease;
            }
        /* \\\ commmon animation frames */


        /* notification-pop animation frames */
            .notification-pop-enter-from {
                transform: translateX(100%);
                opacity: 0;
            }
            .notification-pop-enter-to {
                transform: translateX(0);
                opacity: 1;
            }
            .notification-pop-enter-active {
                transition: transform 0.5s ease, opacity 0.5s ease;
            }
        /* \\\ notification-pop animation frames */
    /* \\\ notification-pop-lists */
</style>
