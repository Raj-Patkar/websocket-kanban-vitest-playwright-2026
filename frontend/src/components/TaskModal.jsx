import { useState } from "react";

export default function TaskModal({ task, onClose, onSave }) {
    const [title, setTitle] = useState(task.title || "");
    const [description, setDescription] = useState(task.description || "");
    const [priority, setPriority] = useState(task.priority || "Low");
    const [category, setCategory] = useState(task.category || "Feature");
    return (
        <div style={overlay}>
            <div style={modal}>
                <h3>Edit Task</h3>

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

                <button
                    onClick={() =>
                        onSave({
                            title,
                            description,
                            priority,
                            category
                        })
                    }
                >
                    Save
                </button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
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