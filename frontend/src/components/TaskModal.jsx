import { useState } from "react";

export default function TaskModal({ task, onClose, onSave, onDelete, mode = "edit" }) {
    const [title, setTitle] = useState(task.title || "");
    const [description, setDescription] = useState(task.description || "");
    const [priority, setPriority] = useState(task.priority || "Low");
    const [category, setCategory] = useState(task.category || "Feature");
    const [attachment, setAttachment] = useState(task.attachments?.[0] || null);
    const [fileError, setFileError] = useState("");
    const ALLOWED_TYPES = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "application/pdf"
    ];
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
                        accept="image/*,application/pdf"
                        hidden
                        onChange={e => {
                            const file = e.target.files[0];
                            if (!file) return;

                            // ❌ Validation
                            if (!ALLOWED_TYPES.includes(file.type)) {
                                setFileError("Only images (PNG, JPG, WEBP) or PDF files are allowed.");
                                return;
                            }

                            setFileError("");

                            const reader = new FileReader();
                            reader.onload = () => {
                                setAttachment({
                                    name: file.name,
                                    type: file.type,
                                    data: reader.result
                                });
                            };

                            reader.readAsDataURL(file);
                        }}
                    />
                </label>
                {fileError && (
                    <p
                        style={{
                            marginTop: "6px",
                            fontSize: "12px",
                            color: "#b91c1c"
                        }}
                    >
                        {fileError}
                    </p>
                )}

                {attachment && (
                    <div className="task-preview">
                        {attachment.type === "application/pdf" ? (
                            <div style={{ padding: "8px", fontSize: "13px" }}>
                                📄 {attachment.name}
                            </div>
                        ) : (
                            <img src={attachment.data} alt="preview" />
                        )}
                    </div>
                )}

                <div className="task-modal-actions">
                    <button className="btn-secondary" onClick={onClose}>
                        Cancel
                    </button>

                    {mode !== "create" && (
                        <button
                            className="btn-danger"
                            onClick={() => onDelete?.(task.id)}
                        >
                            Delete
                        </button>
                    )}

                    <button
                        className="btn-primary"
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
                </div>
            </div>
        </div>
    );
}