
//1) a cell can come to life
var cell = function(state) {
    var liveness = state;

    return {

        animate: function(){
            liveness = true;
        },

        die: function(){
            liveness = false;
        },

        isAlive: function(){
            return liveness;
        }

    }
};

// Export into module namespsce
module.exports = cell;


