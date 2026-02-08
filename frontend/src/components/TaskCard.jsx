export default function TaskCard({ task, onEdit }) {

  const PRIORITY_TEXT = {
    Low: "Low Priority",
    Medium: "Medium Priority",
    High: "High Priority"
  };
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
        <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
          {PRIORITY_TEXT[task.priority]}
        </span>

        <span className="task-category">{task.category}</span>
      </div>

      {/* Attachment Preview */}
      {task.attachments?.[0] && (
        <div className="task-attachment">
          {task.attachments[0].type === "application/pdf" ? (
            <div style={{ padding: "8px", fontSize: "13px" }}>
              📄 {task.attachments[0].name}
            </div>
          ) : (
            <img
              src={task.attachments[0].data}
              alt={task.attachments[0].name}
            />
          )}
        </div>
      )}
    </div>
  );
}