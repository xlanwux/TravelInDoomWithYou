(function(){
    if (Spriteset_Battle.prototype.setbbexOrgInit) {
        (function(o,p){
            var f=o[p];o[p]=function(sprite){
                f.apply(this,arguments);
                if (sprite === this._back1Sprite ||
                    sprite === this._back2Sprite) {
                    sprite.oh = 0;
                    sprite.origin.y = 0;
                }
            };
        }(Spriteset_Battle.prototype,'setbbexOrgInit'));
    }
}());
