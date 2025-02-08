"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("message", (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            console.log("Received message:", parsedMessage);
            if (parsedMessage.type === "join") {
                const { appointmentId, senderType } = parsedMessage.payload; // Expecting senderType in join payload
                allSockets.push({ socket, room: appointmentId, senderType }); // Store senderType
                console.log(`User of type ${senderType} joined room: ${appointmentId}`);
            }
            if (parsedMessage.type === "chat") {
                const { appointmentId, message: messageContent, sender: messageSender } = parsedMessage.payload; // Get sender from chat payload
                const currentUser = allSockets.find((user) => user.socket === socket);
                if (!currentUser) {
                    console.log("Warning: Sender user not found in allSockets."); // Debugging log
                    return; // Exit if sender not found
                }
                allSockets.forEach((user) => {
                    if (user.room === currentUser.room && user.socket !== socket) {
                        // Correctly broadcast message with sender info
                        user.socket.send(JSON.stringify({
                            type: "chat",
                            payload: { message: messageContent, sender: messageSender } // Send message and sender
                        }));
                    }
                });
            }
        }
        catch (error) {
            console.error("Error handling message:", error);
        }
    });
    socket.on("close", () => {
        allSockets = allSockets.filter((user) => user.socket !== socket);
        console.log("Client disconnected");
    });
});
