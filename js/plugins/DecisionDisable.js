//===================================================================
//DecisionDisable.js
//決定ボタン無効プラグイン
//===================================================================
//Copyright (c) 2017 蔦森くいな
//Released under the MIT license.
//http://opensource.org/licenses/mit-license.php
//-------------------------------------------------------------------
//blog   : http://paradre.com/
//Twitter: https://twitter.com/Kuina_T
//===================================================================
//＜更新情報＞
//　ver1.0.0 2017/06/26 初版
//===================================================================

/*:
 * @plugindesc 決定ボタンでのイベント実行や乗り物の乗降をスイッチで無効化
 * @author 蔦森くいな
 *
 * @help マップ上のイベントや乗り物に対して
 * 決定ボタンを押したとき（タッチした時）の動作を無効化できます。
 *
 * イベントだけ、乗り物だけ、もしくはその両方を無効化する事ができます。
 * それぞれの無効化機能をＯＮ・ＯＦＦするために使用するスイッチ番号を
 * プラグイン管理画面のパラメータから設定して下さい。
 *
 * なお、イベントトリガーが「決定ボタン」以外の場合
 * たとえば「プレイヤーから接触」などは無効化されません。
 * 
 * @param Event_SwitchNumber
 * @desc イベント禁止の有効・無効化に使用するスイッチ番号を指定します。
 * @default 1
 *
 * @param Vehicle_SwitchNumber
 * @desc 乗り物禁止の有効・無効化に使用するスイッチ番号を指定します。
 * @default 1
 *
 * 
 *
 * 利用規約：
 * このプラグインは商用・非商用を問わず無料でご利用いただけます。
 * どのようなゲームに使っても、どのように加工していただいても構いません。
 * MIT Licenseにつき著作権表示とライセンスURLは残しておいて下さい。
 */

(function() {
    'use strict';
    
    var pd_DD_eventNum = Number(PluginManager.parameters("DecisionDisable")["Event_SwitchNumber"]);
    var pd_DD_vehicleNum = Number(PluginManager.parameters("DecisionDisable")["Vehicle_SwitchNumber"]);
    
    
    var pd_DD_Game_Player_triggerAction = Game_Player.prototype.triggerAction;
    Game_Player.prototype.triggerAction = function() {
        if(!$gameSwitches.value(pd_DD_eventNum) || !$gameSwitches.value(pd_DD_vehicleNum)){
            pd_DD_Game_Player_triggerAction.call(this);
        }
        return false;
    };
    
    var pd_DD_Game_Player_getOnOffVehicle = Game_Player.prototype.getOnOffVehicle;
    Game_Player.prototype.getOnOffVehicle = function() {
        if(!$gameSwitches.value(pd_DD_vehicleNum)){
            pd_DD_Game_Player_getOnOffVehicle.call(this);
        }
        return false;
    };
    
    var pd_DD_Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
    Game_Player.prototype.getOnVehicle = function() {
        if(!$gameSwitches.value(pd_DD_vehicleNum)){
            pd_DD_Game_Player_getOnVehicle.call(this);
        }
        return false;
    };
    
    var pd_DD_Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
    Game_Player.prototype.getOffVehicle = function() {
        if(!$gameSwitches.value(pd_DD_vehicleNum)){
            pd_DD_Game_Player_getOffVehicle.call(this);
        }
        return false;
    };
    
    var pd_DD_Game_Player_checkEventTriggerHere = Game_Player.prototype.checkEventTriggerHere;
    Game_Player.prototype.checkEventTriggerHere = function(triggers) {
        if(!$gameSwitches.value(pd_DD_eventNum)){
            pd_DD_Game_Player_checkEventTriggerHere.apply(this, arguments);
        }
        return false;
    };
    
    var pd_DD_Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
    Game_Player.prototype.checkEventTriggerThere = function(triggers) {
        if(!$gameSwitches.value(pd_DD_eventNum)){
            pd_DD_Game_Player_checkEventTriggerThere.apply(this, arguments);
        }
        return false;
    };
    
})();