import { KeyObject } from 'crypto'

export enum EncryptionType {
  RSA = 'rsa',
  RSAPSS = 'rsa-pss',
  DSA = 'dsa',
  EC = 'ec',
  ED25519 = 'ed25519',
  ED448 = 'ed448',
  X25519 = 'x25519',
  X448 = 'x448',
  DH = 'dh'
}

export interface KeyPair {
  publicKey: KeyObject
  privateKey: KeyObject
}

export interface DeniableEncryptionResult {
  encryptedOriginalMessage: string
  plausibleKeyPair: KeyPair
  encryptedPlausibleMessage: string
}
export { KeyObject }
