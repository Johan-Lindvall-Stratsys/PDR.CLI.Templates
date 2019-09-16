const express = require('express')
const path = require('path')
const fs = require('fs')

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/static', express.static('./dist'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/app.js'))
})

app.listen(PORT, HOST, () => {
  const appFilePath = path.join(process.cwd(), 'dist/app.js')
  let appFile = fs.readFileSync(appFilePath, 'utf8')
  appFile = appFile.replace(/__DOCKER_IMAGE_URL__/g, process.env.URL)
  fs.writeFileSync(appFilePath, appFile, 'utf8')
})
console.log(`Running on http://${HOST}:${PORT}`)
