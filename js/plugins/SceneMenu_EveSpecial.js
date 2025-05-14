(function(){
    'use strict';

    // 画像はimg/systemフォルダに入れて下さい。

    var MenuLayout = {};
    MenuLayout.passiveDisableSwitch = 11;    // ONのとき、Passiveを無効にするスイッチの番号
    MenuLayout.background = {
        variable_id: 8,           // 背景画像を指定する変数の番号
        images: [
            'Menu_Background1',     // 変数の値が0のときに表示する背景画像
            'Menu_Background2',     // 変数の値が1のときに以下同文
            'Menu_Background3',     // 以下同文
            'Menu_Background4'      // 以下略（なお、画像名のリストは増やせます）
        ]
    };
    MenuLayout.command = {
        contents: {
            height:   64,                                           // コマンド1列あたりの高さ
            offset_x: 0,                                            // コマンドボタン画像の座標調整（X座標）
            offset_y: 0 },                                          // コマンドボタン画像の座標調整（Y座標）
        cursor: { image: { file: 'Menu_Cmd_Cursor' },               // 選択中カーソル用画像
                  blink: { cycle: 90,                               // 選択中カーソルの明滅1回の時間
                           opacity: { min: 72,                      // 明滅の不透明度（一番薄い時）
                                      max: 192 } } },               // 明滅の不透明度（一番濃い時）
        select: { image: { file: 'Menu_Cmd_Select' },               // 選択した瞬間に表示するアニメーション画像
                  pattern:  10,                                     // アニメーションパターン数
                  wait:     2,                                      // アニメーションのウェイト数
                  origin:   0.5,                                    // アニメーションの原点（0:左上、0.5:中心）
                  offset_x: 40,                                      // アニメーション画像の座標調整（X座標）
                  offset_y: 20                                       // アニメーション画像の座標調整（Y座標）
        },
        item:        { image: { file: 'Menu_Cmd_Item' } },          // コマンドボタン画像
        action:      { image: { file: 'Menu_Cmd_Action'} },         // 以下同
        passive:     { image: { file: 'Menu_Cmd_Passive'} },
        option:      { image: { file: 'Menu_Cmd_Option'} },
        shadow:      { image: { file: 'Menu_Cmd_Shadow'} },
        s_memory:    { image: { file: 'Menu_Cmd_S-Memory'} },
        information: { image: { file: 'Menu_Cmd_Information'} },
        save:        { image: { file: 'Menu_Cmd_Save'} }
    };
    MenuLayout.status = {};
    MenuLayout.status.sp = {                                    // SP
        image: { file:  'Menu_Sts_Sp',                          // ステータス名画像
                 x:     18,                                     // ステータス名画像のX座標
                 y:     300 },                                  // ステータス名画像のY座標
        value: { x:     142,                                    // ステータス値のX座標
                 y:     334,                                    // ステータス値のY座標
                 width: 256,                                    // ステータス値の表示範囲
                 align: 'right',                                // ステータス値の字寄せ
                 variable_id: { current: 85,                    // 現在SPの変数番号
                                max:     84 } },                // 最大SPの変数番号
        gauge: { x:      172,                                   // ゲージのX座標
                 y:      334,                                   // ゲージのY座標
                 width:  220,                                   // ゲージの長さ
                 color1: '#3B0B0B',                             // ゲージの色1
                 color2: '#FE2E2E' }                            // ゲージの色2（色1～色2のグラデーションになります）
    };
    MenuLayout.status.money = {                                 // マネー
        image: { file:  'Menu_Sts_Money',                       // （以下、SPと同じ）
                 x:     MenuLayout.status.sp.image.x,
                 y:     MenuLayout.status.sp.image.y + 80 },
        value: { x:     MenuLayout.status.sp.value.x,
                 y:     MenuLayout.status.sp.value.y + 80,
                 width: MenuLayout.status.sp.value.width,
                 align: 'right' }
    };
    MenuLayout.status.level = {                                 // レベル
        image: { file:  'Menu_Sts_Level',                       // （以下、SPと同じ）
                 x:     MenuLayout.status.money.image.x,
                 y:     MenuLayout.status.money.image.y + 80 },
        value: { x:     MenuLayout.status.money.value.x+40,
                 y:     MenuLayout.status.money.value.y + 80,
                 width: MenuLayout.status.money.value.width,
                 align: 'center' }
    };
    MenuLayout.status.exp = {                                   // 経験値
        image: { file:  'Menu_Sts_Exp',                         // （以下、SPと同じ）
                 x:     MenuLayout.status.level.image.x,
                 y:     MenuLayout.status.level.image.y + 80 },
        value: { x:     MenuLayout.status.level.value.x-40,
                 y:     MenuLayout.status.level.value.y + 80,
                 width: MenuLayout.status.level.value.width,
                 align: 'right' },
        gauge: { x:      MenuLayout.status.level.value.x,
                 y:      MenuLayout.status.level.value.y + 80,
                 width:  MenuLayout.status.level.value.width-50,
                 color1: '#191970',                             // ゲージの色1
                 color2: '#1E90FF' }
    };

    //==============================================================================
    // SceneManager
    //==============================================================================

    (function(o,p){
        var f=o[p];o[p]=function(sceneClass){
            if (sceneClass === Scene_Menu) {
                sceneClass = Scene_MenuEve;
            }
            f.call(this, sceneClass);
        };
    }(SceneManager,'goto'));

    //==============================================================================
    // Scene_MenuEve
    //==============================================================================

    function Scene_MenuEve() {
        this.initialize.apply(this, arguments);
    }
    window.Scene_MenuEve = Scene_MenuEve;

    Scene_MenuEve.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_MenuEve.prototype.constructor = Scene_MenuEve;

    Scene_MenuEve.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_MenuEve.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCommandWindow();
        this.createStatusWindow();
    };

    Scene_MenuEve.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadSystem(MenuLayout.background.images[$gameVariables.value(MenuLayout.background.variable_id)]);
        this.addChild(this._backgroundSprite);
    };

    Scene_MenuEve.prototype.createCommandWindow = function() {
        this.command_window = new Window_MenuEveCommand();
        this.command_window.setHandler('item',        function(){ SceneManager.push(Scene_Item) });
        this.command_window.setHandler('action',      this.onAction.bind(this));
        this.command_window.setHandler('passive',     function(){ SceneManager.push(Scene_Passive) });
        this.command_window.setHandler('option',      function(){ SceneManager.push(Scene_Options) });
        this.command_window.setHandler('shadow',      this.onShadow.bind(this));
        this.command_window.setHandler('s_memory',    function(){ SceneManager.push(Scene_Deck) });
        this.command_window.setHandler('information', function(){ SceneManager.push(Scene_Glossary) });
        this.command_window.setHandler('save',        function(){ SceneManager.push(Scene_Save) });
        this.command_window.setHandler('cancel',      this.popScene.bind(this));
        this.addWindow(this.command_window);
    };

    Scene_MenuEve.prototype.createStatusWindow = function() {
        this.status_window = new Window_MenuEveStatus(this.command_window.windowHeight());
        this._windowLayer.addChildAt(this.status_window, 0);
    };

    Scene_MenuEve.prototype.onAction = function() {
        $gameParty.setMenuActor($gameParty.members()[0]);
        SceneManager.push(Scene_Skill);
    };

    Scene_MenuEve.prototype.onShadow = function() {
        $gameParty.setMenuActor($gameParty.members()[0]);
        SceneManager.push(Scene_Equip);
    };

    //==============================================================================
    // Window_MenuEveCommand
    //==============================================================================

    function Window_MenuEveCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_MenuEveCommand.prototype = Object.create(Window_Command.prototype);
    Window_MenuEveCommand.prototype.constructor = Window_MenuEveCommand;

    Window_MenuEveCommand.prototype.initialize = function() {
        this.loadImages();
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.selectSymbol(Window_MenuCommand._lastCommandSymbol);
        this.createCursor();
        this.refresh();
        this.opacity = 0;
    };

    Window_MenuEveCommand.prototype.loadImages = function() {
        this.images = {
            cursor:      ImageManager.loadSystem(MenuLayout.command.cursor.image.file),
            select:      ImageManager.loadSystem(MenuLayout.command.select.image.file),
            item:        ImageManager.loadSystem(MenuLayout.command.item.image.file),
            action:      ImageManager.loadSystem(MenuLayout.command.action.image.file),
            passive:     ImageManager.loadSystem(MenuLayout.command.passive.image.file),
            option:      ImageManager.loadSystem(MenuLayout.command.option.image.file),
            shadow:      ImageManager.loadSystem(MenuLayout.command.shadow.image.file),
            s_memory:    ImageManager.loadSystem(MenuLayout.command.s_memory.image.file),
            information: ImageManager.loadSystem(MenuLayout.command.information.image.file),
            save:        ImageManager.loadSystem(MenuLayout.command.save.image.file)
        };
    };

    Window_MenuEveCommand.prototype.lineHeight = function() {
        return MenuLayout.command.contents.height;
    };

    Window_MenuEveCommand.prototype.standardPadding = function() {
        return 8;
    };

    Window_MenuEveCommand.prototype.textPadding = function() {
        return 4;
    };

    Window_MenuEveCommand.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_MenuEveCommand.prototype.maxCols = function() {
        return 4;
    };

    Window_MenuEveCommand.prototype.itemTextAlign = function() {
        return 'center';
    };

    Window_MenuEveCommand.prototype.isCursorVisible = function() {
        return false;
    };

    Window_MenuEveCommand.prototype.makeCommandList = function() {
        this.addCommand('', 'item');
        this.addCommand('', 'action');
        this.addCommand('', 'passive', !MenuLayout.passiveDisableSwitch || !$gameSwitches.value(MenuLayout.passiveDisableSwitch));
        this.addCommand('', 'option');
        this.addCommand('', 'shadow');
        this.addCommand('', 's_memory');
        this.addCommand('', 'information');
        this.addCommand('', 'save');
    };

    Window_MenuEveCommand.prototype.createCursor = function() {
        var layout = MenuLayout.command.cursor;
        var rect = this.itemRect(0);
        this.cursorSprite = new Sprite(this.images.cursor);
        this.cursorSprite.x = rect.left + MenuLayout.command.contents.offset_x;
        this.cursorSprite.y = rect.top + MenuLayout.command.contents.offset_y;
        this.cursorSprite.opacity = layout.blink.opacity.min;
        this.blink = {
            duration: Math.floor(layout.blink.cycle / 2),
            turn: false
        };
        this._windowContentsSprite.addChild(this.cursorSprite);
    };

    Window_MenuEveCommand.prototype.refresh = function() {
        Window_Command.prototype.refresh.call(this);
        this.drawContent('item', 0);
        this.drawContent('action', 1);
        this.drawContent('passive', 2);
        this.drawContent('option', 3);
        this.drawContent('shadow', 4);
        this.drawContent('s_memory', 5);
        this.drawContent('information', 6);
        this.drawContent('save', 7);
    };

    Window_MenuEveCommand.prototype.drawContent = function(type, index) {
        var rect = this.itemRect(index);
        var image = this.images[type];
        if (image.width) {
            var layout = MenuLayout.command.contents;
            this.contents.bltImage(image, 0, 0, image.width, image.height, rect.left + layout.offset_x, rect.top + layout.offset_y);
        } else {
            image.addLoadListener(this.drawContent.bind(this, type, index));
        }
    };

    Window_MenuEveCommand.prototype.update = function() {
        var last_index = this.index();
        Window_Command.prototype.update.call(this);
        this.updateCursor(last_index);
        this.updateSelectAnimation(last_index);
    };

    Window_MenuEveCommand.prototype.updateCursor = function(last_index) {
        if (this.cursorSprite) {
            var layout = MenuLayout.command.cursor;
            var rect = this.itemRect(this.index());
            this.cursorSprite.x = rect.left + MenuLayout.command.contents.offset_x;
            this.cursorSprite.y = rect.top + MenuLayout.command.contents.offset_y;
            if (this.index() === last_index) {
                if (this.blink.turn) {
                    this.cursorSprite.opacity -= Math.floor((this.cursorSprite.opacity - layout.blink.opacity.min) / this.blink.duration);
                } else {
                    this.cursorSprite.opacity += Math.floor((layout.blink.opacity.max - this.cursorSprite.opacity) / this.blink.duration);
                }
                this.blink.duration--;
                if (this.blink.duration === 0) {
                    this.blink.duration = Math.floor(layout.blink.cycle / 2);
                    this.blink.turn = !this.blink.turn;
                }
            } else {
                this.cursorSprite.opacity = layout.blink.opacity.min;
                this.blink.duration = Math.floor(layout.blink.cycle / 2);
                this.blink.turn = false;
            }
        }
    };

    Window_MenuEveCommand.prototype.updateSelectAnimation = function(last_index) {
        if (this.index() !== last_index) {
            var sprite = new Sprite_SelectAnimation(this.images.select);
            var rect = this.itemRect(this.index());
            sprite.x = rect.left + this._windowContentsSprite.x + MenuLayout.command.select.offset_x;
            sprite.y = rect.top + this._windowContentsSprite.y + MenuLayout.command.select.offset_y;
            sprite.anchor.x = sprite.anchor.y = MenuLayout.command.select.origin;
            this.addChildAt(sprite, 0);
        }
    };

    Window_MenuEveCommand.prototype.processOk = function() {
        Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
        Window_Command.prototype.processOk.call(this);
    };

    //==============================================================================
    // Window_MenuEveStatus
    //==============================================================================

    function Window_MenuEveStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_MenuEveStatus.prototype = Object.create(Window_Base.prototype);
    Window_MenuEveStatus.prototype.constructor = Window_MenuEveStatus;

    Window_MenuEveStatus.prototype.initialize = function(y) {
        this.loadImages();
        Window_Base.prototype.initialize.call(this, 0, y, Graphics.boxWidth, Graphics.boxHeight - y);
        this.refresh();
        this.opacity = 0;
    };

    Window_MenuEveStatus.prototype.loadImages = function() {
        this.images = {
            sp:    ImageManager.loadSystem(MenuLayout.status.sp.image.file),
            money: ImageManager.loadSystem(MenuLayout.status.money.image.file),
            level: ImageManager.loadSystem(MenuLayout.status.level.image.file),
            exp:   ImageManager.loadSystem(MenuLayout.status.exp.image.file)
        };
    };

    Window_MenuEveStatus.prototype.refresh = function() {
        Window_Base.prototype.refresh.call(this);
        this.drawSp();
        this.drawMoney();
        this.drawLevel();
        this.drawExp();
    };

    Window_MenuEveStatus.prototype.drawSp = function() {
        var layout = MenuLayout.status.sp;
        var sp   = $gameVariables.value(layout.value.variable_id.current);
        var max  = $gameVariables.value(layout.value.variable_id.max);
        var text = sp + '/' + ('XXXX' + max).substr(-4, 4).replace(/X/g, '  ');
        var gauge = {
            x: layout.gauge.x,
            y: layout.gauge.y,
            width: layout.gauge.width,
            rate: sp / max,
            color1: layout.gauge.color1,
            color2: layout.gauge.color2
        };
        this.drawContent('sp', text, gauge);
    };

    Window_MenuEveStatus.prototype.drawMoney = function() {
        this.drawContent('money', String($gameParty.gold()));
    };

    Window_MenuEveStatus.prototype.drawLevel = function() {
        this.drawContent('level', String($gameActors.actor(1).level));
    };

    Window_MenuEveStatus.prototype.drawExp = function() {
        var layout = MenuLayout.status.exp;
        var actor = $gameActors.actor(1);
        var text = 'next level ' + ('XXXXXX' + actor.nextRequiredExp()).substr(-6, 6).replace(/X/g, '  ');
        var gauge = {
            x: layout.gauge.x,
            y: layout.gauge.y,
            width: layout.gauge.width,
            rate: (actor.currentExp() - actor.currentLevelExp()) / (actor.nextLevelExp() - actor.currentLevelExp()),
            color1: layout.gauge.color1,
            color2: layout.gauge.color2
        };
        this.drawContent('exp', text, gauge);
    };

    Window_MenuEveStatus.prototype.drawContent = function(type, text, gauge) {
        var image = this.images[type];
        if (image.width) {
            var layout = MenuLayout.status[type];
            var adjust_x = this.x + this.standardPadding();
            var adjust_y = this.y + this.standardPadding();
            var image_x = layout.image.x - adjust_x;
            var image_y = layout.image.y - adjust_y;
            var value_x = layout.value.x - adjust_x;
            var value_y = layout.value.y - adjust_y;
            var value_width = layout.value.width;
            var value_align = layout.value.align;
            this.contents.bltImage(image, 0, 0, image.width, image.height, image_x, image_y);
            if (gauge) {
                this.drawGauge(gauge.x - adjust_x, gauge.y - adjust_y, gauge.width, gauge.rate, gauge.color1, gauge.color2);
            }
            this.drawText(text, value_x, value_y, value_width, value_align);
        } else {
            image.addLoadListener(this.drawContent.bind(this, type, text, gauge));
        }
    };

    //==============================================================================
    // Sprite_SelectAnimation
    //==============================================================================

    function Sprite_SelectAnimation() {
        this.initialize.apply(this, arguments);
    }

    Sprite_SelectAnimation.prototype = Object.create(Sprite.prototype);
    Sprite_SelectAnimation.prototype.constructor = Sprite_SelectAnimation;

    Sprite_SelectAnimation.prototype.initialize = function(bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
        this.pattern_count = 0;
        this.wait_count = 0;
        this.visible = false;
        this.update();
    };

    Sprite_SelectAnimation.prototype.update = function() {
        Sprite.prototype.update.call(this);
        var layout = MenuLayout.command.select;
        this.wait_count++;
        if (this.wait_count > layout.wait) {
            this.wait_count = 0;
            this.pattern_count++;
            if (this.pattern_count > layout.pattern) {
                this.visible = false;
                this.parent.removeChild(this);
            }
        }
        if (this.bitmap && this.bitmap.width) {
            var width = this.bitmap.width;
            var height = this.bitmap.height;
            var pattern_height = Math.floor(height / layout.pattern);
            this.setFrame(0, pattern_height * this.pattern_count, width, pattern_height);
            this.visible = true;
        }
    };
}());
