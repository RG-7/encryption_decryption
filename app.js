// app.js

const { insertEncryptedData, getEncryptedDataById } = require('./database');
const { encrypt, decrypt, getKeyFromPassword } = require('./encryption');

// Example usage:
async function main() {
    const plaintext = 'Hello, World!';
    const password = 'your_password';

    // Encrypt data and save to database
    const encryptedData = await encrypt(plaintext, password);
    await insertEncryptedData(encryptedData, password);

    // Retrieve encrypted data from database and decrypt
    const id = 1; // Assuming the data is stored with ID 1
    const { encrypted_text, encryption_key } = await getEncryptedDataById(id);
    const decryptedData = await decrypt(encrypted_text, encryption_key);

    console.log('Decrypted data:', decryptedData);
}

main();
