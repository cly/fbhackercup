var fs = require('fs')
  , _ = require('underscore')
  , bigint = require('bigint')

// Commandline
if (process.argv.length < 3) {
    console.log('Requires input file name')
    process.exit()
}

function factorial(num) {
    var result = bigint(1)
    for (var i = bigint(2), ii = num.add(1); i.lt(ii); i = i.add(1)) {
        result = result.mul(i)
    }
    return result
}

function choose(a, b) {
    return factorial(a).div(factorial(b).mul(factorial(a.sub(b))))
}

// Get input
var input_file_name = process.argv[2]
  , input_file = fs.readFileSync(input_file_name, 'utf8')
  , output_file_name = process.argv[2] + '.output'
  , output_file_lines = []
  , lines = input_file.split('\n')
  , num_tests = +lines.shift()

for (var i = 0, ii = num_tests; i < ii; ++i) {
    var line1 = lines[i * 2]
      , line2 = lines[i * 2 + 1]
      , n = +(line1.split(' ')[0])
      , k = +(line1.split(' ')[1])

    var a = line2.split(' ')
    a = a.filter(function(v) {
        return v !== ' ' && v !== '' && _.isNumber(parseInt(v, 10))
    })
    a = a.map(function(v) {
        return +v
    })
    a = a.sort()

    var sum = bigint(0)
    for (var j = k - 1, jj = n; j < jj; ++j) {
        var c = choose(bigint(j), bigint(k - 1))
        var temp = c.mul(a[j]).mod(1000000007)
        sum = sum.add(temp)
    }

    sum = sum.toNumber()

    var output = 'Case #' + (i + 1) + ': ' + sum
    console.log(i, ii, output)
    output_file_lines.push(output)
}

fs.writeFileSync(output_file_name, output_file_lines.join('\n'), 'utf8')
