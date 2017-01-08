const fs = require('fs')
const process = require('process')

const input = fs.readFileSync(process.argv[2], 'utf8')
const rows = input.trim().split('\n').map(_ => _.trim())
const T = +rows.shift() // Number of points.
const points = rows.map(_ => {
    const line = _
    const columns = _.split(' ')
    return {
        P: +columns[0],
        X: +columns[1],
        Y: +columns[2]
    }
})
const validPoints = points.slice(0, T)

// If X, Y is outside circle, then return case white.
// Else, find line extending from middle to X, Y.
// Check if this line is within the bounding line.
const cases = validPoints.map((point, i) => {
    return `Case #${i + 1}`
})

console.log(T)
console.log(validPoints)
console.log(cases)
const output = cases.join('\n')
fs.writeFileSync(process.argv[3], output, 'utf8')
