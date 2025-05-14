//===========================================================================
// MPI_ValueMonitor.js
//===========================================================================

/*:
 * @plugindesc 変数とスイッチを監視するウインドウを表示します。
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @param 一行の高さ
 * @desc リストの一行あたりの高さを指定してください。
 * @default 26
 *
 * @param フォントサイズ
 * @desc フォントサイズ（文字サイズ）を指定してください。
 * @default 20
 *
 * @param 余白
 * @desc リストの余白を指定してください。
 * @default 9
 *
 * @param 未選択項目の不透明度
 * @desc 未選択項目の不透明度を指定してください。
 * @default 100
 *
 * @param 編集モード時の文字色
 * @desc 編集モード時の文字色を指定してください。（Webカラー方式）
 * @default yellow
 *
 * @param 更新通知
 * @desc 値が変更された項目を画面演出で知らせる場合は true を指定してください。（true/false）
 * @default true
 *
 * @param 更新内容をデバッグコンソールに表示
 * @desc 値が変更された項目をデバッグコンソールに表示する場合は true を指定してください。（ture/false）
 * @default false
 * 
 * @help
 * [ 概要 ] ...
 *  変数とスイッチの値を監視するウインドウを新しく表示します。
 *
 * [ 監視ウインドウ表示 ] ...
 *  ゲーム画面でShiftキー＋F9キーを押して下さい。
 *
 * [ モード説明 ] ...
 *  監視ウインドウには2つの表示モードと2つの操作モードがあります。
 *  <表示モード>
 *  ・全項目表示モード：  全ての変数、スイッチを表示します。
 *  ・選択項目表示モード：選択状態の変数、スイッチのみを表示します。
 *    ※「選択状態」については操作説明を参照。
 *  <操作モード>
 *  ・監視モード：変数、スイッチの状態を監視します。編集はできません。
 *  ・編集モード：変数、スイッチの状態を変更できます。
 * 
 * [ モード切替 ] ...
 *  ・表示モード切替：監視ウインドウでF9キーを押して下さい。
 *  ・操作モード切替：監視ウインドウでShiftキー＋F9キーを押して下さい。
 *
 * [ 操作説明 ] ...
 *  <監視モード>
 *   ※全項目表示モードでのみ可能。
 *   ▽決定操作
 *     変数、スイッチを選択状態を変更します。
 *     選択状態となった変数、スイッチはハイライト表示されます。
 *   ▽キャンセル操作
 *     全ての変数、スイッチの選択状態を解除します。
 *  <編集モード>
 *   ▽決定操作
 *     変数：    値を+1します。
 *     スイッチ：ON/OFF状態を切替ます。
 *   ▽キャンセル操作
 *     変数：    値を-1します。
 *     スイッチ：ON/OFF状態を切替ます。
 * 
 *  ※ここでいう「決定操作」「キャンセル操作」とは、ツクールMVにおいて選択肢を
 *    決定、キャンセルするときの操作のことを指します。
 *    （決定操作の例）明滅している項目を左クリックする、Enterキーを押すなど
 *    （キャンセル操作の例）右クリックする、Escキーを押すなど
 * 
 * [ 更新内容のコンソール表示 ] ...
 *  プラグイン設定の「更新内容をデバッグコンソールに表示」をtrueにすると、値が更
 *  新された際に、その内容をデバッグコンソールに表示します。デバッグコンソールに
 *  表示する対象となる項目は、監視ウインドウに表示されているもののみです。なお、
 *  デバッグコンソールは「監視ウインドウ側でF8キーを押して表示された開発者ツール
 *  画面のデバッグコンソール」です。ゲーム画面側ではないのでご注意ください。
 * 
 * [ その他の仕様 ] ...
 *  表示モード、操作モード、および変数、スイッチの選択状態は、セーブデータに記録
 *  されます。セーブデータをロードすると、表示モードや選択状態はロードしたデータ
 *  のものになりますのでご注意ください。
 *  タイトル画面でモードや選択の切替ができますが、ニューゲームやコンティニューに
 *  より状態が上書きされますので、無駄な操作となります。
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
 *   Version 1.04  2018/09/06  RPGツクールMV Ver.1.6.1に対応
 *   Version 1.03  2017/04/10  更新内容をコンソールに表示する機能を追加。
 *   Version 1.02  2017/02/07  更新された項目を通知する機能を追加。
 *   Version 1.01  2017/02/05  編集モード追加。その他細かい修正。
 *   Version 1.00  2017/02/04  First edition.
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2017 Nekoma Otobuki
 */

