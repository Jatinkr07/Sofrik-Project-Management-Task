import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import type { Task } from "../types";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../utils/api";

function ProjectDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(
      `${API_URL}/api/tasks/${id}?status=${statusFilter}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const handleDelete = async (taskId: string) => {
    await axios.delete(`${API_URL}/api/tasks/${id}/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Project Details</h1>
        <TaskForm projectId={id!} onSubmitSuccess={fetchTasks} />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(tasks) &&
            tasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={handleDelete} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
