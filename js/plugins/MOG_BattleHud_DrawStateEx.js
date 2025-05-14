//==============================
// * Settings
//==============================
Moghunter.bhud_atk_number_pos_x  = 199;
Moghunter.bhud_atk_number_pos_y  = 126;
Moghunter.bhud_def_number_pos_x  = 199;
Moghunter.bhud_def_number_pos_y  = 150;

//==============================
// * Create States
//==============================
Battle_Hud.prototype.create_states = function() {
	if (String(Moghunter.bhud_states_visible) != "true") {return};
    if (this._state_icons) {this._state_icons.forEach(function(icon) {this.removeChild(icon)}, this)};
    if (!this._battler) {return};
    this._state_icons = [];
    // for (var y = 0; y < 4; y++) {
    for (var y = 0; y < 5; y++) {
        for (var x = 0; x < 3; x++) {
            var state_icon = new Sprite(this._state_img);
            state_icon.x = this._pos_x + Moghunter.bhud_states_pos_x + Window_Base._iconWidth * x -40 ;
            state_icon.y = this._pos_y + Moghunter.bhud_states_pos_y - Window_Base._iconHeight * y;
            state_icon.visible = false;
            this.addChild(state_icon);
            this._state_icons.push(state_icon);
        }
    }
    this.refresh_states();
};

//==============================
// * Refresh States
//==============================
Battle_Hud.prototype.refresh_states = function() {
    if (this._state_icons) {this._state_icons.forEach(function(icon) {icon.visible = false})};
    if (this._battler.allIcons().length == 0) {return};
    this._battler.allIcons().forEach(function(stateId, index) {
        if (index < 15) {
            this._state_icons[index].visible = true;
            var sx = stateId % 16 * 32;
            var sy = Math.floor(stateId / 16) * 32;
            this._state_icons[index].setFrame(sx, sy, 32, 32);
        }
    }, this);
    this._battler.need_refresh_bhud_states = false;
};

//==============================
// * Update States
//==============================
Battle_Hud.prototype.update_states = function() {
	if (this.need_refresh_states()) {this.refresh_states();};
};

//==============================
// * Need Refresh States
//==============================
Battle_Hud.prototype.need_refresh_states = function() {
	if (this._battler.need_refresh_bhud_states) {return true};
	return false;
};

Battle_Hud.prototype.load_img = function() {
	this._layout_img = ImageManager.loadBHud("Layout");
	if (String(Moghunter.bhud_layoverlay_visible) == "true") {this._layout2_img = ImageManager.loadBHud("Layout2");;};
	this._turn_img = ImageManager.loadBHud("Turn");
	this._state_img = ImageManager.loadSystem("IconSet");
	if (String(Moghunter.bhud_hp_meter_visible) == "true") {this._hp_meter_img = ImageManager.loadBHud("HP_Meter");};
	if (String(Moghunter.bhud_mp_meter_visible) == "true") {this._mp_meter_img = ImageManager.loadBHud("MP_Meter");};
	if (String(Moghunter.bhud_tp_meter_visible) == "true") {this._tp_meter_img = ImageManager.loadBHud("TP_Meter");};
	if (String(Moghunter.bhud_at_meter_visible) == "true") {this._at_meter_img = ImageManager.loadBHud("ATB_Meter");};
	if (String(Moghunter.bhud_hp_number_visible) == "true") {this._hp_number_img = ImageManager.loadBHud("HP_Number");};
	if (String(Moghunter.bhud_mp_number_visible) == "true") {this._mp_number_img = ImageManager.loadBHud("MP_Number");};
	if (String(Moghunter.bhud_tp_number_visible) == "true") {this._tp_number_img = ImageManager.loadBHud("TP_Number");};
	if (String(Moghunter.bhud_maxhp_number_visible) == "true") {this._maxhp_number_img = ImageManager.loadBHud("HP_Number2");};
	if (String(Moghunter.bhud_maxmp_number_visible) == "true") {this._maxmp_number_img = ImageManager.loadBHud("MP_Number2");};
	if (String(Moghunter.bhud_maxtp_number_visible) == "true") {this._maxtp_number_img = ImageManager.loadBHud("TP_Number2");};	
	this._atk_number_img = ImageManager.loadBHud("ATK_Number");
	this._def_number_img = ImageManager.loadBHud("DEF_Number");
};

