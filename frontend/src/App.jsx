import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
function App() {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    socket.on("sync:tasks", updatedTasks => {
      setTasks(updatedTasks);
    });

    return () => {
      socket.off("sync:tasks");
    };
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => {
          console.log("EMITTING TASK CREATE");
          socket.emit("task:create", {
            id: Date.now().toString(),
            title: "Test Task",
            status: "todo",
            priority: "Low",
            category: "Feature",
            attachments: []
          });
        }}
      >
        Add Task
      </button>

      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}

export default App;
