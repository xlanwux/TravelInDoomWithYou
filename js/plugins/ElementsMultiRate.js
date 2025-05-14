//=============================================================================
// ElementsMultiRate.js
//=============================================================================

/*:
 * @plugindesc 攻撃の属性計算を、MAX値方式から乗算方式に変更します。
 * @author こま
 *
 * @param MAX値方式スイッチID
 * @desc 一時的にMAX値方式（デフォルト）に戻すスイッチの番号を指定してください。
 * @default 0
 */

(function(){
    'use strict';

    var EMR        = {};
    EMR.product    = 'ElementsMultiRate';
    EMR.parameters = PluginManager.parameters(EMR.product);
    EMR.switchId   = +EMR.parameters['MAX値方式スイッチID'] || 0;
    
    //==============================================================================
    // Game_Action
    //==============================================================================
    
    (function(o, p) {
        var f = o[p]; o[p] = function(target, elements) {
            if (EMR.switchId && $gameSwitches.value(EMR.switchId)) {
                return f.apply(this, arguments);
            }
            return elements.reduce(function(result, elementId) {
                return result * target.elementRate(elementId);
            }, 1);
        };
    }(Game_Action.prototype, 'elementsMaxRate'));

}());
