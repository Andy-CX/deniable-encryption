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
import { DeniableEncryption } from 'deniable-encryption'
const originalMessage = 'hello world'
const plausibleMessage = 'goodbye world'
// Generate a key pair
const { publicKey, privateKey } = DeniableEncryption.generateKeyPair()

// Encrypt a message with a plausible alternative
const {
  encryptedOriginalMessage,
  plausibleKeyPair,
  encryptedPlausibleMessage
} = DeniableEncryption.createDeniableEncryption({
  originalMessage,
  plausibleMessage,
  publicKey
})

// Decrypt the message
const decryptedOriginalMessage = DeniableEncryption.decryptWithPrivateKey(
  privateKey,
  encryptedOriginalMessage
)

const decryptedPlausibleMessage = DeniableEncryption.decryptWithPrivateKey(
  plausibleKeyPair.privateKey,
  encryptedPlausibleMessage
)

console.log('Decrypt original message:', decryptedOriginalMessage) // Outputs: hello world
console.log('Decrypt plausible messages:', decryptedPlausibleMessage) // goodbye world
```

## API Reference

### `generateKeyPair(modulusLength: number = 2048): KeyPair`

Generates a public/private key pair for encryption and decryption.

- **Parameters**
  - `modulusLength`: The length of the modulus in bits. The default is 2048.
- **Returns**
  - A `KeyPair` object containing the `publicKey` and `privateKey`.

### `decryptWithPrivateKey(privateKey: KeyObject, encryptedMessage: string): string`

Decrypts an encrypted message using the provided private key.

- **Parameters**
  - `privateKey`: The private key used for decryption.
  - `encryptedMessage`: The encrypted message to be decrypted.
- **Returns**
  - The decrypted message as a string.

### `createDeniableEncryption({ originalMessage, plausibleMessage, publicKey, modulusLength }): DeniableEncryptionResult`

Creates a deniable encryption result, allowing for plausible deniability.

- **Parameters**
  - `originalMessage`: The original message to be encrypted.
  - `plausibleMessage`: An alternative message that can be plausibly claimed as the original.
  - `publicKey`: The public key used for encryption.
  - `modulusLength`: Optional. The length of the modulus in bits. The default is 2048.
- **Returns**
  - A `DeniableEncryptionResult` object.

## Contributing

We welcome contributions to improve this library. Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
