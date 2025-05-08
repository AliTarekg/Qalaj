const db = require('../config/database');

// Create new invoice
const createInvoice = async (req, res) => {
    try {
        const { order_id, invoice_number, amount, due_date, notes } = req.body;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // Check if order exists
            const [orders] = await connection.query(
                'SELECT id, total_amount FROM orders WHERE id = ?',
                [order_id]
            );

            if (orders.length === 0) {
                await connection.rollback();
                connection.release();
                return res.status(404).json({ message: 'Order not found' });
            }

            // Create invoice
            const [result] = await connection.query(
                `INSERT INTO invoices (order_id, invoice_number, amount, due_date, notes) 
                 VALUES (?, ?, ?, ?, ?)`,
                [order_id, invoice_number, amount, due_date, notes]
            );

            await connection.commit();
            connection.release();

            res.status(201).json({
                message: 'Invoice created successfully',
                invoiceId: result.insertId
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating invoice' });
    }
};

// Get all invoices with pagination and filtering
const getInvoices = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const status = req.query.status;

        let query = `
            SELECT i.*, o.client_name, 
                   COALESCE(SUM(p.amount), 0) as paid_amount,
                   i.amount - COALESCE(SUM(p.amount), 0) as remaining_amount
            FROM invoices i
            JOIN orders o ON i.order_id = o.id
            LEFT JOIN payments p ON i.id = p.invoice_id
            WHERE 1=1
        `;
        let params = [];

        if (status) {
            query += ' AND i.status = ?';
            params.push(status);
        }

        query += ' GROUP BY i.id ORDER BY i.created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [invoices] = await db.query(query, params);

        // Get total count for pagination
        const [totalCount] = await db.query(
            'SELECT COUNT(*) as count FROM invoices' + (status ? ' WHERE status = ?' : ''),
            status ? [status] : []
        );

        res.json({
            invoices,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount[0].count / limit),
                totalItems: totalCount[0].count
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching invoices' });
    }
};

// Get single invoice with details
const getInvoiceById = async (req, res) => {
    try {
        const invoiceId = req.params.id;

        const [invoices] = await db.query(
            `SELECT i.*, o.client_name, o.order_date,
                    COALESCE(SUM(p.amount), 0) as paid_amount,
                    i.amount - COALESCE(SUM(p.amount), 0) as remaining_amount
             FROM invoices i
             JOIN orders o ON i.order_id = o.id
             LEFT JOIN payments p ON i.id = p.invoice_id
             WHERE i.id = ?
             GROUP BY i.id`,
            [invoiceId]
        );

        if (invoices.length === 0) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Get payment history
        const [payments] = await db.query(
            `SELECT p.*, u.username as recorded_by
             FROM payments p
             LEFT JOIN users u ON p.recorded_by = u.id
             WHERE p.invoice_id = ?
             ORDER BY p.payment_date DESC`,
            [invoiceId]
        );

        const invoice = invoices[0];
        invoice.payments = payments;

        res.json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching invoice details' });
    }
};

// Update invoice
const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, due_date, notes, status } = req.body;

        const [result] = await db.query(
            `UPDATE invoices 
             SET amount = ?, due_date = ?, notes = ?, status = ?
             WHERE id = ?`,
            [amount, due_date, notes, status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.json({ message: 'Invoice updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating invoice' });
    }
};

// Delete invoice
const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if invoice has any payments
        const [payments] = await db.query(
            'SELECT COUNT(*) as count FROM payments WHERE invoice_id = ?',
            [id]
        );

        if (payments[0].count > 0) {
            return res.status(400).json({ 
                message: 'Cannot delete invoice with recorded payments' 
            });
        }

        const [result] = await db.query('DELETE FROM invoices WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting invoice' });
    }
};

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};