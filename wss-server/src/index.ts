import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const rooms = new Map();

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());
      
      if (parsedMessage.type === "join") {
        const { appointmentId } = parsedMessage.payload;
        if (!rooms.has(appointmentId)) {
          rooms.set(appointmentId, new Set());
        }
        rooms.get(appointmentId).add(ws);
        console.log(`User joined appointment room: ${appointmentId}`);
      }
      
      if (parsedMessage.type === "chat") {
        const { appointmentId, message } = parsedMessage.payload;
        if (rooms.has(appointmentId)) {
          for (const client of rooms.get(appointmentId)) {
            if (client !== ws && client.readyState === ws.OPEN) {
              client.send(JSON.stringify({ type: "chat", message }));
            }
          }
        }
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => {
    for (const [appointmentId, clients] of rooms.entries()) {
      clients.delete(ws);
      if (clients.size === 0) {
        rooms.delete(appointmentId);
      }
    }
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log("WebSocket server running on ws://localhost:8080");
