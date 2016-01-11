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

// Constraints
// 0 < |k1| <= 100
// 0 < m <= 50
// |k2| = |k1|
// m is divisor of |k1|
// k1, k2 consist of {a, b, c, d, e, f, ?}

// key space is 6^100 = 6.5 x 10^77 can't brute

// worst case when m = 1
// ? is kinda good for having a k but increases the set of keys to look at.
// k1 = f(k)
// k2 = f(g(k))

// if |k1| = 100, m = 1, things can be arranged in 100! ways = 9 x 10^157 cant brute
// above is false since vocab space is 7 characters so certain characters are repeated.
// 6^100 is more accurate

// lexicographically smallest key suggests iterating through solution space

var split_str = function(str, m) {
    var a = []
      , l = str.length/m

    for (var i = 0, ii = m; i < ii; ++i) {
        var sub = str.substr(i * l, l)
        a.push(sub)
    }
    return a
}

var possible_match = function(a, b) {
    for (var i = 0, ii = a.length; i < ii; ++i) {
        if (a[i] === b[i] || a[i] === '?' || b[i] === '?') {
            // match
        } else {
            return false
        }
    }
    return true
}

var edge_id = 0
var Edge = function(u, v, w) {
    this.source = u
    this.sink = v
    this.capacity = w
    this.id = '' + edge_id
    edge_id = edge_id + 1
}

var Path = function() {
    this.arr = []
}
Path.prototype = function() {
    return {
        add: function(edge, residual) {
            this.arr.push({
                edge: edge
              , residual: residual
            })
            return this
        }
      , has: function(edge, residual) {
            for (var i = 0, ii = this.arr.length; i < ii; ++i) {
                if (edge === this.arr[i].edge && residual === this.arr[i].residual) {
                    return true
                }
            }
            return false
        }
      , min: function() {
            var min
            for (var i = 0, ii = this.arr.length; i < ii; ++i) {
                var res = this.arr[i].residual
                if (typeof min === 'undefined') {
                    min = res
                } else if (res < min) {
                    min = res
                }
            }
            return min
        }
    }
}()

var FlowNetwork = function() {
    this.adj = {}
    this.flow = {}
}

FlowNetwork.prototype = function() {
    return {
        add_vertex: function(vertex) {
            this.adj[vertex] = []
        }
      , get_edges: function(v) {
            return this.adj[v]
        }
      , add_edge: function(u, v, w) {
            if (u === v) {
                throw new Error('u === v')
            }
            if (typeof w === 'undefined') {
                w = 0
            }
            var edge = new Edge(u, v, w)
            var redge = new Edge(v, u, 0)
            edge.redge = redge
            redge.redge = edge

            this.adj[u].push(edge)
            this.adj[v].push(redge)
            this.flow[edge.id] = 0
            this.flow[redge.id] = 0
        }
      , find_path: function(source, sink, path) {
            var self = this
            if (source === sink) {
                return path
            }
            var edges = self.get_edges(source)
            for (var i = 0, ii = edges.length; i < ii; ++i) {
                var edge = edges[i]
                  , residual = edge.capacity - self.flow[edge.id]

                if (residual > 0 && !path.has(edge, residual)) {
                    result = self.find_path(edge.sink, sink, path.add(edge, residual))
                    return result
                }
            }
        }
      , max_flow: function(source, sink) {
            var self = this
              , path = self.find_path(source, sink, new Path())

            while (path) {
                var flow = path.min()
                path.arr.forEach(function(v) {
                    self.flow[v.edge.id] += flow
                    self.flow[v.edge.redge.id] -= flow
                })
                path = self.find_path(source, sink, new Path())
            }
            var edges = self.get_edges(source)
            var sum = 0
            edges.forEach(function(edge) {
                sum += self.flow[edge.id]
            })
            return sum
        }
    }
}()

var g = new FlowNetwork()
var vertices = ['s', 'o', 'p', 'q', 'r', 't']
vertices.map(function(v) {
    g.add_vertex(v)
})
g.add_edge('s','o',3)
g.add_edge('s','p',3)
g.add_edge('o','p',2)
g.add_edge('o','q',3)
g.add_edge('p','r',2)
g.add_edge('r','t',3)
g.add_edge('q','r',4)
g.add_edge('q','t',2)

console.log('-----------', g.max_flow('s', 't'))


for (var i = 0, ii = num_tests; i < ii; ++i) {
    var line1 = lines[i * 3]
      , line2 = lines[i * 3 + 1]
      , line3 = lines[i * 3 + 2]
      , m = +(line1.split(' ')[0])
      , k1 = line2
      , k2 = line3

    var k1_sorted = split_str(k1, m).sort()
    var k2_sorted = split_str(k2, m).sort()

    console.log(k1_sorted, k2_sorted)

    var impossible = false

    for (var j = 0, jj = m; j < jj; ++j) {
        if (!possible_match(k1_sorted[j], k2_sorted[j])) {
            impossible = true
            break
        }
    }
    var solution

    var output = 'Case #' + (i + 1) + ': ' + (impossible ? 'IMPOSSIBLE' : solution)
    console.log(i, ii, impossible, output)
    output_file_lines.push(output)
}

fs.writeFileSync(output_file_name, output_file_lines.join('\n'), 'utf8')
