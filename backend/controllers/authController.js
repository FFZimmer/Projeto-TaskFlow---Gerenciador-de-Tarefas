const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, hashedPassword]
  );
  res.json(result.rows[0]);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  if (user.rows.length === 0) return res.status(401).json({ message: "Usuário não encontrado" });
  const isValid = await bcrypt.compare(password, user.rows[0].password);
  if (!isValid) return res.status(401).json({ message: "Senha incorreta" });
  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

module.exports = { registerUser, loginUser };
