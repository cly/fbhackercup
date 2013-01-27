var _ = require('underscore')

var data = [{
    s: 'ABbCcc'
  , x: 1
  , y: 152
}, {
    s: 'Good luck in the Facebook Hacker Cup this year!'
  , x: 2
  , y: 754
}, {
    s: 'Ignore punctuation, please :)'
  , x: 3
  , y: 491
}, {
    s: 'Sometimes test cases are hard to make up.'
  , x: 4
  , y: 729
}, {
    s: 'So I just go consult Professor Dalves'
  , x: 5
  , y: 646
}]

// Clearly a = 24, b = 25, c = 26
//
// Beauty invariants
// Beauty of each color is an integer between 1 and 26 inclusive
// No two letters can have the same beauty
// Case does not matter.
// Ignore non-letters.
var letters_re = /[a-z]/
var all_letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

// Reduce brute-force set size.
var possible_values = all_letters.map(function(letter) {
    return {
        letter: letter
      , possible: _.range(1, 26 + 1)
    }
})

for (var i = 0, ii = data.length; i < ii; ++i) {
    var line = data[i]
      , s = line.s.toLowerCase()
      , letters = s.split('')

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

    sorted_count_arr.forEach(function(letter, i) {
        var other_maximum_sum = 0
        var max_num = 26

        // Find max sum of other numbers
        sorted_count_arr.forEach(function(inner_letter, inner_i) {
            if (letter.letter !== inner_letter.letter) {
                other_maximum_sum += inner_letter.count * max_num
                max_num = max_num - 1
            }
        })

        // Filter impossible cases!
        var num_gte = (line.y - other_maximum_sum)/letter.count
        possible_values.forEach(function(possible_letter) {
            if (possible_letter.letter === letter.letter) {
                possible_letter.possible = possible_letter.possible.filter(function(v) {
                    return v >= num_gte
                })
            }
        })
    })

/*
    var max_beauty = 26
    sorted_count_arr = sorted_count_arr.map(function(v) {
        //v.max_beauty = max_beauty
        max_beauty = max_beauty - 1
        return v
    })
*/
    //console.log(JSON.stringify(sorted_count_arr))
}

console.log(JSON.stringify(possible_values))



