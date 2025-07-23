import React from "react";
import ReactDOM from "react-dom";
import TaskForm from "./TaskForm";
import TaskDetails from "./TaskDetails";

export default function EditTaskModal({ task, onClose, onSuccess, action }) {
  const getTitle = () => {
    if (action === "view") return "View";
    if (action === "edit") return "Edit";
    if (action === "create") return "Create";
    return "";
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md animate-scale-in shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">{getTitle()}</h2>
        {action === "view" ? (
          <TaskDetails task={task} onSuccess={onSuccess} />
        ) : (
          <TaskForm task={task} onSuccess={onSuccess} />
        )}
      </div>
    </div>,
    document.body
  );
}
