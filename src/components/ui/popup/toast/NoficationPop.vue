<script setup>
    // imports
        import { ref, nextTick } from 'vue';

        // ui components
            import MButton from '../../buttons/MButton.vue';
        // \\\ ui components
    // \\\ imports


    // global variables
        const notificationPopListsIn = ref(null);

        const chatLists = ref([]);
        const reminderLists = ref([]);
    // \\\ global variables



    function addChatPop() {
        chatLists.value.push({
            id: chatLists.value.length + 1,
            user_name: 'Chat: Meeha',
            text: 'What are you doing?',
        });

        nextTick(() => {
            const el = notificationPopListsIn.value;
            if (el) el.scrollTop = el.scrollHeight;
        });
    }

    function addReminderPop() {
        reminderLists.value.push({
            id: reminderLists.value.length + 1,
            user_name: 'Reminder: Meeha',
            text: 'What are you doing?',
        });

        nextTick(() => {
            const el = notificationPopListsIn.value;
            if (el) el.scrollTop = el.scrollHeight;
        });
    }
</script>


<template>
    <Teleport to="body">
        <!-- new pop button -->
            <div class="d-flx g-20 aI-E pTB20 pos-fixed left-30 bottom-10 zi-2">
                <MButton @click="addChatPop">Add Chat Popup</MButton>
                <MButton @click="addReminderPop">Add Reminder Popup</MButton>
            </div>
        <!-- \\\ new pop button -->


        <!-- notifications -->
            <div
                class="notification-pop-lists"
                ref="notificationPopListsIn"
                role="region"
                aria-label="Notifications"
            >
                <TransitionGroup tag="div" name="notification-pop-groups-group">
                    <!-- chat -->
                        <div>
                            <TransitionGroup tag="div" name="notification-pop">
                                <div
                                    v-for="chat in chatLists"
                                    :key="chat.id"
                                    :class="`notification-pop chat-pop`"
                                >
                                    <h4 class="mB5">{{ chat.user_name }}</h4>
                                    <p>{{ chat.text }}</p>
                                </div>
                            </TransitionGroup>
                        </div>
                    <!-- \\\ chat -->


                    <!-- reminder -->
                        <div>
                            <TransitionGroup tag="div" name="notification-pop">
                                <div>
                                    <div
                                        v-for="reminder in reminderLists"
                                        :key="reminder.id"
                                        :class="`notification-pop reminder-pop`"
                                    >
                                        <h4 class="mB5">{{ reminder.user_name }}</h4>
                                        <p>{{ reminder.text }}</p>
                                    </div>
                                </div>
                            </TransitionGroup>
                        </div>
                    <!-- \\\ reminder -->
                </TransitionGroup>
            </div>
        <!-- \\\ notifications -->

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

        /* common animation frames */
            .notification-pop-move {
                transition: transform 0.5s ease;
            }
        /* \\\ common animation frames */


        /* notification-pop-groups-group animation frames */
            .notification-pop-groups-group-enter-from {
                transform: translateX(100%);
                opacity: 0;
            }
            .notification-pop-groups-group-enter-to {
                transform: translateX(0);
                opacity: 1;
            }
            .notification-pop-groups-group-enter-active {
                transition: transform 0.5s ease, opacity 0.5s ease;
            }
        /*  \\\ notification-pop-groups-group animation frames */


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
            .notification-pop-leave-from {
                transform: translateX(0);
                opacity: 1;
            }
            .notification-pop-leave-to {
                transform: translateX(100%);
                opacity: 0;
            }
            .notification-pop-leave-active {
                transition: transform 0.5s ease, opacity 0.5s ease;
            }
        /* \\\ notification-pop animation frames */
    /* \\\ notification-pop-lists */
</style>
