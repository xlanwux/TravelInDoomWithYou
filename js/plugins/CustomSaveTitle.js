//=============================================================================
// CustomSaveTitle.js
//=============================================================================

/*:
 * @plugindesc 指定した変数の内容をセーブデータのタイトルとして使用します。
 * @author こま
 *
 * @param Save Title Variable ID
 * @desc セーブデータのタイトルに使用する変数のIDを指定してください。変数の内容が0または空の場合、ゲームタイトルが使用されます。
 * @default 1
 *
 * @help
 */

(function(){
    'use strict';

    const _PLUGIN = 'CustomSaveTitle';
    const _PARAMETERS = PluginManager.parameters(_PLUGIN);
    
    const _SAVE_TITLE_VARIABLE_ID = +_PARAMETERS['Save Title Variable ID'];
    
    //=========================================================================
    // DataManager
    //=========================================================================

    var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        var info = _DataManager_makeSavefileInfo.call(this);
        var value = $gameVariables.value(_SAVE_TITLE_VARIABLE_ID);
        if (value) {
            info.title = value;
        }
        return info;
    };
}());
