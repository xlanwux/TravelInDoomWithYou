//=============================================================================
// TMPlugin - マップＨＰゲージ
// バージョン: 1.0.0
// 最終更新日: 2016/08/14
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc マップシーンに顔グラフィックとＨＰゲージを表示します。
 * 必要に応じてＭＰや変数などをゲージで表示することもできます。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param gaugeWindowX
 * @desc ＨＰゲージウィンドウのＸ座標
 * 初期値: 0
 * @default 0
 *
 * @param gaugeWindowY
 * @desc ＨＰゲージウィンドウのＹ座標
 * 初期値: 0
 * @default 0
 *
 * @param gaugeWindowWidth
 * @desc ＨＰゲージウィンドウの幅
 * 初期値: 288
 * @default 288
 *
 * @param gaugeWindowHeight
 * @desc ＨＰゲージウィンドウの高さ
 * 初期値: 64
 * @default 64
 *
 * @param gaugeAType
 * @desc ゲージＡのタイプ（HP / MP / TP / VN）
 * 初期値: HP
 * @default HP
 *
 * @param gaugeAX
 * @desc ゲージＡのＸ座標（ウィンドウ内の左端が 0 ）
 * 初期値: 12
 * @default 12
 *
 * @param gaugeAY
 * @desc ゲージＡのＹ座標（ウィンドウ内の上端が 0 ）
 * 初期値: 12
 * @default 12
 *
 * @param gaugeAWidth
 * @desc ゲージＡの長さ
 * 初期値: 144
 * @default 144
 *
 * @param gaugeAHeight
 * @desc ゲージＡの表示領域（数値とゲージ合わせて）の高さ
 * 初期値: 36
 * @default 36
 *
 * @param gaugeAFontSize
 * @desc ゲージＡのフォントサイズ
 * 初期値: 28
 * @default 28
 *
 * @param gaugeAParam
 * @desc ゲージＡのタイプが VN のときに現在値とするゲーム変数番号
 * 初期値: 0
 * @default 0
 *
 * @param gaugeAMax
 * @desc ゲージＡのタイプが VN のときに最大値とするゲーム変数番号
 * 初期値: 0
 * @default 0
 *
 * @param gaugeAName
 * @desc ゲージＡのタイプが VN のときに表示するパラメータ名
 * 初期値: AP
 * @default AP
 *
 * @param gaugeAColor
 * @desc ゲージＡのタイプが VN のときのゲージカラー
 * 初期値: #ff60c0 #ffa0e0
 * @default #ff60c0 #ffa0e0
 *
 * @param gaugeBType
 * @desc ゲージＢのタイプ（HP / MP / TP / VN）
 * 初期値: 
 * @default 
 *
 * @param gaugeBX
 * @desc ゲージＢのＸ座標（ウィンドウ内の左端が 0 ）
 * 初期値: 12
 * @default 12
 *
 * @param gaugeBY
 * @desc ゲージＢのＹ座標（ウィンドウ内の上端が 0 ）
 * 初期値: 12
 * @default 12
 *
 * @param gaugeBWidth
 * @desc ゲージＢの長さ
 * 初期値: 144
 * @default 144
 *
 * @param gaugeBHeight
 * @desc ゲージＢの表示領域（数値とゲージ合わせて）の高さ
 * 初期値: 36
 * @default 36
 *
 * @param gaugeBFontSize
 * @desc ゲージＢのフォントサイズ
 * 初期値: 28
 * @default 28
 *
 * @param gaugeBParam
 * @desc ゲージＢのタイプが VN のときに現在値とするゲーム変数番号
 * 初期値: 0
 * @default 0
 *
 * @param gaugeBMax
 * @desc ゲージＢのタイプが VN のときに最大値とするゲーム変数番号
 * 初期値: 0
 * @default 0
 *
 * @param gaugeBName
 * @desc ゲージＢのタイプが VN のときに表示するパラメータ名
 * 初期値: BP
 * @default BP
 *
 * @param gaugeBColor
 * @desc ゲージＢのタイプが VN のときのゲージカラー
 * 初期値: #ff60c0 #ffa0e0
 * @default #ff60c0 #ffa0e0
 *
 * @param gaugeCType
 * @desc ゲージＣのタイプ（HP / MP / TP / VN）
 * 初期値: 
 * @default 
 *
 * @param gaugeCX
 * @desc ゲージＣのＸ座標（ウィンドウ内の左端が 0 ）
 * 初期値: 12
 * @default 12
 *
 * @param gaugeCY
 * @desc ゲージＣのＹ座標（ウィンドウ内の上端が 0 ）
 * 初期値: 12
 * @default 12
 *
 * @param gaugeCWidth
 * @desc ゲージＣの長さ
 * 初期値: 144
 * @default 144
 *
 * @param gaugeCHeight
 * @desc ゲージＣの表示領域（数値とゲージ合わせて）の高さ
 * 初期値: 36
 * @default 36
 *
 * @param gaugeCFontSize
 * @desc ゲージＣのフォントサイズ
 * 初期値: 28
 * @default 28
 *
 * @param gaugeCParam
 * @desc ゲージＣのタイプが VN のときに現在値とするゲーム変数番号
 * 初期値: 0
 * @default 0
 *
 * @param gaugeCMax
 * @desc ゲージＣのタイプが VN のときに最大値とするゲーム変数番号
 * 初期値: 0
 * @default 0
 *
 * @param gaugeCName
 * @desc ゲージＣのタイプが VN のときに表示するパラメータ名
 * 初期値: CP
 * @default CP
 *
 * @param gaugeCColor
 * @desc ゲージＣのタイプが VN のときのゲージカラー
 * 初期値: #ff60c0 #ffa0e0
 * @default #ff60c0 #ffa0e0
 *
 * @param faceOffsetX
 * @desc 顔グラフィックのＸ座標補正値
 * 初期値: -4
 * @default -4
 *
 * @param faceOffsetY
 * @desc 顔グラフィックのＹ座標補正値
 * 初期値: -4
 * @default -4
 *
 * @param stateIconMax
 * @desc ステートアイコンを表示する個数
 * 初期値: 4
 * @default 4
 *
 * @param stateIconX
 * @desc ステートアイコンのＸ座標
 * 初期値: 156
 * @default 156
 *
 * @param stateIconY
 * @desc ステートアイコンのＹ座標
 * 初期値: 24
 * @default 24
 *
 * @param shakeTime
 * @desc ダメージを受けたときにウィンドウを揺らす時間（フレーム）
 * 初期値: 20（ 0 で揺らさない）
 * @default 20
 *
 * @param startVisible
 * @desc ゲーム開始時の表示状態
 * 初期値: 1（ 0 で非表示 / 1 で表示）
 * @default 1
 *
 * @param collideOpacity
 * @desc プレイヤーと重なったときの不透明度
 * 初期値: 128（ 0 ～ 255 ）
 * @default 128
 *
 * @param messageBusyHide
 * @desc メッセージウィンドウ表示中はログウィンドウを隠す
 * 初期値: 1（ 0 で隠さない / 1 で隠す）
 * @default 1
 *
 * @param eventBusyHide
 * @desc イベント起動中はログウィンドウを隠す
 * 初期値: 1（ 0 で隠さない / 1 で隠す）
 * @default 1
 *
 * @help
 * 使い方:
 *
 *   プラグインパラメータをいじってお好みのＨＰゲージを表示してください。
 *
 *   このプラグインは RPGツクールMV Version 1.3.0 で動作確認をしています。
 *
 *
 * プラグインコマンド:
 *
 *   showHpGauge
 *     ＨＰゲージを表示します。プラグインパラメータ startVisible が 0 の場合、
 *     このコマンドが実行されるまでＨＰゲージは表示されません。
 *
 *   hideHpGauge
 *     ＨＰゲージを隠します。showHpGauge コマンドが実行されるまで
 *     表示されないままです。
 *
 *
 * プラグインパラメータ補足:
 *
 *   gaugeAParam / gaugeBParam / gaugeCParam
 *     ゲージのタイプが VN の場合に、ゲージの現在値として扱うゲーム変数番号を
 *     設定してください。
 *
 *   gaugeAMax / gaugeBMax / gaugeCMax
 *     ゲージのタイプが VN の場合に、ゲージの最大値として扱うゲーム変数番号を
 *     指定してください。 これらのパラメータに設定した番号のゲーム変数に
 *     値を代入することで、初めて最大値として機能します。
 */

