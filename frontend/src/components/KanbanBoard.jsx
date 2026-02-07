import Column from "./Column";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import TaskModal from "./TaskModal";

export default function KanbanBoard({ tasks, socket }) {
  const taskList = Object.values(tasks).sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  const [editingTask, setEditingTask] = useState(null);
  const [creatingTask, setCreatingTask] = useState(false);

  const saveEdits = updates => {
    socket.emit("task:update", {
      taskId: editingTask.id,
      updates
    });
    setEditingTask(null);
  };

  const onDragEnd = result => {
    const { destination, draggableId } = result;
    if (!destination) return;

    socket.emit("task:reorder", {
      taskId: draggableId,
      newStatus: destination.droppableId,
      newOrder: destination.index
    });
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Kanban Board</h2>
        <button
          style={styles.addButton}
          onClick={() => setCreatingTask(true)}
        >
          + Add Task
        </button>
      </div>

      {/* Modals */}
      {editingTask && (
        <TaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={saveEdits}
        />
      )}

      {creatingTask && (
        <TaskModal
          mode="create"
          task={{}}
          onClose={() => setCreatingTask(false)}
          onSave={updates => {
            socket.emit("task:create", {
              id: Date.now().toString(),
              title: updates.title,
              description: updates.description,
              priority: updates.priority,
              category: updates.category,
              attachments: updates.attachments || [],
              status: "todo",
              order: Date.now()
            });
            setCreatingTask(false);
          }}
        />
      )}

      {/* Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={styles.board}>
          {/* TO DO */}
          <Column title="To Do">
            <Droppable droppableId="todo">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {taskList
                    .filter(t => t.status === "todo")
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              marginBottom: "12px"
                            }}
                          >
                            <TaskCard
                              task={task}
                              onEdit={() => setEditingTask(task)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Column>

          {/* IN PROGRESS */}
          <Column title="In Progress">
            <Droppable droppableId="inprogress">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {taskList
                    .filter(t => t.status === "inprogress")
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              marginBottom: "12px"
                            }}
                          >
                            <TaskCard
                              task={task}
                              onEdit={() => setEditingTask(task)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Column>

          {/* DONE */}
          <Column title="Done">
            <Droppable droppableId="done">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {taskList
                    .filter(t => t.status === "done")
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              marginBottom: "12px"
                            }}
                          >
                            <TaskCard
                              task={task}
                              onEdit={() => setEditingTask(task)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Column>
        </div>
      </DragDropContext>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFDF6",
    padding: "24px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 600,
    color: "#2F3E1E"
  },
  addButton: {
    background: "#A0C878",
    border: "none",
    borderRadius: "8px",
    padding: "10px 16px",
    cursor: "pointer",
    fontWeight: 600,
    color: "#1F2A12"
  },
  board: {
    display: "flex",
    gap: "20px"
  }
};