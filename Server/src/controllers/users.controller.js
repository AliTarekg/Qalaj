const { pool } = require('../config/db');

exports.listUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email, role FROM users WHERE is_active = 1');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};
