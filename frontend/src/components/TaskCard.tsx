import type { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-500">Status: {task.status}</p>
      <p className="text-sm text-gray-500">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <button
        onClick={() => onDelete(task._id)}
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;
