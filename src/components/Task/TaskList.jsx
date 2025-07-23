import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../redux/taskSlice";
import API from "../../services/api";
import Swal from "sweetalert2";
import TaskForm from "./TaskForm";
import UserSelector from "../UserSelector";
import TaskModal from "./TaskModal";
import TaskFilter from "./TaskFilter";

export default function TaskList() {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [filters, setFilters] = useState({ status: "", user_id: "" });
  const { list, pagination } = useSelector(state => state.tasks);
  const [editTaskModal, setEditTaskModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [createTaskModal, setCreateTaskModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks({ page: currentPage, ...filters }));
  }, [dispatch, currentPage ,filters]);

  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the task permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await API.delete(`/tasks/${taskId}`);
      dispatch(fetchTasks({ page: currentPage, ...filters }));
      Swal.fire("Deleted!", "Task has been deleted.", "success");
    }
  };

  const handleView = (task) => {
     setSelectedTask(task);
  };


const filteredTasks = list;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📝 Task List</h2>
          <button
              onClick={() => setCreateTaskModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            ➕ Create Task
          </button>
      </div>

      <TaskFilter
        filters={filters}
        setFilters={setFilters}
        setCurrentPage={setCurrentPage}
      />


      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Assigned User</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-4 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            ) : (
              filteredTasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{task.title}</td>
                  
                  <select
                        value={task.status}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          try {
                            await API.put(`/tasks/${task.id}`, { status: newStatus });
                            Swal.fire("Success", "Status updated successfully", "success");
                            dispatch(fetchTasks({ page: currentPage, ...filters }));
                          } catch (err) {
                            console.error(err);
                            Swal.fire("Error", "Failed to update status", "error");
                          }
                        }}
                        className={`px-2 py-1 rounded text-xs font-semibold border focus:outline-none ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    </select>
                  <td className="px-4 py-2">{task.due_date}</td>
                  <td className="px-4 py-2">{task.user?.name || "Unassigned"}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleView(task)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                       onClick={() => setEditTaskModal(task)}
                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                        Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
       
          {/* Pagination Buttons */}
            {pagination.last_page > 1 && (
            <div className="flex gap-2 mt-6 justify-center">
              {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded border ${
                    page === pagination.current_page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}

        <p className="text-center text-sm text-gray-600 mt-2">
          Page {pagination.current_page} of {pagination.last_page} | Total: {pagination.total} tasks
        </p>

        {selectedTask && (
        <TaskModal
            task={selectedTask} // no task, create mode
            onClose={() => setSelectedTask(false)}
            action="view"
          />
        )}  
      
      {/* Create Modal */}
        {createTaskModal && (
          <TaskModal
            task={null} // no task, create mode
            onClose={() => setCreateTaskModal(false)}
            onSuccess={() => {
              dispatch(fetchTasks({ page: currentPage, ...filters }));
              setCreateTaskModal(false);
            }}
            action="create"
          />
        )}

      {/* Edit Form */}
        {editTaskModal && (
          <TaskModal
            task={editTaskModal}
            onClose={() => setEditTaskModal(null)}
            onSuccess={() => {
              dispatch(fetchTasks());
              setEditTaskModal(null);
            }}
            action="edit"
          />
        )}
    </div>
  );
}
