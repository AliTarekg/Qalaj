const { pool } = require('../config/db');

exports.listCustomers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customers' });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Customer not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching customer' });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, notes } = req.body;
    const [result] = await pool.query(
      'INSERT INTO customers (name, email, phone, address, notes) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, address, notes]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating customer' });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, notes } = req.body;
    const [result] = await pool.query(
      'UPDATE customers SET name=?, email=?, phone=?, address=?, notes=? WHERE id=?',
      [name, email, phone, address, notes, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating customer' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM customers WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting customer' });
  }
};

exports.getCustomerOrders = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC', [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

exports.getCustomerInvoices = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invoices WHERE customer_id = ? ORDER BY created_at DESC', [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching invoices' });
  }
};
