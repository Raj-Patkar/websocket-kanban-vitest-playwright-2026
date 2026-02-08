import { useState } from "react";

export default function TaskModal({ task, onClose, onSave, mode = "edit" }) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "Low");
  const [category, setCategory] = useState(task.category || "Feature");
  const [attachment, setAttachment] = useState(task.attachments?.[0] || null);

  return (
    <div className="task-modal-overlay">
      <div className="task-modal">
        <h3 className="task-modal-title">
          {mode === "create" ? "Add Task" : "Edit Task"}
        </h3>

        <input
          className="task-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="task-textarea"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />

        <label className="task-label">Priority</label>
        <select
          className="task-select"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="task-label">Category</label>
        <select
          className="task-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="Bug">Bug</option>
          <option value="Feature">Feature</option>
          <option value="Enhancement">Enhancement</option>
        </select>

        <label className="task-label">Attachment</label>

        <label className="task-file-btn">
          Choose File
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={e => {
              const file = e.target.files[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onload = () => setAttachment(reader.result);
              reader.readAsDataURL(file);
            }}
          />
        </label>

        {attachment && (
          <div className="task-preview">
            <img src={attachment} alt="preview" />
          </div>
        )}

        <div className="task-modal-actions">
          <button className="btn-primary"
            onClick={() =>
              onSave({
                title,
                description,
                priority,
                category,
                attachments: attachment
                  ? [attachment]
                  : task.attachments || []
              })
            }
          >
            {mode === "create" ? "Add" : "Save"}
          </button>

          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}