//=============================================================================
// MOG_BattleHud.js
//=============================================================================

/*:
 * @plugindesc (v2.7) Permite customizar o layout de batalha.
 * @author Moghunter
 *
 * @param Hud X-Axis
 * @desc Definição da posição X-Axis da Hud.
 * @default -90
 *
 * @param Hud Y-Axis
 * @desc Definição da posição Y-Axis da Hud.
 * @default 430
 *
 * @param Hud Space X
 * @desc Define o espaço na horizontal entre as huds.
 * @default 0
 *
 * @param Hud Space Y
 * @desc Define o espaço na vertical entre as huds.
 * @default 0
 *
 * @param Vertical Mode
 * @desc Deixar a Hud na posição vertical.
 * @default false
 *
 * @param Command Auto Adjust
 * @desc Ativar ajuste automático baseado na posição
 * da Hud. (false - Define a posição fixa.)
 * @default true
 *
 * @param Max Battle Members
 * @desc Quantidade de maxima de battler na batalha.
 * @default 4
 *
 * @param >> LAYOUT OVERLAY =========
 *
 * @param Layout2 Visible
 * @desc Ativar o segunda imagem do layout, esta imagem 
 * ficará acima das faces e medidores.
 * @default true
 *
 * @param Layout2 X-Axis
 * @desc Definição da posição X-Axis da Hud.
 * @default 0
 *
 * @param Layout2 Y-Axis
 * @desc Definição da posição Y-Axis da Hud.
 * @default 0
 * 
 * @param >> TURN ===================
 * @desc 
 * @default  
 *
 * @param Turn Visible
 * @desc Apresentar a imagem do turno.
 * @default true
 *
 * @param Turn X-Axis
 * @desc Definição da posição X-Axis do turno.
 * @default 0
 *
 * @param Turn Y-Axis
 * @desc Definição da posição Y-Axis do turno.
 * @default 20
 *
 * @param >> FACE ===================
 * @desc 
 * @default  
 *
 * @param Face Visible
 * @desc Apresentar a imagem da face.
 * @default true
 *
 * @param Face X-Axis
 * @desc Definição da posição X-Axis da face.
 * @default 55
 *
 * @param Face Y-Axis
 * @desc Definição da posição Y-Axis da face.
 * @default 120
 *
 * @param Face Shake Animation
 * @desc Ativar animação de tremer da face.
 * @default true
 *
 * @param Face Zoom Animation
 * @desc Ativar animação de zoom de ação.
 * @default true
 *
 * @param Face Frame Animation
 * @desc Ativar animação por frames.
 *       É necessário dividir a imagem por 5.
 * @default false
 *
 * @param Face Priority
 * @desc Prioridade da Face. (0 Low - 1 High)
 * @default 1
 *
 * @param Face Dead Opacity
 * @desc Opacidade do estado de morte. (0 - 255)
 * @default 128
 *
 * @param >> NAME ===================
 * @desc 
 * @default
 *
 * @param Name Visible
 * @desc Apresentar o nome do personagem.
 * @default true
 *
 * @param Name X-Axis
 * @desc Definição da posição X-Axis do nome.
 * @default 50
 *
 * @param Name Y-Axis
 * @desc Definição da posição Y-Axis do nome.
 * @default 150 
 *
 * @param Name Font Size
 * @desc Definição do tamanho da fonte do nome.
 * @default 20
 *
 * @param Name Bold Size
 * @desc Definição do tamanho do contorno.
 * @default 4
 *
 * @param Name Font Italic
 * @desc Ativar fonte em itálico.
 * @default false
 *
 * @param >> HP ===================
 * @desc 
 * @default 
 *
 * @param HP Meter Visible
 * @desc Apresentar o medidor de HP
 * @default true   
 *
 * @param HP Meter X-Axis
 * @desc Definição da posição X-Axis do medidor de HP.
 * @default 106
 *
 * @param HP Meter Y-Axis
 * @desc Definição da posição Y-Axis do medidor de HP.
 * @default 70
 *
 * @param HP Meter Angle
 * @desc Ángulo do medidor.
 * @default -0.47
 *
 * @param HP Meter Flow Anime
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default false
 *
 * @param HP Number Visible
 * @desc Apresentar o numero de HP
 * @default true   
 *
 * @param HP Number Align type
 * @desc Definição do tipo de alinhamento dos números.
 * (0 - right 1) (Center 2 - Left) (3 - Diagonal)
 * @default 3
 * 
 * @param HP Number X-Axis
 * @desc Definição da posição X-Axis do numero de HP.
 * @default 110
 *
 * @param HP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de HP.
 * @default 43
 * 
 * @param MaxHP Number Visible
 * @desc Apresentar o numero de HP maximo.
 * @default false
 *
 * @param MaxHP Number X-Axis
 * @desc Definição da posição X-Axis do numero de HP maximo.
 * @default 185
 *
 * @param MaxHP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de HP maximo.
 * @default 40
 *
 * @param >> MP ===================
 * @desc 
 * @default  
 *
 * @param MP Meter Visible
 * @desc Apresentar o medidor de MP
 * @default true   
 *
 * @param MP Meter X-Axis
 * @desc Definição da posição X-Axis do medidor de MP.
 * @default 127
 *
 * @param MP Meter Y-Axis
 * @desc Definição da posição Y-Axis do medidor de MP.
 * @default 121
 *
 * @param MP Meter Angle
 * @desc Ángulo do medidor.
 * @default -0.47
 *
 * @param MP Meter Flow Anime
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default false 
 *
 * @param MP Number Visible
 * @desc Apresentar o numero de MP
 * @default true
 *
 * @param MP Number Align type
 * @desc Definição do tipo de alinhamento dos números.
 * (0 - right 1) (Center 2 - Left) (3 - Diagonal)
 * @default 3
 * 
 * @param MP Number X-Axis
 * @desc Definição da posição X-Axis do numero de MP.
 * @default 130
 *
 * @param MP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de MP.
 * @default 95
 *
 * @param MaxMP Number Visible
 * @desc Apresentar o numero de MP maximo.
 * @default false
 *
 * @param MaxMP Number X-Axis
 * @desc Definição da posição X-Axis do numero de MP maximo.
 * @default 196
 *
 * @param MaxMP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de MP maximo.
 * @default 78
 *
 * @param >> TP ===================
 * @desc 
 * @default  
 *
 * @param TP Meter Visible
 * @desc Apresentar o medidor de TP
 * @default true   
 *
 * @param TP Meter X-Axis
 * @desc Definição da posição X-Axis do medidor de TP.
 * @default 13
 *
 * @param TP Meter Y-Axis
 * @desc Definição da posição Y-Axis do medidor de TP.
 * @default 78
 *
 * @param TP Meter Angle
 * @desc Ángulo do medidor.
 * @default -1.57
 *
 * @param TP Meter Flow Anime
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default false 
 *
 * @param TP Number Visible
 * @desc Apresentar o numero de TP.
 * @default true   
 *
 * @param TP Number Align type
 * @desc Definição do tipo de alinhamento dos números.
 * (0 - right 1) (Center 2 - Left) (3 - Diagonal)
 * @default 2
 *
 * @param TP Number X-Axis
 * @desc Definição da posição X-Axis do numero de TP.
 * @default 20
 *
 * @param TP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de TP.
 * @default 60
 *
 * @param MaxTP Number Visible
 * @desc Apresentar o numero de TP maximo.
 * @default false
 *
 * @param MaxTP Number X-Axis
 * @desc Definição da posição X-Axis do numero de TP maximo.
 * @default 185
 *
 * @param MaxTP Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de TP maximo.
 * @default 116
 *
 * @param >> ATB ===================
 * @desc 
 * @default  
 *
 * @param ATB Meter Visible
 * @desc Apresentar o medidor de TP
 * @default true   
 *
 * @param ATB Meter X-Axis
 * @desc Definição da posição X-Axis do medidor de ATB.
 * @default 80
 *
 * @param ATB Meter Y-Axis
 * @desc Definição da posição Y-Axis do medidor de ATB.
 * @default 155
 *
 * @param ATB Meter Angle
 * @desc Ángulo do medidor.
 * @default 0
 *
 * @param ATB Meter Flow Anime
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default false 
 *
 * @param >> STATES ===================
 * @desc 
 * @default 
 *
 * @param States Visible
 * @desc Apresentar o numero as condições.
 * @default true   
 *
 * @param States X-Axis
 * @desc Definição da posição X-Axis das condições.
 * @default 10
 *
 * @param States Y-Axis
 * @desc Definição da posição Y-Axis das condições.
 * @default 150
 *
 * @param >> W COMMAND ===================
 * @desc 
 * @default 
 *
 * @param W Command X-Axis
 * @desc Definição do posição X-axis do comando.
 * @default 0    
 *
 * @param W Command Y-Axis
 * @desc Definição do posição Y-axis do comando.
 * @default -15
 *
 * @param W Command Width
 * @desc Definição da largura da janela.
 * @default 192
 *
 * @param W Command Height
 * @desc Definição da altura da janela.
 * @default 180
 *
 * @param Layout Command
 * @desc Ativar a imagem de layout.
 * @default true
 *
 * @param L Command X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default -25   
 *
 * @param L Command Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -35
 *
 * @param >> W PARTY ===================
 * @desc 
 * @default  
 *
 * @param W Party X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 325    
 *
 * @param W Party Y-Axis
 * @desc Definição do posição Y-axis do janela.
 * @default 170
 *
 * @param W Party Width
 * @desc Definição da largura da janela.
 * @default 192
 *
 * @param W Party Height
 * @desc Definição da altura da janela.
 * @default 110
 *
 * @param Layout Party
 * @desc Ativar a imagem de layout.
 * @default true
 *
 * @param L Party X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default -325   
 *
 * @param L Party Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -42 
 *
 * @param >> W HELP ===================
 * @desc 
 * @default  
 *
 * @param W Help X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 0    
 *
 * @param W Help Y-Axis
 * @desc Definição do posição Y-axis do janela.
 * @default 0
 *
 * @param W Help Width
 * @desc Definição da largura da janela.
 * @default 816
 *
 * @param W Help Height
 * @desc Definição da altura da janela.
 * @default 108
 *
 * @param Layout Help
 * @desc Ativar a imagem de layout.
 * @default true
 *
 * @param L Help X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default 0   
 *
 * @param L Help Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default 0 
 *
 * @param >> W SKILL ===================
 * @desc 
 * @default  
 *
 * @param W Skill X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 0    
 *
 * @param W Skill Y-Axis
 * @desc Definição do posição Y-axis do janela.
 * @default 444
 *
 * @param W Skill Width
 * @desc Definição da largura da janela.
 * @default 816
 *
 * @param W Skill Height
 * @desc Definição da altura da janela.
 * @default 180
 *
 * @param W Skill maxCols
 * @desc Definição da quantidade de colunas da janela.
 * @default 2 
 *
 * @param Layout Skill
 * @desc Ativar a imagem de layout.
 * @default true
 *
 * @param L Skill X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default 0
 *
 *
 * @param L Skill Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -67
 *
 *
 * @param >> W ITEM ===================
 * @desc 
 * @default  
 *
 * @param W Item X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 0    
 *
 * @param W Item Y-Axis
 * @desc Definição do posição Y-axis do janela.
 * @default 444
 *
 * @param W Item Width
 * @desc Definição da largura da janela.
 * @default 816
 *
 * @param W Item Height
 * @desc Definição da altura da janela.
 * @default 180
 *
 * @param W Item maxCols
 * @desc Definição da quantidade de colunas da janela.
 * @default 2 
 *
 * @param Layout Item
 * @desc Ativar a imagem de layout.
 * @default true
 *
 * @param L Item X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default 0   
 *
 * @param L Item Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -67 
 *
 * @param >> W ACTOR ===================
 * @desc 
 * @default  
 *
 * @param W Actor X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 0    
 *
 * @param W Actor Y-Axis
 * @desc Definição do posição Y-axis do janela.
 * @default 444
 *
 * @param W Actor Width
 * @desc Definição da largura da janela.
 * @default 816
 *
 * @param W Actor Height
 * @desc Definição da altura da janela.
 * @default 180
 *
 * @param W Actor maxCols
 * @desc Definição da quantidade de colunas da janela.
 * @default 1 
 *
 * @param Layout Actor
 * @desc Ativar a imagem de layout.
 * @default true
 *
 * @param L Actor X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default 0   
 *
 * @param L Actor Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -67   
 *
 * @param >> W ENEMY ===================
 * @desc 
 * @default  
 *
 * @param W Enemy X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 0    
 *
 * @param W Enemy Y-Axis
 * @desc Definição do posição Y-axis do janela.
 * @default 444
 *
 * @param W Enemy Width
 * @desc Definição da largura da janela.
 * @default 816
 *
 * @param W Enemy Height
 * @desc Definição da altura da janela.
 * @default 180
 *
 * @param W Enemy maxCols
 * @desc Definição da quantidade de colunas da janela.
 * @default 2 
 *
 * @param Layout Enemy
 * @desc Ativar a imagem de layout.
 * @default true
 *
 * @param L Enemy X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default 0
 *
 * @param L Enemy Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -67
 *
 * @param >> SCREEN LAYOUT ===================
 * @desc 
 * @default
 *
 * @param Screen Layout
 * @desc Ativar o Layout da tela.
 * @default true
 *
 * @param Screen X-Axis
 * @desc Definição do posição X-axis da imagem.
 * @default 0
 *
 * @param Screen Y-Axis
 * @desc Definição do posição Y-axis da imagem.
 * @default 0
 *
 * @param >> CUSTOM POSITION ===================
 * @desc 
 * @default   
 *
 * @param Custom Position 1
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 *
 * @param Custom Position 2
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 *
 * @param Custom Position 3
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 *
 * @param Custom Position 4
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 *
 * @param Custom Position 5
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 *
 * @param Custom Position 6
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default  
 *
 * @param Custom Position 7
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 *
 * @param Custom Position 8
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default  
 *
 * @help  
 * =============================================================================
 * +++ MOG_BattleHud (v2.7) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * O plugin permite customizar o layout de batalha.
 * Serão necessários os arquivos. (img/battlehud/)
 *
 * HP_Meter.png
 * HP_Number.png
 * MP_Meter.png
 * MP_Number.png
 * TP_Meter.png
 * TP_Number.png
 * ATB_Meter.png
 * Layout.png
 * Layout_Actor.png
 * Layout_Command.png
 * Layout_Enemy.png
 * Layout_Help.png
 * Layout_Item.png
 * Layout_Party.png
 * Layout_Screen.png
 * Layout_Skill.png
 * Turn.png
 *
 * =============================================================================
 * Para nomear as faces dos battlers basta nomear da seguinte forma.
 *
 * Face_ + ACTOR_ID.png
 *
 * Ex
 *
 * Face_1.png
 * Face_2.png
 * Face_3.png
 * ...
 *
 * =============================================================================
 * HISTÓRICO
 * =============================================================================
 * (2.7) - Correção de alguns plugins parameters.  
 * (2.6) - Correção de parametro da posição do Screen Layout Y. 
 * (2.5) - Correção de alguns plugins parameters não fucionarem
 * (2.4) - Correção de não apresentar os ícones de Buff e Debuff. 
 * (2.3) - Melhoria na codificação.
 * (2.2) - Adição da opção do alinhamento dos números. 
 *       - Adição do layout Overlay. 
 * (2.1) - Compatibilidade com MOG Battle Cursor no modo Front View. 
 * (2.0) - Faces como actors no modo Frontview. 
 *       - Opção de definir a quantidade battlers na batalha.
 * (1.5) - Correção no setup do ângulo dos medidores. 
 * (1.4) - Correção na prioridade do layout Screen.
 * (1.3) - Correção na posição do plugin do template. 
 * (1.2) - Adição do modo hud na vertical.
 *       - Opção de definir o espaço entre as huds.
 *       - Opção de definir uma posição absoluta para a janela de comando.
 *       - Opção de definir posições especificas das huds.
 *       - Função de faces animadas por frames.
 *       - Opção da animação em gradiente do medidor.
 * (1.1) - Opção de poder definir a prioridade da face. 
 *               (0 - Abaixo do layout. 1 - Acima do layout.)
 *       - Opção de definir a quantidade de colunas da janela.
 *       - Correção da posição das condições através do setup.
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_BattleHud = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_BattleHud');
   
    // HUD POSITION
	Moghunter.bhud_pos_x = Number(Moghunter.parameters['Hud X-Axis'] || -90);
	Moghunter.bhud_pos_y = Number(Moghunter.parameters['Hud Y-Axis'] || 430);
	Moghunter.bhud_space_x = Number(Moghunter.parameters['Hud Space X'] || 0);
	Moghunter.bhud_space_y  = Number(Moghunter.parameters['Hud Space Y'] || 0);
	Moghunter.bhud_pos_mode = String(Moghunter.parameters['Vertical Mode'] || false);
	Moghunter.bhud_max_battle_members = Number(Moghunter.parameters['Max Battle Members'] || 4);
	
    // Layout Overlay
	Moghunter.bhud_layoverlay_visible = String(Moghunter.parameters['Layout2 Visible'] || "true");
	Moghunter.bhud_layoverlay_x = Number(Moghunter.parameters['Layout2 X-Axis'] || 0);
	Moghunter.bhud_layoverlay_y = Number(Moghunter.parameters['Layout2 Y-Axis'] || 0);
	
    // Screen Layout
	Moghunter.bhud_screen_layout = String(Moghunter.parameters['Screen Layout'] || true);
	Moghunter.bhud_screen_layout_x = Number(Moghunter.parameters['Screen X-Axis'] || 0);
	Moghunter.bhud_screen_layout_y = Number(Moghunter.parameters['Screen Y-Axis'] || 0);
		
	// TURN POSITION
	Moghunter.bhud_turn_visible = String(Moghunter.parameters['Turn Visible'] || true);
	Moghunter.bhud_turn_pos_x = Number(Moghunter.parameters['Turn X-Axis'] || 0);
	Moghunter.bhud_turn_pos_y = Number(Moghunter.parameters['Turn Y-Axis'] || 20);		
	
	// FACE POSITION
	Moghunter.bhud_face_visible = String(Moghunter.parameters['Face Visible'] || true);
	Moghunter.bhud_face_shake = String(Moghunter.parameters['Face Shake Animation'] || true);
	Moghunter.bhud_face_zoom = String(Moghunter.parameters['Face Zoom Animation'] || true);
	Moghunter.bhud_face_animated = String(Moghunter.parameters['Face Frame Animation'] || false);
	Moghunter.bhud_face_pos_x = Number(Moghunter.parameters['Face X-Axis'] || 56);
	Moghunter.bhud_face_pos_y = Number(Moghunter.parameters['Face Y-Axis'] || 120);
	Moghunter.bhud_face_priority = Number(Moghunter.parameters['Face Priority'] || 1);
    Moghunter.bhud_face_dead_opacity = Number(Moghunter.parameters['Face Dead Opacity'] || 0);
	
	// NAME POSITION
	Moghunter.bhud_name_visible = String(Moghunter.parameters['Name Visible'] || true);
	Moghunter.bhud_name_font_size = Number(Moghunter.parameters['Name Font Size'] || 20);
	Moghunter.bhud_name_font_bold_size = Number(Moghunter.parameters['Name Bold Size'] || 4);
	Moghunter.bhud_name_font_italic = String(Moghunter.parameters['Name Font Italic'] || false);	
	Moghunter.bhud_name_pos_x = Number(Moghunter.parameters['Name X-Axis'] || 50);
	Moghunter.bhud_name_pos_y = Number(Moghunter.parameters['Name Y-Axis'] || 150);	
		
	// HP METER POSITION
	Moghunter.bhud_hp_meter_visible = String(Moghunter.parameters['HP Meter Visible'] || true);
	Moghunter.bhud_hp_meter_pos_x = Number(Moghunter.parameters['HP Meter X-Axis'] || 106);
	Moghunter.bhud_hp_meter_pos_y = Number(Moghunter.parameters['HP Meter Y-Axis'] || 70);
	Moghunter.bhud_hp_meter_rotation = Number(Moghunter.parameters['HP Meter Angle'] || -0.47);
	Moghunter.bhud_hp_meter_flow = String(Moghunter.parameters['HP Meter Flow Anime'] || false);
	
	// HP NUMBER POSITION
	Moghunter.bhud_hp_number_visible  = String(Moghunter.parameters['HP Number Visible'] || true);
	Moghunter.bhud_hp_number_pos_x  = Number(Moghunter.parameters['HP Number X-Axis'] || 110);
	Moghunter.bhud_hp_number_pos_y  = Number(Moghunter.parameters['HP Number Y-Axis'] || 45);
	Moghunter.bhud_maxhp_number_visible  = String(Moghunter.parameters['MaxHP Number Visible'] || false);
	Moghunter.bhud_maxhp_number_pos_x  = Number(Moghunter.parameters['MaxHP Number X-Axis'] || 185);
	Moghunter.bhud_maxhp_number_pos_y  = Number(Moghunter.parameters['MaxHP Number Y-Axis'] || 40);	
    Moghunter.bhud_hp_align_type  = Number(Moghunter.parameters['HP Number Align type'] || 3);	
	
	// MP METER POSITION
	Moghunter.bhud_mp_meter_visible = String(Moghunter.parameters['MP Meter Visible'] || true);
	Moghunter.bhud_mp_meter_pos_x = Number(Moghunter.parameters['MP Meter X-Axis'] || 127);
	Moghunter.bhud_mp_meter_pos_y = Number(Moghunter.parameters['MP Meter Y-Axis'] || 121);	
	Moghunter.bhud_mp_meter_rotation = Number(Moghunter.parameters['MP Meter Angle'] || -0.47);
	Moghunter.bhud_mp_meter_flow = String(Moghunter.parameters['MP Meter Flow Anime'] || false);
	
	// MP NUMBER POSITION
	Moghunter.bhud_mp_number_visible  = String(Moghunter.parameters['MP Number Visible'] || true);
	Moghunter.bhud_mp_number_pos_x  = Number(Moghunter.parameters['MP Number X-Axis'] || 130);
	Moghunter.bhud_mp_number_pos_y  = Number(Moghunter.parameters['MP Number Y-Axis'] || 95);
	Moghunter.bhud_maxmp_number_visible  = String(Moghunter.parameters['MaxMP Number Visible'] || false);
	Moghunter.bhud_maxmp_number_pos_x  = Number(Moghunter.parameters['MaxMP Number X-Axis'] || 196);
	Moghunter.bhud_maxmp_number_pos_y  = Number(Moghunter.parameters['MaxMP Number Y-Axis'] || 78);	
    Moghunter.bhud_mp_align_type  = Number(Moghunter.parameters['MP Number Align type'] || 3);
	Moghunter.bhud_mp_diagonal_number  = Number(Moghunter.parameters['MP Number Diagonal'] || true);
	
	// TP METER POSITION
	Moghunter.bhud_tp_meter_visible = String(Moghunter.parameters['TP Meter Visible'] || true);
	Moghunter.bhud_tp_meter_pos_x = Number(Moghunter.parameters['TP Meter X-Axis'] || 13);
	Moghunter.bhud_tp_meter_pos_y = Number(Moghunter.parameters['TP Meter Y-Axis'] || 78);	
	Moghunter.bhud_tp_meter_rotation = Number(Moghunter.parameters['TP Meter Angle'] || -1.57);
	Moghunter.bhud_tp_meter_flow = String(Moghunter.parameters['TP Meter Flow Anime'] || false);
	
	// TP NUMBER POSITION
	Moghunter.bhud_tp_number_visible  = String(Moghunter.parameters['TP Number Visible'] || true);
	Moghunter.bhud_tp_number_pos_x  = Number(Moghunter.parameters['TP Number X-Axis'] || 20);
	Moghunter.bhud_tp_number_pos_y  = Number(Moghunter.parameters['TP Number Y-Axis'] || 60);
	Moghunter.bhud_maxtp_number_visible  = String(Moghunter.parameters['MaxTP Number Visible'] || false);
	Moghunter.bhud_maxtp_number_pos_x  = Number(Moghunter.parameters['MaxTP Number X-Axis'] || 185);
	Moghunter.bhud_maxtp_number_pos_y  = Number(Moghunter.parameters['MaxTP Number Y-Axis'] || 116);	
    Moghunter.bhud_tp_align_type  = Number(Moghunter.parameters['TP Number Align type'] || 2);
	Moghunter.bhud_tp_diagonal_number  = Number(Moghunter.parameters['TP Number Diagonal'] || false);
	
    // AT METER POSITION
	Moghunter.bhud_at_meter_visible = String(Moghunter.parameters['ATB Meter Visible'] || true);
	Moghunter.bhud_at_meter_pos_x = Number(Moghunter.parameters['ATB Meter X-Axis'] || 100);
	Moghunter.bhud_at_meter_pos_y = Number(Moghunter.parameters['ATB Meter Y-Axis'] || 155);	
	Moghunter.bhud_at_meter_rotation = Number(Moghunter.parameters['ATB Meter Angle'] || 0);
	Moghunter.bhud_at_meter_flow = String(Moghunter.parameters['ATB Meter Flow Anime'] || false);
	
	// STATES POSITION
	Moghunter.bhud_states_visible = String(Moghunter.parameters['States Visible'] || true);
	Moghunter.bhud_states_pos_x = Number(Moghunter.parameters['States X-Axis'] || 10);
	Moghunter.bhud_states_pos_y = Number(Moghunter.parameters['States Y-Axis'] || 150);	

    // COMMAND WINDOWS
	Moghunter.bhud_auto_pos = String(Moghunter.parameters['Command Auto Adjust'] || true);
    Moghunter.bhud_com_x = Number(Moghunter.parameters['W Command X-Axis'] || 0);
    Moghunter.bhud_com_y = Number(Moghunter.parameters['W Command Y-Axis'] || -15);
	Moghunter.bhud_com_layout = String(Moghunter.parameters['Layout Command'] || true);
    Moghunter.bhud_com_lay_x = Number(Moghunter.parameters['L Command X-Axis'] || -25);
    Moghunter.bhud_com_lay_y = Number(Moghunter.parameters['L Command Y-Axis'] || -35);
	Moghunter.bhud_com_width =  Number(Moghunter.parameters['W Command Width'] || 192);
    Moghunter.bhud_com_height =  Number(Moghunter.parameters['W Command Height'] || 180);		
	
	// PARTY WINDOWS
    Moghunter.bhud_party_x = Number(Moghunter.parameters['W Party X-Axis'] || 325);
    Moghunter.bhud_party_y = Number(Moghunter.parameters['W Party Y-Axis'] || 170);
	Moghunter.bhud_party_layout = String(Moghunter.parameters['Layout Party'] || true);
    Moghunter.bhud_party_lay_x = Number(Moghunter.parameters['L Party X-Axis'] || -325);
    Moghunter.bhud_party_lay_y = Number(Moghunter.parameters['L Party Y-Axis'] || -42);	
	Moghunter.bhud_party_width =  Number(Moghunter.parameters['W Party Width'] || 192);
    Moghunter.bhud_party_height =  Number(Moghunter.parameters['W Party Height'] || 110);	
		
	// HELP WINDOW
	Moghunter.bhud_help_x = Number(Moghunter.parameters['W Help X-Axis'] || 0);
    Moghunter.bhud_help_y = Number(Moghunter.parameters['W Help Y-Axis'] || 0);
	Moghunter.bhud_help_layout = String(Moghunter.parameters['Layout Help'] || true);
	Moghunter.bhud_help_lay_x = Number(Moghunter.parameters['L Help X-Axis'] || 0);
    Moghunter.bhud_help_lay_y = Number(Moghunter.parameters['L Help Y-Axis'] || 0);
	Moghunter.bhud_help_width = Number(Moghunter.parameters['W Help Width'] || 816);
    Moghunter.bhud_help_height = Number(Moghunter.parameters['W Help Height'] || 108);
		
	// SKILL WINDOW
	Moghunter.bhud_skill_x =  Number(Moghunter.parameters['W Skill X-Axis'] || 0);
    Moghunter.bhud_skill_y =  Number(Moghunter.parameters['W Skill Y-Axis'] || 444);
	Moghunter.bhud_skill_layout = String(Moghunter.parameters['Layout Skill'] || true);
	Moghunter.bhud_skill_lay_x =  Number(Moghunter.parameters['L Skill X-Axis'] || 0);
    Moghunter.bhud_skill_lay_y =  Number(Moghunter.parameters['L Skill Y-Axis'] || -67);
	Moghunter.bhud_skill_width =  Number(Moghunter.parameters['W Skill Width'] || 816);
    Moghunter.bhud_skill_height =  Number(Moghunter.parameters['W Skill Height'] || 180);
	Moghunter.bhud_skill_maxcols = Number(Moghunter.parameters['W Skill maxCols'] || 2);	
	
	// ITEM WINDOW
	Moghunter.bhud_item_x =  Number(Moghunter.parameters['W Item X-Axis'] || 0);
    Moghunter.bhud_item_y =  Number(Moghunter.parameters['W Item Y-Axis'] || 444);
	Moghunter.bhud_item_layout = String(Moghunter.parameters['Layout Item'] || true);
	Moghunter.bhud_item_lay_x =  Number(Moghunter.parameters['L Item X-Axis'] || 0);
    Moghunter.bhud_item_lay_y =  Number(Moghunter.parameters['L Item Y-Axis'] || -67);
	Moghunter.bhud_item_width =  Number(Moghunter.parameters['W Item Width'] || 816);
    Moghunter.bhud_item_height =  Number(Moghunter.parameters['W Item Height'] || 180);	
	Moghunter.bhud_item_maxcols = Number(Moghunter.parameters['W Item maxCols'] || 2);
	
    // ACTOR WINDOWS
    Moghunter.bhud_actor_x = Number(Moghunter.parameters['W Actor X-Axis'] || 0);
    Moghunter.bhud_actor_y = Number(Moghunter.parameters['W Actor Y-Axis'] || 444);
	Moghunter.bhud_actor_layout = String(Moghunter.parameters['Layout Actor'] || true);
    Moghunter.bhud_actor_lay_x = Number(Moghunter.parameters['L Actor X-Axis'] || 0);
    Moghunter.bhud_actor_lay_y = Number(Moghunter.parameters['L Actor Y-Axis'] || -67);
	Moghunter.bhud_actor_width =  Number(Moghunter.parameters['W Actor Width'] || 816);
    Moghunter.bhud_actor_height =  Number(Moghunter.parameters['W Actor Height'] || 180);	
	Moghunter.bhud_actor_maxcols = Number(Moghunter.parameters['W Actor maxCols'] || 1);
	
    // ENEMY WINDOWS
    Moghunter.bhud_enemy_x = Number(Moghunter.parameters['W Enemy X-Axis'] || 0);
    Moghunter.bhud_enemy_y = Number(Moghunter.parameters['W Enemy Y-Axis'] || 444);
	Moghunter.bhud_enemy_layout = String(Moghunter.parameters['Layout Enemy'] || true);
    Moghunter.bhud_enemy_lay_x = Number(Moghunter.parameters['L Enemy X-Axis'] || 0);
    Moghunter.bhud_enemy_lay_y = Number(Moghunter.parameters['L Enemy Y-Axis'] || -67);
	Moghunter.bhud_enemy_width =  Number(Moghunter.parameters['W Enemy Width'] || 816);
    Moghunter.bhud_enemy_height =  Number(Moghunter.parameters['W Enemy Height'] || 180);			
	Moghunter.bhud_enemy_maxcols = Number(Moghunter.parameters['W Enemy maxCols'] || 2);
	
	// Custom Position
	Moghunter.bhud_custom_pos = [];
	for (var i = 0; i < 8; i++) {
		Moghunter.bhud_custom_pos[i] = (Moghunter.parameters['Custom Position ' + String(i + 1)] || null);
	};

//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * BHud
//==============================
ImageManager.loadBHud = function(filename) {
    return this.loadBitmap('img/battlehud/', filename, 0, true);
};		
	
//=============================================================================
// ** Game_Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bhud_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_alias_mog_bhud_temp_initialize.call(this);
	this._bhud_position = [];	
	this._bhud_position_active = null;
	this._battleEnd = false;
	this._bhud_dp = false;
	this._refreshBhud = false;
};

//=============================================================================
// ** Game_System
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bhud_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_bhud_sys_initialize.call(this);
	this._bhud_position = [];
	for (var i = 0; i < 8; i++) {
	    this._bhud_position[i] = this.set_hudcp(Moghunter.bhud_custom_pos[i]);
    };
	this._bhud_auto_com = false;
	this._bhud_pos_mode = 0;
	if (String(Moghunter.bhud_pos_mode) === "true") {this._bhud_pos_mode = 1};
	if (String(Moghunter.bhud_auto_pos) === "true") {this._bhud_auto_com = true};
};

//==============================
// * set Hudcp
//==============================
Game_System.prototype.set_hudcp = function(value) {
	if (!value) {return null};
	var s = value.split(',');
	if (!s[0] || !s[1]) {return null};
	return  [Number(s[0]),Number(s[1])];
}

//=============================================================================
// ** Game Interpreter
//=============================================================================

//==============================
// * Command129
//==============================
var _alias_mog_bhud_command129 = Game_Interpreter.prototype.command129;
Game_Interpreter.prototype.command129 = function() {	
	_alias_mog_bhud_command129.call(this);	
	$gameTemp._refresh_Bhud = true;
	return true;
};

//==============================
// * Plugin Command (added by NEKOMA)
//==============================
var _alias_mog_bhud_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _alias_mog_bhud_pluginCommand.call(this,command,args);
    switch (command.toLowerCase()) {
        case 'bhud_set_align':
            $gameSystem._bhud_align = [(args[0] === 'left') ? 1 : 0,
                                       +args[1] || 0,
                                       +args[2] || 0];
            break;
        case 'bhud_hide_status':
            $gameSystem._bhud_hide = (args[0].toLowerCase() === 'true');
            break;
        case 'bhud_change_face':
            ($gameSystem._bhud_face = $gameSystem._bhud_face || [])[+args[0] || 0] = args[1];
            break;
    }
};

//=============================================================================
// ** Game Party
//=============================================================================

//==============================
// * max Battle Members
//==============================
Game_Party.prototype.maxBattleMembers = function() {
    return Math.max(Moghunter.bhud_max_battle_members,1);
};

//=============================================================================
// ** BattleManager
//=============================================================================

//==============================
// * processVictory
//==============================
var _alias_mog_bhud_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
	 $gameTemp._battleEnd = true;
	 _alias_mog_bhud_processVictory.call(this);	 
};

//==============================
// * processAbort
//==============================
var _alias_mog_bhud_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function() {
	 $gameTemp._battleEnd = true;
	 _alias_mog_bhud_processAbort.call(this);	 
};

//==============================
// * processDefeat
//==============================
var _alias_mog_bhud_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
	 $gameTemp._battleEnd = true;
	 _alias_mog_bhud_processDefeat.call(this);	 
};


//=============================================================================
// ** Game BattlerBase
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bhud_gbat_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
	_alias_mog_bhud_gbat_initMembers.call(this);
	this.need_refresh_bhud_states = false;
	this._bhud_face_data = [0,0,0,0];
	this._face_pos = [0,0];
};

//==============================
// * addNewState
//==============================
var _alias_mog_bhud_addNewState = Game_BattlerBase.prototype.addNewState
Game_BattlerBase.prototype.addNewState = function(stateId) {
    _alias_mog_bhud_addNewState.call(this,stateId);
	this.need_refresh_bhud_states = true;
};

//==============================
// * eraseState
//==============================
var _alias_mog_bhud_eraseState = Game_BattlerBase.prototype.eraseState
Game_BattlerBase.prototype.eraseState = function(stateId) {
	_alias_mog_bhud_eraseState.call(this,stateId);
	this.need_refresh_bhud_states = true;
};

//=============================================================================
// ** Game Action
//=============================================================================

//==============================
// * Apply
//==============================
var _alias_mog_bhud_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	 var oldhp = target.hp
	 _alias_mog_bhud_apply.call(this,target);
	 if (target.isActor()) {
		 if (oldhp > target.hp) {target._bhud_face_data = [30,20,3,30]}
		 else if (oldhp < target.hp) {target._bhud_face_data = [0,20,1,30]};
	 };
};

//==============================
// * Prepare
//==============================
var _alias_mog_bmhud_action_prepare = Game_Action.prototype.prepare
Game_Action.prototype.prepare = function() {	
	_alias_mog_bmhud_action_prepare.call(this);
	if (this.subject().isActor() && String(Moghunter.bhud_face_zoom) === "true"){this.subject()._bhud_face_data = [0,40,2,40];};
};

//=============================================================================
// ** Game Actor
//=============================================================================

//==============================
// * Gain HP
//==============================
var _alias_mog_bhud_gainHp =Game_Actor.prototype.gainHp;
Game_Actor.prototype.gainHp = function(value) {
    _alias_mog_bhud_gainHp.call(this,value);
	this._bhud_face_data[3] += 1;
};

//==============================
// * Recover All
//==============================
var _alias_mog_bhud_recoverAll = Game_Actor.prototype.recoverAll;
Game_Actor.prototype.recoverAll = function() {
	_alias_mog_bhud_recoverAll.call(this);
	this._bhud_face_data[3] += 1;
};

//=============================================================================
// ** Window_BattleStatus
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_mog_bhud_initialize = Window_BattleStatus.prototype.initialize
Window_BattleStatus.prototype.initialize = function() {
	_alias_mog_bhud_initialize.call(this);
    this.visible = false
};

//=============================================================================
// ** Window_BattleSkill
//=============================================================================

//==============================
// * windowWidth
//==============================
Window_BattleSkill.prototype.windowWidth = function() {
   return Moghunter.bhud_skill_width;
};

//==============================
// * maxCols
//==============================
Window_BattleSkill.prototype.maxCols = function() {
    return Moghunter.bhud_skill_maxcols;
};

//=============================================================================
// ** Window_BattleItem
//=============================================================================

//==============================
// * windowWidth
//==============================
Window_BattleItem.prototype.windowWidth = function() {
   return Moghunter.bhud_item_width;
};

//==============================
// * maxCols
//==============================
Window_BattleItem.prototype.maxCols = function() {
    return Moghunter.bhud_item_maxcols;
};

//=============================================================================
// ** Window_BattleActor
//=============================================================================

//==============================
// * Initialize
//==============================
Window_BattleActor.prototype.windowWidth = function() {
    return Moghunter.bhud_actor_width;
};

//==============================
// * maxCols
//==============================
Window_BattleActor.prototype.maxCols = function() {
    return Moghunter.bhud_actor_maxcols;
};

//=============================================================================
// ** Window_BattleEnemy
//=============================================================================

//==============================
// * windowWidth
//==============================
Window_BattleEnemy.prototype.windowWidth = function() {
   return Moghunter.bhud_enemy_width;
};

//==============================
// * maxCols
//==============================
Window_BattleEnemy.prototype.maxCols = function() {
    return Moghunter.bhud_enemy_maxcols;
};

//=============================================================================
// ** Window Actor Command
//=============================================================================

//==============================
// * initialize
//==============================
var _alias_mog_bhud_wActCom_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function() {
    _alias_mog_bhud_wActCom_initialize.call(this);
	this._com_mode = Number($gameSystem._bhud_pos_mode)
	this._force_hide_duration = 0;
};

//==============================
// * initialize
//==============================
var _alias_mog_bhud_wActCom_refresh = Window_ActorCommand.prototype.activate;
Window_ActorCommand.prototype.activate = function() {
    _alias_mog_bhud_wActCom_refresh.call(this);
    if (String(Moghunter.bhud_com_layout) === "true") {this._force_hide_duration = 1};
};

//==============================
// * Update
//==============================
var _alias_mog_bhud_wcom_update = Window_ActorCommand.prototype.update;
Window_ActorCommand.prototype.update = function() {
    _alias_mog_bhud_wcom_update.call(this);	
	if ($gameTemp._bhud_position_active) {
		this.visible = this.active;
		if ($gameSystem._bhud_auto_com) {
        	this.x = $gameTemp._bhud_position_active[0] + Moghunter.bhud_com_x;
			if (this._com_mode === 0) {
	        	this.y = $gameTemp._bhud_position_active[1] + Moghunter.bhud_com_y - this.height;}
		    else {this.y = $gameTemp._bhud_position_active[1] + Moghunter.bhud_com_y};	}
	    else {
        	this.x = Moghunter.bhud_com_x;
         	this.y = Moghunter.bhud_com_y;
		};
	};
	if (this._force_hide_duration > 0) {this._force_hide_duration -= 1;this.visible = false};
};

//=============================================================================
// ** Window Party Command
//=============================================================================

//==============================
// * Update
//==============================
var _alias_mog_bhud_wparty_update = Window_PartyCommand.prototype.update;
Window_PartyCommand.prototype.update = function() {
    _alias_mog_bhud_wparty_update.call(this);
   	this.x = Moghunter.bhud_party_x;
   	this.y = Moghunter.bhud_party_y;
};

//=============================================================================
// ** Sprite Actor
//=============================================================================

//==============================
// * Initialize
//==============================
var _alias_bhud_sprt_actor_initialize = Sprite_Actor.prototype.initialize
Sprite_Actor.prototype.initialize = function(battler) {
	_alias_bhud_sprt_actor_initialize.call(this,battler);
	this._sprite_face = false;
	if (String(Moghunter.bhud_face_visible) === "true") {this._sprite_face = true};
};

//==============================
// * Damage Offset X
//==============================
Sprite_Actor.prototype.damageOffsetX = function() {
	if (!$gameSystem.isSideView() && this._sprite_face) {return 0};
    return -32;
};

//==============================
// * update Position
//==============================
var _alias_mog_bhud_sprt_actor_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function() {
	if (!$gameSystem.isSideView() && this._sprite_face) {
		if (this._battler && $gameTemp._bhud_position[this._battler.index()]) {
   		   this.x = $gameTemp._bhud_position[this._battler.index()][0] + Moghunter.bhud_face_pos_x;
		   this.y = $gameTemp._bhud_position[this._battler.index()][1] + Moghunter.bhud_face_pos_y;
		   return;
		};
	};	
    _alias_mog_bhud_sprt_actor_updatePosition.call(this);
};

//==============================
// * Setup Animation
//==============================
var _alias_mog_bhud_sprt_actor_setupAnimation = Sprite_Battler.prototype.setupAnimation;
Sprite_Actor.prototype.setupAnimation = function() {
	if (!$gameSystem.isSideView() && this._sprite_face) {
    while (this._battler.isAnimationRequested()) {
        var data = this._battler.shiftAnimation();
        var animation = $dataAnimations[data.animationId];
        var mirror = data.mirror;
        var delay = animation.position === 3 ? 0 : data.delay;
        this.startAnimation(animation, mirror, delay);
        for (var i = 0; i < this._animationSprites.length; i++) {
            var sprite = this._animationSprites[i];
            sprite.visible = true;
        }
    }
	return;
	};
	_alias_mog_bhud_sprt_actor_setupAnimation.call(this);
};

//==============================
// * Setup Damage Popup
//==============================
var _alias_mog_bhud_sprt_actor_setupDamagePopup = Sprite_Battler.prototype.setupDamagePopup
Sprite_Actor.prototype.setupDamagePopup = function() {
	if (!$gameSystem.isSideView() && this._sprite_face) {
	    if (this._battler.isDamagePopupRequested()) {
            var sprite = new Sprite_Damage();
            sprite.x = this.x + this.damageOffsetX();
            sprite.y = this.y + this.damageOffsetY();
            sprite.setup(this._battler);
            this._damages.push(sprite);
            this.parent.addChild(sprite);
            this._battler.clearDamagePopup();
            this._battler.clearResult();
        };
	return;
	};
	_alias_mog_bhud_sprt_actor_setupDamagePopup.call(this);
};

//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// ** createWindowLayer
//==============================
var _alias_mog_bhud_createUpperLayer = Spriteset_Battle.prototype.createUpperLayer
Spriteset_Battle.prototype.createUpperLayer = function() {
	this.create_battle_hud() 	
	_alias_mog_bhud_createUpperLayer.call(this);
	if (!$gameSystem.isSideView()) {this.createActorsF()};
};

//==============================
// ** createActorsF
//==============================
Spriteset_Battle.prototype.createActorsF = function() {
	if (this._actorSprites) {
		for (var i = 0; i < this._actorSprites.length; i++) {
		    this._battleField.removeChild(this._actorSprites[i]);
		};
	};
    this._actorSprites = [];
    for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
        this._actorSprites[i] = new Sprite_Actor();
        this.addChild(this._actorSprites[i]);
    };
};

//==============================
// ** create Battle Hud
//==============================
Spriteset_Battle.prototype.create_battle_hud = function() {
	if (String(Moghunter.bhud_screen_layout) === "true") {this.create_screen_layout();};
	$gameTemp.refresh_Bhud = false;
	$gameTemp._battleEnd = false;
	this._com_mode = Number($gameSystem._bhud_pos_mode)
	this._battle_hud = [];
	for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
		this._battle_hud[i] = new Battle_Hud(i);
		this.addChild(this._battle_hud[i]);
	};	
};

//==============================
// * Create Screen Layout
//==============================
Spriteset_Battle.prototype.create_screen_layout = function() {	
	this._screen_layout = new Sprite(ImageManager.loadBHud("Layout_Screen"));
	this._screen_layout.opacity = 0;
	this._screen_layout.x = Moghunter.bhud_screen_layout_x;
	this._screen_layout.y = Moghunter.bhud_screen_layout_y;
    this.addChild(this._screen_layout);
};

//==============================
// * Update Hud visible
//==============================
Spriteset_Battle.prototype.update_hud_visible = function() {
	if (this.is_hud_visible()) {this._screen_layout.opacity += 10}	 
	else {this._screen_layout.opacity -= 10};
};

//==============================
// * Is Hud Visible
//==============================
Spriteset_Battle.prototype.is_hud_visible = function() {
	if ($gameMessage.isBusy()) {return false};
	if ($gameTemp._battleEnd) {return false};
	return true
};

//==============================
// ** Update
//==============================
var _alias_mog_bhud_scbat_update = Spriteset_Battle.prototype.update
Spriteset_Battle.prototype.update = function() {
	_alias_mog_bhud_scbat_update.call(this);
	if (this._screen_layout) {this.update_hud_visible()};
	if ($gameTemp._refresh_Bhud) {this.refresh_battle_hud()};
}

//==============================
// ** Refresh Battle Hud
//==============================
Spriteset_Battle.prototype.refresh_battle_hud = function() {
	if (!this._battle_hud) {return};
	$gameTemp._refresh_Bhud = false;
	for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
		this._battle_hud[i].refresh_bhud();
	};		
};

//==============================
// ** createWindowLayer
//==============================
var _alias_mog_bhud_createWindowLayer = Scene_Battle.prototype.createWindowLayer
Scene_Battle.prototype.createWindowLayer = function() {
	this.create_layout_window();	
	_alias_mog_bhud_createWindowLayer.call(this);
};

//==============================
// ** createAllWindows
//==============================
var _alias_mog_bhud_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_alias_mog_bhud_createAllWindows.call(this);
	
    this._actorCommandWindow.x = Moghunter.bhud_com_x;
	this._actorCommandWindow.y = Moghunter.bhud_com_y;
	this._actorCommandWindow_org = [Moghunter.bhud_com_x,Moghunter.bhud_com_y];
	this._actorCommandWindow.width = Moghunter.bhud_com_width;
	this._actorCommandWindow.height = Moghunter.bhud_com_height;		
	if (String(Moghunter.bhud_com_layout) === "true") {this._actorCommandWindow.opacity = 0};
	
	this._partyCommandWindow.x = Moghunter.bhud_party_x;
	this._partyCommandWindow.y = Moghunter.bhud_party_y;
	this._partyCommandWindow_org = [Moghunter.bhud_party_x,Moghunter.bhud_party_y];
	this._partyCommandWindow.width = Moghunter.bhud_party_width;
	this._partyCommandWindow.height = Moghunter.bhud_party_height;		
	if (String(Moghunter.bhud_party_layout) === "true") {this._partyCommandWindow.opacity = 0};
	
	this._helpWindow.x = Moghunter.bhud_help_x;
	this._helpWindow.y = Moghunter.bhud_help_y;
	this._helpWindow_org = [this._helpWindow.x,this._helpWindow.y];
	this._helpWindow.width = Moghunter.bhud_help_width;
	this._helpWindow.height = Moghunter.bhud_help_height;	
	if (String(Moghunter.bhud_help_layout) === "true") {this._helpWindow.opacity = 0};
	
	this._skillWindow.x = Moghunter.bhud_skill_x;
	this._skillWindow.y = Moghunter.bhud_skill_y;
	this._skillWindow_org = [Moghunter.bhud_skill_x,Moghunter.bhud_skill_y];
	this._skillWindow.width = Moghunter.bhud_skill_width;
	this._skillWindow.height = Moghunter.bhud_skill_height;
	if (String(Moghunter.bhud_skill_layout) === "true") {this._skillWindow.opacity = 0};
	
	this._itemWindow.x = Moghunter.bhud_item_x;
	this._itemWindow.y = Moghunter.bhud_item_y;
	this._itemWindow_org = [this._itemWindow.x,this._itemWindow.y]	;
	this._itemWindow.width = Moghunter.bhud_item_width;
	this._itemWindow.height = Moghunter.bhud_item_height;	
	if (String(Moghunter.bhud_item_layout) === "true") {this._itemWindow.opacity = 0};
	
	this._actorWindow.x = Moghunter.bhud_actor_x;
	this._actorWindow.y = Moghunter.bhud_actor_y;
	this._actorWindow_org = [this._actorWindow.x,this._actorWindow.y];
	this._actorWindow.width = Moghunter.bhud_actor_width;
	this._actorWindow.height = Moghunter.bhud_actor_height;	
	if (String(Moghunter.bhud_actor_layout) === "true") {this._actorWindow.opacity = 0};
	
	this._enemyWindow.x = Moghunter.bhud_enemy_x;
	this._enemyWindow.y = Moghunter.bhud_enemy_y;
	this._enemyWindow_org = [Moghunter.bhud_enemy_x,Moghunter.bhud_enemy_y];
	this._enemyWindow.width = Moghunter.bhud_enemy_width;
	this._enemyWindow.height = Moghunter.bhud_enemy_height;
	if (String(Moghunter.bhud_enemy_layout) === "true") {this._enemyWindow.opacity = 0};
};

//==============================
// ** create Layout Window 
//==============================
Scene_Battle.prototype.create_layout_window = function() {
	if (String(Moghunter.bhud_com_layout) === "true") {
		this._com_layout = new Sprite(ImageManager.loadBHud("Layout_Command"))
		this._com_layout.x = Moghunter.bhud_com_lay_x;
		this._com_layout.y = Moghunter.bhud_com_lay_y;
		this._com_layout.visible = false;
		this.addChild(this._com_layout);
	};
	if (String(Moghunter.bhud_party_layout) === "true") {
		this._party_layout = new Sprite(ImageManager.loadBHud("Layout_Party"))
		this._party_layout.x = Moghunter.bhud_party_lay_x;
		this._party_layout.y = Moghunter.bhud_party_lay_y;
		this._party_layout.visible = false;
		this.addChild(this._party_layout);
	};
	if (String(Moghunter.bhud_help_layout) === "true") {
		this._help_layout = new Sprite(ImageManager.loadBHud("Layout_Help"))
		this._help_layout.x = Moghunter.bhud_help_lay_x;
		this._help_layout.y = Moghunter.bhud_help_lay_y;
		this._help_layout.visible = false;
		this.addChild(this._help_layout);
	};	
	if (String(Moghunter.bhud_skill_layout) === "true") {

		this._skill_layout = new Sprite(ImageManager.loadBHud("Layout_Skill"))
		this._skill_layout.x = Moghunter.bhud_skill_lay_x;
		this._skill_layout.y = Moghunter.bhud_skill_lay_y;
		this._skill_layout.visible = false;
		this.addChild(this._skill_layout);
	};
	if (String(Moghunter.bhud_item_layout) === "true") {
		this._item_layout = new Sprite(ImageManager.loadBHud("Layout_Item"))
		this._item_layout.x = Moghunter.bhud_item_lay_x;
		this._item_layout.y = Moghunter.bhud_item_lay_y;
		this._item_layout.visible = false;
		this.addChild(this._item_layout);
	};		
	if (String(Moghunter.bhud_actor_layout) === "true") {
		this._actor_layout = new Sprite(ImageManager.loadBHud("Layout_Actor"))
		this._actor_layout.x = Moghunter.bhud_actor_lay_x;
		this._actor_layout.y = Moghunter.bhud_actor_lay_y;
		this._actor_layout.visible = false;
		this.addChild(this._actor_layout);
	};
	if (String(Moghunter.bhud_enemy_layout) === "true") {
		this._enemy_layout = new Sprite(ImageManager.loadBHud("Layout_Enemy"))
		this._enemy_layout.x = Moghunter.bhud_enemy_lay_x;
		this._enemy_layout.y = Moghunter.bhud_enemy_lay_y;
		this._enemy_layout.visible = false;
		this.addChild(this._enemy_layout);
	};	
};

//==============================
// ** update
//==============================
var _alias_mog_bhud_scnbattle_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
    _alias_mog_bhud_scnbattle_update.call(this);
	//this.updateWindowSlideEffect()
	this.updateLayoutWindow();
};

//==============================
// ** Set Actor Command Pos
//==============================
Scene_Battle.prototype.set_actor_command_pos = function() {
		if ($gameTemp._bhud_position_active) {
		if ($gameSystem._bhud_auto_com) {
        	this.nx = $gameTemp._bhud_position_active[0] + Moghunter.bhud_com_x;
			if (this._com_mode === 0) {
	        	this.ny = $gameTemp._bhud_position_active[1] + Moghunter.bhud_com_y - this._actorCommandWindow.height;}
		    else {this.ny = $gameTemp._bhud_position_active[1] + Moghunter.bhud_com_y};	}
	    else {
        	this.nx = Moghunter.bhud_com_x;
         	this.ny = Moghunter.bhud_com_y;
		};
		}
		else {
			this.nx = -this._actorCommandWindow.width//Graphics.width / 2;
			this.ny = Graphics.height / 2;
	}; 
	this._actorCommandWindow_org = [this.nx,this.ny]
	if (!this._actorCommandWindow.visible) {this._actorCommandWindow_org = [this.nx -100,this.ny]};
	if (!BattleManager.actor()) {this._actorCommandWindow_org = [this.nx = -this._actorCommandWindow.width,this.ny = Graphics.height / 2]}
};

//==============================
// ** updateWindowSlideEffect
//==============================
Scene_Battle.prototype.updateWindowSlideEffect = function() {
	 var slide_speed = 10;
	 this.set_actor_command_pos();
	 this._actorCommandWindow.x = this.sprite_move_to(this._actorCommandWindow.x,this._actorCommandWindow_org[0],slide_speed);
	 this._actorCommandWindow.y = this.sprite_move_to(this._actorCommandWindow.y,this._actorCommandWindow_org[1],slide_speed);
	 this._partyCommandWindow.x = this.sprite_move_to(this._partyCommandWindow.x,this._partyCommandWindow_org[0],slide_speed);
	 this._partyCommandWindow.y = this.sprite_move_to(this._partyCommandWindow.y,this._partyCommandWindow_org[1],slide_speed);
	 this._helpWindow.x = this.sprite_move_to(this._helpWindow.x,this._helpWindow_org[0],slide_speed);
	 this._helpWindow.y = this.sprite_move_to(this._helpWindow.y,this._helpWindow_org[1],slide_speed);
	 this._skillWindow.x = this.sprite_move_to(this._skillWindow.x,this._skillWindow_org[0],slide_speed);
	 this._skillWindow.y = this.sprite_move_to(this._skillWindow.y,this._skillWindow_org[1],slide_speed);
	 this._itemWindow.x = this.sprite_move_to(this._itemWindow.x,this._itemWindow_org[0],slide_speed);
	 this._itemWindow.y = this.sprite_move_to(this._itemWindow.y,this._itemWindow_org[1],slide_speed);
	 this._actorWindow.x = this.sprite_move_to(this._actorWindow.x,this._actorWindow_org[0],slide_speed);
	 this._actorWindow.y = this.sprite_move_to(this._actorWindow.y,this._actorWindow_org[1],slide_speed);
	 this._enemyWindow.x = this.sprite_move_to(this._enemyWindow.x,this._enemyWindow_org[0],slide_speed);
	 this._enemyWindow.y = this.sprite_move_to(this._enemyWindow.y,this._enemyWindow_org[1],slide_speed);
};	 
	 
//==============================
// ** updateLayoutWindows
//==============================
Scene_Battle.prototype.updateLayoutWindow = function() {
	if (this._com_layout) {
    	this._com_layout.x = Moghunter.bhud_com_lay_x + this._actorCommandWindow.x;
    	this._com_layout.y = Moghunter.bhud_com_lay_y + this._actorCommandWindow.y;
    	this._com_layout.visible = this._actorCommandWindow.active;
		if (!this._actorCommandWindow.visible) {this._com_layout.visible = false};
    };	
	if (this._party_layout) {
    	this._party_layout.x = Moghunter.bhud_party_lay_x + this._partyCommandWindow.x;
    	this._party_layout.y = Moghunter.bhud_party_lay_y + this._partyCommandWindow.y;
    	this._party_layout.visible = this._partyCommandWindow.active;
		if (!this._partyCommandWindow.visible) {this._party_layout.visible = false};
    };
	if (this._help_layout) {
    	this._help_layout.x = Moghunter.bhud_help_lay_x + this._helpWindow.x;
    	this._help_layout.y = Moghunter.bhud_help_lay_y + this._helpWindow.y;
    	this._help_layout.visible = this._helpWindow.visible;
    };	
	if (this._skill_layout) {
    	this._skill_layout.x = Moghunter.bhud_skill_lay_x + this._skillWindow.x;
    	this._skill_layout.y = Moghunter.bhud_skill_lay_y + this._skillWindow.y;
    	this._skill_layout.visible = this._skillWindow.active;
		if (!this._skillWindow.visible) {this._skill_layout.visible = false};
    };	
	if (this._item_layout) {
    	this._item_layout.x = Moghunter.bhud_item_lay_x + this._itemWindow.x;
    	this._item_layout.y = Moghunter.bhud_item_lay_y + this._itemWindow.y;
    	this._item_layout.visible = this._itemWindow.active;
		if (!this._itemWindow.visible) {this._item_layout.visible = false};
    };	
	if (this._actor_layout) {
    	this._actor_layout.x = Moghunter.bhud_actor_lay_x + this._actorWindow.x;
    	this._actor_layout.y = Moghunter.bhud_actor_lay_y + this._actorWindow.y;
    	this._actor_layout.visible = this._actorWindow.active;
		if (!this._actorWindow.visible) {this._actor_layout.visible = false};
    };	
	if (this._enemy_layout) {
    	this._enemy_layout.x = Moghunter.bhud_enemy_lay_x + this._enemyWindow.x;
    	this._enemy_layout.y = Moghunter.bhud_enemy_lay_y + this._enemyWindow.y;
    	this._enemy_layout.visible = this._enemyWindow.active;
		if (!this._enemyWindow.visible) {this._enemy_layout.visible = false};
    };		
};

//=============================================================================
// * Scene_Base
//=============================================================================

//==============================
// * Sprite Move To
//==============================
Scene_Base.prototype.sprite_move_to = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 5 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//=============================================================================
// * Battle_Hud
//=============================================================================
function Battle_Hud() {
    this.initialize.apply(this, arguments);
};

Battle_Hud.prototype = Object.create(Sprite.prototype);
Battle_Hud.prototype.constructor = Battle_Hud;

//==============================
// * Initialize
//==============================
Battle_Hud.prototype.initialize = function(hud_id) {
    Sprite.prototype.initialize.call(this);	
    this._data_initial_ref = [0,true];
	this._hud_id = hud_id;
	this._hud_size = [0,0];
    this.base_parameter_clear();
    this.load_img();
	this.opacity = 0;
	$gameTemp._bhud_position_active = null;
	$gameTemp._battleEnd = false;
    this._hud_align = ($gameSystem._bhud_align = $gameSystem._bhud_align || [0,0,0]);   // added by NEKOMA
    this._hud_hide = ($gameSystem._bhud_hide = !!$gameSystem._bhud_hide);   // added by NEKOMA
    this._hud_face = ($gameSystem._bhud_face = $gameSystem._bhud_face || [])[$gameParty._actors[hud_id]];   // added by NEKOMA
};

//==============================
// * Load Img
//==============================
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
};

//==============================
// * Base Parameter Clear
//==============================
Battle_Hud.prototype.base_parameter_clear = function() {
 	 this._hp_old = [-1,-1];
	 this._maxhp_old = [-1,-1];
	 this._hp_old_ani = [-1,-1];
	 this._hp_flow = [false,0,0,0];
     this._mp_old = [-1,-1];
	 this._maxmp_old = [-1,-1];
	 this._mp_old_ani = [-1,-1];
	 this._mp_flow = [false,0,0,0];
	 this._tp_old = [-1,-1];
	 this._maxtp_old = [-1,-1];
	 this._tp_old_ani = -1;
	 this._tp_flow = [false,0,0,0];
	 this._at_flow = [false,0,0,0];
	 this._hp_number_old = -1;
	 this._mp_number_old = -1;
	 this._hp_number_old = -1;
	 this._number_align = [];
	 this._number_align[0] = Moghunter.bhud_hp_align_type;
	 this._number_align[1] = Moghunter.bhud_mp_align_type;
	 this._number_align[2] = Moghunter.bhud_tp_align_type;
	 this._diagonal_number = [];
	 this._diagonal_number[0] = Moghunter.bhud_hp_diagonal_number;
	 this._diagonal_number[1] = Moghunter.bhud_mp_diagonal_number;
	 this._diagonal_number[2] = Moghunter.bhud_tp_diagonal_number;
	 this._hp_img_data = [0,0,0];
	 this._mp_img_data = [0,0,0];
	 this._tp_img_data = [0,0,0];
	 this._states_old = [];
	 this._states_data = [0,0,0];
	 this._active = false;
	 this._hud_size = [0,0];
};

//==============================
// * Need Refresh Bhud
//==============================
Battle_Hud.prototype.need_refreh_bhud = function() {
	if (this._data_initial_ref[1]) {return true};
	if (this._battler != $gameParty.battleMembers()[this._hud_id]) {return true};
    if (this._hud_align[0] != $gameSystem._bhud_align[0]) {return true};    // added by NEKOMA
    if (this._hud_hide != $gameSystem._bhud_hide) {return true};    // added by NEKOMA
    if (this._hud_face != $gameSystem._bhud_face[$gameParty._actors[this._hud_id]]) {return true};  // added by NEKOMA
	return false;
};

//==============================
// * Refresh Bhud
//==============================
Battle_Hud.prototype.refresh_bhud = function() {
	 this._data_initial_ref[1] = false;
	 this._battler = $gameParty.battleMembers()[this._hud_id];
	 this.opacity = 0;
	 this._hud_size = [0,0];
	 this.base_parameter_clear();
	 this.create_base_sprites();
};

//==============================
// * Refresh Position
//==============================
Battle_Hud.prototype.refresh_position = function() {
	 this.set_hud_position();	      
	 this.create_sprites();
 	 this._layout.x = this._pos_x;
	 this._layout.y = this._pos_y;
	 if (this._face) {
     	 this._face.x = this._pos_x + Moghunter.bhud_face_pos_x;
 	     this._face.y = this._pos_y + Moghunter.bhud_face_pos_y;
     };
	 if (this._turn) {
        this._turn.x = this._pos_x + Moghunter.bhud_turn_pos_x;
	    this._turn.y = this._pos_y + Moghunter.bhud_turn_pos_y;
	 };
	 if (this._layout2) { 
	  	 this._layout2.x = this._pos_x + Moghunter.bhud_layoverlay_x;
	     this._layout2.y = this._pos_y + Moghunter.bhud_layoverlay_y;
     };
	 this._battler._face_pos = [this._face.x,this._face.y]; 
};

//==============================
// * Set Hud Position
//==============================
Battle_Hud.prototype.set_hud_position = function() {
   	 this._hud_size = [this._layout.bitmap.width,this._layout.bitmap.height];
	 this._members_max = $gameParty.battleMembers().length;
     this._hud_align = $gameSystem._bhud_align; // added by NEKOMA
     this._hud_hide = $gameSystem._bhud_hide;   // added by NEKOMA
	 var ps = [Number(Moghunter.bhud_space_x) * this._hud_id,
                Number(Moghunter.bhud_space_y) * this._hud_id];
	 if ($gameSystem._bhud_position[this._hud_id]) {
	     this._pos_x = $gameSystem._bhud_position[this._hud_id][0];
		 this._pos_y = $gameSystem._bhud_position[this._hud_id][1];
	 }
	 else {
		if (Number($gameSystem._bhud_pos_mode) === 0) {
			var spc = ((Graphics.boxWidth - 14) / this._members_max);
            if (this._hud_align[0]) {spc = this._hud_align[2] || this._hud_size[0]};    // added by NEKOMA
			var px = (spc / 2) + (spc * this._hud_id);
			this._pos_x = Moghunter.bhud_pos_x + px + ps[0];
			this._pos_y = Moghunter.bhud_pos_y + ps[1];
            if (this._hud_align[0]) {this._pos_x += this._hud_align[1]};    // added by NEKOMA
            if (this._hud_hide) {this._pos_y = Graphics.boxHeight + this._hud_size[1]}; // added by NEKOMA
		}
		else {
			var py = (this._hud_size[1] + 5) * this._hud_id;
			this._pos_x = Moghunter.bhud_pos_x + ps[0];
			this._pos_y = Moghunter.bhud_pos_y + py + ps[1];
		};
     };
	 $gameTemp._bhud_position[this._hud_id] = [this._pos_x,this._pos_y];     
};

//==============================
// * Update
//==============================
Battle_Hud.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	if (this._data_initial_ref[0] < 2) {this._data_initial_ref[0] += 1; return};
	if (this.need_refreh_bhud()) {this.refresh_bhud()};
    if (!this._battler) {return};
	if (!this._layout.bitmap.isReady()) {return};
	if (this._hud_size[0] === 0) {this.refresh_position();return};
	this.update_sprites();
};

//==============================
// * Create Base Sprites
//==============================
Battle_Hud.prototype.create_base_sprites = function() {
	this.create_turn();
	if (Number(Moghunter.bhud_face_priority) === 0) {
   	    this.create_face();
	    this.create_layout();}
	else {
		this.create_layout();
   	    this.create_face();	    		
    };
	if (String(Moghunter.bhud_layoverlay_visible) == "true") {this.create_layoutOverlay()};
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
    this.update_states();
};

//==============================
// * Update Active
//==============================
Battle_Hud.prototype.update_active = function() {	
   this._active = false
   if (this._battler == BattleManager.actor()) {this._active = true;
   $gameTemp._bhud_position_active = $gameTemp._bhud_position[this._hud_id]};
};

//==============================
// * Update visible
//==============================
Battle_Hud.prototype.update_visible = function(sprite) {
	if (this.is_hud_visible()) {this.opacity += 10}	 
	else {this.opacity -= 10};
};

//==============================
// * Is Hud Visible
//==============================
Battle_Hud.prototype.is_hud_visible = function(sprite) {
	if ($gameMessage.isBusy()) {return false};
	if ($gameTemp._battleEnd) {return false};
	return true
};

//==============================
// * Update Dif
//==============================
Battle_Hud.prototype.update_dif = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 1 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * Refresh Meter
//==============================
Battle_Hud.prototype.refresh_meter = function(sprite,value,value_max,type) {
	var ch = sprite.bitmap.height / 2;
    var meter_rate = sprite.bitmap.width * value / value_max;
	sprite.setFrame(0,type * ch, meter_rate, ch);
};

//==============================
// * Refresh Flow
//==============================
Battle_Hud.prototype.refresh_meter_flow = function(sprite,value,value_max,type,flow) {
	var cw = sprite.bitmap.width / 3;
	var ch = sprite.bitmap.height / 2;
    var meter_rate = cw * value / value_max;
	sprite.setFrame(flow,type * ch, meter_rate, ch);
};

//==============================
// * Refresh Number
//==============================
Battle_Hud.prototype.refresh_number = function(sprites,value,img_data,x,y,type) {
    numbers = Math.abs(value).toString().split("");  
   	for (var i = 0; i < sprites.length ; i++) {sprites[i].visible = false;
	   if (i > numbers.length) {return};
	   var n = Number(numbers[i]);
	   sprites[i].setFrame(n * img_data[2], 0, img_data[2], img_data[1]);
	   sprites[i].visible = true;	
	   if (this._number_align[type] === 0) {
            var nx = -(img_data[2] * i) + (img_data[2] * numbers.length);
	   } else if (this._number_align[type] === 1) {
	        var nx = -(img_data[2] * i) + ((img_data[2] / 2) * numbers.length);
	   } else if (this._number_align[type] === 2) {
	        var nx = -(img_data[2] * i);
	   } else {
		  var nx = -(img_data[2] * i);
	      var ny = (img_data[3] * i);
	      sprites[i].y = y - ny;			
	   };
	   sprites[i].x = x - nx;
    };
};

//==============================
// * Need Refresh Parameter
//==============================
Battle_Hud.prototype.need_refresh_parameter = function(parameter) {
  switch (parameter) {
  	case 0:
         if (this._hp_old[0] != this._battler.hp) {return true};
		 if (this._hp_old[1] != this._battler.mhp) {return true};
         break;
  	case 1:
         if (this._mp_old[0] != this._battler.mp) {return true};
		 if (this._mp_old[1] != this._battler.mmp) {return true};
         break;			
  	case 2:
         if (this._tp_old != this._battler.tp) {return true};
         break;					
  };
  return false;
};

//==============================
// * Create Layout
//==============================
Battle_Hud.prototype.create_layout = function() {
	this.removeChild(this._layout);
	if (!this._battler) {return};
	this._layout = new Sprite(this._layout_img);
	this.addChild(this._layout);
};

//==============================
// * Create Layout Overlay
//==============================
Battle_Hud.prototype.create_layoutOverlay = function() {
	this.removeChild(this._layout2);
	if (!this._battler) {return};
	this._layout2 = new Sprite(this._layout2_img);
	this.addChild(this._layout2);
};

//==============================
// * Create Turn
//==============================
Battle_Hud.prototype.create_turn = function() {
	if (String(Moghunter.bhud_turn_visible) != "true") {return};
	this.removeChild(this._turn);	
	if (!this._battler) {return};
	this._turn = new Sprite(this._turn_img);
	this._turn_blink = [0,0]
	this.addChild(this._turn);
};
	
//==============================
// * Update Turn
//==============================
Battle_Hud.prototype.update_turn = function() {
	if (!this._turn) {return};
    if (!this._active) {this._turn.visible = false;return;};
	this._turn.visible = true;
	this._turn_blink[0] += 1
	if (this._turn_blink[0] < 60) {this._turn_blink[1] += 2}
	else if (this._turn_blink[0] < 120) {this._turn_blink[1] -= 2}
	else {this._turn_blink = [0,0]};
	this._turn.opacity = 135 + this._turn_blink[1]
};	
	
//==============================
// * Create Face
//==============================
Battle_Hud.prototype.create_face = function() {
    this._hud_face = $gameSystem._bhud_face[$gameParty._actors[this._hud_id]];  // added by NEKOMA
	if (String(Moghunter.bhud_face_visible) != "true") {return};
	this.removeChild(this._face);
	if (!this._battler) {return};	
	this._face = new Sprite(ImageManager.loadBHud("Face_" + this._battler._actorId));
    if (this._hud_face) {this._face = new Sprite(ImageManager.loadBHud(this._hud_face))};   // added by NEKOMA
	this._face.anchor.x = 0.5;
	this._face.anchor.y = 0.5;
	this._face_data = [0,0,false,false,false,-1];
	if (String(Moghunter.bhud_face_shake) === "true") {this._face_data[2] = true}
	if (String(Moghunter.bhud_face_animated) === "true") {this._face_data[4] = true}
	this._battler._bhud_face_data = [0,0,0,0]
	this.addChild(this._face);
};

//==============================
// * Update Face
//==============================
Battle_Hud.prototype.update_face = function() {
	if (!this._face) {return};
	if (!this._face.bitmap.isReady()) {return};
	if (this._face_data[4] && this._face_data[5] != this._battler._bhud_face_data[2]) {this.refresh_face();};
    this._face.opacity = $gameActors.actor(this._battler._actorId).isDead() ? Moghunter.bhud_face_dead_opacity : 255;
    this.update_face_animation();
    this.update_face_shake();
    this.update_face_zoom();
};

//==============================
// * Refresh Face
//==============================
Battle_Hud.prototype.refresh_face = function() {
	this._face_data[5] = this._battler._bhud_face_data[2];
	var cw = this._face.bitmap.width / 5;
	var ch = this._face.bitmap.height;
	this._face.setFrame(cw * this._face_data[5], 0, cw, ch);
};

//==============================
// * Update Face Animation
//==============================
Battle_Hud.prototype.update_face_animation = function() {
	if (this._battler._bhud_face_data[3] > 0) {this._battler._bhud_face_data[3] -= 1;
	    if (this._battler._bhud_face_data[3] === 0) {
			if (this._battler.isDead()) {this._battler._bhud_face_data[2] = 4}
			else if (this._battler.hp <= 30 * this._battler.mhp / 100) {this._battler._bhud_face_data[2] = 3}
			else {this._battler._bhud_face_data[2] = 0};
			};
	};
};

//==============================
// * Update Face Zoom
//==============================
Battle_Hud.prototype.update_face_zoom = function() {
	if (this._battler._bhud_face_data[1] > 0) {this._battler._bhud_face_data[1] -= 1;
	    if (this._battler._bhud_face_data[1] == 0) {this._face.scale.x = 1.00}
		else if (this._battler._bhud_face_data[1] < 20) {this._face.scale.x -= 0.01;
		         if (this._face.scale.x < 1.00) {this._face.scale.x = 1.00;};	
	    }
		else if (this._battler._bhud_face_data[1] < 40){this._face.scale.x += 0.01;
		         if (this._face.scale.x > 1.25) {this._face.scale.x = 1.25;};
	    };
	    this._face.scale.y = this._face.scale.x;
	};
};

//==============================
// * Update Face Shake
//==============================
Battle_Hud.prototype.update_face_shake = function() {
	this._face.x = this._pos_x + Moghunter.bhud_face_pos_x;
	if (this._face_data[2] && this._battler._bhud_face_data[0] > 0) {this._battler._bhud_face_data[0] -= 1;
	    this._face.x = this._pos_x + Moghunter.bhud_face_pos_x + ((Math.random() * 12) - 6);
	};
};

//==============================
// * Create Name
//==============================
Battle_Hud.prototype.create_name = function() {
	if (String(Moghunter.bhud_name_visible) != "true") {return};
	this.removeChild(this._name);
	if (!this._battler) {return};	
	this._name = new Sprite(new Bitmap(300,48));
	this._name.x = this._pos_x + Moghunter.bhud_name_pos_x;
	this._name.y = this._pos_y + Moghunter.bhud_name_pos_y;
	this._name.bitmap.fontSize = Number(Moghunter.bhud_name_font_size);
	if (String(Moghunter.bhud_name_font_italic) === "true") {this._name.bitmap.fontItalic = true};
    this._name.bitmap.outlineWidth = Number(Moghunter.bhud_name_font_bold_size);
	this.addChild(this._name);	
	this.refresh_name();
};

//==============================
// * Refresh Name
//==============================
Battle_Hud.prototype.refresh_name = function() {
	this._name.bitmap.clear();
	this._name.bitmap.drawText(this._battler._name, 0, 0, this._name.bitmap.width, this._name.bitmap.height,0);	
};

//==============================
// * Create HP Meter
//==============================
Battle_Hud.prototype.create_hp_meter = function() {
	if (String(Moghunter.bhud_hp_meter_visible) != "true") {return};
	this.removeChild(this._hp_meter_blue);
	this.removeChild(this._hp_meter_red);
	if (!this._battler) {return};
	this._hp_meter_red = new Sprite(this._hp_meter_img);
	this._hp_meter_red.x = this._pos_x + Moghunter.bhud_hp_meter_pos_x;
	this._hp_meter_red.y = this._pos_y + Moghunter.bhud_hp_meter_pos_y;
	this._hp_meter_red.rotation = Moghunter.bhud_hp_meter_rotation;
	this.addChild(this._hp_meter_red);		
	this._hp_meter_blue = new Sprite(this._hp_meter_img);
	this._hp_meter_blue.x = this._hp_meter_red.x;
	this._hp_meter_blue.y = this._hp_meter_red.y;
	this._hp_meter_blue.rotation = this._hp_meter_red.rotation;
	this.addChild(this._hp_meter_blue);
	if (String(Moghunter.bhud_hp_meter_flow) === "true") {this._hp_flow[0] = true;
	    this._hp_flow[2] = this._hp_meter_img.width / 3;
		this._hp_flow[3] = this._hp_flow[2] * 2;
		this._hp_flow[1] = Math.floor(Math.random() * this._hp_flow[2]);
	};
};

//==============================
// * Create HP Number
//==============================
Battle_Hud.prototype.create_hp_number = function() {
	if (String(Moghunter.bhud_hp_number_visible) != "true") {return};
	if (this._hp_number) {for (var i = 0; i < this._hp_number.length; i++) {this.removeChild(this._hp_number[i]);}};
	if (!this._battler) {return};
	this._hp_number = [];
	this._hp_img_data = [this._hp_number_img.width,this._hp_number_img.height,
	                      this._hp_number_img.width / 10, this._hp_number_img.height / 2,
						  this._pos_x + Moghunter.bhud_hp_number_pos_x,
						  this._pos_y + Moghunter.bhud_hp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._hp_number[i] = new Sprite(this._hp_number_img);
	   this._hp_number[i].visible = false;
	   this._hp_number[i].x = this._hp_img_data[4];
	   this._hp_number[i].y = this._hp_img_data[5];
	   this.addChild(this._hp_number[i]);
	};	
	this._hp_number_old = this._battler.hp;
	this.refresh_number(this._hp_number,this._hp_number_old,this._hp_img_data,this._hp_img_data[4],this._hp_img_data[5],0);	
};

//==============================
// * Create maxHP Number
//==============================
Battle_Hud.prototype.create_maxhp_number = function() {
	if (String(Moghunter.bhud_maxhp_number_visible) != "true") {return};
	if (this._maxhp_number) {for (var i = 0; i < this._maxhp_number.length; i++) {this.removeChild(this._maxhp_number[i]);}};
	if (!this._battler) {return};	
	this._maxhp_number = [];
	this._maxhp_img_data = [this._maxhp_number_img.width,this._maxhp_number_img.height,
	                      this._maxhp_number_img.width / 10, this._maxhp_number_img.height / 2,
						  this._pos_x + Moghunter.bhud_maxhp_number_pos_x,
						  this._pos_y + Moghunter.bhud_maxhp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._maxhp_number[i] = new Sprite(this._maxhp_number_img);
	   this._maxhp_number[i].visible = false;
	   this._maxhp_number[i].x = this._maxhp_img_data[4];
	   this._maxhp_number[i].y = this._maxhp_img_data[5];
	   this.addChild(this._maxhp_number[i]);
	};		
	this._maxhp_number_old = this._battler.mhp;
	this.refresh_number(this._maxhp_number,this._maxhp_number_old,this._maxhp_img_data,this._maxhp_img_data[4],this._maxhp_img_data[5],0);	
};

//==============================
// * Update HP
//==============================
Battle_Hud.prototype.update_hp = function() {
	if (this._hp_meter_blue) {
		if(this._hp_flow[0]) {
		   this.refresh_meter_flow(this._hp_meter_blue,this._battler.hp,this._battler.mhp,0,this._hp_flow[1]);
	   	   var dif_meter = this.update_dif(this._hp_old_ani[0],this._battler.hp,160)
		   if (this._hp_old_ani[0] != dif_meter) {this._hp_old_ani[0] = dif_meter;
	       this.refresh_meter_flow(this._hp_meter_red,this._hp_old_ani[0],this._battler.mhp,1,this._hp_flow[1]);
		   };
		   this._hp_flow[1] += 1.5;
		   if (this._hp_flow[1] > this._hp_flow[3]) {this._hp_flow[1] = 0};		   
   	    }
		else {
		   if (this.need_refresh_parameter(0)) {
				this.refresh_meter(this._hp_meter_blue,this._battler.hp,this._battler.mhp,0);
				this._hp_old = [this._battler.hp,this._battler.mhp];
			};
			var dif_meter = this.update_dif(this._hp_old_ani[0],this._battler.hp,160)
			if (this._hp_old_ani[0] != dif_meter) {this._hp_old_ani[0] = dif_meter;
			this.refresh_meter(this._hp_meter_red,this._hp_old_ani[0],this._battler.mhp,1);};		
	    };
    };
	if (this._hp_number) {
		var dif_number = this.update_dif(this._hp_number_old,this._battler.hp,30)
		if (this._hp_number_old != dif_number) {this._hp_number_old = dif_number;
		this.refresh_number(this._hp_number,this._hp_number_old,this._hp_img_data,this._hp_img_data[4],this._hp_img_data[5],0);};
	};
    if (this._maxhp_number) {
		if (this._maxhp_number_old != this._battler.mhp) {this._maxhp_number_old = this._battler.mhp;
		this.refresh_number(this._maxhp_number,this._maxhp_number_old,this._maxhp_img_data,this._maxhp_img_data[4],this._maxhp_img_data[5],0);};
	};
};

//==============================
// * Create MP Meter
//==============================
Battle_Hud.prototype.create_mp_meter = function() {
	if (String(Moghunter.bhud_mp_meter_visible) != "true") {return};
	this.removeChild(this._mp_meter_blue);
	this.removeChild(this._mp_meter_red);
	if (!this._battler) {return};
	this._mp_meter_red = new Sprite(this._mp_meter_img);
	this._mp_meter_red.x = this._pos_x + Moghunter.bhud_mp_meter_pos_x;
	this._mp_meter_red.y = this._pos_y + Moghunter.bhud_mp_meter_pos_y;
	this._mp_meter_red.rotation = Moghunter.bhud_mp_meter_rotation;
	this.addChild(this._mp_meter_red);		
	this._mp_meter_blue = new Sprite(this._mp_meter_img);
	this._mp_meter_blue.x = this._mp_meter_red.x;
	this._mp_meter_blue.y = this._mp_meter_red.y;
	this._mp_meter_blue.rotation = this._mp_meter_red.rotation;
	this.addChild(this._mp_meter_blue);
	if (String(Moghunter.bhud_mp_meter_flow) === "true") {this._mp_flow[0] = true;
	    this._mp_flow[2] = this._mp_meter_img.width / 3;
		this._mp_flow[3] = this._mp_flow[2] * 2;
		this._mp_flow[1] = Math.floor(Math.random() * this._mp_flow[2]);
	};
};

//==============================
// * Create MP Number
//==============================
Battle_Hud.prototype.create_mp_number = function() {
	if (String(Moghunter.bhud_mp_number_visible) != "true") {return};
	if (this._mp_number) {for (var i = 0; i < this._mp_number.length; i++) {this.removeChild(this._mp_number[i]);}};
	if (!this._battler) {return};
	this._mp_number = [];
	this._mp_img_data = [this._mp_number_img.width,this._mp_number_img.height,
	                      this._mp_number_img.width / 10, this._mp_number_img.height / 2,
						  this._pos_x + Moghunter.bhud_mp_number_pos_x,
						  this._pos_y + Moghunter.bhud_mp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._mp_number[i] = new Sprite(this._mp_number_img);
	   this._mp_number[i].visible = false;
	   this._mp_number[i].x = this._mp_img_data[4];
	   this._mp_number[i].y = this._mp_img_data[5] ;
	   this.addChild(this._mp_number[i]);
	};	
	this._mp_number_old = this._battler.mp;
	this.refresh_number(this._mp_number,this._mp_number_old,this._mp_img_data,this._mp_img_data[4],this._mp_img_data[5],1);	
};

//==============================
// * Create MaxMP Number
//==============================
Battle_Hud.prototype.create_maxmp_number = function() {
	if (String(Moghunter.bhud_maxmp_number_visible) != "true") {return};
	if (this._maxmp_number) {for (var i = 0; i < this._maxmp_number.length; i++) {this.removeChild(this._maxmp_number[i]);}};
	if (!this._battler) {return};
	this._maxmp_number = [];
	this._maxmp_img_data = [this._maxmp_number_img.width,this._maxmp_number_img.height,
	                      this._maxmp_number_img.width / 10, this._maxmp_number_img.height / 2,
						  this._pos_x + Moghunter.bhud_maxmp_number_pos_x,
						  this._pos_y + Moghunter.bhud_maxmp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._maxmp_number[i] = new Sprite(this._maxmp_number_img);
	   this._maxmp_number[i].visible = false;
	   this._maxmp_number[i].x = this._maxmp_img_data[4];
	   this._maxmp_number[i].y = this._maxmp_img_data[5] ;
	   this.addChild(this._maxmp_number[i]);
	};	
	this._maxmp_number_old = this._battler.mmp;
	this.refresh_number(this._maxmp_number,this._maxmp_number_old,this._maxmp_img_data,this._maxmp_img_data[4],this._maxmp_img_data[5],1);	
};

//==============================
// * Update MP
//==============================
Battle_Hud.prototype.update_mp = function() {
	if (this._mp_meter_blue) {
		if(this._mp_flow[0]) {
		   this.refresh_meter_flow(this._mp_meter_blue,this._battler.mp,this._battler.mmp,0,this._mp_flow[1]);
	   	   var dif_meter = this.update_dif(this._mp_old_ani[0],this._battler.mp,160)
		   if (this._mp_old_ani[0] != dif_meter) {this._mp_old_ani[0] = dif_meter;
	       this.refresh_meter_flow(this._mp_meter_red,this._mp_old_ani[0],this._battler.mmp,1,this._mp_flow[1]);
		   };
		   this._mp_flow[1] += 1.5;
		   if (this._mp_flow[1] > this._mp_flow[3]) {this._mp_flow[1] = 0};		   
   	    }
		else {		
			if (this.need_refresh_parameter(1)) {
				this.refresh_meter(this._mp_meter_blue,this._battler.mp,this._battler.mmp,0);
				this._mp_old = [this._battler.mp,this._battler.mmp];
			};
			var dif_meter = this.update_dif(this._mp_old_ani[0],this._battler.mp,160)
			if (this._mp_old_ani[0] != dif_meter) {this._mp_old_ani[0] = dif_meter;
			this.refresh_meter(this._mp_meter_red,this._mp_old_ani[0],this._battler.mmp,1);};
		};
    };
	if (this._mp_number) {
		var dif_number = this.update_dif(this._mp_number_old,this._battler.mp,30)
		if (this._mp_number_old != dif_number) {this._mp_number_old = dif_number;
		this.refresh_number(this._mp_number,this._mp_number_old,this._mp_img_data,this._mp_img_data[4],this._mp_img_data[5],1);};
	};
	if (this._maxmp_number) {
		if (this._maxmp_number_old != this._battler.mmp) {this._maxmp_number_old = this._battler.mmp;
		this.refresh_number(this._maxmp_number,this._maxmp_number_old,this._maxmp_img_data,this._maxmp_img_data[4],this._maxmp_img_data[5],1);};
	};	
	
};

//==============================
// * Create TP Meter
//==============================
Battle_Hud.prototype.create_tp_meter = function() {
	if (String(Moghunter.bhud_tp_meter_visible) != "true") {return};
	this.removeChild(this._tp_meter_blue);
	this.removeChild(this._tp_meter_red);
	if (!this._battler) {return};
	this._tp_meter_red = new Sprite(this._tp_meter_img);
	this._tp_meter_red.x = this._pos_x + Moghunter.bhud_tp_meter_pos_x;
	this._tp_meter_red.y = this._pos_y + Moghunter.bhud_tp_meter_pos_y;
	this._tp_meter_red.rotation = Moghunter.bhud_tp_meter_rotation;
	this.addChild(this._tp_meter_red);		
	this._tp_meter_blue = new Sprite(this._tp_meter_img);
	this._tp_meter_blue.x = this._tp_meter_red.x;
	this._tp_meter_blue.y = this._tp_meter_red.y;
	this._tp_meter_blue.rotation = this._tp_meter_red.rotation;
	this.addChild(this._tp_meter_blue);
	if (String(Moghunter.bhud_tp_meter_flow) === "true") {this._tp_flow[0] = true;
	    this._tp_flow[2] = this._tp_meter_img.width / 3;
		this._tp_flow[3] = this._tp_flow[2] * 2;
		this._tp_flow[1] = Math.floor(Math.random() * this._tp_flow[2]);
	};
};

//==============================
// * Create TP Number
//==============================
Battle_Hud.prototype.create_tp_number = function() {
	if (String(Moghunter.bhud_tp_number_visible) != "true") {return};
	if (this._tp_number) {for (var i = 0; i < this._tp_number.length; i++) {this.removeChild(this._tp_number[i]);}};
	if (!this._battler) {return};
	this._tp_number = [];
	this._tp_img_data = [this._tp_number_img.width,this._tp_number_img.height,
	                      this._tp_number_img.width / 10, this._tp_number_img.height / 2,
						  this._pos_x + Moghunter.bhud_tp_number_pos_x,
						  this._pos_y + Moghunter.bhud_tp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._tp_number[i] = new Sprite(this._tp_number_img);
	   this._tp_number[i].visible = false;
	   this._tp_number[i].x = this._tp_img_data[4];
	   this._tp_number[i].y = this._tp_img_data[5] ;
	   this.addChild(this._tp_number[i]);
	};	
	this._tp_number_old = this._battler.tp;
	this.refresh_number(this._tp_number,this._tp_number_old,this._tp_img_data,this._tp_img_data[4],this._tp_img_data[5],2);	
};

//==============================
// * Create MaxTP Number
//==============================
Battle_Hud.prototype.create_maxtp_number = function() {
	if (String(Moghunter.bhud_maxtp_number_visible) != "true") {return};
	if (this._maxtp_number) {for (var i = 0; i < this._maxtp_number.length; i++) {this.removeChild(this._maxtp_number[i]);}};
	if (!this._battler) {return};
	this._maxtp_number = [];
	this._maxtp_img_data = [this._maxtp_number_img.width,this._maxtp_number_img.height,
	                      this._maxtp_number_img.width / 10, this._maxtp_number_img.height / 2,
						  this._pos_x + Moghunter.bhud_maxtp_number_pos_x,
						  this._pos_y + Moghunter.bhud_maxtp_number_pos_y,
						  ];
	for (var i = 0; i < 5; i++) {
	   this._maxtp_number[i] = new Sprite(this._maxtp_number_img);
	   this._maxtp_number[i].visible = false;
	   this._maxtp_number[i].x = this._maxtp_img_data[4];
	   this._maxtp_number[i].y = this._maxtp_img_data[5] ;
	   this.addChild(this._maxtp_number[i]);
	};	
	this._maxtp_number_old = 100;
	this.refresh_number(this._maxtp_number,this._maxtp_number_old,this._maxtp_img_data,this._maxtp_img_data[4],this._maxtp_img_data[5],2);	
};

//==============================
// * Update TP
//==============================
Battle_Hud.prototype.update_tp = function() {
	if (this._tp_meter_blue) {
		if(this._tp_flow[0]) {
		   this.refresh_meter_flow(this._tp_meter_blue,this._battler.tp,100,0,this._tp_flow[1]);
	   	   var dif_meter = this.update_dif(this._tp_old_ani[0],this._battler.tp,160)
		   if (this._tp_old_ani[0] != dif_meter) {this._tp_old_ani[0] = dif_meter;
	       this.refresh_meter_flow(this._tp_meter_red,this._tp_old_ani[0],100,1,this._tp_flow[1]);
		   };
		   this._tp_flow[1] += 1.5;
		   if (this._tp_flow[1] > this._tp_flow[3]) {this._tp_flow[1] = 0};		   
   	    }
		else {	
			if (this.need_refresh_parameter(2)) {
				this.refresh_meter(this._tp_meter_blue,this._battler.tp,100,0);
				this._tp_old = [this._battler.tp,100];
			};
			var dif_meter = this.update_dif(this._tp_old_ani[0],this._battler.tp,160)
			if (this._tp_old_ani[0] != dif_meter) {this._tp_old_ani[0] = dif_meter;
			this.refresh_meter(this._tp_meter_red,this._tp_old_ani[0],100,1);};
	};
    };
	if (this._tp_number) {
		var dif_number = this.update_dif(this._tp_number_old,this._battler.tp,30)
		if (this._tp_number_old != dif_number) {this._tp_number_old = dif_number;
		this.refresh_number(this._tp_number,this._tp_number_old,this._tp_img_data,this._tp_img_data[4],this._tp_img_data[5],2);};
	};
};

//==============================
// * Create AT Meter
//==============================
Battle_Hud.prototype.create_at_meter = function() {
	if (String(Moghunter.bhud_at_meter_visible) != "true") {return};
	this.removeChild(this._at_meter);
	if (!this._battler) {return};
	this._at_meter = new Sprite(this._at_meter_img);
	this._at_meter.x = this._pos_x + Moghunter.bhud_at_meter_pos_x;
	this._at_meter.y = this._pos_y + Moghunter.bhud_at_meter_pos_y;
	this._at_meter.rotation = Moghunter.bhud_at_meter_rotation; 
	this.addChild(this._at_meter);	
	if (String(Moghunter.bhud_at_meter_flow) === "true") {this._at_flow[0] = true;
	    this._at_flow[2] = this._at_meter_img.width / 3;
		this._at_flow[3] = this._at_flow[2] * 2;
		this._at_flow[1] = Math.floor(Math.random() * this._at_flow[2]);
	};
    this.check_compatibility_atb();	
};

//==============================
// * Check Compatibility ATB
//==============================
Battle_Hud.prototype.check_compatibility_atb = function() {
	if (Imported.Ellye_ATB) {
        var parameters = $plugins.filter(function(p) {
            return p.description.contains('<Ellye ATB>');
        })[0].parameters; 
	this._ellye_max_atb = Number(parameters['Full ATB Gauge'] || 50000);
	};
};

//==============================
// * Update AT
//==============================
Battle_Hud.prototype.update_at = function() {
	if (this._at_meter) {
		if (!this.at === -1) {this._at_meter.visible = false; return}
	    else {this._at_meter.visible = true};
		if(this._at_flow[0]) {
    		if (this.is_casting()){
				if (this.is_max_cast()){
				   this.refresh_at_meter_flow(this._at_meter,this.cast_at(),this.cast_max_at(),3,this._at_flow[1]);}
				else {
				   this.refresh_at_meter_flow(this._at_meter,this.cast_at(),this.cast_max_at(),2,this._at_flow[1]);
				};
			}
			else if (this.is_max_at()){
			   this.refresh_at_meter_flow(this._at_meter,this.at(),this.max_at(),1,this._at_flow[1]);}
			else {
			   this.refresh_at_meter_flow(this._at_meter,this.at(),this.max_at(),0,this._at_flow[1]);};
			   
		   this._at_flow[1] += 1.5;
		   if (this._at_flow[1] > this._at_flow[3]) {this._at_flow[1] = 0};		   
   	    }
		else {	
			if (this.is_casting()){
				if (this.is_max_cast()){
				   this.refresh_at_meter(this._at_meter,this.cast_at(),this.cast_max_at(),3);}
				else {
				   this.refresh_at_meter(this._at_meter,this.cast_at(),this.cast_max_at(),2);
				};
			}
			else if (this.is_max_at()){
			   this.refresh_at_meter(this._at_meter,this.at(),this.max_at(),1);}
			else {
			   this.refresh_at_meter(this._at_meter,this.at(),this.max_at(),0);};
		};
    };
};

//==============================
// * Refresh AT Meter
//==============================
Battle_Hud.prototype.refresh_at_meter = function(sprite,value,value_max,type) {
	var ch = sprite.bitmap.height / 4;
    var meter_rate = sprite.bitmap.width * value / value_max;
	sprite.setFrame(0,type * ch, meter_rate, ch);
};

//==============================
// * Refresh AT Meter Flow
//==============================
Battle_Hud.prototype.refresh_at_meter_flow = function(sprite,value,value_max,type,flow) {
	var cw = sprite.bitmap.width / 3;
	var ch = sprite.bitmap.height / 4;
    var meter_rate = cw * value / value_max;
	sprite.setFrame(flow,type * ch, meter_rate, ch);
};

//==============================
// * At
//==============================
Battle_Hud.prototype.at = function() {
 if (Imported.MOG_ATB) {return this._battler._atb};
 if (Imported.Ellye_ATB) {return this._battler.atb};
 if (Imported.YEP_X_BattleSysATB) {return Math.abs(this._battler._atbSpeed)};
  return -1;	
}

//==============================
// * Max At
//==============================
Battle_Hud.prototype.max_at = function() {
  if (Imported.MOG_ATB) {return this._battler._max_atb};
  if (Imported.Ellye_ATB) {return this._ellye_max_atb};
  if (Imported.YEP_X_BattleSysATB) {return Math.abs(BattleManager._atbTarget)};
  return 1;	
};

//==============================
// * Cast AT
//==============================
Battle_Hud.prototype.cast_at = function() {
  if (Imported.MOG_ATB) {return this._battler._cast_atb[1]};
  if (Imported.Ellye_ATB) {return this._battler.current_cast_atb};
  if (Imported.YEP_X_BattleSysATB) {return Math.abs(this._battler._atbCharge)};
  return 0;	
};

//==============================
// * Cast Max AT
//==============================
Battle_Hud.prototype.cast_max_at = function() {
  if (Imported.MOG_ATB) {return this._battler._cast_atb[2]};
  if (Imported.Ellye_ATB) {return this._battler.target_cast_atb};
  if (Imported.YEP_X_BattleSysATB) {return Math.abs(BattleManager._atbCharge)};
  return 1;	
};

//==============================
// * Is Casting
//==============================
Battle_Hud.prototype.is_casting = function() {
  if (Imported.MOG_ATB) {if (this._battler._cast_atb[0]) {return true;}};
  if (Imported.Ellye_ATB) {if (this._battler.casting_action) {return true;}}; 
  if (Imported.YEP_X_BattleSysATB) {if (this._battler._atbCharging) {return true;}} ;
  return false;	
};

//==============================
// * Is Max Atb
//==============================
Battle_Hud.prototype.is_max_at = function() {
	return this.at() >= this.max_at();
};

//==============================
// * Is Max Cast
//==============================
Battle_Hud.prototype.is_max_cast = function() {
	return this.cast_at() >= this.cast_max_at();
};

//==============================
// * Create States
//==============================
Battle_Hud.prototype.create_states = function() {
	if (String(Moghunter.bhud_states_visible) != "true") {return};
	this.removeChild(this._state_icon);
	if (!this._battler) {return};
	this._states_data = [0,0,0];
	this._state_icon = new Sprite(this._state_img);
	this._state_icon.x = this._pos_x + Moghunter.bhud_states_pos_x;
	this._state_icon.y = this._pos_y + Moghunter.bhud_states_pos_y;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refresh_states();	
};

//==============================
// * Create States
//==============================
Battle_Hud.prototype.refresh_states = function() {
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	if (this._battler.allIcons().length == 0) {this._states_data[1] = 0;return};
       if (this._battler.allIcons()[this._states_data[1]]) {	
		this._states_data[0] = this._battler.allIcons()[this._states_data[1]];
		this._state_icon.visible = true;
		var sx = this._states_data[0] % 16 * 32;
		var sy = Math.floor(this._states_data[0] / 16) * 32;
		this._state_icon.setFrame(sx, sy, 32, 32);
		this._battler.need_refresh_bhud_states = false;	
	
	   };
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._battler.allIcons().length) {
		this._states_data[1] = 0
	};
};

//==============================
// * Update States
//==============================
Battle_Hud.prototype.update_states = function() {
	this._states_data[2] += 1;
	if (this.need_refresh_states()) {this.refresh_states();};
};

//==============================
// * Need Refresh States
//==============================
Battle_Hud.prototype.need_refresh_states = function() {
	if (this._battler.need_refresh_bhud_states) {return true};
	if (this._states_data[2] > 60) {return true};
	return false;
};
