// frontend/Dashboard.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTasks(data.tasks);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title: newTask }),
    });
    const data = await response.json();
    if (data.task) {
      setTasks([...tasks, data.task]);
      setNewTask("");
    }
  };

  const handleDeleteTask = async (id) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (data.message === "Task deleted successfully") {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  const handleToggleCompletion = async (id) => {
    const task = tasks.find((task) => task._id === id);
    const response = await fetch(`http://localhost:5000/api/tasks/${id}/complete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ completed: !task.completed }),
    });
    const data = await response.json();
    if (data.task) {
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, completed: data.task.completed } : task
        )
      );
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setNewTask(task.title);
  };

  const handleUpdateTask = async () => {
    const response = await fetch(`http://localhost:5000/api/tasks/${editTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title: newTask }),
    });
    const data = await response.json();
    if (data.task) {
      setTasks(
        tasks.map((task) =>
          task._id === data.task._id ? { ...task, title: data.task.title } : task
        )
      );
      setEditTask(null);
      setNewTask("");
    }
  };

  return (
    <div>
      <h2>Task Dashboard</h2>
      <input
        type="text"
        placeholder={editTask ? "Edit Task" : "New Task"}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={editTask ? handleUpdateTask : handleAddTask}>
        {editTask ? "Update Task" : "Add Task"}
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}{" "}
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task._id_
