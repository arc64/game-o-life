
//1) a cell can come to life
var cell = {
    alive: false,

    makeAlive: function(){
        this.alive = true;
    }
};

// Export into module namespsce
module.exports = cell;