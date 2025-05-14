//=============================================================================
// SAN_ResidualSprites.js
//=============================================================================
// Copyright (c) 2017 Sanshiro
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 残像スプライツ 1.0.2
 * キャラクターの残像スプライトを生成します。
 * @author サンシロ https://twitter.com/rev2nym
 * @version 1.0.2 2017/02/23 ヘルプの誤りを修正。
 * 1.0.1 2017/02/23 セーブデータ互換対策。
 * 1.0.0 2017/02/23 作成
 * 
 * @help
 * ■概要
 * マップシーンでキャラクターの残像スプライトを生成します。
 * キャラクター毎に残像スプライト生成を有効化することができます。
 * 残像スプライト生成が有効の間はスプライトが生成され続けます。
 * 
 * ■プレイヤーの残像
 * プレイヤーの残像スプライト生成の有効無効を設定するには
 * 次のスクリプトコマンドを実行してください。
 * 
 *   $gamePlayer.residual().setValid(valid);
 *   ・valid : 残像有効フラグです。
 *             trueで有効、falseで無効です。
 * 
 * ■フォロワーの残像
 * フォロワーの残像スプライト生成の有効無効を設定するには
 * 次のスクリプトコマンドを実行してください。
 * 
 *   $gamePlayer.followers().follower(index).residual().setValid(valid);
 *   ・index : フォロワーのインデックスです。
 *             0のときパーティの2人目のキャラクターを指します。
 *   ・valid : 残像有効フラグです。
 *             trueで有効、falseで無効です。
 * 
 * ■イベントの残像
 * イベントの残像スプライト生成の有効無効を設定するには
 * 次のスクリプトコマンドを実行してください。
 * 
 *   $gameMap.event(eventId).residual().setValid(valid);
 *   ・eventId : イベントIDです。
 *   ・valid   : 残像有効フラグです。
 *               trueで有効、falseで無効です。
 * 
 * ■詳細設定
 * キャラクター毎に残像表示の詳細を設定をすることができます。
 * それぞれ次のスクリプトコマンドを実行してください。
 * 
 * ・周期フレーム数
 *   character.residual().setPeriod(period);
 *   ・period : 残像の生成周期のフレーム数です。
 * 
 * ・表示フレーム数
 *   character.residual().setDuration(duration);
 *   ・duration : 表示フレーム数です。
 * 
 * ・カラートーン
 *   character.residual().setColorTone([r, g, b, gray]);
 *   ・r, g, b, gray : 色の設定値です。
 *                     0～255の間の値を指定してください。
 * 
 * ・不透明度
 *   character.residual().setOpacity(opacity);
 *   ・opacity : 不透明度です。
 *               0～255の間の値を指定してください。
 * 
 * ※characterはGame_Characterクラスのオブジェクトです。
 *   $gamePlayerなどが該当します。
 * 
 * ※Game_ActorやGame_Enemyクラスのオブジェクトにも
 *   残像を設定することができます。
 * 
 * ■利用規約
 * MITライセンスのもと、商用利用、改変、再配布が可能です。
 * ただし冒頭のコメントは削除や改変をしないでください。
 * 
 * これを利用したことによるいかなる損害にも作者は責任を負いません。
 * サポートは期待しないでください＞＜。
 */

var Imported = Imported || {};
Imported.SAN_ResidualSprites = true;

var Sanshiro = Sanshiro || {};
Sanshiro.ResidualSprites = Sanshiro.ResidualSprites || {};
Sanshiro.ResidualSprites.version = '1.0.2';

