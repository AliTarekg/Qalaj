This scheme is already created , when adding new table or implementation do alter to the existing scheme
-- CREATE DATABASE IF NOT EXISTS qalaj_management;
-- USE qalaj_management;

-- -- Users table
-- CREATE TABLE users (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     username VARCHAR(50) UNIQUE NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role ENUM('admin', 'staff') DEFAULT 'staff',
--     is_active BOOLEAN DEFAULT TRUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- -- Suppliers table
-- CREATE TABLE suppliers (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(100) NOT NULL,
--     contact_person VARCHAR(100),
--     email VARCHAR(100),
--     phone VARCHAR(20),
--     address TEXT,
--     status ENUM('active', 'inactive') DEFAULT 'active',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- -- Inquiries table
-- CREATE TABLE inquiries (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     client_name VARCHAR(100) NOT NULL,
--     client_email VARCHAR(100),
--     client_phone VARCHAR(20),
--     subject VARCHAR(200) NOT NULL,
--     message TEXT,
--     status ENUM('new', 'in_progress', 'completed', 'cancelled') DEFAULT 'new',
--     assigned_to INT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (assigned_to) REFERENCES users(id)
-- );

-- -- Orders table
-- CREATE TABLE orders (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     customer_id INT,
--     inquiry_id INT,
--     client_name VARCHAR(100) NOT NULL,
--     order_date DATE NOT NULL,
--     delivery_date DATE,
--     total_amount DECIMAL(10, 2) NOT NULL,
--     status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
--     notes TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (inquiry_id) REFERENCES inquiries(id),
--     FOREIGN KEY (customer_id) REFERENCES customers(id)
-- );

-- -- Order items table
-- CREATE TABLE order_items (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     order_id INT NOT NULL,
--     supplier_id INT,
--     description TEXT NOT NULL,
--     quantity INT NOT NULL,
--     unit_price DECIMAL(10, 2) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (order_id) REFERENCES orders(id),
--     FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
-- );

-- -- Invoices table
-- CREATE TABLE invoices (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     customer_id INT,
--     order_id INT NOT NULL,
--     invoice_number VARCHAR(50) UNIQUE NOT NULL,
--     amount DECIMAL(10, 2) NOT NULL,
--     due_date DATE,
--     status ENUM('pending', 'partial', 'paid', 'overdue') DEFAULT 'pending',
--     notes TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (order_id) REFERENCES orders(id),
--     FOREIGN KEY (customer_id) REFERENCES customers(id)
-- );

-- -- Payments table
-- CREATE TABLE payments (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     invoice_id INT NOT NULL,
--     amount DECIMAL(10, 2) NOT NULL,
--     payment_date DATE NOT NULL,
--     payment_method ENUM('cash', 'bank_transfer', 'check', 'credit_card') NOT NULL,
--     reference_number VARCHAR(100),
--     notes TEXT,
--     recorded_by INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (invoice_id) REFERENCES invoices(id),
--     FOREIGN KEY (recorded_by) REFERENCES users(id)
-- );

-- CREATE TABLE inquiry_follow_ups (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     inquiry_id INT NOT NULL,
--     user_id INT,
--     note TEXT,
--     status ENUM('new', 'in_progress', 'completed', 'cancelled'),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (inquiry_id) REFERENCES inquiries(id),
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- CREATE TABLE customers (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(100),
--     phone VARCHAR(20),
--     address TEXT,
--     notes TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- Items table
CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add image, sizes, and more details to items table
ALTER TABLE items 
ADD COLUMN image_url VARCHAR(255),
ADD COLUMN sizes VARCHAR(255);