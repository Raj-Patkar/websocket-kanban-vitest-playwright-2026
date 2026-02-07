export default function Column({ title, children }) {
  return (
    <div style={{ width: "300px", background: "#f4f4f4", padding: "8px" }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}