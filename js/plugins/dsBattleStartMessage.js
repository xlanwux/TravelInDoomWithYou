//==============================================================================
// dsBattleStartMessage.js
// Copyright (c) 2015 - 2018 Douraku
// Released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//==============================================================================

/*:
 * @plugindesc 戦闘開始時のメッセージ表示を変更するプラグイン ver1.1.0
 * @author 道楽
 *
 * @param Max Lines
 * @desc 最大表示行数
 * @default 5
 *
 * @param Line Space
 * @desc メッセージの行間
 * @default 4
 *
 * @param Show Count
 * @desc 敵出現メッセージが表示されている時間
 * @default 120
 *
 * @param Show Wait
 * @desc メッセージが表示されてからコマンドウィンドウが開くまでの待ち時間
 * @default 30
 */

var Imported = Imported || {};
Imported.dsBattleStartMessage = true;

(function (exports) {
	'use strict';

	exports.Param = (function() {
		var ret = {};
		var parameters = PluginManager.parameters('dsBattleStartMessage');
		ret.MaxLines = Number(parameters['Max Lines']);
		ret.LineSpace = Number(parameters['Line Space']);
		ret.ShowCount = Number(parameters['Show Count']);
		ret.ShowWait = Number(parameters['Show Wait']);
		return ret;
	})();

	//--------------------------------------------------------------------------
	/** Game_Message */
	var _Game_Message_clear = Game_Message.prototype.clear;
	Game_Message.prototype.clear = function()
	{
		_Game_Message_clear.call(this);
		this._enemyNameMode = false;
	};

	Game_Message.prototype.enemyNameMode = function()
	{
		return this._enemyNameMode;
	};

	Game_Message.prototype.setEnemyName = function()
	{
		this._enemyNameMode = true;
	};

	//--------------------------------------------------------------------------
	/** Game_Troop */
	Game_Troop.prototype.enemyNames = function()
	{
		var names = [];
		this.members().forEach(function(enemy) {
			var name = enemy.name();
			if (enemy.isAlive() && !names.contains(name)) {
				names.push(name);
			}
		});
		return names;
	};

	//--------------------------------------------------------------------------
	/** Window_Message */
	var _Window_Message_canStart = Window_Message.prototype.canStart;
	Window_Message.prototype.canStart = function()
	{
		return _Window_Message_canStart.call(this) && !$gameMessage.enemyNameMode();
	};

	var _Window_Message_doesContinue = Window_Message.prototype.doesContinue;
	Window_Message.prototype.doesContinue = function()
	{
		return _Window_Message_doesContinue.call(this) && !$gameMessage.enemyNameMode();
	};

	//--------------------------------------------------------------------------
	/** Window_EnemyName */
	exports.Window_EnemyName = (function() {

		function Window_EnemyName()
		{
			this.initialize.apply(this, arguments);
		}

		Window_EnemyName.prototype = Object.create(Window_Base.prototype);
		Window_EnemyName.prototype.constructor = Window_EnemyName;

		Window_EnemyName.MESSAGE_POS_X = 0;
		Window_EnemyName.MESSAGE_POS_Y = 8;

		Window_EnemyName.prototype.initialize = function(x, y)
		{
			var width = this.windowWidth();
			var height = this.windowHeight();
			Window_Base.prototype.initialize.call(this, x, y, width, height);
			this.opacity = 0;
			this.contentsOpacity = 0;
			this._showNames = [];
			this._showCount = 0;
			this._showWait = 0;
			this.refresh();
		};

		Window_EnemyName.prototype.windowWidth = function()
		{
			return Graphics.boxWidth;
		};

		Window_EnemyName.prototype.windowHeight = function()
		{
			return this.fittingHeight(exports.Param.MaxLines);
		};

		Window_EnemyName.prototype.standardPadding = function()
		{
			return 0;
		};

		Window_EnemyName.prototype.textPadding = function()
		{
			return 0;
		};

		Window_EnemyName.prototype.fittingHeight = function(numLines)
		{
			return Window_EnemyName.MESSAGE_POS_Y + numLines * (this.lineHeight() + exports.Param.LineSpace);
		};

		Window_EnemyName.prototype.update = function()
		{
			Window_Base.prototype.update.call(this);
			if ( $gameMessage.enemyNameMode() )
			{
				if ( this._showNames.length <= 0 && $gameMessage.hasText() )
				{
					this.startMessage();
				}
				if ( --this._showWait <= 0 )
				{
					$gameMessage.clear();
				}
			}
			else
			{
				if ( $gameMessage.isBusy() )
				{
					this.terminateMessage();
				}
			}
			if ( this._showCount > 0 )
			{
				this.updateFadeIn();
				this._showCount--;
			}
			else
			{
				this.updateFadeOut();
			}
		};

		Window_EnemyName.prototype.updateFadeIn = function()
		{
			this.contentsOpacity += 16;
		};

		Window_EnemyName.prototype.updateFadeOut = function()
		{
			this.contentsOpacity -= 16;
			if ( this.contentsOpacity <= 0 )
			{
				this.terminateMessage();
			}
		};

		Window_EnemyName.prototype.startMessage = function()
		{
			var text = $gameMessage.allText();
			this._showNames = text.split('\n');
			this.refresh();
			this.show();
			this.open();
		};

		Window_EnemyName.prototype.terminateMessage = function()
		{
			this._showNames = [];
			this.hide();
		};

		Window_EnemyName.prototype.open = function()
		{
			this.refresh();
			this._showCount = exports.Param.ShowCount;
			this._showWait = exports.Param.ShowWait;
		};

		Window_EnemyName.prototype.close = function()
		{
			this._showCount = 0;
		};

		Window_EnemyName.prototype.refresh = function()
		{
			this.contents.clear();
			if ( this._showNames.length > 0 )
			{
				var lineHeight = this.lineHeight();
				this._showNames.forEach(function(text, idx) {
					var x = Window_EnemyName.MESSAGE_POS_X;
					var y = Window_EnemyName.MESSAGE_POS_Y + (lineHeight + exports.Param.LineSpace) * idx;
					this.drawBackground(0, y, this.textWidth(text), lineHeight);
					this.drawTextEx(text, x, y);
				}, this);
			}
		};

		Window_EnemyName.prototype.drawBackground = function(x, y, width, height)
		{
			var color1 = this.dimColor1();
			var color2 = this.dimColor2();
			this.contents.fillRect(x, y, width, height, color1);
			this.contents.gradientFillRect(width, y, 32, height, color1, color2);
		};

		return Window_EnemyName;
	})();

	//--------------------------------------------------------------------------
	/** Scene_Battle */
	var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function()
	{
		_Scene_Battle_createAllWindows.call(this);
		this.createEnemyNameWindow();
	};

	Scene_Battle.prototype.createEnemyNameWindow = function()
	{
		this._enemyNameWindow = new exports.Window_EnemyName();
		this.addWindow(this._enemyNameWindow);
	};

	var _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
	Scene_Battle.prototype.commandSkill = function()
	{
		_Scene_Battle_commandSkill.call(this);
		this._enemyNameWindow.terminateMessage();
	};

	var _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
	Scene_Battle.prototype.commandItem = function()
	{
		_Scene_Battle_commandItem.call(this);
		this._enemyNameWindow.terminateMessage();
	};

	var _Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
	Scene_Battle.prototype.endCommandSelection = function()
	{
		_Scene_Battle_endCommandSelection.call(this);
		if ( BattleManager.isInTurn() )
		{
			this._enemyNameWindow.terminateMessage();
		}
	};

	//--------------------------------------------------------------------------
	/** BattleManager */
	var _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
	BattleManager.displayStartMessages = function()
	{
		$gameMessage.setEnemyName();
		_BattleManager_displayStartMessages.call(this);
	};

}((this.dsBattleStartMessage = this.dsBattleStartMessage || {})));
