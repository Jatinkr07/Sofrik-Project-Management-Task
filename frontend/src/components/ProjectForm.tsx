import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import type { Project } from "../types";
import { API_URL } from "../utils/api";

interface ProjectFormProps {
  onSubmitSuccess: () => void;
  project?: Project;
}

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  status: yup
    .string()
    .oneOf(["active", "completed"])
    .required("Status is required"),
});

interface FormData {
  title: string;
  description?: string;
  status: "active" | "completed";
}

function ProjectForm({ onSubmitSuccess, project }: ProjectFormProps) {
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: project || {
      title: "",
      description: "",
      status: "active",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (project) {
        await axios.put(`${API_URL}/api/projects/${project._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/api/projects`, data, {
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
        {project ? "Edit Project" : "Create Project"}
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
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {project ? "Update" : "Create"}
      </button>
    </form>
  );
}

export default ProjectForm;
