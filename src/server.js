const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const elevation = require('./elevation.js')

module.exports = {
  run
}

function run () {
  const app = express()
  app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.send(elevation())
  })

  app.post('/', function (req, res) {
    let params = _.pickBy(req.body, v => !!v)
    res.send(elevation(params))
  })

  app.listen(9285, function () {
    console.log('App is running on port 9285')
  })
}
