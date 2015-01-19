
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
            cells[i].changeState(state);
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
            var cellsToBirth = [];
            var cellsToKill = [];
            for (var x = 0; x < matrix.length; x++) {
                for (var y = 0; y < matrix.length; y++) {
                    var cell = matrix[x][y];
                    //3) a dead cell with 2 neighbours comes to life (birth)
                    if(!cell.isAlive() && cell.aliveNeighbours() >= 2) {
                        cellsToBirth.push(cell);
                    }
                    //4) a living cell with 1 or fewer neighbours dies from loneliness
                    if(cell.isAlive() && cell.aliveNeighbours() <= 1) {
                        cellsToKill.push(cell);
                    }
                    //5) a living cell with 4 or more neighbours dies from overcrowding
                    if(cell.isAlive() && cell.aliveNeighbours() >= 4) {
                        cellsToKill.push(cell);
                    }
                }
            }
            update(cellsToBirth, true);
            update(cellsToKill, false);
        },
        showBoard: function() {
            console.log("========================World========================");
            for (var x = 0; x < matrix.length; x++) {
                var coords = "| ";
                for (var y = 0; y < matrix[0].length; y++) {
                    var cell = matrix[x][y];
                    var padding = "";
                    if(cell.isAlive()) padding = " ";
                    //coords += " "+cell.x +","+ cell.y;
                    coords += " " + cell.isAlive() + padding +" | ";

                }
                console.log(coords);
            }
            console.log("========================"+matrix.length+'x'+matrix[0].length+"==========================");
        }
    }
};

module.exports = world;