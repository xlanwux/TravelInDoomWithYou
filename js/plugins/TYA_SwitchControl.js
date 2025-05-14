/*:
 * @plugindesc 全マップの全イベントのセルフスイッチを一括で操作します。
 詳しい使い方はヘルプを参照してください。
 * @author 茶の助
 *
 * @help プラグインコマンドにて下記の文字列を入力してください。
 「TYA_SelfSwitchAll true/false（有効か無効か） A/B/C/D（セルフスイッチの種類）」
 
 例１：TYA_SelfSwitchAll true A → 全てのセルフスイッチＡを有効にする。 
 例２：TYA_SelfSwitchAll false B → 全てのセルフスイッチＢを無効にする。
 */

(function () {
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        
        if (command === 'TYA_SelfSwitchAll') {
          for (var mi = 1; mi <= 1000; mi++) {
            for (var ei = 1; ei <= 2500; ei++) {
              $gameSelfSwitches.setValue([mi, ei, args[1]], eval(args[0]));
            }
          }
        }
    };
})();