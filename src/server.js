const express = require('express')
const bodyParser = require('body-parser')

const elevation = require('./elevation.js')

const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send(elevation())
})

app.get('/:seed', function (req, res) {
  res.send(elevation(req.params.seed))
})

app.listen(9285, function () {
  console.log('App is running on port 9285')
})
