
var cell = require('./cell');

var world = function(){
    var matrix = [];

    return {
        generate: function(height, width) {
            for (var i = 0; i < width; i++) {
                var row = []
                for (var j = 0; j < height; j++) {
                    row[j] = cell(false);
                }
                matrix[i] = row;
            }
            //console.log(matrix)
            return matrix;
        }
    }
};

module.exports = world;