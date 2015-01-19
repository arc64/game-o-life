
//1) a cell can come to life
//2) a cell can die
var cell = function(state, x, y) {
    var that = this;
    var liveness = state;

    // A cell should know whether it has neighbours
    var neighbours = [];

    return {
        // A cell should know where on the board it is
        x: x,
        y: y,

        numberOfNeighbours: function(){
            return neighbours.length; // just for testing
        },

        changeState: function(state){
            liveness = state;
        },

        isAlive: function(){
            return liveness;
        },

        addNeighbour: function(neighbour) {
            neighbours.push(neighbour);
        },

        aliveNeighbours: function(){
            var aliveCells = neighbours.filter(function(cell){
                return cell.isAlive();
            });
            return aliveCells.length;
        }

    }
};

// Export into module namespsce
module.exports = cell;


