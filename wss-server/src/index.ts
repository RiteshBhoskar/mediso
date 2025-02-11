import { WebSocketServer, WebSocket } from "ws";
import prisma from "./prisma";

const port = parseInt(process.env.PORT || '8080', 10);
console.log(`Starting WebSocket server on port ${port}`);

const wss = new WebSocketServer({ port: port });

interface User {
    socket: WebSocket;
    room: string;
    senderType?: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", async (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            console.log("Received message:", parsedMessage);

            if (parsedMessage.type === "join") {
                const { appointmentId, senderType } = parsedMessage.payload;
                allSockets.push({ socket, room: appointmentId, senderType });
                console.log(`User of type ${senderType} joined room: ${appointmentId}`);
            }

            if (parsedMessage.type === "chat") {
                const { message: messageContent, sender: messageSender } = parsedMessage.payload;

                const currentUser = allSockets.find((user) => user.socket === socket);
                if (!currentUser) {
                    console.log("Warning: Sender user not found in allSockets.");
                    return;
                }

                try {
                  await prisma.message.create({
                    data: {
                      appointmentId: parseInt(parsedMessage.payload.appointmentId),
                      content: messageContent,
                      sender: messageSender,
                      isRead: false,
                    }
                  })
                  console.log(`Message stored in database for appointment ${parsedMessage.payload.appointmentId} with isRead: false`);
                } catch (error) {
                  console.error("Error saving message to database:", error);
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