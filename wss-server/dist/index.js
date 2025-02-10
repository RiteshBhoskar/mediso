"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const prisma_1 = __importDefault(require("./prisma"));
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
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
                    yield prisma_1.default.message.create({
                        data: {
                            appointmentId: parseInt(parsedMessage.payload.appointmentId),
                            content: messageContent,
                            sender: messageSender,
                            isRead: false,
                        }
                    });
                    console.log(`Message stored in database for appointment ${parsedMessage.payload.appointmentId} with isRead: false`);
                }
                catch (error) {
                    console.error("Error saving message to database:", error);
                }
                allSockets.forEach((user) => {
                    if (user.room === currentUser.room && user.socket !== socket) {
                        user.socket.send(JSON.stringify({
                            type: "chat",
                            payload: { message: messageContent, sender: messageSender }
                        }));
                    }
                });
            }
        }
        catch (error) {
            console.error("Error handling message:", error);
        }
    }));
    socket.on("close", () => {
        allSockets = allSockets.filter((user) => user.socket !== socket);
        console.log("Client disconnected");
    });
});
