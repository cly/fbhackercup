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
    var L = args[0] // loads of laundry
    var N = args[1] // N washing machines
    var M = args[2] // M dryers
    var D = args[3] // Dryer takes D minutes
    var W = lines.shift().split(' ').map(v => parseInt(v, 10))

    console.log(args, W)

    // outputFileData += 'Case #' + t + ': ' + sum + '\n'
}

// fs.writeFileSync(path.join(__dirname, outputFileName), outputFileData, 'utf8')
