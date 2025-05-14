
//せつめい===============================================
/*
 * @param savemaxnum
 * @desc MaxSaveFiles default 30 
 * @default 30
 */

/*:ja
 * @plugindesc 最大セーブ数を変更します。
 * @author うろむ
 * 
 * @param savemaxnum
 * @desc 最大セーブ数を変更します。デフォルト20。
 * @default 20
 * 
 * ■パラメータの説明
 *   savemaxnum [X]
 *     最大セーブ数をXに変更します。
 **/
//ここまで=================================================

var savemax = PluginManager.parameters('savemaxnum');
var savemaxdef=20;
if(savemax<=0){
  savemax=savemaxdef;
  };
  
DataManager.maxSavefiles = function() {
  return savemax;
};
