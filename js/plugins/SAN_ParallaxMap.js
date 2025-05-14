//=============================================================================
// SAN_ParallaxMap.js
//=============================================================================
// Copyright (c) 2018 Sanshiro
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc パララックスマップ ver1.1.2
 * 遠景マップ風のマップ機能を提供します。
 * 
 * @author サンシロ https://twitter.com/rev2nym
 * 
 * @param particleWidth
 * @desc 画像表示パーティクルの幅です。
 * 詳細はヘルプを参照してください。
 * @default 48
 * 
 * @param particleHeight
 * @desc 画像表示パーティクルの高さです。
 * 詳細はヘルプを参照してください。
 * @default 48
 * 
 * @help
 * ■概要
 * 遠景マップ風のマップ機能を提供します。
 * 
 * ■画像ファイル
 * パララックスマップに使用する画像ファイルは
 * 「img\parallaxes」フォルダに配置してください。
 * マップと同じ大きさの画像を使用してください。
 * 
 * ■マップ設定
 * マップの「メモ欄」に次の書式で
 * 使用する画像ファイルを記述してください。
 * 
 *   <SAN_ParallaxMap:{
 *     "imageName":"filename"
 *   }>
 * 
 *   ・filename : 使用する画像のファイル名です。
 *                拡張子は省略してください。
 * 
 * 例
 *   <SAN_ParallaxMap:{
 *     "imageName":"BlueSky"
 *   }>
 * 
 * ■画像表示パーティクル幅・高さ
 * プラグインパラメータで画像表示パーティクルのサイズを設定できます。
 * 画像表示パーティクルのサイズが大きいほど
 * スクロールによる再描画の面積が増え次数が減ります。
 * 
 * タイルサイズより小さい場合は内部的にタイルサイズと同じ値に変更されます。
 * 画面サイズより大きい場合は内部的に画面サイズと同じ値に変更されます。
 * 
 * ■利用規約
 * MITライセンスのもと、商用利用、改変、再配布が可能です。
 * ただし冒頭のコメントは削除や改変をしないでください。
 * よかったらクレジットに作者名を記載してください。
 * 
 * これを利用したことによるいかなる損害にも作者は責任を負いません。
 * サポートは期待しないでください＞＜。
 * 
 * ■更新履歴
 * ver1.1.2 2018/04/23
 * 画像ロードタイミング見直し。
 * リファクタリング。
 * 
 * ver1.1.1 2018/02/04
 * 処理最適化。
 * リファクタリング。
 * 
 * ver1.1.0 2018/02/04
 * ループマップ対応。
 * 
 * ver1.0.0 2018/02/02
 * 公開。
 * 
 */

var Imported = Imported || {};
Imported.SAN_ParallaxMap = true;

var Sanshiro = Sanshiro || {};
Sanshiro.ParallaxMap = Sanshiro.ParallaxMap || {};
Sanshiro.ParallaxMap.version = '1.1.2';

