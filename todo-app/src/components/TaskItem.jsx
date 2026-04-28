function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <span>{task.text}</span>

      <button onClick={() => onDelete(task.id)}>✕</button>
    </li>
  );
}

export default TaskItem;