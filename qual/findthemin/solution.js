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

    var sorted_m_values = _(m_values).sort(function(l, r) {return +l - +r})
    var spots = []
    var spots_count = 0
    var prev_value = -1
    for (var j = 0, jj = sorted_m_values.length; j < jj; ++j) {
        spots_count = sorted_m_values[j] - prev_value - 1
        if (spots.length > 0) {
            spots.push(spots_count + spots[spots.length - 1])
        } else {
            spots.push(spots_count)
        }
        prev_value = sorted_m_values[j]
    }

    var offset = spots.length
    for (var j = 0, jj = spots.length; j < jj; ++j) {
        if (n_prime < spots[j]) {
            offset = j
            break
        }
    }

    var nth = n_prime + offset


    var output = 'Case #' + (i + 1) + ': ' + nth
    console.log(i, ii, JSON.stringify(sorted_m_values), JSON.stringify(spots), nth, output)
    process.exit();
    output_file_lines.push(output)
}

fs.writeFileSync(output_file_name, output_file_lines.join('\n'), 'utf8')
