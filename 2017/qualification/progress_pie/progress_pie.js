const fs = require('fs')
const process = require('process')

const input = fs.readFileSync(process.argv[2], 'utf8')
const rows = input.trim().split('\n').map(_ => _.trim())
const countTests = +rows.shift() // Number of tests.
const tests = rows.map(_ => {
    const line = _
    const columns = _.split(' ')
    return {
        angle: +columns[0] * 0.01 * 2 * Math.PI,
        point: [+columns[1], +columns[2]]
    }
})
const validTests = tests.slice(0, countTests)

const CENTER = [50, 50]
const RADIUS = 50
const getDistanceFromCenter = point => {
    return Math.sqrt(
        Math.pow(point[1] - CENTER[1], 2) +
        Math.pow(point[0] - CENTER[0], 2)
    )
}
const getAngle = point => {
    return Math.atan2(point[0] - CENTER[0], point[1] - CENTER[1])
}

const cases = validTests.map((test, i) => {
    if (getDistanceFromCenter(test.point) > RADIUS) {
        // Point is outside circle, return white.
        return `Case #${i + 1}: white`
    } else {
        // See if angle of point is smaller than angle of percentage.
        if (getAngle(test.point) <= test.angle) {
            return `Case #${i + 1}: black`
        } else {
            return `Case #${i + 1}: white`
        }
    }
})

const output = cases.join('\n')
console.log(output)
fs.writeFileSync(process.argv[3], output, 'utf8')
