
var assert = require("assert");
var newCell = require('./cell');
var newWorld = require('./world');

describe('cell', function(){
    it('can come to life', function(){
      var cell = newCell(false);
      assert.equal(cell.isAlive(), false);
      cell.changeState(true);
      assert.equal(cell.isAlive(), true);
    });

    it('can die', function(){
      var cell = newCell(true);
      assert.equal(cell.isAlive(), true);
      cell.changeState(false);
      assert.equal(cell.isAlive(), false);
    });

    it('knows how many alive neighbours it has', function(){
      var cell = newCell(true);
      var aliveCell = newCell(true);
      var deadCell = newCell(false);

      assert.equal(cell.aliveNeighbours(), 0);
      cell.addNeighbour(deadCell);
      assert.equal(cell.aliveNeighbours(), 0);
      cell.addNeighbour(aliveCell);
      assert.equal(cell.aliveNeighbours(), 1);
    });
});

describe('world', function(){
    it('can generate a world of specific dimentions', function(){
        var ROWS = 2;
        var COLUMNS = 3;
        var world = newWorld();
        world.generate(COLUMNS, ROWS); // x, y
        assert.equal(world.board.length, 2); // Rows
        assert.equal(world.board[0].length, 3); // Columns
    });
    it('can generate a world with (dead) cells', function(){
        var world = newWorld();
        world.generate(3,3);
        assert.equal(typeof(world.board[0][0]), 'object');
        assert.equal(world.board[2][2].isAlive(), false);
    });
    it('can generate a world with a specific state', function(){
        var world = newWorld();
        world.generate(3,3);
        assert.equal(world.board[2][0].isAlive(), false)
        world.board[0][0].changeState(true);
        world.board[1][0].changeState(true);
        world.board[2][0].changeState(true);
        assert.equal(world.board[2][0].isAlive(), true);
        assert.equal(world.board[0][2].isAlive(), false);
    });
    it('can generate the correct number of neighbours', function(){
        var world = newWorld();
        world.generate(3,3);
        var middleCell = world.board[1][1];
        var topLeft = world.board[0][0];
        var middleRight = world.board[2][1];
        assert.equal(middleCell.numberOfNeighbours(), 8);
        assert.equal(topLeft.numberOfNeighbours(), 3);
        assert.equal(middleRight.numberOfNeighbours(), 5);
    });
});

describe('life', function(){
    it('a dead cell with 2 neighbours comes to life (birth)', function(){
        var world = newWorld();
        world.generate(3,3);

        //Initial state
        world.board[0][0].changeState(true);
        world.board[1][1].changeState(true);

        assert.equal(world.board[1][0].isAlive(), false);
        assert.equal(world.board[0][1].isAlive(), false);
        //world.showBoard();
        world.tick();
        //world.showBoard();
        assert.equal(world.board[1][0].isAlive(), true);
        assert.equal(world.board[0][1].isAlive(), true);
    });
    it('a living cell with 1 or fewer neighbours dies from loneliness', function(){
        var world = newWorld();
        world.generate(3,3);
        //Initial state
        world.board[0][0].changeState(true);
        world.board[1][1].changeState(true);

        assert.equal(world.board[1][0].isAlive(), false);
        assert.equal(world.board[0][1].isAlive(), false);
        //world.showBoard();
        world.tick();
        //world.showBoard();
        assert.equal(world.board[0][0].isAlive(), false);
        assert.equal(world.board[1][1].isAlive(), false);
        assert.equal(world.board[1][0].isAlive(), true);
        assert.equal(world.board[0][1].isAlive(), true);
    });
    it('a living cell with 4 or more neighbours dies from overcrowding', function(){
        var world = newWorld();
        world.generate(4,4);
        //Initial state
        world.board[0][0].changeState(true);
        world.board[0][1].changeState(true);
        world.board[0][2].changeState(true);
        world.board[1][0].changeState(true);
        assert.equal(world.board[1][1].isAlive(), false);

        //world.showBoard();
        world.tick();
        //world.showBoard();
        assert.equal(world.board[1][1].isAlive(), true);
    });
});