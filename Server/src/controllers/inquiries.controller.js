const { pool } = require('../config/db');

exports.listInquiries = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inquiries' });
  }
};

exports.getInquiry = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inquiry' });
  }
};

exports.createInquiry = async (req, res) => {
  try {
    const { client_name, client_email, client_phone, subject, message, status, assigned_to } = req.body;
    const [result] = await pool.query(
      'INSERT INTO inquiries (client_name, client_email, client_phone, subject, message, status, assigned_to) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [client_name, client_email, client_phone, subject, message, status || 'new', assigned_to || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating inquiry' });
  }
};

exports.updateInquiry = async (req, res) => {
  try {
    const { client_name, client_email, client_phone, subject, message, status, assigned_to } = req.body;
    const [result] = await pool.query(
      'UPDATE inquiries SET client_name=?, client_email=?, client_phone=?, subject=?, message=?, status=?, assigned_to=? WHERE id=?',
      [client_name, client_email, client_phone, subject, message, status, assigned_to, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Inquiry not found' });
    res.json({ message: 'Inquiry updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating inquiry' });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM inquiries WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Inquiry not found' });
    res.json({ message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting inquiry' });
  }
};

exports.listFollowUps = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT f.*, u.username FROM inquiry_follow_ups f LEFT JOIN users u ON f.user_id = u.id WHERE f.inquiry_id = ? ORDER BY f.created_at ASC`,
      [req.params.inquiryId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching follow-ups' });
  }
};

exports.createFollowUp = async (req, res) => {
  try {
    const { note, status } = req.body;
    const user_id = req.user.id;
    const inquiry_id = req.params.inquiryId;
    const [result] = await pool.query(
      'INSERT INTO inquiry_follow_ups (inquiry_id, user_id, note, status) VALUES (?, ?, ?, ?)',
      [inquiry_id, user_id, note, status]
    );
    // Optionally update inquiry status
    if (status) {
      await pool.query('UPDATE inquiries SET status = ? WHERE id = ?', [status, inquiry_id]);
    }
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating follow-up' });
  }
};
