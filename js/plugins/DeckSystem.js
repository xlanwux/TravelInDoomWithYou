//=============================================================================
// DeckSystem.js
//=============================================================================

/*:
 * @plugindesc アクターの装備状態をセーブおよびロードする機能を提供します。
 * @author こま
 *
 * @param Menu Command
 * @desc セーブ・ロード実行画面を呼び出すメニューコマンド名、およびコマンドの位置を指定してください。（先頭は0）
 * @default デッキ記録 6
 *
 * @param Background Image
 * @desc セーブ・ロード画面の背景に表示する画像ファイル名を指定してください。（img/systemフォルダ内の画像を使用）
 * @default DeckSystem
 *
 * @param Save Category Text
 * @desc セーブ・ロード選択画面のセーブ側選択肢に表示するテキストを指定してください。
 * @default デッキセーブ
 *
 * @param Load Category Text
 * @desc セーブ・ロード選択画面のロード側選択肢に表示するテキストを指定してください。
 * @default デッキロード
 *
 * @param Index Text
 * @desc データリストの左上に表示するテキストを指定してください。指定したテキスト＋番号の形で表示されます。
 * @default デッキ
 *
 * @param Max Deck Number
 * @desc セーブ数上限を指定してください。
 * @default 10
 *
 * @param Max Name Length
 * @desc セーブ名の最大文字数を指定してください。
 * @default 16
 *
 * @help
 */

