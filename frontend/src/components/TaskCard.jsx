export default function TaskCard({ task, onEdit }) {
  return (
    <div
      onClick={() => onEdit(task)}
      className="
        bg-[#FAF6E9]
        rounded-xl
        p-4
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        border border-[#DDEB9D]
      "
    >
      {/* Title */}
      <h4 className="font-semibold text-[#2F3E1E] text-base">
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p
          className="
            mt-2
            text-sm
            text-[#4B5A2A]
            line-clamp-2
          "
        >
          {task.description}
        </p>
      )}

      {/* Meta Info */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {/* Priority */}
        <span
          className={`
            px-2 py-1 text-xs font-medium rounded-full
            ${task.priority === "High"
              ? "bg-red-100 text-red-700"
              : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }
          `}
        >
          {task.priority}
        </span>

        {/* Category */}
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#DDEB9D] text-[#2F3E1E]">
          {task.category}
        </span>
      </div>

      {/* Attachment Preview */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="mt-3">
          <img
            src={task.attachments[0]}
            alt="attachment"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #DDEB9D"
            }}
          />
        </div>
      )}
    </div>
  );
}