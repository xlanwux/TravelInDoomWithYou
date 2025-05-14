(function(){
    'use strict';

    (function(o, p) {
        var f = o[p]; o[p] = function() {
            arguments[1] = !arguments[1];
            f.apply(this, arguments);
        };
    }(Game_Actor.prototype, 'startAnimation'));
}());