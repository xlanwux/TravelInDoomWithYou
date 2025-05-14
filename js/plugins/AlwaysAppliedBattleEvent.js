//=============================================================================
// AlwaysAppliedBattleEvent.js
//=============================================================================

/*:
 * @plugindesc 指定した敵グループのバトルイベントを、全てのバトルに適用します。
 * @author こま
 *
 * @param Troop ID
 * @desc 全てのバトルに適用するバトルイベントを設定した敵グループIDを指定してください。
 * @default 1
 *
 * @help
 * 全てのバトルに適用する敵グループIDを1としたとき、敵グループID2のグループとバトル
 * を行うと、敵グループID2に設定されたバトルイベント＋敵グループID1に設定されたバト
 * ルイベントを、そのバトル中に実行します。
 *
 * 設定したIDと同じ敵グループとのバトルの場合、重複してイベントが適用されることはあ
 * りません。
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
 *   Version 1.00  2016/05/14  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  Web Site: http://i.gmobb.jp/nekoma/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 */

(function(){
    const _PNAME = 'AlwaysAppliedBattleEvent';
    const _PARAMETERS = PluginManager.parameters(_PNAME);
    
    const _TROOP_ID = +_PARAMETERS['Troop ID'];
    
    function _(f){ return f[_PNAME] = f[_PNAME] || {} }
    
    //==========================================================================
    // Game Troop
    //==========================================================================

    var _Game_Troop_initialize = Game_Troop.prototype.initialize;
    Game_Troop.prototype.initialize = function() {
        _Game_Troop_initialize.call(this);
        _(this)._alwaysEvent = [];
        $dataTroops.some(function(troop) {
            if (troop && troop.id === _TROOP_ID) {
                _(this)._alwaysEvent = troop.pages;
                return true;
            }
        }, this);
    };

    var _Game_Troop_troop = Game_Troop.prototype.troop;
    Game_Troop.prototype.troop = function() {
        var troop = JsonEx.makeDeepCopy(_Game_Troop_troop.call(this));
        if (this._troopId !== _TROOP_ID) {
            Array.prototype.push.apply(troop.pages, _(this)._alwaysEvent);
        }
        return troop;
    };
}());