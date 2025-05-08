const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'staff')
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const supplierSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    contact_person: Joi.string().max(100),
    email: Joi.string().email(),
    phone: Joi.string().max(20),
    address: Joi.string(),
    status: Joi.string().valid('active', 'inactive')
});

const inquirySchema = Joi.object({
    client_name: Joi.string().min(2).max(100).required(),
    client_email: Joi.string().email(),
    client_phone: Joi.string().max(20),
    subject: Joi.string().min(5).max(200).required(),
    message: Joi.string(),
    status: Joi.string().valid('new', 'in_progress', 'completed', 'cancelled'),
    assigned_to: Joi.number().integer()
});

const orderSchema = Joi.object({
    inquiry_id: Joi.number().integer(),
    client_name: Joi.string().min(2).max(100).required(),
    order_date: Joi.date().required(),
    delivery_date: Joi.date(),
    total_amount: Joi.number().positive().required(),
    status: Joi.string().valid('pending', 'in_progress', 'completed', 'cancelled'),
    notes: Joi.string(),
    items: Joi.array().items(Joi.object({
        supplier_id: Joi.number().integer(),
        description: Joi.string().required(),
        quantity: Joi.number().integer().positive().required(),
        unit_price: Joi.number().positive().required()
    })).min(1).required()
});

const invoiceSchema = Joi.object({
    order_id: Joi.number().integer().required(),
    invoice_number: Joi.string().max(50).required(),
    amount: Joi.number().positive().required(),
    due_date: Joi.date(),
    notes: Joi.string(),
    status: Joi.string().valid('pending', 'partial', 'paid', 'overdue')
});

const paymentSchema = Joi.object({
    invoice_id: Joi.number().integer().required(),
    amount: Joi.number().positive().required(),
    payment_date: Joi.date().required(),
    payment_method: Joi.string().valid('cash', 'bank_transfer', 'check', 'credit_card').required(),
    reference_number: Joi.string().max(100),
    notes: Joi.string()
});

module.exports = {
    userSchema,
    loginSchema,
    supplierSchema,
    inquirySchema,
    orderSchema,
    invoiceSchema,
    paymentSchema
};