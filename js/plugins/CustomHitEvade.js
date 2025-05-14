(function(){
    (function(o,p){
        var f=o[p];o[p]=function(target){
            return 1;
        };
    }(Game_Action.prototype,'itemHit'));

    (function(o,p){
        var f=o[p];o[p]=function(target){
            var itemHit = this.item().successRate * 0.01;
            var itemEva = f.apply(this,arguments);
            if (!this.isCertainHit()) {
                itemHit *= this.subject().hit;
            }
            return 1 - (itemHit - itemEva);
        };
    }(Game_Action.prototype,'itemEva'));
}());
