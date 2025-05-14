//=============================================================================
// MPP_EncounterEffect.js
//=============================================================================
// Copyright (c) 2018-2019 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.2.0】戦闘開始時のエフェクトを特殊なものに変更します。
 * @author 木星ペンギン
 *
 * @help プラグインコマンド:
 *   EncEffType type             # エフェクトタイプを変更
 *   EncEffChar evId             # エフェクトの中心となるキャラクター
 *   EncEffColor r g b           # エフェクトの色を変更
 * 
 * ※ プラグインコマンドにて指定する値には変数が使用できます。
 *    v[n] と記述することでn番の変数の値を参照します。
 * 
 * ================================================================
 * ▼プラグインコマンド詳細
 * --------------------------------
 *  〇EncEffType type
 *      type : エフェクトタイプ
 *  
 *   エフェクトタイプが指定した番号に変更されます。
 * 
 * --------------------------------
 *  〇EncEffChar evId
 *      evId : エフェクトの中心となるイベントのID
 *  
 *   次の１回のみ、エフェクトが指定したイベントIDの
 *   キャラクターを中心に実行されます。
 *   
 *   0を指定した場合は[このイベント]、
 *   -1を指定した場合は[プレイヤー]となります。
 *   
 *   この設定はエフェクトタイプ1のみ有効です。
 *   
 * --------------------------------
 *  〇EncEffColor r g b
 *      r g b : エフェクトの色RGB
 *  
 *   次の１回のみ、エフェクトが指定した色に変更されます。
 * 
 * 
 * ================================================================
 * ▼プラグインパラメータ詳細
 * --------------------------------
 *  〇 Effect Type
 *   0 : デフォルト
 *   1 : キャラクターを中心に割れる
 *   2 : 画面の右または左から割れる
 *   3 : 画面全体が前面に飛び散る
 * 
 * --------------------------------
 *  〇 Clipping Mode
 *   本プラグインのエフェクトは、背景画像と多数の破片画像から構成されています。
 *   
 *   破片画像を表示する際、[背景画像を破片の形に切り抜く]という処理が行われますが、
 *   その処理を簡略化することで軽量化を行うためのパラメータです。
 *   
 *   おそらく、OFFに変更しても問題ないと思われます。
 * 
 * --------------------------------
 *  〇 Advanced(高度な設定)について
 *   基本的に変更する必要はありません。
 *   
 *   各パラメータを文章で説明するのは難しいため、
 *   パラメータ名から推察し、実際に動作させて確認してください。
 * 
 * --------------------------------
 *  〇 Plugin Commands
 *   プラグインコマンド名やメモ欄で使用するコマンド名を変更できます。
 *   コマンドを短くしたり日本語化等が可能です。
 *   
 *   コマンド名を変更しても、デフォルトのコマンドは使用できます。
 * 
 * 
 * ================================================================
 * ▼補足
 * --------------------------------
 *  〇 エフェクトタイプ1にて、プラグインコマンドにて中心となるキャラクターを
 *    指定していない場合、ランダムエンカウントでは[プレイヤー]、
 *    イベントコマンドの【戦闘の処理】では[このイベント]が中心となります。
 *  
 *  〇 画面分割する数を増やすほど処理が重くなります。
 * 
 *  〇 モバイル機器で実行した場合は一部の演出が省略されます。
 * 
 *  〇 MPP_PreloadBattleImage.js(戦闘画像先読み込み)プラグインと
 *    併用した場合、画像読み込み完了まで画面が割れたエフェクトを維持します。
 *  
 *    これにより、Loadingの文字が表示される時間が短くなります。
 * 
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param === Basic ===
 * @default === 基本的な設定 ===
 * 
 * @param Effect Type
 * @type number
 * @max 3
 * @desc 画面割れエフェクトのタイプ
 * @default 1
 * @parent === Basic ===
 * 
 * @param Type 1 Params
 * @type struct<Type1>
 * @desc タイプ1 パラメータ
 * @default {"Shape Type":"0","Break Duration 1":"45","Break Duration 2":"40","Scatter Duration":"60","Split Radial":"10","Radial Random Rate":"90","Circle Radius":"96","Circle Increase Rate":"150","Circle Random Rate":"40"}
 * @parent Effect Type
 * 
 * @param Type 2 Params
 * @type struct<Type2>
 * @desc タイプ2 パラメータ
 * @default {"Shape Type":"2","Break Duration 1":"30","Break Duration 2":"45","Scatter Duration":"60","Break Direction":"left","Scatter Direction":"left","Split X":"10","X Random Rate":"80","Split Y":"6","Y Random Rate":"80"}
 * @parent Effect Type
 * 
 * @param Type 3 Params
 * @type struct<Type3>
 * @desc タイプ3 パラメータ
 * @default {"Shape Type":"1","Break Duration 1":"40","Break Duration 2":"40","Scatter Duration":"120","Split X":"10","X Random Rate":"80","Split Y":"6","Y Random Rate":"80"}
 * @parent Effect Type
 * 
 * @param Default Color
 * @desc エフェクトのデフォルト色
 * (r,g,bで指定)
 * @default 255,255,255
 * @parent === Basic ===
 * 
 * @param Clipping Mode
 * @type select
 * @option ON
 * @option Pc Only
 * @option OFF
 * @desc 背景の切り抜き処理
 * @default Pc Only
 * @parent === Basic ===
 * 
 * @param Delay Count
 * @type number
 * @desc ディレイカウント
 * @default 4
 * @parent === Basic ===
 * 
 * 
 * @param === Advanced ===
 * @default === 高度な設定 ===
 * 
 * @param Line Width
 * @type number
 * @desc 線の幅
 * @default 4
 * @parent === Advanced ===
 * 
 * @param Flash Opacity
 * @type number
 * @max 255
 * @desc フラッシュの強さ
 * @default 255
 * @parent === Advanced ===
 * 
 * @param Break Rate
 * @type number
 * @desc 画面が割れる際の移動率(%)
 * @default 100
 * @parent === Advanced ===
 * 
 * @param Fragment Slip Rate
 * @type number
 * @desc 画面が割れる際の画面ズレ率(%)
 * @default 100
 * @parent === Advanced ===
 * 
 * @param Pc Zoom
 * @type number
 * @min 1
 * @decimals 2
 * @desc PCでの画像倍率
 * @default 2.00
 * @parent === Advanced ===
 * 
 * @param Mobile Zoom
 * @type number
 * @min 1
 * @decimals 2
 * @desc 携帯機での画像倍率
 * @default 4.00
 * @parent === Advanced ===
 * 
 * @param Smooth Mode
 * @type select
 * @option ON
 * @option Pc Only
 * @option OFF
 * @desc 画像のスムーズな描写
 * @default Pc Only
 * @parent === Advanced ===
 * 
 * 
 * @param === Command ===
 * @default === コマンド名 ===
 * 
 * @param Plugin Commands
 * @type struct<Plugin>
 * @desc プラグインコマンド名
 * @default {"EncounterEffectCharacter":"EncEffChar","EncounterEffectColor":"EncEffColor","EncounterEffectType":"EncEffType"}
 * @parent === Command ===
 * 
 * 
 */

