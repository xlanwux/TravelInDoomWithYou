//=============================================================================
// LevelLimitEquipSkill.js
//=============================================================================

/*:
 * @plugindesc 武器防具を装備することにより使用可能になるスキルを、アクターのレベルで制限します。
 * @author こま
 *
 * @help
 * 装備品のメモ欄に、以下のように記述してください。
 *
 *  <learning_level:1 5 10>
 *
 * 数字はそれぞれ特徴欄に設定された「スキル追加」に上から順に対応し、上記例の場合
 *
 * ・1つ目のスキルはレベル1以上で使用可能
 * ・2つ目のスキルはレベル5以上で使用可能
 * ・3つ目のスキルはレベル10以上で使用可能
 *
 * となります。
 */

(function(){
    'use strict';

    //=========================================================================
    // Game_Actor
    //=========================================================================

    var _alias_Game_Actor_traits = Game_Actor.prototype.traits;
    Game_Actor.prototype.traits = function(code) {
        var traits = _alias_Game_Actor_traits.call(this, code);
        return (code !== Game_BattlerBase.TRAIT_SKILL_ADD) ? traits : traits.filter(function(trait) {
            return trait.value === 1;
        });
    };

    var _alias_Game_Actor_equips = Game_Actor.prototype.equips;
    Game_Actor.prototype.equips = function() {
        var equips = _alias_Game_Actor_equips.call(this);
        var actor_level = this.level;
        equips.filter(function(equip) { return equip }).forEach(function(equip) {
            var learning_level = (equip.meta.learning_level || '0').trim().split(/ +/).map(function(level) { return +level });
            equip.traits.filter(function(trait) { return trait.code == 43 }).forEach(function(trait, index) {
                trait.value = actor_level >= (learning_level[index] || 0) ? 1 : 0;
            });
        });
        return equips;
    };

}());
