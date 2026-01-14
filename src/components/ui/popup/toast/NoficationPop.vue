<script setup>
    // imports
        import { ref, nextTick } from 'vue';

        // ui components
            import MButton from '../../buttons/MButton.vue';
        // \\\ ui components
    // \\\ imports


    // global variables
        const notificationPopChatListsIn = ref(null);
        const notificationPopNoteListsIn = ref(null);
        
        const chats = ref([
            {
                id: 1,
                user_name: 'Meeha',
                text: 'Muthu where are you going saldjflk fadf',
            },
            {
                id: 2,
                user_name: 'Muthu',
                text: 'I am going to the market so will be back in 2 hours'
            },
            {
                id: 3,
                user_name: 'Meeha',
                text: 'What are you doing?'
            },
            {
                id: 4,
                user_name: 'Muthu',
                text: 'I am going to the market alksdjflksa jdfkljas dfkals fasklfj alksdjf klsajdf kaskdlfj aklsfj lksadfjklasfjadf'
            },
        ])
        const notes = ref([]);
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
    function addNote() {
        notes.value.push({
            id: notes.value.length + 1,
            title: 'Note 1',
            text: 'This is a note'
        });

        nextTick(() => {
            const el = notificationPopNoteListsIn.value;
            el.scrollTop = el.scrollHeight;
        });
    }
</script>


<template>
    <Teleport to="body">
        <div class="notification-pop-container">
            <TransitionGroup
                tag="div"
                class="notification-pop-container-in"
                ref="notificationPopContainerIn"
                name="notification-pop"
            >

                <!-- new pop button -->
                    <div class="d-flx g-20 aI-E pTB20">
                        <MButton @click="addChat">Add Chat</MButton>
                        <MButton @click="addNote">Add Note</MButton>
                    </div>
                <!-- \\\ new pop button -->

                <!-- chat notifications -->
                    <div
                        class="notification-pop-lists"
                        ref="notificationPopChatListsIn"
                    >
                        <TransitionGroup tag="div" name="chat-pop">
                            <div class="notification-pop chat-pop" v-for="chat in chats" :key="chat.id">
                                <h4 class="mB5">{{ chat.user_name }}</h4>
                                <p> {{ chat.text }} </p>
                            </div>
                        </TransitionGroup>
                    </div>
                <!-- \\\ chat notifications -->

                <!-- note notifications -->
                    <Transition>
                        <div
                            class="notification-pop-lists"
                            ref="notificationPopNoteListsIn"
                            v-if="notes.length > 0"
                        >
                            <TransitionGroup
                                tag="div"
                                name="note-pop"
                            >
                                <div class="notification-pop note-pop" v-for="note in notes" :key="note.id">
                                    <h4 class="mB5">{{ note.title }}</h4>
                                    <p> {{ note.text }} </p>
                                </div>
                            </TransitionGroup>
                        </div>
                    </Transition>
                    <!-- \\\ note notifications -->
            </TransitionGroup>
        </div>
    </Teleport>
</template>


<style scoped>
    .notification-pop-container {
        display: grid;
        place-content: end;
        width: 100vw;
        height: 100vh;
        background-color: #28282878;

        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 1;
    }
    .notification-pop-container-in {
        display: grid;
        align-items: flex-end;
        grid-auto-flow: column;
        gap: 20px;
        padding-inline: 20px;
        border: 2px solid green;
    }
    .notification-pop-lists {
        max-height: 100vh;
        padding-block: 20px;
        overflow-y: auto;
        scroll-behavior: smooth;
        border: 2px solid red;
    }
    .notification-pop {
        max-width: 300px;
        padding: 15px;
        background-color: #dbe2ec;
        margin-bottom: 12px;
        border-radius: 10px;
    }
    .notification-pop:last-child {
        margin-bottom: 0px;
    }

    /* chat-pop animation frames */
        .chat-pop-enter-from {
            transform: translateX(100%);
            opacity: 0;
        }
        .chat-pop-enter-to {
            transform: translateX(0);
            opacity: 1;
        }
        .chat-pop-enter-active {
            transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .chat-pop-move {
            transition: transform 0.5s ease;
        }
    /* \\\ chat-pop animation frames */

    /* note-pop animation frames */
        .note-pop-enter-from {
            transform: translateX(100%);
            opacity: 0;
        }
        .note-pop-enter-to {
            transform: translateX(0);
            opacity: 1;
        }
        .note-pop-enter-active {
            transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .note-pop-move {
            transition: transform 0.5s ease;
        }
    /* \\\ note-pop animation frames */
</style>
