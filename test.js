
var assert = require("assert");

var cell = require('./cell');
describe('cell', function(){
    it('a cell can come to life', function(){
      assert.equal(cell.animate, false);
      cell.makeAlive();
      assert.equal(cell.animate, true);
    })
})