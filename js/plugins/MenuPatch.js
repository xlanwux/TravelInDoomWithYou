/*:
 * @plugindesc 精简主菜单，只保留物品、状态、设置、保存、游戏结束五项，兼容MOG主菜单美化插件。
 * @author xlanwux
 */

(function() {
  Window_MenuCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
    this.addOptionsCommand();
    this.addSaveCommand();
    this.addGameEndCommand();
  };

  Window_MenuCommand.prototype.addMainCommands = function() {
    this.addCommand(TextManager.item, 'item', this.areMainCommandsEnabled());
    this.addCommand(TextManager.status, 'status', this.areMainCommandsEnabled());
  };

  Window_MenuCommand.prototype.addFormationCommand = function() {
    // 不添加整队
  };
})();
