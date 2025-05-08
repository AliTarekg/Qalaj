const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'qalaj_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log('Database connection successful');
        connection.release();
        return true;
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        return false;
    }
};

// Handle pool errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle database connection:', err);
    process.exit(-1);
});

module.exports = {
    pool: promisePool,
    testConnection
};