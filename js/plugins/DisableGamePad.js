//=============================================================================
// DisableGamePad.js
//=============================================================================

/*:
 * @plugindesc ゲームパッドの入力を無効化します。
 * @author 奏ねこま（おとぶきねこま）
 *
 * @/param Switch ID (for Game Pad)
 * @/desc ゲームパッドの入力の有効無効を切り替えるスイッチのIDを指定してください。
 * @/default 0
 *
 * @help
 * オプション画面でゲームパッドを有効にすることもできます。
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
 *   Version 1.01  2016/08/06  有効無効の切り替えをオプション化
 *   Version 1.00  2016/07/31  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  Web Site: http://i.gmobb.jp/nekoma/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 */

(function(){
    'use strict';
    
    const _PRODUCT = 'DisableGamePad';
    const _PARAMETERS = PluginManager.parameters(_PRODUCT);
    
    const _SID_GAMEPAD = +_PARAMETERS['Switch ID (for Game Pad)'] || 0;
    
    ConfigManager.gamePad = false;

    var _Input_updateGamepadState = Input._updateGamepadState;
    Input._updateGamepadState = function(gamepad) {
        if (!ConfigManager.gamePad) {
            return;
        }
//        if (!_SID_GAMEPAD || !$gameSwitches.value(_SID_GAMEPAD)) {
//            return;
//        }
        _Input_updateGamepadState.call(this, gamepad);
    }

    var _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        var config = _ConfigManager_makeData.call(this);
        config.gamePad = this.gamePad;
        return config;
    };

    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        this.gamePad = this.readFlag(config, 'gamePad');
    };
    
    var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        _Window_Options_makeCommandList.call(this);
        this.addCommand('手柄', 'gamePad');
    };
}());
