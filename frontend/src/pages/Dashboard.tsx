import { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import type { Project } from "../types";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../utils/api";

function Dashboard() {
  const { token, logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const fetchProjects = async () => {
    const res = await axios.get(
      `${API_URL}/api/projects?page=${page}&search=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setProjects(res.data.projects);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchProjects();
  }, [page, search]);

  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
        <ProjectForm onSubmitSuccess={fetchProjects} />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(projects) &&
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={handleDelete}
              />
            ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page * 10 >= total}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
