<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header header">
                        <div class="fs-6 text-light text-shadow">
                            <strong>
                                Chats
                            </strong>
                        </div>
                    </div>
                    <div class="card-body custom-room">
                        <div v-for="room in rooms" :key="room.id">
                            <a href="#" class="thisrooms" @click="joinRoom(room.room_id)">
                                <div class="card myroom mb-2" :class="{'active':myRoom[room.room_id]}">
                                    <div class="card-body">{{ room.room_id }}</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header header">
                        <div class="fs-6 text-light text-shadow"><strong>
                            Admin
                        </strong></div>
                    </div>
                    <div class="card-body custom-body">
                        <div class="messages">
                        </div>
                    </div>
                    <div class="input-group">
                        <input type="text" placeholder="type your message...." v-model="context" class="form-control">
                        <button @click="sendMessage" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AuthenticationService from '@/service/AuthenticationService.js';
import {ref,watchEffect,onMounted} from 'vue'
import {io} from 'socket.io-client'
const rooms= ref([]);
let socket;
socket = io('http://localhost:3081')

const room_id = ref('')
const context = ref('')
const users = ref('')
const username = ref('')
users.value = sessionStorage.getItem('user')
username.value = JSON.parse(users.value);

const getMyRoom = async()=>{
    try {
        const response = await AuthenticationService.getMyRoom();
        if(response){
            rooms.value = response.data.myRoom
        }
    } catch (error) {
        console.log(error);
    }
}

const myRoom = ref({});

const joinRoom = (data) => {
    // Set all rooms to false
    room_id.value = data;
    for (const roomId in myRoom.value) {
        if (Object.hasOwnProperty.call(myRoom.value, roomId)) {
            myRoom.value[roomId] = false;
        }
    }

    // Set the clicked room to true
    myRoom.value[data] = true;

    let newData = {
        room_id: data,
        user_id: parseInt(username.value.id),
    };
    const messageBox = document.querySelector('.messages');
    let messageHTML = ``
    messageBox.innerHTML = messageHTML
    socket.emit('join-room', newData);
    getConvo(newData);
};


const getConvo = async(data)=>{
    try {
        const response = await AuthenticationService.getConvo(data)
        if(response){
            const convo = response.data.allConvo
            const messageBox = document.querySelector('.messages');
            let messageHTML = ``
            convo.forEach(data=>{
                if(data.user_id == username.value.id){
                    messageHTML+=`
                    <div class="d-flex justify-content-end mb-3 w-auto h-auto">
                        <div class="card bg-primary w-50 text-light">
                            <div class="card-body">
                                <p class="text-end">
                                    <strong>
                                        ${data.content}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    `
                }else{
                    messageHTML+=`
                    <div class="d-flex justify-content-start mb-3 w-auto h-auto">
                        <div class="card w-50">
                            <div class="card-body">
                                <p>
                                    <strong>
                                        ${data.content}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    `
                }
                messageBox.insertAdjacentHTML('beforeend', messageHTML);
            
        messageBox.scrollTop = messageBox.scrollHeight;
            })
          
        }
    } catch (error) {
        console.log(error)
    }
}
const sendMessage = async()=>{
  if(context.value == ''){
    alert('do not send empty message')
  }else{
    const data = {
      room_id:room_id.value,
      user_id:parseInt(username.value.id),
      context:context.value
    }
    console.log(context.value)
    socket.emit('send-message',data)
    context.value = ''
  }
}
const appendMessage = (data) => {
    const messageBox = document.querySelector('.messages');
    let messageHTML = '';

    if (data.user_id == username.value.id) {
        messageHTML = `
        <div class="d-flex justify-content-end mb-3 w-auto h-auto">
            <div class="card bg-primary w-50 text-light">
                <div class="card-body">
                    <p class="text-end">
                        <strong>
                            ${data.context}
                        </strong>
                    </p>
                </div>
            </div>
        </div>
        `;
    } else {
        messageHTML = `
        <div class="d-flex justify-content-start mb-3 w-auto h-auto">
            <div class="card w-50">
                <div class="card-body">
                    <p>
                        <strong>
                            ${data.context}
                        </strong>
                    </p>
                </div>
            </div>
        </div>
        `;
    }

    messageBox.insertAdjacentHTML('beforeend', messageHTML);
    messageBox.scrollTop = messageBox.scrollHeight;
};

onMounted(()=>{
    getMyRoom();
})
watchEffect(()=>{
    socket.on('connect',()=>{
        console.log('Socket.IO connected successfully!');
    })
    socket.on('chat-message', (data) => {
      console.log('Received chat message:', data);
      appendMessage(data)
    });
})
</script>

<style scoped>
.custom-body{
    height: 350px;
}
.text-shadow{
    text-shadow: 0 0 5px #000;
}
.header{
    background-color: #be9183ec;
}
.messages{
    height: 345px;
    overflow-y: scroll;
}
.custom-room{
    height: 350px;
    overflow-y: scroll;
}
.thisrooms{
    text-decoration: none;
}
.myroom:hover{
    box-shadow: 0 0 10px #000;
}
.active{
    box-shadow: 0 0 10px #000;
}
</style>