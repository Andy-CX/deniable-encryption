import { DeniableEncryption } from '../src/index'

describe('DeniableEncryption', () => {
  it('should encrypt and decrypt original and plausible messages correctly', () => {
    const originalMessage = 'hello world'
    const plausibleMessage = 'goodbye world'

    const { publicKey, privateKey } = DeniableEncryption.generateKeyPair()

    const {
      encryptedOriginalMessage,
      plausibleKeyPair,
      encryptedPlausibleMessage
    } = DeniableEncryption.createDeniableEncryption({
      originalMessage,
      plausibleMessage,
      publicKey
    })

    const decryptedOriginalMessage = DeniableEncryption.decryptWithPrivateKey(
      privateKey,
      encryptedOriginalMessage
    )

    const decryptedPlausibleMessage = DeniableEncryption.decryptWithPrivateKey(
      plausibleKeyPair.privateKey,
      encryptedPlausibleMessage
    )

    expect(decryptedOriginalMessage).toBe(originalMessage)
    expect(decryptedPlausibleMessage).toBe(plausibleMessage)
  })
})
