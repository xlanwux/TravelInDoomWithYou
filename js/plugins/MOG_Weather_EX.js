//=============================================================================
// MOG_Weather_EX.js
//=============================================================================

/*:
 * @plugindesc (v1.5) Adiciona novos efeitos de climas.
 * @author Moghunter
 *
 * @param Cloud reverse switch
 * @desc
 * @default 0
 * 
 * @help  
 * =============================================================================
 * +++ MOG - Weather EX (v1.5) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Adiciona novos efeitos de climas.
 * As imagens do clima devem ser gravadas na pasta. (img/weather/)
 *
 * =============================================================================
 * Para ativar o clima use o comentário abaixo através da função PLUGIN COMMAND
 *
 * weather : TYPE : POWER : FILE_NAME
 *
 * TYPE - Efeito 
 *        0 - Wind
 *        1 - Spark
 *        2 - Cloud
 *        3 - Snow
 *        4 - Rain
 *        5 - Random
 *
 * POWER - Poder do clima. (Quantidade de partículas)
 *
 * FILE_NAME = Nome do arquivo de imagem.
 *
 * -------------------------------------
 * EG
 * weather : 3 : 120 : Flower_01
 * -------------------------------------
 *
 * =============================================================================
 * Para apagar o clima use o comentário abaixo.
 *
 * clear_weather
 *
 * =============================================================================
 * ** Histórico **
 * =============================================================================
 * v1.5 - Melhoria na codificação, agora é possível usar os comandos para ativar
 *        os climas através processo paralelo.
 * v1.4 - Correção do glitch dos efeitos Wind e Snow quando  é executado o
 *        scroll down.
 * v1.3 - Melhoria na codificação.
 * v1.2 - Melhoria nos efeitos.
 *      - Melhoria na codificação para compatibilidade. 
 * v1.1 - Melhoria na codificação.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_Weather_EX = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_Weather_EX');
    Moghunter.weather_ex_cloud_reverse_switch = +Moghunter.parameters['Cloud reverse switch'];
	
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Weather
//==============================
ImageManager.loadWeather = function(filename) {
    return this.loadBitmap('img/weather/', filename, 0, true);
};	

//=============================================================================
// ** Game Switches
//=============================================================================

//==============================
// * onChange
//==============================
var _alias_mog_weather_ex_gswtch_onChange = Game_Switches.prototype.onChange;
Game_Switches.prototype.onChange = function() {
    _alias_mog_weather_ex_gswtch_onChange.call(this);
	$gameSystem.weather_ing_refresh = true;
};

//=============================================================================
// ** Game SelfSwitches
//=============================================================================

//==============================
// * onChange
//==============================
var _alias_mog_weather_ex_gselfswtch_onChange = Game_SelfSwitches.prototype.onChange;
Game_SelfSwitches.prototype.onChange = function() {
    _alias_mog_weather_ex_gselfswtch_onChange.call(this);
	$gameSystem.weather_ing_refresh = true;
};

//=============================================================================
// ** Game Variables
//=============================================================================

//==============================
// * onChange
//==============================
var _alias_mog_weather_ex_variables_onChange = Game_Variables.prototype.onChange;
Game_Variables.prototype.onChange = function() {
    _alias_mog_weather_ex_variables_onChange.call(this);
	$gameSystem.weather_ing_refresh = true;
};

//=============================================================================
// ** Game System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_weather_ex_system_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_weather_ex_system_initialize.call(this);
	this.weather_data = [false,[-1,0,""],[],[]];
	this.weather_setup = [-1,0,""];
	this.weather_ing_refresh = false;
};
//==============================
// * Record Weather
//==============================
Game_System.prototype.record_weather = function(sprites) { 
     this.weather_data[2] = [];
	 this.weather_data[3] = [];
	 this.weather_type = -1;
     for (var i = 0; i < sprites.length; i++) {
		 this.weather_data[2][i] = [
		 sprites[i].x,sprites[i].y,sprites[i].anchor.x,sprites[i].anchor.y,
		 sprites[i].scale.x,sprites[i].rotation,sprites[i].opacity,sprites[i].blendMode
		 ]; 
		 this.weather_data[3][i] = [
		 sprites[i]._n_x,sprites[i]._n_y,sprites[i]._n_scale,
		 sprites[i]._n_rotation,sprites[i]._n_opacity,sprites[i]._n_animation,sprites[i]._n_sx,sprites[i]._n_sy
		 ]; 
	 };
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	
var _alias_mog_weather_ex_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_weather_ex_pluginCommand.call(this,command, args)
	if (command === "clear_weather") { $gameSystem.weather_data = [false,[-1,0,""],[],[]];}; 
	if (command === "weather")  { $gameSystem.weather_data = [false,[args[1], args[3], args[5]],[],[]];};
	return true;
};

//=============================================================================
// ** Scene_Base
//=============================================================================	
var _alias_mog_weather_ex_scmap_terminate = Scene_Map.prototype.terminate
Scene_Map.prototype.terminate = function() {
	if (this._spriteset._Weather_Plane != null) {
		$gameSystem.record_weather(this._spriteset._Weather_Plane._weather_ex_sprites);
	};
    _alias_mog_weather_ex_scmap_terminate.call(this);
	$gameSystem.weather_ing_refresh = false;
};

//=============================================================================
// ** Scene_Battle
//=============================================================================	
var _alias_mog_weather_ex_scbattle_terminate = Scene_Battle.prototype.terminate
Scene_Battle.prototype.terminate = function() {
	if (this._spriteset._Weather_Plane != null) {
		$gameSystem.record_weather(this._spriteset._Weather_Plane._weather_ex_sprites);
	};
    _alias_mog_weather_ex_scbattle_terminate.call(this);
};

//=============================================================================
// ** Spriteset_Base
//=============================================================================	

//==============================
// * Initialize
//==============================
var _alias_mog_weather_ex_sprtbase_initialize = Spriteset_Base.prototype.initialize;
Spriteset_Base.prototype.initialize = function() {	
	_alias_mog_weather_ex_sprtbase_initialize.call(this);
	if ($gameSystem.weather_data[2] != null && !$gameSystem.weather_ing_refresh) {$gameSystem.weather_data[0] = true;
	$gameSystem.weather_setup[0] = -2}
	$gameSystem.weather_ing_refresh = false;
};

//==============================
// * createLowerLayer
//==============================
var _alias_mog_weather_ex_sprtbase_createToneChanger = Spriteset_Base.prototype.createToneChanger;
Spriteset_Base.prototype.createToneChanger = function() {
     _alias_mog_weather_ex_sprtbase_createToneChanger.call(this);
	 this._Weather_Plane = new Weather_EX_Plane();
	 if (this._battleField) {
		 this._battleField.addChild(this._Weather_Plane);
     } else { 
	     this._baseSprite.addChild(this._Weather_Plane);
     };
};

//==============================
// * Update
//==============================
var _alias_mog_weather_ex_sprtbase_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {
     _alias_mog_weather_ex_sprtbase_update.call(this);
	 $gameSystem.weather_type = $gameSystem.weather_data[1][0]
};

//=============================================================================
// * Weather EX Plane
//=============================================================================
function Weather_EX_Plane() {
    this.initialize.apply(this, arguments);
};

Weather_EX_Plane.prototype = Object.create(Sprite.prototype);
Weather_EX_Plane.prototype.constructor = Weather_EX_Plane;

//==============================
// * Initialize
//==============================
Weather_EX_Plane.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);	
	this.opacity = 0;
	this._ref_time = 0;
	this._weather_ex_sprites = [];
};

//==============================
// * Update
//==============================
Weather_EX_Plane.prototype.update = function(type) {
    Sprite.prototype.update.call(this);	
	this.anchor.x = $gameMap.displayX();
	this.anchor.y = $gameMap.displayY();
	if (this.needRefreshWeather()) {this.refresh_weather_ex();};
	if (this._ref_time > 0) {this._ref_time -= 1}
	if (this._ref_time === 0) {this.opacity += 15};
};

//==============================
// * Need Refresh Weather
//==============================
Weather_EX_Plane.prototype.needRefreshWeather = function(type) {
	if ($gameSystem.weather_setup[0] != $gameSystem.weather_data[1][0]) {return true};
	if ($gameSystem.weather_setup[1] != $gameSystem.weather_data[1][1]) {return true};
	if ($gameSystem.weather_setup[2] != $gameSystem.weather_data[1][2]) {return true};
	if ($gameSystem.weather_data[0]) {return true};
	return false;
};

//==============================
// * Refresh Weather EX
//==============================
Weather_EX_Plane.prototype.refresh_weather_ex = function() {
	this.opacity = 0;
	this._ref_time = 2;
	$gameSystem.weather_setup[0] = $gameSystem.weather_data[1][0];
	$gameSystem.weather_setup[1] = $gameSystem.weather_data[1][1];
	$gameSystem.weather_setup[2] = $gameSystem.weather_data[1][2];
	$gameSystem.weather_data[0] = false;	
	for (var i = 0; i < this._weather_ex_sprites.length; i++) {
		this.removeChild(this._weather_ex_sprites[i]);};
	this._weather_ex_sprites = [];    
	var w_type = Number($gameSystem.weather_data[1][0]);	
	var w_power = Math.min(Math.max(Number($gameSystem.weather_data[1][1]) * 10,10),9999);
	var w_file_name = String($gameSystem.weather_data[1][2]);
	var w_data_old1 = $gameSystem.weather_data[2];
	var w_data_old2 = $gameSystem.weather_data[3];
	for (var i = 0; i < w_power; i++) {
		this._weather_ex_sprites[i] = new Sprite_Weather_EX(w_type,w_file_name,w_data_old1[i],w_data_old2[i]);
		this.addChild(this._weather_ex_sprites[i]);		
	};
};

//=============================================================================
// ** Sprite_Weather_EX
//=============================================================================	
function Sprite_Weather_EX() {
    this.initialize.apply(this, arguments);
};

Sprite_Weather_EX.prototype = Object.create(Sprite.prototype);
Sprite_Weather_EX.prototype.constructor = Sprite_Weather_EX;

//==============================
// * Initialize
//==============================
Sprite_Weather_EX.prototype.initialize = function(type,file_name,data_old1,data_old2) {
    Sprite.prototype.initialize.call(this);	
    this._type = Number(type);	
	this.bitmap = ImageManager.loadWeather(file_name);
	this._data_old_1 = data_old1;
	this._data_old_2 = data_old2;
	this._n_x = 0;
	this._n_y = 0;
	this._n_sx = 0;
	this._n_sy = 0;	
	this._n_scale = 0;
	this._n_rotation = 0;	
	this._n_opacity = 0;
	this._n_animation = 0;	
	this._sc_range = [0,0,0,0];
	this._sc_range2 = [0,0,0,0];
	this._first_setup = false;
	this._initial_position = true;
	this._initial_position_wait = 0;
};

//==============================
// * Load Old Data
//==============================
Sprite_Weather_EX.prototype.load_old_data = function() {
    this.x = this._data_old_1[0];
	this.y = this._data_old_1[1];
    this.anchor.x = this._data_old_1[2];
	this.anchor.y = this._data_old_1[3];	
	this.scale.x = this._data_old_1[4];
	this.scale.y = this._data_old_1[4];
	this.rotation = this._data_old_1[5];
	this.opacity = this._data_old_1[6];
	this.blendMode = this._data_old_1[7];
	this._n_x = this._data_old_2[0];
	this._n_y = this._data_old_2[1];
	this._n_scale = this._data_old_2[2];
	this._n_rotation = this._data_old_2[3];	
	this._n_opacity = this._data_old_2[4];
	this._n_animation = this._data_old_2[5];
	this._n_sx = this._data_old_2[6];
	this._n_sy = this._data_old_2[7];	
	this._data_old_1 = null;
	this._data_old_2 = null;
	this._initial_position_wait = 15;
};

//==============================
// * Set Screen Range
//==============================
Sprite_Weather_EX.prototype.set_screen_range = function() {	
  	this._sc_range[0] = this.bitmap.width * 2;
   	this._sc_range[1] = Graphics.boxWidth + this._sc_range[0];
   	this._sc_range[2] = this.bitmap.height * 2;
	this._sc_range[3] = Graphics.boxHeight + this._sc_range[2];
	this._sc_range[4] = this.bitmap.width;
	this._sc_range[5] = this.bitmap.height;
	if ($gameParty.inBattle() && Imported.MOG_BattleCamera) {
		var nx = Graphics.boxWidth / 2 * ($gameSystem._cam_data[1] / 100);
		var ny = Graphics.boxHeight / 2 * ($gameSystem._cam_data[1] / 100);
	    this._sc_range[1] += nx + 32;
		this._sc_range[3] += ny + 32;
    };
	this._first_setup = true;
};

//==============================
// * Set New Range
//==============================
Sprite_Weather_EX.prototype.set_new_range = function() {
	this._sc_range2[0] = Graphics.boxWidth + (Graphics.boxWidth / 2);
	this._sc_range2[1] = Graphics.boxWidth + (Graphics.boxWidth / 2);
	this._sc_range2[2] = Graphics.boxHeight / 2;
	this._sc_range2[3] = Graphics.boxHeight / 2;
	this._sc_range2[4] = Graphics.boxHeight + this.bitmap.height * 3;
};

//==============================
// * Refresh Weather
//==============================
Sprite_Weather_EX.prototype.refresh_weather = function() {
	if (!this.bitmap.isReady()) {return;};
	if (!this._first_setup) {this.set_screen_range()};
	if (this._data_old_1 != null) {this.load_old_data();return};
	this.set_weather_effect();
};

//==============================
// * Update
//==============================
Sprite_Weather_EX.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (!this._first_setup) {this.refresh_weather()};
    this.update_animation();
	if (this._initial_position_wait > 0) {this._initial_position_wait -= 1;return;};
	if (this.need_refresh()) {this.refresh_weather()};
};

//==============================
// * Need Refresh
//==============================
Sprite_Weather_EX.prototype.need_refresh = function() {
	if (this.x < -(this._sc_range[0] + this._sc_range2[0])) {return true};
	if (this.x > (this._sc_range[1] + this._sc_range2[1])) {return true};
	if (this.y < -(this._sc_range[2] + this._sc_range2[2])) {return true};
	if (this.y > (this._sc_range[3] + this._sc_range2[3])) {return true};
	return false;
};

//==============================
// * Screen RX
//==============================
Sprite_Weather_EX.prototype.screen_rx = function() {
	return $gameMap.displayX() * $gameMap.tileWidth();
};

//==============================
// * Screen RY
//==============================
Sprite_Weather_EX.prototype.screen_ry = function() {
	return $gameMap.displayY() * $gameMap.tileHeight();
};

//==============================
// * Random Zoom
//==============================
Sprite_Weather_EX.prototype.random_zoom = function() {
	var pz = ((Math.random() * 0.5) * 1);
	this.scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
};

//==============================
// * Random Position
//==============================
Sprite_Weather_EX.prototype.random_position = function() {
	  	this._n_x = this.screen_rx() + Math.floor((Math.random() * (Graphics.boxWidth + this._sc_range[0] + this._sc_range2[1])) - (this._sc_range[0] + this._sc_range2[0]));
	    this._n_y = this.screen_ry() + Math.floor((Math.random() * (Graphics.boxHeight + this._sc_range[2] + this._sc_range2[3])) - (this._sc_range[2] + this._sc_range2[2]));
};

//==============================
// * Set Weather Effect
//==============================
Sprite_Weather_EX.prototype.set_weather_effect = function() {
	switch (this._type) {
    case 0:
        this.setup_wind();
        break;
    case 1:
        this.setup_spark();
        break;
    case 2:
        this.setup_cloud();
        break;
    case 3:
        this.setup_snow();
        break;
    case 4:
        this.setup_rain();
        break;			
    default:
     	this.setup_random();
	   break;
    };
};

//==============================
// * Update Animation
//==============================
Sprite_Weather_EX.prototype.update_animation = function() {
	this.x = -this.screen_rx() + this._n_x;
	this.y = -this.screen_ry() + this._n_y;
	switch (this._type) {
    case 0:
        this.update_wind();
        break;
    case 1:
        this.update_spark();
        break;
    case 2:
        this.update_cloud();
        break;		
    case 3:
        this.update_snow();
        break;
    case 4:
        this.update_rain();
        break;
    default:
	   this.update_random();
	   break;
    };
};

//==============================
// * Setup Wind
//==============================
Sprite_Weather_EX.prototype.setup_wind = function() {
	this._sc_range2[2] = Graphics.boxHeight / 2;
	this._sc_range2[3] = Graphics.boxHeight / 2;		
	if (this._initial_position) { this.random_position(); this._initial_position = false; }
	else {
		this._n_x = -this._sc_range2[0] + this.screen_rx() + Math.floor((Math.random() * (Graphics.boxWidth + this._sc_range[0] + this._sc_range2[0])) - this._sc_range[0]);
        var ys = Math.randomInt(2)
		if (ys == 0){
    		this._n_y = -this._sc_range[2] + this.screen_ry();}
	    else {
			this._n_y = this.screen_ry() + this._sc_range[3];
		};			
	};
	this._sc_range2[0] = Graphics.boxWidth + (Graphics.boxWidth / 2);

	this._n_sx = Math.min(Math.max((Math.random() * 3),1),3);
	this._n_sy = Math.min(Math.max((Math.random() * 3),1),3);	
	this.rotation = Math.random(360)
	this._n_rotation = Math.min(Math.max((Math.random() * 0.01),0.005),0.01);
	this.random_zoom();
	this.opacity = 0;
	this.anchor.x = 1.0;
	this.anchor.y = 1.0;	
};

//==============================
// * Setup Spark
//==============================
Sprite_Weather_EX.prototype.setup_spark = function() {
	this.set_new_range()
	if (this._initial_position) { this.random_position(); this._initial_position = false; }
	else {
		this.random_position()
	};
	this._n_sx = 0;
	this._n_sy = -(Math.min(Math.max((Math.random() * 2),0.5),2));
	this.random_zoom();
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;	
	this._n_opacity = 1 + (Math.random() * 3);
	this.opacity = 0;
	this.blendMode = 1;
};

//==============================
// * Setup Cloud
//==============================
Sprite_Weather_EX.prototype.setup_cloud = function() {
    this.set_new_range()
	if (this._initial_position) { this.random_position(); this._initial_position = false; }
	else {
		 this.random_position()	};
    if (Moghunter.weather_ex_cloud_reverse_switch && $gameSwitches.value(Moghunter.weather_ex_cloud_reverse_switch)) {
		var _x1 = this._n_x - ($gameMap._displayX * $gameMap.tileWidth());
		var _x2 = _x1 - Graphics.width;
		this._n_x += (-1 * (_x1 + _x2));
	}
	this._n_sx = -(Math.min(Math.max((Math.random() * 2),0.5),2));
	this._n_sy = 0;
	this.random_zoom();
	this.opacity = 0;
};

//==============================
// * Setup Snow
//==============================
Sprite_Weather_EX.prototype.setup_snow = function() {
    this.set_new_range()
	if (this._initial_position) { this.random_position(); this._initial_position = false; }
	else {
	   this._n_x = -this._sc_range2[0] + this.screen_rx() + Math.floor((Math.random() * (Graphics.boxWidth + this._sc_range[0] + (this._sc_range2[0] * 2) )) - this._sc_range[0]);
		var ys = Math.randomInt(2)
		if (ys == 0){
    		this._n_y = -this._sc_range[2] + this.screen_ry();}
	    else {
			this._n_y = this.screen_ry() + this._sc_range[3];
		};		   
	};
	this._n_sx = 0;
	this._n_sy = Math.min(Math.max((Math.random() * 3),1),3);
	this.rotation = Math.random(360);
	this._n_rotation = Math.min(Math.max((Math.random() * 0.03),0.01),0.03);
	this.random_zoom();
	this.opacity = 0;
	this.anchor.x = 0.8;
	this.anchor.y = 0.8;	
};

//==============================
// * Setup Rain
//==============================
Sprite_Weather_EX.prototype.setup_rain = function() {
	this._sc_range2[0] = Graphics.boxWidth + (Graphics.boxWidth / 2);
	this._sc_range2[1] = Graphics.boxWidth + (Graphics.boxWidth / 2);	
	if (this._initial_position) { this.random_position(); this._initial_position = false; }
	else {
	   this._n_x = -this._sc_range2[0] + this.screen_rx() + Math.floor((Math.random() * (Graphics.boxWidth + this._sc_range[0] + (this._sc_range2[0] * 2) )) - this._sc_range[0]);
		var ys = Math.randomInt(2)
		if (ys == 0){
    		this._n_y = -this._sc_range[2] + this.screen_ry();}
	    else {
			this._n_y = this.screen_ry() + this._sc_range[3];
		};	
	};
	this._n_sx = 0;
	this._n_sy = Math.min(Math.max((Math.random() * 9),6),9);
	this.opacity = 0;
	this.random_zoom();
};

//==============================
// * Setup Random
//==============================
Sprite_Weather_EX.prototype.setup_random = function() {
    this.set_new_range()
	if (this._initial_position) { this.random_position(); this._initial_position = false; }
	else {
        this.random_position()	};
	this._n_sx = (Math.min(Math.max((Math.random() * 10),2),10));
	this._n_sy = (Math.min(Math.max((Math.random() * 10),2),10));
	var rn =  Math.floor((Math.random() * 2))
	if (rn == 0) {this._n_sx = -this._n_sx}
	var rn =  Math.floor((Math.random() * 2))
	if (rn == 0) {this._n_sy = -this._n_sy}	
	this.random_zoom();
};

//==============================
// * Update Wind
//==============================
Sprite_Weather_EX.prototype.update_wind = function() {
  this._n_x += this._n_sx;
  this._n_y += this._n_sy;
  this.rotation += this._n_rotation;
  this.anchor.x -= 0.01;
  this.anchor.y -= 0.01;
  this.opacity += 25;
};

//==============================
// * Update Snow
//==============================
Sprite_Weather_EX.prototype.update_snow = function() {
  this._n_x += this._n_sx;
  this._n_y += this._n_sy;
  this.rotation += this._n_rotation;
  this.opacity += 25;
};

//==============================
// * Update Light
//==============================
Sprite_Weather_EX.prototype.update_spark = function() {
  this._n_y += this._n_sy;
  this.opacity += 50;
  this.scale.x -= 0.005;
  this.scale.y = this.scale.x;
  if (this.scale.x <= 0.2) {this.refresh_weather()};
};

//==============================
// * Update Cloud
//==============================
Sprite_Weather_EX.prototype.update_cloud = function() {
  if (Moghunter.weather_ex_cloud_reverse_switch && $gameSwitches.value(Moghunter.weather_ex_cloud_reverse_switch)) {
	this._n_x += this._n_sx;
  } else {
	this._n_x -= this._n_sx;
  }
  this.opacity += 5;
};

//==============================
// * Update Rain
//==============================
Sprite_Weather_EX.prototype.update_rain = function() {
  this._n_y += this._n_sy;
  this.opacity += 50;
};

//==============================
// * Update Random
//==============================
Sprite_Weather_EX.prototype.update_random = function() {
  this._n_x += this._n_sx;
  this._n_y += this._n_sy;
};