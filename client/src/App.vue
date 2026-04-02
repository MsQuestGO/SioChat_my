<script setup>

// importer l'instance de socket

import { ref, onMounted } from 'vue';
import { socket } from './socket/socketconnect';

const message = ref(""); // Message saisi par l'utilisateur
const messages = ref([]); // Message envoyé ou reçu



// userId de l' utilisiteur

// Envoi du formulaire
function sendMessage(){
    if (message.value.trim() !== "") {
        socket.emit("envoyermesseage", message.value , true); // la dernière valeur sert à savoir si c'est lui qui a envoyé le message
        message.value = "";
    }
}

// quand le client reçoit un message

onMounted(() => {

    socket.on("recevoirmessage", (objet) =>{
        messages.value.push(objet);
        const list = document.querySelector('.message_li')
        list.scrollTop = list.scrollHeight
    });
});

function formatDate(date) {
  return date.toLocaleDateString() + " à " + date.toLocaleTimeString([], {  // prent en parametre le jour et l'heure locale de l'utilisateur
    hour: '2-digit',
    minute: '2-digit'
  });
}

</script>

<template>

    <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">TetoChat</a>
        </div>
        <div class="flex gap-2">
            <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src="../public/img/719ec576-3f4e-4eaf-a4e7-a3bfa1d8dae3.webp" />
                </div>
            </div>
            <ul
                tabindex="-1"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                <a class="justify-between">
                    Profile
                    <span class="badge">New</span>
                </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
            </div>
        </div>
    </div>

    <div>

        <ul class="message_li">
           
            <div v-for="(objet, index) in messages" class="chat" :class="objet.idUser === socket.id ? 'chat-end' : 'chat-start'" :key="index" id="chat">
                <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                    <img
                        src="../public/img/719ec576-3f4e-4eaf-a4e7-a3bfa1d8dae3.webp"
                    />
                    </div>
                </div>
                <div class="chat-header">
                    {{ objet.idUser }}
                    <time class="text-xs opacity-50">{{ formatDate(new Date()) }}</time>
                </div>
                <div class="chat-bubble">{{ objet.message }}</div>
            </div>

        </ul>

    </div>

    <div class="form">
        <form class="form" @submit.prevent="sendMessage()">
            <input class="input input-sm" v-model="message" placeholder="Votre message"/>
            <button class="btn btn-sm" type="submit">Envoyer</button>
        </form>
    </div>
</template>
