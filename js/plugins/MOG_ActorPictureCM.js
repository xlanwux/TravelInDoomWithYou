//=============================================================================
// MOG_ActorPictureCM.js
//=============================================================================

/*:
 * @plugindesc (v1.3) Apresenta a imagem do personagem durante a seleção de comandos.
 * @author Moghunter 
 *
 * @param CM 1 Visible
 * @desc Ativar a imagem primaria do personagem.
 * @default true
 *
 * @param CM 1 X-Axis
 * @desc Definição da posição X-axis da imagem.
 * @default 500
 *
 * @param CM 1 Y-Axis
 * @desc Definição da posição Y-axis da imagem.
 * @default 0 
 *
 * @param CM 2 Visible
 * @desc Ativar a imagem secundaria do personagem.
 * @default true
 *
 * @param CM 2 X-Axis
 * @desc Definição da posição Y-axis da imagem.
 * @default 0
 *
 * @param CM 2 Y-Axis
 * @desc Definição da posição Y-axis da imagem.
 * @default 0
 *
 * @help  
 * =============================================================================
 * +++ MOG - Actor Picture CM (v1.4) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta a imagem do personagem durante a seleção de comandos.
 * As imagens dos personagens devem ser gravadas na pasta. /img/pictures/
 * A nomeação dos arquivos devem ser feitas da seguinte forma.
 * 
 * Actor_ ID.png
 *
 * Exemplo
 *
 * Actor_1.png
 * Actor_2.png
 * Actor_3.png
 *
 * Para definir a imagem secundária do personagem nomeie o arquivo da seguinte
 * forma.
 *
 * Actor_ ID + b.png
 *
 * Exemplo
 *
 * Actor_1b.png
 * Actpr_2b.png
 * ...
 *
 * ============================================================================= 
 * HISTÓRICOS
 * =============================================================================
 * (v1.4) - Possibilidade de definir a prioridade da Picture. 
 * (v1.3) - Melhoria na codificação.
 * (v1.2) - Compatibilidade com MOG Battle Cursor no modo Front View.
 * (v1.1) - Adicionado a imagem secundária do personagem.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_ActorPictureCM = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_ActorPictureCM');
    Moghunter.actor_cm1_visible = String(Moghunter.parameters['CM 1 Visible'] || "true");
	Moghunter.actor_cm_x = Number(Moghunter.parameters['CM 1 X-Axis'] || 500);
    Moghunter.actor_cm_y = Number(Moghunter.parameters['CM 1 Y-Axis'] || 0);
	Moghunter.actor_cm2_visible = String(Moghunter.parameters['CM 2 Visible'] || "true");
	Moghunter.actor_cm2_x = Number(Moghunter.parameters['CM 2 X-Axis'] || 0);
    Moghunter.actor_cm2_y = Number(Moghunter.parameters['CM 2 Y-Axis'] || 0);
	Moghunter.actor_cm_z = Number(Moghunter.parameters['Z Mode'] || 0);
	
//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_actorcm_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_alias_mog_actorcm_temp_initialize.call(this);
    this._actor_cm_visible = false;
};	
	
//=============================================================================
// ** Game_Interpreter (added by nekoma)
//=============================================================================

//==============================
// * Plugin Command (added by nekoma)
//==============================
(function(o, p) {
    var f = o[p]; o[p] = function(command, args) {
        f.apply(this, arguments);
        if (command.toLowerCase() == 'actorcm_change_picture') {
            if (!$gameSystem._actorcm_picture) { $gameSystem._actorcm_picture = []; }
            $gameSystem._actorcm_picture[+args[0]] = args[1];
        }
    };
}(Game_Interpreter.prototype, 'pluginCommand'));

//=============================================================================
// ** Spriteset Battle
//=============================================================================

//==============================
// * CreateSpriteset
//==============================
var _alias_mog_actorcm_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
   _alias_mog_actorcm_createLowerLayer.call(this);
   if (Moghunter.actor_cm_z === 0) {
      this.actorPictureCM = new Actor_CMPicture();
      this.actorPictureCM.z = 20;
      this.addChild(this.actorPictureCM);
   };
};

//=============================================================================
// * Actor_CMPicture
//=============================================================================
function Actor_CMPicture() {
    this.initialize.apply(this, arguments);
};

Actor_CMPicture.prototype = Object.create(Sprite.prototype);
Actor_CMPicture.prototype.constructor = Actor_CMPicture;

//==============================
// * Initialize
//==============================
Actor_CMPicture.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._reserved_actor_cm_pictures = ($gameSystem._actorcm_picture = $gameSystem._actorcm_picture || []); // added by nekoma.
    this._using_actor_cm_pictures = this._reserved_actor_cm_pictures.concat();                              //
    this.load_actor_cm_pictures();
	this.z = 20;
	if (String(Moghunter.actor_cm2_visible) === "true") {
  	   this._sprite_actor_cm_lay = new Sprite();
	   this._sprite_actor_cm_lay.x = Graphics.boxWidth + Moghunter.actor_cm2_x;
	   this._sprite_actor_cm_lay.y = Moghunter.actor_cm2_y;
	   this._sprite_actor_cm_lay.opacity = 0;
	   this._sprite_actor_cm_lay.visible = false;
       this.addChild(this._sprite_actor_cm_lay);	
	};	
	if (String(Moghunter.actor_cm1_visible) === "true") {
	   this._sprite_actor_cm = new Sprite();
	   this._sprite_actor_cm.anchor.x = 0.5;
	   this._sprite_actor_cm.y = this._actor_cm_data[2];
	   this.addChild(this._sprite_actor_cm);
	};
};

//==============================
// * Load Actor CM Pictures
//==============================	
Actor_CMPicture.prototype.load_actor_cm_pictures = function() {
	this._sprite_actor_cm_data = [Graphics.width,0,0]
	this._actor_cm_data = [null,Moghunter.actor_cm_x,Moghunter.actor_cm_y];
	this._actor_cm_data[3] = this._actor_cm_data[1] - 100;
	this._actor_cm_img = [];
	var members = $gameParty.battleMembers();
	if (String(Moghunter.actor_cm1_visible) === "true") {		
		for (var i = 0; i < members.length; i++) {
//			this._actor_cm_img[members[i]._actorId] = ImageManager.loadPicture("Actor_" + members[i]._actorId)              // modified by nekoma.
            var actor_cm_file_name = this._using_actor_cm_pictures[members[i]._actorId] || "Actor_" + members[i]._actorId;  //
            this._actor_cm_img[members[i]._actorId] = ImageManager.loadPicture(actor_cm_file_name);                         //
		};
	};
	if (String(Moghunter.actor_cm2_visible) === "true") {
		this._actor_cm2_img = [];
		for (var i = 0; i < members.length; i++) {
//			this._actor_cm2_img[members[i]._actorId] = ImageManager.loadPicture("Actor_" + members[i]._actorId + "b")               // modified by nekoma.
            var actor_cm2_file_name = (this._using_actor_cm_pictures[members[i]._actorId] || "Actor_" + members[i]._actorId) + "b"; //
            this._actor_cm2_img[members[i]._actorId] = ImageManager.loadPicture(actor_cm2_file_name);                               //
        };		
	};
};

//==============================
// * Update
//==============================
Actor_CMPicture.prototype.update = function() {
	Sprite.prototype.update.call(this);
	if ($gameTemp._actor_cm_visible) {
//      if (this._actor_cm_data[0] != BattleManager.actor()) {this.actor_cm_refresh()};                                                         // modified by nekoma.
        var actorId = BattleManager.actor()._actorId;                                                                                           //
        if (this._using_actor_cm_pictures[actorId] != this._reserved_actor_cm_pictures[actorId]) {                                              //
            this._using_actor_cm_pictures[actorId] = this._reserved_actor_cm_pictures[actorId];                                                 //
            this._actor_cm_img[actorId] = null;                                                                                                 //
            this._actor_cm2_img[actorId] = null;                                                                                                //
            this.actor_cm_refresh();                                                                                                            //
        } else {                                                                                                                                //
            if (this._actor_cm_data[0] != BattleManager.actor()) {this.actor_cm_refresh()};                                                     //
        }
        if (this._sprite_actor_cm) {this.update_actor_cm_show()};
		if (this._sprite_actor_cm_lay) {this.update_actor_cm_lay_show()};
	} else {
        if (this._sprite_actor_cm) {this.update_actor_cm_hide()};
		if (this._sprite_actor_cm_lay) {this.update_actor_cm_lay_hide()};
	};
};

//==============================
// * Update Actor CM Show
//==============================
Actor_CMPicture.prototype.update_actor_cm_show = function() {	
	this._sprite_actor_cm.opacity += 15;
	if (this._sprite_actor_cm.x < this._actor_cm_data[1])
	   {this._sprite_actor_cm.x += 7;
	   	   if (this._sprite_actor_cm.x > this._actor_cm_data[1]) {this._sprite_actor_cm.x = this._actor_cm_data[1]}; 
	};
};

//==============================
// * Update Actor CM Hide
//==============================
Actor_CMPicture.prototype.update_actor_cm_hide = function() {
	this._sprite_actor_cm.opacity -= 15;
	if ( (this._sprite_actor_cm.x > this._actor_cm_data[3])) {
		this._sprite_actor_cm.x -= 7;
	    if (this._sprite_actor_cm.x < this._actor_cm_data[3]) {this._sprite_actor_cm.x = this._actor_cm_data[3]};
	};
};

//==============================
// * Update Actor CM Lay Show
//==============================
Actor_CMPicture.prototype.update_actor_cm_lay_show = function() {	
    this._sprite_actor_cm_lay.opacity += 15;
	if (this._sprite_actor_cm_lay.x > this._sprite_actor_cm_data[0])
	   {this._sprite_actor_cm_lay.x -= this._sprite_actor_cm_data[1];
	  if (this._sprite_actor_cm_lay.x < this._sprite_actor_cm_data[0]) {this._sprite_actor_cm_lay.x = this._sprite_actor_cm_data[0]};
	};
};

//==============================
// * Update Actor CM Lay Hide
//==============================
Actor_CMPicture.prototype.update_actor_cm_lay_hide = function() {
	this._sprite_actor_cm_lay.opacity -= 15;
	if ( (this._sprite_actor_cm_lay.x < Graphics.boxWidth)) {
		this._sprite_actor_cm_lay.x += this._sprite_actor_cm_data[1];
	    if (this._sprite_actor_cm_lay.x > Graphics.boxWidth) {this._sprite_actor_cm_lay.x = Graphics.boxWidth};
	};
};

//==============================
// * Actor CM Refresh
//==============================
Actor_CMPicture.prototype.actor_cm_refresh = function() {
	this._actor_cm_data[0] = BattleManager.actor();
	var actor_id = this._actor_cm_data[0]._actorId
	if (this._sprite_actor_cm) {
		if (!this._actor_cm_img[actor_id]) {
//			this._actor_cm_img[actor_id] = ImageManager.loadPicture("Actor_" + String(actor_id))                // modified by nekoma.
            var actor_cm_file_name = this._using_actor_cm_pictures[actor_id] || "Actor_" + String(actor_id);    //
            this._actor_cm_img[actor_id] = ImageManager.loadPicture(actor_cm_file_name);                        //
        };
		this._sprite_actor_cm.bitmap = this._actor_cm_img[actor_id];
		this._sprite_actor_cm.opacity = 0;	
		this._sprite_actor_cm.x = this._actor_cm_data[3];
		if (this._sprite_actor_cm.bitmap.isReady()) {
			this._sprite_actor_cm.y = this._actor_cm_data[2] + Graphics.boxHeight - this._sprite_actor_cm.bitmap.height;
		};
    };	
	if (this._sprite_actor_cm_lay) {
		if (!this._actor_cm2_img[actor_id]) {
//			this._actor_cm2_img[actor_id] = ImageManager.loadPicture("Actor_" + String(actor_id) + "b");                // modified by nekoma.
            var actor_cm2_file_name = (this._using_actor_cm_pictures[actor_id] || "Actor_" + String(actor_id)) + "b";   //
            this._actor_cm2_img[actor_id] = ImageManager.loadPicture(actor_cm2_file_name);                              //
        };		
		this._sprite_actor_cm_lay.bitmap = this._actor_cm2_img[actor_id];
		if (this._actor_cm2_img[actor_id].isReady()) {
     	   this._sprite_actor_cm_data[0] = Graphics.boxWidth - this._sprite_actor_cm_lay.bitmap.width + Moghunter.actor_cm2_x;
	       this._sprite_actor_cm_data[1] = Math.max((this._sprite_actor_cm_lay.bitmap.width / 13),1);
	    };
		this._sprite_actor_cm_lay.x = Graphics.boxWidth + Moghunter.actor_cm2_x;
		this._sprite_actor_cm_lay.opacity = 0;
		this._sprite_actor_cm_lay.visible = true;
	};
};







//==============================
// * Update
//==============================
var _alias_mog_actorcm_scbat_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_alias_mog_actorcm_scbat_update.call(this);
	$gameTemp._actor_cm_visible = this.sprite_actor_cm_visible();
};

//==============================
// * Sprite Actor CM Visible
//==============================
Scene_Battle.prototype.sprite_actor_cm_visible = function() {
	if (!BattleManager.actor()) {return false};
	if (this._actorWindow.active) {return false};
	if (this._enemyWindow.active) {return false};
	if (this._partyCommandWindow.active) {return false};
	if (!BattleManager.isInputting()) {return false};
	return true;
};