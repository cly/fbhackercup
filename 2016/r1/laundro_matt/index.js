var fs = require('fs')
var path = require('path')

if (process.argv.length !== 3) {
    console.log( 'Usage: node index.js <input file name>')
    process.exit()
}

// Setup input and output files.
var inputFileName = process.argv[2];
var outputFileName = inputFileName + '.output.txt';

var inputFileData = fs.readFileSync(path.join(__dirname, inputFileName), {encoding: 'utf8'})
var outputFileData = ''

// Parse and compute.
var lines = inputFileData.split('\n')
var T = parseInt(lines.shift(), 10)
var t = 0

while(t < T) {
    t += 1

    var N = parseInt(lines.shift(), 10)
    var D = lines.shift().split(' ').map(v => parseInt(v, 10))

    // If increasing put into same group. Otherwise, new group.
    var sets = []
    var subset = []
    sets.push(subset)

    for (var i = 0, ii = D.length; i < ii; ++i) {
        var d = D[i]

        if (!subset.length || d > subset[subset.length - 1]) {
            subset.push(d)
        } else {
            subset = [d]
            sets.push(subset)
        }
    }

    var sum = 0
    for (var i = 0, ii = sets.length; i < ii; ++i) {
        var subset = sets[i]

        if (subset === 1) {
            // If single value in a set then add 3 to make 4.
            sum += 3
        } else {
            // At least 2. Count how many needed to connect everything.
            var tempSum = subset.length
            for (var j = 0, jj = subset.length - 1; j < jj; ++j) {
                var tempDiff = subset[j + 1] - subset[j]

                if (tempDiff <= 10) {
                    // Do nothing.
                } else if (tempDiff <= 20) {
                    tempSum += 1
                } else if (tempDiff <= 30) {
                    tempSum += 2
                } else if (tempDiff > 30) {
                    tempSum += 3
                }
            }

            sum += tempSum - subset.length
            var modulusFour = tempSum % 4

            if (modulusFour !== 0) {
                sum += (4 - modulusFour)
            }
        }
    }

    outputFileData += 'Case #' + t + ': ' + sum + '\n'
}

fs.writeFileSync(path.join(__dirname, outputFileName), outputFileData, 'utf8')