/*~struct~Type1:
 * @param Shape Type
 * @type number
 * @max 1
 * @desc 破片の形状
 * (0:四角形, 1:三角形)
 * @default 0
 * 
 * @param Break Duration 1
 * @type number
 * @min 1
 * @desc 画面割れのエフェクト時間
 * @default 45
 * 
 * @param Break Duration 2
 * @type number
 * @min 1
 * @desc 画面割れ后の待機時間
 * @default 40
 * @parent Break Duration 1
 * 
 * @param Scatter Duration
 * @type number
 * @min 1
 * @desc 戦闘開始時のエフェクト時間
 * @default 60
 * @parent Break Duration 1
 * 
 * @param Split Radial
 * @type number
 * @min 3
 * @desc 放射状に分割する数
 * @default 10
 * 
 * @param Radial Random Rate
 * @type number
 * @max 100
 * @desc 放射状に分割する際の乱数
 * (0～100%)
 * @default 90
 * @parent Split Radial
 * 
 * @param Circle Radius
 * @type number
 * @min 1
 * @desc 円状に分割する際の基本半径
 * @default 96
 * 
 * @param Circle Increase Rate
 * @type number
 * @desc 円状に分割する際の増加率(%)
 * @default 150
 * @parent Circle Radius
 * 
 * @param Circle Random Rate
 * @type number
 * @max 100
 * @desc 円状に分割する際の乱数
 * (0～100%)
 * @default 40
 * @parent Circle Radius
 * 
 */

/*~struct~Type2:
 * @param Shape Type
 * @type number
 * @max 2
 * @desc 破片の形状
 * (0:四角形, 1:三角形, 2:ランダム)
 * @default 2
 * 
 * @param Break Duration 1
 * @type number
 * @min 1
 * @desc 画面割れのエフェクト時間
 * @default 30
 * 
 * @param Break Duration 2
 * @type number
 * @min 1
 * @desc 画面割れ后の待機時間
 * @default 45
 * @parent Break Duration 1
 * 
 * @param Scatter Duration
 * @type number
 * @min 1
 * @desc 戦闘開始時のエフェクト時間
 * @default 70
 * @parent Break Duration 1
 * 
 * @param Break Direction
 * @type select
 * @option left
 * @option center line
 * @option center point
 * @option right
 * @desc 画面が割れる方向
 * @default left
 * 
 * @param Scatter Direction
 * @type select
 * @option left
 * @option right
 * @desc 画面が割れる方向
 * @default left
 * 
 * @param Split X
 * @type number
 * @min 3
 * @desc 横に分割する数
 * @default 10
 * 
 * @param X Random Rate
 * @type number
 * @max 100
 * @desc 横に分割する際の乱数
 * (0～100%)
 * @default 80
 * @parent Split X
 * 
 * @param Split Y
 * @type number
 * @min 1
 * @desc 縦に分割する数
 * @default 6
 * 
 * @param Y Random Rate
 * @type number
 * @max 100
 * @desc 横に分割する際の乱数
 * (0～100%)
 * @default 80
 * @parent Split Y
 * 
 */

/*~struct~Type3:
 * @param Shape Type
 * @type number
 * @max 2
 * @desc 破片の形状
 * (0:四角形, 1:三角形, 2:ランダム)
 * @default 2
 * 
 * @param Break Duration 1
 * @type number
 * @min 1
 * @desc 画面割れのエフェクト時間
 * @default 30
 * 
 * @param Break Duration 2
 * @type number
 * @min 1
 * @desc 画面割れ后の待機時間
 * @default 45
 * @parent Break Duration 1
 * 
 * @param Scatter Duration
 * @type number
 * @min 1
 * @desc 戦闘開始時のエフェクト時間
 * @default 70
 * @parent Break Duration 1
 * 
 * @param Split X
 * @type number
 * @min 3
 * @desc 横に分割する数
 * @default 10
 * 
 * @param X Random Rate
 * @type number
 * @max 100
 * @desc 横に分割する際の乱数
 * (0～100%)
 * @default 80
 * @parent Split X
 * 
 * @param Split Y
 * @type number
 * @min 1
 * @desc 縦に分割する数
 * @default 6
 * 
 * @param Y Random Rate
 * @type number
 * @max 100
 * @desc 横に分割する際の乱数
 * (0～100%)
 * @default 80
 * @parent Split Y
 * 
 */

/*~struct~Plugin:
 * @param EncounterEffectCharacter
 * @desc エフェクトの中心となるキャラクター
 * @default EncEffChar
 * 
 * @param EncounterEffectColor
 * @desc エフェクトの色を変更
 * @default EncEffColor
 * 
 * @param EncounterEffectType
 * @desc エフェクトタイプを変更
 * @default EncEffType
 * 
 */

