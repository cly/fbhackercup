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
  , letters_re = /[a-z]/

var no_positives = function(arr) {
    // If more closing brackets than open brackets
    var positives = arr.filter(function(v) {
        return v >= 0
    })
    return positives.length === 0
}

var no_zero = function(arr) {
    // If more closing brackets than open brackets
    var zeros = arr.filter(function(v) {
        return v === 0
    })
    return zeros.length === 0
}

for (var i = 0, ii = num_lines; i < ii; ++i) {
    var line = lines[i]
      , original_line = line
      , prev_colon = false
      , possible_paren = [0]
      , balanced = true

    var letters = line.split('')

    for (var j = 0, jj = letters.length; j < jj; ++j) {
        var letter = letters[j]
        // If colon just keep on going. Remember we saw one.
        if (letter === ':') {
            prev_colon = true
        } else if (letter === '(') {
            if (prev_colon) {
                prev_colon = false
                var old_arr = _(possible_paren).clone()
                var updated_arr = _(possible_paren).map(function(v) {
                    return v + 1
                })
                possible_paren = old_arr.concat(updated_arr)
            } else {
                possible_paren = _(possible_paren).map(function(v) {
                    return v + 1
                })
            }
        } else if (letter === ')') {
            if (prev_colon) {
                prev_colon = false
                var old_arr = _(possible_paren).clone()
                var updated_arr = _(possible_paren).map(function(v) {
                    return v - 1
                })
                possible_paren = old_arr.concat(updated_arr)
            } else {
                possible_paren = _(possible_paren).map(function(v) {
                    return v - 1
                })
            }

            if (no_positives(possible_paren)) {
                balanced = false
                break
            }
        }
    }

    if (no_zero(possible_paren)) {
        balanced = false
    }

    output_file_lines.push('Case #' + (i + 1) + ': ' + (balanced ? 'YES' : 'NO'))
}

fs.writeFileSync(output_file_name, output_file_lines.join('\n'), 'utf8')
