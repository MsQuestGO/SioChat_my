import { createServer } from "http";
import { Server } from "socket.io";

/**
 * 
 *  Créer un serveur HTTP pour relier au socket.io
 * 
 */

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*" // On crée un nouveau serveur avec la possibilité à tout le monde de se connecter (A changé pour plus de sécurité)
    }
})

io.on('connection', (Socket) => { // Qu'en utilisateur se connecte au serveur
    console.log(`l'utilisateur ${Socket.id} viens de se connecter`);

    Socket.on("envoyermesseage",(msg, me) =>{
        // Affichage du message dans les logs du serveur
        console.log("{" + msg + "}: messeage de l'utilisateur " + Socket.id + " à " + new Date());
        // Renvoil du messge à tous les utilisateurs (JSON)
        // idUser : id de l'expéditeur du message
        io.emit('recevoirmessage', {idUser: Socket.id, message : msg})
    });
    Socket.on('disconnect', () => {
        console.log(`l'utilisateur ${Socket.id} vient de se déconnecter`);
    });
});


const PORT = process.env.PORT || 3000; // Ouvre le port 3000
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
