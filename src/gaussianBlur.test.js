const _ = require('lodash')
const blur = require('./gaussianBlur.js')

let test1 = _.range(10).map(() => {
  return _.range(20).map(() => Math.floor(Math.random() * 100))
})


function print (thing) {
  console.log(thing.map(r => r.join(' ')).join('\n'))
}

print(test1)
console.log('')
print(blur(test1))
console.log('')
print(blur(test1, [
  0.025, 0.05, 0.025,
  0.05, 0.7, 0.05,
  0.025, 0.05, 0.025
]))
