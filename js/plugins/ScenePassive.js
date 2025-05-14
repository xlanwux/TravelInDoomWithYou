(function(){
    'use strict';

    //==============================================================================
    // Scene_Passive
    //==============================================================================

    function Scene_Passive() {
        this.initialize.apply(this, arguments);
    }
    window.Scene_Passive = Scene_Passive;

    Scene_Passive.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Passive.prototype.constructor = Scene_Passive;

    Scene_Passive.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_Passive.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createNameWindow();
        this.createListWindow();
    };

    Scene_Passive.prototype.createNameWindow = function() {
        var width = Graphics.boxWidth / 2;
        this.name_window1 = new Window_PassiveName(0, 0, 0, width);
        this.name_window2 = new Window_PassiveName(1, width, 0, width);
        this.addWindow(this.name_window1);
        this.addWindow(this.name_window2);
    };

    Scene_Passive.prototype.createListWindow = function() {
        var width = Graphics.boxWidth / 2;
        var y = this.name_window1.height;
        this.list_window1 = new Window_PassiveList(0, 0, y, width);
        this.list_window2 = new Window_PassiveList(1, width, y, width);
        this.addWindow(this.list_window1);
        this.addWindow(this.list_window2);
        this.list_window1.setHandler('cancel', this.popScene.bind(this));
    };

    //==============================================================================
    // Window_PassiveName
    //==============================================================================

    function Window_PassiveName() {
        this.initialize.apply(this, arguments);
    }

    Window_PassiveName.prototype = Object.create(Window_Base.prototype);
    Window_PassiveName.prototype.constructor = Window_PassiveName;

    Window_PassiveName.prototype.initialize = function(index, x, y, width) {
        Window_Base.prototype.initialize.call(this, x, y, width, this.lineHeight() + this.standardPadding() * 2);
        this.drawText($gameParty.members()[index].name(), 8, 0, Graphics.width / 2);
    };

    Window_PassiveName.prototype.standardPadding = function() {
        return 10;
    };

    //==============================================================================
    // Window_PassiveList
    //==============================================================================

    function Window_PassiveList() {
        this.initialize.apply(this, arguments);
    }

    Window_PassiveList.prototype = Object.create(Window_Selectable.prototype);
    Window_PassiveList.prototype.constructor = Window_PassiveList;

    Window_PassiveList.prototype.initialize = function(index, x, y, width) {
        this.texts = [];
        Window_Selectable.prototype.initialize.call(this, x, y, width, Graphics.boxHeight - y);
        this.createTraitList($gameParty.members()[index].equips());
        this.refresh();
        this.activate();
    };

    Window_PassiveList.prototype.maxItems = function() {
        return this.texts.length;
    };
    
    Window_PassiveList.prototype.isCursorVisible = function() {
        return false;
    };

    Window_PassiveList.prototype.cursorDown = function(wrap) {
        var index = this.topRow() + this.maxPageRows() - 1;
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
            this.select((index + maxCols) % maxItems);
        }
    };

    Window_PassiveList.prototype.cursorUp = function(wrap) {
        var index = this.topRow();
        var maxItems = this.maxItems();
        var maxCols = this.maxCols();
        if (index >= maxCols || (wrap && maxCols === 1)) {
            this.select((index - maxCols + maxItems) % maxItems);
        }
    };

    Window_PassiveList.prototype.createTraitList = function(equips) {
        equips.forEach(function(equip) {
            if (equip) {
                if (equip.meta['passive_text']) {
                    this.texts.push(equip.meta['passive_text']);
                } else {
                    equip.traits.forEach(function(trait) {
                        if (trait) {
                            if (trait.code !== 43 || trait.value === 1) {
                                this.texts.push(this.makeTraitText(trait));
                            }
                        }
                    }, this);
                }
            }
        }, this);
    };

    Window_PassiveList.prototype.drawItem = function(index) {
        var text = this.texts[index];
        if (text) {
            var rect = this.itemRect(index);
            this.drawText(text, rect.left, rect.top, rect.right - rect.left);
        }
    };

    Window_PassiveList.prototype.makeTraitText = function(trait) {
        var text = '';
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
                text = $dataStates[trait.dataId].name + '無効';
                break;
            case 21:
                text = $dataSystem.terms.params[trait.dataId] + '*' + percent + '%';
                break;
            case 22:
                word = ['命中率', '回避率', '会心率', '会心回避率', '魔法回避率', '魔法反射率', '反撃率', 'HP再生率', 'MP再生率', 'TP再生率'];
                text = word[trait.dataId] + ope + percent + '%';
                break;
            case 23:
                word = ['狙われ率', '防御効果', '回復効果', '薬の知識', 'MP消費', 'TPチャージ', '物理ダメージ', '魔法ダメージ', '床ダメージ', '経験値獲得'];
                text = word[trait.dataId] + '*' + percent + '%';
                break;
            case 31:
                text = $dataSystem.elements[trait.dataId] + '属性攻撃';
                break;
            case 32:
                text = $dataStates[trait.dataId].name + '攻撃(' + percent + '%)';
                break;
            case 33:
                text = '攻撃速度' + ope + trait.value;
                break;
            case 34:
                text = '攻撃次数' + ope + trait.value + '回';
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
                word = ['自動戦闘', '防御', '身代わり', 'TP持ち越し'];
                text = word[trait.dataId];
                break;
            case 63:
                word = ['通常', 'ボス', '瞬間消去', '消えない'];
                text = '消滅エフェクト(' + word[trait.dataId] + ')';
                break;
            case 64:
                word = ['エンカウント半減', 'エンカウント無効', '不意打ち無効', '先制攻撃率アップ', '獲得金額2倍', 'アイテム入手率2倍'];
                text = word[trait.dataId];
                break;
        }
        return text;
    };

    //==============================================================================
    // SoundManager
    //==============================================================================

    (function(o,p){
        var f=o[p];o[p]=function(){
            if (!(SceneManager._scene instanceof Scene_Passive))
                f.apply(this,arguments);
        };
    }(SoundManager,'playCursor'));
}());
