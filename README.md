# Deniable Encryption Library

This Node.js library provides a way to implement deniable encryption, enabling the encryption of messages in such a manner that the encrypted message can be coerced into revealing a different (plausible) message than the original, without giving away the existence of the original message.

## Features

- **Deniable Encryption**: Encrypt messages in a way that allows for a plausible alternative message to be presented.
- **Key Pair Generation**: Easily generate encryption and decryption keys.
- **Simple API**: A straightforward API that makes it easy to integrate deniable encryption into your projects.

## Installation

To install the package, run the following command in your project directory:

```bash
npm install deniable-encryption
```

## Usage

Here's a quick example to get you started:

```javascript
const { DeniableEncryption } = require('deniable-encryption')

// Generate a key pair
const keyPair = DeniableEncryption.generateKeyPair()

// Encrypt a message with a plausible alternative
const encrypted = DeniableEncryption.encrypt({
  originalMessage: 'Secret message',
  plausibleMessage: 'Plausible alternative',
  publicKey: keyPair.publicKey
})

console.log(encrypted)

// Decrypt the message
const decrypted = DeniableEncryption.decrypt({
  encryptedMessage: encrypted,
  privateKey: keyPair.privateKey
})

console.log(decrypted) // Outputs: Secret message
```

## API Reference

### `generateKeyPair()`

Generates a public/private key pair for encryption and decryption.

### `encrypt(options)`

Encrypts a message. `options` should include:

- `originalMessage`: The original message to be encrypted.
- `plausibleMessage`: A plausible alternative message.
- `publicKey`: The public key for encryption.

### `decrypt(options)`

Decrypts an encrypted message. `options` should include:

- `encryptedMessage`: The encrypted message.
- `privateKey`: The private key for decryption.

## Contributing

We welcome contributions to improve this library. Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
