<script setup>
    // imports
        import { ref, nextTick } from 'vue';

        // ui components
            import MButton from '../../buttons/MButton.vue';
        // \\\ ui components
    // \\\ imports


    // global variables
        const notificationPopContainerIn = ref(null);
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
            const el = notificationPopContainerIn.value.$el;
            el.scrollTop = el.scrollHeight;
        });
    }
</script>


<template>
    <Teleport to="body">
        <div class="notification-pop-container">
            <div class="pos-abs top-30 left-30">
                <MButton @click="addChat">Add Chat</MButton>
            </div>

            <TransitionGroup
                class="notification-pop-container-in"
                ref="notificationPopContainerIn"
                tag="div"
                name="notification-pop"
            >
                <div class="chat-pops-container d-flx fD-C g-10">
                    <div class="notification-pop" v-for="chat in chats" :key="chat.id">
                        <h4 class="chat-title mB5">{{ chat.user_name }}</h4>
                        <p class="chat-msg"> {{ chat.text }} </p>
                    </div>
                </div>

                <div class="notes-pops-container">

                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>


<style scoped>
    .notification-pop-container {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        width: 100vw;
        height: 100vh;
        background-color: #28282878;

        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 1;
    }
    .notification-pop-container-in {
        display: flex;
        gap: 20px;
        max-height: 100vh;
        padding: 20px;
        /* border: 2px solid red; */
    }
    .chat-pops-container {
        height: 100%;
        overflow-y: auto;
        scroll-behavior: smooth;
    }
    .notification-pop {
        flex-shrink: 0;
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
