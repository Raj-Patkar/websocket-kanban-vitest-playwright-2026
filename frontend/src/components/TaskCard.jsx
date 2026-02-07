export default function TaskCard({ task }) {
  return (
    <div style={{ background: "white", padding: "8px", marginBottom: "8px" }}>
      <strong>{task.title}</strong>
    </div>
  );
}