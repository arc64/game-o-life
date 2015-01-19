var newCell = require('./cell');
var newWorld = require('./world');

var game = function(rows, columns, generations){
    var world = newWorld();
    world.generate(rows,columns);

    world.board[0][0].changeState(true);
    world.board[1][1].changeState(true);
    world.board[2][0].changeState(true);
    world.board[3][1].changeState(true);
    world.board[2][2].changeState(true);

    for (var i = 0; i < generations; i++) {
        world.showBoard();
        world.tick();
    };

    return world;
};

game(5,5,10);
