const pool = require("../config/db");

const getTasks = async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
  res.json(result.rows);
};

const createTask = async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *",
    [title, false]
  );
  res.json(result.rows[0]);
};

const toggleTask = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
    [id]
  );
  res.json(result.rows[0]);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  res.json({ message: "Tarefa removida" });
};

module.exports = { getTasks, createTask, toggleTask, deleteTask };
