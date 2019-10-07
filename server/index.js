const express = require('express')
const mustache = require('mustache-express')
const favicon = require('express-favicon')

const path = require('path')
const fs = require('fs')

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

app.use(favicon(path.join(__dirname, 'favicon.ico')))

app.engine('html', mustache())
app.set('views', path.join(__dirname, 'static/'))
app.set('view engine', 'html')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/dist', express.static('./dist'))
app.use('/static', express.static('./static'))


app.get('/preview', async (req, res, next) => {
  try {
    res.render('preview', {
      someData: 'Preview Data'
    })
  } catch (ex) {
    next(ex)
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/app.js'))
})

app.listen(PORT, HOST, () => {
  const entries = [
    path.join(process.cwd(), 'dist/app.js'),
    path.join(process.cwd(), 'dist/pdr.js')
  ]

  entries.forEach(p => {
    let entry = fs.readFileSync(p, 'utf8')
    entry = entry.replace(/__DOCKER_IMAGE_URL__/g, process.env.URL || '.')
    fs.writeFileSync(p, entry, 'utf8')
  })
})
console.log(`Running on http://${HOST}:${PORT}`)
