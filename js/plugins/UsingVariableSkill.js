//=============================================================================
// UsingVariableSkill.js
//=============================================================================

/*:
 * @plugindesc MP/TPの代わりに変数の値を消費するスキルを提供します。
 * @author こま
 *
 * @param Skill Type ID
 * @desc 変数の値を消費するスキルタイプのIDを指定してください。
 * @default 3
 *
 * @param Variable ID
 * @desc 値を消費する変数のIDを指定してください。
 * @default 1
 *
 * @param Skill Type ID-2
 * @desc 変数の値を消費するスキルタイプのIDを指定してください。
 * @default 4
 * 
 * @param Variable ID-2
 * @desc 値を消費する変数のIDを指定してください。
 * @default 2
 * 
 * @param Variable Position
 * @desc バトル画面で変数の現在値を表示する座標（数値の中心座標）を指定してください。（X座標 Y座標）
 * @default 720 96
 *
 * @param Variable Image
 * @desc 変数値表示に使用する画像を指定してください。
 *（img/systemフォルダ内の画像を使用）
 * @default VariableImage
 *
 * @param Infinity Image
 * @desc 無制限モード時に表示する画像を指定してください。
 *（img/systemフォルダ内の画像を使用）
 * @default InfinityImage
 *
 * @param Back Animation Setting
 * @desc 変数値の背景として表示するアニメーションを設定してください。
 * @default VariableAnime 5 3 3 1
 *
 * @param Visibility Control Switch ID
 * @desc 表示／非表示を制御するスイッチのIDを指定してください。
 * @default 1
 *
 * @param Infinity Switch ID
 * @desc 変数を消費しないようにするスイッチのIDを指定してください。
 * @default 2
 *
 * @param Common Event ID
 * @desc 変数値表示中かつ変数の値が0になったときに実行するコモンイベントのIDを指定してください。
 * @default 1
 *
 * @help
 * [?] プラグインパラメータ説明
 *
 *  Back Animation Setting
 *   ファイル名、横方向の枚数、縦方向の枚数、アニメーション間隔、合成方法を、
 *   スペース区切りで指定してください。
 *
 *   // VariableAnime.png、5x3枚、3フレーム間隔、加算合成の場合
 *   VariableAnime 5 3 3 1
 *
 *  画像はimg/systemフォルダ内のものを使用します。
 *  合成方法については以下の通り（PIXI.jsより引用）
 *
 *   0: NORMAL
 *   1: ADD
 *   2: MULTIPLY
 *   3: SCREEN
 *   4: OVERLAY
 *   5: DARKEN
 *   6: LIGHTEN
 *   7: COLOR_DODGE
 *   8: COLOR_BURN
 *   9: HARD_LIGHT
 *  10: SOFT_LIGHT
 *  11: DIFFERENCE
 *  12: EXCLUSION
 *  13: HUE
 *  14: SATURATION
 *  15: COLOR
 *  16: LUMINOSITY
 */

var Imported = Imported || {};
var Makonet = Makonet || {};

