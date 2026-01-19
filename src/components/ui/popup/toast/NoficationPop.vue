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
        <!-- new pop button -->
            <div class="d-flx g-20 aI-E pTB20 pos-fixed left-30 bottom-10 zi-2">
                <MButton @click="addChat">Add Chat</MButton>
                <MButton @click="addNote">Add Note</MButton>
            </div>
        <!-- \\\ new pop button -->


        <!-- chat notifications -->
            <div
                class="chat-pop-lists notification-pop-lists"
                ref="notificationPopChatListsIn"
                key="key-chat-lists"
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
            <div
                class="note-pop-lists notification-pop-lists"
                ref="notificationPopNoteListsIn"
                key="key-note-lists"
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
        <!-- \\\ note notifications -->
    </Teleport>
</template>


<!-- <style>
    #app-root {
        position: relative;
    }
    #app-root::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        pointer-events: auto;
        z-index: 1;
    }
</style> -->

<style scoped>
    .notification-pop-lists {
        /* sources */
            --w-notification-pop: 300px;
        /* \\\ sources */


        max-height: 100vh;
        padding: 15px;
        overflow-y: auto;
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
    .notification-pop:last-child {
        margin-bottom: 0px;
    }


    /* chat-pop-lists */
        .chat-pop-lists {
            inset-inline-end: 0px;
            z-index: 2;
        }
        .note-pop-lists-in {
            padding-block: 20px;
        }

        /* common animation frames */
            .chat-pop-move {
                transition: transform 0.5s ease;
            }
        /* \\\ commmon animation frames */

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
        /* \\\ chat-pop animation frames */
    /* \\\ chat-pop-lists */


    /* note-pop-lists */
        .note-pop-lists {
            inset-inline-end: calc(var(--w-notification-pop) + 20px);
            z-index: 3;
        }

        /* note-pop animation frames */
            .note-pop-enter-from {
                transform: translateX(200%);
                opacity: 0;
            }
            .note-pop-enter-to {
                transform: translateX(0);
                opacity: 1;
            }
            .note-pop-enter-active {
                transition: transform 0.5s ease, opacity 0.5s ease;
            }
        /* \\\ note-pop animation frames */
    /* \\\ note-pop-lists */
</style>
