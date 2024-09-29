import { Server } from 'socket.io';

let io;
const socketConfig = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins; update this as needed
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join a user to a chat room
    socket.on("joinRoom", ({ chatId }) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });

    // Listen for messages and broadcast to the room
    socket.on("sendMessage", ({ chatId, message }) => {
      io.to(chatId).emit("receiveMessage", message);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { socketConfig, getIo };
