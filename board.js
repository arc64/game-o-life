
var cell = require('./cell');

var board = function(){

    return {
        generate: function(height, width, initial) {
            var matrix = [];
            for (var i = 0; i < width; i++) {
                var row = []
                for (var j = 0; j < height; j++) {
                    row[j] = initial;
                }
                matrix[i] = row;
            }
            console.log(matrix)
            return matrix;
        }
    }
};

module.exports = board;