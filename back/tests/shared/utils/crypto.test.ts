import { expect, test } from 'vitest'
import { sha256Hash, md5Hash } from '../../../src/shared/utils/crypto'

test('Test sha256Hash', () => {
  const password = "Teste123!"
  const hash = sha256Hash(password)
  const hashExpected = "0f3153d24871e120bb3870e0dce2dd9d25e5aadf0e92084daaa64000fa899a1a"

  expect(hash).toBe(hashExpected)
})

test('Test md5Hash', () => {
    const password = "Teste123!"
    const hash = md5Hash(password)
    const hashExpected = "673625af6f64b4d6e2e069373bf0a0af"
  
    expect(hash).toBe(hashExpected)
  })
  
test('Test sha256Hash with undefined input', () => {
  const password = undefined
  const hash = sha256Hash(password)
  const hashExpected = undefined

  expect(hash).toBe(hashExpected)
})

test('Test md5Hash with undefined input', () => {
    const password = undefined
    const hash = md5Hash(password)
    const hashExpected = undefined
  
    expect(hash).toBe(hashExpected)
  })