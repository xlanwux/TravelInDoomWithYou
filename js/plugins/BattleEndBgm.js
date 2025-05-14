//=============================================================================
// BattleEndBgm.js
// ----------------------------------------------------------------------------
// (C) 2018 astral
//
// ----------------------------------------------------------------------------
// Version
// 1.0 2018/11/12 初版

/*:
 * @plugindesc 戦闘后にも戦闘時のBGMを流し続けます
 * @author astral
 *
 * @param victorySwitch
 * @text 勝利時スイッチ
 * @desc スイッチがオンの場合は、勝利時に戦闘BGMを流し続けます。
 * @type switch
 * @default 0
 *
 * @param defeatSwitch
 * @text 敗北時スイッチ
 * @desc スイッチがオンの場合は、敗北可の場合に戦闘BGMを流し続けます。
 * @type switch
 * @default 0
 *
 * @param escapeSwitch
 * @text 逃走時スイッチ
 * @desc スイッチがオンの場合は、逃走時に戦闘BGMを流し続けます。
 * @type switch
 * @default 0
 *
 * @help  
 * 戦闘后にも戦闘時のBGMを流し続けるプラグインです。
 * 
 * 勝利時、敗北時（敗北可の場合）、逃走時、それぞれのパラメーターで
 * スイッチを指定してください。
 * スイッチがオンの場合に、戦闘BGMを流し続けるようにします。
 * 
 * スイッチの指定をなしにした場合は、通常通り戦闘前のBGMを再開させます。
 * 
 */


(function () {
    'use strict';
	
	var parameters = PluginManager.parameters('BattleEndBgm');

	var param = JSON.parse(JSON.stringify(parameters, function(key, value) {
    	try {
    	    return JSON.parse(value);
    	} catch (e) {
    	    try {
    	        return eval(value);
    	    } catch (e) {
   	         return value;
  	      }
  	  }
	}));

    var paramVictorySwitch = +param.victorySwitch || 0;
    var paramDefeatSwitch = +param.defeatSwitch || 0;
    var paramEscapeSwitch = +param.escapeSwitch || 0;

    var _BattleManager_replayBgmAndBgs = BattleManager.replayBgmAndBgs;
    BattleManager.replayBgmAndBgs = function() {
        if (BattleManager._escaped) {
			if (paramEscapeSwitch && $gameSwitches.value(paramEscapeSwitch)) return;
		} else if ($gameParty.isAllDead()) {
			if (paramDefeatSwitch && $gameSwitches.value(paramDefeatSwitch)) return;
		} else if ($gameTroop.isAllDead()){
			if (paramVictorySwitch && $gameSwitches.value(paramVictorySwitch)) return;
		}
		_BattleManager_replayBgmAndBgs.call(this);
    };

})();