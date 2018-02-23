const fs = require('fs')
const { range, random, sample } = require('lodash')
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)
const readFileAsync = promisify(fs.readFile)
const appendFileAsync = promisify(fs.appendFile)

// . dot is the same folder that npm start was called
const getBlocks = () => readFileAsync(__dirname + '/blocks.jsonn', 'utf-8')
  .then(str => str.split('\n').filter(Boolean).map(JSON.parse))
const addBlock = block => appendFileAsync(__dirname + '/blocks.jsonn', '\n' + JSON.stringify(block))

module.exports = {
  getBlocks,
  addBlock
}