(function(root) {
'use strict';

// プラグイン名称
var pluginName = 'SAN_ParallaxMap';

// プラグインパラメータ
var pluginParameters = PluginManager.parameters(pluginName);

//-----------------------------------------------------------------------------
// ParallaxMap
//
// パララックスマップ

function ParallaxMap() {
    this.initialize.apply(this, arguments);
}

// オブジェクト初期化
ParallaxMap.prototype.initialize = function() {
    this.initImageName();
    this.initDisplayPos();
    this.initParticleSize();
    this.initParticleNum();
};

// 画像ファイル名の初期化
ParallaxMap.prototype.initImageName = function() {
    this._imageName = '';
};

// 表示位置の初期化
ParallaxMap.prototype.initDisplayPos = function() {
    this._displayX = 0;
    this._displayY = 0;
};

// パーティクルサイズの初期化
ParallaxMap.prototype.initParticleSize = function() {
    this._particleWidth = 0;
    this._particleHeight = 0;
};

// 画面パーティクル数の初期化
ParallaxMap.prototype.initParticleNum = function() {
    this._particleNumX = 0;
    this._particleNumY = 0;
};

// セットアップ
ParallaxMap.prototype.setup = function() {
    this.setupImageName();
    this.setupParticleSize();
    this.setupParticleNum();
};

// 画像ファイル名のセットアップ
ParallaxMap.prototype.setupImageName = function() {
    var meta = $dataMap.meta[pluginName];
    if (!!meta) {
        var note = JsonEx.parse(meta);
        this._imageName = note.imageName;
    } else {
        this._imageName = '';
    }
};

// パーティクルサイズのセットアップ
ParallaxMap.prototype.setupParticleSize = function() {
    this._particleWidth = (
        Math.max(
            $gameMap.tileWidth(),
            Math.min(
                Number(pluginParameters.particleWidth),
                Graphics.boxWidth
            )
        )
    );
    this._particleHeight = (
        Math.max(
            $gameMap.tileHeight(),
            Math.min(
                Number(pluginParameters.particleHeight),
                Graphics.boxHeight
            )
        )
    );
};

// パーティクル数のセットアップ
ParallaxMap.prototype.setupParticleNum = function() {
    this._particleNumX =
        Math.ceil(Graphics.boxWidth / this._particleWidth) + 1;
    this._particleNumY =
        Math.ceil(Graphics.boxHeight / this._particleHeight) + 1;
};

// 画像ファイル名
ParallaxMap.prototype.imageName = function() {
    return this._imageName;
};

// パーティクル幅
ParallaxMap.prototype.particleWidth = function() {
    return this._particleWidth;
};

// パーティクル高さ
ParallaxMap.prototype.particleHeight = function() {
    return this._particleHeight;
};

// Xパーティクル数
ParallaxMap.prototype.particleNumX = function() {
    return this._particleNumX;
};

// Yパーティクル数
ParallaxMap.prototype.particleNumY = function() {
    return this._particleNumY;
};

// マップ幅
ParallaxMap.prototype.mapWidth = function() {
    return $gameMap.width() * $gameMap.tileWidth();
};

// マップ高さ
ParallaxMap.prototype.mapHeight = function() {
    return $gameMap.height() * $gameMap.tileHeight();
};

// Xスクロール
ParallaxMap.prototype.scrollX = function() {
    return this._displayX * $gameMap.tileWidth();
};

// Yスクロール
ParallaxMap.prototype.scrollY = function() {
    return this._displayY * $gameMap.tileHeight();
};

// パーティクルXスクロール
ParallaxMap.prototype.particleScrollX = function() {
    return Math.floor(this.scrollX() / this._particleWidth);
};

// パーティクルYスクロール
ParallaxMap.prototype.particleScrollY = function() {
    return Math.floor(this.scrollY() / this._particleHeight);
};

// 表示位置の設定
ParallaxMap.prototype.setDisplayPos = function(displayX, displayY) {
    this._displayX = displayX;
    this._displayY = displayY;
};

// 右スクロール
ParallaxMap.prototype.scrollRight = function(distance) {
    this._displayX += distance;
};

// 左スクロール
ParallaxMap.prototype.scrollLeft = function(distance) {
    this._displayX -= distance;
};

// 下スクロール
ParallaxMap.prototype.scrollDown = function(distance) {
    this._displayY += distance;
};

// 上スクロール
ParallaxMap.prototype.scrollUp = function(distance) {
    this._displayY -= distance;
};

//-----------------------------------------------------------------------------
// Game_Map
//
// マップ

// オブジェクト初期化
var _Game_Map_initialize =
    Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.call(this);
    this.initParallaxMap();
};

// パララックスマップの初期化
Game_Map.prototype.initParallaxMap = function() {
    this._parallaxMap = new ParallaxMap();
};

// セットアップ
var _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.setupParallaxMap();
};

// パララックスマップのセットアップ
Game_Map.prototype.setupParallaxMap = function() {
    this._parallaxMap.setup();
};

// パララックスマップ
Game_Map.prototype.parallaxMap = function() {
    return this._parallaxMap;
};

// パララックスマップ存在判定
Game_Map.prototype.hasParallaxMap = function() {
    return !!this._parallaxMap.imageName();
};

// 表示位置の設定
var _Game_Map_setDisplayPos = 
    Game_Map.prototype.setDisplayPos;
Game_Map.prototype.setDisplayPos = function(x, y) {
    _Game_Map_setDisplayPos.call(this, x, y);
    this._parallaxMap.setDisplayPos(this._displayX, this._displayY);
};

// 右スクロール
var _Game_Map_scrollRight =
    Game_Map.prototype.scrollRight;
Game_Map.prototype.scrollRight = function(distance) {
    var lastDisplayX = this._displayX;
    _Game_Map_scrollRight.call(this, distance);
    if (this._displayX !== lastDisplayX) {
        this._parallaxMap.scrollRight(distance);
    }
};

