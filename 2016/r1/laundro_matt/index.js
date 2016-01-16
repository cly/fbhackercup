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

// Heap implementation.
// Assume node has a cost attribute.
var BinaryMinHeap = function() {
    this.data = []
}

BinaryMinHeap.prototype.insert = function(value) {
    this.data.push(value)
    this.upHeapify(this.data.length - 1)
}

BinaryMinHeap.prototype.getRoot = function() {
    return this.data[0]
}

BinaryMinHeap.prototype.updateRoot = function(value) {
    if (this.data.length) {
        this.data[0] = value
        this.downHeapify(0)
    }
}

BinaryMinHeap.prototype.tradeNodes = function(index, index2) {
    var tempNode = this.data[index]
    this.data[index] = this.data[index2]
    this.data[index2] = tempNode
}

BinaryMinHeap.prototype.downHeapify = function(index) {
    // [0, 1, 2, 3, 4, 5, 6]
    var leftChildIndex = index * 2 + 1
    var rightChildIndex = index * 2 + 2
    var current = this.data[index]

    if (rightChildIndex < this.data.length) {
        // Both children exists.
        var leftChild = this.data[leftChildIndex]
        var rightChild = this.data[rightChildIndex]

        if (rightChild < leftChild && rightChild < current) {
            this.tradeNodes(index, rightChildIndex)
            this.downHeapify(rightChildIndex)
        } else if (leftChild < current) {
            // leftChild is smaller or equal to rightChild.
            this.tradeNodes(index, leftChildIndex)
            this.downHeapify(leftChildIndex)
        }
    } else if (leftChildIndex < this.data.length) {
        // Only one child.
        var leftChild = this.data[leftChildIndex]
        if (leftChild < current) {
            this.tradeNodes(index, leftChildIndex)
            this.downHeapify(leftChildIndex)
        }
    }
}

BinaryMinHeap.prototype.upHeapify = function(index) {
    // [0, 1, 2, 3, 4, 5, 6]
    if (index > 0) {
        var parentIndex = Math.floor((index - 1) / 2)
        if (this.data[index] < this.data[parentIndex]) {
            this.tradeNodes(index, parentIndex)
            this.upHeapify(parentIndex)
        }
    }
}

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

    var h = new BinaryMinHeap();

    console.log(h)

    // outputFileData += 'Case #' + t + ': ' + sum + '\n'
}

// fs.writeFileSync(path.join(__dirname, outputFileName), outputFileData, 'utf8')