(function(SAN) {
'use strict';

//-----------------------------------------------------------------------------
// Residual
//
// 残像パラメータ

function Residual() {
    this.initialize.apply(this, arguments);
}

// オブジェクト初期化
Residual.prototype.initialize = function() {
    this._version = SAN.ResidualSprites.version;
    this._valid = false;
    this._aliveCount = 0;
    this._period = 4;
    this._duration = 30;
    this._colorTone = [0, 0, 255, 255];
    this._opacity = 128;
};

// プラグインバージョン一致判定
Residual.prototype.isCurrentVersion = function() {
    return this._version === SAN.ResidualSprites.version;
};

// 有効フラグの設定
Residual.prototype.setValid = function(valid) {
    this._valid = valid;
    this._count = 0;
};

// 有効フラグ
Residual.prototype.valid = function() {
    return this._valid;
};

// 生成周期フレーム数の設定
Residual.prototype.setPeriod = function(period) {
    this._period = period;
};

// 表示フレーム数の設定
Residual.prototype.setDuration = function(duration) {
    this._duration = duration;
};

// 表示フレーム数
Residual.prototype.duration = function() {
    return this._duration;
};

// カラートーンの設定
Residual.prototype.setColorTone = function(colorTone) {
    this._colorTone = colorTone;
};

// カラートーン
Residual.prototype.colorTone = function() {
    return this._colorTone;
};

// 不透明度の設定
Residual.prototype.setOpacity = function(opacity) {
    this._opacity = opacity;
};

// 不透明度
Residual.prototype.opacity = function() {
    return this._opacity;
};

// フレーム更新
Residual.prototype.update = function() {
    if (this._valid) {
        this._aliveCount += 1;
    }
};

// 必要判定
Residual.prototype.needs = function() {
    return this._valid && this._aliveCount % this._period === 0;
};

//-----------------------------------------------------------------------------
// Game_Character
//
// キャラクター

// メンバー変数の初期化
var _Game_Character_initMembers = Game_Character.prototype.initMembers;
Game_Character.prototype.initMembers = function() {
    _Game_Character_initMembers.call(this);
    this.initResidual();
};

// 残像パラメータの初期化
Game_Character.prototype.initResidual = function() {
    this._residual = new Residual();
};

// 残像パラメータ
Game_Character.prototype.residual = function() {
    if (!this._residual ||
        !this._residual.isCurrentVersion ||
        !this._residual.isCurrentVersion())
    {
        this.initResidual();
    }
    return this._residual;
};

// 残像パラメータの更新
Game_Character.prototype.updateResidual = function() {
    this.residual().update();
};

//-----------------------------------------------------------------------------
// Game_Battler
//
// バトラー

// メンバー変数の初期化
var _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this.initResidual();
};

// 残像設定の初期化
Game_Battler.prototype.initResidual = function() {
    this._residual = new Residual();
};

// 残像パラメータ
Game_Battler.prototype.residual = function() {
    if (!this._residual ||
        !this._residual.isCurrentVersion ||
        !this._residual.isCurrentVersion())
    {
        this.initResidual();
    }
    return this._residual;
};

// 残像パラメータの更新
Game_Battler.prototype.updateResidual = function() {
    this.residual().update();
};

//-----------------------------------------------------------------------------
// Sprite
//
// スプライト

// フレーム
Sprite.prototype.frame = function() {
    return this._frame;
};

//-----------------------------------------------------------------------------
// Sprite_Residual
//
// 残像スプライト

function Sprite_Residual() {
    this.initialize.apply(this, arguments);
}

Sprite_Residual.prototype = Object.create(Sprite.prototype);
Sprite_Residual.prototype.constructor = Sprite_Residual;

// オブジェクト初期化
Sprite_Residual.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
};

// メンバ変数の初期化
Sprite_Residual.prototype.initMembers = function() {
    this._orgX = 0.0;
    this._orgY = 0.0;
    this._orgOpacity = 0;
    this._duration = 0;
    this._aliveCount = 0;
};

// セットアップ
Sprite_Residual.prototype.setup =
    function(containerSprite, sourceSprite, colorTone, opacity, duration)
{
    this.setupPosition(containerSprite);
    this.setupBitmap(sourceSprite);
    this.setColorTone(colorTone);
    this._orgOpacity = opacity;
    this._duration = duration;
    this._aliveCount = 0;
};

// 位置のセットアップ
Sprite_Residual.prototype.setupPosition = function(sourceSprite) {
    this.x = sourceSprite.x;
    this.y = sourceSprite.y;
    this.z = sourceSprite.z ? sourceSprite.z - 0.5 : 0.0;
    this._orgX = this.x;
    this._orgY = this.y;
    if (!!sourceSprite.parent.origin) {
        this._orgX += sourceSprite.parent.origin.x;
        this._orgY += sourceSprite.parent.origin.y;
    }
    this.scale.x = sourceSprite.scale.x;
    this.scale.y = sourceSprite.scale.y;
    this.anchor.x = sourceSprite.anchor.x;
    this.anchor.y = sourceSprite.anchor.y;
    this.rotation = sourceSprite.rotation;
};

