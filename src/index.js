const fs = require('fs')
const os = require('os')
const path = require('path')
const http = require('http')
const https = require('https')
const qrcode = require('qrcode')
const logger = require('koa-logger')
const serve = require('koa-static')
const koaBody = require('koa-body')
const Koa = require('koa')
const app = new Koa()
const R = require('ramda')
const _ = require('lodash')
const { add, decrypt, hash } = require('./private/chain')
const { getBlocks, addBlock } = require('./private/db')

const port = process.env.PORT || 3008
const ip = process.env.IP || `192.168.1.34`
const url = `https://${ip}:${port}`

app.use(logger())
app.use(koaBody({ multipart: true }))

const decode = block => {
  // decrypt for demo, do not use for production!
  block.data = decrypt(block.data, '123')

  return block
}

// 404
app.use(async (ctx, next) => {
  await next()
  if (ctx.body || !ctx.idempotent) {
    return
  }
  ctx.redirect('/404.html')
})

// serve files from ./public
app.use(serve(path.join(__dirname, '/public')))

// handle uploads
app.use(async (ctx, next) => {
  // ignore non-POSTs
  if ('POST' !== ctx.method) {
    return await next()
  }
  // console.log(ctx.request.body.files['files'])
  if (!R.path(['request', 'body', 'files'], ctx)) {
    return await next()
  }
  const file = ctx.request.body.files.files || ctx.request.body.files.file

  const reader = fs.createReadStream(file.path)

  const fileName = path.join(__dirname, './private', Math.random().toFixed(4) * 10000 + ',' + file.name)
  const stream = fs.createWriteStream(fileName)
  reader.pipe(stream)

  console.log('uploading %s -> %s', file.name, stream.path)

  await new Promise(resolve =>
    reader.on('close', () => {
      console.log('done')
      ctx = body = { bla: 'laaaa' }

      resolve()
    }))

})

// get all chain
app.use(async (ctx, next) => {
  if ('GET' !== ctx.method) {
    return await next()
  }
  console.log(ctx.request.path)
  if ('/chain' !== ctx.request.path) {
    return await next()
  }
  await getBlocks()
    .then(blocks => {
      ctx.body = blocks.map(decode)
    })
})

// get the the nonce for tuv to approve
app.use(async (ctx, next) => {
  if ('GET' !== ctx.method) {
    return await next()
  }
  if (!ctx.request.path.startsWith('/chain/')) {
    return await next()
  }
  const id = ctx.request.path.split('/chain/').pop()

  await getBlocks()
    .then(blocks => {
      ctx.body = decode(blocks.find(({ nonce }) => String(nonce) === id)) || 'not found'
    })
})

// add to chain
app.use(async (ctx, next) => {
  if ('POST' !== ctx.method) {
    return await next()
  }
  if ('/chain' !== ctx.request.path) {
    return await next()
  }
  const data = ctx.request.body

  await getBlocks()
    .then(blocks => {
      const last = blocks.pop()
      const newBlock = add({ data }, last, '123', blocks.length)
      ctx.status = 200
      ctx.body = newBlock
      return addBlock(newBlock)
    })
    .catch(console.error)
})

// is it legit
// nodemon -w ./ -e js -x curl 'http://localhost:3008/islegit' -H 'Content-Type: application/json'  --data-binary '@src/private/tampered.blocks.json' -d 3
// [true,false,true,true,true]
app.use(async (ctx, next) => {
  if ('POST' !== ctx.method) {
    return await next()
  }
  if ('/islegit' !== ctx.request.path) {
    return await next()
  }

  const chain = ctx.request.body

  await getBlocks()
    .then(blocks => {
      ctx.body = chain.map((e, i) => hash(e) === e.hash)
      ctx.status = 200
    })
    .catch(console.error)
})

qrcode.toString(url, {
  errorCorrectionLevel: 'H',
  type: 'terminal',
})
  .then(console.log)
  .catch(console.error)

http.createServer(app.callback()).listen(port)
console.log(`listening on port ${url}`)
