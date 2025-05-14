//=============================================================================
// KuishibariState.js
//=============================================================================

/*:
 * @plugindesc 「HPが2以上ある状態でダメージを受けた場合、一定確率でHP1残る」ステートを作成します。
 * @author 奏ねこま（おとぶきねこま）
 *
 * @help
 * ステートのメモ欄に、以下のように記述してください。
 * 確率値は正の整数で指定してください。
 *
 *  <kuishibari:[確率]>
 *
 * 例：HP2以上で被ダメージ時、必ずHP1残る
 *  <kuishibari:100>
 *
 * 例：HP2以上で被ダメージ時、50%の確率でHP1残る
 *  <kuishibari:50>
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
 *   Version 1.00  2016/07/02  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  Web Site: http://i.gmobb.jp/nekoma/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 */

(function(){
    'use strict';
    
    var _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
        if (target._hp > 1 && value >= target._hp) {
            var kuishibari = 0;
            target._states.forEach(function(state) {
                if ($dataStates[state].meta['kuishibari']) {
                    kuishibari = Math.max(kuishibari, $dataStates[state].meta['kuishibari']);
                }
            });
            if (kuishibari) {
                if ((Math.floor(Math.random() * 100) + 1) <= kuishibari) {
                    value = target._hp - 1;
                }
            }
        }
        _Game_Action_executeHpDamage.call(this, target, value);
    };
}());
