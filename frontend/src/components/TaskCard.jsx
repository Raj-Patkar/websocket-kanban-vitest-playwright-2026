export default function TaskCard({ task , onEdit }) {
  return (
    <div style={{ background: "white", padding: "8px", marginBottom: "8px" , cursor: "pointer" }} onClick={() => onEdit(task)} >
      <strong>{task.title}</strong>
      <div>{task.priority}</div>
      <div>{task.category}</div>
    </div>
  );
}