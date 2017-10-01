const MT = require('mersenne-twister')
const _ = require('lodash')
const {floor, min, max, round} = Math

module.exports = function elevation ({seed = 10, iterations = 250, width = 180}) {
  const generator = new MT(seed)

  let wFunc = (width === 'random' ?
    () => round(generator.random() * 180)+90 :
    () => {
      generator.random() // use rand anyway, so as not to change the coeff and offset sequence
      return width
    }
  )

  let map = initMap()

  for (let i = 0; i < iterations; i++) {
    splitAndRaise({generator, wFunc, map})
  }

  let hist = _.keys(_.countBy(_.flatMap(map, _.values)))
  let low = min.apply(null, hist)
  let high = max.apply(null, hist)

  return {map, low, high, hist}
}

function splitAndRaise ({generator, wFunc, map}) {
  let Tcoeff = round(generator.random() * 4) - 2
  let offset = floor(generator.random() * 360)

  let w = wFunc()

  // T = Pcoeff * p + offset
  _.forEach(map, (P, t) => {
    let base = (Tcoeff * t + offset + 360)
    let bounds = [base % 360, (base + w) % 360]

    if (bounds[0] < bounds[1]) {
      for (let p = bounds[0]; p < bounds[1]; p++) {
        map[t][p] += 1
      }
    } else {
      for (let p = 0; p < bounds[1]; p++) {
        map[t][p] += 1
      }
      for (let p = bounds[0]; p < map[t].length; p++) {
        map[t][p] += 1
      }
    }
  })

  return map
}


function initMap () {
  const Trange = _.range(0, 180, 1)
  const Prange = _.range(0, 360, 1)

  return Trange.map(() => {
    return Prange.map(() => 0)
  })
}
