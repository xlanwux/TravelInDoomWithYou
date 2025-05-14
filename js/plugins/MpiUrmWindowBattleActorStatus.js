//==============================================================================
// MpiUrmWindowBattleActorStatus
//==============================================================================

/*:
 * @plugindesc アクターごとのステータスウインドウ表示
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @param X
 * @type number
 * @default 744
 * @desc ステータスウインドウのX座標
 * 
 * @param Y
 * @type number
 * @default 111
 * @desc ステータスウインドウのY座標
 * 
 * @param Width
 * @type number
 * @default 456
 * @desc ステータスウインドウの幅
 * 
 * @param Height
 * @type number
 * @default 508
 * @desc ステータスウインドウの高さ
 * 
 * [利用規約] ..................................................................
 *  - 本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  - 商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  - 利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  - プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  - 本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [改訂履歴] ..................................................................
 *   Version 1.00  2018/05/13  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2018 Nekoma Otobuki
 */

var Imported = Imported || {};
var Makonet = Makonet || {};

(function(){
	'use strict';

    var plugin = 'MpiUrmWindowBattleActorStatus';

    Imported[plugin] = true;
    Makonet[plugin] = {};

    var $mpi = Makonet[plugin];
    $mpi.parameters = PluginManager.parameters(plugin);

    $mpi.x = Number($mpi.parameters['X']) || 0;
    $mpi.y = Number($mpi.parameters['Y']) || 0;
    $mpi.width = Number($mpi.parameters['Width']) || 0;
    $mpi.height = Number($mpi.parameters['Height']) || 0;

    var _ = plugin;
    var $_ = `$${_}`;

    //==============================================================================
    // Private Methods
    //==============================================================================

    function convertVariables(text) {
        if (typeof(text) !== 'string') return text;
        var pattern = '\\\\v\\[(\\d+)\\]';
        while (text.match(RegExp(pattern, 'i'))) {
            text = text.replace(RegExp(pattern, 'gi'), function(){
                return $gameVariables.value(+arguments[1]);
            });
        }
        return text;
    }

    //==============================================================================
    // Scene_Battle
    //==============================================================================

	(function(o,p){
		var f=o[p];o[p]=function(){
			f.apply(this,arguments);
			this.createActorStatusWindow();
		};
	}(Scene_Battle.prototype,'createAllWindows'));
	
	Scene_Battle.prototype.createActorStatusWindow = function() {
		this._actorStatusWindow = new Window_BattleActorStatus();
		this.addWindow(this._actorStatusWindow);
	};
	
	(function(o,p){
		var f=o[p];o[p]=function(){
			f.apply(this,arguments);
			if (BattleManager.isInputting()) {
				if (BattleManager.actor()) {
					this._actorStatusWindow.setActor(BattleManager.actor());
					this._actorStatusWindow.activate();
					this._actorStatusWindow.show();
				} else {
					this._actorStatusWindow.deactivate();
					this._actorStatusWindow.hide();
				}
			} else {
				this._actorStatusWindow.deactivate();
				this._actorStatusWindow.hide();
			}
		};
	}(Scene_Battle.prototype,'changeInputWindow'));
	
    //==============================================================================
    // Window_BattleActorStatus
    //==============================================================================

	function Window_BattleActorStatus() {
		this.initialize.apply(this, arguments);
	}

	Window_BattleActorStatus.prototype = Object.create(Window_Status.prototype);
	Window_BattleActorStatus.prototype.constructor = Window_BattleActorStatus;

	Window_BattleActorStatus.prototype.initialize = function() {
		var x = $mpi.x;
		var y = $mpi.y;
		var width = $mpi.width;
		var height = $mpi.height;
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		this._actor = null;
		this.refresh();
		this.deactivate();
		this.hide();
		$gameParty.members().forEach(function(actor){
			ImageManager.loadFace(actor.faceName());
		});
	};

	Window_BattleActorStatus.prototype.setActor = function(actor) {
		this._actor = actor;
		this.refresh();
	};
}());
