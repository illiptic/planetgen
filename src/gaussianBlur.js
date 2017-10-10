const _ = require('lodash')
const defaultMatrix = [
  0.005, 0.02, 0.005,
  0.02, 0.8, 0.02,
  0.005, 0.02, 0.005
]

module.exports = function gaussianBlur (array, matrix) {
  let rows = array.length
  let result = new Array(rows)

  let previousRow = array[rows-1]
  for (let j = 0; j < rows; j++) {
    let row = array[j]
    let nextRow = array[(j+1)%rows]
    let newrow = new Array(row.length)
    result[j] = newrow
    for (let i = 0; i < row.length; i++) {
      let previousCol = i ? i-1 : row.length - 1 // wrap around
      let nextCol = (i + 1) % row.length
      let neighborhood = [
        previousRow[previousCol], previousRow[i], previousRow[nextCol],
        row[previousCol], row[i], row[nextCol],
        nextRow[previousCol], nextRow[i], nextRow[nextCol]
      ]
      newrow[i] = _.zipWith(neighborhood, (matrix || defaultMatrix), (a, b) => a * b).reduce((acc, v) => Math.round(acc + v), 0)
    }
    previousRow = row
  }

  return result
}
