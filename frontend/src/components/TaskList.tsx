import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../utils/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

interface Props {
  projectId: string;
}

const TaskList: React.FC<Props> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get(
        `${API_URL}/api/tasks/${projectId}${filter ? `?status=${filter}` : ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(res.data);
    };
    fetchTasks();
  }, [projectId, filter, token]);

  const deleteTask = async (id: string) => {
    await axios.delete(`${API_URL}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div>
      <h3>Tasks</h3>
      <select
        onChange={(e) => setFilter(e.target.value)}
        className="form-select mb-3"
      >
        <option value="">All</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="list-group-item d-flex justify-content-between"
          >
            {task.title} ({task.status}) - Due: {task.dueDate}
            <button
              onClick={() => deleteTask(task._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