(function(){
    'use strict';

    const _PLUGIN = 'DeckSystem';
    const _PARAMETERS = PluginManager.parameters(_PLUGIN);
    
    const _MENU_COMMAND       =  _PARAMETERS['Menu Command'].trim().split(/ +/);
    const _BACKGROUND_IMAGE   =  _PARAMETERS['Background Image'];
    const _SAVE_CATEGORY_TEXT =  _PARAMETERS['Save Category Text'];
    const _LOAD_CATEGORY_TEXT =  _PARAMETERS['Load Category Text'];
    const _INDEX_TEXT         =  _PARAMETERS['Index Text'];
    const _MAX_DECK_NUMBER    = +_PARAMETERS['Max Deck Number'];
    const _MAX_NAME_LENGTH    = +_PARAMETERS['Max Name Length'];
    
    function _p(o){ return o[_PLUGIN] = o[_PLUGIN] || {} };
    
    //=========================================================================
    // Scene_Deck
    //=========================================================================

    function Scene_Deck() {
        this.initialize.apply(this, arguments);
    }
    window.Scene_Deck = Scene_Deck;

    Scene_Deck.prototype = Object.create(Scene_Base.prototype);
    Scene_Deck.prototype.constructor = Scene_Deck;

    Scene_Deck.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        _p($gameSystem).data = _p($gameSystem).data || [];
        this.createBackground();
        this.createWindowLayer();
        this.createCategoryWindow();
        this.createDeckWindow();
        this.createEditWindow();
        this.createInputWindow();
        this.createInfoWindow();
    };
    
    Scene_Deck.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite(ImageManager.loadSystem(_BACKGROUND_IMAGE));
        this.addChild(this._backgroundSprite);
    };
    
    Scene_Deck.prototype.createWindowLayer = function() {
        var width = Graphics.boxWidth;
        var height = Graphics.boxHeight;
        var x = (Graphics.width - width) / 2;
        var y = (Graphics.height - height) / 2;
        this._windowLayer = [];
        this._windowLayer.push(new WindowLayer());
        this._windowLayer[0].move(x, y, width, height);
        this.addChild(this._windowLayer[0]);
        this._windowLayer.push(new WindowLayer());
        this._windowLayer[1].move(x, y, width, height);
        this.addChild(this._windowLayer[1]);
    };

    Scene_Deck.prototype.addWindow = function(index, window) {
        this._windowLayer[index].addChild(window);
    };

    Scene_Deck.prototype.createCategoryWindow = function() {
        this._categoryWindow = new Window_DeckCategory();
        this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
        this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(0, this._categoryWindow);
    };

    Scene_Deck.prototype.createDeckWindow = function() {
        this._deckWindow = new Window_DeckList(0, this._categoryWindow.height);
        this._deckWindow.setHandler('ok',     this.onDeckOk.bind(this));
        this._deckWindow.setHandler('cancel', this.onDeckCancel.bind(this));
        this.addWindow(0, this._deckWindow);
        this._categoryWindow.setDeckWindow(this._deckWindow);
    }
    
    Scene_Deck.prototype.createEditWindow = function() {
        this._editWindow = new Window_DeckNameEdit(_MAX_NAME_LENGTH);
        this.addWindow(1, this._editWindow);
    };
    
    Scene_Deck.prototype.createInputWindow = function() {
        this._inputWindow = new Window_DeckNameInput(this._editWindow);
        this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
        this._inputWindow.setHandler('cancel', this.onInputCancel.bind(this));
        this.addWindow(1, this._inputWindow);
    };

    Scene_Deck.prototype.createInfoWindow = function() {
        this._infoWindow = new Window_DeckInformation(0, 0);
        this._infoWindow.x = (Graphics.width - this._infoWindow.windowWidth()) / 2;
        this._infoWindow.y = (Graphics.height - this._infoWindow.windowHeight()) / 2;
        this._infoWindow.hide();
        this._infoWindow.setHandler('ok', this.popScene.bind());
        this._infoWindow.setHandler('cancel', this.popScene.bind());
        this.addWindow(1, this._infoWindow);
    };

    Scene_Deck.prototype.onCategoryOk = function() {
        this._deckWindow.activate();
        this._deckWindow.select(0);
    };

    Scene_Deck.prototype.onDeckOk = function() {
        if (this._categoryWindow.currentSymbol() === 'save') {
            this._editWindow.visible = true;
            this._inputWindow.visible = true;
            this._inputWindow.activate();
            this._inputWindow.select(0);
        } else {
            this.load(this._deckWindow.index());
        }
    };

    Scene_Deck.prototype.onDeckCancel = function() {
        this._deckWindow.deselect();
        this._categoryWindow.activate();
    };
    
    Scene_Deck.prototype.onInputOk = function() {
        if (this._editWindow.name().length > 0) {
            this.save(this._deckWindow.index(), this._editWindow.name());
            this._editWindow.visible = false;
            this._editWindow.clear();
            this._inputWindow.visible = false;
            this._inputWindow.deactivate();
            this._deckWindow.activate();
            this._deckWindow.refresh();
        }
    };

    Scene_Deck.prototype.onInputCancel = function() {
        this._editWindow.visible = false;
        this._inputWindow.visible = false;
        this._inputWindow.deactivate();
        this._deckWindow.activate();
    };
    
    Scene_Deck.prototype.save = function(index, name) {
        var list = [];
        $gameParty.allMembers().forEach(function(actor) {
            var equips = [];
            actor._equips.forEach(function(equip) {
                equips.push({ dataClass: equip._dataClass, itemId: equip._itemId });
            });
            list[actor.actorId()] = equips;
        });
        var time = $gameSystem.playtime();
        var hours = String(Math.floor(time / 60 / 60));
        hours = ('00' + hours).slice(Math.min(-2, -hours.length));
        var minutes = ('00' + Math.floor(time / 60) % 60).slice(-2);
        var seconds = ('00' + time % 60).slice(-2);
        var data = { characters: $gameParty.charactersForSavefile(), name: name, list: list, time: [hours, minutes, seconds].join(':') + ' ' };
        _p($gameSystem).data[index] = data;
    };
    
    Scene_Deck.prototype.load = function(index) {
        var data = _p($gameSystem).data[index];
        var weightOver = false;
        if (data) {
            $gameParty.allMembers().forEach(function(actor) {
                actor.clearEquipments();
                var equips = data.list[actor.actorId()];
                var equips2 = [];
                var weight_total = 0;
                var weight_limit = 99999;
                if (actor.weightLimit) {
                    weight_limit = actor.weightLimit();
                }
                if (equips) {
                    // インデックス、重量の情報付き装備配列を作成
                    equips.forEach(function(equip, index) {
                        var weight = 0;
                        if (equip.itemId) {
                            switch(equip.dataClass) {
                                case 'weapon':
                                    weight = +$dataWeapons[equip.itemId].meta['equip_weight'] || 0;
                                    break;
                                case 'armor':
                                    weight = +$dataArmors[equip.itemId].meta['equip_weight'] || 0;
                                    break;
                            }
                        }
                        equips2.push({ index: index, data: equip, weight: weight });
                    });
                    // 重量順にソート
                    equips2 = equips2.sort(function(a, b) {
                        return a.weight - b.weight;
                    });
                    // 装備を反映（重量上限に収まる範囲で）
                    equips2.forEach(function(equip) {
                        weight_total += equip.weight;
                        if (weight_total <= weight_limit) {
                            if (equip.data.itemId) {
                                switch(equip.data.dataClass) {
                                    case 'weapon':
                                        actor.changeEquip(equip.index, $dataWeapons[equip.data.itemId]);
                                        break;
                                    case 'armor':
                                        actor.changeEquip(equip.index, $dataArmors[equip.data.itemId]);
                                        break;
                                }
                            }
                        } else {
                            weightOver = true;
                        }
                    });
                }
            });
            // 重量上限を超えたら
            if (weightOver) {
                this._infoWindow.activate();
                this._infoWindow.show();
            } else {
                this.popScene();
            }
        } else {
            this._deckWindow.activate();
        }
    };

    //=========================================================================
    // Window_DeckCategory
    //=========================================================================

    function Window_DeckCategory() {
        this.initialize.apply(this, arguments);
    }

    Window_DeckCategory.prototype = Object.create(Window_HorzCommand.prototype);
    Window_DeckCategory.prototype.constructor = Window_DeckCategory;
    
    Window_DeckCategory.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_DeckCategory.prototype.maxCols = function() {
        return 2;
    };

    Window_DeckCategory.prototype.update = function() {
        Window_HorzCommand.prototype.update.call(this);
        if (this._deckWindow) {
            this._deckWindow.setCategory(this.currentSymbol());
        }
    };

    Window_DeckCategory.prototype.makeCommandList = function() {
        this.addCommand(_SAVE_CATEGORY_TEXT, 'save');
        this.addCommand(_LOAD_CATEGORY_TEXT, 'load');
    };

    Window_DeckCategory.prototype.setDeckWindow = function(deckWindow) {
        this._deckWindow = deckWindow;
        this.update();
    };

    //=========================================================================
    // Window_DeckList
    //=========================================================================

    function Window_DeckList() {
        this.initialize.apply(this, arguments);
    }

    Window_DeckList.prototype = Object.create(Window_Selectable.prototype);
    Window_DeckList.prototype.constructor = Window_DeckList;
    
    Window_DeckList.prototype.initialize = function(x, y) {
        Window_Selectable.prototype.initialize.call(this, x, y, Graphics.width, Graphics.height - y);
        this.refresh();
    };

    Window_DeckList.prototype.setCategory = function(category) {
        if (this._category !== category) {
            this._category = category;
            this.refresh();
        }
    };

    Window_DeckList.prototype.loadData = function() {
        this._data = [];
        for (var i = 0; i < _MAX_DECK_NUMBER; i++) {
            if (_p($gameSystem).data[i]) {
                this._data.push(_p($gameSystem).data[i]);
            } else {
                this._data.push({ characters: null, name: '', list: null, time: '' });
            }
        }
    };

    Window_DeckList.prototype.maxCols = function() {
        return 1;
    };

    Window_DeckList.prototype.maxItems = function() {
        return _MAX_DECK_NUMBER;
    };

    Window_DeckList.prototype.itemHeight = function() {
        var innerHeight = this.height - this.padding * 2;
        return Math.floor(innerHeight / 5);
    };

    Window_DeckList.prototype.drawItem = function(index) {
        var item = this._data[index];
        if (item) {
            var rect = this.itemRect(index);
            var valid = this._category === 'save' || !!item.list;
            this.changePaintOpacity(valid);
            this.drawText([_INDEX_TEXT, ' ', index + 1].join(''), rect.x, rect.y, rect.width);
            this.drawText(item.name, rect.x + this.textWidth('デッキ 00  '), rect.y, rect.width);
            this.drawPartyCharacters(item.characters, rect.x + 220, rect.y + rect.height - 4);
            this.drawText(item.time, rect.x, rect.y + rect.height - this.lineHeight(), rect.width, 'right');
            this.changePaintOpacity(true);
        }
    };

    Window_DeckList.prototype.drawPartyCharacters = function(characters, x, y) {
        if (characters) {
            for (var i = 0; i < characters.length; i++) {
                var data = characters[i];
                this.drawCharacter(data[0], data[1], x + i * 48, y);
            }
        }
    };

    Window_DeckList.prototype.refresh = function() {
        this.loadData();
        this.createContents();
        this.drawAllItems();
    };

    Window_DeckList.prototype.playOkSound = function() {
        if (this._category === 'save') {
            SoundManager.playOk();
        } else {
            if (this._data[this.index()].list) {
                SoundManager.playLoad();
            } else {
                SoundManager.playBuzzer();
            }
        }
    };

    //=========================================================================
    // Window_DeckNameEdit
    //=========================================================================

    function Window_DeckNameEdit() {
        this.initialize.apply(this, arguments);
    }

    Window_DeckNameEdit.prototype = Object.create(Window_NameEdit.prototype);
    Window_DeckNameEdit.prototype.constructor = Window_DeckNameEdit;

    Window_DeckNameEdit.prototype.initialize = function(maxLength) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = (Graphics.boxWidth - width) / 2;
        var y = (Graphics.boxHeight - (height + this.fittingHeight(9) + 8)) / 2;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._name = '';
        this._index = 0;
        this._maxLength = maxLength;
        this._defaultName = this._name;
        this.deactivate();
        this.visible = false;
        this.refresh();
    };

    Window_NameEdit.prototype.windowHeight = function() {
        return this.fittingHeight(3);
    };

    Window_DeckNameEdit.prototype.faceWidth = function() {
        return 0;
    };

    Window_DeckNameEdit.prototype.left = function() {
        var nameCenter = (this.contentsWidth() + this.faceWidth()) / 2;
        var nameWidth = this._maxLength * this.charWidth();
        return Math.min(nameCenter - nameWidth / 2, this.contentsWidth() - nameWidth);
    };

    Window_DeckNameEdit.prototype.itemRect = function(index) {
        return {
            x: this.left() + index * this.charWidth(),
            y: (this.contentsHeight() - this.lineHeight()) / 2,
            width: this.charWidth(),
            height: this.lineHeight()
        };
    };

    Window_DeckNameEdit.prototype.refresh = function() {
        this.contents.clear();
        for (var i = 0; i < this._maxLength; i++) {
            this.drawUnderline(i);
        }
        for (var j = 0; j < this._name.length; j++) {
            this.drawChar(j);
        }
        var rect = this.itemRect(this._index);
        this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    };

    Window_DeckNameEdit.prototype.clear = function() {
        this._name = '';
        this._index = 0;
        this.refresh();
    };
    
    //=========================================================================
    // Window_DeckNameInput
    //=========================================================================

    function Window_DeckNameInput() {
        this.initialize.apply(this, arguments);
    }

    Window_DeckNameInput.prototype = Object.create(Window_NameInput.prototype);
    Window_DeckNameInput.prototype.constructor = Window_DeckNameInput;

    Window_DeckNameInput.prototype.initialize = function(editWindow) {
        Window_NameInput.prototype.initialize.call(this, editWindow);
        this.visible = false;
        this.deactivate();
    };
    
    Window_NameInput.prototype.processCancel = function() {
        this.processBack();
    };

    Window_NameInput.prototype.processBack = function() {
        SoundManager.playCancel();
        if (!this._editWindow.back()) {
            this.callCancelHandler();
        }
    };
    
    Window_NameInput.prototype.onNameOk = function() {
        if (this._editWindow.name() === '') {
            if (this._editWindow.restoreDefault()) {
                SoundManager.playOk();
            } else {
                SoundManager.playBuzzer();
            }
        } else {
            SoundManager.playSave();
            this.callOkHandler();
        }
    };

    //=========================================================================
    // Window_DeckInformation
    //=========================================================================

    function Window_DeckInformation() {
        this.initialize.apply(this, arguments);
    }

    Window_DeckInformation.prototype = Object.create(Window_Command.prototype);
    Window_DeckInformation.prototype.constructor = Window_DeckInformation;
    
    Window_DeckInformation.prototype.windowWidth = function() {
        return Graphics.boxWidth / 4 * 3;
    };
    
    Window_DeckInformation.prototype.itemTextAlign = function() {
        return 'center';
    };
    
    Window_DeckInformation.prototype.makeCommandList = function() {
        this.addCommand('重量オーバーのため一部装備を解除しました', 'submit');
    };

    Window_DeckInformation.prototype._updateCursor = function() {
        this._windowCursorSprite.visible = false;
    };

    //=========================================================================
    // Scene_Menu
    //=========================================================================

    var _alias_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _alias_Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('deck', this.commandDeck.bind(this));
    };
    
    Scene_Menu.prototype.commandDeck = function() {
        SceneManager.push(Scene_Deck);
    };
    
    //=========================================================================
    // Window_MenuCommand
    //=========================================================================

    var _alias_Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
    Window_MenuCommand.prototype.makeCommandList = function() {
        _alias_Window_MenuCommand_makeCommandList.call(this);
        this._list.splice(_MENU_COMMAND[1], 0, { name: _MENU_COMMAND[0], symbol: 'deck', enabled: true, ext: null });
    };
}());
