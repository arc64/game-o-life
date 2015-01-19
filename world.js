
var cell = require('./cell');

var world = function(){
    var matrix = [];

    var assignNeighbours = function (cell){
        var x = cell.x;
        var y = cell.y;
        for(var row = x - 1; row <= x + 1; row ++) {
            for(var column =  y - 1;  column <= y + 1; column ++) {
                if( !(x == row && y == column)          // not this cell
                    && row >= 0 && column >= 0          // not out of boundary of the world
                    && row < matrix.length && column < matrix[0].length ) {
                    cell.addNeighbour(matrix[row][column]);

                }
            }
        }
    };

    var calculateNeighbours = function(){
        for (var y = 0; y < matrix[0].length; y++) {
            for (var x = 0; x < matrix.length; x++) {
                assignNeighbours(matrix[x][y]);
            }
        }
    };

    var update = function(cells, state) {
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            matrix[cell.x][cell.y].changeState(state);
        }
    };
    return {
        board: matrix,
        populate: update,
        generate: function(width, height) {
            for (var x = 0; x < height; x++) {
                var row = [];
                for (var y = 0; y < width; y++) {
                    row[y] = cell(false, x, y);
                }
                matrix[x] = row;
            }
            calculateNeighbours();
        },
        tick: function() {
            var cells = [];
            for (var x = 0; x < matrix.length; x++) {
                for (var y = 0; y < matrix.length; y++) {
                    var cell = matrix[x][y];
                    //3) a dead cell with 2 neighbours comes to life (birth)
                    if(!cell.isAlive() && cell.aliveNeighbours() >= 2) {
                        cells.push(matrix[x][y]);
                    }

                }
            }
            update(cells, true);
        },
        showBoard: function() {
            console.log("========================World========================");
            for (var x = 0; x < matrix.length; x++) {
                var coords = "|  ", state = "|  ";
                for (var y = 0; y < matrix[0].length; y++) {
                    var cell = matrix[x][y];
                    var padding = "";
                    if(cell.isAlive()) padding = " ";
                    coords += " "+cell.x +","+ cell.y + " " + cell.isAlive() + padding +"   |    ";

                }
                console.log(coords);
                console.log(state);
            }
            console.log("========================"+matrix.length+'x'+matrix[0].length+"==========================");
        }
    }
};

module.exports = world;