(function () {

const MPPlugin = {};

{
    
    let parameters = PluginManager.parameters('MPP_EncounterEffect');
    function reviver(key, value) {
        try {
            return JSON.parse(value, reviver);
        } catch (e) {
            return value;
        }
    };
    
    //Basic
    MPPlugin.EffectType = Number(parameters['Effect Type'] || 2);
    MPPlugin.TypeParams = [];
    MPPlugin.TypeParams[1] = JSON.parse(parameters['Type 1 Params'] || "{}", reviver);
    MPPlugin.TypeParams[2] = JSON.parse(parameters['Type 2 Params'] || "{}", reviver);
    MPPlugin.TypeParams[3] = JSON.parse(parameters['Type 3 Params'] || "{}", reviver);
    MPPlugin.DefaultColor = parameters['Default Color'].split(',').map(Number);
    MPPlugin.ClippingMode = parameters['Clipping Mode'] || "Mobile Only";
    MPPlugin.DelayCount = Number(parameters['Delay Count'] || 4);
    
    //Advanced
    MPPlugin.LineWidth = Number(parameters['Line Width'] || 4);
    MPPlugin.FlashOpacity = Number(parameters['Flash Opacity'] || 255);
    MPPlugin.BreakRate = Number(parameters['Break Rate'] || 100);
    MPPlugin.FragmentSlipRate = Number(parameters['Fragment Slip Rate'] || 100);
    MPPlugin.PcZoom = Number(parameters['Pc Zoom'] || 2);
    MPPlugin.MobileZoom = Number(parameters['Mobile Zoom'] || 4);
    MPPlugin.SmoothMode = parameters['Smooth Mode'] || "Pc Only";
    
    //Command
    MPPlugin.PluginCommands = JSON.parse(parameters['Plugin Commands'] || "{}");
    
}

const Alias = {};
const Method = {};

//-----------------------------------------------------------------------------
// EncounterEffect

function EncounterEffect() {
    throw new Error('This is a static class');
}

EncounterEffect.initialize = function() {
    this.terminate();
    this.clear();
    this.Sides = { minX:0, maxX:Graphics.width, minY:0, maxY:Graphics.height };
    var sides = this.Sides;
    this.Corner = [];
    this.Corner[0] = new Point(sides.minX, sides.minY);
    this.Corner[1] = new Point(sides.minX, sides.maxY);
    this.Corner[2] = new Point(sides.maxX, sides.minY);
    this.Corner[3] = new Point(sides.maxX, sides.maxY);
    this.Zoom = Utils.isMobileDevice() ? MPPlugin.MobileZoom : MPPlugin.PcZoom;
    this.NeedClip = this.getEffMode(MPPlugin.ClippingMode);
    this.Smooth = this.getEffMode(MPPlugin.SmoothMode);
};

EncounterEffect.getEffMode = function(param) {
    if (param === "Pc Only") {
        return !Utils.isMobileDevice();
    } else {
        return param === "ON";
    }
};

EncounterEffect.setup = function(snap, type) {
    this.snap = snap;
    this.type = type;
    this.opacity = 255;
    this._targetOpacity = 255;
    this._opacityDuration = 0;
    this._data = [];
    if (!this._color) {
        this._color = MPPlugin.DefaultColor;
    }
    
    var sides = this.Sides;
    var char = this.getCenterCharacter();
    var cx = Math.round(char.screenX()).clamp(sides.minX, sides.maxX);
    var cy = Math.round(char.screenY() - 24).clamp(sides.minY, sides.maxY);
    this.center = new Point(cx, cy);
    switch (type) {
        case 1:
            this.createFrames_T1();
            break;
        case 2:
        case 3:
            this.createFrames_T2();
            break;
    }
};

EncounterEffect.setColor = function(r, g, b) {
    this._color = [r, g, b];
};

EncounterEffect.getCenterCharacter = function() {
    var char = this.character;
    if (!char && $gameMap._interpreter.isRunning()) {
        char = $gameMap._interpreter.character(0);
    }
    return char || $gamePlayer;
};

EncounterEffect.createFrames_T1 = function() {
    var params = MPPlugin.TypeParams[1];
    if (!params) {
        this.clear();
        return;
    }
    var sType = Method.getValue(params, 'Shape Type', 0);
    var points = this.createPoints_T1(params);
    
    this._cornerFlag = [false, false, false, false];
    var inPoints, pos1, pos2, pos3, pos4;
    for (var i = 0; i < points.length; i++) {
        if (i > 0) inPoints = points[i - 1];
        var outPoints = points[i];
        var maxOut = outPoints.length;
        for (var j = 0; j < maxOut; j++) {
            var frame = [];
            pos3 = outPoints[j];
            pos4 = outPoints[(j + 1) % maxOut];
            if (i > 0) {
                pos1 = inPoints[(j + 1) % maxOut];
                pos2 = inPoints[j];
                if (this.isOutFrame(pos1, pos2)) continue;
                if (sType === 1) {
                    this.addFrame(Math.uniqFrame([pos1, pos2, pos3]));
                    frame.push(pos1);
                } else {
                    frame.push(pos1, pos2);
                }
            } else {
                frame.push(this.center);
            }
            if (this.setCorrectPoints(frame, pos3, pos4)) {
                this.addFrame(Math.uniqFrame(frame));
            }
        }
    }
};
Math.uniqFrame = function(frame) {
    for (var i = 0; i < frame.length - 1; i++) {
        var pos1 = frame[i];
        for (;;) {
            var pos2 = frame[i + 1];
            if (!pos2 || pos1.x !== pos2.x || pos1.y !== pos2.y) break;
            frame.splice(i + 1, 1);
        }
    }
    return frame;
};

EncounterEffect.createPoints_T1 = function(params) {
    var startR = Math.random() * 2;
    var sType = Method.getValue(params, 'Shape Type', 0);
    var splitX = Method.getValue(params, 'Split Radial', 10);
    var height = Method.getValue(params, 'Circle Radius', 96);
    var randomX = Method.getValue(params, 'Radial Random Rate', 90) / 100;
    var randomY = Method.getValue(params, 'Circle Random Rate', 40) / 100;
    var circleIncreaseRate = Method.getValue(params, 'Circle Increase Rate', 150) / 100;
    
    var baseAngle = 2 / splitX;
    var baseRadius = 0;
    var maxRadius = this.maxRadius();
    
    var allPoints = [];
    for (var i = 0; i < 10; i++) {
        if (sType === 1) startR += baseAngle / 2;
        if (i === 9) baseRadius = 1000000;
        var points = [];
        for (var j = 0; j < splitX; j++) {
            var angle = startR + baseAngle * j;
            angle += baseAngle * randomX * Math.random();
            angle %= 2;
            var radius = baseRadius + height * (1 - randomY * (0.75 - Math.random()));
            points[j] = this.createPoint1(angle, radius);
        }
        allPoints[i] = points;
        if (baseRadius > maxRadius) break;
        baseRadius += height;
        height *= circleIncreaseRate;
    }
    return allPoints;
};
Method.getValue = function(param, name, def) {
    var value = param[name];
    return (value === undefined ? def : value);
};

EncounterEffect.createPoint1 = function(angle, radius) {
    var sides = this.Sides;
    var sx = radius * Math.cos(angle * Math.PI);
    var sy = radius * Math.sin(angle * Math.PI);
    var cx = this.center.x;
    var cy = this.center.y;
    if (sx !== 0 && cx + sx < sides.minX) {
        sy *= (sides.minX - cx) / sx;
        sx = sides.minX - cx;
    }
    if (sx !== 0 && cx + sx > sides.maxX) {
        sy *= (sides.maxX - cx) / sx;
        sx = sides.maxX - cx;
    }
    if (sy !== 0 && cy + sy < sides.minY) {
        sx *= (sides.minY - cy) / sy;
        sy = sides.minY - cy;
    }
    if (sy !== 0 && cy + sy > sides.maxY) {
        sx *= (sides.maxY - cy) / sy;
        sy = sides.maxY - cy;
    }
    return new Point(Math.round(cx + sx), Math.round(cy + sy));
};

EncounterEffect.maxRadius = function() {
    var width = Graphics.width;
    var height = Graphics.height;
    var cx = this.center.x;
    var cy = this.center.y;
    var sx = (cx < width / 2 ? width - cx : cx);
    var sy = (cy < height / 2 ? height - cy : cy);
    return Math.sqrt(sx * sx + sy * sy);
};

EncounterEffect.createFrames_T2 = function() {
    var params = MPPlugin.TypeParams[this.type];
    if (!params) {
        this.clear();
        return;
    }
    var sType = Method.getValue(params, 'Shape Type', 0);
    var direction = Method.getValue(params, 'Break Direction', "center point");
    var splitX = Method.getValue(params, 'Split X', 12);
    var splitY = Method.getValue(params, 'Split Y', 9);
    
    var allPoints = this.createPoints_T2(params);
    if (sType === 0 || sType === 1) {
        for (var i = 0; i < splitX; i++) {
            var points1 = allPoints[i];
            var points2 = allPoints[i + 1];
            for (var j = 0; j < splitY; j++) {
                var pos1 = points1[j + 1];
                var pos2 = points1[j];
                var pos3 = points2[j];
                var pos4 = points2[j + 1];
                if (sType === 0) {
                    this.addFrame([pos1, pos2, pos3, pos4]);
                } else {
                    this.addFrame([pos1, pos2, pos3]);
                    this.addFrame([pos1, pos3, pos4]);
                }
            }
        }
    } else {
        this.createFrames_T2_S2(allPoints, splitX, splitY);
    }
    this.sortFragment(direction);
};

EncounterEffect.createFrames_T2_S2 = function(allPoints, splitX, splitY) {
    var allFrames = [];
    var frames1, frames2, f1, f2;
    for (var i = 0; i < splitX; i++) {
        frames1 = [];
        var points1 = allPoints[i];
        var points2 = allPoints[i + 1];
        for (var j = 0; j < splitY; j++) {
            var pos1 = points1[j + 1];
            var pos2 = points1[j];
            var pos3 = points2[j];
            var pos4 = points2[j + 1];
            if (Math.random() < 0.5) {
                f1 = { frame:[pos1, pos2, pos3], pos:0, param:0 };
                f2 = { frame:[pos1, pos3, pos4], pos:3, param:0 };
            } else {
                f1 = { frame:[pos2, pos3, pos4], pos:2, param:0 };
                f2 = { frame:[pos1, pos2, pos4], pos:1, param:0 };
            }
            frames1.push(f1, f2);
        }
        allFrames[i] = frames1;
    }
    var frames2;
    for (var i = 0; i < allFrames.length; i++) {
        frames1 = allFrames[i];
        for (var j = 0; j < frames1.length; j++) {
            f1 = frames1[j];
            if (f1.param === 0) {
                var d = Math.randomInt(3);
                if (d === 0) {
                    f2 = frames1[j - 1];
                } else if (d === 1) {
                    f2 = frames1[j + 1];
                } else {
                    f2 = null;
                    if (f1.pos === 0 || f1.pos === 1) {
                        frames2 = allFrames[i - 1];
                    } else {
                        frames2 = allFrames[i + 1];
                    }
                    if (frames2) {
                        var k = Math.floor(j / 2) * 2;
                        f2 = frames2[k];
                        if (Math.floor(f1.pos / 2) === Math.floor(f2.pos / 2)) {
                            f2 = frames2[k + 1];
                        }
                    }
                }
                if (f2 && f2.param === 0) this.joinFrame(f1, f2, d);
            }
        }
    }
    for (var i = 0; i < allFrames.length; i++) {
        frames1 = allFrames[i];
        for (var j = 0; j < frames1.length; j++) {
            if (frames1[j].param <= 1) this.addFrame(frames1[j].frame);
        }
    }
};

EncounterEffect.joinFrame = function(frame1, frame2, d) {
    var start = 0;
    var index = 0;
    var pos1 = frame1.pos;
    var pos2 = frame2.pos;
    if (d === 0) {
        start = (pos1 === 0 || pos1 === 1 ? 2 : 1);
        index = 1;
    } else if (d === 1) {
        start = 0;
        index = (pos1 === 0 ? 2 : pos1 === 2 ? 0 : pos2 === 0 ? 0 : 2);
    } else {
        start = (pos1 === 0 || pos1 === 1 ? 1 : 2);
        index = (pos2 === 0 || pos2 === 1 ? 2 : 0);
    }
    frame1.frame.splice(start, 0, frame2.frame[index]);
    frame1.param = 1;
    frame2.param = 2;
};

EncounterEffect.createPoints_T2 = function(params) {
    var splitX = Method.getValue(params, 'Split X', 12);
    var splitY = Method.getValue(params, 'Split Y', 9);
    var randomX = Method.getValue(params, 'X Random Rate', 80) / 100;
    var randomY = Method.getValue(params, 'Y Random Rate', 80) / 100;
    
    var sides = this.Sides;
    var width = sides.maxX / (splitX - randomX);
    var height = sides.maxY / (splitY - randomY);
    
    function pointX(i) {
        if (i === 0) return 0;
        if (i === splitX) return sides.maxX;
        return Math.round(width * (i - randomX * Math.random()));
    }
    function pointY(j) {
        if (j === 0) return 0;
        if (j === splitY) return sides.maxY;
        return Math.round(height * (j - randomY * Math.random()));
    }
    
    var allPoints = [];
    for (var i = 0; i <= splitX; i++) {
        var points = [];
        for (var j = 0; j <= splitY; j++) {
            points[j] = new Point(pointX(i), pointY(j));
            //points[j] = {x:pointX(i), y:pointY(j)};
        }
        allPoints[i] = points;
    }
    return allPoints;
};

EncounterEffect.addFrame = function(frame) {
    if (frame.length > 2) {
        var fragment = new Encounter_Fragment(frame);
        fragment.setSnap(this.snap);
        this._data.push(fragment);
    }
};

EncounterEffect.isOutFrame = function(pos1, pos2) {
    var sides = this.Sides;
    if (pos1.x === sides.minX && pos2.x === sides.minX) return true;
    if (pos1.x === sides.maxX && pos2.x === sides.maxX) return true;
    if (pos1.y === sides.minY && pos2.y === sides.minY) return true;
    if (pos1.y === sides.maxY && pos2.y === sides.maxY) return true;
    return false;
};

EncounterEffect.setCorrectPoints = function(frame, pos1, pos2) {
    var sides = this.Sides;
    frame.push(pos1);
    if (pos1.x === sides.minX && pos2.y === sides.minY) {
        if (!this.pushCorner(frame, 0)) return false;
    } else if (pos1.y === sides.maxY && pos2.x === sides.minX) {
        if (!this.pushCorner(frame, 1)) return false;
    } else if (pos1.y === sides.minY && pos2.x === sides.maxX) {
        if (!this.pushCorner(frame, 2)) return false;
    } else if (pos1.x === sides.maxX && pos2.y === sides.maxY) {
        if (!this.pushCorner(frame, 3)) return false;
    } else if (pos1.x === sides.minX && pos2.x === sides.maxX) {
        if (!this.pushCorner(frame, 0)) return false;
        if (!this.pushCorner(frame, 2)) return false;
    } else if (pos1.y === sides.maxY && pos2.y === sides.minY) {
        if (!this.pushCorner(frame, 1)) return false;
        if (!this.pushCorner(frame, 0)) return false;
    } else if (pos1.y === sides.minY && pos2.y === sides.maxY) {
        if (!this.pushCorner(frame, 2)) return false;
        if (!this.pushCorner(frame, 3)) return false;
    } else if (pos1.x === sides.maxX && pos2.x === sides.minX) {
        if (!this.pushCorner(frame, 3)) return false;
        if (!this.pushCorner(frame, 1)) return false;
    }
    frame.push(pos2);
    return true;
};

EncounterEffect.pushCorner = function(frame, c) {
    if (this._cornerFlag[c]) return false;
    frame.push(this.Corner[c]);
    this._cornerFlag[c] = true;
    return true;
};

EncounterEffect.sortFragment = function(direction) {
    switch (direction) {
        case "left":
            this._data.sort( (a, b) => a.x - b.x );
            break;
        case "center line":
            var cx = Graphics.width / 2;
            this._data.sort( (a, b) => Math.abs(cx - a.x) - Math.abs(cx - b.x) );
            break;
        case "center point":
            var cx = Graphics.width / 2;
            var cy = Graphics.height / 2;
            var yRate = Graphics.height / Graphics.width;
            this._data.sort( (a, b) => {
                var delta1 = Math.abs(cx - a.x) + Math.abs(cy - a.y) * yRate;
                var delta2 = Math.abs(cx - b.x) + Math.abs(cy - b.y) * yRate;
                return delta1 - delta2;
            });
            break;
        case "right":
            this._data.sort( (a, b) => b.x - a.x );
            break;
    }
};

EncounterEffect.break = function(index, duration) {
    this._data[index].onBreak(this._color, this.snap, duration);
};

EncounterEffect.terminate = function() {
    this.character = null;
    this.snap = null;
    this._color = null;
};

EncounterEffect.clear = function() {
    this._data = null;
    this.center = null;
    this.type = 0;
    this.opacity = 0;
};

EncounterEffect.startBattle = function(duration) {
    var data = this._data;
    switch (this.type) {
        case 1:
            for (var i = 0; i < data.length; i++) {
                data[i].startBattle_T1(duration);
            }
            this.opacity = 255;
            break;
        case 2:
            var params = MPPlugin.TypeParams[2];
            var direction = Method.getValue(params, 'Scatter Direction', "left");
            this.sortFragment(direction);
            for (var i = 0; i < data.length; i++) {
                data[i].startBattle_T2(duration, i, direction);
            }
            this.opacity = 640;
            break;
        case 3:
            for (var i = 0; i < data.length; i++) {
                data[i].startBattle_T3(duration, i);
            }
            this.opacity = 640;
            break;
    }
    this._targetOpacity = 0;
    this._opacityDuration = duration;
};

EncounterEffect.update = function() {
    var data = this._data;
    for (var i = 0; i < data.length; i++) {
        data[i].update();
    }
    this.updateOpacity();
    if (this.opacity === 0) {
        this.clear();
    }
};

EncounterEffect.updateOpacity = function() {
    if (this._opacityDuration > 0) {
        var d = this._opacityDuration;
        this.opacity = (this.opacity * (d - 1) + this._targetOpacity) / d;
        this._opacityDuration--;
    }
};

EncounterEffect.maxItems = function() {
    return this._data ? this._data.length : 0;
};

EncounterEffect.fragments = function() {
    return this._data || [];
};

EncounterEffect.isValid = function() {
    return !!this._data;
};

EncounterEffect.isReady = function() {
    return !this.isValid() || this._opacityDuration < 30;
};

EncounterEffect.breakDuration1 = function() {
    var param = MPPlugin.TypeParams[this.type];
    return param ? param["Break Duration 1"] : 45;
};

EncounterEffect.breakDuration2 = function() {
    var param = MPPlugin.TypeParams[this.type];
    return param ? param["Break Duration 2"] : 40;
};

EncounterEffect.encounterEffectSpeed = function() {
    var param = MPPlugin.TypeParams[this.type];
    if (param) {
        return param["Break Duration 1"] + param["Break Duration 2"] + 5;
    } else {
        return 60;
    }
};

EncounterEffect.fadeSpeed = function() {
    var param = MPPlugin.TypeParams[this.type];
    return param ? param["Scatter Duration"] : 24;
};

//-----------------------------------------------------------------------------
// Encounter_Fragment

function Encounter_Fragment() {
    this.initialize.apply(this, arguments);
}

Encounter_Fragment.prototype.initialize = function(frame) {
    this._frame = frame;
    this.initRect();
    
    this.createBitmap();
    this.initFrame();
    this.initPosition();
    this.initRotation();
    
    this._delay = 0;
    this.flashColor = null;
    this.visible = false;
};

Encounter_Fragment.prototype.initRect = function() {
    var frame = this._frame;
    var allX = frame.map( point => point.x );
    var allY = frame.map( point => point.y );
    var rect = new Rectangle();
    rect.x = Math.min.apply(null, allX);
    rect.y = Math.min.apply(null, allY);
    rect.width = Math.max.apply(null, allX) - rect.x;
    rect.height = Math.max.apply(null, allY) - rect.y;
    this._rect = rect;
};

Encounter_Fragment.prototype.createBitmap = function() {
    var rect = this.rect();
    var zoom = EncounterEffect.Zoom;
    var bw = Math.ceil(rect.width / zoom) + 2;
    var bh = Math.ceil(rect.height / zoom) + 2;
    this.bitmap = new Bitmap(bw, bh);
    this.bitmap.smooth = EncounterEffect.Smooth;
};

Encounter_Fragment.prototype.initFrame = function() {
    var frame = this._frame;
    var rect = this.rect();
    var zoom = EncounterEffect.Zoom;
    var context = this.bitmap._context;
    context.translate(-rect.x / zoom + 1, -rect.y / zoom + 1);
    context.beginPath();
    context.moveTo(frame[0].x / zoom, frame[0].y / zoom);
    for (var i = 1; i < frame.length; i++) {
        context.lineTo(frame[i].x / zoom, frame[i].y / zoom);
    }
    context.closePath();
};

Encounter_Fragment.prototype.initPosition = function() {
    var rect = this.rect();
    this.x = rect.x + Math.round(rect.width * this.anchorX());
    this.y = rect.y + Math.round(rect.height * this.anchorY());
    this.jumpHeight = 0;
    this._targetX = 0;
    this._targetY = 0;
    this._zoom = EncounterEffect.Zoom;
    this._targetZoom = this._zoom;
    this._moveDuration = 0;
};

Encounter_Fragment.prototype.initRotation = function() {
    this._speed = 0;
    this._pace = 0;
    this._rotationX = 0;
    this._rotationY = 0;
    this._rotationZ = 0;
    if (Math.random() < 0.5) {
        this._rotationSpeedX = (Math.random() + 0.5) * 2;
        this._rotationSpeedX *= (Math.random() < 0.5 ? -1 : 1);
        this._rotationSpeedY = 0;
    } else {
        this._rotationSpeedX = 0;
        this._rotationSpeedY = (Math.random() + 0.5) * 2;
        this._rotationSpeedY *= (Math.random() < 0.5 ? -1 : 1);
    }
    this._rotationSpeedZ = (Math.random() - 0.5) * 2;
};

Encounter_Fragment.prototype.rect = function() {
    return this._rect;
};

Encounter_Fragment.prototype.setSnap = function(snap) {
    var rect = this.rect();
    var zoom = EncounterEffect.Zoom;
    var context = this.bitmap._context;
    context.save();
    context.clip();
    var sx = rect.x;
    var sy = rect.y;
    
    switch (EncounterEffect.type) {
        case 1:
            var center = EncounterEffect.center;
            var radian = Math.atan2(this.y - center.y, this.x - center.x);
            sx -= 16 * Math.cos(radian) * MPPlugin.FragmentSlipRate / 100;
            sy -= 16 * Math.sin(radian) * MPPlugin.FragmentSlipRate / 100;
            
            break;
        case 2:
        case 3:
            var sides = EncounterEffect.Sides;
            sx += (Math.randomInt(17) - 8) * MPPlugin.FragmentSlipRate / 100;
            sy += (Math.randomInt(17) - 8) * MPPlugin.FragmentSlipRate / 100;
            sx = sx.clamp(sides.minX, sides.maxX - rect.width);
            sy = sy.clamp(sides.minY, sides.maxY - rect.height);
            break;
    }
    
    var dx = rect.x / zoom;
    var dy = rect.y / zoom;
    var dw = rect.width / zoom;
    var dh = rect.height / zoom;
    context.drawImage(snap.canvas, sx, sy, rect.width, rect.height, dx, dy, dw, dh);
    context.restore();
};

Encounter_Fragment.prototype.onBreak = function(color, snap, duration) {
    var context = this.bitmap._context;
    if (MPPlugin.LineWidth > 0) {
        context.lineWidth = MPPlugin.LineWidth / EncounterEffect.Zoom;
        context.strokeStyle = Method.toColor(color);
        context.globalAlpha = 0.5;
        context.stroke();
        context.globalAlpha = 1;
    }
    
    this.flashColor = color;
    
    if (EncounterEffect.NeedClip) {
        this.clipSnap(snap);
    }
    this.startEncounter(duration);
    this.visible = true;
};
Method.toColor = function(ary) {
    return 'rgb(%1,%2,%3)'.format(ary[0], ary[1], ary[2]);
};

Encounter_Fragment.prototype.clipSnap = function(snap) {
    var frame = this._frame;
    var rect = this.rect();
    var context = snap._context;
    context.save();
    context.beginPath();
    context.moveTo(frame[0].x, frame[0].y);
    for (var i = 1; i < frame.length; i++) {
        context.lineTo(frame[i].x, frame[i].y);
    }
    context.closePath();
    context.clip();
    context.clearRect(rect.x, rect.y, rect.width, rect.height);
    context.restore();
    snap._setDirty();
};

Encounter_Fragment.prototype.update = function() {
    if (this.visible && this.updateDelay()) {
        this.updateMove();
        this.updateRotation();
    }
};

Encounter_Fragment.prototype.updateDelay = function() {
    if (this._delay > 0) {
        this._delay--;
        return false;
    }
    return true;
};

Encounter_Fragment.prototype.updateMove = function() {
    if (this._moveDuration > 0) {
        var d = this._moveDuration;
        switch (EncounterEffect.type) {
            case 1:
                this.x += (this._targetX - this.x) * d / Method.tri(d);
                this.y += (this._targetY - this.y) * d / Method.tri(d);
                break;
            case 2:
                var n = this._moveMax - d;
                var max = Method.tri(this._moveMax) - Method.tri(n);
                this.x += (this._targetX - this.x) * (n + 1) / max;
                this.y += (this._targetY - this.y) * (n + 1) / max;
                break;
            case 3:
                var td = Method.tri(d);
                this.x += (this._targetX - this.x) * d / td;
                this.y += (this._targetY - this.y) * d / td;
                this._zoom += (this._targetZoom - this._zoom) * d / td;
                var peak = this._moveMax / 2;
                this.jumpHeight = (peak * peak - Math.pow(Math.abs(d - 1 - peak), 2)) / 8;
                this.visible = this._zoom < 8;
                break;
            default:
                this.x = (this.x * (d - 1) + this._targetX) / d;
                this.y = (this.y * (d - 1) + this._targetY) / d;
        }
        
        this._moveDuration--;
    }
};
Method.tri = function(n) {
    return n * (n + 1) / 2;
};

Encounter_Fragment.prototype.updateRotation = function() {
    if (this._speed > 0) {
        if (this._pace > 0) {
            this._speed *= 1.18;
        } else if (this._pace < 0) {
            this._speed *= 0.97;
        }
        this._rotationX += this._rotationSpeedX * this._speed;
        this._rotationY += this._rotationSpeedY * this._speed;
        this._rotationZ += this._rotationSpeedZ * this._speed;
    }
};

Encounter_Fragment.prototype.startEncounter = function(duration) {
    switch (EncounterEffect.type) {
        case 1:
            this._moveDuration = duration;
            var sx = this.x - EncounterEffect.center.x;
            var sy = this.y - EncounterEffect.center.y;
            this._speed = 1.5 / Math.sqrt(Math.sqrt(sx * sx + sy * sy));
            this._pace = -1;
            var rateX = MPPlugin.BreakRate / 10000;
            var rateY = MPPlugin.BreakRate / 10000;
            this.setMove_T1(rateX, rateY);
            break;
        case 2:
        case 3:
            this._moveDuration = 0;
            this._speed = 0.2;
            this._pace = -1;
            break;
    }
    this._speed *= MPPlugin.BreakRate / 100;
    
};

Encounter_Fragment.prototype.startBattle_T1 = function(d) {
    this._moveDuration = d;
    var sx = this.x - EncounterEffect.center.x;
    var sy = this.y - EncounterEffect.center.y;
    this._speed = 40 / Math.sqrt(Math.sqrt(sx * sx + sy * sy));
    this._pace = -1;
    this.setMove_T1(0.75 + Math.random() / 2, 0.75 + Math.random() / 2);
    this.setDelay(0);
};

Encounter_Fragment.prototype.setMove_T1 = function(rateX, rateY) {
    var sides = EncounterEffect.Sides;
    var cx = EncounterEffect.center.x;
    var cy = EncounterEffect.center.y;
    var sx = this.x - cx;
    var sy = this.y - cy;
    var ox = sx;
    var oy = sy;
    if (ox < 0) {
        oy *= (sides.minX - cx) / ox;
        ox = sides.minX - cx;
    } else if (ox > 0) {
        oy *= (sides.maxX - cx) / ox;
        ox = sides.maxX - cx;
    }
    if (oy < sides.minY - cy) {
        ox *= (sides.minY - cy) / oy;
        oy = sides.minY - cy;
    } else if (oy > sides.maxY - cy) {
        ox *= (sides.maxY - cy) / oy;
        oy = sides.maxY - cy;
    }
    this._targetX = this.x + (ox - sx) * rateX;
    this._targetY = this.y + (oy - sy) * rateY;
};

Encounter_Fragment.prototype.startBattle_T2 = function(d, i, direction) {
    this._moveDuration = Math.floor(d / 2);
    this._moveMax = this._moveDuration;
    this._speed = 1.6;
    this._pace = -1;
    this.setMove_T2(direction);
    this.setDelay(Math.floor(d / 2 * i / EncounterEffect.maxItems()));
};

Encounter_Fragment.prototype.setMove_T2 = function(direction) {
    //var cx = Graphics.width / 2;
    var cy = Graphics.height / 2;
    switch (direction) {
        case "left":
            this._targetX = this.x - Graphics.width;
            this._targetY = this.y + (this.y - cy) * 1.0;
            break;
        case "right":
            this._targetX = this.x + Graphics.width;
            this._targetY = this.y + (this.y - cy) * 1.0;
            break;
    }
};

Encounter_Fragment.prototype.startBattle_T3 = function(d, i) {
    this._moveDuration = d;
    this._moveMax = d;
    this._speed = 2;
    this._pace = 0;
    this.setMove_T3();
    this.setDelay(Math.floor(i * 8 / EncounterEffect.maxItems()));
};

Encounter_Fragment.prototype.setMove_T3 = function() {
    var cx = Graphics.width / 2;
    var cy = Graphics.height / 2;
    var sx = this.x - cx;
    var sy = this.y - cy;
    var rate = 3.5;
    this._targetX = (sx + Math.randomInt(35) - 17) * rate + cx;
    this._targetY = (sy + Math.randomInt(27) - 13) * rate + cy * 2;
    if (Math.abs(sx) + Math.abs(sy) < 128 && Math.random() < 0.25) {
        this._targetZoom = 16;
    } else {
        this._targetZoom = 1 + 5 * Math.random();
    }
};

Encounter_Fragment.prototype.setDelay = function(delay) {
    this._delay = delay;
};

Encounter_Fragment.prototype.anchorX = function() {
    return 0.5;
//    var frame = this._frame;
//    var rect = this.rect();
//    var total = frame.reduce( (r, point) => r + point.x - rect.x + 1, 0);
//    return total / frame.length / (rect.width + 2);
};

Encounter_Fragment.prototype.anchorY = function() {
    return 0.5;
//    var frame = this._frame;
//    var rect = this.rect();
//    var total = frame.reduce( (r, point) => r + point.y - rect.y + 1, 0);
//    return total / frame.length / (rect.height + 2);
};

Encounter_Fragment.prototype.scaleX = function() {
    return Math.cos(this._rotationX * Math.PI / 180) * this._zoom;
};

Encounter_Fragment.prototype.scaleY = function() {
    return Math.cos(this._rotationY * Math.PI / 180) * this._zoom;
};

Encounter_Fragment.prototype.rotation = function() {
    return this._rotationZ * Math.PI / 180;
};

//-----------------------------------------------------------------------------
// SceneManager

SceneManager._mppUpdateCount = 0;

//44
Alias.ScMa_initialize = SceneManager.initialize;
SceneManager.initialize = function() {
    Alias.ScMa_initialize.apply(this, arguments);
    EncounterEffect.initialize();
};

//195
Alias.ScMa_tickEnd = SceneManager.tickEnd;
SceneManager.tickEnd = function() {
    Alias.ScMa_tickEnd.apply(this, arguments);
    this._mppUpdateCount++;
};

SceneManager.clearMppUpdateCount = function() {
    this._mppUpdateCount = 0;
};

SceneManager.isMppDelayReady = function() {
    return this._mppUpdateCount >= MPPlugin.DelayCount;
};

//-----------------------------------------------------------------------------
// Game_System

//10
Alias.GaSy_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Alias.GaSy_initialize.apply(this, arguments);
    this._encEffType = MPPlugin.EffectType;
};

Game_System.prototype.getEncEffType = function() {
    return (this._encEffType === undefined ? MPPlugin.EffectType : this._encEffType);
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//1739
Alias.GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Alias.GaIn_pluginCommand.apply(this, arguments);
    var args2 = this.mppPluginCommandArgs(args);
    switch (command) {
        case MPPlugin.PluginCommands.EncounterEffectCharacter:
        case "EncEffChar":
            EncounterEffect.character = this.character(args2[0]);
            break;
        case MPPlugin.PluginCommands.EncounterEffectColor:
        case "EncEffColor":
            var r = args2[0];
            var g = args2[1];
            var b = args2[2];
            EncounterEffect.setColor(r, g, b);
            break;
        case MPPlugin.PluginCommands.EncounterEffectType:
        case "EncEffType":
            $gameSystem._encEffType = args2[0];
            break;
    }
};

Game_Interpreter.prototype.mppPluginCommandArgs = function(args) {
    var v = $gameVariables._data;
    return args.map(function(arg) {
        try {
            return eval(arg) || 0;
        } catch (e) {
            return arg;
        }
    });
};

//-----------------------------------------------------------------------------
// Sprite_Fragment

function Sprite_Fragment() {
    this.initialize.apply(this, arguments);
}

Sprite_Fragment.prototype = Object.create(Sprite.prototype);
Sprite_Fragment.prototype.constructor = Sprite_Fragment;

Sprite_Fragment.FlashRate = Utils.isMobileDevice() ? 24 : 8;

Sprite_Fragment.prototype.initialize = function(fragment) {
    this._fragment = fragment;
    Sprite.prototype.initialize.call(this, fragment.bitmap);
    this.anchor.x = fragment.anchorX();
    this.anchor.y = fragment.anchorY();
    this._flashColor = [0, 0, 0, 0];
    this._flashDuration = 0;
    this.update();
};

Sprite_Fragment.prototype.update = function() {
    Sprite.prototype.update.call(this);
    var fragment = this._fragment;
    this.x = fragment.x;
    this.y = fragment.y - fragment.jumpHeight;
    this.scale.x = fragment.scaleX();
    this.scale.y = fragment.scaleY();
    this.rotation = fragment.rotation();
    this.updateFlash();
    this.visible = fragment.visible;
};

Sprite_Fragment.prototype.updateFlash = function() {
    this.setupFlash();
    if (this._flashDuration > 0) {
        var d = this._flashDuration--;
        this._flashColor[3] *= (d - 1) / d;
        if (d % Sprite_Fragment.FlashRate === 1) {
            this.setBlendColor(this._flashColor);
        }
    }
};

Sprite_Fragment.prototype.setupFlash = function() {
    if (this._fragment.flashColor) {
        this.startFlash(this._fragment.flashColor);
        this._fragment.flashColor = null;
    }
};

Sprite_Fragment.prototype.startFlash = function(color) {
    this._flashDuration = 25;
    this._flashColor = color.clone();
    this._flashColor[3] = MPPlugin.FlashOpacity;
};

//-----------------------------------------------------------------------------
// Sprite_Actor

//174
Alias.SpAc_updateMove = Sprite_Actor.prototype.updateMove;
Sprite_Actor.prototype.updateMove = function() {
    if (EncounterEffect.isReady())
        Alias.SpAc_updateMove.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Scene_Base

Scene_Base.prototype.createEncEffSprites = function() {
    this._encEffContainer = new Sprite();
    this._encEffContainer.bitmap = EncounterEffect.snap;
    var fragments = EncounterEffect.fragments();
    for (var i = 0; i < fragments.length; i++) {
        this._encEffContainer.addChild(new Sprite_Fragment(fragments[i]));
    }
    this.addChild(this._encEffContainer);
    this.testSprite = this._encEffContainer.children[0];
};

//-----------------------------------------------------------------------------
// Scene_Map

//300
Alias.ScMa_launchBattle = Scene_Map.prototype.launchBattle;
Scene_Map.prototype.launchBattle = function() {
    var type = $gameSystem.getEncEffType();
    if (type === 0) {
        EncounterEffect.clear();
        Alias.ScMa_launchBattle.apply(this, arguments);
    } else {
        this.snapForBattleBackground();
        this._windowLayer.visible = false;
        EncounterEffect.setup(SceneManager.snap(), type);
        Alias.ScMa_launchBattle.apply(this, arguments);
        this._spriteset.visible = false;
        this.createEncEffSprites();
        SceneManager.clearMppUpdateCount();
    }
};

//322
Alias.ScMa_updateEncounterEffect = Scene_Map.prototype.updateEncounterEffect
Scene_Map.prototype.updateEncounterEffect = function() {
    if (EncounterEffect.isValid()) {
        if (!SceneManager.isMppDelayReady()) return;
        if (this._encounterEffectDuration > 0) {
            EncounterEffect.update();
            this._encounterEffectDuration--;
            var speed = this.encounterEffectSpeed();
            var n = speed - this._encounterEffectDuration;
            var end = EncounterEffect.breakDuration1();
            if (n <= end) {
                var i = Math.floor(EncounterEffect.maxItems() * (n - 1) / end);
                var max = Math.floor(EncounterEffect.maxItems() * n / end);
                for (; i < max; i++) {
                    EncounterEffect.break(i, speed);
                }
            }
            if (n === end) {
                EncounterEffect.terminate();
                this._encEffContainer.bitmap = null;
            }
            if (n === Math.floor(speed / 5)) {
                BattleManager.playBattleBgm();
            }
            if (n === speed && !ImageManager.isReady()) {
                this._encounterEffectDuration = 1;
            }
        }
    } else {
        Alias.ScMa_updateEncounterEffect.apply(this, arguments);
    }
};

//358
Alias.ScMa_encounterEffectSpeed = Scene_Map.prototype.encounterEffectSpeed;
Scene_Map.prototype.encounterEffectSpeed = function() {
    if (EncounterEffect.isValid()) {
        return EncounterEffect.encounterEffectSpeed();
    } else {
        return Alias.ScMa_encounterEffectSpeed.apply(this, arguments);
    }
};

//-----------------------------------------------------------------------------
// Scene_Battle

//13
Alias.ScBat_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
    Alias.ScBat_initialize.apply(this, arguments);
    this._fadeDelay = 0;
};

//17
Alias.ScBat_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
    Alias.ScBat_create.apply(this, arguments);
    if (EncounterEffect.isValid()) {
        this._spriteset.visible = false;
        SceneManager.clearMppUpdateCount();
    }
};

