import { io } from "socket.io-client";

// Création d'une liaison entre le client et le serveur

const URL = "http://172.16.5.240:3000"

export const socket = io(URL)
