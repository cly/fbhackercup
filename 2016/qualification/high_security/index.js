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

    // Number of columns = N.
    var N = parseInt(lines.shift(), 10)
    var G = [lines.shift(), lines.shift()]

    console.log(G)

    // outputFileData += 'Case #' + t + ': ' + sum + '\n'
}

// fs.writeFileSync(path.join(__dirname, outputFileName), outputFileData, 'utf8')
