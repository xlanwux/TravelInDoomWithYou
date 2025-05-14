//=============================================================================
// MoveDiagonally.js
//=============================================================================

/*:
 * @plugindesc 斜めに移動できるようにします。
 * @author こま
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
 *   Version 1.00  2016/05/19  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  Web Site: http://i.gmobb.jp/nekoma/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 */

(function(){
    'use strict';
    
    Game_Player.prototype.getInputDirection = function() {
        return Input.dir8;
    };

    Game_Player.prototype.executeMove = function(direction) {
        if (direction % 2) {
            var horz = (direction % 3) ? 4 : 6;
            var vert = (direction < 5) ? 2 : 8;
            this.moveDiagonally(horz, vert);
        } else {
            this.moveStraight(direction);
        }
    };

    Game_Player.prototype.moveDiagonally = function(horz, vert) {
        if (this.canPassDiagonally(this.x, this.y, horz, vert)) {
            this._followers.updateMove();
            Game_Character.prototype.moveDiagonally.call(this, horz, vert);
        } else {
            var dir = (this._direction === horz) ? [vert, horz] : [horz, vert];
            this.moveStraight(dir[0]);
            if (!this.isMovementSucceeded()) {
                this.moveStraight(dir[1]);
            }
        }
    };

    Game_Player.prototype.canPassDiagonally = function(x, y, horz, vert) {
        var x2 = $gameMap.roundXWithDirection(x, horz);
        var y2 = $gameMap.roundYWithDirection(y, vert);
        return (this.canPass(x, y, vert) && this.canPass(x, y2, horz) && this.canPass(x, y, horz) && this.canPass(x2, y, vert));
    };
}());