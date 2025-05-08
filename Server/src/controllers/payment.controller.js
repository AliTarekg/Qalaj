const db = require('../config/database');

// Record new payment
const createPayment = async (req, res) => {
    try {
        const { invoice_id, amount, payment_date, payment_method, reference_number, notes } = req.body;
        const recorded_by = req.user.id;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // Check if invoice exists and get current payments
            const [invoices] = await connection.query(
                `SELECT i.*, COALESCE(SUM(p.amount), 0) as paid_amount
                 FROM invoices i
                 LEFT JOIN payments p ON i.id = p.invoice_id
                 WHERE i.id = ?
                 GROUP BY i.id`,
                [invoice_id]
            );

            if (invoices.length === 0) {
                await connection.rollback();
                connection.release();
                return res.status(404).json({ message: 'Invoice not found' });
            }

            const invoice = invoices[0];
            const newTotalPaid = parseFloat(invoice.paid_amount) + parseFloat(amount);

            // Validate payment amount
            if (newTotalPaid > invoice.amount) {
                await connection.rollback();
                connection.release();
                return res.status(400).json({ 
                    message: 'Payment amount exceeds remaining invoice balance' 
                });
            }

            // Record payment
            const [result] = await connection.query(
                `INSERT INTO payments (invoice_id, amount, payment_date, payment_method, 
                                     reference_number, notes, recorded_by)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [invoice_id, amount, payment_date, payment_method, reference_number, notes, recorded_by]
            );

            // Update invoice status if fully paid
            if (newTotalPaid === parseFloat(invoice.amount)) {
                await connection.query(
                    'UPDATE invoices SET status = "paid" WHERE id = ?',
                    [invoice_id]
                );
            } else if (newTotalPaid > 0) {
                await connection.query(
                    'UPDATE invoices SET status = "partial" WHERE id = ?',
                    [invoice_id]
                );
            }

            await connection.commit();
            connection.release();

            res.status(201).json({
                message: 'Payment recorded successfully',
                paymentId: result.insertId
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error recording payment' });
    }
};

// Get all payments with pagination and filtering
const getPayments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { start_date, end_date, payment_method } = req.query;

        let query = `
            SELECT p.*, i.invoice_number, o.client_name,
                   u.username as recorded_by_name
            FROM payments p
            JOIN invoices i ON p.invoice_id = i.id
            JOIN orders o ON i.order_id = o.id
            LEFT JOIN users u ON p.recorded_by = u.id
            WHERE 1=1
        `;
        let params = [];

        if (start_date && end_date) {
            query += ' AND p.payment_date BETWEEN ? AND ?';
            params.push(start_date, end_date);
        }

        if (payment_method) {
            query += ' AND p.payment_method = ?';
            params.push(payment_method);
        }

        query += ' ORDER BY p.payment_date DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [payments] = await db.query(query, params);

        // Get total count for pagination
        let countQuery = 'SELECT COUNT(*) as count FROM payments WHERE 1=1';
        let countParams = [];

        if (start_date && end_date) {
            countQuery += ' AND payment_date BETWEEN ? AND ?';
            countParams.push(start_date, end_date);
        }

        if (payment_method) {
            countQuery += ' AND payment_method = ?';
            countParams.push(payment_method);
        }

        const [totalCount] = await db.query(countQuery, countParams);

        res.json({
            payments,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount[0].count / limit),
                totalItems: totalCount[0].count
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching payments' });
    }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;

        const [payments] = await db.query(
            `SELECT p.*, i.invoice_number, i.amount as invoice_amount,
                    o.client_name, o.id as order_id,
                    u.username as recorded_by_name
             FROM payments p
             JOIN invoices i ON p.invoice_id = i.id
             JOIN orders o ON i.order_id = o.id
             LEFT JOIN users u ON p.recorded_by = u.id
             WHERE p.id = ?`,
            [paymentId]
        );

        if (payments.length === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json(payments[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching payment details' });
    }
};

// Update payment
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { payment_date, payment_method, reference_number, notes } = req.body;

        // Amount cannot be updated as it would affect invoice balance
        const [result] = await db.query(
            `UPDATE payments 
             SET payment_date = ?, payment_method = ?, 
                 reference_number = ?, notes = ?
             WHERE id = ?`,
            [payment_date, payment_method, reference_number, notes, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json({ message: 'Payment updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating payment' });
    }
};

// Delete payment
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // Get payment and invoice details
            const [payments] = await connection.query(
                `SELECT p.*, i.id as invoice_id, i.amount as invoice_amount,
                        COALESCE(SUM(p2.amount), 0) as total_paid
                 FROM payments p
                 JOIN invoices i ON p.invoice_id = i.id
                 LEFT JOIN payments p2 ON i.id = p2.invoice_id
                 WHERE p.id = ?
                 GROUP BY p.id`,
                [id]
            );

            if (payments.length === 0) {
                await connection.rollback();
                connection.release();
                return res.status(404).json({ message: 'Payment not found' });
            }

            const payment = payments[0];
            const newTotalPaid = payment.total_paid - payment.amount;

            // Delete the payment
            await connection.query('DELETE FROM payments WHERE id = ?', [id]);

            // Update invoice status
            if (newTotalPaid === 0) {
                await connection.query(
                    'UPDATE invoices SET status = "pending" WHERE id = ?',
                    [payment.invoice_id]
                );
            } else if (newTotalPaid < payment.invoice_amount) {
                await connection.query(
                    'UPDATE invoices SET status = "partial" WHERE id = ?',
                    [payment.invoice_id]
                );
            }

            await connection.commit();
            connection.release();

            res.json({ message: 'Payment deleted successfully' });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting payment' });
    }
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
};