const { pool } = require('../config/db');

exports.listInvoices = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invoices ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching invoices' });
  }
};

exports.getInvoice = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invoices WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Invoice not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching invoice' });
  }
};

exports.createInvoice = async (req, res) => {
  try {
    const { order_id, customer_id, amount, due_date, status, notes } = req.body;
    if (!order_id || !customer_id || !amount) {
      return res.status(400).json({ message: 'Missing required fields: order_id, customer_id, amount' });
    }
    // Check if customer exists
    const [customers] = await pool.query('SELECT id FROM customers WHERE id = ?', [customer_id]);
    if (customers.length === 0) {
      return res.status(400).json({ message: 'Customer does not exist' });
    }
    // Check if order exists
    const [orders] = await pool.query('SELECT id FROM orders WHERE id = ?', [order_id]);
    if (orders.length === 0) {
      return res.status(400).json({ message: 'Order does not exist' });
    }
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const invoice_number = `INV-${datePart}-${randomPart}`;
    const [result] = await pool.query(
      'INSERT INTO invoices (order_id, customer_id, invoice_number, amount, due_date, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [order_id, customer_id, invoice_number, amount, due_date, status || 'pending', notes]
    );
    res.status(201).json({ id: result.insertId, invoice_number });
  } catch (err) {
    res.status(500).json({ message: 'Error creating invoice', error: err.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const { amount, due_date, status, notes } = req.body;
    const [result] = await pool.query(
      'UPDATE invoices SET amount=?, due_date=?, status=?, notes=? WHERE id=?',
      [amount, due_date, status, notes, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Invoice not found' });
    res.json({ message: 'Invoice updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating invoice' });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM invoices WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Invoice not found' });
    res.json({ message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting invoice' });
  }
};

exports.getInvoicePayments = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM payments WHERE invoice_id = ? ORDER BY payment_date DESC', [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments' });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const { amount, payment_date, payment_method, reference_number, notes, recorded_by } = req.body;
    const invoice_id = req.params.id;
    const [result] = await pool.query(
      'INSERT INTO payments (invoice_id, amount, payment_date, payment_method, reference_number, notes, recorded_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [invoice_id, amount, payment_date, payment_method, reference_number, notes, recorded_by]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating payment' });
  }
};