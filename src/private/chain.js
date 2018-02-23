const SHA256 = require('crypto-js/sha256')
const CryptoJS = require('crypto-js')
const R = require('ramda')
const _ = require('lodash')


const encrypt = (block, key) =>
  CryptoJS.AES.encrypt(JSON.stringify(block.data), key).toString()

const decrypt = R.tryCatch(
  (block, key) => JSON.parse(
    CryptoJS.AES.decrypt(block, key) // .toString()
      .toString(CryptoJS.enc.Utf8)),
  R.F)

const hash = block =>
  _.padStart(block.date, 10, '!') +
  SHA256(JSON.stringify(block.data))
    .words
    .map(Math.abs)
    .map(String)
    .reduce(R.concat)
    .substr(10)

const add = (block, prevBlock, key) => {
  block.nonce = _.random(0, 100000)
  block.block = _.uniqueId()
  block.prev = hash(prevBlock) //.hash
  block.data.date = new Date().getTime()
  block.hash = hash(block)
  block.data = encrypt(block, key)

  return block
}

module.exports = {
  encrypt,
  decrypt,
  add,
  hash
}
