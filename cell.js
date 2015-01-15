
//1) a cell can come to life
var cell = {
    alive: false,

    animate: function(){
        this.alive = true;
    }
};

// Export into module namespsce
module.exports = cell;