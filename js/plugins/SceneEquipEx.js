//=============================================================================
// SceneEquipEx.js
//=============================================================================

/*:
 * @plugindesc （プラグイン説明）
 * @author （作者名）
 *
 * @help
 * プラグインコマンド
 *
 * [装備を外す]
 * ・アクターID1番の、スロット0番目（一番上）の装備を外す。
 *   EquipEx_Remove 1 0
 *
 * ・アクターID2番の、スロット3番目（一番上）の装備を外す。
 *   EquipEx_Remove 2 3
 *
 * ・アクターID3番の、すべての装備を外す。
 *   EquipEx_Remove 3
 */

(function(){
    'use strict';
    
    const _CUSTOM_EQUIP_SLOT = [
        [1, 2, 3, 3, 3, 3, 3, 4, 4, 4],
        [1, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ];
    
    const _EQUIP_WEIGHT_LIMIT = [
        '102 + this.level * 2 + $gameVariables.value(20)',
        '102 + this.level * 2 + $gameVariables.value(20)',
        '102 + this.level * 2 + $gameVariables.value(20)',
        '102 + this.level * 2 + $gameVariables.value(20)',
        '102 + this.level * 2 + $gameVariables.value(20)',
        '102 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
        '100 + this.level * 2 + $gameVariables.value(20)',
    ];

    const _LEFT_WINDOW_WIDTH = 480;
    
    //=========================================================================
    // Scene_Equip
    //=========================================================================

    var _alias_Scene_Equip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        _alias_Scene_Equip_create.call(this);
        this._statusWindow._slotWindow = this._slotWindow;
        this._statusWindow._itemWindow = this._itemWindow;
        this.createNameWindow();
        this.refreshActor();
        this._itemWindow.visible = false;
    };
    
    Scene_Equip.prototype.createNameWindow = function() {
        this._nameWindow = new Window_EquipName(this._helpWindow);
        this.addWindow(this._nameWindow);
    };

    var _alias_Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
    Scene_Equip.prototype.refreshActor = function() {
        _alias_Scene_Equip_refreshActor.call(this);
        if (this._nameWindow) {
            this._nameWindow.setActor(this.actor());
        }
    };

    var _alias_Scene_Equip_commandEquip = Scene_Equip.prototype.commandEquip;
    Scene_Equip.prototype.commandEquip = function() {
        _alias_Scene_Equip_commandEquip.call(this);
        this._statusWindow.changeDisplayMode(1);
    };
    
    var _alias_Scene_Equip_commandClear = Scene_Equip.prototype.commandClear;
    Scene_Equip.prototype.commandClear = function() {
        _alias_Scene_Equip_commandClear.call(this);
        this._nameWindow.refresh();
    };

    var _alias_Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
    Scene_Equip.prototype.onSlotOk = function() {
        _alias_Scene_Equip_onSlotOk.call(this);
        this._slotWindow.visible = false;
        this._itemWindow.visible = true;
        this._statusWindow.changeDisplayMode(3);
    };

    var _alias_Scene_Equip_onSlotCancel = Scene_Equip.prototype.onSlotCancel;
    Scene_Equip.prototype.onSlotCancel = function() {
        _alias_Scene_Equip_onSlotCancel.call(this);
        this._statusWindow.changeDisplayMode(0);
    };
    
    var _alias_Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
    Scene_Equip.prototype.onItemOk = function() {
        if (!this.isEquipWeightOk() || !this.isEquipLimitOk()) {
            SoundManager.playBuzzer();
            this._itemWindow.activate();
            return;
        }
        _alias_Scene_Equip_onItemOk.call(this);
        this._nameWindow.refresh();
        this._slotWindow.visible = true;
        this._itemWindow.visible = false;
        this._statusWindow.changeDisplayMode(1);
    };

    var _alias_Scene_Equip_onItemCancel = Scene_Equip.prototype.onItemCancel;
    Scene_Equip.prototype.onItemCancel = function() {
        _alias_Scene_Equip_onItemCancel.call(this);
        this._slotWindow.visible = true;
        this._itemWindow.visible = false;
        this._statusWindow.changeDisplayMode(1);
    };
    
    Scene_Equip.prototype.isEquipWeightOk = function() {
        var item = this._itemWindow.item();
        if (item) {
            var actor = this.actor();
            var weight = actor.weightTotal() + (+item.meta.equip_weight || 0);
            var equip = actor.equips()[this._slotWindow.index()];
            if (equip) {
                weight -= (+equip.meta.equip_weight || 0);
            }
            return (weight <= actor.weightLimit());
        }
        return true;
    };

    Scene_Equip.prototype.isEquipLimitOk = function() {
        var item = this._itemWindow.item();
        if (item) {
            var limit = (+item.meta.equip_limit || 99);
            var count = this.actor().equips().filter(function(equip, index) {
                return equip && index != this._slotWindow.index() && (equip.etypeId == item.etypeId && equip.id == item.id);
            }, this).length;
            return (count < limit);
        }
        return true;
    };
    
    //=========================================================================
    // Window_Help
    //=========================================================================

    var _alias_Window_Help_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function(item) {
        var _item = null;
        if (item) {
            _item = { description: item.description };
            if (item.etypeId) {
                var weight = (+item.meta.equip_weight || 0);
                var limit = (+item.meta.equip_limit || 0);
                var info = '[H ' + weight + ']';
                info += (item.etypeId == 5) ? '[R ' + limit + '] ' : ' ';
                _item.description = info + _item.description;
            }
        }
        _alias_Window_Help_setItem.call(this, _item);
    };
    
    //=========================================================================
    // Window_EquipName
    //=========================================================================

    function Window_EquipName() {
        this.initialize.apply(this, arguments);
    }
    
    Window_EquipName.prototype = Object.create(Window_Base.prototype);
    Window_EquipName.prototype.constructor = Window_EquipName;
    
    Window_EquipName.prototype.initialize = function(helpWindow) {
        Window_Base.prototype.initialize.call(this, 0, helpWindow.fittingHeight(2), _LEFT_WINDOW_WIDTH, this.fittingHeight(1));
    };

    Window_EquipName.prototype.standardPadding = function() {
        return 10;
    };
    
    Window_EquipName.prototype.setActor = function(actor) {
        if (this._actor != actor) {
            this._actor = actor;
            this.refresh();
        }
    };
    
    Window_EquipName.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            this.drawActorName(this._actor, 8, 0, this.contentsWidth());
            this.drawWeight(this._actor);
        }
    };
    
    Window_EquipName.prototype.drawWeight = function(actor) {
        var back_width = 192;
        var front_width = back_width * (actor.weightTotal() / actor.weightLimit());
        var height = 10;
        var x = this.contentsWidth() - back_width - 8;
        var y = 26;
        this.contents.fillRect(x, y, back_width, height, this.gaugeBackColor());
        this.contents.gradientFillRect(x, y, front_width, height, this.textColor(30), this.textColor(31));

        var total = ('     ' + actor.weightTotal()).slice(-5);
        var limit = ('     ' + actor.weightLimit()).slice(-5);
        this.changeTextColor(this.systemColor());
        this.drawText('重量            ', 0, 0, this.contentsWidth() - 60, 'right');
        this.resetTextColor();
        this.drawText(total + '/' + limit, 0, 0, this.contentsWidth() - 8, 'right');
    };
    
    //=========================================================================
    // Window_EquipCommand
    //=========================================================================

    var _alias_Window_EquipCommand_initialize = Window_EquipCommand.prototype.initialize;
    Window_EquipCommand.prototype.initialize = function(x, y, width) {
        x = 0;
        y += this.fittingHeight(1);
        width = _LEFT_WINDOW_WIDTH;
        _alias_Window_EquipCommand_initialize.call(this, x, y, width);
    };

    var _alias_Window_EquipCommand_standardPadding = Window_EquipCommand.prototype.standardPadding;
    Window_EquipCommand.prototype.standardPadding = function() {
        return _alias_Window_EquipCommand_standardPadding.call(this) - 8;
    }

    var _alias_Window_EquipCommand_maxCols = Window_EquipCommand.prototype.maxCols;
    Window_EquipCommand.prototype.maxCols = function() {
        _alias_Window_EquipCommand_maxCols.call(this);
        return 2;
    };

    var _alias_Window_EquipCommand_makeCommandList = Window_EquipCommand.prototype.makeCommandList;
    Window_EquipCommand.prototype.makeCommandList = function() {
        _alias_Window_EquipCommand_makeCommandList.call(this);
        this._list = this._list.filter(function(element) {
            return (element.symbol !== "optimize");
        });
    };
    
    //=========================================================================
    // Window_EquipSlot
    //=========================================================================

    var _alias_Window_EquipSlot_initialize = Window_EquipSlot.prototype.initialize;
    Window_EquipSlot.prototype.initialize = function(x, y, width, height) {
        width = _LEFT_WINDOW_WIDTH;
        height = this.fittingHeight(11)+98;
        x = 0;
        y = Graphics.height - height;
        _alias_Window_EquipSlot_initialize.call(this, x, y, width, height);
    };
    
    var _alias_Window_EquipSlot_standardPadding = Window_EquipSlot.prototype.standardPadding;
    Window_EquipSlot.prototype.standardPadding = function() {
        return _alias_Window_EquipSlot_standardPadding.call(this) - 6;
    };
    
    var _alias_Window_EquipSlot_cursorLeft = Window_EquipSlot.prototype.cursorLeft;
    Window_EquipSlot.prototype.cursorLeft = function(wrap) {
        _alias_Window_EquipSlot_cursorLeft.call(this, wrap);
        this._statusWindow.switchDisplayMode();
    };

    var _alias_Window_EquipSlot_cursorRight = Window_EquipSlot.prototype.cursorRight;
    Window_EquipSlot.prototype.cursorRight = function(wrap) {
        _alias_Window_EquipSlot_cursorRight.call(this, wrap);
        this._statusWindow.switchDisplayMode();
    };

    var _alias_Window_EquipSlot_drawItemName = Window_EquipSlot.prototype.drawItemName;
    Window_EquipSlot.prototype.drawItemName = function(item, x, y, width) {
        x -= 54;
        _alias_Window_EquipSlot_drawItemName.call(this, item, x, y, width);
        if (item) {
            var weight = (+item.meta.equip_weight || 0);
            this.changeTextColor(this.textColor(31));
            this.drawText(weight + ' ', 0, y, this.contentsWidth(), 'right');
        }
    };

    //=========================================================================
    // Window_EquipItem
    //=========================================================================

    var _alias_Window_EquipItem_initialize = Window_EquipItem.prototype.initialize;
    Window_EquipItem.prototype.initialize = function(x, y, width, height) {
        width = _LEFT_WINDOW_WIDTH;
        height = this.fittingHeight(11)+98;
        x = 0;
        y = Graphics.height - height;
        _alias_Window_EquipItem_initialize.call(this, x, y, width, height);
    };

    var _alias_Window_EquipItem_standardPadding = Window_EquipItem.prototype.standardPadding;
    Window_EquipItem.prototype.standardPadding = function() {
        return _alias_Window_EquipItem_standardPadding.call(this) - 6;
    };

    var _alias_Window_EquipItem_cursorLeft = Window_EquipItem.prototype.cursorLeft;
    Window_EquipItem.prototype.cursorLeft = function(wrap) {
        _alias_Window_EquipItem_cursorLeft.call(this, wrap);
        this._statusWindow.switchDisplayMode();
    };

    var _alias_Window_EquipItem_cursorRight = Window_EquipItem.prototype.cursorRight;
    Window_EquipItem.prototype.cursorRight = function(wrap) {
        _alias_Window_EquipItem_cursorRight.call(this, wrap);
        this._statusWindow.switchDisplayMode();
    };

    var _alias_Window_EquipItem_maxCols = Window_EquipItem.prototype.maxCols;
    Window_EquipItem.prototype.maxCols = function() {
        _alias_Window_EquipItem_maxCols.call(this);
        return 1;
    };

    var _alias_Window_EquipItem_drawItem = Window_EquipItem.prototype.drawItem;
    Window_EquipItem.prototype.drawItem = function(index) {
        _alias_Window_EquipItem_drawItem.call(this, index);
        if (!this._data[index]) {
            var rect = this.itemRect(index);
            this.drawText('解除装备', rect.x + Window_Base._iconWidth + 4, rect.y, rect.width, 'left');
        }
    };
    
    //=========================================================================
    // Window_EquipStatus
    //=========================================================================

    var _alias_Window_EquipStatus_initialize = Window_EquipStatus.prototype.initialize;
    Window_EquipStatus.prototype.initialize = function(x, y) {
        x = _LEFT_WINDOW_WIDTH;
        y = this.fittingHeight(2);
        _alias_Window_EquipStatus_initialize.call(this, x, y);
        this._displayMode = 0;
    };

    var _alias_Window_EquipStatus_windowWidth = Window_EquipStatus.prototype.windowWidth;
    Window_EquipStatus.prototype.windowWidth = function() {
        _alias_Window_EquipStatus_windowWidth.call(this);
        return Graphics.width - _LEFT_WINDOW_WIDTH;
    };

    var _alias_Window_EquipStatus_windowHeight = Window_EquipStatus.prototype.windowHeight;
    Window_EquipStatus.prototype.windowHeight = function() {
        _alias_Window_EquipStatus_windowHeight.call(this);
        return Graphics.height - this.fittingHeight(2);
    };

    var _alias_Window_EquipStatus_refresh = Window_EquipStatus.prototype.refresh;
    Window_EquipStatus.prototype.refresh = function() {
        this.contents.clear();
        this.resetTextColor();
        switch (this._displayMode) {
            case 0:
                this.contents.gradientFillRect(0, 26, this.contentsWidth(), 10, this.textColor(4), this.textColor(14));
                this.drawText('操作说明', 0, 0, this.contentsWidth());
                this.drawText('QW   :切换角色', 0, this.lineHeight() * 2, this.contentsWidth());
                this.drawText('←→ :项目选择', 0, this.lineHeight() * 3, this.contentsWidth());
                break;
            case 1:
                this.drawEquipStatus();
                break;
            case 2:
                this.drawEquipTraits();
                break;
            case 3:
                _alias_Window_EquipStatus_refresh.call(this);
                if (this._actor) {
                    for (var i = 6; i < 9; i++) {
                        this.drawItem(0, this.lineHeight() * (1 + i), 2 + i);
                    }
                }
                break;
            case 4:
                this.drawEquipTraits();
                break;
        }
    };
    
    var _alias_Window_EquipStatus_drawActorName = Window_EquipStatus.prototype.drawActorName;
    Window_EquipStatus.prototype.drawActorName = function(actor, x, y, width) {
        _alias_Window_EquipStatus_drawActorName.call(this, actor, x, y, width);
        this.contents.clear();
        this.contents.gradientFillRect(0, 26, this.contentsWidth(), 10, this.textColor(4), this.textColor(14));
        this.drawText('属性变化', 0, 0, this.contentsWidth());
        this.changeTextColor(this.systemColor());
        this.drawText('\u2192', 0, this.lineHeight() * 2, 48);
        this.resetTextColor();
        if (this._slotWindow) {
            var item = this._slotWindow.item();
            if (item) {
                this.drawTextEx('\\I[' + item.iconIndex + ']' + item.name, 0, this.lineHeight());
            }
        }
        if (this._itemWindow) {
            var item = this._itemWindow.item();
            if (item) {
                this.drawTextEx('\\I[' + item.iconIndex + ']' + item.name, 32, this.lineHeight() * 2);
            }
        }
    };

    var _alias_Window_EquipStatus_setTempActor = Window_EquipStatus.prototype.setTempActor;
    Window_EquipStatus.prototype.setTempActor = function(tempActor) {
        _alias_Window_EquipStatus_setTempActor.call(this, tempActor);
        this.refresh();
    };
    
    var _alias_Window_EquipStatus_drawItem = Window_EquipStatus.prototype.drawItem;
    Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
        if (paramId == 2) {
            for (var i = 0; i < 2; i++) {
                _alias_Window_EquipStatus_drawItem.call(this, x, y + this.lineHeight() * (i + 2), i);
            }
        }
        _alias_Window_EquipStatus_drawItem.call(this, x, y + this.lineHeight() * 4, paramId);
    };

    var _alias_Window_EquipStatus_drawParamName = Window_EquipStatus.prototype.drawParamName;
    Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
        if (paramId < 10) {
            _alias_Window_EquipStatus_drawParamName.call(this, x, y, paramId);
        } else if (paramId == 10) {
            this.changeTextColor(this.systemColor());
            this.drawText('会心率', x, y, 120);
        }
    };

    var _alias_Window_EquipStatus_drawCurrentParam = Window_EquipStatus.prototype.drawCurrentParam;
    Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
        if (paramId < 8) {
            _alias_Window_EquipStatus_drawCurrentParam.call(this, x, y, paramId);
        } else {
            var param = 0;
            switch (paramId) {
                case 8:
                    param = this._actor.hit * 100;
                    break;
                case 9:
                    param = this._actor.eva * 100;
                    break;
                case 10:
                    param = this._actor.cri * 100;
                    break;
            }
            this.resetTextColor();
            this.drawText(Math.floor(param), x, y, 48, 'right');
        }
    };

    var _alias_Window_EquipStatus_drawNewParam = Window_EquipStatus.prototype.drawNewParam;
    Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
        var param = 0;
        var new_param = 0;
        if (paramId < 8) {
            _alias_Window_EquipStatus_drawNewParam.call(this, x, y, paramId);
        } else {
            switch (paramId) {
                case 8:
                    param = this._actor.hit * 100;
                    new_param = this._tempActor.hit * 100;
                    break;
                case 9:
                    param = this._actor.eva * 100;
                    new_param = this._tempActor.eva * 100;
                    break;
                case 10:
                    param = this._actor.cri * 100;
                    new_param = this._tempActor.cri * 100;
                    break;
            }
            param = Math.floor(param);
            new_param = Math.floor(new_param);
            this.changeTextColor(this.paramchangeTextColor(new_param - param));
            this.drawText(new_param, x, y, 48, 'right');
        }
        var newValue = (paramId < 8) ? this._tempActor.param(paramId) : new_param;
        var diffvalue = (paramId < 8) ? newValue - this._actor.param(paramId) : new_param - param;
        if (diffvalue > 0) {
            diffvalue = '+' + diffvalue;
        }
        this.drawText('(' + ('     ' + diffvalue).slice(-5) + ')', x + 48, y, 96, 'left');
    };
    
    Window_EquipStatus.prototype.drawEquipStatus = function() {
        this.contents.gradientFillRect(0, 26, this.contentsWidth(), 10, this.textColor(4), this.textColor(14));
        this.drawText('装备能力', 0, 0, this.contentsWidth());
        if (this._slotWindow) {
            var item = this._slotWindow.item();
            if (item) {
                this.drawTextEx('\\I[' + item.iconIndex + ']' + item.name, 0, this.lineHeight());
                for (var i = 0; i < 8; i++) {
                    var x = this.contentsWidth() / 2 * (i % 2);
                    var y = this.lineHeight() * (Math.floor(i / 2) + 2);
                    var op = (item.params[i]) ? '+' : '';
                    this.drawParamName(x, y, i);
                    this.changeTextColor(this.paramchangeTextColor(item.params[i]));
                    this.drawText(op + Math.floor(item.params[i]), x, y, this.contentsWidth() / 2 - 10, 'right');
                }
                var type = (item.etypeId == 1) ? $dataSystem.weaponTypes[item.wtypeId] : $dataSystem.armorTypes[item.atypeId];
                this.changeTextColor(this.systemColor());
                this.drawText('装备类型', 0, this.lineHeight() * 7);
                this.resetTextColor();
                this.drawText(type, 0, this.lineHeight() * 7, this.contentsWidth() / 2, 'right');
            }
        }
    };
    
    Window_EquipStatus.prototype.drawEquipTraits = function() {
        this.contents.gradientFillRect(0, 26, this.contentsWidth(), 10, this.textColor(4), this.textColor(14));
        this.drawText('装备特征', 0, 0, this.contentsWidth());
        var item = null;
        if ((this._displayMode == 2) && (this._slotWindow)) {
            item = this._slotWindow.item();
        }
        if ((this._displayMode == 4) && (this._itemWindow)) {
            item = this._itemWindow.item();
        }
        if (item) {
            console.log(item);
            var width = this.contentsWidth() / 2 - 16;
            item.traits.forEach(function(trait, index) {
                var text = '';
                var x = (this.contentsWidth() / 2) * (index % 2);
                var y = this.lineHeight() * (Math.floor(index / 2) + 1);
                var word = '';
                var ope = (trait.value >= 0 ? '+' : '');
                var percent = Math.round(trait.value * 100);
                switch(trait.code) {
                    case 11:
                        text = $dataSystem.elements[trait.dataId] + '属性有効*' + percent + '%';
                        break;
                    case 12:
                        text = $dataSystem.terms.params[trait.dataId] + '弱体有効*' + percent + '%';
                        break;
                    case 13:
                        text = $dataStates[trait.dataId].name + '有効*' + percent + '%';
                        break;
                    case 14:
                        text = $dataStates[trait.dataId].name + '无効';
                        break;
                    case 21:
                        text = $dataSystem.terms.params[trait.dataId] + '*' + percent + '%';
                        break;
                    case 22:
                        word = ['命中率', '物理回避率', '会心率', '会心回避率', '特殊回避率', '特殊反射率', '物理反击率', 'HP再生率', 'MP再生率', 'TP再生率'];
                        text = word[trait.dataId] + ope + percent + '%';
                        break;
                    case 23:
                        word = ['仇恨', '防御効果', '回復効果', '药物知识', 'MP消耗', 'TP继续', '物理伤害', '魔法伤害', '地形伤害', '经验值倍率'];
                        text = word[trait.dataId] + '*' + percent + '%';
                        break;
                    case 31:
                        text = $dataSystem.elements[trait.dataId] + '属性攻击';
                        break;
                    case 32:
                        text = $dataStates[trait.dataId].name + '攻击(' + percent + '%)';
                        break;
                    case 33:
                        text = '攻击速度' + ope + trait.value;
                        break;
                    case 34:
                        text = '攻击次数' + ope + trait.value + '次';
                        break;
                    case 41:
                        text = $dataSystem.skillTypes[trait.dataId] + '使用可';
                        break;
                    case 42:
                        text = $dataSystem.skillTypes[trait.dataId] + '使用不可';
                        break;
                    case 43:
                        text = $dataSkills[trait.dataId].name + '使用可';
                        break;
                    case 44:
                        text = $dataSkills[trait.dataId].name + '使用不可';
                        break;
                    case 51:
                        text = $dataSystem.weaponTypes[trait.dataId] + '装備可';
                        break;
                    case 52:
                        text = $dataSystem.armorTypes[trait.dataId] + '装備可';
                        break;
                    case 53:
                        text = $dataSystem.equipTypes[trait.dataId] + '変更不可';
                        break;
                    case 54:
                        text = $dataSystem.equipTypes[trait.dataId] + '装備不可';
                        break;
                    case 55:
                        word = ['通常', '二刀流'];
                        text = 'スロットタイプ：' + word[trait.dataId];
                        break;
                    case 61:
                        text = '追加行動(' + percent + '%' + ')';
                        break;
                    case 62:
                        word = ['自动战斗', '防御', '身代わり', 'TP持ち越し'];
                        text = word[trait.dataId];
                        break;
                    case 63:
                        word = ['通常', 'ボス', '瞬間消去', '消えない'];
                        text = '消滅エフェクト(' + word[trait.dataId] + ')';
                        break;
                    case 64:
                        word = ['エンカウント半減', 'エンカウント無効', '不意打ち無効', '先制攻撃率アップ', '获得金额2倍', '道具掉率2倍'];
                        text = word[trait.dataId];
                        break;
                }
                this.drawText(text, x, y, width);
            }, this);
        }
    };
    
    Window_EquipStatus.prototype.changeDisplayMode = function(mode) {
        this._displayMode = mode;
        this.refresh();
    };
    
    Window_EquipStatus.prototype.switchDisplayMode = function() {
        var param = 0;
        if (this._displayMode > 0) {
            param = (this._displayMode == 1 || this._displayMode == 3) ? 1 : -1;
        }
        this._displayMode += param;
        this.refresh();
    };
    
    //=========================================================================
    // Game_Actor
    //=========================================================================

    var _alias_Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function() {
        var slots = _alias_Game_Actor_equipSlots.call(this);
        /* Update 2019.09.17
         *  スロット数を変更した場合、変更前のセーブデータを使用すると
         *  操作次第では装備画面でエラーになる問題への対応
         */
        /* from */
        // return _CUSTOM_EQUIP_SLOT[this._classId - 1] || slots;
        /* to */
        slots = _CUSTOM_EQUIP_SLOT[this._classId - 1] || slots;
        for (let i = 0; i < slots.length; i++) {
            if (!this._equips[i]) {
                this._equips[i] = new Game_Item();
            }
        }
        return slots;
        /* end */
    };
    
    Game_Actor.prototype.weightLimit = function() {
        return eval(_EQUIP_WEIGHT_LIMIT[this._actorId - 1] || '0');
    };

    Game_Actor.prototype.weightTotal = function() {
        var weight = 0;
        this.equips().forEach(function(equip) {
            if (equip) {
                weight += (+equip.meta.equip_weight || 0);
            }
        });
        return weight;
    };

    //==============================================================================
    // Game_Interpreter
    //==============================================================================

    (function(o, p) {
        var f = o[p]; o[p] = function(command, args) {
            f.apply(this, arguments);
            switch (command.toLowerCase()) {
                case 'equipex_remove':
                case 'equipex_remove_all':
                    var actor = $gameActors.actor(+args[0]);
                    var slotId = +(args[1] || '99');
                    var maxSlots = actor.equipSlots().length;
                    for (var i = 0; i < maxSlots; i++) {
                        if (slotId == 99 || i == slotId) {
                            actor.changeEquip(i, null);
                        }
                    }
                    break;
            }
        };
    }(Game_Interpreter.prototype, 'pluginCommand'));
    
}());
