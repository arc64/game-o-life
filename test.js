
var assert = require("assert");
var newCell = require('./cell');
var newWorld = require('./world');

describe('cell', function(){
    it('a cell can come to life', function(){
      var cell = newCell(false);
      assert.equal(cell.isAlive(), false);
      cell.animate();
      assert.equal(cell.isAlive(), true);
    });

    it('a cell can die', function(){
      var cell = newCell(true);
      assert.equal(cell.isAlive(), true);
      cell.die();
      assert.equal(cell.isAlive(), false);
    });
})

describe('world', function(){
    it('can generate a world of specific dimentions', function(){
        var ROWS = 5;
        var COLUMNS = 4;
        var world = newWorld().generate(ROWS,COLUMNS,"Awesome");
        assert.equal(world.length, 4);
        assert.equal(world[0].length, 5);
    });
    it('can generate a world with cells', function(){
        var cell = newCell(false);
        var world = newWorld().generate(3,3,cell);
        assert.equal(typeof(world[0][0]), 'object');
        assert.equal(world[2][2].isAlive(), false);
    });
})