//=============================================================================
// SetEnemyPosition.js
//=============================================================================

/*:ja
 * @plugindesc 任意の位置に敵を表示します。
 * @author 奏ねこま（おとぶきねこま）
 *
 * @help
 * 敵を表示させたい位置をメモ欄で指定できます。
 *
 * [使用例] 敵グラフィックをX座標=100、Y座標=200に表示させたい場合
 *
 *  <position: 100, 200>
 *
 * 値には、制御文字を使って変数を指定することもできます。
 *
 * [使用例] X座標=変数#0001の値、Y座標=変数#0002の値にしたい場合
 *
 *  <position: \v[1], \v[2]>
 *
 * また、敵グラフィックの重なり順序を指定することもできます。
 *
 *  <zindex: 1>
 *
 * 指定した値が大きいほうが前面に表示されます。指定しなかった場合は「0」として扱
 * われます。また、同じ値を指定した場合の順序については保証されません。
 *
 * [補足]
 * Y座標は、ツクールMVの仕様により「敵画像の底辺座標」になります。中心や左上の座
 * ではないのでご注意ください。
 *
 * [ 利用規約 ] .................................................................
 *  本プラグインの利用者は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  商用、非商用、ゲームの内容（年齢制限など）を問わず利用可能です。
 *  ゲームへの利用の際、報告や出典元の記載等は必須ではありません。
 *  二次配布や転載、ソースコードURLやダウンロードURLへの直接リンクは禁止します。
 *  （プラグインを利用したゲームに同梱する形での結果的な配布はOKです）
 *  不具合対応以外のサポートやリクエストは受け付けておりません。
 *  本プラグインにより生じたいかなる問題においても、一切の責任を負いかねます。
 * [ 改訂履歴 ] .................................................................
 *   Version 1.00  2016/10/05  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 */


(function () {
    'use strict';

    function processVariableCharacter(text) {
        var _text = '';
        while (text !== _text) {
            _text = text;
            text = text.replace(/\\v\[(\d+)\]/gi, function() {
                return $gameVariables.value(parseInt(arguments[1]));
            }.bind(this));
        }
        return text;
    }

    var _Game_Enemy_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function(enemyId, x, y) {
        if ($dataEnemies[enemyId]) {
            if ($dataEnemies[enemyId].meta.position) {
                var position = processVariableCharacter($dataEnemies[enemyId].meta.position);
                var pos = position.trim().split(/ *, */);
                x = +pos[0];
                y = +pos[1];
                console.log(pos);
            }
        }
        _Game_Enemy_setup.call(this, enemyId, x, y);
    };

    var _Spriteset_Battle_compareEnemySprite = Spriteset_Battle.prototype.compareEnemySprite;
    Spriteset_Battle.prototype.compareEnemySprite = function(a, b) {
        var result = _Spriteset_Battle_compareEnemySprite.call(this, a, b);
        var zindex_a = $dataEnemies[a._enemy._enemyId].meta.zindex || '';
        var zindex_b = $dataEnemies[b._enemy._enemyId].meta.zindex || '';
        zindex_a = +processVariableCharacter(zindex_a.trim()) || 0;
        zindex_b = +processVariableCharacter(zindex_b.trim()) || 0;
        if (zindex_a + zindex_b) {
            return zindex_a - zindex_b;
        }
        return result;
    };
}());