//==============================
// * Create Sprites
//==============================
Battle_Hud.prototype.create_sprites = function() {
	this.create_hp_meter();
	this.create_mp_meter();
    this.create_tp_meter();
	this.create_at_meter();	 
	this.create_hp_number();	
	this.create_maxhp_number();
	this.create_mp_number();	
    this.create_maxmp_number();
 	this.create_tp_number();
	this.create_maxtp_number();
	this.create_atk_number();
	this.create_def_number();
    this.create_states();	
	this.create_name();
};

//==============================
// * Update Sprites
//==============================
Battle_Hud.prototype.update_sprites = function() {	
    this.update_active();
	this.update_visible();
	this.update_turn();
	this.update_face();	
    this.update_hp();
	this.update_mp();
    this.update_tp();
	this.update_at();	 
	this.update_atk();
	this.update_def();
	this.update_states();
};

//==============================
// * Create ATK Number
//==============================
Battle_Hud.prototype.create_atk_number = function() {
	if (this._atk_number) {for (var i = 0; i < this._atk_number.length; i++) {this.removeChild(this._atk_number[i]);}};
	if (!this._battler) {return};
	this._atk_number = [];
	this._atk_img_data = [this._atk_number_img.width,this._atk_number_img.height,
	                      this._atk_number_img.width / 10, this._atk_number_img.height / 2,
						  this._pos_x + Moghunter.bhud_atk_number_pos_x,
						  this._pos_y + Moghunter.bhud_atk_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._atk_number[i] = new Sprite(this._atk_number_img);
	   this._atk_number[i].visible = false;
	   this._atk_number[i].x = this._atk_img_data[4];
	   this._atk_number[i].y = this._atk_img_data[5] ;
	   this.addChild(this._atk_number[i]);
	};	
	this._atk_number_old = this._battler.atk;
	this.refresh_number(this._atk_number,this._atk_number_old,this._atk_img_data,this._atk_img_data[4],this._atk_img_data[5],2);	
};

//==============================
// * Update ATK
//==============================
Battle_Hud.prototype.update_atk = function() {
	this._atk_number_old = this._battler.atk;
	this.refresh_number(this._atk_number,this._atk_number_old,this._atk_img_data,this._atk_img_data[4],this._atk_img_data[5],2);	
};

//==============================
// * Create DEF Number
//==============================
Battle_Hud.prototype.create_def_number = function() {
	if (this._def_number) {for (var i = 0; i < this._def_number.length; i++) {this.removeChild(this._def_number[i]);}};
	if (!this._battler) {return};
	this._def_number = [];
	this._def_img_data = [this._def_number_img.width,this._def_number_img.height,
	                      this._def_number_img.width / 10, this._def_number_img.height / 2,
						  this._pos_x + Moghunter.bhud_def_number_pos_x,
						  this._pos_y + Moghunter.bhud_def_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._def_number[i] = new Sprite(this._def_number_img);
	   this._def_number[i].visible = false;
	   this._def_number[i].x = this._def_img_data[4];
	   this._def_number[i].y = this._def_img_data[5] ;
	   this.addChild(this._def_number[i]);
	};	
	this._def_number_old = this._battler.def;
	this.refresh_number(this._def_number,this._def_number_old,this._def_img_data,this._def_img_data[4],this._def_img_data[5],2);	
};

//==============================
// * Update DEF
//==============================
Battle_Hud.prototype.update_def = function() {
	this._def_number_old = this._battler.def;
	this.refresh_number(this._def_number,this._def_number_old,this._def_img_data,this._def_img_data[4],this._def_img_data[5],2);	
};
