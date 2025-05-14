//=============================================================================
// WinGetInfo.js
//=============================================================================

/*:
 * @plugindesc （プラグイン説明）
 * @author （作者名）
 *
 * @param Background Image
 * @desc 入手インフォの背景に表示する画像を指定してください。
 * （画像はimg/systemフォルダ内のものを使用します）
 * @default 
 *
 * @param First Position (Map)
 * @desc マップ画面で複数表示時、最初に表示される位置（Y座標）を指定してください。
 * @default 570
 *
 * @param First Position (Battle)
 * @desc バトル画面で複数表示時、最初に表示される位置（Y座標）を指定してください。
 * @default 120
 *
 * @param Display Time
 * @desc 入手インフォ表示時間（フェード時間を除く）を指定してください。（フレーム数）
 * @default 150
 *
 * @param Fade In Time
 * @desc 入手インフォ表示開始から完全に表示されるまでの時間を指定してください。（フレーム数）
 * @default 30
 *
 * @param Fade Out Time
 * @desc 入手インフォ消え始めから完全に消えるまでの時間を指定してください。（フレーム数）
 * @default 30
 *
 * @param Money Icon
 * @desc お金入手時に表示するアイコンIDを指定してください。
 * @default 314
 *
 * @param Money Text
 * @desc お金入手時に表示する文章を指定してください。
 * @default 入手
 * 
 * @param Variable Info Switch
 * @desc 変数増加時のインフォ表示を制御するスイッチ番号を指定してください。
 * @default 99
 *
 * @param SE FileName
 * @desc 入手インフォ表示時に鳴らすSEのファイル名を指定してください。
 * （拡張子不要。音声はaudio/seフォルダ内のものを使用します）
 * @default 
 *
 * @param SE Volume
 * @desc SEの音量を指定してください。
 * @default 90
 *
 * @param SE Pitch
 * @desc SEのピッチを指定してください。
 * @default 100
 *
 * @param SE Pan
 * @desc SEの位相を指定してください。
 * @default 0
 *
 * @param Fast Display Key 1
 * @desc 入手インフォ表示を高速化するキーを指定してください。
 * （バトル中のみ有効）
 * @default ok
 *
 * @param Fast Display Key 2
 * @desc 入手インフォ表示を高速化するキーを指定してください。
 * （バトル中のみ有効）
 * @default
 *
 * @param Fast Display Key 3
 * @desc 入手インフォ表示を高速化するキーを指定してください。
 * （バトル中のみ有効）
 * @default
 *
 * @param Fast Display Rate
 * @desc 入手インフォ表示の高速化率を指定してください。
 * （2で2倍、3で3倍、…）
 * @default 10
 *
 * @param Disable Switch
 * @desc 入手インフォを表示しないようにするスイッチを指定してください。このスイッチがONの間は入手インフォを表示しません。
 * @default 99
 * 
 * @help First Display Keyに指定できるキーは以下の通り。
 *
 *  tab         # Tabキー
 *  ok          # Enterキー、Spaceキー、Zキー
 *  shift       # Shiftキー
 *  control     # Ctrlキー、Altキー
 *  control     # Altキー
 *  escape      # ESCキー、Insertキー、Num0キー、Xキー
 *  pageup      # PageUpキー、Qキー
 *  pagedown    # PageDownキー、Wキー
 *  left        # ←キー、Num4キー
 *  up          # ↑キー、Num8キー
 *  right       # →キー、Num6キー
 *  down        # ↓キー、Num2キー
 *  debug       # F9キー
 * 
 * プラグインコマンド
 * 
 *  WGI_SetSubTextV [テキスト]
 *    変数増加時の「○○増加！」の「○○」を設定します。
 * 
 *  WGI_SetIconV [アイコン番号]
 *    変数増加時の変数名の前に表示されるアイコンを設定します。
 * 
 *  WGI_SetSe [ファイル名] [音量] [ピッチ] [位相]
 *    インフォ表示時のSEを変更します。
 * 
 *  WGI_ResetSe
 *    インフォ表示時のSEをプラグイン設定のものに戻します。
 */

