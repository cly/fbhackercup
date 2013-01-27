var fs = require('fs')

// Commandline
if (process.argv.length < 3) {
    console.log('Requires input file name')
    process.exit()
}

// Get input
var input_file_name = process.argv[2]
  , input_file = fs.readFileSync(input_file_name, 'utf8')
  , lines = input_file.split('\n')
  , num_lines = +lines.shift()


// Training set
for (var i = 0, ii = num_lines; i < ii; ++i) {
    var line = lines[i]
    console.log(line)
}


