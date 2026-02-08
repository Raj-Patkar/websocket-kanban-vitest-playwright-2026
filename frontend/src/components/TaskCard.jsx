export default function TaskCard({ task, onEdit }) {
  return (
    <div className="task-card" onClick={() => onEdit(task)}>
      {/* Title */}
      <h4 className="task-title">{task.title}</h4>

      {/* Description */}
      {task.description && (
        <p className="task-description">
          {task.description}
        </p>
      )}

      {/* Meta Info */}
      <div className="task-meta">
        <span
          className={`task-priority ${
            task.priority === "High"
              ? "priority-high"
              : task.priority === "Medium"
              ? "priority-medium"
              : "priority-low"
          }`}
        >
          {task.priority}
        </span>

        <span className="task-category">{task.category}</span>
      </div>

      {/* Attachment Preview */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="task-attachment">
          <img src={task.attachments[0]} alt="attachment" />
        </div>
      )}
    </div>
  );
}