/*:
 * @plugindesc 给人物添加孤独值属性
 * @author xlanwux
 */
(function() {

  const _Game_Actor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function(actorId) {
    _Game_Actor_setup.call(this, actorId);
    this._loneliness = 30; // 初始值
  };

  Game_Actor.prototype.loneliness = function() {
    return this._loneliness || 0;
  };

  Game_Actor.prototype.setLoneliness = function(value) {
    this._loneliness = Math.max(0, Math.min(100, value)); // 限制在0~100
  };

  Game_Actor.prototype.maxLoneliness = function() {
    return 100;
  };

})();