// 左スクロール
var _Game_Map_scrollLeft =
    Game_Map.prototype.scrollLeft
Game_Map.prototype.scrollLeft = function(distance) {
    var lastDisplayX = this._displayX;
    _Game_Map_scrollLeft.call(this, distance);
    if (this._displayX !== lastDisplayX) {
        this._parallaxMap.scrollLeft(distance);
    }
};

// 下スクロール
var _Game_Map_scrollDown =
    Game_Map.prototype.scrollDown
Game_Map.prototype.scrollDown = function(distance) {
    var lastDisplayY = this._displayY;
    _Game_Map_scrollDown.call(this, distance);
    if (this._displayY !== lastDisplayY) {
        this._parallaxMap.scrollDown(distance);
    }
};

// 上スクロール
var _Game_Map_scrollUp =
    Game_Map.prototype.scrollUp
Game_Map.prototype.scrollUp = function(distance) {
    var lastDisplayY = this._displayY;
    _Game_Map_scrollUp.call(this, distance);
    if (this._displayY !== lastDisplayY) {
        this._parallaxMap.scrollUp(distance);
    }
};

//-----------------------------------------------------------------------------
// Sprites_ParallaxMap
//
// パララックスマップスプライトリスト

function Sprites_ParallaxMap() {
    this.initialize.apply(this, arguments);
}

Sprites_ParallaxMap.prototype = Object.create(Sprite.prototype);
Sprites_ParallaxMap.prototype.constructor = Sprites_ParallaxMap;

// オブジェクト初期化
Sprites_ParallaxMap.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initSourceBitmap();
    this.createParticleSprites();
};

// ソースビットマップの初期化
Sprites_ParallaxMap.prototype.initSourceBitmap = function() {
    this.reserveSourceBitmap();
};

// ソースビットマップロード予約
Sprites_ParallaxMap.prototype.reserveSourceBitmap = function() {
    this._sourceBitmap = ImageManager.reserveParallax(
        $gameMap.parallaxMap().imageName()
    );
};

// マップスプライトリストの生成
Sprites_ParallaxMap.prototype.createParticleSprites = function() {
    this._particleSprites = [];
    var prtNumX = $gameMap.parallaxMap().particleNumX();
    var prtNumY = $gameMap.parallaxMap().particleNumY();
    for (var indexY = 0; indexY < prtNumY; indexY++) {
        for (var indexX = 0; indexX < prtNumX; indexX++) {
            var particleSprite =
                new Sprite_ParallaxMapParticle(indexX, indexY);
            this._particleSprites.push(particleSprite);
            this.addChild(particleSprite);
        }
    }
};

// ソースビットマップ
Sprites_ParallaxMap.prototype.sourceBitmap = function() {
    return this._sourceBitmap;
};

//-----------------------------------------------------------------------------
// Sprite_ParallaxMapParticle
//
// パララックスマップパーティクルスプライト

function Sprite_ParallaxMapParticle() {
    this.initialize.apply(this, arguments);
}

Sprite_ParallaxMapParticle.prototype = Object.create(Sprite.prototype);
Sprite_ParallaxMapParticle.prototype.constructor = Sprite_ParallaxMapParticle;

// オブジェクト初期化
Sprite_ParallaxMapParticle.prototype.initialize = function(indexX, indexY) {
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(
        $gameMap.parallaxMap().particleWidth(),
        $gameMap.parallaxMap().particleHeight()
    );
    this._indexX = indexX;
    this._indexY = indexY;
    this._sourceX = null;
    this._sourceY = null;
};

// フレーム更新
Sprite_ParallaxMapParticle.prototype.update = function() {
    this.updatePosition();
    this.updateBitmap();
    Sprite.prototype.update.call(this);
};

// ソースビットマップ
Sprite_ParallaxMapParticle.prototype.sourceBitmap = function() {
    return this.parent.sourceBitmap();
};

// ビットマップの更新
Sprite_ParallaxMapParticle.prototype.updateBitmap = function() {
    if (!this.sourceBitmap().isReady()) {
        return;
    }
    var srcX = this.calcSrcX();
    var srcY = this.calcSrcY();
    if (this._sourceX !== srcX || this._sourceY !== srcY) {
        this.drawBitmap(srcX, srcY);
        this._sourceX = srcX;
        this._sourceY = srcY;
    }
};

