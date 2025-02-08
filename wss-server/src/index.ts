import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
    senderType?: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            console.log("Received message:", parsedMessage);

            if (parsedMessage.type === "join") {
                const { appointmentId, senderType } = parsedMessage.payload;
                allSockets.push({ socket, room: appointmentId, senderType });
                console.log(`User of type ${senderType} joined room: ${appointmentId}`);
            }

            if (parsedMessage.type === "chat") {
                const { appointmentId, message: messageContent, sender: messageSender } = parsedMessage.payload;

                const currentUser = allSockets.find((user) => user.socket === socket);
                if (!currentUser) {
                    console.log("Warning: Sender user not found in allSockets.");
                    return;
                }

                allSockets.forEach((user) => {
                    if (user.room === currentUser.room && user.socket !== socket) {
                        user.socket.send(
                            JSON.stringify({
                                type: "chat",
                                payload: { message: messageContent, sender: messageSender }
                            })
                        );
                    }
                });
            }
        } catch (error) {
            console.error("Error handling message:", error);
        }
    });

    socket.on("close", () => {
        allSockets = allSockets.filter((user) => user.socket !== socket);
        console.log("Client disconnected");
    });
});