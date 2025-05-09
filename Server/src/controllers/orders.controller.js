const { pool } = require('../config/db');

exports.listOrders = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Order not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { customer_id, inquiry_id, client_name, order_date, delivery_date, total_amount, status, notes } = req.body;
    if (!client_name || !order_date || !total_amount || !customer_id) {
      return res.status(400).json({ message: 'Missing required fields: client_name, order_date, total_amount, customer_id' });
    }
    // Check if customer exists
    const [customers] = await pool.query('SELECT id FROM customers WHERE id = ?', [customer_id]);
    if (customers.length === 0) {
      return res.status(400).json({ message: 'Customer does not exist' });
    }
    // If inquiry_id is provided, check if it exists
    if (inquiry_id) {
      const [inquiries] = await pool.query('SELECT id FROM inquiries WHERE id = ?', [inquiry_id]);
      if (inquiries.length === 0) {
        return res.status(400).json({ message: 'Inquiry does not exist' });
      }
    }
    const [result] = await pool.query(
      'INSERT INTO orders (customer_id, inquiry_id, client_name, order_date, delivery_date, total_amount, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [customer_id, inquiry_id || null, client_name, order_date, delivery_date, total_amount, status || 'pending', notes]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { client_name, order_date, delivery_date, total_amount, status, notes } = req.body;
    const [result] = await pool.query(
      'UPDATE orders SET client_name=?, order_date=?, delivery_date=?, total_amount=?, status=?, notes=? WHERE id=?',
      [client_name, order_date, delivery_date, total_amount, status, notes, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating order' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting order' });
  }
};

exports.getOrderItems = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC', [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order items' });
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    const { supplier_id, description, quantity, unit_price } = req.body;
    const order_id = req.params.id;
    const [result] = await pool.query(
      'INSERT INTO order_items (order_id, supplier_id, description, quantity, unit_price) VALUES (?, ?, ?, ?, ?)',
      [order_id, supplier_id, description, quantity, unit_price]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order item' });
  }
};