var Imported = Imported || {};
Imported.TMMapHpGauge = true;

var TMPlugin = TMPlugin || {};
TMPlugin.MapHpGauge = {};
TMPlugin.MapHpGauge.Parameters = PluginManager.parameters('TMMapHpGauge');
TMPlugin.MapHpGauge.WindowX      = +(TMPlugin.MapHpGauge.Parameters['gaugeWindowX'] || 0);
TMPlugin.MapHpGauge.WindowY      = +(TMPlugin.MapHpGauge.Parameters['gaugeWindowY'] || 0);
TMPlugin.MapHpGauge.WindowWidth  = +(TMPlugin.MapHpGauge.Parameters['gaugeWindowWidth'] || 288);
TMPlugin.MapHpGauge.WindowHeight = +(TMPlugin.MapHpGauge.Parameters['gaugeWindowHeight'] || 64);
TMPlugin.MapHpGauge.GaugeA = {type: TMPlugin.MapHpGauge.Parameters['gaugeAType'],
                              x: +(TMPlugin.MapHpGauge.Parameters['gaugeAX'] || 12),
                              y: +(TMPlugin.MapHpGauge.Parameters['gaugeAY'] || 12),
                              width: +(TMPlugin.MapHpGauge.Parameters['gaugeAWidth'] || 144),
                              height: +(TMPlugin.MapHpGauge.Parameters['gaugeAHeight'] || 36),
                              fontSize: +(TMPlugin.MapHpGauge.Parameters['gaugeAFontSize'] || 28),
                              param: +(TMPlugin.MapHpGauge.Parameters['gaugeAParam'] || 0),
                              max: +(TMPlugin.MapHpGauge.Parameters['gaugeAMax'] || 0),
                              name: TMPlugin.MapHpGauge.Parameters['gaugeAName'],
                              color: (TMPlugin.MapHpGauge.Parameters['gaugeAColor'] || '#ff60c0 #ffa0e0').split(' ')};
