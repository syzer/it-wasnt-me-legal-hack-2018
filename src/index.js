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
const exec = require('child-process-promise').exec

const port = process.env.PORT || 3008
const ip = process.env.IP || `192.168.1.34`
const url = `https://${ip}:${port}`

app.use(logger())
app.use(koaBody({ multipart: true }))

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

    })
  )

})

const options = {
  cert: fs.readFileSync(path.join(__dirname, './private/server.cert'), 'utf8'),
  key: fs.readFileSync(path.join(__dirname, './private/server.key'), 'utf8')
}

qrcode.toString(url, {
  errorCorrectionLevel: 'H',
  type: 'terminal',
})
  .then(console.log)
  .catch(console.error)


// https.createServer(options, app.callback()).listen(port)
http.createServer(app.callback()).listen(port)
console.log(`listening on port ${url}`)
