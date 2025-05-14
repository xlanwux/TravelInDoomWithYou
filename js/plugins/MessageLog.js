//=============================================================================
// MessageLog.js
//=============================================================================

/*:
 * @plugindesc メッセージのログを表示
 * @author こま
 *
 * @param Message Log Key
 * @desc メッセージログを表示するキーを指定してください。　　　　　　（カンマ区切りで複数指定可）
 * @default pagedown, pageup
 *
 * @param Indent Width
 * @desc メッセージ本文のインデント幅を、半角文字数で指定してください。
 * @default 10
 *
 * @param Name List
 * @desc 名前として認識する文字列を指定してください。　　　　　　　　（カンマ区切りで複数指定可）
 * @default ニナ, ロブ
 *
 * @param Max Log Size
 * @desc ログを記録する最大行数を指定してください。
 * @default 100
 *
 * @param Open By Mouse Wheel
 * @desc マウスホイール操作でログを表示するようにする場合は、trueを指定してください。
 * @default false
 *
 * @param Close By Right Click
 * @desc マウスの右クリックでログを閉じるようにする場合は、trueを指定してください。
 * @default false
 *
 * @help *このプラグインには、プラグインコマンドはありません。
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
 *   Version 1.00  20xx/xx/xx  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  Web Site: http://i.gmobb.jp/nekoma/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 */

