const db = require('../config/database');

// Create new supplier
const createSupplier = async (req, res) => {
    try {
        const { name, contact_person, email, phone, address } = req.body;

        const [result] = await db.query(
            `INSERT INTO suppliers (name, contact_person, email, phone, address) 
             VALUES (?, ?, ?, ?, ?)`,
            [name, contact_person, email, phone, address]
        );

        res.status(201).json({
            message: 'Supplier created successfully',
            supplierId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating supplier' });
    }
};

// Get all suppliers with pagination
const getSuppliers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [suppliers] = await db.query(
            `SELECT s.*, 
                    COUNT(DISTINCT oi.order_id) as total_orders
             FROM suppliers s
             LEFT JOIN order_items oi ON s.id = oi.supplier_id
             GROUP BY s.id
             ORDER BY s.name
             LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        const [totalCount] = await db.query('SELECT COUNT(*) as count FROM suppliers');

        res.json({
            suppliers,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount[0].count / limit),
                totalItems: totalCount[0].count
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching suppliers' });
    }
};

// Get supplier by ID with their orders
const getSupplierById = async (req, res) => {
    try {
        const supplierId = req.params.id;

        const [suppliers] = await db.query(
            `SELECT s.*, 
                    COUNT(DISTINCT oi.order_id) as total_orders,
                    SUM(oi.quantity * oi.unit_price) as total_value
             FROM suppliers s
             LEFT JOIN order_items oi ON s.id = oi.supplier_id
             WHERE s.id = ?
             GROUP BY s.id`,
            [supplierId]
        );

        if (suppliers.length === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Get recent orders for this supplier
        const [recentOrders] = await db.query(
            `SELECT o.id, o.order_date, o.status,
                    oi.quantity, oi.unit_price, oi.description
             FROM orders o
             JOIN order_items oi ON o.id = oi.order_id
             WHERE oi.supplier_id = ?
             ORDER BY o.order_date DESC
             LIMIT 5`,
            [supplierId]
        );

        const supplier = suppliers[0];
        supplier.recentOrders = recentOrders;

        res.json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching supplier details' });
    }
};

// Update supplier
const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contact_person, email, phone, address, status } = req.body;

        const [result] = await db.query(
            `UPDATE suppliers 
             SET name = ?, contact_person = ?, email = ?, phone = ?, 
                 address = ?, status = ?
             WHERE id = ?`,
            [name, contact_person, email, phone, address, status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.json({ message: 'Supplier updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating supplier' });
    }
};

// Delete supplier
const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if supplier has any orders
        const [orders] = await db.query(
            'SELECT COUNT(*) as count FROM order_items WHERE supplier_id = ?',
            [id]
        );

        if (orders[0].count > 0) {
            return res.status(400).json({ 
                message: 'Cannot delete supplier with existing orders' 
            });
        }

        const [result] = await db.query('DELETE FROM suppliers WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting supplier' });
    }
};

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};