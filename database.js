// database.js

const mysql = require('mysql');

// Create MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

// Function to execute SQL queries
function executeSql(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Function to insert encrypted data into the database
async function insertEncryptedData(encryptedText, encryptionKey) {
    const sql = `INSERT INTO encrypted_data (encrypted_text, encryption_key) VALUES (?, ?)`;
    await executeSql(sql, [encryptedText, encryptionKey]);
}

// Function to retrieve encrypted data and encryption key from the database by ID
async function getEncryptedDataById(id) {
    const sql = `SELECT encrypted_text, encryption_key FROM encrypted_data WHERE id = ?`;
    const rows = await executeSql(sql, [id]);
    if (rows.length === 0) {
        throw new Error('Data not found in database');
    }
    return rows[0];
}

module.exports = { executeSql, insertEncryptedData, getEncryptedDataById };
