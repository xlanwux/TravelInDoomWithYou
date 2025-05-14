//=============================================================================
// SaveItems.js
//=============================================================================

/*:
 * @plugindesc 所持アイテム・装備品の保存と読み込み
 * @author 奏ねこま
 *
 * @help
 * プラグインコマンド
 *
 * [所持アイテム・装備品を保存]
 * 
 *   SaveItems
 *
 * [保存した所持アイテム・装備品を読み込み]
 * 
 *   LoadItems
 */

 (function(){
    'use strict';

    (function(o,p){
        var f=o[p];o[p]=function(command,args){
            f.apply(this,arguments);
            if (command === 'SaveItems') {
                $gameSystem.__SaveItems__ = {};
                $gameSystem.__SaveItems__.items = JsonEx.makeDeepCopy($gameParty._items);
                $gameSystem.__SaveItems__.weapons = JsonEx.makeDeepCopy($gameParty._weapons);
                $gameSystem.__SaveItems__.armors = JsonEx.makeDeepCopy($gameParty._armors);
            }
            if (command === 'LoadItems') {
                if ($gameSystem.__SaveItems__) {
                    $gameParty._items = $gameSystem.__SaveItems__.items;
                    $gameParty._weapons = $gameSystem.__SaveItems__.weapons;
                    $gameParty._armors = $gameSystem.__SaveItems__.armors;
                }
            }
        };
    }(Game_Interpreter.prototype,'pluginCommand'));
}());
