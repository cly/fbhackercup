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
  , num_tests = +lines.shift()

var params = {}

var m = function(i, m_prev) {
    if (i === 0) {
        return params.a
    } else {
        return (params.b * m_prev + params.c) % params.r
    }
}

for (var i = 0, ii = num_tests; i < ii; ++i) {
    var line1 = lines[i * 2]
      , line2 = lines[i * 2 + 1]
      , n = +(line1.split(' ')[0])
      , k = +(line1.split(' ')[1])
      , n_prime = n - k - 1
      , m_prev
      , m_values = []

    params.a = +(line2.split(' ')[0])
    params.b = +(line2.split(' ')[1])
    params.c = +(line2.split(' ')[2])
    params.r = +(line2.split(' ')[3])

    for (var j = 0, jj = k; j < jj; ++j) {
        m_prev = m(j, m_prev)
        m_values.push(m_prev)
    }

    for (var x = k, xx = n; x < xx; ++x) {
        var sorted_m_values = _(m_values).chain().unique().sortBy(function(v) {return v}).value()
        var min
        for (var j = 0, jj = sorted_m_values.length; j < jj; ++j) {
            if (sorted_m_values[j] !== j) {
                if (j > 0) {
                    min = sorted_m_values[j - 1] + 1
                } else {
                    min = 0
                }
                break
            }
        }

        m_values.push(min)
        m_values.splice(0, 1)
    }

    nth = min
    var output = 'Case #' + (i + 1) + ': ' + nth
    console.log(i, ii, n_prime, nth, output)
    output_file_lines.push(output)
}

fs.writeFileSync(output_file_name, output_file_lines.join('\n'), 'utf8')
