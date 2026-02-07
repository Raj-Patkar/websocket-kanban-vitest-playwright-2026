const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
let tasks = {};
// WebSocket flow:
// Client emits event → Server updates tasks → Server broadcasts full state
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("task:create", task => {
    console.log("TASK CREATE RECEIVED:", task);
    tasks[task.id] = task;
    io.emit("sync:tasks", tasks);
  });
  // TODO: Implement WebSocket events for task management

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("task:reorder", ({ taskId, newStatus, newOrder }) => {
    if (!tasks[taskId]) return;

    tasks[taskId].status = newStatus;
    tasks[taskId].order = newOrder;

    io.emit("sync:tasks", tasks);
  });

  socket.on("task:update", ({ taskId, updates }) => {
    if (!tasks[taskId]) return;
    tasks[taskId] = { ...tasks[taskId], ...updates };
    io.emit("sync:tasks", tasks);
  });
  socket.on("task:move", ({ taskId, newStatus }) => {
    if (tasks[taskId]) {
      tasks[taskId].status = newStatus;
      io.emit("sync:tasks", tasks);
    }
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
