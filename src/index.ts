import * as crypto from 'crypto'
import {
  EncryptionType,
  KeyPair,
  DeniableEncryptionResult,
  KeyObject
} from './types/types'

class DeniableEncryption {
  static generateKeyPair(modulusLength: number = 2048): KeyPair {
    if (modulusLength < 2048) {
      const error = new Error(
        'Modulus length is too short. Minimum recommended length is 2048.'
      )
      console.error(error)
      throw error
    }
    return crypto.generateKeyPairSync(EncryptionType.RSA, {
      modulusLength
    })
  }

  private static encryptMessage(publicKey: KeyObject, message: string): string {
    if (typeof message !== 'string' || message.length === 0) {
      console.error('Message must be a non-empty string')
      throw new Error('Message must be a non-empty string')
    }
    try {
      return crypto
        .publicEncrypt(publicKey, Buffer.from(message))
        .toString('base64')
    } catch (error) {
      console.error('Encryption failed:', error)
      throw new Error('Encryption failed: Invalid public key or message')
    }
  }

  static decryptWithPrivateKey(
    privateKey: KeyObject,
    encryptedMessage: string
  ): string {
    if (typeof encryptedMessage !== 'string' || encryptedMessage.length === 0) {
      console.error('Encrypted message must be a non-empty string')
      throw new Error('Encrypted message must be a non-empty string')
    }
    try {
      return crypto
        .privateDecrypt(privateKey, Buffer.from(encryptedMessage, 'base64'))
        .toString('utf8')
    } catch (error) {
      console.error('Decryption failed:', error)
      throw new Error(
        'Decryption failed: Invalid private key or encrypted message'
      )
    }
  }

  static createDeniableEncryption({
    originalMessage,
    plausibleMessage,
    publicKey,
    modulusLength
  }: {
    originalMessage: string
    plausibleMessage: string
    publicKey: KeyObject
    modulusLength?: number
  }): DeniableEncryptionResult {
    if (
      !originalMessage ||
      typeof originalMessage !== 'string' ||
      !plausibleMessage ||
      typeof plausibleMessage !== 'string'
    ) {
      throw new Error('Messages must be non-empty strings')
    }
    if (!publicKey) {
      console.error('Invalid public key')
      throw new Error('Invalid public key')
    }
    const encryptedOriginalMessage = this.encryptMessage(
      publicKey,
      originalMessage
    )

    const plausibleKeyPair = this.generateKeyPair(modulusLength)
    const encryptedPlausibleMessage = this.encryptMessage(
      plausibleKeyPair.publicKey,
      plausibleMessage
    )

    return {
      encryptedOriginalMessage,
      plausibleKeyPair,
      encryptedPlausibleMessage
    }
  }
}

export { DeniableEncryption, DeniableEncryptionResult, KeyPair, EncryptionType }
