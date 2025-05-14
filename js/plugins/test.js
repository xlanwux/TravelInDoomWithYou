(function(){
    'use strict';

    Input.keyMapper[117] = 'F6';

    class Sprite_Passable extends Sprite {
        constructor(x, y) {
            super();
            this._character = new Game_CharacterBase();
            this._character.setPosition(x, y);
            this.bitmap = new Bitmap($gameMap.tileWidth(), $gameMap.tileHeight());
            this.bitmap.fillRect(0, 0, $gameMap.tileWidth(), $gameMap.tileHeight(), 'red');
            this.alpha = 0.5;
            this.updatePosition();
        }

        update() {
            this.updatePosition();
            super.update();
        }

        updatePosition() {
            this.x = this._character.screenX() - $gameMap.tileWidth() / 2;
            this.y = this._character.screenY() - $gameMap.tileHeight() + this._character.shiftY();
        }
    }

    /* Scene_Map */
    {
        let __update = Scene_Map.prototype.update;
        Scene_Map.prototype.update = function() {
            __update.apply(this, arguments);
            if (Input.isTriggered('F6')) {
                if (this.__passableSprite) {
                    this.removeChild(this.__passableSprite);
                    delete this.__passableSprite;
                } else {
                    let checktile_queue = {};
                    let checkedtile_queue = {};
                    let d = [2, 4, 6, 8];
                    let xy = [[0, 1], [-1, 0], [1, 0], [0, -1]];
                    checktile_queue[[$gamePlayer.x, $gamePlayer.y]] = [$gamePlayer.x, $gamePlayer.y];
                    this.__passableSprite = new Sprite();                
                    do {
                        for (let key in checktile_queue) {
                            let [x, y] = checktile_queue[key];
                            for (let i = 0; i < 4; i++) {
                                if ($gamePlayer.canPass(x, y, d[i])) {
                                    let _x = x + xy[i][0];
                                    let _y = y + xy[i][1];
                                    if (!checkedtile_queue[[_x, _y]]) {
                                        checktile_queue[[_x, _y]] = [_x, _y];
                                    }
                                }
                            }
                            checkedtile_queue[key] = true;
                            delete checktile_queue[key];
                            this.__passableSprite.addChild(new Sprite_Passable(x, y));
                        }
                    } while(Object.keys(checktile_queue).length > 0);
                    this.addChild(this.__passableSprite);
                }
            }
        };
    }
}());
