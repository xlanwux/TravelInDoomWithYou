/*:
 * @plugindesc 在状态界面显示孤独值
 * @author xlanwux
 */

(function() {
  var _Window_Status_drawParameters = Window_Status.prototype.drawParameters;
  Window_Status.prototype.drawParameters = function(x, y) {
    _Window_Status_drawParameters.call(this, x, y);

    var lineHeight = this.lineHeight();
    var yy = y + lineHeight * 6;
    this.changeTextColor(this.systemColor());
    this.drawText("孤独值", x, yy, 160);
    this.resetTextColor();
    this.drawText(this._actor.loneliness(), x + 160, yy, 60, 'right');
  };
})();
