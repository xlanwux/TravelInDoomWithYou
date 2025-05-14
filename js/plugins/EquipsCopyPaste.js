//=============================================================================
// EquipsCopyPaste.js
//=============================================================================

/*:
 * @plugindesc プラグインコマンドにより、アクター間の装備をコピー＆ペーストします。
 * @author こま
 *
 * @help
 * プラグインコマンド：
 *   EquipsCopy <actor id>
 *   EquipsPaste <actor id>
 *   EquipsCopyPaste <copy actor id> <paste actor id>
 *
 * 使用例：
 *   // アクターID1の装備をコピー
 *   EquipsCopy 1
 *
 *   // コピーした装備をアクターID2にペースト
 *   EquipsPaste 2
 *
 *   // アクターID3の装備をコピー＆アクターID4にペースト
 *   EquipsCopyPaste 3 4
 *
 * [ 注意事項 ]
 *  コピー先とコピー元の装備スロットが一致していない場合の動作は保証されません。
 *  コピー先のアクターがコピー前に装備していたものは消えてしまいます。
 *  コピー＆ペーストは対象装備品の所持数に影響されず、また、コピー＆ペーストによ
 *  り、対象装備品の所持数が増減することもありません。
 *  EquipsCopyコマンドによるコピー状態は、セーブデータには記録されません。
 */

(function(){
    'use strict';

    var _clipBoard = [];
    
    function _equipsCopy(actorId) {
        _clipBoard = [];
        $gameActors.actor(actorId)._equips.forEach(function(equip) {
            _clipBoard.push({ dataClass: equip._dataClass, itemId: equip._itemId });
        });
    }
    
    function _equipsPaste(actorId) {
        $gameActors.actor(actorId)._equips.forEach(function(equip, index) {
            var clipBoard = _clipBoard[index];
            equip._dataClass = (clipBoard) ? clipBoard.dataClass : '';
            equip._itemId = (clipBoard) ? clipBoard.itemId : 0;
        });
    }
    
    function _equipsCopyPaste(copyId, pasteId) {
        _equipsCopy(copyId);
        _equipsPaste(pasteId);
    }
    
    //=========================================================================
    // Game_Interpreter
    //=========================================================================

    var _alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _alias_Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command.toUpperCase()) {
            case 'EQUIPSCOPY':
                _equipsCopy(+args[0]);
                break;
            case 'EQUIPSPASTE':
                _equipsPaste(+args[0]);
                break;
            case 'EQUIPSCOPYPASTE':
                _equipsCopyPaste(+args[0], +args[1]);
                break;
        }
    };
    
}());
