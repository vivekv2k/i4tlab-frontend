import React from "react";
import { X } from "lucide-react";

export default function TaskDetails({ task, onClose }) {
  if (!task) return <p className="text-gray-500 italic">No task selected</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200 max-w-lg mx-auto animate-scale-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">📝 Task Details</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">Title:</span> {task.title}
        </p>
        <p>
          <span className="font-medium">Description:</span>{" "}
          {task.description || <span className="text-gray-400 italic">N/A</span>}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
              task.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task.status}
          </span>
        </p>
        <p>
          <span className="font-medium">Due Date:</span> {task.due_date}
        </p>
        <p>
          <span className="font-medium">Assigned User:</span>{" "}
          {task.user?.name || <span className="text-gray-400 italic">Unassigned</span>}
        </p>
      </div>
    </div>
  );
}
