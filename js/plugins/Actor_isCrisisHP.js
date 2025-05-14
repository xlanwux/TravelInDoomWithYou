//=============================================================================
// Actor_isCrisisHP.js
//
//=============================================================================
/*:
 * @plugindesc isDying()の代わりにHP危険色の条件を残す
 * @author uta_asakayu
 *
 * @help 身代わりの条件をisDying()で変更した場合に、HPの表記を修正します
 * 
 * 
 */
//-----------------------------------------------------------------------------

(function () {
    'use strict'; 
    Window_Base.prototype.hpColor = function(actor) {
        if (actor.isDead()) {
            return this.deathColor();
        } else if (actor.isCrisis()) {
            return this.crisisColor();
        } else {
            return this.normalColor();
        }
    };

    Game_BattlerBase.prototype.isCrisis = function() {
        return this.isAlive() && this._hp < this.mhp / 4;
    };
})();