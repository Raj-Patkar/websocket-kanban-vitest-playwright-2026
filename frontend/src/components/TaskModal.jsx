import { useState } from "react";

export default function TaskModal({ task, onClose, onSave, mode = "edit" }) {
    const [title, setTitle] = useState(task.title || "");
    const [description, setDescription] = useState(task.description || "");
    const [priority, setPriority] = useState(task.priority || "Low");
    const [category, setCategory] = useState(task.category || "Feature");
    const [attachment, setAttachment] = useState(task.attachments?.[0] || null);
    return (
        <div style={overlay}>
            <div style={modal}>
                <h3>{mode === "create" ? "Add Task" : "Edit Task"}</h3>

                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                />

                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                />

                <label>Priority</label>
                <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <label>Category</label>
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="Bug">Bug</option>
                    <option value="Feature">Feature</option>
                    <option value="Enhancement">Enhancement</option>
                </select>

                <label>Attachment</label>

                <label
                    style={{
                        display: "inline-block",
                        padding: "6px 10px",
                        background: "#eee",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "4px"
                    }}
                >
                     Choose File
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={e => {
                            const file = e.target.files[0];
                            if (!file) return;

                            const reader = new FileReader();
                            reader.onload = () => {
                                setAttachment(reader.result);
                            };
                            reader.readAsDataURL(file);
                        }}
                    />
                </label>

                {/* IMAGE PREVIEW */}
                {attachment && (
                    <div style={{ marginTop: "8px" }}>
                        <img
                            src={attachment}
                            alt="preview"
                            style={{ width: "100px", borderRadius: "4px" }}
                        />
                    </div>
                )}

                <button
                    onClick={() =>
                        onSave({
                            title,
                            description,
                            priority,
                            category,
                            attachments: attachment
                                ? [attachment]     // replace on edit
                                : task.attachments || []
                        })
                    }
                >
                    {mode === "create" ? "Add" : "Save"}
                </button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div >
    );
}

const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.3)"
};
const modal = {
    background: "white",
    padding: 16,
    margin: "10% auto",
    width: 300
};