TMPlugin.MapHpGauge.GaugeB = {type: TMPlugin.MapHpGauge.Parameters['gaugeBType'],
                              x: +(TMPlugin.MapHpGauge.Parameters['gaugeBX'] || 12),
                              y: +(TMPlugin.MapHpGauge.Parameters['gaugeBY'] || 12),
                              width: +(TMPlugin.MapHpGauge.Parameters['gaugeBWidth'] || 144),
                              height: +(TMPlugin.MapHpGauge.Parameters['gaugeBHeight'] || 36),
                              fontSize: +(TMPlugin.MapHpGauge.Parameters['gaugeBFontSize'] || 28),
                              param: +(TMPlugin.MapHpGauge.Parameters['gaugeBParam'] || 0),
                              max: +(TMPlugin.MapHpGauge.Parameters['gaugeBMax'] || 0),
                              name: TMPlugin.MapHpGauge.Parameters['gaugeBName'],
                              color: (TMPlugin.MapHpGauge.Parameters['gaugeBColor'] || '#ff60c0 #ffa0e0').split(' ')};
TMPlugin.MapHpGauge.GaugeC = {type: TMPlugin.MapHpGauge.Parameters['gaugeCType'],
                              x: +(TMPlugin.MapHpGauge.Parameters['gaugeCX'] || 12),
                              y: +(TMPlugin.MapHpGauge.Parameters['gaugeCY'] || 12),
                              width: +(TMPlugin.MapHpGauge.Parameters['gaugeCWidth'] || 144),
                              height: +(TMPlugin.MapHpGauge.Parameters['gaugeCHeight'] || 36),
                              fontSize: +(TMPlugin.MapHpGauge.Parameters['gaugeCFontSize'] || 28),
                              param: +(TMPlugin.MapHpGauge.Parameters['gaugeCParam'] || 0),
                              max: +(TMPlugin.MapHpGauge.Parameters['gaugeCMax'] || 0),
                              name: TMPlugin.MapHpGauge.Parameters['gaugeCName'],
                              color: (TMPlugin.MapHpGauge.Parameters['gaugeCColor'] || '#ff60c0 #ffa0e0').split(' ')};
