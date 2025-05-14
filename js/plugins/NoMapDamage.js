(function(){
    'use strict';

    (function(o,p){
        var f=o[p];o[p]=function(){
            if (!$gameParty.inBattle()) {
                return;
            }
            f.apply(this,arguments);
        };
    }(Game_Actor.prototype,'regenerateHp'));
}());
(function(){
    'use strict';

    (function(o,p){
        var f=o[p];o[p]=function(){
            if (!$gameParty.inBattle()) {
                return;
            }
            f.apply(this,arguments);
        };
    }(Game_Actor.prototype,'regenerateMp'));
}());
