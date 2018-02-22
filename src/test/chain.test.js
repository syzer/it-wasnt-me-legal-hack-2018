import test from 'ava'
import { blocks, encryptedBlocks } from '../private/blocks'
import { add, encrypt, decrypt, hash } from '../private/chain'

test('can encrypt', t => {
  const encrypted = encrypt(blocks[0], '123')
  t.deepEqual(decrypt(encrypted, '123'), blocks[0].data)
})

test('key is important', t => {
  const encrypted = encrypt(blocks[0], '123')
  t.falsy(decrypt(encrypted, 'wrong key'), blocks[0].data)
})

test('hash function', t => {
  const hashOfBlock = hash(blocks[0])
  t.truthy(hashOfBlock)
  t.regex(hashOfBlock, /^!!/gi)
})

test('can add to block', t => {
  const hashOfPrevBlock = hash(blocks[0])
  const newBlock = add(blocks[1], blocks[0], '123')
  t.truthy(newBlock)
  t.regex(hashOfPrevBlock, /^!!/gi)
  t.deepEqual(newBlock.prev, hashOfPrevBlock)
  t.deepEqual(newBlock.prev, blocks[0].hash)
})
