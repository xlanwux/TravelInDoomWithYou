//=============================================================================
// ADVTalkSystem.js
//=============================================================================

/*:
 * @plugindesc 恋愛ADVのような会話システム
 * @author こま
 *
 * @param Talk Mode Switch ID
 * @desc 会話モードのON/OFFを行うスイッチIDを指定してください。
 * @default 101
 *
 * @param Name Window Switch ID
 * @desc 名前ウインドウのON/OFFを行うスイッチIDを指定してください。
 * @default 102
 *
 * @param Center Mode Switch ID
 * @desc 中央モードのON/OFFを行うスイッチIDを指定してください。　　　（立ち絵表示が1人の場合に、中央に表示するモード）
 * @default 103
 *
 * @param Face Image Switch ID
 * @desc 顔画像表示のON/OFFを行うスイッチIDを指定してください。
 * @default 104
 *
 * @param Fixed Window Switch ID
 * @desc ウインドウ表示固定のON/OFFを行うスイッチIDを指定してください。
 * @default 105
 *
 * @param Fixed Picture Switch ID
 * @desc 立ち絵表示固定のON/OFFを行うスイッチIDを指定してください。
 * @default 106
 * 
 * @param Style ID Variable ID
 * @desc スタイルIDを指定する変数の先頭の変数IDを指定してください。
 * @default 81
 *
 * @param Left Picture ID
 * @desc 左側に表示する立ち絵に使用するピクチャ番号を指定してください。
 * @default 91
 *
 * @param Right Picture ID
 * @desc 右側に表示する立ち絵に使用するピクチャ番号を指定してください。
 * @default 92
 *
 * @param Message Skip Keys
 * @desc メッセージスキップを実行するキーを指定してください。　　　　（複数指定可）
 * @default shift, control
 *
 * @param Hide Window Keys
 * @desc メッセージウインドウ非表示を実行するキーを指定してください。（複数指定可）
 * @default pagedown
 *
 * @param Name Window Padding Vertical
 * @desc 名前ウインドウの縦方向の余白を指定してください。
 * @default 18
 *
 * @param Name Window Padding Horizontal
 * @desc 名前ウインドウの横方向の余白を指定してください。
 * @default 36
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
    
    //=========================================================================
    // X座標補正（ユーザー設定）
    //=========================================================================

    // '顔画像ファイル名' : X座標補正量　の形で指定してください。
    const _OFFSET_X = {
        'Actor1' : 0,
        'Actor2' : 0,
        'Actor3' : 0,
    };
    
    //=========================================================================
    // X座標補正ここまで
    //=========================================================================

    const _PLUGIN = 'ADVTalkSystem';
    const _PARAMETERS = PluginManager.parameters(_PLUGIN);

    //=========================================================================
    // プラグインパラメータ
    //=========================================================================

    const _SWID_TALK_MODE     = (+_PARAMETERS['Talk Mode Switch ID'])     || 101;
    const _SWID_NAME_WINDOW   = (+_PARAMETERS['Name Window Switch ID'])   || 102;
    const _SWID_CENTER_MODE   = (+_PARAMETERS['Center Mode Switch ID'])   || 103;
    const _SWID_FACE_IMAGE    = (+_PARAMETERS['Face Image Switch ID'])    || 104;
    const _SWID_FIXED_WINDOW  = (+_PARAMETERS['Fixed Window Switch ID'])  || 105;
    const _SWID_FIXED_PICTURE = (+_PARAMETERS['Fixed Picture Switch ID']) || 106;
    
    const _VARID_STYLEID = (+_PARAMETERS['Style ID Variable ID']) || 81;
    
    const _PICID_L = (+_PARAMETERS['Left Picture ID'])  || 91;
    const _PICID_R = (+_PARAMETERS['Right Picture ID']) || 92;
    
    const _MESSAGE_SKIP_KEYS = _PARAMETERS['Message Skip Keys'].split(/, */);
    const _HIDE_WINDOW_KEYS  = _PARAMETERS['Hide Window Keys'].split(/, */);
    
    const _NAME_WINDOW_PADDING_V = (+_PARAMETERS['Name Window Padding Vertical']) || 18;
    const _NAME_WINDOW_PADDING_H = (+_PARAMETERS['Name Window Padding Horizontal']) || 36;

    //=========================================================================
    // 自作関数
    //=========================================================================

    /**
     * プラグインプロパティ
     */
    function pprop(obj) {
        return obj[_PLUGIN] = obj[_PLUGIN] || {};
    }
    
    /**
     * スイッチ判定マクロ
     */
    function IS_TALKMODE()     { return $gameSwitches.value(_SWID_TALK_MODE);                      }
    function IS_NAMEWINDOW()   { return $gameSwitches.value(_SWID_NAME_WINDOW)   && IS_TALKMODE(); }
    function IS_CENTERMODE()   { return $gameSwitches.value(_SWID_CENTER_MODE)   && IS_TALKMODE(); }
    function IS_FACEIMAGE()    { return $gameSwitches.value(_SWID_FACE_IMAGE)    && IS_TALKMODE(); }
    function IS_FIXEDWINDOW()  { return $gameSwitches.value(_SWID_FIXED_WINDOW)  && IS_TALKMODE(); }
    function IS_FIXEDPICTURE() { return $gameSwitches.value(_SWID_FIXED_PICTURE) && IS_TALKMODE(); }
    
    /**
     * 立ち絵登録
     */
    function setStandingPicture(face_name, face_id, position) {
        var screen = pprop($gameScreen);
        
        // 初期化処理
        screen.standingPicture = screen.standingPicture || [
            { name: '', x: 0, offset_x: 0, tone: [0, 0, 0, 0], erase: {} },
            { name: '', x: 0, offset_x: 0, tone: [0, 0, 0, 0], erase: {} }
        ];
        
        if (position == 0 || position == 2) {
            var index = (position == 2) ? 0 : 1;

            // ピクチャ名を作成
            var pic_name = '';
            if (face_name !== '' ) {
                var num = face_name.match(/\d+$/);
                var style = (num) ? $gameVariables.value(_VARID_STYLEID + +num[0] - 1) : 0;
                pic_name = face_name + '_' + (face_id + 1) + (style ? '_' + style : '');
            }
            
            // 立ち絵情報登録
            screen.standingPicture[index].name = pic_name;
            screen.standingPicture[index].offset_x = _OFFSET_X[face_name];
            screen.standingPicture[index].tone = [0, 0, 0, 0];
            screen.standingPicture[index].erase = null;
            
            // 反対側の立ち絵は暗くする
            screen.standingPicture[index ? 0 : 1].tone = [-96, -96, -96, 0];

            // 事前読み込み
            if (pic_name !== '') {
                ImageManager.loadPicture(pic_name);
            }
        } else {
            // ウインドウ位置が中央の場合は立ち絵を左右とも暗くする
            screen.standingPicture[0].tone = [-96, -96, -96, 0];
            screen.standingPicture[1].tone = [-96, -96, -96, 0];
        }
        
        // X座標設定
        screen.standingPicture[0].x = Graphics.width / 4;
        screen.standingPicture[1].x = Graphics.width / 4 * 3;
        if (IS_CENTERMODE()) {
            if (screen.standingPicture[0].erase !== null) {
                screen.standingPicture[1].x = Graphics.width / 2;
            }
            if (screen.standingPicture[1].erase !== null) {
                screen.standingPicture[0].x = Graphics.width / 2;
            }
        }
        screen.standingPicture[0].x += (screen.standingPicture[0].offset_x || 0);
        screen.standingPicture[1].x += (screen.standingPicture[1].offset_x || 0);
    }
    
    /**
     * 立ち絵更新
     */
    function updateStandingPicture() {
        if (!pprop($gameScreen).standingPicture) {
            return;
        }
        for (var i = 0; i < 2; i++) {
            var id = (i ? _PICID_R : _PICID_L);
            var current = $gameScreen.picture(id);
            var next = pprop($gameScreen).standingPicture[i];
            
            // キャラクター消去
            if (current && next.erase !== null) {
                if ((current._targetOpacity !== next.erase.opacity) || (current._toneTarget[0] !== next.erase.tone)) {
                    var tone = next.erase.tone;
                    current._targetOpacity = next.erase.opacity;
                    current._duration = next.erase.duration;
                    current._toneTarget = [tone, tone, tone, 0];
                    current._toneDuration = next.erase.duration;
                } else if ((current._opacity == next.erase.opacity) && (current._tone[0] == next.erase.tone)) {
                    $gameScreen.erasePicture(id);
                    next.name = '';
                }
            } else {
                // キャラクター変更
                if (isCharacterChange(current, next)) {
                    var bmp = ImageManager.loadPicture(next.name);
                    var width = bmp.width;
                    var height = bmp.height;

                    // 画像サイズが取得できなかったら次回再読み込み
                    if (width == 0 || height == 0) {
                        continue;
                    }

                    $gameScreen.showPicture(id, next.name, 1, next.x, Graphics.height - height / 2, 100, 100, 0, 0);
                    current = $gameScreen.picture(id);
                    current._targetOpacity = 255;
                    current._duration = 15;
                    current._tone = [-96, -96, -96, 0];
                    current._toneTarget = [0, 0, 0, 0];
                    current._toneDuration = 15;
                // ピクチャ変更
                } else if (isPictureChange(current, next)) {
                    var bmp = ImageManager.loadPicture(next.name);
                    var width = bmp.width;
                    var height = bmp.height;

                    // 画像サイズが取得できなかったら次回再読み込み
                    if (width == 0 || height == 0) {
                        continue;
                    }

                    current._name = next.name;
                }
                // 座標変更
                if (isPositionChange(current, next)) {
                    current._targetX = next.x;
                    current._duration = 15;
                }
                // 色調変更
                if (isToneChange(current, next)) {
                    current._toneTarget = next.tone.slice();
                    current._toneDuration = next.tone_duration || 15;
                }
            }
        }
    }
    
    /**
     * キャラクター変更判定
     */
    function isCharacterChange(current, next) {
        if (next.name === '') {
            return false;
        }
        if (!current || current._targetOpacity == 0) {
            return true;
        }
        var current_chara = current.name().match(/^[^_]+_/);
        var next_chara = next.name.match(/^[^_]+_/);
        return (current_chara[0] !== next_chara[0]);
    }
    
    /**
     * ピクチャ変更判定
     */
    function isPictureChange(current, next) {
        if (!current || next.name === '') {
            return false;
        }
        return (current.name() !== next.name);
    }

    /**
     * 座標移動判定
     */
    function isPositionChange(current, next) {
        if (!current || next.name === '') {
            return false;
        }
        return (current._targetX !== next.x);
    }
    
    /**
     * 色調変更判定
     */
    function isToneChange(current, next) {
        if (!current || next.name === '') {
            return false;
        }
        return current._toneTarget.some(function(value, index) { return next.tone[index] !== value; });
    }
    
    //=========================================================================
    // Scene_Map
    //=========================================================================
    
    /**
     * メッセージスキップ時にも高速化
     */
    var _alias_Scene_Map_isFastForward = Scene_Map.prototype.isFastForward;
    Scene_Map.prototype.isFastForward = function() {
        var skip = _MESSAGE_SKIP_KEYS.some(function(key) { return Input.isPressed(key) });
        return _alias_Scene_Map_isFastForward.call(this) || ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() && skip);
    };

    //=========================================================================
    // Game_Interpreter
    //=========================================================================

    /**
     * 会話モード時の表示制御
     */
    var _alias_Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function() {
        // 顔画像情報とウインドウ表示位置を取得
        var face_name = this._params[0];
        var face_id = this._params[1];
        var position = this._params[3];

        /* this._paramsを直接編集すると問題があるようなので、配列のコピーに置き換え */
        this._params = this._params.slice();

        // 顔画像非表示
        if (IS_TALKMODE() && !IS_FACEIMAGE() && (this._params[3] != 1)) {
            this._params[0] = '';
        }
        
        // ウインドウ位置を下に
        if (IS_TALKMODE()) {
            this._params[3] = 2;
        }

        var result = _alias_Game_Interpreter_command101.call(this);
        
        // 名前の取得
        var name = '';
        if (IS_NAMEWINDOW() && ($gameMessage._texts.length > 1)) {
            name = $gameMessage._texts.splice(0, 1)[0]; // 一行目を名前として設定
        }
        pprop($gameMessage)._name = name;   // 名前を保持

        // メッセージウインドウの行数を変更
        var msgwin = SceneManager._scene._messageWindow;
        var x = msgwin.x;
        var y = msgwin.y;
        var width = msgwin.width;
        var height = msgwin.fittingHeight(IS_TALKMODE() ? 3 : 4);
        msgwin.move(x, y, width, height);
        
        // 名前ウインドウ更新
        if (name !== '') {
            msgwin._nameWindow._text = name;
            msgwin._nameWindow.refresh();
        } else {
            msgwin._nameWindow.width = 0;
        }

        // 立ち絵登録
        if (IS_TALKMODE() && !IS_FIXEDPICTURE() && face_name !== '') {
            setStandingPicture(face_name, face_id, position);
        }
        
        return result;
    };

    //=========================================================================
    // Game_Screen
    //=========================================================================

    /**
     * 立ち絵更新
     */
    var _alias_Game_Screen_update = Game_Screen.prototype.update;
    Game_Screen.prototype.update = function() {
        updateStandingPicture();
        _alias_Game_Screen_update.call(this);
    }
    
    
    //=========================================================================
    // Window_Name
    //=========================================================================

    function Window_Name() {
        this.initialize.apply(this, arguments);
    }
    
    Window_Name.prototype = Object.create(Window_Base.prototype);
    Window_Name.prototype.constructor = Window_Name;

    /**
     * 初期化
     */
    Window_Name.prototype.initialize = function(messageWindow) {
        Window_Base.prototype.initialize.call(this, 0, 0, 0, this.fittingHeight(1));
        this._messageWindow = messageWindow;
        this._text = '';
        this.openness = 0;
    };

    Window_Name.prototype.standardPadding = function() {
        return Math.min(_NAME_WINDOW_PADDING_V, _NAME_WINDOW_PADDING_H);
    };
    
    /**
     * 更新
     */
    Window_Name.prototype.refresh = function() {
        this.width = this.textWidth(this._text) + _NAME_WINDOW_PADDING_H * 2;
        this.createContents();
        this.drawTextEx(this._text, _NAME_WINDOW_PADDING_H - this.standardPadding(), 0);
    };

    //=========================================================================
    // Window_Message
    //=========================================================================

    /**
     * 名前ウインドウ登録
     */
    var _alias_Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
    Window_Message.prototype.createSubWindows = function() {
        _alias_Window_Message_createSubWindows.call(this);
        this._nameWindow = new Window_Name(this);
    };
    
    /**
     * サブウインドウリストに名前ウインドウ追加
     */
    var _alias_Window_Message_subWindows = Window_Message.prototype.subWindows;
    Window_Message.prototype.subWindows = function() {
        return _alias_Window_Message_subWindows.call(this).concat(this._nameWindow);
    };

    /**
     * 名前ウインドウの表示位置設定
     */
    var _alias_Window_Message_open = Window_Message.prototype.open;
    Window_Message.prototype.open = function() {
        _alias_Window_Message_open.call(this);
        // ログ表示后に名前が消える件の対策
        if (!this._nameWindow._text && pprop($gameMessage)._name) {
            var width = this.width;
            var height = this.fittingHeight(IS_TALKMODE() ? 3 : 4);
            var x = this.x;
            var y = Graphics.height - height;
            this.move(x, y, width, height);

            // 名前ウインドウ更新
            this._nameWindow._text = pprop($gameMessage)._name;
            this._nameWindow.refresh();
        }
        this._nameWindow.x = this.x;
        this._nameWindow.y = this.y - this._nameWindow.height;
    };

    /**
     * メッセージウインドウ表示固定
     */
    var _alias_Window_Message_close = Window_Message.prototype.close;
    Window_Message.prototype.close = function() {
        if (!IS_FIXEDWINDOW()) {
            _alias_Window_Message_close.call(this);
        }
    };
    
    /**
     * メッセージスキップ処理
     */
    var _alias_Window_Message_isTriggered = Window_Message.prototype.isTriggered;
    Window_Message.prototype.isTriggered = function() {
        var triggerd1 = _alias_Window_Message_isTriggered.call(this);
        var triggerd2 = (Input.isTriggered('ok') || Input.isRepeated('cancel') || TouchInput.isRepeated());
        var triggerd = $gameParty.inBattle() ? triggerd1 : triggerd2;
        var skip = _MESSAGE_SKIP_KEYS.some(function(key) { return Input.isPressed(key) });
        this._pauseSkip = this._pauseSkip || skip;
        return triggerd || skip;
    };
    
    /**
     * メッセージウインドウ表示制御／ウインドウ非表示時の入力無効化
     */
    var _alias_Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        // メッセージウインドウ非表示処理
        var hide = _HIDE_WINDOW_KEYS.some(function(key) {return Input.isTriggered(key) });
        if (hide) {
            this.visible = !this.visible;
            this.subWindows().forEach(function(sub) {
                sub.visible = this.visible;
            }, this);
        }
        
        // 立ち絵更新
        if (pprop($gameScreen).standingPicture) {
            updateStandingPicture();
        }

        // ウインドウ非表示時はこれ以上何もしない
        if (!this.visible) {
            return;
        }

        _alias_Window_Message_update.call(this);

        // メッセージウインドウと名前ウインドウの同期
        if (!IS_NAMEWINDOW() && this._nameWindow.width) {
            this._nameWindow.width = 0;
        }
        this._nameWindow.openness = this.openness;

       // メッセージウインドウ表示固定解除
        if (!$gameMessage._texts.length && !IS_FIXEDWINDOW()) {
            this.close();
        }
    };

    //=========================================================================
    // Window_Selectable
    //=========================================================================
    
    /**
     * ウインドウ非表示時の入力無効化
     */
    var _alias_Window_Selectable_update = Window_Selectable.prototype.update;
    Window_Selectable.prototype.update = function() {
        if (SceneManager._scene instanceof Scene_Map && !this.visible) {
            return;
        }
        _alias_Window_Selectable_update.call(this);
    };

    //=========================================================================
    // Game_Interpreter
    //=========================================================================
    
    /**
     * プラグインコマンド
     */
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        var pictures = null;
        switch (command.toUpperCase()) {
            case 'ATS_ERASEPIC_L':
                pictures = [pprop($gameScreen).standingPicture[0]];
                break;
            case 'ATS_ERASEPIC_R':
                pictures = [pprop($gameScreen).standingPicture[1]];
                break;
            case 'ATS_ERASEPIC_LR':
                pictures = [
                    pprop($gameScreen).standingPicture[0],
                    pprop($gameScreen).standingPicture[1]
                ];
                break;
        }
        if (pictures) {
            pictures.forEach(function(picture) {
                picture.erase = {
                    opacity:  (+args[0]) || 0,
                    tone:     (+args[1]) || 0,
                    duration: (+args[2]) || 0
                }
            });
        }
    };
}());
