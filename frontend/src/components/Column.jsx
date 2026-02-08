export default function Column({ title, children }) {
  return (
    <div className="kanban-column">
      <h3 className="kanban-column-title">{title}</h3>
      {children}
    </div>
  );
}