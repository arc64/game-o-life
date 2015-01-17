
var assert = require("assert");
var newCell = require('./cell');
var newWorld = require('./world');

describe('cell', function(){
    it('can come to life', function(){
      var cell = newCell(false);
      assert.equal(cell.isAlive(), false);
      cell.live(true);
      assert.equal(cell.isAlive(), true);
    });

    it('can die', function(){
      var cell = newCell(true);
      assert.equal(cell.isAlive(), true);
      cell.live(false);
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
})

describe('world', function(){
    it('can generate a world of specific dimentions', function(){
        var ROWS = 5;
        var COLUMNS = 4;
        var world = newWorld().generate(ROWS,COLUMNS);
        assert.equal(world.length, 4);
        assert.equal(world[0].length, 5);
    });
    it('can generate a world with (dead) cells', function(){
        var world = newWorld().generate(3,3);
        //console.log(world[0][1].isAlive())
        assert.equal(typeof(world[0][0]), 'object');
        assert.equal(world[2][2].isAlive(), false);
    });
    it('can kill cells with more than 2 neighbours', function(){

    });

})