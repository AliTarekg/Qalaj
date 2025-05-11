const { pool } = require('../config/db');

exports.listOrderItems = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [req.params.orderId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order items' });
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    const { order_id, item_id, description, quantity, unit_price } = req.body;
    if (!order_id || !item_id || !quantity || !unit_price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Optionally, check if item exists and update stock
    const [itemRows] = await pool.query('SELECT * FROM items WHERE id = ?', [item_id]);
    if (itemRows.length === 0) {
      return res.status(400).json({ message: 'Item does not exist' });
    }
    if (itemRows[0].stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock' });
    }
    await pool.query('UPDATE items SET stock = stock - ? WHERE id = ?', [quantity, item_id]);
    const [result] = await pool.query(
      'INSERT INTO order_items (order_id, supplier_id, description, quantity, unit_price) VALUES (?, NULL, ?, ?, ?)',
      [order_id, description, quantity, unit_price]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order item' });
  }
};
