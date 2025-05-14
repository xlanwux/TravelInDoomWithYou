//=============================================================================
// HideEnemyStateIcon.js
//=============================================================================

/*:
 * @plugindesc 敵の上に表示されるステートアイコンを非表示にする機能を提供します。
 * @author 奏ねこま（おとぶきねこま）
 *
 * @param Hide Icon Switch ID
 * @desc 表示／非表示を制御するスイッチのIDを指定してください。
 * @default 0
 *
 * @help
 * プラグインパラメータで指定したスイッチがONの間、敵ステートのアイコンを非表示にし
 * ます。
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
 *   Version 1.00  2016/06/24  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  Web Site: http://i.gmobb.jp/nekoma/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 */

(function(){
    'use strict';
    
    const _PNAME = 'HideEnemyStateIcon';
    const _PARAMETERS = PluginManager.parameters(_PNAME);
    
    const _HIDE_ICON_SWITCH_ID = +_PARAMETERS['Hide Icon Switch ID'] || 0;
    
    //=========================================================================
    // Sprite_Enemy
    //=========================================================================

    var _Sprite_Enemy_createStateIconSprite = Sprite_Enemy.prototype.createStateIconSprite;
    Sprite_Enemy.prototype.createStateIconSprite = function() {
        _Sprite_Enemy_createStateIconSprite.call(this);
        if (_HIDE_ICON_SWITCH_ID) {
            this._stateIconSprite.visible = !$gameSwitches.value(_HIDE_ICON_SWITCH_ID);
        }
    };
}());
