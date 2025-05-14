(function(){
    'use strict';

    // 画像はすべて「img/system」フォルダに入れてください。

    let SETTINGS = {
        /* 背景画像
         */
        Background:     { file: 'StatsuBack' },
        /* 性ステータスメニューコマンド
         *  label: コマンド名
         *  index: コマンド表示位置（先頭は0番目）
         */
        HStatusCommand: { label: '性状态', index: 5 },
        /* ステートアイコン数
         *  アクター名の横に表示するステートアイコンの最大数
         */
        StateIcons: 4,
        /* 次の目的地
         *  label: 次の目的地欄に表示するラベル
         *  vid:   次の目的地の内容を入れる変数の番号
         */
        Destination:    { label: '接下来的目的', vid: 13 },
        /* お金
         *  label: お金欄に表示するラベル
         */
        Gold:           { label: '金钱' },
        /* 经验値
         *  text:        经验値ゲージの上に表示するテキスト
         *  tx, ty:      テキストを表示する座標
         *  param_width: 经验値を表示する幅
         *  gx, gy:      ゲージを表示する座標
         *  color1:      ゲージ色（開始色）
         *  color2:      ゲージ色（終端色）
         *  gauge_width: ゲージの幅
         */
        Exp: { text: 'next　　　　　exp', tx: 265, ty: 237, param_width: 195, gx: 265, gy: 237, color1: '#800000', color2: '#ff0000', gauge_width: 240 },
        /* 淫乱度
         *  file:   淫乱度のラベルとして表示する画像ファイル名
         *  fx, fy: 画像を表示する座標
         *  vid1:   淫乱度（現在値）の変数番号
         *  vid2:   淫乱度（最大値）の変数番号
         *  vx, vy: 淫乱度を表示する座標
         *  width:  淫乱度を表示する範囲の横幅（この幅の中で右寄せ表示）
         */
        PrurientDegree: { file: 'PrurientDegree', fx: 0, fy: 120, vid1: 12, vid2: 11, vx: 150, vy: 135, width: 240 },
        /* Limit
         *  file1:    Limitのラベルとして表示する画像ファイル名
         *  fx1, fy1: ラベル画像を表示する座標
         *  file2:    Limitの状態として表示する画像ファイル名
         *  fx2, fy2: ラベル画像を表示する座標
         *  vid:      Limit値の変数番号
         * 
         *  Limitの表示について
         *   例えば変数の値が「3」の場合、「file2の画像の左半分の絵を３つ」「file2の画像の右半分の絵を２つ」並べて表示します。
         *   なので、file2にはONとOFFの２つの絵を横に並べた画像を指定してください。
         */
        Limit:          { file1: 'Limit1', fx1: 0,   fy1: 166,
                          file2: 'Limit2', fx2: 200, fy2: 173, vid: 14 },
        /* 立ち絵
         *  file: 立ち絵として表示する画像ファイル名のプレフィックス（※后述）
         *  x, y: 画像を表示する座標
         *  vid:  立ち絵を切り替える変数の画像
         *  max:  立ち絵の種類の数
         * 
         *  画像ファイル名について
         *   fileで指定したファイル名のプレフィックスに、変数の値を加えたものをファイル名として表示します。
         *   例えばプレフィックスが「ActorPicture_」、変数の値が「2」の場合、ファイル名は「ActorPicture_02」となります。
         * 
         *  x,yについて
         *   x,yを省略すると直前の値をそのまま流用します。
         */
        ActorPicture:  [{ file: 'ActorPicture_',  vid: 61, max: 8, x: 400, y: 0 },
                        { file: 'ActorPicture2_', vid: 62, max: 8 },    //服
                        { file: 'ActorPicture3_', vid: 63, max: 2 },    //ぶっかけ
                        //{ file: 'ActorPicture4_', vid: 64, max: 1 },    //装飾
                        { file: 'ActorPicture5_', vid: 65, max: 1, x: 150, y: 40 },    //今日のボーナス
                        { file: 'ActorPicture6_', vid: 160, max: 1, x: 150, y: -10 },   //難易度
                        { file: 'ActorPicture7_', vid: 99, max: 1, x: 150, y: 10 },   //高潮Ｐ
                        { file: 'ActorPicture8_', vid: 100, max: 1, x: -15, y: -11 }],   //枠　　
        /* 性ステータス
         *  label:  性ステータスのラベル
         *  vid:    性ステータスの変数の番号
         *  x, y:   性ステータスを表示する座標
         *  width:  性ステータスを表示する範囲の横幅（この幅の中で右寄せ表示）
         *  height: 性ステータスを表示する範囲の縦幅（この幅で縦並びに表示）
         * 
         *  x,y,width,heightについて
         *   x,width,heightを省略すると直前の値をそのまま流用します。
         *   yを省略すると、直前の値に直前のheightを加算した値を使用します。
         */
        H_Status:      [{ label: '露出经验',       vid: 22, x: 1, y: 450, width: 240, height: 27 },
                        { label: '口经验',       vid: 23 },
                        { label: '胸经验',       vid: 24 },
                        { label: '乳头经验',     vid: 25 },
                        { label: '小穴经验',       vid: 26 },
                        { label: '阴蒂经验',     vid: 27 },
                        { label: '臀部经验',       vid: 28 },
                        { label: '肛交经验',   vid: 29 },
                        { label: '经验人数',   vid: 30 }],
        /* パラメータ１
         *  ※性ステータスと同じ（性ステータス→パラメータ１と読み替えてください）
         */
        // Params1:       [{ label: '誘惑力', vid: 36, x: 24, y: 588, width: 240, height: 27 },
        //                 { label: '接客力', vid: 37 }],
        Params1:       [],
        /* パラメータ２
         *  ※性ステータスと同じ（性ステータス→パラメータ２と読み替えてください）
         */
        Params2:       [{ label: '\\I[318]战斗等级', vid: 49, x: 1, y: 240, width: 240, height: 35 },
                        { label: '\\I[73]特训数', vid: 88 },
                        { label: '\\I[68]善行值', vid: 37 },
                        { label: '\\I[142]采集力', vid: 39 },
                        { label: '\\I[139]完成任务数', vid: 41},
                        { label: '\\I[318]催淫等级', vid: 38 , x: 1, y: 434, width: 240, height: 35 },
                        { label: '\\I[126]体质変化(+)', vid: 36 },
                        { label: '\\I[124]体质変化(-)', vid: 35 },
                        { label: '\\I[490]肉欲基础', vid: 90 },
                        { label: '\\I[481]受精力', vid: 50 },
                        { label: '\\I[529]榨精力', vid: 89 },
                        { label: '\\I[311]经过日数', vid: 138 , x: 1, y: 660, width: 240, height: 35}],
    };

    /* 性ステータス画面用設定 */
    let SETTINGS2 = {
        /* 背景画像
         */
        Background:     { file: 'HStatsuBack' },
        /* 立ち絵
            ※性ステータス画面用（設定内容については↑のメニュー画面用の立ち絵の説明を参照）
         */
        ActorPicture:  [{ file: 'ActorPicture4_', vid: 78, max: 4, x: 425, y: 0 }],
        /* 性ステータス
            ※性ステータス画面用（設定内容については↑のメニュー画面用の性ステータスの説明を参照）
            ※textとvidはメニュー画面用の性ステータスを流用するようにしているので、基本ノータッチで
         */
        H_Status:      [{ label: SETTINGS.H_Status[0].label,  vid: SETTINGS.H_Status[0].vid, x: 24, y: 257, width: 240, height: 27 },
                        { label: SETTINGS.H_Status[1].label,  vid: SETTINGS.H_Status[1].vid },
                        { label: SETTINGS.H_Status[2].label,  vid: SETTINGS.H_Status[2].vid },
                        { label: SETTINGS.H_Status[3].label,  vid: SETTINGS.H_Status[3].vid },
                        { label: SETTINGS.H_Status[4].label,  vid: SETTINGS.H_Status[4].vid },
                        { label: SETTINGS.H_Status[5].label,  vid: SETTINGS.H_Status[5].vid },
                        { label: SETTINGS.H_Status[6].label,  vid: SETTINGS.H_Status[6].vid },
                        { label: SETTINGS.H_Status[7].label,  vid: SETTINGS.H_Status[7].vid },
                        { label: SETTINGS.H_Status[8].label,  vid: SETTINGS.H_Status[8].vid }],
        /* パラメータ１
            ※性ステータス画面用（設定内容については↑のメニュー画面用のパラメータ１の説明を参照）
            ※textとvidはメニュー画面用のパラメータ１を流用するようにしているので、基本ノータッチで
        */
        Params1:       [{ label: '自慰次数', vid: 31, x: 24, y: 502, width: 240, height: 27 },
                        { label: '中出次数', vid: 32 },
                        { label: '精浴次数', vid: 33 },
                        { label: '怀孕次数', vid: 34 },
                        { label: '高潮次数', vid: 21 },
                        { label: '受精力', vid: 50 }],
        /* 处女喪失
         *  label:  处女喪失のラベル
         *  vid:    处女喪失の変数の番号
         *  x, y:   处女喪失を表示する座標
         */
        LostVirgin:     { label: '初夜对象', vid: 15, x: 24, y: 665 },
        /* 感度
         *  label:  感度のラベル
         *  file:   感度表現として表示する画像ファイル名のプレフィックス（※后述）
         *  fx, fy: 画像を表示する座標（原点中心）
         *  vid:    感度の変数の番号
         *  vx, vy: 感度を表示する座標
         *  width:  感度を表示する範囲の横幅（この幅の中で右寄せ表示）
         *  border: 画像切り替えの境界値（※后述）
         * 
         *  画像ファイル名について
         *   fileで指定したファイル名のプレフィックスに、変数の値に応じた数字を加えたものをファイル名として表示します。
         *   数字は変数の値とborderに設定した境界値で決まり、例えばborderが[0, 10, 20]だった場合
         *   変数の値が0以上10未満なら「00」、10以上20未満なら「01」、20以上なら「02」となります。
         *   プレフィックスが「Kuchi_」だった場合、最終的なファイル名は「Kuchi_00」のような形になります。
         */
        Sensitivity:   [{ label: '口敏感度', file: 'Kuchi_',  fx:400, fy:350, vid: 55, vx: 280, vy:430, width: 240, border: [0,200,500] },
                        { label: '胸敏感度', file: 'Mune_',   fx:400, fy:585, vid: 56, vx: 280, vy:665, width: 240, border: [0,200,500] },
                        { label: '性器敏感度', file: 'Chitsu_', fx:970, fy:105, vid: 57, vx: 820, vy:190, width: 240, border: [0,200,500] },
                        { label: '臀部敏感度', file: 'Shiri_',  fx:970, fy:350, vid: 58, vx: 820, vy:430, width: 240, border: [0,200,500] }],
        /* 状態
         *  label:  状態のラベル
         *  file:   状態表現として表示する画像ファイル名のプレフィックス（※后述）
         *  fx, fy: 画像を表示する座標（原点中心）
         *  vid:    状態の変数の番号
         *  vx, vy: 状態を表示する座標
         *  text:   状態の内容を示すテキスト（※后述）
         * 
         *  画像ファイル名について
         *   fileで指定したファイル名のプレフィックスに、変数の値を加えたものをファイル名として表示します。
         *   例えばプレフィックスが「Status_」、変数の値が「2」の場合、ファイル名は「Status_02」となります。
         * 
         *  textについて
         *   変数の値と同じ位置のテキストを表示します。
         *   例えばtextが['处女', '中出', '怀孕']で変数の値が「1」だった場合、「中出」と表示されます。
         */
        State:          { label: '状态', file: 'State_', fx:970, fy:585, vid: 59, vx: 820, vy:665, text: ['处女', '非处女', '中出', '怀孕初期', '怀孕中期', '怀孕后期', '临盆'] },
        /* 感度・状態画像の動作設定
         *  min_scale: 最小サイズの倍率
         *  max_scale: 最大サイズの倍率
         *  duration:  最小から最大になるまでの時間（フレーム数）
         */
        SpriteAction:   { min_scale: 0.95, max_scale: 1.0, duration: 35 }
    };

    //==========================================================================
    // Scene_Menu
    //==========================================================================

    {
        let __createBackground = Scene_MenuBase.prototype.createBackground;
        Scene_MenuBase.prototype.createBackground = function() {
            if (this instanceof Scene_Menu ||
                this instanceof Scene_Item ||
                this instanceof Scene_Skill ||
                this instanceof Scene_Equip ||
                this instanceof Scene_STS ||
                this instanceof Scene_Glossary ||
               (this instanceof Scene_Options && SceneManager._previousClass == Scene_Menu)) {
                    this._backgroundSprite = new Sprite();
                    this._backgroundSprite.bitmap = ImageManager.loadSystem(SETTINGS.Background.file);
                    this.addChild(this._backgroundSprite);
                    return;
            }
            __createBackground.apply(this, arguments);
        };
    }

    //==========================================================================
    // Scene_Menu
    //==========================================================================
    
    {
        let __create = Scene_Menu.prototype.create;
        Scene_Menu.prototype.create = function() {
            __create.apply(this, arguments);
            ImageManager.loadSystem(SETTINGS.PrurientDegree.file);
            ImageManager.loadSystem(SETTINGS.Limit.file1);
            ImageManager.loadSystem(SETTINGS.Limit.file2);
            [...SETTINGS.ActorPicture,...SETTINGS2.ActorPicture].forEach((setting) => {
                for (let i = 0; i < setting.max; i++) {
                    ImageManager.loadSystem(setting.file + ('00' + i).slice(-2));
                }
            });
            ImageManager.loadSystem(SETTINGS.Background.file);
            ImageManager.loadSystem(SETTINGS2.Background.file);
            SETTINGS2.Sensitivity.forEach((setting) => {
                for (let i = 0; i < setting.border.length; i++) {
                    ImageManager.loadSystem(setting.file + ('00' + i).slice(-2));
                }
            });
            for (let i = 0; i < SETTINGS2.State.text.length; i++) {
                ImageManager.loadSystem(SETTINGS2.State.file + ('00' + i).slice(-2));
            }
            this.createDestinationWindow();
        };

        let __createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function() {
            __createCommandWindow.apply(this, arguments);
            this._commandWindow.setHandler('h_status', () => SceneManager.push(Scene_HStatus));
        };

        let __createGoldWindow = Scene_Menu.prototype.createGoldWindow;
        Scene_Menu.prototype.createGoldWindow = function() {
            __createGoldWindow.apply(this, arguments);
            this._goldWindow.drawText(SETTINGS.Gold.label, 0, 0);
        };

        Scene_Menu.prototype.createDestinationWindow = function() {
            let x = 0;
            let y = this._commandWindow.height;
            let width = this._commandWindow.width;
            let height = this._goldWindow.y - y;
            this._destinationWindow = new Window_Base(x, y, width, height);
            this._destinationWindow.drawText(SETTINGS.Destination.label, 0, 0);
            ('\n' + $gameVariables.value(SETTINGS.Destination.vid)).split(/\n/).forEach((text, index)=>{
                this._destinationWindow.drawText(text, 0, this._destinationWindow.lineHeight() * index, this._destinationWindow.contentsWidth());
            });
            this.addWindow(this._destinationWindow);
        };
    }

    //==============================================================================
    // Window_MenuCommand
    //==============================================================================
    
    {
        let __makeCommandList = Window_MenuCommand.prototype.makeCommandList;
        Window_MenuCommand.prototype.makeCommandList = function() {
            __makeCommandList.apply(this, arguments);
            this._list.splice(SETTINGS.HStatusCommand.index, 0, { name: SETTINGS.HStatusCommand.label, symbol: "h_status", enabled: true, ext: null });
        };
    }

    //==========================================================================
    // Window_MenuStatus
    //==========================================================================
    
    {
        Window_MenuStatus.prototype.drawActorFace = function(){};

        Window_MenuStatus.prototype.maxCols = function() {
            return 2;
        };

        Window_MenuStatus.prototype.itemWidth = function() {
            return 132 + SETTINGS.StateIcons * Window_Base._iconWidth;
        };

        Window_MenuStatus.prototype.itemHeight = function() {
            return this.lineHeight() * 3;
        };

        Window_MenuStatus.prototype.drawAllItems = function() {
            var topIndex = this.topIndex();
            for (var i = 0; i < this.maxPageItems(); i++) {
                var index = topIndex + i;
                if (index < this.maxItems()) {
                    this.drawItem(index);
                }
            }
        };

        Window_MenuStatus.prototype.drawItemStatus = function(index) {
            var actor = $gameParty.members()[index];
            var rect = this.itemRect(index);
            var x = rect.x;
            var y = rect.y;
            var width = rect.width - x - this.textPadding();
            this.drawActorSimpleStatus(actor, x, y, width);
        };

        Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
            var lineHeight = this.lineHeight();
            this.drawActorName(actor, x, y);
            this.drawActorIcons(actor, x + this.itemWidth() - Window_Base._iconWidth * SETTINGS.StateIcons, y);
            this.drawActorHp(actor, x, y + lineHeight * 1, this.itemWidth());
            this.drawActorMp(actor, x, y + lineHeight * 2, this.itemWidth());
        };

        Window_MenuStatus.prototype.drawActorIcons = function(actor, x, y, width) {
            width = width || SETTINGS.StateIcons * Window_Base._iconWidth + 1;
            var icons = actor.allIcons().slice(0, Math.floor(width / Window_Base._iconWidth));
            for (var i = 0; i < icons.length; i++) {
                this.drawIcon(icons[i], x + Window_Base._iconWidth * i, y + 2);
            }
        };

        Window_MenuStatus.prototype.refresh = function() {
            Window_Selectable.prototype.refresh.call(this);
            this.drawExp();
            this.drawPrurientDegree();
            this.drawLimit();
            this.drawActorPicture();
            this.drawParams();
        };

        Window_MenuStatus.prototype.drawExp = function() {
            let setting = SETTINGS.Exp;
            let actor = $gameActors.actor(1);
            let text = setting.text;
            let tx = setting.tx;
            let ty = setting.ty;
            let param_width = setting.param_width;
            let gx = setting.gx;
            let gy = setting.gy;
            let gauge_width = setting.gauge_width;
            let color1 = setting.color1;
            let color2 = setting.color2;
            if (actor.level < 99) {
                this.drawGauge(gx, gy, gauge_width, 1 - actor.nextRequiredExp() / (actor.nextLevelExp() - actor.currentLevelExp()), color1, color2);
                this.changeTextColor(this.systemColor());
                this.drawText(text, tx, ty);
                this.drawText(actor.nextRequiredExp(), tx, ty, param_width, 'right');
            } else {
                this.drawGauge(gx, gy, gauge_width, 100, color1, color2);
                this.changeTextColor(this.systemColor());
                this.drawText(text.replace('next', 'MAX ').replace('exp', 'EXP'), tx, ty);
            }
        };

        Window_MenuStatus.prototype.drawPrurientDegree = function() {
            let setting = SETTINGS.PrurientDegree;
            let bitmap = ImageManager.loadSystem(setting.file);
            let x = setting.fx;
            let y = setting.fy;
            this.contents.bltImage(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);
            let text = $gameVariables.value(setting.vid1) + '/' + $gameVariables.value(setting.vid2);
            this.drawText(text, setting.vx, setting.vy, setting.width, 'right');
        };

        Window_MenuStatus.prototype.drawLimit = function() {
            let setting = SETTINGS.Limit;
            let bitmap1 = ImageManager.loadSystem(setting.file1);
            let x1 = setting.fx1;
            let y1 = setting.fy1;
            this.contents.bltImage(bitmap1, 0, 0, bitmap1.width, bitmap1.height, x1, y1);
            let bitmap2 = ImageManager.loadSystem(setting.file2);
            let x2 = setting.fx2;
            let y2 = setting.fy2;
            for (let i = 0; i < 5; i++) {
                let sx = $gameVariables.value(setting.vid) > i ? 0 : bitmap2.width / 2;
                this.contents.bltImage(bitmap2, sx, 0, bitmap2.width / 2, bitmap2.height, x2 + i * bitmap2.width / 2, y2);
            }
        };

        Window_MenuStatus.prototype.drawActorPicture = function() {
            let x = 0, y = 0;
            SETTINGS.ActorPicture.forEach((setting) => {
                let bitmap = ImageManager.loadSystem(setting.file + ('00' + $gameVariables.value(setting.vid)).slice(-2));
                x = setting.x || x;
                y = setting.y || y;
                let width = (x + bitmap.width > this.contents.width) ? this.contents.width - x : bitmap.width;
                let height = (y + bitmap.height > this.contents.height) ? this.contents.height - y : bitmap.height;
                this.contents.bltImage(bitmap, 0, 0, width, height, x, y);
            });
        };

        Window_MenuStatus.prototype.drawHStatus = function() {
            this.contents.fontSize = 21;
            this.standardFontSize = function(){ return 21; };
            let x, y, width, height;
            SETTINGS.H_Status.forEach((status) => {
                x = status.x || x;
                y = status.y || y + height;
                width = status.width || width;
                height = status.height || height;
                this.drawTextEx(status.label, x, y);
                this.drawText($gameVariables.value(status.vid), x, y, width, 'right');
            });
            delete this.standardFontSize;
            this.contents.fontSize = this.standardFontSize();
        };

        Window_MenuStatus.prototype.drawParams = function() {
            let x, y, width, height;
            [...SETTINGS.Params1, ...SETTINGS.Params2].forEach((param) => {
                x = param.x || x;
                y = param.y || y + height;
                width = param.width || width;
                height = param.height || height;
                this.drawTextEx(param.label, x, y);
                this.drawText($gameVariables.value(param.vid), x, y, width, 'right');
            });
        };
    }

    //==============================================================================
    // Scene_HStatus
    //==============================================================================

    class Scene_HStatus extends Scene_MenuBase {
        constructor() {
            super();
            let setting = SETTINGS2.SpriteAction;
            this._fluctuation = (setting.max_scale - setting.min_scale) / setting.duration;
        }

        create() {
            super.create();
            this.createBaseWindow();
            this.createSensitivitySprite();
            this.createStateSprite();
        }

        createBackground() {
            super.createBackground();
            this._backgroundSprite.bitmap = ImageManager.loadSystem(SETTINGS2.Background.file);
        }

        createBaseWindow() {
            this._baseWindow = new Window_Selectable(0, 0, Graphics.boxWidth, Graphics.boxHeight);
            this._baseWindow.setHandler('cancel', this.popScene.bind(this));
            this._baseWindow.opacity = 0;
            this._baseWindow.activate();
            this.addWindow(this._baseWindow);
        }

        createSensitivitySprite() {
            SETTINGS2.Sensitivity.forEach((setting) => {
                let num = 0;
                setting.border.forEach((border, index) => {
                    if (border <= $gameVariables.value(setting.vid)) {
                        num = index;
                    }
                });
                let sprite = new Sprite(ImageManager.loadSystem(setting.file + ('00' + num).slice(-2)));
                sprite.x = setting.fx;
                sprite.y = setting.fy;
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                this._backgroundSprite.addChild(sprite);
            });
        }

        createStateSprite() {
            let setting = SETTINGS2.State;
            let sprite = new Sprite(ImageManager.loadSystem(setting.file + ('00' + $gameVariables.value(setting.vid)).slice(-2)));
            sprite.x = setting.fx;
            sprite.y = setting.fy;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            this._backgroundSprite.addChild(sprite);
        }

        start() {
            super.start();
            this.drawActorPicture();
            this.drawHStatus();
            this.drawParams();
            this.drawLostVirgin();
            this.drawSensitivity();
            this.drawState();
        }

        drawActorPicture() {
            let x = 0, y = 0;
            SETTINGS2.ActorPicture.forEach((setting) => {
                let bitmap = ImageManager.loadSystem(setting.file + ('00' + $gameVariables.value(setting.vid)).slice(-2));
                x = setting.x || x;
                y = setting.y || y;
                let width = (x + bitmap.width > this._baseWindow.contents.width) ? this._baseWindow.contents.width - x : bitmap.width;
                let height = (y + bitmap.height > this._baseWindow.contents.height) ? this._baseWindow.contents.height - y : bitmap.height;
                this._baseWindow.contents.bltImage(bitmap, 0, 0, width, height, x, y);
            });
        }

        drawHStatus() {
            this._baseWindow.contents.fontSize = 21;
            this._baseWindow.standardFontSize = function(){ return 21; };
            let x, y, width, height;
            SETTINGS2.H_Status.forEach((status) => {
                x = status.x || x;
                y = status.y || y + height;
                width = status.width || width;
                height = status.height || height;
                this._baseWindow.drawTextEx(status.label, x, y);
                this._baseWindow.drawText($gameVariables.value(status.vid), x, y, width, 'right');
            });
            delete this._baseWindow.standardFontSize;
            this._baseWindow.contents.fontSize = this._baseWindow.standardFontSize();
        }

        drawParams() {
            this._baseWindow.contents.fontSize = 21;
            this._baseWindow.standardFontSize = function(){ return 21; };
            let x, y, width, height;
            SETTINGS2.Params1.forEach((param) => {
                x = param.x || x;
                y = param.y || y + height;
                width = param.width || width;
                height = param.height || height;
                this._baseWindow.drawTextEx(param.label, x, y);
                this._baseWindow.drawText($gameVariables.value(param.vid), x, y, width, 'right');
            });
            delete this._baseWindow.standardFontSize;
            this._baseWindow.contents.fontSize = this._baseWindow.standardFontSize();
        }

        drawLostVirgin() {
            let setting = SETTINGS2.LostVirgin;
            let x = setting.x;
            let y = setting.y;
            this._baseWindow.standardFontSize = function(){ return 21; };
            this._baseWindow.drawTextEx(setting.label + '　' + $gameVariables.value(setting.vid), x, y);
            delete this._baseWindow.standardFontSize;
            this._baseWindow.contents.fontSize = this._baseWindow.standardFontSize();
        }

        drawSensitivity() {
            SETTINGS2.Sensitivity.forEach((senstivity) => {
                let vx = senstivity.vx;
                let vy = senstivity.vy;
                let width = senstivity.width;
                this._baseWindow.drawTextEx('\\I[126]' + senstivity.label, vx, vy);
                this._baseWindow.drawText($gameVariables.value(senstivity.vid), vx, vy, width, 'right');
            });
        }

        drawState() {
            let setting = SETTINGS2.State;
            let vx = setting.vx;
            let vy = setting.vy;
            this._baseWindow.drawTextEx('\\I[126]' + setting.label + '　' + setting.text[$gameVariables.value(setting.vid)], vx, vy);
        }

        update() {
            super.update();
            let setting = SETTINGS2.SpriteAction;
            let scale = this._backgroundSprite.children[0].scale.x;
            scale += this._fluctuation;
            if (scale <= setting.min_scale) {
                scale = setting.min_scale;
                this._fluctuation *= -1;
            }
            if (scale >= setting.max_scale) {
                scale = setting.max_scale;
                this._fluctuation *= -1;
            }
            this._backgroundSprite.children.forEach((sprite) => {
                sprite.scale.x = scale;
                sprite.scale.y = scale;
            });
        }
    }
}());