// ビットマップ転送X座標の計算
Sprite_ParallaxMapParticle.prototype.calcSrcX = function() {
    var mapW = $gameMap.parallaxMap().mapWidth();
    var prtNumX = $gameMap.parallaxMap().particleNumX();
    var prtScrX = $gameMap.parallaxMap().particleScrollX();
    var sprScrX = Math.ceil((prtScrX - this._indexX) / prtNumX);
    var idxX = (sprScrX * prtNumX) + this._indexX;
    var srcX = (((this.width * idxX) % mapW) + mapW) % mapW;
    return srcX;
};

// ビットマップ転送Y座標の計算
Sprite_ParallaxMapParticle.prototype.calcSrcY = function() {
    var mapH = $gameMap.parallaxMap().mapHeight();
    var prtScrY = $gameMap.parallaxMap().particleScrollY();
    var prtNumY = $gameMap.parallaxMap().particleNumY();
    var sprScrY = Math.ceil((prtScrY - this._indexY) / prtNumY);
    var idxY = (sprScrY * prtNumY) + this._indexY;
    var srcY = (((this.height * idxY) % mapH) + mapH) % mapH;
    return srcY;
};

// ビットマップ描画
Sprite_ParallaxMapParticle.prototype.drawBitmap = function(srcX1, srcY1) {
    var srcBitmap = this.sourceBitmap();
    var srcX2 = Math.max(0, srcX1 - srcBitmap.width);
    var srcY2 = Math.max(0, srcY1 - srcBitmap.height);
    var srcW1 = Math.max(0, Math.min(this.width, srcBitmap.width - srcX1));
    var srcH1 = Math.max(0, Math.min(this.height, srcBitmap.height - srcY1));
    var srcW2 = this.width - srcW1;
    var srcH2 = this.height - srcH1;
    this.bitmap.clear();
    this.bitmap.blt(srcBitmap, srcX1, srcY1, srcW1, srcH1, 0, 0);
    this.bitmap.blt(srcBitmap, srcX2, srcY1, srcW2, srcH1, srcW1, 0);
    this.bitmap.blt(srcBitmap, srcX1, srcY2, srcW1, srcH2, 0, srcH1);
    this.bitmap.blt(srcBitmap, srcX2, srcY2, srcW2, srcH2, srcW1, srcH1);
};

// 位置座標の更新
Sprite_ParallaxMapParticle.prototype.updatePosition = function() {
    this.x = this.calcX();
    this.y = this.calcY();
};

// X座標の計算
Sprite_ParallaxMapParticle.prototype.calcX = function() {
    var scrX = $gameMap.parallaxMap().scrollX();
    var prtScrX = $gameMap.parallaxMap().particleScrollX();
    var prtNumX = $gameMap.parallaxMap().particleNumX();
    var sprScrX = Math.ceil((prtScrX - this._indexX) / prtNumX);
    var idxX = (sprScrX * prtNumX) + this._indexX;
    var x = (this.width * idxX) - scrX;
    return x;
};

// Y座標の計算
Sprite_ParallaxMapParticle.prototype.calcY = function() {
    var scrY = $gameMap.parallaxMap().scrollY();
    var prtScrY = $gameMap.parallaxMap().particleScrollY();
    var prtNumY = $gameMap.parallaxMap().particleNumY();
    var sprScrY = Math.ceil((prtScrY - this._indexY) / prtNumY);
    var idxY = (sprScrY * prtNumY) + this._indexY;
    var y = (this.height * idxY) - scrY;
    return y;
};

//-----------------------------------------------------------------------------
// Spriteset_Map
//
// マップスプライトセット

// 遠景の生成
var _Spriteset_Map_createParallax = Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
    _Spriteset_Map_createParallax.call(this);
    if ($gameMap.hasParallaxMap()) {
        this.createParallaxMap();
    }
};

// パララックスマップの生成
Spriteset_Map.prototype.createParallaxMap = function() {
    this._parallaxMap = new Sprites_ParallaxMap();
    this._baseSprite.addChild(this._parallaxMap);
};

//-----------------------------------------------------------------------------
// クラスのグローバル化

root.ParallaxMap = ParallaxMap;
root.Sprites_ParallaxMap = Sprites_ParallaxMap;
root.Sprite_ParallaxMapParticle = Sprite_ParallaxMapParticle;

})(this);
