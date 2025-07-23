import React, { useState, useEffect } from "react";
import UserSelector from "../UserSelector";
import API from "../../services/api";

export default function TaskForm({ task, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    due_date: "",
    assigned_user_id: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        due_date: task.due_date?.substring(0, 10) || "",
        assigned_user_id: task.assigned_user_id || "",
      });
    }
  }, [task]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (task?.id) {
        await API.put(`/tasks/${task.id}`, formData);
      } else {
        await API.post("/tasks/store", formData);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 bg-white rounded-xl shadow-lg w-full max-w-lg"
    >
      <h3 className="text-xl font-semibold text-gray-800">
        {task ? "✏️ Edit Task" : "➕ Add Task"}
      </h3>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          name="description"
          rows="4"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Due Date
          </label>
          <input
            type="date"
            name="due_date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600">
          Assigned User
        </label>
        <UserSelector
          value={formData.assigned_user_id}
          onChange={val =>
            setFormData(prev => ({ ...prev, assigned_user_id: val }))
          }
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all"
        >
          {task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
