// encryption.js

const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; // AES encryption algorithm with Cipher Block Chaining (CBC)

// Function to encrypt data
async function encrypt(data, password) {
    const key = await getKeyFromPassword(password);
    const iv = crypto.randomBytes(16); // Generate random initialization vector (IV)
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return iv.toString('hex') + encryptedData;
}

// Function to decrypt data
async function decrypt(data, password) {
    const key = await getKeyFromPassword(password);
    const iv = Buffer.from(data.slice(0, 32), 'hex'); // Extract IV from the encrypted data
    const encryptedData = data.slice(32); // Extract encrypted data excluding IV
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}

// Function to derive key from password
async function getKeyFromPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex').substring(0, 32); // Generate 256-bit key
}

module.exports = { encrypt, decrypt, getKeyFromPassword };
