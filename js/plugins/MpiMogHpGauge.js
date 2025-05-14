(function(){
    'use strict';

    /* 設定ここから */

    /* 設定例
        { tp:26, file:'HPGaugeActor_A1' },
        上記の場合、「TPが26以上だったらHPGaugeActor_A1を表示する」となります。
        設定の数は任意に増やせますが、tpは下のほうが大きくなるように並べてください。
    */

    // アクター用
    var _actorImg = [
        // { tp:25,  file:'HPGaugeActor_A1' },
        // { tp:50,  file:'HPGaugeActor_A2' },
        // { tp:100, file:'HPGaugeActor_A3' },
    ];

    // エネミー用
    var _enemyImg = [
        { tp:0,  file:'HPGaugeEnemy_A1' },
        { tp:20, file:'HPGaugeEnemy_A2' },
        { tp:25, file:'HPGaugeEnemy_A3' },
        { tp:33, file:'HPGaugeEnemy_A4' },
        { tp:40, file:'HPGaugeEnemy_A5' },
        { tp:50, file:'HPGaugeEnemy_A6' },
        { tp:60, file:'HPGaugeEnemy_A7' },
        { tp:66, file:'HPGaugeEnemy_A8' },
        { tp:75, file:'HPGaugeEnemy_A9' },
        { tp:80, file:'HPGaugeEnemy_A10' },
        { tp:100, file:'HPGaugeEnemy_A11' },
    ];

    /* 設定ここまで */

    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            (this.type === 0 ? _actorImg : _enemyImg).forEach(function(img){
                img.bitmap = ImageManager.loadSystem(img.file);
            });
        };
    }(HPGaugeSprite.prototype,'loadBitmaps'));

    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            (this.type === 0 ? _actorImg : _enemyImg).forEach(function(img){
                var s = new Sprite(img.bitmap);
                s.visible = false;
                this.addChild(s);
            },this);
        };
    }(HPGaugeSprite.prototype,'createLayout'));

    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            if (this._layout) {
                var bitmap = this._layImg;
                (this.type === 0 ? _actorImg : _enemyImg).forEach(function(img){
                    if (this.battler().tp >= img.tp) {
                        bitmap = img.bitmap;
                    }
                },this);
                if (this._layout.bitmap !== bitmap) {
                    this._layout.bitmap = bitmap;
                    console.log(this.battler().tp);
                }
            }
        };
    }(HPGaugeSprite.prototype,'update'));
}());
