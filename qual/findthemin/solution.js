var fs = require('fs')
  , _ = require('underscore')

// Commandline
if (process.argv.length < 3) {
    console.log('Requires input file name')
    process.exit()
}

// Get input
var input_file_name = process.argv[2]
  , input_file = fs.readFileSync(input_file_name, 'utf8')
  , output_file_name = process.argv[2] + '.output'
  , output_file_lines = []
  , lines = input_file.split('\n')
  , num_lines = +lines.shift()

for (var i = 0, ii = num_lines; i < ii; ++i) {
    var line = lines[i]
    var n = 0

    var output = 'Case #' + (i + 1) + ': ' + n
    console.log(i, ii, n, output)
    output_file_lines.push(output)
}

fs.writeFileSync(output_file_name, output_file_lines.join('\n'), 'utf8')
