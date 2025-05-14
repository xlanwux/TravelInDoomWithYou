//==============================================================================
// MpiUrmSelectableChest
//==============================================================================

/*:
 * @plugindesc アイテム選択型宝箱
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @param Y
 * @type number
 * @default 111
 * @desc アイテム選択ウインドウのY座標
 * 
 * @param Width
 * @type number
 * @default 1200
 * @desc アイテム選択ウインドウの幅
 * 
 * @param Result Variable ID
 * @type variable
 * @default 1
 * @desc 選択結果を格納する変数の番号
 * 
 * @help
 * [プラグインコマンド]
 *  選択アイテムの設定
 *    SelectableChest set <宝箱ID> <アイテム種別> <アイテムID>
 * 
 *    例:宝箱1番に、アイテム2番を設定
 *     SelectableChest set 1 item 2
 * 
 *    例:宝箱2番に、武器3番を設定
 *     SelectableChest set 2 weapon 3
 * 
 *    例:宝箱3番に、防具4番を設定
 *     SelectableChest set 3 armor 4
 * 
 *  選択アイテムのクリア
 *    SelectableChest clear <宝箱ID>
 * 
 *    例:宝箱1番の選択アイテムをクリア
 *     SelectableChest clear 1
 * 
 *  アイテム選択の実行
 *    SelectableChest apply <宝箱ID>
 * 
 *    例:宝箱1番のアイテム選択を実行
 *     SelectableChest apply 1
 * 
 * [引数を変数で指定する場合]
 *  プラグインコマンドで指定する引数には、変数を指定できます。
 * 
 *    例: 変数1番の値を宝箱IDとして指定する場合
 *     SelectableChest set \v[1] item 2
 * 
 *    例: 変数2番の値をアイテム種別として指定する場合
 *     SelectableChest set 1 \v[2] 2
 * 
 *    例: 変数3番の値をアイテムIDとして指定する場合
 *     SelectableChest set 1 item \v[3]
 * 
 * [アイテム選択処理]
 *  アイテムを選択すると、選択したアイテムを1つ入手するとともに、
 *  プラグインパラメータで設定した変数に選択箇所を示す値を格納します。
 *  左なら1、真ん中なら2、右なら3、キャンセルした場合は0となります。
 * 
 * [利用規約] ..................................................................
 *  - 本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  - 商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  - 利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  - プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  - 本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [改訂履歴] ..................................................................
 *   Version 1.00  2018/05/15  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2018 Nekoma Otobuki
 */

var Imported = Imported || {};
var Makonet = Makonet || {};

