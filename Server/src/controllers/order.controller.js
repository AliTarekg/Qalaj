const db = require('../config/database');

// Create new order
const createOrder = async (req, res) => {
    try {
        const {
            inquiry_id,
            client_name,
            order_date,
            delivery_date,
            total_amount,
            notes,
            items
        } = req.body;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // If inquiry_id is provided, verify it exists and is not already linked to an order
            if (inquiry_id) {
                const [inquiries] = await connection.query(
                    'SELECT id, status FROM inquiries WHERE id = ?',
                    [inquiry_id]
                );

                if (inquiries.length === 0) {
                    await connection.rollback();
                    connection.release();
                    return res.status(400).json({
                        message: 'Referenced inquiry does not exist'
                    });
                }

                const [existingOrders] = await connection.query(
                    'SELECT id FROM orders WHERE inquiry_id = ?',
                    [inquiry_id]
                );

                if (existingOrders.length > 0) {
                    await connection.rollback();
                    connection.release();
                    return res.status(400).json({
                        message: 'Inquiry is already associated with an order'
                    });
                }

                // Update inquiry status to in_progress
                await connection.query(
                    'UPDATE inquiries SET status = "in_progress" WHERE id = ?',
                    [inquiry_id]
                );
            }

            // Validate suppliers if provided in items
            for (const item of items) {
                if (item.supplier_id) {
                    const [suppliers] = await connection.query(
                        'SELECT id, status FROM suppliers WHERE id = ?',
                        [item.supplier_id]
                    );

                    if (suppliers.length === 0) {
                        await connection.rollback();
                        connection.release();
                        return res.status(400).json({
                            message: `Supplier with ID ${item.supplier_id} does not exist`
                        });
                    }

                    if (suppliers[0].status !== 'active') {
                        await connection.rollback();
                        connection.release();
                        return res.status(400).json({
                            message: `Supplier with ID ${item.supplier_id} is not active`
                        });
                    }
                }
            }

            // Create order
            const [orderResult] = await connection.query(
                `INSERT INTO orders (
                    inquiry_id, client_name, order_date, 
                    delivery_date, total_amount, notes, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    inquiry_id,
                    client_name,
                    order_date,
                    delivery_date,
                    total_amount,
                    notes,
                    'pending'
                ]
            );

            const orderId = orderResult.insertId;

            // Insert order items
            for (const item of items) {
                await connection.query(
                    `INSERT INTO order_items (
                        order_id, supplier_id, description, 
                        quantity, unit_price
                    ) VALUES (?, ?, ?, ?, ?)`,
                    [
                        orderId,
                        item.supplier_id,
                        item.description,
                        item.quantity,
                        item.unit_price
                    ]
                );
            }

            await connection.commit();
            connection.release();

            // Fetch the created order with items
            const [order] = await db.query(
                `SELECT o.*,
                        i.subject as inquiry_subject,
                        i.status as inquiry_status
                 FROM orders o
                 LEFT JOIN inquiries i ON o.inquiry_id = i.id
                 WHERE o.id = ?`,
                [orderId]
            );

            const [orderItems] = await db.query(
                `SELECT oi.*, s.name as supplier_name
                 FROM order_items oi
                 LEFT JOIN suppliers s ON oi.supplier_id = s.id
                 WHERE oi.order_id = ?`,
                [orderId]
            );

            const orderData = order[0];
            orderData.items = orderItems;

            res.status(201).json({
                message: 'Order created successfully',
                order: orderData
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

// Get all orders with pagination, filtering, and searching
const getOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const {
            status,
            search,
            start_date,
            end_date,
            supplier_id
        } = req.query;

        let query = `
            SELECT o.*,
                   i.subject as inquiry_subject,
                   COUNT(DISTINCT oi.id) as items_count,
                   COALESCE(SUM(oi.quantity * oi.unit_price), 0) as total_value,
                   COUNT(DISTINCT inv.id) as invoices_count,
                   MAX(inv.status) as invoice_status
            FROM orders o
            LEFT JOIN inquiries i ON o.inquiry_id = i.id
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN invoices inv ON o.id = inv.order_id
            WHERE 1=1
        `;
        let params = [];

        if (status) {
            query += ' AND o.status = ?';
            params.push(status);
        }

        if (search) {
            query += ` AND (
                o.client_name LIKE ? OR
                i.subject LIKE ?
            )`;
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm);
        }

        if (start_date && end_date) {
            query += ' AND DATE(o.order_date) BETWEEN ? AND ?';
            params.push(start_date, end_date);
        }

        if (supplier_id) {
            query += ' AND EXISTS (SELECT 1 FROM order_items WHERE order_id = o.id AND supplier_id = ?)';
            params.push(supplier_id);
        }

        query += ' GROUP BY o.id ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [orders] = await db.query(query, params);

        // Get total count for pagination
        let countQuery = 'SELECT COUNT(DISTINCT o.id) as count FROM orders o WHERE 1=1';
        let countParams = [];

        if (status) {
            countQuery += ' AND o.status = ?';
            countParams.push(status);
        }

        if (search) {
            countQuery += ` AND (
                o.client_name LIKE ? OR
                EXISTS (
                    SELECT 1 FROM inquiries i 
                    WHERE i.id = o.inquiry_id 
                    AND i.subject LIKE ?
                )
            )`;
            const searchTerm = `%${search}%`;
            countParams.push(searchTerm, searchTerm);
        }

        if (start_date && end_date) {
            countQuery += ' AND DATE(o.order_date) BETWEEN ? AND ?';
            countParams.push(start_date, end_date);
        }

        if (supplier_id) {
            countQuery += ' AND EXISTS (SELECT 1 FROM order_items WHERE order_id = o.id AND supplier_id = ?)';
            countParams.push(supplier_id);
        }

        const [totalCount] = await db.query(countQuery, countParams);

        // Get statistics
        const [statistics] = await db.query(`
            SELECT 
                COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
                COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_count,
                COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count,
                COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_count,
                COALESCE(SUM(total_amount), 0) as total_value,
                COUNT(DISTINCT CASE WHEN DATE(order_date) = CURDATE() THEN id END) as today_orders
            FROM orders
        `);

        res.json({
            orders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount[0].count / limit),
                totalItems: totalCount[0].count
            },
            statistics: statistics[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

// Get single order with detailed information
const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;

        // Get order details with related data
        const [orders] = await db.query(
            `SELECT o.*,
                    i.subject as inquiry_subject,
                    i.client_email as inquiry_email,
                    i.client_phone as inquiry_phone,
                    i.status as inquiry_status
             FROM orders o
             LEFT JOIN inquiries i ON o.inquiry_id = i.id
             WHERE o.id = ?`,
            [orderId]
        );

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Get order items with supplier details
        const [items] = await db.query(
            `SELECT oi.*,
                    s.name as supplier_name,
                    s.contact_person as supplier_contact,
                    s.email as supplier_email,
                    s.phone as supplier_phone
             FROM order_items oi
             LEFT JOIN suppliers s ON oi.supplier_id = s.id
             WHERE oi.order_id = ?`,
            [orderId]
        );

        // Get invoices related to this order
        const [invoices] = await db.query(
            `SELECT i.*,
                    COALESCE(SUM(p.amount), 0) as paid_amount
             FROM invoices i
             LEFT JOIN payments p ON i.id = p.invoice_id
             WHERE i.order_id = ?
             GROUP BY i.id`,
            [orderId]
        );

        const order = orders[0];
        order.items = items;
        order.invoices = invoices;

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching order details' });
    }
};

// Update order status and details
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            status,
            delivery_date,
            notes,
            items
        } = req.body;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // Update main order
            const [orderResult] = await connection.query(
                `UPDATE orders 
                 SET status = ?,
                     delivery_date = ?,
                     notes = ?
                 WHERE id = ?`,
                [status, delivery_date, notes, id]
            );

            if (orderResult.affectedRows === 0) {
                await connection.rollback();
                connection.release();
                return res.status(404).json({ message: 'Order not found' });
            }

            // If items are provided, update them
            if (items && items.length > 0) {
                // Delete existing items
                await connection.query(
                    'DELETE FROM order_items WHERE order_id = ?',
                    [id]
                );

                // Insert new items
                for (const item of items) {
                    await connection.query(
                        `INSERT INTO order_items (
                            order_id, supplier_id, description,
                            quantity, unit_price
                        ) VALUES (?, ?, ?, ?, ?)`,
                        [
                            id,
                            item.supplier_id,
                            item.description,
                            item.quantity,
                            item.unit_price
                        ]
                    );
                }

                // Update total amount
                const total = items.reduce((sum, item) => 
                    sum + (item.quantity * item.unit_price), 0
                );

                await connection.query(
                    'UPDATE orders SET total_amount = ? WHERE id = ?',
                    [total, id]
                );
            }

            // If order is completed, update related inquiry
            if (status === 'completed') {
                await connection.query(
                    `UPDATE inquiries i
                     JOIN orders o ON i.id = o.inquiry_id
                     SET i.status = 'completed'
                     WHERE o.id = ?`,
                    [id]
                );
            }

            await connection.commit();
            connection.release();

            // Fetch updated order
            const [updatedOrder] = await db.query(
                `SELECT o.*,
                        i.subject as inquiry_subject,
                        i.status as inquiry_status
                 FROM orders o
                 LEFT JOIN inquiries i ON o.inquiry_id = i.id
                 WHERE o.id = ?`,
                [id]
            );

            const [updatedItems] = await db.query(
                `SELECT oi.*, s.name as supplier_name
                 FROM order_items oi
                 LEFT JOIN suppliers s ON oi.supplier_id = s.id
                 WHERE oi.order_id = ?`,
                [id]
            );

            const orderData = updatedOrder[0];
            orderData.items = updatedItems;

            res.json({
                message: 'Order updated successfully',
                order: orderData
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating order' });
    }
};

// Delete order with proper cleanup
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // Check if order has any invoices
            const [invoices] = await connection.query(
                'SELECT COUNT(*) as count FROM invoices WHERE order_id = ?',
                [id]
            );

            if (invoices[0].count > 0) {
                await connection.rollback();
                connection.release();
                return res.status(400).json({
                    message: 'Cannot delete order with associated invoices'
                });
            }

            // Delete order items first
            await connection.query(
                'DELETE FROM order_items WHERE order_id = ?',
                [id]
            );

            // Delete the order
            const [result] = await connection.query(
                'DELETE FROM orders WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                await connection.rollback();
                connection.release();
                return res.status(404).json({ message: 'Order not found' });
            }

            await connection.commit();
            connection.release();

            res.json({
                message: 'Order deleted successfully',
                deletedId: id
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting order' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};