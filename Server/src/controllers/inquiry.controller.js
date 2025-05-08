const db = require('../config/database');

// Create new inquiry
const createInquiry = async (req, res) => {
    try {
        const { 
            client_name, 
            client_email, 
            client_phone, 
            subject, 
            message,
            assigned_to 
        } = req.body;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // If assigned_to is provided, verify the user exists
            if (assigned_to) {
                const [users] = await connection.query(
                    'SELECT id FROM users WHERE id = ?',
                    [assigned_to]
                );
                if (users.length === 0) {
                    await connection.rollback();
                    connection.release();
                    return res.status(400).json({ 
                        message: 'Assigned user does not exist' 
                    });
                }
            }

            const [result] = await connection.query(
                `INSERT INTO inquiries (
                    client_name, client_email, client_phone, 
                    subject, message, assigned_to, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    client_name, 
                    client_email, 
                    client_phone, 
                    subject, 
                    message, 
                    assigned_to,
                    assigned_to ? 'in_progress' : 'new'
                ]
            );

            await connection.commit();
            connection.release();

            // Fetch the created inquiry with related data
            const [inquiry] = await db.query(
                `SELECT i.*, u.username as assigned_to_name
                 FROM inquiries i
                 LEFT JOIN users u ON i.assigned_to = u.id
                 WHERE i.id = ?`,
                [result.insertId]
            );

            res.status(201).json({
                message: 'Inquiry created successfully',
                inquiry: inquiry[0]
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating inquiry' });
    }
};

// Get all inquiries with pagination, filtering, and searching
const getInquiries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { 
            status, 
            search, 
            assigned_to,
            start_date,
            end_date 
        } = req.query;

        let query = `
            SELECT i.*, 
                   u.username as assigned_to_name,
                   COUNT(o.id) as orders_count
            FROM inquiries i
            LEFT JOIN users u ON i.assigned_to = u.id
            LEFT JOIN orders o ON i.id = o.inquiry_id
            WHERE 1=1
        `;
        let params = [];

        if (status) {
            query += ' AND i.status = ?';
            params.push(status);
        }

        if (assigned_to) {
            query += ' AND i.assigned_to = ?';
            params.push(assigned_to);
        }

        if (search) {
            query += ` AND (
                i.client_name LIKE ? OR 
                i.client_email LIKE ? OR 
                i.subject LIKE ?
            )`;
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm);
        }

        if (start_date && end_date) {
            query += ' AND DATE(i.created_at) BETWEEN ? AND ?';
            params.push(start_date, end_date);
        }

        query += ' GROUP BY i.id ORDER BY i.created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [inquiries] = await db.query(query, params);

        // Get total count for pagination
        let countQuery = 'SELECT COUNT(*) as count FROM inquiries i WHERE 1=1';
        let countParams = [];

        if (status) {
            countQuery += ' AND i.status = ?';
            countParams.push(status);
        }

        if (assigned_to) {
            countQuery += ' AND i.assigned_to = ?';
            countParams.push(assigned_to);
        }

        if (search) {
            countQuery += ` AND (
                i.client_name LIKE ? OR 
                i.client_email LIKE ? OR 
                i.subject LIKE ?
            )`;
            const searchTerm = `%${search}%`;
            countParams.push(searchTerm, searchTerm, searchTerm);
        }

        if (start_date && end_date) {
            countQuery += ' AND DATE(i.created_at) BETWEEN ? AND ?';
            countParams.push(start_date, end_date);
        }

        const [totalCount] = await db.query(countQuery, countParams);

        // Get statistics
        const [statistics] = await db.query(`
            SELECT 
                COUNT(CASE WHEN status = 'new' THEN 1 END) as new_count,
                COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_count,
                COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count,
                COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_count
            FROM inquiries
        `);

        res.json({
            inquiries,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount[0].count / limit),
                totalItems: totalCount[0].count
            },
            statistics: statistics[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching inquiries' });
    }
};

// Get single inquiry with detailed information
const getInquiryById = async (req, res) => {
    try {
        const inquiryId = req.params.id;

        // Get inquiry details with related data
        const [inquiries] = await db.query(
            `SELECT i.*, 
                    u.username as assigned_to_name,
                    u.email as assigned_to_email
             FROM inquiries i
             LEFT JOIN users u ON i.assigned_to = u.id
             WHERE i.id = ?`,
            [inquiryId]
        );

        if (inquiries.length === 0) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        // Get related orders
        const [orders] = await db.query(
            `SELECT o.*, 
                    COUNT(oi.id) as items_count,
                    COALESCE(SUM(oi.quantity * oi.unit_price), 0) as total_value
             FROM orders o
             LEFT JOIN order_items oi ON o.id = oi.order_id
             WHERE o.inquiry_id = ?
             GROUP BY o.id`,
            [inquiryId]
        );

        const inquiry = inquiries[0];
        inquiry.orders = orders;

        res.json(inquiry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching inquiry details' });
    }
};

// Update inquiry
const updateInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            status, 
            assigned_to, 
            client_name, 
            client_email, 
            client_phone,
            subject,
            message 
        } = req.body;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // If assigned_to is provided, verify the user exists
            if (assigned_to) {
                const [users] = await connection.query(
                    'SELECT id FROM users WHERE id = ?',
                    [assigned_to]
                );
                if (users.length === 0) {
                    await connection.rollback();
                    connection.release();
                    return res.status(400).json({ 
                        message: 'Assigned user does not exist' 
                    });
                }
            }

            const [result] = await connection.query(
                `UPDATE inquiries 
                 SET status = ?, 
                     assigned_to = ?,
                     client_name = ?,
                     client_email = ?,
                     client_phone = ?,
                     subject = ?,
                     message = ?
                 WHERE id = ?`,
                [
                    status, 
                    assigned_to,
                    client_name,
                    client_email,
                    client_phone,
                    subject,
                    message, 
                    id
                ]
            );

            if (result.affectedRows === 0) {
                await connection.rollback();
                connection.release();
                return res.status(404).json({ message: 'Inquiry not found' });
            }

            await connection.commit();
            connection.release();

            // Fetch updated inquiry
            const [updatedInquiry] = await db.query(
                `SELECT i.*, u.username as assigned_to_name
                 FROM inquiries i
                 LEFT JOIN users u ON i.assigned_to = u.id
                 WHERE i.id = ?`,
                [id]
            );

            res.json({
                message: 'Inquiry updated successfully',
                inquiry: updatedInquiry[0]
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating inquiry' });
    }
};

// Delete inquiry with proper cleanup
const deleteInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // Check if inquiry has any associated orders
            const [orders] = await connection.query(
                'SELECT COUNT(*) as count FROM orders WHERE inquiry_id = ?',
                [id]
            );

            if (orders[0].count > 0) {
                await connection.rollback();
                connection.release();
                return res.status(400).json({ 
                    message: 'Cannot delete inquiry with associated orders' 
                });
            }

            const [result] = await connection.query(
                'DELETE FROM inquiries WHERE id = ?', 
                [id]
            );

            if (result.affectedRows === 0) {
                await connection.rollback();
                connection.release();
                return res.status(404).json({ message: 'Inquiry not found' });
            }

            await connection.commit();
            connection.release();

            res.json({ 
                message: 'Inquiry deleted successfully',
                deletedId: id
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting inquiry' });
    }
};

module.exports = {
    createInquiry,
    getInquiries,
    getInquiryById,
    updateInquiry,
    deleteInquiry
};