(function(){
    'use strict';

    var plugin = 'UsingVariableSkill';

    Imported[plugin] = true;
    Makonet[plugin] = {};

    var $mpi = Makonet[plugin];
    $mpi.parameters = PluginManager.parameters(plugin);

    $mpi.parameters['Variable Position'] = $mpi.parameters['Variable Position'].trim().split(/ +/);
    $mpi.parameters['Back Animation Setting'] = $mpi.parameters['Back Animation Setting'].trim().split(/ +/);

    $mpi.skillTypeId                     = +$mpi.parameters['Skill Type ID'] || 0;
    $mpi.variableId                      = +$mpi.parameters['Variable ID'] || 0;
    $mpi.skillTypeId2                    = +$mpi.parameters['Skill Type ID-2'] || 0;
    $mpi.variableId2                     = +$mpi.parameters['Variable ID-2'] || 0;
    $mpi.variablePosition = { x:           +$mpi.parameters['Variable Position'][0],
                              y:           +$mpi.parameters['Variable Position'][1] };
    $mpi.variableImage                   =  $mpi.parameters['Variable Image'];
    $mpi.infinityImage                   =  $mpi.parameters['Infinity Image'];
    $mpi.backAnimationSetting = { name:     $mpi.parameters['Back Animation Setting'][0],
                                  columns: +$mpi.parameters['Back Animation Setting'][1],
                                  rows:    +$mpi.parameters['Back Animation Setting'][2],
                                  frame:   +$mpi.parameters['Back Animation Setting'][3],
                                  blend:   +$mpi.parameters['Back Animation Setting'][4] };
    $mpi.visibilityControlSwitchId       = +$mpi.parameters['Visibility Control Switch ID'] || 0;
    $mpi.infinitySwitchId                = +$mpi.parameters['Infinity Switch ID'] || 0;
    $mpi.commonEventId                   = +$mpi.parameters['Common Event ID'] || 0;

    var _ = plugin;
    var $_ = `$${_}`;

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    Object.defineProperty(Scene_Battle.prototype, _, {
        get: function() { return this[$_] = this[$_] || {} },
        set: function(value) { this[$_] = value },
        configurable: true
    });

    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);

            this[_].variableValue = $gameVariables.value($mpi.variableId);
            this[_].backAnimationCount = 0;

            this[_].createBackAnimationSprite = function() {
                var setting = $mpi.backAnimationSetting;
                var bitmap = ImageManager.loadSystem(setting.name);
                if (!bitmap.isReady()) {
                    bitmap.addLoadListener(this[_].createBackAnimationSprite);
                    return;
                }
                var sprite = this[_].backAnimationSprite = new Sprite(bitmap);
                sprite.setFrame(0, 0, bitmap.width / setting.columns, bitmap.height / setting.rows);
                sprite.x = $mpi.variablePosition.x;
                sprite.y = $mpi.variablePosition.y;
                sprite.blendMode = setting.blend;
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.visible = false;
                this.addChild(sprite);
                this[_].createVariableDigits();
                this[_].createInfinitySprite();
            }.bind(this);

            this[_].createVariableDigits = function() {
                var bitmap = ImageManager.loadSystem($mpi.variableImage);
                if (!bitmap.isReady()) {
                    bitmap.addLoadListener(this[_].createVariableDigits);
                    return;
                }
                var string = String(this[_].variableValue);
                var width = bitmap.width / 10;
                var height = bitmap.height;
                this[_].variableDigits = [];
                for (var i = 0; i < string.length; i++) {
                    var sprite = new Sprite(bitmap);
                    sprite.setFrame(+string[i] * width, 0, width, height);
                    sprite.x = $mpi.variablePosition.x + width * i - (width * string.length - width) / 2;
                    sprite.y = $mpi.variablePosition.y;
                    sprite.anchor.x = 0.5;
                    sprite.anchor.y = 0.5;
                    sprite.visible = false;
                    this.addChild(sprite);
                    this[_].variableDigits.push(sprite);
                }
            }.bind(this);

            this[_].createInfinitySprite = function() {
                var bitmap = ImageManager.loadSystem($mpi.infinityImage);
                var sprite = this[_].infinitySprite = new Sprite(bitmap);
                sprite.x = $mpi.variablePosition.x;
                sprite.y = $mpi.variablePosition.y;
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.visible = false;
                this.addChild(sprite);
            }.bind(this);
        };
    }(Scene_Battle.prototype,'initialize'));

    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            this[_].createBackAnimationSprite();
        };
    }(Scene_Battle.prototype,'create'));

    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            var setting = $mpi.backAnimationSetting;
            if (this[_].backAnimationSprite && (this[_].backAnimationCount % setting.frame === 0)) {
                var sprite = this[_].backAnimationSprite;
                var pattern = this[_].backAnimationCount / setting.frame;
                var row = Math.floor(pattern / setting.columns) % setting.rows;
                var column = pattern % setting.columns;
                sprite.setFrame(column * sprite.width, row * sprite.height, sprite.width, sprite.height);
                sprite.visible = $gameSwitches.value($mpi.visibilityControlSwitchId);
            }
            if (this[_].variableDigits) {
                if (this[_].variableValue !== $gameVariables.value($mpi.variableId)) {
                    this[_].variableValue = $gameVariables.value($mpi.variableId);
                    this[_].variableDigits.forEach(function(sprite) {
                        this.removeChild(sprite);
                    }, this);
                    this[_].createVariableDigits();
                }
                this[_].variableDigits.forEach(function(sprite) {
                    sprite.visible = $gameSwitches.value($mpi.visibilityControlSwitchId) && !$gameSwitches.value($mpi.infinitySwitchId);
                }, this);
            }
            if (this[_].infinitySprite) {
                this[_].infinitySprite.visible = $gameSwitches.value($mpi.visibilityControlSwitchId) && $gameSwitches.value($mpi.infinitySwitchId);
            }
            this[_].backAnimationCount++;
        };
    }(Scene_Battle.prototype,'update'));

    //==============================================================================
    // Game_Troop
    //==============================================================================

    var TRUN_END_EVENT_PAGE = {
        conditions: { actorValid: false, enemyValid: false, switchId: $mpi.visibilityControlSwitchId, switchValid: true, turnA: 0, turnB: 1, turnEnding: true, turnValid: true },
        list: [
            { code: 111, indent: 0, parameters: [1, $mpi.variableId, 0, 0, 0] },
            { code: 117, indent: 1, parameters: [$mpi.commonEventId] },
            { code: 0,   indent: 1, parameters: [] },
            { code: 412, indent: 0, parameters: [] },
            { code: 0,   indent: 0, parameters: [] }
        ],
        span: 1
    };

    Object.defineProperty(Game_Troop.prototype, _, {
        get: function() { return this[$_] = this[$_] || {} },
        set: function(value) { this[$_] = value },
        configurable: true
    });

    (function(o,p){
        var f=o[p];o[p]=function(){
            return this[_].troop || f.apply(this,arguments);
        };
    }(Game_Troop.prototype,'troop'));

    (function(o,p){
        var f=o[p];o[p]=function(troopId){
            this[_].troop = JsonEx.makeDeepCopy($dataTroops[troopId]);
            this[_].troop.pages.push(TRUN_END_EVENT_PAGE);
            f.apply(this,arguments);
        };
    }(Game_Troop.prototype,'setup'));

    //==============================================================================
    // Game_Variables
    //==============================================================================

    (function(o,p){
        var f=o[p];o[p]=function(variableId, value){
            if (variableId === $mpi.variableId) {
                value = value.clamp(0, 999);
            }
            f.apply(this,arguments);
        };
    }(Game_Variables.prototype,'setValue'));

    //==============================================================================
    // Game_BattlerBase
    //==============================================================================

    (function(o,p){
        var f=o[p];o[p]=function(skill){
            if (skill.stypeId === $mpi.skillTypeId) {
                return $gameSwitches.value($mpi.infinitySwitchId) || $gameVariables.value($mpi.variableId) >= this.skillMpCost(skill);
            }
            if (skill.stypeId === $mpi.skillTypeId2) {
                return ($gameVariables.value($mpi.variableId2) >= this.skillMpCost(skill)) && (this._tp >= this.skillTpCost(skill));
            }
            return f.apply(this,arguments);
        };
    }(Game_BattlerBase.prototype,'canPaySkillCost'));

    (function(o,p){
        var f=o[p];o[p]=function(skill){
            var value = 0;
            if (skill.stypeId === $mpi.skillTypeId) {
                if (!$gameSwitches.value($mpi.infinitySwitchId)) {
                    value = $gameVariables.value($mpi.variableId);
                    value -= this.skillMpCost(skill);
                    $gameVariables.setValue($mpi.variableId, value);
                }
                return;
            }
            if (skill.stypeId === $mpi.skillTypeId2) {
                value = $gameVariables.value($mpi.variableId2);
                value -= this.skillMpCost(skill);
                $gameVariables.setValue($mpi.variableId2, value);
                this._tp -= this.skillTpCost(skill);
                return;
            }
            f.apply(this,arguments);
        };
    }(Game_BattlerBase.prototype,'paySkillCost'));

    //==============================================================================
    // Window_SkillList
    //==============================================================================

    (function(o,p){
        var f=o[p];o[p]=function(skill, x, y, width){
            if (skill.stypeId === $mpi.skillTypeId) {
                this.changeTextColor(this.deathColor());
                this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
                return;
            }
            f.apply(this,arguments);
        };
    }(Window_SkillList.prototype,'drawSkillCost'));
}());
