const _ = require('lodash')
const chalk = require('chalk')
const {min, max} = Math

module.exports = function printMap ({map, low, high}) {
  let color = colorGen(low, high)
  console.log(_.map(map, T => _.values(T).map(v => color(v)).join(' ')).join('\n'))
}

function colorGen (low, high) {
  return (v) => {
    let ratio = (v - low)/ (high -low)
    if (ratio > 0.8) { return chalk.keyword('white')('\u2589') }
    else if (ratio > 0.7) { return chalk.keyword('grey')('\u2589') }

    else if (ratio < 0.3) { return chalk.keyword('blue')('\u2589') }
    else if (ratio < 0.35) { return chalk.keyword('yellow')('\u2589') }
    else { return chalk.keyword('green')('\u2589') }
  }
}
