import type { Task } from "../types/task";

interface Props {
  task: Task;
  onStatusChange: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({
  task,
  onStatusChange,
  onDelete,
}: Props) {
  return (
    <li className="task-item">
      <div>
        <strong>{task.name}</strong>
        <p>{task.description}</p>
        <small>
          {task.priority} | {task.assignedTo} | {task.assignedTime}
        </small>
      </div>

      <div>
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task["status"])
          }
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button onClick={() => onDelete(task.id)}>❌</button>
      </div>
    </li>
  );
}
