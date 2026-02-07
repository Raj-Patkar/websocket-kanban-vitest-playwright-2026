import Column from "./Column";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function KanbanBoard({ tasks, socket }) {
  const taskList = Object.values(tasks);

  const onDragEnd = result => {
    const { destination, draggableId } = result;
    if (!destination) return;

    socket.emit("task:move", {
      taskId: draggableId,
      newStatus: destination.droppableId
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "16px" }}>

        {/* TO DO */}
        <Column title="To Do">
          <Droppable droppableId="todo">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {taskList
                  .filter(t => t.status === "todo")
                  .map((task, index) => (
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
                        >
                          <TaskCard task={task} />
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
                        >
                          <TaskCard task={task} />
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
                        >
                          <TaskCard task={task} />
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
  );
}