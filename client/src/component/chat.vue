<script setup>

// importer l'instance de socket

import { ref, onMounted } from 'vue';
import { socket } from '../socket/socketconnect';

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
    <div class="message_div">

        <ul class="message_li">
           
            <div v-for="(objet, index) in messages" class="chat" :class="objet.idUser === socket.id ? 'chat-end' : 'chat-start'" :key="index" id="chat">
                <div class="chat-image avatar">
                    <div class="w-10 rounded-full">
                    <img
                        src="../../public/img/719ec576-3f4e-4eaf-a4e7-a3bfa1d8dae3.webp"
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