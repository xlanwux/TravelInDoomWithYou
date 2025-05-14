//==============================================================================
// MpiUrmVisualizeNextAction
//==============================================================================

/*:
 * @plugindesc 敵の行動を可視化
 * @author 奏ねこま（おとぶき ねこま）
 * 
 * [利用規約] ..................................................................
 *  - 本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  - 商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  - 利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  - プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  - 本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [改訂履歴] ..................................................................
 *   Version 1.00  2018/05/16  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2018 Nekoma Otobuki
 */

var Imported = Imported || {};
var Makonet = Makonet || {};

(function(){
	'use strict';

    var plugin = 'MpiUrmVisualizeNextAction';

    Imported[plugin] = true;
    Makonet[plugin] = {};

    var $mpi = Makonet[plugin];
    $mpi.parameters = PluginManager.parameters(plugin);

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    (function(o,p){
		var f=o[p];o[p]=function(){
			f.apply(this,arguments);
			if (BattleManager.isInputting()) {
				if (BattleManager.actor()) {
                    this._spriteset._enemySprites.forEach(function(sprite) {
                        sprite._skillIconSprite.refresh();
                        sprite._skillIconSprite.visible = true;
                    });
				} else {
                    this._spriteset._enemySprites.forEach(function(sprite) {
                        sprite._skillIconSprite.visible = false;
                    });
				}
			} else {
                this._spriteset._enemySprites.forEach(function(sprite) {
                    sprite._skillIconSprite.visible = false;
                });
            }
		};
	}(Scene_Battle.prototype,'changeInputWindow'));

    //==============================================================================
    // Sprite_Enemy
    //==============================================================================
    
    Sprite_Enemy.prototype.createSkillIconSprite = function() {
        this._skillIconSprite = new Sprite_SkillIcon();
        this.addChild(this._skillIconSprite);
    };
    
    (function(o,p){
		var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            this.createSkillIconSprite();
		};
	}(Sprite_Enemy.prototype,'initMembers'));
    
    (function(o,p){
		var f=o[p];o[p]=function(battler){
            f.apply(this,arguments);
            this._stateIconSprite.setup(null);
            this._skillIconSprite.setup(battler);
		};
	}(Sprite_Enemy.prototype,'setBattler'));
    
    (function(o,p){
		var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            if (this._enemy) {
                this.updateSkillSprite();
            }
        };
	}(Sprite_Enemy.prototype,'update'));
    
    Sprite_Enemy.prototype.updateSkillSprite = function() {
        this._skillIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
        if (this._skillIconSprite.y < 20 - this.y) {
            this._skillIconSprite.y = 20 - this.y;
        }
    };

    //==============================================================================
    // Sprite_SkillIcon
    //==============================================================================

    function Sprite_SkillIcon() {
        this.initialize.apply(this, arguments);
    }

    Sprite_SkillIcon.prototype = Object.create(Sprite.prototype);
    Sprite_SkillIcon.prototype.constructor = Sprite_SkillIcon;
    
    Sprite_SkillIcon.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.initMembers();
        this.loadBitmap();
    };
    
    Sprite_SkillIcon._iconWidth  = 32;
    Sprite_SkillIcon._iconHeight = 32;
    
    Sprite_SkillIcon.prototype.initMembers = function() {
        this._battler = null;
        this._iconIndex = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this._atkSprite = new Sprite(new Bitmap(200, 64));
        this._atkSprite.x = 12;
        this._atkSprite.y = -19;
        this._atkSprite.bitmap.fontSize = 20;
        this._atkSprite.visible = false;
        this.addChild(this._atkSprite);
    };
    
    Sprite_SkillIcon.prototype.loadBitmap = function() {
        this.bitmap = ImageManager.loadSystem('IconSet');
        this.setFrame(0, 0, 0, 0);
    };
    
    Sprite_SkillIcon.prototype.setup = function(battler) {
        this._battler = battler;
    };

    Sprite_SkillIcon.prototype.refresh = function() {
        this.updateIcon();
        this.updateFrame();
    };
    
    Sprite_SkillIcon.prototype.updateIcon = function() {
        if (this._battler && this._battler.isAlive()) {
            this._iconIndex = this._battler._actions[0]._item.object().iconIndex;
            if (this._battler._actions[0]._item.object().scope >= 1 &&
                this._battler._actions[0]._item.object().scope <= 11) {
                this._atkSprite.bitmap.clear();
                this._atkSprite.bitmap.drawText(' Atk:' + this._battler.atk, 0, 0, 200, 19, 'left');
                this._atkSprite.bitmap.drawText(' Def:' + this._battler.def, 0, 19, 200, 19, 'left');
                this._atkSprite.visible = true;
            } else {
                this._atkSprite.visible = false;
            }
        } else {
            this._iconIndex = 0;
            this._atkSprite.visible = false;
        }
    };
    
    Sprite_SkillIcon.prototype.updateFrame = function() {
        var pw = Sprite_SkillIcon._iconWidth;
        var ph = Sprite_SkillIcon._iconHeight;
        var sx = this._iconIndex % 16 * pw;
        var sy = Math.floor(this._iconIndex / 16) * ph;
        this.setFrame(sx, sy, pw, ph);
    };
}());
