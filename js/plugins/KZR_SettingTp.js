//=============================================================================
// KZR_SettinTp.js
// Version : 1.01
// -----------------------------------------------------------------------------
// [Homepage]: かざり - ホームページ名なんて飾りです。偉い人にはそれがわからんのですよ。 -
//             http://nyannyannyan.bake-neko.net/
// -----------------------------------------------------------------------------
// [Version]
// 1.01 2016/12/29 正しく動作しないのを修正
//                 ヘルプの文章が間違っていたのを修正
// 1.00 2016/12/25 公開
//=============================================================================

/*:
 * @plugindesc アクター/職業/エネミー毎に最大TPと最小TPを設定します。
 * @author ぶちょー
 *
 * @param maxTp
 * @desc 設定しなかった場合のTPの最大値です。
 * @default 100
 *
 * @param minTp
 * @desc 設定しなかった場合のTPの最小値です。
 * @default 0
 *
 * @help
 * 【設定方法】
 * アクター/職業/エネミーのメモ欄に以下のように記述します。
 * <SettingTp:min,max>
 * （例）<SettignTp:10,200>
 *
 * 【アクターの仕様】
 * アクターはアクターと職業の両方が影響します。
 * 最大値/最小値ともに、より高い方が反映されます。
 *
 * 【最大/最小TPの変更】
 * プラグインコマンドで以下のように記述します。
 * SettingTp max actor 1 150   // アクターID1の最大TPを 150 にする
 * SettingTp min actor 2 10    // アクターID2の最小TPを 10 にする
 * SettingTp max class 3 120   // 職業ID3の最大TPを 120 にする
 * SettingTp min class 4 0     // 職業ID4の最小TPを 0 にする
 * SettingTp max enemy 1 150   // 敵キャラID1の最大TPを 150 にする
 *
 */

(function() {
  var parameters = PluginManager.parameters('KZR_SettingTp');
  var ST_maxTp = Number(parameters['maxTp'] || 100);
  var ST_minTp = Number(parameters['minTp'] || 0);

//-----------------------------------------------------------------------------
// Game_System
//
var _kzr_setting_tp_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _kzr_setting_tp_Game_System_initialize.call(this);
    this._actorTp = [];
    this._classTp = [];
    this._enemyTp = [];
    this.setTpData($dataActors,  this._actorTp);
    this.setTpData($dataClasses, this._classTp);
    this.setTpData($dataEnemies, this._enemyTp);
};

Game_System.prototype.setTpData = function (datas, list) {
    var note = /(?:settingTp:(\d+),(\d+))/i;
    datas.forEach(function(data) {
        if (data) {
            var notedata = data.note.split(/[\r\n]+/);
            var min = ST_minTp;
            var max = ST_maxTp;
            for (var i = 0; i < notedata.length; i++) {
                if (notedata[i].match(note)) {
                    min = parseInt(RegExp.$1);
                    max = parseInt(RegExp.$2);
                }
            }
            list[data.id] = [min,max];
        }
    }, this);
};

Game_System.prototype.changeTpData = function (args) {
    if (args[1] === 'actor') {
        if (args[0] === 'max') {
            this._actorTp[args[2]][1] = parseInt(args[3]);
        } else if (args[0] === 'min') {
            this._actorTp[args[2]][0] = parseInt(args[3]);
        }
        $gameActors.actor(args[2]).refresh();
    } else if (args[1] === 'class') {
        if (args[0] === 'max') {
            this._classTp[args[2]][1] = parseInt(args[3]);
        } else if (args[0] === 'min') {
            this._classTp[args[2]][0] = parseInt(args[3]);
        }
        $gameParty.allMembers().forEach(function(actor) {
            if (actor._classId === parseInt(args[2])) actor.refresh();
        });
    } else if (args[1] === 'enemy') {
        if (args[0] === 'max') {
            this._enemyTp[args[2]][1] = parseInt(args[3]);
        } else if (args[0] === 'min') {
            this._enemyTp[args[2]][0] = parseInt(args[3]);
        }
        $gameTroop.members().forEach(function(enemy) {
            if (enemy._enemyId === parseInt(args[2])) enemy.refresh();
        });
    }
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
var _kzr_setting_tp_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _kzr_setting_tp_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'SettingTp') $gameSystem.changeTpData(args);
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
var _kzr_setting_tp_Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    _kzr_setting_tp_Game_BattlerBase_refresh.call(this);
    this._tp = this._tp.clamp(this.minTp(), this.maxTp());
};

//-----------------------------------------------------------------------------
// Game_Actor
//
Game_Actor.prototype.maxTp = function() {
    var a = $gameSystem._actorTp[this._actorId][1];
    var c = $gameSystem._classTp[this._classId][1];
    return Math.max(a, c);
};
Game_Actor.prototype.minTp = function() {
  var a = $gameSystem._actorTp[this._actorId][0];
  var c = $gameSystem._classTp[this._classId][0];
  return Math.max(a, c);
};

//-----------------------------------------------------------------------------
// Game_Enemy
//
Game_Enemy.prototype.maxTp = function() {
    return $gameSystem._enemyTp[this._enemyId][1];
};
Game_Enemy.prototype.minTp = function() {
    return $gameSystem._enemyTp[this._enemyId][0];
};

})();
