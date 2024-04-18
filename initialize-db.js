// initialize-db.js

const mysql = require('mysql');

// Create MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

// Create table if not exists
const sql = `CREATE TABLE IF NOT EXISTS encrypted_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    encrypted_text TEXT,
    encryption_key TEXT
)`;

pool.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Database initialized successfully');
    pool.end(); // Close the connection pool
});
