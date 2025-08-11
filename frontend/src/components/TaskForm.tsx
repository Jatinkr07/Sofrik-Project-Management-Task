import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import type { Task } from "../types";
import { API_URL } from "../utils/api";

interface TaskFormProps {
  projectId: string;
  onSubmitSuccess: () => void;
  task?: Task;
}

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  status: yup.string().oneOf(["todo", "in-progress", "done"]).required(),
  dueDate: yup.string().required(),
});

interface FormData {
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
}

function TaskForm({ projectId, onSubmitSuccess, task }: TaskFormProps) {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: task || {
      title: "",
      description: "",
      status: "todo",
      dueDate: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (task) {
        await axios.put(`${API_URL}/api/tasks/${projectId}/${task._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/api/tasks/${projectId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSubmitSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">
        {task ? "Edit Task" : "Create Task"}
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input {...register("title")} className="w-full p-2 border rounded" />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Status</label>
        <select {...register("status")} className="w-full p-2 border rounded">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <input
          type="date"
          {...register("dueDate")}
          className="w-full p-2 border rounded"
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {task ? "Update" : "Create"}
      </button>
    </form>
  );
}

export default TaskForm;
