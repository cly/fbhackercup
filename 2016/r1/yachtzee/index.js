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

    var args = lines.shift().split(' ').map(v => parseInt(v, 10))
    // outputFileData += 'Case #' + t + ': ' + allDoneTime + '\n'
}

// fs.writeFileSync(path.join(__dirname, outputFileName), outputFileData, 'utf8')