// ビットマップのセットアップ
Sprite_Residual.prototype.setupBitmap = function(sourceSprite) {
    var frame = sourceSprite.frame();
    if (frame.width !== 0 && frame.height !== 0) {
        this.bitmap = sourceSprite.bitmap;
        this.setFrame(frame.x, frame.y, frame.width, frame.height);
    }
};

// 生存状態判定
Sprite_Residual.prototype.isAlive = function() {
    return this._aliveCount < this._duration;
};

// フレーム更新
Sprite_Residual.prototype.update = function() {
    this.updatePosition();
    this.updateOpacity();
    this.updateAlive();
    Sprite.prototype.update.call(this);
};

// 位置の更新
Sprite_Residual.prototype.updatePosition = function() {
    if (!!this.parent.origin) {
        this.x = this._orgX - this.parent.origin.x;
        this.y = this._orgY - this.parent.origin.y;
    }
};

// 不透明度の更新
Sprite_Residual.prototype.updateOpacity = function() {
    this.opacity = this._orgOpacity * (1.0 - (this._aliveCount / this._duration));
};

// 生存状態の更新
Sprite_Residual.prototype.updateAlive = function() {
    if (this.isAlive()) {
        this._aliveCount++;
    } else {
        this.parent.removeChild(this);
    }
};

//-----------------------------------------------------------------------------
// Sprite_Character
//
// キャラクタースプライト

// フレーム更新
var _Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this)
    this.updateResidual();
};

// 残像の更新
Sprite_Character.prototype.updateResidual = function() {
    this._character.updateResidual();
    if (this._character.residual().needs()) {
        this.createResidualSprite();
    }
};

// 残像スプライトの生成
Sprite_Character.prototype.createResidualSprite = function() {
    var residual = this._character.residual();
    var residualSprite = new Sprite_Residual();
    residualSprite.setup(
        this,
        this,
        residual.colorTone(),
        residual.opacity(),
        residual.duration()
    );
    var index = this.parent.getChildIndex(this);
    this.parent.addChildAt(residualSprite, index);
};

//-----------------------------------------------------------------------------
// Sprite_Actor
//
// アクタースプライト

// フレーム更新
var _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
    _Sprite_Actor_update.call(this)
    this.updateResidual();
};

// 残像の更新
Sprite_Actor.prototype.updateResidual = function() {
    if (!!this._actor) {
        this._actor.updateResidual();
        if (this._actor.residual().needs()) {
            this.createResidualSprite();
        }
    }
};

// 残像スプライトの生成
Sprite_Actor.prototype.createResidualSprite = function() {
    var residual = this._actor.residual();
    var residualSprite = new Sprite_Residual();
    residualSprite.setup(
        this,
        this._mainSprite,
        residual.colorTone(),
        residual.opacity(),
        residual.duration()
    );
    var index = this.parent.getChildIndex(this);
    this.parent.addChildAt(residualSprite, index);
};

//-----------------------------------------------------------------------------
// Sprite_Enemy
//
// エネミースプライト

// フレーム更新
var _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    _Sprite_Enemy_update.call(this)
    this.updateResidual();
};

// 残像の更新
Sprite_Enemy.prototype.updateResidual = function() {
    this._battler.updateResidual();
    if (this._battler.residual().needs()) {
        this.createResidualSprite();
    }
};

// 残像スプライトの生成
Sprite_Enemy.prototype.createResidualSprite = function() {
    var residual = this._battler.residual();
    var residualSprite = new Sprite_Residual();
    residualSprite.setup(
        this,
        this,
        residual.colorTone(),
        residual.opacity(),
        residual.duration()
    );
    var index = this.parent.getChildIndex(this);
    this.parent.addChildAt(residualSprite, index);
};

}) (Sanshiro);
