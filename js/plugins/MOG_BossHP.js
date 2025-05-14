//=============================================================================
// MOG_BossHP.js
//=============================================================================

/*:
 * @plugindesc (v1.3) Apresenta um medidor de HP para os chefes.
 * @author Moghunter
 *
 * @param BHP Shake Effect
 * @desc Ativar o efeito tremer.
 * @default true 
 *
 * @param BHP HP Number Visible
 * @desc Apresentar o HP em numeros.
 * @default true
 *
 * @param BHP Name Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * 
 * @param BHP Layout X-Axis
 * @desc Posição X-Axis do layout.
 * @default 150
 *
 * @param BHP Layout Y-Axis
 * @desc Posição Y-Axis do layout.
 * @default 10
 *
 * @param BHP Meter X-Axis
 * @desc Posição X-Axis do medidor.
 * @default 22
 *
 * @param BHP Meter Y-Axis
 * @desc Posição Y-Axis do medidor.
 * @default 28 
 * 
 * @param BHP Number X-Axis
 * @desc Posição X-Axis do numero.
 * @default 460
 *
 * @param BHP Number Y-Axis
 * @desc Posição Y-Axis do numero.
 * @default 32  
 *
 * @param BHP Name X-Axis
 * @desc Posição X-Axis do numero.
 * @default 32
 *
 * @param BHP Name Y-Axis
 * @desc Posição Y-Axis do numero.
 * @default -5  
 *
 * @help  
 * =============================================================================
 * +++ MOG - Boss HP Meter (v1.3) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta um medidor de HP para os chefes.
 *
 * Serão necessários os arquivos. (img/system/)
 *
 * Boss_HP_A.png
 * Boss_HP_A.png
 * Boss_HP_C.png
 *
 * =============================================================================
 * Use a Tag abaixo na caixa de notas para definir quais os inimigos terão o
 * medidor de chefe.
 *
 * Boss HP
 *
 * =============================================================================
 *
 * -----------------------------------------------------------------------------
 * Para definir a posição do medidor de HP use o seguinte comentário através do
 * comando PLUGIN COMMAND.
 * 
 * boss_hp_position : X : Y
 *
 * X - Posição X-axis.
 * Y - Posição X-axis.
 *
 * -----------------------------------------------------------------------------
 * Para ocultar ou mostrar os numeros de HP use o seguinte comentário através do
 * comando PLUGIN COMMAND.
 *
 * boss_hp_number_hide
 * boss_hp_number_show
 *
 * -----------------------------------------------------------------------------
 * HISTÓRICO
 * -----------------------------------------------------------------------------
 * v1.3 Correção do Crash relativo as Notetags. 
 * v1.2 - Melhoria na codificação.
 * v1.1 - Correção de não atualizar o medidor vermelho em danos de itens.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BossHP = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_BossHP');
    Moghunter.bosshp_layout_x = Number(Moghunter.parameters['BHP Layout X-Axis'] || 150);
    Moghunter.bosshp_layout_y = Number(Moghunter.parameters['BHP Layout Y-Axis'] || 10)
    Moghunter.bosshp_meter_x = Number(Moghunter.parameters['BHP Meter X-Axis'] || 22);
    Moghunter.bosshp_meter_y = Number(Moghunter.parameters['BHP Meter Y-Axis'] || 28);	
    Moghunter.bosshp_number_x = Number(Moghunter.parameters['BHP Number X-Axis'] || 460);
    Moghunter.bosshp_number_y = Number(Moghunter.parameters['BHP Number Y-Axis'] || 32);
    Moghunter.bosshp_name_x = Number(Moghunter.parameters['BHP Name X-Axis'] || 32);
    Moghunter.bosshp_name_y = Number(Moghunter.parameters['BHP Name Y-Axis'] || -5);
	Moghunter.bosshp_font_size = Number(Moghunter.parameters['BHP Name Font Size'] || 18);
	Moghunter.bosshp_shake_effect = String(Moghunter.parameters['BHP Shake Effect'] || true);	
	Moghunter.bosshp_hp_number_visible = String(Moghunter.parameters['BHP HP Number Visible'] || true);
	
//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bosshp_temp_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function() {
	_alias_mog_bosshp_temp_initialize.call(this);
	this._battler_bhp_temp = [null,0,false,0];
};

//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bosshp_sys_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
	_alias_mog_bosshp_sys_initialize.call(this);
	this._bosshp_data = [Moghunter.bosshp_layout_x,Moghunter.bosshp_layout_y,Moghunter.bosshp_hp_number_visible];
}

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _alias_mog_bosshp_ex_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_bosshp_ex_pluginCommand.call(this,command, args)
	if (command === "boss_hp_position")  { $gameSystem._bosshp_data[0] = args[1];
	     $gameSystem._bosshp_data[1] = args[3];};
	if (command === "boss_hp_number_hide")  {$gameSystem._bosshp_data[2] = "false";};
	if (command === "boss_hp_number_show")  {$gameSystem._bosshp_data[2] = "true";};
	return true;
};

//=============================================================================
// ** BattleManager
//=============================================================================

//==============================
// * processVictory
//==============================
var _alias_mog_bosshp_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
	 $gameTemp._battler_bhp_temp[2] = true
	 _alias_mog_bosshp_processVictory.call(this);	 
};

//==============================
// * processAbort
//==============================
var _alias_mog_bosshp_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function() {
	 $gameTemp._battler_bhp_temp[2] = true
	 _alias_mog_bosshp_processAbort.call(this);	 
};

//==============================
// * processDefeat
//==============================
var _alias_mog_bosshp_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
	 $gameTemp._battler_bhp_temp[2] = true
	 _alias_mog_bosshp_processDefeat.call(this);	 
};

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//=============================================================================
// ** Game_Enemy
//=============================================================================

//==============================
// * initMembers
//==============================
var _alias_mog_bosshp_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
	_alias_mog_bosshp_initMembers.call(this);
	this._bosshp_meter = false;
};

//==============================
// * Setup
//==============================
var _alias_mog_bosshp_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_alias_mog_bosshp_setup.call(this,enemyId, x, y);
	for (var i = 0; i < this.notetags().length; i++) {
		if (this.notetags()[i] == "Boss HP") {this._bosshp_meter = true};
	};		
};

//=============================================================================
// ** Game Action
//=============================================================================

//==============================
// * Apply
//==============================
var _alias_mog_bosshp_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	 if (target.isEnemy() && target._bosshp_meter) {$gameTemp._battler_bhp_temp[1] = target.hp;
	 var old_hp = target.hp; $gameTemp._battler_bhp_temp[3] = 0};
	 _alias_mog_bosshp_apply.call(this,target);
	 if (target.isEnemy() && target._bosshp_meter) {$gameTemp._battler_bhp_temp[0] = target;
	    if (old_hp > target.hp) {$gameTemp._battler_bhp_temp[3] = 60};
	 };
};

//=============================================================================
// ** Spriteset_Battle
//=============================================================================	

//==============================
// * CreateLowerLayer
//==============================
var _alias_mog_bosshp_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer
Spriteset_Battle.prototype.createLowerLayer = function() {
	_alias_mog_bosshp_createLowerLayer.call(this);
	this.create_bosshp_sprites();
};

//==============================
// * Update
//==============================
var _alias_mog_bosshp_update = Spriteset_Battle.prototype.update
Spriteset_Battle.prototype.update = function() {
	_alias_mog_bosshp_update.call(this);
	this.update_boss_sprites();
};

//==============================
// * Create Boss HP Sprites
//==============================
Spriteset_Battle.prototype.create_bosshp_sprites = function() {
	var bosshp = false;
	var init_battler = null;
    $gameTroop.members().forEach(function(enemy) {
			if (enemy._bosshp_meter) {bosshp = true; init_battler = enemy;};
	},this);
	if (bosshp) {this._bosshp_sprites = new Sprite_BossHP(init_battler);
	this.addChild(this._bosshp_sprites);
	};
};

//==============================
// * Update Boss HP Sprites
//==============================
Spriteset_Battle.prototype.update_boss_sprites = function() {
	if (this._bosshp_sprites == null) {return};
    this._bosshp_sprites.update();
};

//=============================================================================
// ** Sprite_BossHP
//=============================================================================	
function Sprite_BossHP() {
    this.initialize.apply(this, arguments);
}

Sprite_BossHP.prototype = Object.create(Sprite.prototype);
Sprite_BossHP.prototype.constructor = Sprite_BossHP;

//==============================
// * Initialize
//==============================
Sprite_BossHP.prototype.initialize = function(init_battler) {
    Sprite.prototype.initialize.call(this);	
	$gameTemp._battler_bhp_temp = [init_battler,init_battler.hp,false,0]
	this._battler = init_battler;
	this._hp_data = [-1,-1,0,0,0,0,0,0,0,Number($gameSystem._bosshp_data[0]),
	Number($gameSystem._bosshp_data[1]),false,true];
	this._layout = new Sprite(ImageManager.loadSystem("Boss_HP_A"));
	this._layout.x = this._hp_data[9];
	this._layout.y = this._hp_data[10];
	this._layout.opacity = 0;
	this.addChild(this._layout);
	this._hp_meter_red = new Sprite(ImageManager.loadSystem("Boss_HP_B"));
	this._hp_meter_red.x = this._layout.x + Moghunter.bosshp_meter_x;
	this._hp_meter_red.y = this._layout.y + Moghunter.bosshp_meter_y;
	this._hp_meter_red.opacity = 0;
	this.addChild(this._hp_meter_red);
	this._hp_meter_blue = new Sprite(ImageManager.loadSystem("Boss_HP_B"));
	this._hp_meter_blue.x = this._hp_meter_red.x;
	this._hp_meter_blue.y = this._hp_meter_red.y;	
	this._hp_meter_blue.opacity = 0;
	this.addChild(this._hp_meter_blue);
	this._name = new Sprite(new Bitmap(300,48));
	this.addChild(this._name);
	this._name.bitmap.fontSize = Moghunter.bosshp_font_size;
	this.refresh_name();
	this._name.x = this._layout.x + Moghunter.bosshp_name_x;
	this._name.y = this._layout.y + Moghunter.bosshp_name_y;
	this._name.opacity = 0;
	this._hp_number = [];
	this._hp_number_data = []
	this._hp_number_img = ImageManager.loadSystem("Boss_HP_C");
	for (var i = 0; i < 6; i++) {
		 this._hp_number[i] = new Sprite(this._hp_number_img);
		 this._hp_number[i].visible = false;
		 this._hp_number[i].opacity = 0;
		 this._hp_number[i].x = this._layout.x + Moghunter.bosshp_number_x;
		 this._hp_number[i].y = this._layout.y + Moghunter.bosshp_number_y;
		 this._hp_number_data[i] = 0;
		 this.addChild(this._hp_number[i]);		 
	};
	if (String(Moghunter.bosshp_shake_effect) === "true") {this._hp_data[11] = true};
	if (String($gameSystem._bosshp_data[2]) != "true") {this._hp_data[12] = false};
};

//==============================
// * Update
//==============================
Sprite_BossHP.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	if (!this._layout.bitmap.isReady()) {return};
	if (this.need_fade_sprites()) {this.fade_sprites(5)} else {this.fade_sprites(-5)};
	if ($gameTemp._battler_bhp_temp[0] != this._battler) {this.refresh_all();	};
	if (this._hp_data[0] != this._battler.hp || this._hp_data[1] != this._battler.mhp) {
		this.refresh_blue_meter();
	};
	if (this._hp_data[2] != this._battler.hp) {this.refresh_red_meter();};
	if (this._hp_data[6] != this._battler.hp) {this.update_hp_number();};
	if (this._hp_data[11]) {this.update_shake_effect();};
};

//==============================
// * Update Shake Effect
//==============================
Sprite_BossHP.prototype.update_shake_effect = function() {
    if (this._hp_data[7] <= 0) {return;};
	this._hp_data[7] -= 1;
	this._layout.y = -3 + this._hp_data[10] + Math.floor(Math.random() * 6);
	if (this._hp_data[7] <= 0) {this._layout.y = this._hp_data[10]};
};

//==============================
// * Update HP Number
//==============================
Sprite_BossHP.prototype.update_hp_number = function() {
	  if (!this._hp_data[12]) {return};
      var nspd = 1 + Math.floor((Math.abs(this._hp_data[6] - this._battler.hp) / 30))
      if (this._hp_data[6] < this._battler.hp) {
		  this._hp_data[6] += nspd;
		  if (this._hp_data[6] > this._battler.hp) {this._hp_data[6] = this._battler.hp};
	  }
	  else if (this._hp_data[6] > this._battler.hp) {
		  this._hp_data[6] -= nspd;
		  if (this._hp_data[6] < this._battler.hp) {this._hp_data[6] = this._battler.hp};
	  };
	  this.refresh_hp_number();
};
	  
//==============================
// * Refresh HP Number
//==============================
Sprite_BossHP.prototype.refresh_hp_number = function() {
   var w = this._hp_number_img.width / 10;
   var h = this._hp_number_img.height;	
   this._hp_data[4] = Math.abs(this._hp_data[6]).toString().split("");  
   if (this._hp_data[4].length > this._hp_number.length) {return};
   if (this._hp_data[4].length != this._hp_data[5]) {
	   for (var i = 0; i < 6; i++) {this._hp_number[i].visible = false};this._hp_data[5] = this._hp_data[4].length};
   for (var i = 0; i < this._hp_data[4].length; i++) {
	   var n = Number(this._hp_data[4][i]);
	   this._hp_number[i].setFrame(n * w, 0, w, h);
	   this._hp_number[i].visible = true;	   
	   var nx = -(w * i) + (w * this._hp_data[4].length)
	   this._hp_number[i].x = (this._layout.x + Moghunter.bosshp_number_x) - nx;
   };
};

//==============================
// * Refresh Name
//==============================
Sprite_BossHP.prototype.refresh_name = function() {
	this._name.bitmap.clear();
	this._name.bitmap.drawText(this._battler.enemy().name, 0, 0, this._name.bitmap.width, this._name.bitmap.height,0);	
};

//==============================
// * Need Fade Sprites
//==============================
Sprite_BossHP.prototype.need_fade_sprites = function() {
	if ($gameMessage.isBusy()) {return true} ;	
	if ($gameTemp._battler_bhp_temp[2]) {return true} ;
	return false;
};

//==============================
// * Fade Sprites
//==============================
Sprite_BossHP.prototype.fade_sprites = function(value) {
	this._layout.opacity -= value;
	this._hp_meter_blue.opacity = this._layout.opacity;
	this._hp_meter_red.opacity = this._layout.opacity;
	this._name.opacity = this._layout.opacity;
	for (var i = 0; i < 6; i++) {this._hp_number[i].opacity -= value};
};

//==============================
// * Refresh All
//==============================
Sprite_BossHP.prototype.refresh_all = function() {
	 this._battler = $gameTemp._battler_bhp_temp[0];
	 this._hp_data[2] = $gameTemp._battler_bhp_temp[1];
	 this._hp_data[6] = $gameTemp._battler_bhp_temp[1];  
	 this.refresh_hp_number();  
	 this.refresh_blue_meter();
	 this.refresh_red_meter();
	 this.refresh_name();
};

//==============================
// * Refresh Blue Meter
//==============================
Sprite_BossHP.prototype.refresh_blue_meter = function() {
	 this._hp_data[0] = this._battler.hp;
	 this._hp_data[1] = this._battler.mhp;
     this._hp_data[7] = $gameTemp._battler_bhp_temp[3]
     this._layout.y = this._hp_data[10]	 
	 var meter_rate = this._hp_meter_blue.bitmap.width * this._battler.hp / this._battler.mhp;
	 this._hp_meter_blue.setFrame(0, 0, meter_rate, this._hp_meter_blue.bitmap.height / 2);
};

//==============================
// * Refresh Red Meter
//==============================
Sprite_BossHP.prototype.refresh_red_meter = function() {
	  var dnspeed = 1 + (Math.abs(this._hp_data[2] - this._battler.hp) / 160);
	  if (this._hp_data[2] > this._battler.hp) {this._hp_data[2] -= dnspeed;
		  if (this._hp_data[2] < this._battler.hp) {this._hp_data[2] = this._battler.hp};}
	  else if (this._hp_data[2] < this._battler.hp) {this._hp_data[2]  += dnspeed;
		  if (this._hp_data[2]  > this._battler.hp) {this._hp_data[2]  = this._battler.hp};			
	  };
	 var meter_rate = this._hp_meter_red.bitmap.width * this._hp_data[2] / this._battler.mhp;
	 this._hp_meter_red.setFrame(0, this._hp_meter_red.bitmap.height / 2, meter_rate, this._hp_meter_red.bitmap.height / 2);	
};