(function(){
	'use strict';

    var plugin = 'MpiUrmSelectableChest';

    Imported[plugin] = true;
    Makonet[plugin] = {};

    var $mpi = Makonet[plugin];
    $mpi.parameters = PluginManager.parameters(plugin);

    $mpi.y = Number($mpi.parameters['Y']) || 0;
    $mpi.width = Number($mpi.parameters['Width']) || 0;
    $mpi.variable_id = Number($mpi.parameters['Result Variable ID']) || 0;

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
    // Game_Interpreter
    //==============================================================================

	(function(o,p){
		var f=o[p];o[p]=function(command, args){
            f.apply(this,arguments);
            if (command.toLowerCase() === 'selectablechest') {
                $gameSystem._selectableChest = $gameSystem._selectableChest || [];
                var chest_id = Number(convertVariables(args[1])) || 0;
                var item_type = '';
                var item_id = 0;
                var chest = [];
                switch (args[0].toLowerCase()) {
                case 'set':
                    item_type = String(convertVariables(args[2])) || '';
                    item_id = Number(convertVariables(args[3])) || 0;
                    chest = $gameSystem._selectableChest[chest_id] || [];
                    chest.push({'item_type': item_type.toLowerCase(), 'item_id': item_id});
                    $gameSystem._selectableChest[chest_id] = chest;
                    break;
                case 'apply':
                    chest = $gameSystem._selectableChest[chest_id] || [];
                    for (var i = 0; i < 3; i++) {
                        if (chest[i]) {
                            item_type = chest[i]['item_type'];
                            item_id = chest[i]['item_id'];
                            switch (item_type) {
                            case 'item':
                                $gameMessage._chestItems.push($dataItems[item_id]);
                                break;
                            case 'weapon':
                                $gameMessage._chestItems.push($dataWeapons[item_id]);
                                break;
                            case 'armor':
                                $gameMessage._chestItems.push($dataArmors[item_id]);
                                break;
                            }
                        }
                    }
                    this.setWaitMode('message');
                    break;
                case 'clear':
                    $gameSystem._selectableChest[chest_id] = [];
                    break;
                }
            }
		};
	}(Game_Interpreter.prototype,'pluginCommand'));
	
    //==============================================================================
    // Game_Message
    //==============================================================================

	(function(o,p){
		var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            this._chestItems = [];
		};
	}(Game_Message.prototype,'clear'));
	
    Game_Message.prototype.isSelectableChest = function() {
        return this._chestItems.length > 0;
    };

	(function(o,p){
		var f=o[p];o[p]=function(){
			return f.apply(this,arguments) || this.isSelectableChest();
		};
	}(Game_Message.prototype,'isBusy'));

    //==============================================================================
    // Window_Message
    //==============================================================================

	(function(o,p){
		var f=o[p];o[p]=function(){
            var subWindows = f.apply(this,arguments);
            subWindows.push(this._chestWindow);
            return subWindows;
		};
	}(Window_Message.prototype,'subWindows'));
	
	(function(o,p){
		var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            this._chestWindow = new Window_SelectableChest(this);
		};
	}(Window_Message.prototype,'createSubWindows'));
	
    (function(o,p){
		var f=o[p];o[p]=function(){
			return f.apply(this,arguments) || this._chestWindow.active;
		};
	}(Window_Message.prototype,'isAnySubWindowActive'));

    (function(o,p){
		var f=o[p];o[p]=function(){
			if (!f.apply(this,arguments)) {
                if ($gameMessage.isSelectableChest()) {
                    this._chestWindow.start();
                    return true;
                }
                return false;
            }
            return true;
		};
	}(Window_Message.prototype,'startInput'));

    //==============================================================================
    // Window_SelectableChest
    //==============================================================================

    function Window_SelectableChest() {
        this.initialize.apply(this, arguments);
    }
    
    Window_SelectableChest.prototype = Object.create(Window_HorzCommand.prototype);
    Window_SelectableChest.prototype.constructor = Window_SelectableChest;
    
    Window_SelectableChest.prototype.initialize = function(messageWindow) {
        var x = (Graphics.boxWidth - $mpi.width) / 2;
        var y = $mpi.y;
        this._messageWindow = messageWindow;
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        this.createChildWindow();
        this.openness = 0;
        this._windowSpriteContainer.visible = false;
        this.deactivate();
    };
    
    Window_SelectableChest.prototype.start = function() {
        this.refresh();
        this.select(-1);
        this.open();
        this.activate();
    };
    
    Window_SelectableChest.prototype.windowWidth = function() {
        return $mpi.width;
    };
    
    Window_SelectableChest.prototype.windowHeight = function() {
        return this.fittingHeight(4);
    };
    
    Window_SelectableChest.prototype.itemHeight = function() {
        return this.contentsHeight();
    };
    
    Window_SelectableChest.prototype.maxCols = function() {
        return 3;
    };
    
    Window_SelectableChest.prototype.spacing = function() {
        return 36;
    };
    
    Window_SelectableChest.prototype.createChildWindow = function() {
        var width = this.windowWidth() / 3;
        var height = this.windowHeight();
        this._childWindow1 = new Window_Base(0, 0, width, height);
        this._childWindow2 = new Window_Base(width, 0, width, height);
        this._childWindow3 = new Window_Base(width * 2, 0, width, height);
        this._childWindow1.openness = 0;
        this._childWindow2.openness = 0;
        this._childWindow3.openness = 0;
        this.addChildAt(this._childWindow1, 0);
        this.addChildAt(this._childWindow2, 0);
        this.addChildAt(this._childWindow3, 0);
    };

    Window_SelectableChest.prototype.open = function() {
        Window_HorzCommand.prototype.open.call(this);
        this._childWindow1.open();
        this._childWindow2.open();
        this._childWindow3.open();
    };

    Window_SelectableChest.prototype.close = function() {
        Window_HorzCommand.prototype.close.call(this);
        this._childWindow1.close();
        this._childWindow2.close();
        this._childWindow3.close();
    };

    Window_SelectableChest.prototype.makeCommandList = function() {
        for (var i = 0; i < 3; i++) {
            if ($gameMessage._chestItems[i]) {
                this.addCommand('', '');
            }
        }
    };

    Window_SelectableChest.prototype.drawItem = function(index) {
        var item = $gameMessage._chestItems[index];
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.drawText(item.name, rect.x, rect.y, rect.width);
        this.drawIcon(item.iconIndex, rect.x + rect.width - Window_Base._iconWidth - 2, rect.y + 2);
        item.description.split(/\n/).forEach(function(text, index) {
            this.drawText(text, rect.x, rect.y + this.lineHeight() * (index + 2), rect.width);
        }, this);
    };

    Window_SelectableChest.prototype.isCancelEnabled = function() {
        return true;
    };
    
    Window_SelectableChest.prototype.callOkHandler = function() {
        $gameParty.gainItem($gameMessage._chestItems[this.index()], 1);
        if ($mpi.variable_id > 0) {
            $gameVariables.setValue($mpi.variable_id, this.index() + 1);
        }
        this._messageWindow.terminateMessage();
        this.close();
    };
    
    Window_SelectableChest.prototype.callCancelHandler = function() {
        if ($mpi.variable_id > 0) {
            $gameVariables.setValue($mpi.variable_id, 0);
        }
        this._messageWindow.terminateMessage();
        this.close();
    };
}());
