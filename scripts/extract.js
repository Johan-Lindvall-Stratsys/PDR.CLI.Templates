const fs = require('fs-extra')
const path = require('path')

const sourceJs = path.join(process.cwd(), './frontend/lib/app.common.js')
if (fs.existsSync(sourceJs)) {
  const destinationJs = path.join(process.cwd(), './lib/app.js')
  fs.moveSync(sourceJs, destinationJs, {
    overwrite: true
  })

  const sourceMap = path.join(process.cwd(), './frontend/lib/app.common.js.map')
  if (fs.existsSync(sourceMap)) {
    const destinationMap = path.join(process.cwd(), './lib/app.js.map')
    fs.moveSync(sourceMap, destinationMap, {
      overwrite: true
    })
  }

  fs.removeSync('./frontend/lib')
}
