// script.js

const inputText = document.getElementById('input-text');
const encryptionMode = document.getElementById('encryption-mode');
const keyInput = document.getElementById('key');
const outputText = document.getElementById('output-text');
const outputContainer = document.getElementById('output-container');
const copyButton = document.getElementById('copy-button');

async function handleFormSubmit(event) {
    event.preventDefault();
    const data = inputText.value;
    const password = keyInput.value;

    if (!data || !password) {
        outputContainer.classList.add('error');
        outputText.textContent = 'Please provide input text and encryption key.';
        return;
    }

    outputContainer.classList.remove('error');

    if (encryptionMode.value === 'encrypt') {
        try {
            const encryptedData = await encrypt(data, password);
            outputText.textContent = 'Encrypted data: ' + encryptedData;
            copyButton.style.display = 'inline'; // Show copy button
            copyButton.onclick = function() {
                copyToClipboard(encryptedData);
            };
        } catch (error) {
            console.error(error);
            outputContainer.classList.add('error');
            outputText.textContent = 'Error encrypting data.';
        }
    } else if (encryptionMode.value === 'decrypt') {
        try {
            const decryptedData = await decrypt(data, password);
            outputText.textContent = 'Decrypted data: ' + decryptedData;
            copyButton.style.display = 'inline'; // Show copy button
            copyButton.onclick = function() {
                copyToClipboard(decryptedData);
            };
        } catch (error) {
            console.error(error);
            outputContainer.classList.add('error');
            outputText.textContent = 'Error decrypting data.';
        }
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

const form = document.getElementById('encryption-form');
form.addEventListener('submit', handleFormSubmit);
