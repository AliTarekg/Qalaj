const fs = require('fs').promises;
const path = require('path');
const { pool } = require('./database');

const initializeDatabase = async () => {
    try {
        // Read schema file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = await fs.readFile(schemaPath, 'utf8');

        // Split schema into individual statements
        const statements = schema
            .split(';')
            .filter(statement => statement.trim().length > 0);

        // Execute each statement
        for (const statement of statements) {
            await pool.query(statement);
        }

        console.log('Database initialized successfully');

        // Create default admin user if it doesn't exist
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [process.env.ADMIN_EMAIL || 'admin@qalaj.com']
        );

        if (users.length === 0) {
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(
                process.env.ADMIN_PASSWORD || 'admin123',
                salt
            );

            await pool.query(
                `INSERT INTO users (username, email, password, role)
                 VALUES (?, ?, ?, 'admin')`,
                ['admin', process.env.ADMIN_EMAIL || 'admin@qalaj.com', hashedPassword]
            );
            console.log('Default admin user created');
        }

    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

// Run if this script is executed directly
if (require.main === module) {
    initializeDatabase()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}

module.exports = initializeDatabase;