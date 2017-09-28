const MT = require('mersenne-twister')
const _ = require('lodash')
const {floor, min, max, round} = Math

module.exports = function elevation (seed, iterations = 200) {
  const generator = new MT(seed || 10)

  let map = initMap()

  for (let i = 0; i < iterations; i++) {
    let Tcoeff = round(generator.random() * 4) - 2
    let offset = floor(generator.random() * 360)

    // T = Pcoeff * p + offset
    _.forEach(map, (P, t) => {
      t = parseInt(t)
      let base = (Tcoeff * t + offset + 720)
      let bounds = [base % 360, (base + 180) % 360]

      _.forEach(P, (v, p) => {
        p = parseInt(p)

        if (
          (bounds[0] < bounds[1] && p > bounds[0] && p < bounds[1]) ||
          (bounds[1] < bounds[0] && (p > bounds[0] || p < bounds[1]))
        ) {
          map[t][p] += 1
        }
      })
    })
  }

  let hist = _.keys(_.countBy(_.flatMap(map, _.values)))
  let low = min.apply(null, hist)
  let high = max.apply(null, hist)

  return {map, low, high, hist}
}


function initMap () {
  const Trange = _.range(0, 180, 1)
  const Prange = _.range(0, 360, 1)

  let map = {}

  Trange.forEach(t => {
    map[t] = {}
    Prange.forEach(p => {
      map[t][p] = 0
    })
  })

  return map
}
