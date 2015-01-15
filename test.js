
var assert = require("assert");
var newCell = require('./cell');

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
