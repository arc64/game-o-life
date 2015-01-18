
var cell = require('./cell');

var world = function(){
    var matrix = [];

    return {
        generate: function(width, height) {
            for (var y = 0; y < height; y++) {
                var row = [];
                for (var x = 0; x < width; x++) {
                    row[x] = cell(false, x, y);
                }
                matrix[y] = row;
            }
            //console.log(matrix)
            return matrix;
        }
    }
};

module.exports = world;