(function(){
    'use strict';
    
    const _PLUGIN = 'MessageLog';
    const _PARAMETERS = PluginManager.parameters(_PLUGIN);

    //=========================================================================
    // プラグインパラメータ
    //=========================================================================

    const _MESSAGE_LOG_KEY      =   _PARAMETERS['Message Log Key'].split(/, */);
    const _INDENT_WIDTH         = (+_PARAMETERS['Indent Width']) || 10;
    const _NAME_LIST            =   _PARAMETERS['Name List'].split(/, */);
    const _MAX_LOG_SIZE         = (+_PARAMETERS['Max Log Size']) || 100;
    const _OPEN_BY_MOUSE_WHEEL  =   _PARAMETERS['Open By Mouse Wheel'].toLowerCase() === 'true';
    const _CLOSE_BY_RIGHT_CLICK =   _PARAMETERS['Close By Right Click'].toLowerCase() === 'true';

    //=========================================================================
    // マクロ
    //=========================================================================

    /* プラグインプロパティ */
    function PLUGIN_PROPERTY(obj) { return obj[_PLUGIN] = obj[_PLUGIN] || {}; };
    
    /* メッセージログキー押下判定 */
    function IS_MESSAGELOGKEY() { return _MESSAGE_LOG_KEY.some(function(key) { return Input.isTriggered(key); }); }
    
    /* 名前判定 */
    function IS_NAME(text) { return (/^\\N\[\d+]$/i).test(text) || _NAME_LIST.some(function(name) { return text === name; }); }
    
    //=========================================================================
    // Game_Interpreter
    //=========================================================================

    /**
     * 文章表示内容をログに追加
     */
    var _alias_Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function() {
        var result = _alias_Game_Interpreter_command101.call(this);
        var _gameScreen = PLUGIN_PROPERTY($gameScreen);
        _gameScreen.log = _gameScreen.log || [];
        Array.prototype.push.apply(_gameScreen.log, $gameMessage._texts);
        _gameScreen.log.push(null);
        
        // ログ上限制御
        while (_gameScreen.log.length > _MAX_LOG_SIZE) {
            do {
                var removed = _gameScreen.log.shift();
            } while (removed != null);
        }
        
        return result;
    }

    //=========================================================================
    // Scene_Map
    //=========================================================================

    /**
     * メッセージログ表示
     */
    var _alias_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        if (PLUGIN_PROPERTY($gameScreen).log && (IS_MESSAGELOGKEY() || (_OPEN_BY_MOUSE_WHEEL && TouchInput.wheelY != 0))){
            SceneManager.push(Scene_MessageLog);
        }
        _alias_Scene_Map_update.call(this);
    }
    
    //=========================================================================
    // Scene_MessageLog
    //=========================================================================

    function Scene_MessageLog() {
        this.initialize.apply(this, arguments);
    }
    
    Scene_MessageLog.prototype = Object.create(Scene_Base.prototype);
    Scene_MessageLog.prototype.constructor = Scene_MessageLog;
    
    Scene_MessageLog.prototype.initialize = function() {
        Scene_Base.prototype.initialize.apply(this, arguments);
    }
    
    Scene_MessageLog.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        this.createWindow();
    };

    Scene_MessageLog.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_MessageLog.prototype.createWindow = function() {
        this._window = new Window_MessageLog();
        this.addWindow(this._window);
    }
    
    Scene_MessageLog.prototype.update = function() {
        if (Input.isTriggered('cancel') || (_CLOSE_BY_RIGHT_CLICK && TouchInput.isCancelled())) {
            this.popScene();
        }
        Scene_Base.prototype.update.call(this);
    }

    //=========================================================================
    // Window_MessageLog
    //=========================================================================

    function Window_MessageLog() {
        this.initialize.apply(this, arguments);
    }
    
    Window_MessageLog.prototype = Object.create(Window_Base.prototype);
    Window_MessageLog.prototype.constructor = Window_MessageLog;
    
    Window_MessageLog.prototype.initialize = function() {
        Window_Base.prototype.initialize.call(this, 0, 0, Graphics.width, Graphics.height);
        this.setBackgroundType(1);
        this.enabled = !(Input.isPressed('pageup') || Input.isPressed('pagedown'));
        var log1 = PLUGIN_PROPERTY($gameScreen).log;
        var log2 = [];
        // ログの整形（名前表示対応）
        if (log1.length > 0) {
            var text;
            var newline = true;
            var is_name = false;
            for (var i = 0; i < log1.length; i++) {
                if (log1[i]) {
                    // メッセージ一行目が名前の場合
                    if (newline && IS_NAME(log1[i])) {
                        text = log1[i];
                        // 名前と本文の間にスペースを挿入
                        var name_len = this.textWidth(this.convertEscapeCharacters(log1[i]));
                        var indent_len = this.textWidth(Array(_INDENT_WIDTH - 1).join(' '));
                        if (name_len < indent_len) {
                            var indent = Math.round((indent_len - name_len) / this.textWidth(' '));
                            text += Array(indent + 1).join(' ');
                        }
                        text += ('「' + log1[i + 1]);
                        if (log1[i + 2] === null) {
                            text += '」';
                        }
                        i++;
                        is_name = true;
                    // 名前以外 OR 二行目以降
                    } else {
                        text = Array(_INDENT_WIDTH + 1).join(' ') + log1[i];
                        if (is_name && (log1[i + 1] === null)) {
                            text += '」';
                        }
                    }
                    log2.push(text);
                    newline = false;
                } else {
                    log2.push(null);
                    newline = true;
                    is_name = false;
                }
            }
        }
        
        if (log2.length > 0) {
            // ログの全体サイズが画面サイズを超える場合
            if (this.contentsHeight() < (this.lineHeight() * log2.length)) {
                this.contents = new Bitmap(Graphics.width, this.lineHeight() * log2.length);
                this.origin.y = this.contents.height - this.contentsHeight();
                this.downArrowVisible = true;
            }
            // ログ描画
            for (var i = 0; i < log2.length; i++) {
                if (log2[i]) {
                    this.drawTextEx(log2[i], 0, this.lineHeight() * i, this.contentsWidth());
                }
            }
        }
    }
    
    Window_MessageLog.prototype.scrollMax = function() {
        return this.contents.height - Graphics.height + this.standardPadding() * 2;
    }
    
    Window_MessageLog.prototype.isPageUp = function() {
        return ((this.origin.y > 0) && (
            Input.isPressed('pageup') || Input.isPressed('up') ||
            (TouchInput.isPressed() && TouchInput.y <= this.standardPadding()) ||
            (TouchInput.wheelY < 0)
        ));
    }

    Window_MessageLog.prototype.isPageDown = function() {
        return ((this.origin.y < this.scrollMax()) && (
            Input.isPressed('pagedown') || Input.isPressed('down') ||
            (TouchInput.isPressed() && TouchInput.y >= (Graphics.height - this.standardPadding())) ||
            (TouchInput.wheelY > 0)
        ));
    }
    
    Window_MessageLog.prototype.update = function() {
        this.enabled = this.enabled || !(Input.isPressed('pageup') || Input.isPressed('pagedown'));
        if (this.enabled) {
            if (this.isPageUp()) {
                this.origin.y -= 6;
                if (TouchInput.wheelY < 0) {
                    this.origin.y -= 12;
                }
            } else if (this.isPageDown()) {
                this.origin.y += 6;
                if (TouchInput.wheelY > 0) {
                    this.origin.y += 12;
                }
            }
            this.origin.y.clamp(0, this.scrollMax());
            this.upArrowVisible = (this.origin.y > 0);
            this.downArrowVisible = (this.origin.y < this.scrollMax());
        }
        Window_Base.prototype.update.call(this);
    }

    //=========================================================================
    // Window_ChoiceList
    //=========================================================================

    var _alias_Window_ChoiceList_textWidthEx = Window_ChoiceList.prototype.textWidthEx;
    Window_ChoiceList.prototype.textWidthEx = function(text) {
        if (this._windowContentsSprite) {
            return _alias_Window_ChoiceList_textWidthEx.call(this, text);
        }
        var window = new Window_Base(0, Graphics.height, Graphics.width, 50);
        return window.drawTextEx(text, 0, 0);
    };
}());
