import type { Project } from "../types";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold">{project.title}</h3>
      <p>{project.description}</p>
      <p className="text-sm text-gray-500">Status: {project.status}</p>
      <div className="mt-2">
        <button
          onClick={() => navigate(`/projects/${project._id}`)}
          className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          View Details
        </button>
        <button
          onClick={() => onDelete(project._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
