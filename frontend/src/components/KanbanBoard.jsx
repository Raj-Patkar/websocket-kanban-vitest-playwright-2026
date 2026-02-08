import Column from "./Column";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import TaskModal from "./TaskModal";
import "../kanban.css";
import TaskProgressCharts from "./TaskProgressCharts";
export default function KanbanBoard({ tasks, socket }) {

  const tasksByStatus = {
    todo: [],
    inprogress: [],
    done: []
  };

  Object.values(tasks).forEach(task => {
    if (tasksByStatus[task.status]) {
      tasksByStatus[task.status].push(task);
    }
  });

  Object.keys(tasksByStatus).forEach(status => {
    tasksByStatus[status].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );
  });

  const [editingTask, setEditingTask] = useState(null);
  const [creatingTask, setCreatingTask] = useState(false);

  const saveEdits = updates => {
    socket.emit("task:update", {
      taskId: editingTask.id,
      updates
    });
    setEditingTask(null);
  };

  const deleteTask = taskId => {
    socket.emit("task:delete", { taskId });
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

  const chartColumns = {
    Todo: tasksByStatus.todo,
    "In Progress": tasksByStatus.inprogress,
    Done: tasksByStatus.done
  };

  return (
    <div className="kanban-page">
      {/* Header */}
      <div className="kanban-header">
        <h2 className="kanban-title">Kanban Board</h2>
        <button
          className="kanban-add-btn"
          onClick={() => setCreatingTask(true)}
        >
          + Add Task
        </button>
      </div>

      <p className="kanban-hint">
        Click on any task card to edit or delete it
      </p>
      {/* Modals */}
      {editingTask && (
        <TaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={saveEdits}
          onDelete={deleteTask}
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
        <div className="kanban-board-wrapper">
          <div className="kanban-board">
            {/* TODO */}
            <Column title="To Do">
              <Droppable droppableId="todo">
                {provided => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-droppable">
                    {tasksByStatus.todo.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
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
                  <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-droppable">
                    {tasksByStatus.inprogress.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
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
                  <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-droppable">
                    {tasksByStatus.done.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
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
          <div className="kanban-analytics">
            <TaskProgressCharts columns={chartColumns} />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}