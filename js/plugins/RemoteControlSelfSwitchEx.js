//=============================================================================
// RemoteControlSelfSwitchEx.js
//=============================================================================

/*:
 * @plugindesc 任意のマップ、イベントのセルフスイッチを制御します。
 * @author こま
 *
 * @help
 * プラグインコマンド
 *   Remote_Control_Self_Switch_Ex <map id> <event id> <selfswitch id> <ON/OFF>
 *
 * OFFを設定する場合に限り、map id、event id、selfswitch idに「*」を指定することで
 * 「すべて」を対象とすることができます。
 *
 *  // 全マップ、全イベント、全セルフスイッチをOFFにする。
 *  Remote_Control_Self_Switch_Ex * * * OFF
 *
 *  // 全マップ、全イベントのセルフスイッチAをOFFにする。
 *  Remote_Control_Self_Switch_Ex * * A OFF
 */

(function(){
    'use strict';

    var _alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toLowerCase() === 'remote_control_self_switch_ex') {
            var mapId = +args[0] || 0;
            var eventId = +args[1] || 0;
            var switchId = args[2].toUpperCase();
            var value = args[3].toUpperCase();
            if (mapId > 0 && eventId > 0 && switchId !== '*') {
                $gameSelfSwitches.setValue([mapId, eventId, switchId], value === 'ON');
                return;
            }
            for (var key in $gameSelfSwitches._data) {
                var id = key.split(',');
                var result = (mapId == 0 || id[0] == mapId) && (eventId == 0 || id[1] == eventId) && (switchId === '*' || id[2] === switchId);
                if (result) {
                    if (value === 'ON') {
                        $gameSelfSwitches._data[key] = true;
                    } else {
                        delete $gameSelfSwitches._data[key];
                    }
                }
            }
            $gameSelfSwitches.onChange();
        }
    };
}());