TMPlugin.MapHpGauge.Gauges = [TMPlugin.MapHpGauge.GaugeA, TMPlugin.MapHpGauge.GaugeB,
                              TMPlugin.MapHpGauge.GaugeC];
TMPlugin.MapHpGauge.FaceOffsetX     = +(TMPlugin.MapHpGauge.Parameters['faceOffsetX'] || -4);
TMPlugin.MapHpGauge.FaceOffsetY     = +(TMPlugin.MapHpGauge.Parameters['faceOffsetY'] || -4);
TMPlugin.MapHpGauge.StateIconMax    = +(TMPlugin.MapHpGauge.Parameters['stateIconMax'] || 4);
TMPlugin.MapHpGauge.StateIconX      = +(TMPlugin.MapHpGauge.Parameters['stateIconX'] || 156);
TMPlugin.MapHpGauge.StateIconY      = +(TMPlugin.MapHpGauge.Parameters['stateIconY'] || 24);
TMPlugin.MapHpGauge.ShakeTime       = +(TMPlugin.MapHpGauge.Parameters['shakeTime'] || 20);
TMPlugin.MapHpGauge.CollideOpacity  = +(TMPlugin.MapHpGauge.Parameters['collideOpacity'] || 128);
TMPlugin.MapHpGauge.StartVisible    = TMPlugin.MapHpGauge.Parameters['startVisible'] === '1';
TMPlugin.MapHpGauge.MessageBusyHide = TMPlugin.MapHpGauge.Parameters['messageBusyHide'] === '1';
TMPlugin.MapHpGauge.EventBusyHide   = TMPlugin.MapHpGauge.Parameters['eventBusyHide'] === '1';

