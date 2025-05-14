//=============================================================================
// Tachi.js
//=============================================================================

/*:
 * @plugindesc foooooo
 * @author tachi
 *
 * @help 気をつけろ！( ・´ｰ・｀)
 */

(function() {

    function __tachi_is_pressed() {
        return ($gameParty.inBattle() && Input.isPressed('ok')) || Input.isPressed('shift') || TouchInput.isPressed();
    };

    function __tachi_is_pressed2() {
        return ($gameParty.inBattle() && Input.isLongPressed('ok')) || Input.isLongPressed('shift') || TouchInput.isLongPressed();
    };

    // アイテム数の表示を調整
    Window_ItemList.prototype.numberWidth = function() {
        return this.textWidth('0000');
    };

    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
        if (this.needsNumber()) {
            this.drawText(':', x, y, width - this.textWidth('000'), 'right');
            this.drawText($gameParty.numItems(item), x, y, width, 'right');
        }
    };

    // 位置調整
    Window_TitleCommand.prototype.windowWidth = function() {
        return 190;
    };

    Window_TitleCommand.prototype.updatePlacement = function() {
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.y = Graphics.boxHeight - this.height - 96 + 50;
    };

    // 限界値
    Game_BattlerBase.prototype.paramMax = function(paramId) {
        if (paramId === 0) {
            return 999999;  // MHP
        } else if (paramId === 1) {
            return 9999;    // MMP
        } else {
            return 9999;
        }
    };

    // =============================================================================
    // ゲームスピード調整
    // =============================================================================
    
    Scene_Map.prototype.updateMainMultiply = function() {
        this.updateMain();
        if (this.isFastForward()) {
            this.updateMain();
            this.updateMain();
            this.updateMain();
            this.updateMain();
        }
    };
    
    Window_BattleLog.prototype.updateWaitCount = function() {
        if (this._waitCount > 0) {
            if (Input.isPressed('shift') || this.isFastForward())
            {
                this._waitCount -= 20;
            }
            else { this._waitCount -= 2; }

            if (this._waitCount < 0) {
                this._waitCount = 0;
            }
            return true;
        }
        return false;
    };

    Scene_Map.prototype.encounterEffectSpeed = function() {
        return 20;
    };
    
    Scene_Map.prototype.updateEncounterEffect = function() {
        if (this._encounterEffectDuration > 0) {
            this._encounterEffectDuration--;
            var speed = this.encounterEffectSpeed();
            var n = speed - this._encounterEffectDuration;
            var p = n / speed;
            var q = ((p - 1) * 20 * p + 5) * p + 1;
            var zoomX = $gamePlayer.screenX();
            var zoomY = $gamePlayer.screenY() - 24;
            if (n === 2) {
                //$gameScreen.setZoom(zoomX, zoomY, 1);
                this.snapForBattleBackground();
                this.startFlashForEncounter(speed / 2);
            }
            //$gameScreen.setZoom(zoomX, zoomY, q);
            if (n === Math.floor(speed / 6)) {
                this.startFlashForEncounter(speed / 2);
            }
            if (n === Math.floor(speed / 2)) {
                BattleManager.playBattleBgm();
                this.startFadeOut(10)// this.fadeSpeed());
            }
        }
    };

    Sprite_Animation.prototype.update = function() {
        Sprite.prototype.update.call(this);

        this.updateMain();
        if(__tachi_is_pressed()){ this.updateMain(); this.updateMain(); this.updateMain(); }

        this.updateFlash();
        this.updateScreenFlash();
        this.updateHiding();
        Sprite_Animation._checker1 = {};
        Sprite_Animation._checker2 = {};
    };
    
    Sprite_Enemy.prototype.update = function() {
        Sprite_Battler.prototype.update.call(this);
        if (this._enemy) {

            this.updateEffect();
            if(__tachi_is_pressed()){this.updateEffect(); this.updateEffect();}

            this.updateStateSprite();
        }
    };
    
    Sprite_Weapon.prototype.animationWait = function() {
        if(__tachi_is_pressed()){return 3;}else{return 12;}
    };
    
    Sprite_Actor.prototype.motionSpeed = function() {
        if(__tachi_is_pressed()){return 3;}else{return 12;}
    };
    
    Sprite_Actor.prototype.updateMove = function() {
        var bitmap = this._mainSprite.bitmap;
        if (!bitmap || bitmap.isReady()) {
            Sprite_Battler.prototype.updateMove.call(this); Sprite_Battler.prototype.updateMove.call(this);
            if(__tachi_is_pressed()){Sprite_Battler.prototype.updateMove.call(this); Sprite_Battler.prototype.updateMove.call(this);}
        }
    };
    
    Scene_Map.prototype.isFastForward = function() {
        return ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() &&
                __tachi_is_pressed2());
    };
    // 

    // 吸収技にもダメージエフェクトをつける
    Game_Action.prototype.apply = function(target) {
        var result = target.result();
        this.subject().clearResult();
        result.clear();
        result.used = this.testApply(target);
        result.missed = (result.used && Math.random() >= this.itemHit(target));
        result.evaded = (!result.missed && Math.random() < this.itemEva(target));
        result.physical = this.isPhysical();
        //result.drain = this.isDrain();
        if (result.isHit()) {
            if (this.item().damage.type > 0) {
                result.critical = (Math.random() < this.itemCri(target));
                var value = this.makeDamageValue(target, result.critical);
                this.executeDamage(target, value);
            }
            this.item().effects.forEach(function(effect) {
                this.applyItemEffect(target, effect);
            }, this);
            this.applyItemUserEffect(target);
        }
    };

    // クリティカル調整
    //Game_Action.prototype.applyCritical = function(damage) {
    //    return damage * 2;
    //};

    // 身代わり時に音を鳴らす
    Game_Battler.prototype.performSubstitute = function(target) {
        SoundManager.playReflection();
    };

    Scene_Map.prototype.startEncounterEffect = function() {
        //this._spriteset.hideCharacters();
        this._encounterEffectDuration = this.encounterEffectSpeed();
    };

    // アイテム所持数
    // Game_Party.prototype.maxItems = function(item) {
    //     return 999;
    // };

    // エンカウントしたかどうか
    Game_Player.prototype.executeEncounter = function() {
        if (!$gameMap.isEventRunning() && this._encounterCount <= 0) {
            this.makeEncounterCount();
            var troopId = this.makeEncounterTroopId();
            if ($dataTroops[troopId]) {
                $gameSwitches.setValue(3, true);  // 変更箇所
                BattleManager.setup(troopId, true, false);
                BattleManager.onEncounter();
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    // HP関係なく身代わり
    BattleManager.checkSubstitute = function(target) {
        return !this._action.isCertainHit();
    };

    // バトルコマンド隠し
    Window_ActorCommand.prototype.makeCommandList = function() {
        if (this._actor) {
           // this.addAttackCommand();
            this.addSkillCommands();
            //this.addGuardCommand();
            this.addItemCommand();
        }
    };

})();
