//===========================================================================
// MPI_ModifiedSpriteCharacter.js
//===========================================================================

/*:
 * @plugindesc キャラクター画像変更時に表示が崩れる問題を改善するプラグイン
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @help
 * [ 概要 ] ...
 *  キャラクター画像変更時、画像全体が一瞬表示されることがある問題を改善できたら
 *  いいなと思っているプラグインです。当方の環境で問題を再現できていないので、改
 *  善できているかはわかりません。
 *
 * [ プラグインコマンド ] ...
 *  プラグインコマンドはありません。
 *
 * [ 利用規約 ] ................................................................
 *  ・本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  ・商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  ・利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  ・プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  ・不具合対応以外のサポートやリクエストは、基本的に受け付けておりません。
 *  ・本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [ 改訂履歴 ] ................................................................
 *   Version 1.00  2017/01/06  First edition.
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2016 Nekoma Otobuki
 */

var Imported = Imported || {};
Imported.MPI_ModifiedSpriteCharacter = true;

var Makonet = Makonet || {};
Makonet.MSC = {};

(function(){
    'use strict';

    var MSC            = Makonet.MSC;
    var MSC.product    = 'MPI_ModifiedSpriteCharacter';
    var MSC.parameters = PluginManager.parameters(MSC.product);
    
    //==============================================================================
    // Sprite_Character
    //==============================================================================

    (function(o, p) {
        var f = o[p]; o[p] = function(){
            f.apply(this, arguments);
            this.bitmap = new Bitmap();
        };
    }(Sprite_Character.prototype, 'initMembers'));

    (function(o, p) {
        var f = o[p]; o[p] = function(){
            var isImageChanged = f.apply(this, arguments);
            if (this._characterName  !== this._character.characterName() ||
                this._characterIndex !== this._character.characterIndex()) {
                var bitmap = ImageManager.loadCharacter(this._character.characterName());
                if (!bitmap.width || !bitmap.height) {
                    return false;
                }
            }
            return isImageChanged;
        };
    }(Sprite_Character.prototype, 'isImageChanged'));

    (function(o, p) {
        var f = o[p]; o[p] = function(){
            var characterBlockX = f.apply(this, arguments);
            if (!this._isBigCharacter) {
                var index = this._characterIndex || 0;
                return index % 4 * 3;
            }
            return characterBlockX;
        };
    }(Sprite_Character.prototype, 'characterBlockX'));

    (function(o, p) {
        var f = o[p]; o[p] = function(){
            var characterBlockY = f.apply(this, arguments);
            if (!this._isBigCharacter) {
                var index = this._characterIndex || 0;
                return Math.floor(index / 4) * 4;
            }
            return characterBlockY;
        };
    }(Sprite_Character.prototype, 'characterBlockY'));
}());