(function() {

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isVisibleMapHpGauge = function() {
    if (this._visibleMapHpGauge == null) {
      this._visibleMapHpGauge = TMPlugin.MapHpGauge.StartVisible;
    }
    return this._visibleMapHpGauge;
  };
  
  Game_System.prototype.setVisibleMapHpGauge = function(flag) {
    this._visibleMapHpGauge = flag;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'showHpGauge') {
      $gameSystem.setVisibleMapHpGauge(true);
    } else if (command === 'hideHpGauge') {
      $gameSystem.setVisibleMapHpGauge(false);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_MapHpGauge
  //

  function Window_MapHpGauge() {
    this.initialize.apply(this, arguments);
  }

  Window_MapHpGauge.prototype = Object.create(Window_Base.prototype);
  Window_MapHpGauge.prototype.constructor = Window_MapHpGauge;

  Window_MapHpGauge.prototype.initialize = function() {
    var x      = TMPlugin.MapHpGauge.WindowX;
    var y      = TMPlugin.MapHpGauge.WindowY;
    var wight  = TMPlugin.MapHpGauge.WindowWidth;
    var height = TMPlugin.MapHpGauge.WindowHeight;
    Window_Base.prototype.initialize.call(this, x, y, wight, height);
    this.openness = $gameSystem.isVisibleMapHpGauge() ? 255 : 0;
    this.opacity = 255;
    this.contentsOpacity = 255;
    this._gaugeParams = [];
    for (var i = 0; i < 3; i++) {
      var gaugeParam = {param: -1, max: -1};
      this._gaugeParams.push(gaugeParam);
    }
    this._icons = [];
    this._actorId = -1;
    this._shakeDuration = 0;
    this._baseX = x;
    this._needFaceRefresh = false;
    this._hideCount = 0;
    this.refresh();
  };

  Window_MapHpGauge.prototype.lineHeight = function() {
    return this._lineHeight || 36;
  };

  // 標準パディングを取得
  Window_MapHpGauge.prototype.standardPadding = function() {
    return 0;
  };

  // フレーム更新
  Window_MapHpGauge.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.updateVisibility()) {
      this.open();
      if (this._needFaceRefresh) this.refreshFace();
      var needRefresh = this.isNeedRefresh()
      if (needRefresh) {
        var actor = $gameParty.leader();
        if (needRefresh === 'SHAKE') this._shakeDuration = TMPlugin.MapHpGauge.ShakeTime;
        for (var i = 0; i < 3; i++) {
          var gauge = TMPlugin.MapHpGauge.Gauges[i]
          if (gauge.type === 'HP') {
            this._gaugeParams[i].param = actor.hp;
            this._gaugeParams[i].max = actor.mhp;
          } else if (gauge.type === 'MP') {
            this._gaugeParams[i].param = actor.mp;
            this._gaugeParams[i].max = actor.mmp;
          } else if (gauge.type === 'TP') {
            this._gaugeParams[i].param = actor.tp;
            this._gaugeParams[i].max = actor.maxTp();
          } else if (gauge.type === 'VN') {
            this._gaugeParams[i].param = $gameVariables.value(gauge.param);
            this._gaugeParams[i].max = $gameVariables.value(gauge.max);
          }
        }
        this._icons = actor.stateIcons().concat(actor.buffIcons());
        this._actorId = actor.actorId();
        this.refresh();
      }
      if (this._shakeDuration > 0) {
        this._shakeDuration--;
        this.x = this._baseX;
        if (this._shakeDuration > 0) {
          this.x += Math.floor(Math.sin((this._shakeDuration % 10) * Math.PI / 5) * 8);
        }
      }
      this.updateOpacity();
    } else {
      this.close();
    }
  };

  Window_MapHpGauge.prototype.updateVisibility = function() {
    if (!$gameSystem.isVisibleMapHpGauge()) return false;
    if ((TMPlugin.MapHpGauge.EventBusyHide && $gameMap.isEventRunning()) ||
        (TMPlugin.MapHpGauge.MessageBusyHide && $gameMessage.isBusy())) {
      this._hideCount++;
    } else {
      this._hideCount = 0;
    }
    return this._hideCount < 10 && $gameParty.leader();
  };

  // リフレッシュが必要かどうかを返す
  Window_MapHpGauge.prototype.isNeedRefresh = function() {
    var actor = $gameParty.leader();
    if (actor) {
      if (this._actorId !== actor.actorId()) return true;
      for (var i = 0; i < 3; i++) {
        var gauge = TMPlugin.MapHpGauge.Gauges[i];
        var gaugeParam = this._gaugeParams[i];
        if (gauge.type === 'HP') {
          if (gaugeParam.param !== actor.hp || gaugeParam.max !== actor.mhp) {
            return gaugeParam.param > actor.hp ? 'SHAKE' : true;
          }
        } else if (gauge.type === 'MP') {
          if (gaugeParam.param !== actor.mp || gaugeParam.max !== actor.mmp) {
            return true;
          }
        } else if (gauge.type === 'TP') {
          if (gaugeParam.param !== actor.tp || gaugeParam.max !== actor.maxTp()) {
            return true;
          }
        } else if (gauge.type === 'VN') {
          if (gaugeParam.param !== $gameVariables.value(gauge.param) ||
              gaugeParam.max !== $gameVariables.value(gauge.max)) {
            return true;
          }
        }
      }
      if (TMPlugin.MapHpGauge.StateIconMax > 0) {
        var icons = actor.stateIcons().concat(actor.buffIcons());
        if (this._icons.toString() !== icons.toString()) return true;
      }
    }
    return false;
  };

  // 不透明度の更新
  Window_MapHpGauge.prototype.updateOpacity = function() {
    if (this.x < $gamePlayer.screenX() + 24 &&
        this.x + TMPlugin.MapHpGauge.WindowWidth > $gamePlayer.screenX() - 24 &&
        this.y < $gamePlayer.screenY() &&
        this.y + TMPlugin.MapHpGauge.WindowHeight > $gamePlayer.screenY() - 48) {
      this.opacity = TMPlugin.MapHpGauge.CollideOpacity;
    } else {
      this.opacity = 255;
    }
    this.contentsOpacity = this.opacity;
  };

  // リフレッシュ
  Window_MapHpGauge.prototype.refresh = function() {
    this.contents.clear();
    var actor = $gameParty.leader();
    if (actor) {
      this.refreshFace();
      for (var i = 0; i < 3; i++) {
        var gauge = TMPlugin.MapHpGauge.Gauges[i];
        this._lineHeight = gauge.height;
        this.contents.fontSize = gauge.fontSize;
        if (gauge.type === 'HP') {
          this.drawActorHp(actor, gauge.x, gauge.y, gauge.width);
        } else if (gauge.type === 'MP') {
          this.drawActorMp(actor, gauge.x, gauge.y, gauge.width);
        } else if (gauge.type === 'TP') {
          this.drawActorTp(actor, gauge.x, gauge.y, gauge.width);
        } else if (gauge.type === 'VN') {
          var rate = this._gaugeParams[i].max === 0 ? 0 :
                     this._gaugeParams[i].param / this._gaugeParams[i].max;
          var color1 = gauge.color[0];
          var color2 = gauge.color[1];
          this.drawGauge(gauge.x, gauge.y, gauge.width, rate, color1, color2);
          this.changeTextColor(this.systemColor());
          this.drawText(gauge.name, gauge.x, gauge.y, 44);
          this.changeTextColor(this.normalColor());
          this.drawText(this._gaugeParams[i].param, gauge.x + gauge.width - 64,
                        gauge.y, 64, 'right');
        }
      }
      for (var i = 0; i < TMPlugin.MapHpGauge.StateIconMax; i++) {
        if (!this._icons[i]) break;
        var x = TMPlugin.MapHpGauge.StateIconX + i * Window_Base._iconWidth;
        this.drawIcon(this._icons[i], x, TMPlugin.MapHpGauge.StateIconY);
      }
      this._lineHeight = 36;
    }
  };
  
  Window_MapHpGauge.prototype.refreshFace = function() {
    var x = TMPlugin.MapHpGauge.WindowWidth - 144 + TMPlugin.MapHpGauge.FaceOffsetX;
    var y = TMPlugin.MapHpGauge.FaceOffsetY;
    var height = Math.min(TMPlugin.MapHpGauge.WindowHeight, 144);
    var actor = $gameParty.leader();
    this.drawFace(actor._faceName, actor._faceIndex, x, y, 144, height);
  };

  Window_MapHpGauge.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    var bitmap = ImageManager.loadFace(faceName);
    if (bitmap.width === 0) {
      this._needFaceRefresh = true;
      return;
    }
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    this._needFaceRefresh = false;
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createMapHpGaugeWindow();
  };

  // HPゲージウィンドウの作成
  Scene_Map.prototype.createMapHpGaugeWindow = function() {
    this._mapHpGaugeWindow = new Window_MapHpGauge();
    this.addChild(this._mapHpGaugeWindow);
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (!SceneManager.isNextScene(Scene_Battle)) {
      this._mapHpGaugeWindow.hide();
    }
    _Scene_Map_terminate.call(this);
  };
  
  var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
  Scene_Map.prototype.launchBattle = function() {
    this._mapHpGaugeWindow.hide();
    this.removeChild(this._mapHpGaugeWindow);
    this._mapHpGaugeWindow = null;
    _Scene_Map_launchBattle.call(this);
  };
  
})();
