export default function TaskCard({ task, onEdit }) {
  return (
    <div style={{ background: "white", padding: "8px", marginBottom: "8px", cursor: "pointer" }} onClick={() => onEdit(task)} >
      <strong>{task.title}</strong>
      <div>{task.priority}</div>
      <div>{task.category}</div>
      {task.attachments && task.attachments.length > 0 && (
        <img
          src={task.attachments[0]}
          alt="attachment"
          style={{ width: "50px", marginTop: "6px" }}
        />
      )}
    </div>
  );
}