const { pool } = require('../config/db');

exports.listItems = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

exports.getItem = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Item not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, description, price, stock, image_url, sizes } = req.body;
    const [result] = await pool.query(
      'INSERT INTO items (name, description, price, stock, image_url, sizes) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, stock || 0, image_url || '', sizes || '']
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating item' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, description, price, stock, image_url, sizes } = req.body;
    const [result] = await pool.query(
      'UPDATE items SET name=?, description=?, price=?, stock=?, image_url=?, sizes=? WHERE id=?',
      [name, description, price, stock, image_url || '', sizes || '', req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM items WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};