(function(){
    'use strict';
    
    const _PLUGIN = 'WinGetInfo';
    const _PARAMETERS = PluginManager.parameters(_PLUGIN);
    
    const _BACKGROUND_IMAGE = _PARAMETERS['Background Image'];

    const _FIRST_POSITION_MAP = (+_PARAMETERS['First Position (Map)']) || 570;
    const _FIRST_POSITION_BATTLE = (+_PARAMETERS['First Position (Battle)']) || 160;
    
    const _DISPLAY_TIME = (+_PARAMETERS['Display Time']) || 150;
    const _FADE_IN_TIME = (+_PARAMETERS['Fade In Time']) || 30;
    const _FADE_OUT_TIME = (+_PARAMETERS['Fade Out Time']) || 30;
    
    const _MONEY_ICON = (+_PARAMETERS['Money Icon']) || 314;
    const _MONEY_TEXT = _PARAMETERS['Money Text'] || '';
    
    const _VARIABLE_INFO_SWITCH = (+_PARAMETERS['Variable Info Switch']) || 0;
    
    const _SE_FILENAME = _PARAMETERS['SE FileName'] || '';
    const _SE_VOLUME = (+_PARAMETERS['SE Volume']) || 90;
    const _SE_PITCH = (+_PARAMETERS['SE Pitch']) || 100;
    const _SE_PAN = (+_PARAMETERS['SE Pan']) || 0;
        
    const _IN_DISPLAY = _FADE_IN_TIME + _DISPLAY_TIME;
    const _IN_DISPLAY_OUT = _IN_DISPLAY + _FADE_OUT_TIME;
    
    const _FAST_DISPLAY_KEY = [
        _PARAMETERS['Fast Display Key 1'] || '',
        _PARAMETERS['Fast Display Key 2'] || '',
        _PARAMETERS['Fast Display Key 3'] || ''
    ];
    const _FAST_DISPLAY_RATE = (+_PARAMETERS['Fast Display Rate']) || 5;
    
    const _DISABLE_SWITCH = (+_PARAMETERS['Disable Switch']) || 99;
    
    //=========================================================================
    // Window_GetInfo
    //=========================================================================
    
    function Window_GetInfo() {
        this.initialize.apply(this, arguments);
    }
    
    Window_GetInfo.prototype = Object.create(Window_Base.prototype);
    Window_GetInfo.prototype.constructor = Window_GetInfo;
    
    Window_GetInfo.prototype.initialize = function(y, text, sub_text) {
        Window_Base.prototype.initialize.call(this, -4, y, Graphics.width + 8, this.fittingHeight(1));
        this.drawTextEx(text, 0, 0);
        this.opacity = 0;
        this.contentsOpacity = 0;
        this.duration = 0;
        this.disposed = false;
        this._subWindow = new Window_GetInfoSub(sub_text);
        this.addChild(this._subWindow);
    };
    
    Window_GetInfo.prototype.standardPadding = function() {
        return 10;
    };
    
    Window_GetInfo.prototype.loadWindowskin = function() {
        Window_Base.prototype.loadWindowskin.call(this);
        this._background = (_BACKGROUND_IMAGE) ? ImageManager.loadSystem(_BACKGROUND_IMAGE) : null;
        if (this._background) {
            this._background.addLoadListener(this._onWindowskinLoad.bind(this));
        }
    };
    
    Window_GetInfo.prototype._refreshBack = function() {
        if (this._background) {
            var sprite = this._windowBackSprite;
            sprite.bitmap = this._background;
            sprite.move(4, 4);
        } else {
            Window_Base.prototype._refreshBack.call(this);
        }
    };
    
    Window_GetInfo.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if ($gameMessage._texts.length > 0) {
            if (this.duration <= _IN_DISPLAY) {
                this.duration = _IN_DISPLAY + 1;
            }
        }
        if (this.duration <= _FADE_IN_TIME) {
            this.opacity = this.contentsOpacity = (this.duration / _FADE_IN_TIME) * 255
        } else if (this.duration > _IN_DISPLAY) {
            this.opacity = this.contentsOpacity = ((1 - (this.duration - _IN_DISPLAY) / _FADE_OUT_TIME) * 255)
            if (this.duration > _IN_DISPLAY_OUT) {
                this.disposed = true;
                this.parent.removeChild(this);
            }
        } else {
            this.opacity = this.contentsOpacity = 255;
        }
        var value = $gameParty.inBattle() && _FAST_DISPLAY_KEY.some(function(key) { return Input.isPressed(key); }) ? _FAST_DISPLAY_RATE : 1;
        this.duration += value;
    };
    
    Window_GetInfo.prototype._refreshFrame = function() {
    };

    Window_GetInfo.prototype._refreshCursor = function() {
    };
    
    Window_GetInfo.prototype._refreshArrows = function() {
    };
    
    Window_GetInfo.prototype._refreshPauseSign = function() {
    };

    //=========================================================================
    // Window_GetInfoSub
    //=========================================================================
    
    class Window_GetInfoSub extends Window_GetInfo {
        constructor(text) {
            super(text);
        }
        
        initialize(text) {
            let bmp = new Bitmap();
            bmp.fontSize = this.standardFontSize();
            let width = bmp.measureTextWidth(text);
            Window_Base.prototype.initialize.call(this, 0, -22, width + 10, 30);
            this.drawTextEx(text, 5, 0);
            this.opacity = 0;
            this.contentsOpacity = 0;
            this.duration = 0;
            this.disposed = false;
        }

        standardFontSize() {
            return 18;
        }

        standardPadding() {
            return 2;
        }
    }

    //=========================================================================
    // Scene_Map
    //=========================================================================

    var _alias_Scene_Map_stop = Scene_Map.prototype.stop;
    Scene_Map.prototype.stop = function() {
        _alias_Scene_Map_stop.call(this);
        $gameScreen._hiddenGetInfo();
    }
    
    //=========================================================================
    // Scene_Battle
    //=========================================================================

    var _alias_Scene_Battle_stop = Scene_Battle.prototype.stop;
    Scene_Battle.prototype.stop = function() {
        _alias_Scene_Battle_stop.call(this);
        $gameScreen._hiddenGetInfo();
    }

    //=========================================================================
    // Game_Screen
    //=========================================================================

    Game_Screen.prototype._showGetInfo = function(item, amount, is_all) {
        if ($gameSwitches.value(_DISABLE_SWITCH)) {
            return;
        }
        this._infoWindow = this._infoWindow || [];
        var lastIndex = this._infoWindow.length - 1;
        var y = $gameParty.inBattle() ? _FIRST_POSITION_BATTLE : _FIRST_POSITION_MAP;
        var height = 74;
        if (lastIndex >= 0) {
            y = this._infoWindow[lastIndex].y + ($gameParty.inBattle() ? height : -height);
        }
        var text = '';
        let sub_text = '';
        switch (item.type) {
        case 'money':
            text = '\\I[' + _MONEY_ICON + ']' + (is_all ? '' : '\\C[7]') + amount + TextManager.currencyUnit + _MONEY_TEXT;
            sub_text = '获得！';
            break;
        case 'variable':
            let category = '';
            let icon = '';
            if ($gameSystem.__win_get_info) {
                category = $gameSystem.__win_get_info.sub_text_v;
                if ($gameSystem.__win_get_info.icon_v) {
                    icon = '\\I[' + $gameSystem.__win_get_info.icon_v + ']';
                }
            }
            text = icon + (is_all ? '' : '\\C[7]') + item.name + "　+" + amount;
            sub_text = category + '！';
            break;
        default:
            text = '\\I[' + item.iconIndex + ']' + (is_all ? '' : '\\C[7]') + item.name + ' x' + amount;
            if (DataManager.isItem(item)) {
                sub_text = '获得！';
            } else if (DataManager.isWeapon(item)) {
                sub_text = '获得点数！';
            } else {
                sub_text = '获得！';
            }
        }
        var window = new Window_GetInfo(y, text, sub_text);
        this._infoWindow.push(window);
        SceneManager._scene.addWindow(window);
        let se = ($gameSystem.__win_get_info && $gameSystem.__win_get_info.se) ? $gameSystem.__win_get_info.se : {};
        let name = (se.name !== void 0) ? se.name : _SE_FILENAME;
        let volume = (se.volume !== void 0) ? se.volume : _SE_VOLUME;
        let pitch = (se.pitch !== void 0) ? se.pitch : _SE_PITCH;
        let pan = (se.pan !== void 0) ? se.pan : _SE_PAN;
        AudioManager.playSe({
            name:   name,
            pan:    pan,
            pitch:  pitch,
            volume: volume
        });
    };
    
    Game_Screen.prototype._updateGetInfo = function() {
        if (this._infoWindow) {
            this._infoWindow = this._infoWindow.filter(function(window) {
                return !window.disposed;
            });
        }
    };
    
    Game_Screen.prototype._hiddenGetInfo = function() {
        if (this._infoWindow) {
            this._infoWindow.forEach(function(window) {
                window.visible = false;
            });
            this._infoWindow = [];
        }
    }
    
    var _alias_Game_Screen_update = Game_Screen.prototype.update;
    Game_Screen.prototype.update = function() {
        _alias_Game_Screen_update.call(this);
        this._updateGetInfo();
    };
    
    //=========================================================================
    // Game_Interpreter
    //=========================================================================

    {
        let __pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            __pluginCommand.apply(this, arguments);
            switch (command.toLowerCase()) {
            case 'wgi_setsubtextv':
                $gameSystem.__win_get_info = $gameSystem.__win_get_info || {};
                $gameSystem.__win_get_info.sub_text_v = args[0] || '';
                break;
            case 'wgi_seticonv':
                $gameSystem.__win_get_info = $gameSystem.__win_get_info || {};
                $gameSystem.__win_get_info.icon_v = +args[0] || 0;
                break;
            case 'wgi_setse':
                $gameSystem.__win_get_info = $gameSystem.__win_get_info || {};
                $gameSystem.__win_get_info.se = {};
                $gameSystem.__win_get_info.se.name = args[0] || void 0;
                $gameSystem.__win_get_info.se.volume = +args[1] || void 0;
                $gameSystem.__win_get_info.se.pitch = +args[2] || void 0;
                $gameSystem.__win_get_info.se.pan = +args[3] || void 0;
                break;
            case 'wgi_resetse':
                $gameSystem.__win_get_info = $gameSystem.__win_get_info || {};
                $gameSystem.__win_get_info.se = {};
                break;
            }
        };
        
        let __command122 = Game_Interpreter.prototype.command122;
        Game_Interpreter.prototype.command122 = function() {
            let id = this._params[0];
            let old_value = $gameVariables.value(id);
            let result = __command122.apply(this, arguments);
            let new_value = $gameVariables.value(id);
            if (_VARIABLE_INFO_SWITCH === 0 || $gameSwitches.value(_VARIABLE_INFO_SWITCH)) {
                $gameScreen._showGetInfo({ type: 'variable', name: $dataSystem.variables[id] }, new_value - old_value, true);
            }
            return result;
        };
    }

    var _alias_Game_Interpreter_command125 = Game_Interpreter.prototype.command125;
    Game_Interpreter.prototype.command125 = function() {
        var gold = $gameParty._gold;
        var result = _alias_Game_Interpreter_command125.call(this);
        var value = this.operateValue(this._params[0], this._params[1], this._params[2]);
        var new_gold = $gameParty._gold;
        if (value > 0) {
            $gameScreen._showGetInfo({ type: 'money' }, value, value == (new_gold - gold));
        }
        return result;
    };

    var _alias_Game_Interpreter_command126 = Game_Interpreter.prototype.command126;
    Game_Interpreter.prototype.command126 = function() {
        var item = $dataItems[this._params[0]];
        var container = $gameParty.itemContainer(item);
        var number = 0;
        var new_number = 0;
        if (container) {
            number = $gameParty.numItems(item);
        }
        var result = _alias_Game_Interpreter_command126.call(this);
        var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        if (container) {
            new_number = $gameParty.numItems(item);
        }
        if (value > 0) {
            $gameScreen._showGetInfo(item, value, value == (new_number - number));
        }
        return result;
    };

    var _alias_Game_Interpreter_command127 = Game_Interpreter.prototype.command127;
    Game_Interpreter.prototype.command127 = function() {
        var item = $dataWeapons[this._params[0]];
        var container = $gameParty.itemContainer(item);
        var number = 0;
        var new_number = 0;
        if (container) {
            number = $gameParty.numItems(item);
        }
        var result = _alias_Game_Interpreter_command127.call(this);
        var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        if (container) {
            new_number = $gameParty.numItems(item);
        }
        var amount = new_number - number;
        if (value > 0) {
            $gameScreen._showGetInfo(item, value, value == (new_number - number));
        }
        return result;
    };

    var _alias_Game_Interpreter_command128 = Game_Interpreter.prototype.command128;
    Game_Interpreter.prototype.command128 = function() {
        var item = $dataArmors[this._params[0]];
        var container = $gameParty.itemContainer(item);
        var number = 0;
        var new_number = 0;
        if (container) {
            number = $gameParty.numItems(item);
        }
        var result = _alias_Game_Interpreter_command128.call(this);
        var value = this.operateValue(this._params[1], this._params[2], this._params[3]);
        if (container) {
            new_number = $gameParty.numItems(item);
        }
        var amount = new_number - number;
        if (value > 0) {
            $gameScreen._showGetInfo(item, value, value == (new_number - number));
        }
        return result;
    };

}());
