//=============================================================================
// DisplayTargetStates.js
//=============================================================================

/*:
 * @plugindesc 攻撃対象選択時、対象の全ステートのアイコンと解除までのターン数を表示します。
 * @author 奏ねこま（おとぶきねこま）
 *
 * @param State Icon X-Pos
 * @desc ステートアイコンを表示するX座標（バトラー画像の中心からの相対座標）を指定してください。
 * @default 0
 *
 * @param State Icon Y-Pos
 * @desc ステートアイコンを表示するY座標（バトラー画像の底辺からの相対座標）を指定してください。
 * @default 0
 *
 * @param Display Actor States
 * @desc アクターのステートアイコンを表示する場合はtrueを指定してください。（true/false） ※フロントビューバトル時は無効
 * @default true
 
 * @param Display Enemy States
 * @desc 敵のステートアイコンを表示する場合はtrueを指定してください。（true/false）
 * @default true
 
 * @help
 * アクター、または敵のメモ欄に、以下のように記述することで、ステートアイコン表示座
 * 標を個別に設定することができます。
 *
 * <dts_pos_x:X座標値>
 * <dts_pos_y:Y座標値>
 *
 * 例：プラグインパラメータで設定されたX座標から、さらに10px左寄りに表示する場合
 *  <dts_pos_x:-10>
 * 
 * 例：プラグインパラメータで設定されたY座標から、さらに15px下寄りに表示する場合
 *  <dts_pos_y:15>
 *
 * *このプラグインには、プラグインコマンドはありません。
 *
 * [ 利用規約 ] ...................................................................
 *  本プラグインの利用者は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  商用、非商用、ゲームの内容（年齢制限など）を問わず利用可能です。
 *  ゲームへの利用の際、報告や出典元の記載等は必須ではありません。
 *  二次配布や転載、ソースコードURLやダウンロードURLへの直接リンクは禁止します。
 *  （プラグインを利用したゲームに同梱する形での結果的な配布はOKです）
 *  不具合対応以外のサポートやリクエストは受け付けておりません。
 *  本プラグインにより生じたいかなる問題においても、一切の責任を負いかねます。
 * [ 改訂履歴 ] ...................................................................
 *   Version 1.01  2016/06/24  書き換え対象の関数を間違えていたのを修正
 *   Version 1.00  2016/06/24  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  Web Site: http://i.gmobb.jp/nekoma/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 */

(function(){
    'use strict';
    
    const _PNAME = 'DisplayTargetStates';
    const _PARAMETERS = PluginManager.parameters(_PNAME);
    
    const _STATE_ICON_X_POS = +_PARAMETERS['State Icon X-Pos'] || 0;
    const _STATE_ICON_Y_POS = +_PARAMETERS['State Icon Y-Pos'] || 0;
    const _DISPLAY_ACTOR_STATES = _PARAMETERS['Display Actor States'] === 'true';
    const _DISPLAY_ENEMY_STATES = _PARAMETERS['Display Enemy States'] === 'true';
    
    function _(f){ return f[_PNAME] = f[_PNAME] || {} }
    
    //=========================================================================
    // Window_TargetStates
    //=========================================================================

    function Window_TargetStates() {
        this.initialize.apply(this, arguments);
    }
    
    Window_TargetStates.prototype = Object.create(Window_Base.prototype);
    Window_TargetStates.prototype.constructor = Window_TargetStates;
    
    Window_TargetStates.prototype.initialize = function() {
        Window_Base.prototype.initialize.call(this, 0, 0, 640, 64);
        this.opacity = 0;
    };
    
    Window_TargetStates.prototype.standardFontSize = function() {
        return 16;
    };

    Window_TargetStates.prototype.standardPadding = function() {
        return 0;
    };
    
    Window_TargetStates.prototype.refresh = function(target, x, y) {
        this.contents.clear();
        if (!target) { return };
        target._states.forEach(function(state, index) {
            this.drawIcon($dataStates[state].iconIndex, index * 32, 0);
        }, this);
        target._states.forEach(function(state, index) {
            if ($dataStates[state].autoRemovalTiming > 0) {
                this.drawText(target._stateTurns[state] , 1 + index * 32, 7, 32, 'right');
            }
        }, this);
        this.move(x - 16 * target._states.length + _STATE_ICON_X_POS, y + _STATE_ICON_Y_POS, 640, 64);
    };

    //=========================================================================
    // Scene_Battle
    //=========================================================================

    var _Scene_Battle_createWindowLayer = Scene_Battle.prototype.createWindowLayer;
    Scene_Battle.prototype.createWindowLayer = function() {
        _Scene_Battle_createWindowLayer.call(this);
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        var x = (Graphics.width - width) / 2;
        var y = (Graphics.height - height) / 2;
        _(this)._windowLayer = new WindowLayer();
        _(this)._windowLayer.move(x, y, width, height);
        this.addChild(_(this)._windowLayer);
    };

    var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        var window = new Window_TargetStates();
        _(this)._targetStates = window;
        _(this)._windowLayer.addChild(window);
    };
    
    var _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        if (_(this)._target) {
            var target = null;
            var x = 0;
            var y = 0;
            if (_(this)._target.constructor === Game_Actor) {
                target = this._actorWindow.actor();
                x = this._spriteset._actorSprites[this._actorWindow.index()]._homeX + (+$dataActors[target.actorId()].meta['dts_pos_x'] || 0);
                y = this._spriteset._actorSprites[this._actorWindow.index()]._homeY + (+$dataActors[target.actorId()].meta['dts_pos_y'] || 0);
            } else {
                target = this._enemyWindow.enemy();
                x = target._screenX + (+$dataEnemies[target.enemyId()].meta['dts_pos_x'] || 0);
                y = target._screenY + (+$dataEnemies[target.enemyId()].meta['dts_pos_y'] || 0);
            }
            if (_(this)._target !== target) {
                _(this)._target = target;
                _(this)._targetStates.refresh(target, x, y);
            }
        }
    };

    var _Scene_Battle_selectActorSelection = Scene_Battle.prototype.selectActorSelection;
    Scene_Battle.prototype.selectActorSelection = function() {
        _Scene_Battle_selectActorSelection.call(this);
        _(this)._target = ($dataSystem['optSideView'] && _DISPLAY_ACTOR_STATES) ? new Game_Actor(1) : null;
    };

    var _Scene_Battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        _Scene_Battle_onActorOk.call(this);
        _(this)._target = null;
        _(this)._targetStates.contents.clear();
    };

    var _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
        _Scene_Battle_onActorCancel.call(this);
        _(this)._target = null;
        _(this)._targetStates.contents.clear();
    };

    var _Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function() {
        _Scene_Battle_selectEnemySelection.call(this);
        _(this)._target = _DISPLAY_ENEMY_STATES ? new Game_Enemy(1, 0, 0) : null;
    };

    var _Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
    Scene_Battle.prototype.onEnemyOk = function() {
        _Scene_Battle_onEnemyOk.call(this);
        _(this)._target = null;
        _(this)._targetStates.contents.clear();
    };

    var _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
        _Scene_Battle_onEnemyCancel.call(this);
        _(this)._target = null;
        _(this)._targetStates.contents.clear();
    };
}());