var Imported = Imported || {};
Imported.MPI_ValueMonitor = true;

var Makonet = Makonet || {};
Makonet.VMN = {};

(function(){
    'use strict';

    var MPI         = Makonet.VMN;
    MPI.product     = 'MPI_ValueMonitor';
    MPI.parameters  = PluginManager.parameters(MPI.product);
    MPI.modules     = {};

    MPI.line_height = +MPI.parameters['一行の高さ'];
    MPI.font_size   = +MPI.parameters['フォントサイズ'];
    MPI.padding     = +MPI.parameters['余白'];
    MPI.opacity     = +MPI.parameters['未選択項目の不透明度'];
    MPI.color       =  MPI.parameters['編集モード時の文字色'].trim();
    MPI.notify      =  MPI.parameters['更新通知'].trim().toLowerCase() === 'true';
    MPI.console     =  (MPI.parameters['更新内容をデバッグコンソールに表示'] || '').trim().toLowerCase() === 'true';

    var _ = MPI.product;

    if (!Utils.isOptionValid('test')) return;

    MPI.child_window = null;
    MPI.is_child = !!window.opener && !!window.opener['$gameSystem'];
    MPI.request_refresh = 0;

    //==============================================================================
    // Sprite_Notify
    //==============================================================================

    function Sprite_Notify() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Notify.prototype = Object.create(Sprite.prototype);
    Sprite_Notify.prototype.constructor = Sprite_Notify;

    Sprite_Notify.prototype.initialize = function(x, y, width, height) {
        Sprite.prototype.initialize.call(this);
        this.x = x + width / 2;
        this.y = y + height / 2;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.opacity = 240;
        this.bitmap = new Bitmap(width, height);
        this.bitmap.fillAll('#ffffff');
        this.bitmap.clearRect(1, 1, width - 2, height - 2);
        this._duration = 10;
    };

    Sprite_Notify.prototype.update = function(){
        Sprite.prototype.update.call(this);
        if (--this._duration < 0) {
            this.parent.removeChild(this);
        } else {
            this.scale.x += 0.01;
            this.scale.y += 0.1;
            this.opacity = parseInt(this._duration / 10 * 240);
        }
    };

    //==============================================================================
    // Window_ValueList
    //==============================================================================

    function Window_ValueList() {
        this.initialize.apply(this, arguments);
    }

    Window_ValueList.prototype = Object.create(Window_Selectable.prototype);
    Window_ValueList.prototype.constructor = Window_ValueList;

    Window_ValueList.prototype.initialize = function(){
        this._item_name = null;
        this._item_value = null;
        this._selected_item = [];
        this._view_mode = 0;
        this._edit_mode = false;
        this._max_items = 0;
        this._prev_data = null;
        this._prev_value = [];
        Window_Selectable.prototype.initialize.apply(this, arguments);
        this.setHandler('ok', this.onOk.bind(this));
        this.setHandler('cancel', this.onCancel.bind(this));
        this.select(0);
        this.refresh();
    };

    Window_ValueList.prototype._refreshArrows = function() {
        var w = this._width;
        var h = this._height;
        var p = 24;
        var q = p/2;
        var sx = 96+p;
        var sy = 0+p;
        this._downArrowSprite.bitmap = this._windowskin;
        this._downArrowSprite.anchor.x = 0.5;
        this._downArrowSprite.anchor.y = 0.5;
        this._downArrowSprite.setFrame(sx+q, sy+q+p, p, q);
        this._downArrowSprite.move(w-20, h-q);
        this._upArrowSprite.bitmap = this._windowskin;
        this._upArrowSprite.anchor.x = 0.5;
        this._upArrowSprite.anchor.y = 0.5;
        this._upArrowSprite.setFrame(sx+q, sy, p, q);
        this._upArrowSprite.move(w-20, q);
    };

    Window_ValueList.prototype.lineHeight = function() {
        return MPI.line_height;
    };

    Window_ValueList.prototype.standardFontSize = function() {
        return MPI.font_size;
    };

    Window_ValueList.prototype.standardPadding = function() {
        return MPI.padding;
    };

    Window_ValueList.prototype.maxItems = function() {
        return (this._view_mode) ? this._selected_item.length : (this._max_items || 0);
    };

    Window_ValueList.prototype.translucentOpacity = function() {
        return MPI.opacity;
    };

    // トリアコンタンさんの「ChangeWindowTouchPolicy」に雑に対応
    if (PluginManager._scripts.contains('ChangeWindowTouchPolicy')) {
        // ChangeWindowTouchPolicyから一部流用
        Window_ValueList.prototype.processTouch = function() {
            if (this.isOpenAndActive()) {
                if ((TouchInput.isMoved() || TouchInput.isTriggered()) && this.isTouchedInsideFrame()) {
                    this.onTouch(TouchInput.isTriggered());
                } else if (TouchInput.isCancelled() && this.isTouchedInsideFrame()) {
                    if (this.isCancelEnabled()) {
                        if (this._edit_mode) {
                            this._touching = true;
                            this.onTouchCancel();
                        } else {
                            this.processCancel();
                        }
                    }
                }
            }
        };
    } else {
        Window_ValueList.prototype.processTouch = function() {
            if (this.isOpenAndActive()) {
                if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
                    this._touching = true;
                    this.onTouch(true);
                } else if (TouchInput.isCancelled()) {
                    if (this.isCancelEnabled() && this.isTouchedInsideFrame()) {
                        if (this._edit_mode) {
                            this._touching = true;
                            this.onTouchCancel();
                        } else {
                            this.processCancel();
                        }
                    }
                }
                if (this._touching) {
                    if (TouchInput.isPressed()) {
                        this.onTouch(false);
                    } else {
                        this._touching = false;
                    }
                }
            } else {
                this._touching = false;
            }
        };
    }

    Window_ValueList.prototype.onTouchCancel = function() {
        var lastIndex = this.index();
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        var hitIndex = this.hitTest(x, y);
        if (hitIndex >= 0) {
            if (hitIndex === this.index()) {
                this.processCancel();
            } else if (this.isCursorMovable()) {
                this.select(hitIndex);
            }
        } else if (this._stayCount >= 10) {
            if (y < this.padding) {
                this.cursorUp();
            } else if (y >= this.height - this.padding) {
                this.cursorDown();
            }
        }
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    };

    Window_ValueList.prototype.drawItem = function(index) {
        var item_index = (this._view_mode) ? this._selected_item[index] : index + 1;
        var value = this._item_value.value(item_index);
        var value_text = '';
        if (this._item_value instanceof window.opener.Game_Switches) {
            value_text = value ? 'ON' : 'OFF';
        } else {
            value_text = String(value);
        }
        var rect = this.itemRectForText(index);
        this.changeTextColor(this._edit_mode ? MPI.color : 'white');
        this.changePaintOpacity(this._selected_item.contains(item_index));
        this.drawText('[' + item_index.padZero(4) + ']' + this._item_name[item_index], rect.x, rect.y, rect.width);
        this.drawText(value_text, rect.x, rect.y, rect.width - 20, 'right');
        if (this._item_value === this._prev_data && this._prev_value[index]) {
            if (item_index === this._prev_value[index].item_index &&
                    value !== this._prev_value[index].value) {
                    if (MPI.notify) {
                        var x = this._windowContentsSprite.x + rect.left;
                        var y =  this._windowContentsSprite.y + rect.top;
                        var width = rect.right - rect.left;
                        var height = rect.bottom - rect.top;
                        var sprite = new Sprite_Notify(x, y, width, height);
                        this.addChild(sprite);
                    }
                    if (MPI.console) {
                        var type = 'V';
                        var id = item_index.padZero(4);
                        var name = this._item_name[item_index];
                        var v1 = this._prev_value[index].value;
                        var v2 = value;
                        if (this._item_value instanceof window.opener.Game_Switches) {
                            type = 'S'
                            v1 = v1 ? 'ON' : 'OFF';
                            v2 = v2 ? 'ON' : 'OFF';
                        }
                        console.log('[' + type + id + ']' + name + ': ' + v1 + '->' + v2);
                    }
            }
        }
        this._prev_value[index] = { item_index: item_index, value: value };
    };

    Window_ValueList.prototype.drawAllItems = function(){
        Window_Selectable.prototype.drawAllItems.call(this);
        this._prev_data = this._item_value;
    };

    Window_ValueList.prototype.onOk = function(){
        var selected_index = this.index();
        var item_index = (this._view_mode) ? this._selected_item[selected_index] : selected_index + 1;
        if (this._edit_mode) {
            var value = this._item_value.value(item_index);
            if (this._item_value instanceof window.opener.Game_Variables) {
                if (typeof value === 'number') {
                    value++;
                }
            } else {
                value = !value;
            }
            this._item_value.setValue(item_index, value);
            this._prev_value[selected_index].item_index = item_index;
            this._prev_value[selected_index].value = value;
        } else if (this._view_mode === 0) {
            var found_index = this._selected_item.indexOf(item_index);
            if (found_index < 0) {
                this._selected_item.push(item_index);
                this._selected_item.sort(function(a,b){return a-b});
            } else {
                this._selected_item.splice(found_index, 1);
            }
        }
        this.activate();
        this.refresh();
    };

    Window_ValueList.prototype.onCancel = function(){
        if (this._edit_mode) {
            var selected_index = this.index();
            var item_index = (this._view_mode) ? this._selected_item[selected_index] : selected_index + 1;
            var value = this._item_value.value(item_index);
            if (this._item_value instanceof window.opener.Game_Variables) {
                if (typeof value === 'number') {
                    value--;
                }
            } else {
                value = !value;
            }
            this._item_value.setValue(item_index, value);
            this._prev_value[selected_index].item_index = item_index;
            this._prev_value[selected_index].value = value;
        } else if (this._view_mode === 0) {
            this._selected_item.splice(0);
        }
        this.activate();
        this.refresh();
    };

    Window_ValueList.prototype.processOk = function() {
        if (this.isCurrentItemEnabled()) {
            if (this._edit_mode) {
                SoundManager.playCursor();
            } else if (this._view_mode === 0) {
                this.playOkSound();
            }
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    Window_ValueList.prototype.processCancel = function() {
        if (this._edit_mode) {
            SoundManager.playCursor();
        } else if (this._view_mode === 0) {
            SoundManager.playCancel();
        }
        this.updateInputData();
        this.deactivate();
        this.callCancelHandler();
    };

    MPI.modules['Window_ValueList'] = Window_ValueList;

    //==============================================================================
    // Window_VariableList
    //==============================================================================

    function Window_VariableList() {
        this.initialize.apply(this, arguments);
    }

    Window_VariableList.prototype = Object.create(Window_ValueList.prototype);
    Window_VariableList.prototype.constructor = Window_VariableList;

    Window_VariableList.prototype.refresh = function(){
        if (window.opener.$gameSystem) {
            this._item_name = $dataSystem['variables'];
            this._item_value = window.opener.$gameVariables;
            this._selected_item = window.opener.$gameSystem[_].selected_variable;
            this._view_mode = window.opener.$gameSystem[_].only_selected_item ? 1 : 0;
            this._edit_mode = window.opener.$gameSystem[_].edit_mode;
            this._max_items = $dataSystem['variables'].length - 1;
            this._prev_value.splice(this.maxItems());
        }
        Window_ValueList.prototype.refresh.call(this);
    };

    MPI.modules['Window_VariableList'] = Window_VariableList;

    //==============================================================================
    // Window_SwitchList
    //==============================================================================

    function Window_SwitchList() {
        this.initialize.apply(this, arguments);
    }

    Window_SwitchList.prototype = Object.create(Window_ValueList.prototype);
    Window_SwitchList.prototype.constructor = Window_SwitchList;

    Window_SwitchList.prototype.refresh = function(){
        if (window.opener.$gameSystem) {
            this._item_name = $dataSystem['switches'];
            this._item_value = window.opener.$gameSwitches;
            this._selected_item = window.opener.$gameSystem[_].selected_switch;
            this._view_mode = window.opener.$gameSystem[_].only_selected_item ? 1 : 0;
            this._edit_mode = window.opener.$gameSystem[_].edit_mode;
            this._max_items = window.opener.$dataSystem['switches'].length - 1;
            this._prev_value.splice(this.maxItems());
        }
        Window_ValueList.prototype.refresh.call(this);
    };

    MPI.modules['Window_SwitchList'] = Window_SwitchList;

    //==============================================================================
    // Scene_ValueMonitor
    //==============================================================================

    function Scene_ValueMonitor() {
        this.initialize.apply(this, arguments);
    }

    Scene_ValueMonitor.prototype = Object.create(Scene_Base.prototype);
    Scene_ValueMonitor.prototype.constructor = Scene_ValueMonitor;

    Scene_ValueMonitor.prototype.initialize = function(){
        Scene_Base.prototype.initialize.call(this);
        var width = Graphics.width / 2;
        var height = Graphics.height;
        this.variable_window = new Window_VariableList(0, 0, width, height);
        this.switch_window = new Window_SwitchList(width, 0, width, height);
        this.variable_window.activate();
        this.addChild(this.variable_window);
        this.addChild(this.switch_window);
    };

    Scene_ValueMonitor.prototype.update = function(){
        Scene_Base.prototype.update.call(this);
        if (TouchInput.isTriggered()) {
            if (TouchInput.x < (Graphics.width / 2)) {
                if (!this.variable_window.active) {
                    this.variable_window.activate();
                    this.switch_window.deactivate();
                    this.variable_window.processTouch();
                }
            } else {
                if (!this.switch_window.active) {
                    this.variable_window.deactivate();
                    this.switch_window.activate();
                    this.switch_window.processTouch();
                }
            }
        }
        if (Input.isTriggered('left')) {
            this.variable_window.activate();
            this.switch_window.deactivate();
        }
        if (Input.isTriggered('right')) {
            this.variable_window.deactivate();
            this.switch_window.activate();
        }
        if (Input.isTriggered('debug')) {
            if (Input.isPressed('shift')) {
                window.opener.$gameSystem[_].edit_mode = !window.opener.$gameSystem[_].edit_mode;
            } else {
                window.opener.$gameSystem[_].only_selected_item = !window.opener.$gameSystem[_].only_selected_item;
                this.variable_window.select(0);
                this.switch_window.select(0);
            }
            this.variable_window.refresh();
            this.switch_window.refresh();
        }
        if (MPI.request_refresh) {
            if (window.opener.$gameSystem) {
                this.variable_window.refresh();
                this.switch_window.refresh();
                if (MPI.request_refresh === 2) {
                    this.variable_window.activate();
                    this.variable_window.select(0);
                    this.switch_window.deactivate();
                    this.switch_window.select(0);
                }
                MPI.request_refresh = 0;
            }
        }
    };

    MPI.modules['Scene_ValueMonitor'] = Scene_ValueMonitor;

    //==============================================================================
    // SceneManager
    //==============================================================================

    (function(o, p) {
        var f = o[p]; o[p] = function() {
            f.apply(this, arguments);
            if (!MPI.is_child) {
                if (!MPI.child_window && Input.isPressed('shift') && Input.isTriggered('debug')) {
                    window.open('index.html?test');
                }
            } else {
                if (window.opener) {
                    if (window.opener.$gameSystem && !window.opener.Makonet.VMN.child_window) {
                        window.opener.Makonet.VMN.child_window = window;
                        MPI.request_refresh = 2;
                        window.addEventListener('unload', function(){
                            window.opener.Makonet.VMN.child_window = null;
                        });
                    }
                } else {
                    window.close();
                }
            }
        };
    }(SceneManager, 'update'));

    //==============================================================================
    // Scene_Boot
    //==============================================================================

    (function(o, p) {
        var f = o[p]; o[p] = function() {
            if (MPI.is_child) {
                DataManager.createGameObjects();
                SceneManager.goto(Scene_ValueMonitor);
                return;
            }
            f.apply(this, arguments);
        };
    }(Scene_Boot.prototype, 'start'));

    //==============================================================================
    // Scene_Map
    //==============================================================================

    (function(o, p) {
        var f = o[p]; o[p] = function() {
            return f.apply(this, arguments) && !Input.isPressed('shift');
        };
    }(Scene_Map.prototype, 'isDebugCalled'));

    //==============================================================================
    // Game_System
    //==============================================================================

    Object.defineProperty(Game_System.prototype, _, {
        get: function(){
            return this[`$${_}`] = this[`$${_}`] || { only_selected_item: false, selected_variable: [], selected_switch: [], edit_mode: false };
        },
        set: function(value) {
            this[`$${_}`] = value;
        },
        configurable: true
    });

    //==============================================================================
    // DataManager / Game_Variables / Game_Switches
    //==============================================================================

    (function(o, p) {
        var f = o[p]; o[p] = function() {
            f.apply(this, arguments);
            if (MPI.child_window) {
                MPI.child_window.Makonet.VMN.request_refresh = 2;
            }
        };
    }(DataManager, 'setupNewGame'));

    (function(o, p) {
        var f = o[p]; o[p] = function(contents) {
            f.apply(this, arguments);
            if (MPI.child_window) {
                MPI.child_window.Makonet.VMN.request_refresh = 2;
            }
        };
    }(DataManager, 'extractSaveContents'));

    (function(o, p) {
        var f = o[p]; o[p] = function() {
            f.apply(this, arguments);
            if (MPI.child_window) {
                MPI.child_window.Makonet.VMN.request_refresh = 1;
            }
        };
    }(Game_Variables.prototype, 'onChange'));

    (function(o, p) {
        var f = o[p]; o[p] = function() {
            f.apply(this, arguments);
            if (MPI.child_window) {
                MPI.child_window.Makonet.VMN.request_refresh = 1;
            }
        };
    }(Game_Switches.prototype, 'onChange'));

}());
