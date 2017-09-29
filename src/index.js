const elevation = require('./elevation.js')
const printMap = require('./printMap.js')

printMap(elevation({seed: 34587, iterations: 1000}))
