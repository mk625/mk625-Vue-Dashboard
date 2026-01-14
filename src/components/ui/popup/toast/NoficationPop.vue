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
            // {
            //     id: 5,
            //     user_name: 'Meeha',
            //     text: 'What are you doing?'
            // },
            // {
            //     id: 6,
            //     user_name: 'Muthu',
            //     text: 'I am going to the market alskdfjadsf ajsdfl aksjf. dfa lskdfjklasjdf. asdflkas aslidjf klasdjf asldkfj asldfjklsadjf lkasjdf '
            // },
            // {
            //     id: 7,
            //     user_name: 'Meeha',
            //     text: 'What are you doing? aslkdfj ajfd. asdl;fjklasdjf klasjfd ldaf '
            // },
            // {
            //     id: 8,
            //     user_name: 'Muthu',
            //     text: 'I am going to the market. aklsdjfl alksdfj.'
            // },
        ])
        // const notes = ref([
        //     {
        //         id: 1,
        //         title: 'Note 1',
        //         text: 'This is a note'
        //     },
        //     {
        //         id: 2,
        //         title: 'Note 2',
        //         text: 'This is a note lkasjd fkljsadf klj askldfj '
        //     },
        //     {
        //         id: 3,
        //         title: 'Note 3',
        //         text: 'This is a note jlkasdfj kalsdjf lkasdfj lkajfd'
        //     },
        // ])
    // \\\ global variables



    function addChat() {
        chats.value.push({
            id: chats.value.length + 1,
            user_name: 'Meeha',
            text: 'What are you doing?'
        });

        nextTick(() => {
            const el = notificationPopChatListsIn.value.$ele;
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
                    <div class="d-flx aI-E pTB20">
                        <MButton @click="addChat">Add Chat</MButton>
                    </div>
                <!-- \\\ new pop button -->

                <!-- chat notifications -->
                    <TransitionGroup
                        tag="div"
                        class="notification-pop-lists"
                        name="chat-pop-lists"
                        ref="notificationPopChatListsIn"
                    >
                        <div class="notification-pop chat-pop" v-for="chat in chats" :key="chat.id">
                            <h4 class="mB5">{{ chat.user_name }}</h4>
                            <p> {{ chat.text }} </p>
                        </div>
                    </TransitionGroup>
                <!-- \\\ chat notifications -->

                <!-- note notifications -->
                    <TransitionGroup
                        tag="div"
                        class="notification-pop-lists"
                        name="note-pop-lists"
                    >
                        <div class="notification-pop note-pop">
                            <h4 class="mB5">Note 1</h4>
                            <p> This is a note adfjaks dfjlkasjdf lkasjdflkas jdfkasjflk jlk.</p>
                        </div>
                    </TransitionGroup>
                <!-- \\\ note notifications -->
            </TransitionGroup>
        </div>
    </Teleport>
</template>


<style scoped>
    .notification-pop-container {
        display: grid;
        place-items: end;
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
        grid-auto-flow: column;
        place-items: end;
        gap: 20px;
        padding-inline: 20px;
        /* border: 2px solid red; */
    }
    .notification-pop-lists {
        display: grid;
        place-content: end;
        gap: 10px;
        padding-block: 20px;

        height: 100vh;
        overflow-y: auto;
        scroll-behavior: smooth;

        border: 2px solid red;
    }
    .notification-pop {
        max-width: 300px;
        padding: 15px;
        background-color: #dbe2ec;
        border-radius: 10px;
    }

    /* animation frames */
        .notification-pop-enter-from {
            transform: translateX(100%);
            opacity: 0;
        }
        .notification-pop-enter-to {
            transform: translateX(0);
            opacity: 1;
        }
        .notification-pop-enter-active {
            transition: transform 1s ease, opacity 1s ease;
        }
        .notification-pop-move {
            transition: transform 1s ease;
        }
    /* \\\ animation frames */
</style>