//22
Alias.ScBat_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
    Alias.ScBat_start.apply(this, arguments);
    if (EncounterEffect.isValid()) {
        EncounterEffect.startBattle(this.fadeSpeed());
        this._fadeDelay = 15;
        this.createEncEffSprites();
    }
};

//29
Alias.ScBat_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    Alias.ScBat_update.apply(this, arguments);
    if (EncounterEffect.isValid()) {
        if (!SceneManager.isMppDelayReady()) return;
        EncounterEffect.update();
        this._encEffContainer.opacity = EncounterEffect.opacity;
        if (!EncounterEffect.isValid()) {
            this.removeChild(this._encEffContainer);
            delete this._encEffContainer;
        }
    }
};

//
if (Scene_Battle.prototype.hasOwnProperty('updateFade')) {
    Alias.ScBat_updateFade = Scene_Battle.prototype.updateFade;
}
Scene_Battle.prototype.updateFade = function() {
    if (this._fadeDelay > 0) {
        if (!SceneManager.isMppDelayReady()) return;
        this._fadeDelay--;
        this._spriteset.visible = (this._fadeDelay === 0);
    } else {
        var _super = Alias.ScBat_updateFade || Scene_Base.prototype.updateFade;
        return _super.apply(this, arguments);
    }
};

//
if (Scene_Battle.prototype.hasOwnProperty('fadeSpeed')) {
    Alias.ScBa_fadeSpeed = Scene_Battle.prototype.fadeSpeed;
}
Scene_Battle.prototype.fadeSpeed = function() {
    if (EncounterEffect.isValid()) {
        return EncounterEffect.fadeSpeed();
    } else {
        var _super = Alias.ScBa_fadeSpeed || Scene_Base.prototype.fadeSpeed;
        return _super.apply(this, arguments);
    }
};






})();
