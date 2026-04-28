import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import "./App.css";

const initialTasks = [
{ id: 1, text: 'Complete React Session 3', completed: true },
{ id: 2, text: 'Read React docs', completed: false },
{ id: 3, text: 'Read React documentation', completed: false },
];
let nextId = 4;

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(text) {
    setTasks([...tasks, { id: nextId++, text, completed: false }]);
  }

  function handleToggle(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  function handleDelete(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function clearCompleted() {
    setTasks(tasks.filter(t => !t.completed));
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="todo-card">
      <h1>✓ My To-Do List</h1>

      <TaskInput onAddTask={handleAddTask} />

      <div className="task-info">
        <span>{activeCount} tasks remaining</span>
        <span>{completedCount} completed</span>
      </div>

      <FilterBar filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      {completedCount > 0 && (
        <button className="clear-btn" onClick={clearCompleted}>
          Clear {completedCount} Completed
        </button>
      )}
    </div>
  );
}

export default App;