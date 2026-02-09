import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("https://kanban-board-assignment-55ov.onrender.com/");
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
      <KanbanBoard tasks={tasks} socket={socket}/>
    </div>
  );
}

export default App;
