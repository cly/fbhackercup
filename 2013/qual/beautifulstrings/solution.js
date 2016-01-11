var fs = require('fs')

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
  , letters_re = /[a-z]/
  , all_letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

// Clearly a = 24, b = 25, c = 26
// Beauty invariants
// Beauty of each color is an integer between 1 and 26 inclusive
// No two letters can have the same beauty
// Case does not matter.
// Ignore non-letters.

// Training set
for (var i = 0, ii = num_lines; i < ii; ++i) {
    var line = lines[i]
      , line = line.toLowerCase()
      , letters = line.split('')

    // Filter out non-letters
    letters = letters.filter(function(letter) {
        return letters_re.test(letter)
    })

    // Get frequency of letters
    var count_arr = []
    all_letters.forEach(function(find_letter, i) {
        var find_letters = letters.filter(function(has_letter) {
            return has_letter === find_letter
        })
        count_arr.push({
            letter: find_letter
          , count: find_letters.length
        })
    })

    count_arr = count_arr.filter(function(v) {
        return v.count > 0
    })

    // Sort it by most frequently occurring letter first
    var sorted_count_arr = count_arr.sort(function(l, r) {
        return r.count - l.count
    })

    var sum = 0
    var max_num = 26
    sorted_count_arr.forEach(function(letter) {
        sum = sum + letter.count * max_num
        max_num = max_num - 1
    })

    output_file_lines.push('Case #' + (i + 1) + ': ' + sum)
}

fs.writeFileSync(output_file_name, output_file_lines.join('\n'), 'utf8')
