var fs = require('fs')
var path = require('path')

if (process.argv.length !== 4) {
    console.log( 'Usage: node index.js <input file name> <output file name>')
    process.exit()
}

// Setup input and output files.
var inputFileName = process.argv[2];
var outputFileName = process.argv[3];

var inputFileData = fs.readFileSync(path.join(__dirname, inputFileName), {encoding: 'utf8'})
var outputFileData = ''

// Parse and compute.
var lines = inputFileData.split('\n')
var T = parseInt(lines.shift(), 10)
var t = 0

while(t < T) {
    t += 1

    var N = parseInt(lines.shift(), 10)
    var coords = []
    for (var i = 0, ii = N; i < ii; ++i) {
        var line = lines.shift()
        coords.push([
            parseInt(line.split(' ')[0], 10),
            parseInt(line.split(' ')[1], 10)
        ])
    }

    // Compute!
    // For every coordinate, assume it is the shared endpoint.
    // Compute all squared distances to this endpoint.
    // Store into map of array of coordinates. The map id is the squared distances.
    // Then distinct is K choose 2. Sum them all up for all squared distances.
    var sum = 0

    // Assume all coords given are unique and not sorted.
    for (var i = 0, ii = coords.length; i < ii; ++i) {
        var sharedCoord = coords[i]
        var distanceMap = {}
        var distanceKeyList = []

        for (var j = 0, jj = coords.length; j < jj; ++j) {
            var otherCoord = coords[j]

            // Skip same coord.
            if (sharedCoord[0] === otherCoord[0] && sharedCoord[1] === otherCoord[1]) {
                continue
            }

            var squaredDistance =
                Math.pow((sharedCoord[0] - otherCoord[0]), 2) +
                Math.pow((sharedCoord[1] - otherCoord[1]), 2)

            var key = '' + squaredDistance

            if (!distanceMap[key]) {
                distanceMap[key] = []
                distanceKeyList.push(key)
            }
            distanceMap[key].push(otherCoord)
        }

        for (var k = 0, kk = distanceKeyList.length; k < kk; ++k) {
            var key = distanceKeyList[k]
            var coordsCount = distanceMap[key].length

            sum += coordsCount * (coordsCount - 1) / 2
        }
    }

    outputFileData += 'Case #' + t + ': ' + sum + '\n'
}

fs.writeFileSync(path.join(__dirname, outputFileName), outputFileData, 'utf8')
