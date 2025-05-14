//==============================================================================
// MpiUrmDisableTurnOnMap
//==============================================================================

/*:
 * @plugindesc バトル以外でのターン数更新を無効化します。
 * @author 奏ねこま（おとぶき ねこま）
 *
 * [利用規約] ..................................................................
 *  - 本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  - 商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  - 利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  - プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  - 本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [改訂履歴] ..................................................................
 *   Version 1.00  2018/05/19  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2018 Nekoma Otobuki
 */

var Imported = Imported || {};
var Makonet = Makonet || {};

(function(){
	'use strict';

    var plugin = 'MpiUrmDisableTurnOnMap';

    Imported[plugin] = true;
    Makonet[plugin] = {};

    var $mpi = Makonet[plugin];
    $mpi.parameters = PluginManager.parameters(plugin);

    //==============================================================================
    // Game_BattlerBase
    //==============================================================================

    (function(o,p){
		var f=o[p];o[p]=function(command, args){
            if ($gameParty.inBattle()) {
                f.apply(this,arguments);
            }
		};
	}(Game_BattlerBase.prototype,'updateStateTurns'));

    (function(o,p){
		var f=o[p];o[p]=function(command, args){
            if ($gameParty.inBattle()) {
                f.apply(this,arguments);
            }
		};
	}(Game_BattlerBase.prototype,'updateBuffTurns'));
}());
