import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks");
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!newTask) return;
    await axios.post("http://localhost:5000/tasks", { title: newTask });
    setNewTask("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await axios.put(`http://localhost:5000/tasks/${id}/toggle`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Gerenciador de Tarefas</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Adicionar nova tarefa"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar
        </button>
      </div>
      <ul className="list-disc pl-5">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 border-b">
            <span
              onClick={() => toggleTask(task.id)}
              className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
