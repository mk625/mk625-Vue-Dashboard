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
        const announceLists = ref([]);
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

    function addAnnouncePop() {
        announceLists.value.push({
            id: announceLists.value.length + 1,
            user_name: 'Announce: Meeha',
            text: 'New announcement...',
        });

        nextTick(() => {
            const el = notificationPopListsIn.value;
            if (el) el.scrollTop = el.scrollHeight;
        });
    }

    function removeChatPop(id) {
        chatLists.value = chatLists.value.filter((item) => item.id !== id);
    }

    function removeReminderPop(id) {
        reminderLists.value = reminderLists.value.filter((item) => item.id !== id);
    }

    function removeAnnouncePop(id) {
        announceLists.value = announceLists.value.filter((item) => item.id !== id);
    }
</script>


<template>
    <Teleport to="body">
        <!-- new pop button -->
            <div class="d-flx g-20 aI-E pTB20 pos-fixed left-30 bottom-10 zi-2">
                <MButton @click="addChatPop">Add Chat Popup</MButton>
                <MButton @click="addReminderPop">Add Reminder Popup</MButton>
                <MButton @click="addAnnouncePop">Add Announce Pop</MButton>
            </div>
        <!-- \\\ new pop button -->


        <!-- notifications -->
            <div
                class="notification-pop-lists"
                ref="notificationPopListsIn"
                role="region"
                aria-label="Notifications"
            >
                <TransitionGroup tag="div" name="notification-pop">
                    <div
                        v-for="announce in announceLists"
                        :key="`announce-${announce.id}`"
                        class="notification-pop announce-pop"
                    >
                        <button
                            type="button"
                            class="notification-pop__close"
                            aria-label="Close notification"
                            @click="removeAnnouncePop(announce.id)"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="mB5">{{ announce.user_name }}</h4>
                        <p>{{ announce.text }}</p>
                    </div>

                    <div
                        v-for="chat in chatLists"
                        :key="`chat-${chat.id}`"
                        class="notification-pop chat-pop"
                    >
                        <button
                            type="button"
                            class="notification-pop__close"
                            aria-label="Close notification"
                            @click="removeChatPop(chat.id)"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="mB5">{{ chat.user_name }}</h4>
                        <p>{{ chat.text }}</p>
                    </div>

                    <div
                        v-for="reminder in reminderLists"
                        :key="`reminder-${reminder.id}`"
                        class="notification-pop reminder-pop"
                    >
                        <button
                            type="button"
                            class="notification-pop__close"
                            aria-label="Close notification"
                            @click="removeReminderPop(reminder.id)"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                        <h4 class="mB5">{{ reminder.user_name }}</h4>
                        <p>{{ reminder.text }}</p>
                    </div>
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
        position: relative;
        width: var(--w-notification-pop);
        padding: 15px;
        padding-inline-end: 36px;
        background-color: #dbe2ec;
        border: 1px solid var(--c-border-default);
        margin-bottom: 12px;
        border-radius: 10px;
    }
    .notification-pop__close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        padding: 0;
        font-size: 20px;
        line-height: 1;
        color: inherit;
        background: transparent;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        position: absolute;
        top: 10px;
        inset-inline-end: 10px;
        opacity: 0.7;
        transition: opacity 0.2s ease, background-color 0.2s ease;
    }
    .notification-pop__close:hover,
    .notification-pop__close:focus {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.08);
    }
    .notification-pop.reminder-pop {
        background-color: #f0e4d2;
    }
    .notification-pop.announce-pop {
        background-color: #d4ecd4;
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
                position: absolute;
                width: var(--w-notification-pop);
                transition: transform 0.5s ease, opacity 0.5s ease;
            }
        /* \\\ notification-pop animation frames */
    /* \\\ notification-pop-lists */
</style>
