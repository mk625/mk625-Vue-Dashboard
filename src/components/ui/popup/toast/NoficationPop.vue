<script setup>
    // imports
        import { ref, nextTick } from 'vue';

        // ui components
            import MButton from '../../buttons/MButton.vue';
        // \\\ ui components
    // \\\ imports


    // global variables
        const notificationPopChatListsIn = ref(null);

        const chats = ref([
            {
                id: 1,
                user_name: 'Meeha',
                text: 'Muthu where are you going saldjflk fadf',
                type: 'chat',
            },
            {
                id: 2,
                user_name: 'Bug Complete',
                text: 'Need complete bug id-20',
                type: 'reminder',
            },
            {
                id: 3,
                user_name: 'Testing',
                text: 'Need to test marketing plus page',
                type: 'reminder',
            },
            {
                id: 4,
                user_name: 'Muthu',
                text: 'I am going to the market alksdjflksa alksdjf klsajdf kaskdlfj',
                type: 'chat',
            },
        ])
    // \\\ global variables



    function addChat() {
        chats.value.push({
            id: chats.value.length + 1,
            user_name: 'Meeha',
            text: 'What are you doing?'
        });

        nextTick(() => {
            const el = notificationPopChatListsIn.value;
            el.scrollTop = el.scrollHeight;
        });
    }
</script>


<template>
    <Teleport to="body">
        <!-- new pop button -->
            <div class="d-flx g-20 aI-E pTB20 pos-fixed left-30 bottom-10 zi-2">
                <MButton @click="addChat">Add Chat</MButton>
            </div>
        <!-- \\\ new pop button -->


        <!-- chat notifications -->
            <div
                class="notification-pop-lists notification-pop-lists"
                ref="notificationPopChatListsIn"
                key="key-chat-lists"
            >
                <TransitionGroup tag="div" name="notification-pop">
                    <div
                        :class="`notification-pop ${chat.type||''}-pop`"
                        v-for="chat in chats" :key="chat.id"
                    >
                        <!-- chat -->
                            <template v-if="chat.type === 'chat'">
                                <h4 class="mB5">{{ chat.user_name }}</h4>
                                <p> {{ chat.text }} </p>
                            </template>
                        <!-- \\\ chat -->

                        <!-- reminder -->
                            <template v-else-if="chat.type === 'reminder'">
                                <h4 class="mB5"> <strong class="c-status-orange">Reminder:</strong> {{ chat.user_name }}</h4>
                                <p> {{ chat.text }} </p>
                            </template>
                        <!-- \\\ reminder -->
                    </div>
                </TransitionGroup>
            </div>
        <!-- \\\ chat notifications -->

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
        .note-pop-lists-in {
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
