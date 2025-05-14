(function(){
    'use strict';
    
    if (Graphics._bitmapPool) {
        if (Imported.MOG_ActorPictureCM) {
            (function(p, c) {
                var f = p[c]; p[c] = function() {
                    f.apply(this, arguments);
                    if (this._actor_cm_img) {
                        this._actor_cm_img.forEach(function(bitmap) {
                            if (bitmap) {
                                var sprite = new Sprite(bitmap);
                                sprite.visible = false;
                                this.addChild(sprite);
                            }
                        }, this);
                    }
                    if (this._actor_cm2_img) {
                        this._actor_cm2_img.forEach(function(bitmap) {
                            if (bitmap) {
                                var sprite = new Sprite(bitmap);
                                sprite.visible = false;
                                this.addChild(sprite);
                            }
                        }, this);
                    }
                };
            }(Actor_CMPicture.prototype, 'load_actor_cm_pictures'));
        }

        if (Imported.MOG_BattleHud) {
            (function(p, c) {
                var f = p[c]; p[c] = function(filename) {
                    var bitmap = f.apply(this, arguments);
                    bitmap.__liply_attachedToScene = true;
                    return bitmap;
                };
            }(ImageManager, 'loadBHud'));
        }

        (function(p, c) {
            var f = p[c]; p[c] = function() {
                f.apply(this, arguments);
                var sprite1 = new Sprite(this._bitmap1);
                var sprite2 = new Sprite(this._bitmap2);
                sprite1.visible = false;
                sprite2.visible = false;
                this.addChild(sprite1);
                this.addChild(sprite2);
            };
        }(Sprite_Animation.prototype, 'loadBitmaps'));
    }
}());