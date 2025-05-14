/*:
-------------------------------------------------------------------------
@title End Phase Triggers
@author Hime
@date Nov 11, 2015
@url http://himeworks.com/2015/10/end-phase-triggers-mv/
-------------------------------------------------------------------------
@plugindesc Checks whether there are any events to run before ending the
battle.
@help 
-------------------------------------------------------------------------
== Description ==

By default, when all actors or enemies are defeated in battle, the game
will simply go straight to the victory or defeat processing.

However, by enabling plugin, the game will perform a check to see if
there are any events that can be run before the battle finishes.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 11, 2015 - added a check to see if events can run.
Oct 28, 2015 - initial release
 
== Usage == 

Plug and Play.

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {};
var TH = TH || {};

Imported.EndPhaseTriggers = 1
TH.EndPhaseTriggers = TH.EndPhaseTriggers || {};

(function ($) {   
  
  /* Overwrite. The order of the event checking logic is changed so that
     battle end check occurs after all events have been checked */
  BattleManager.updateEventMain = function() {
    $gameTroop.updateInterpreter();
    $gameParty.requestMotionRefresh();
    
    /* If event is running, don't start a new one */
    if ($gameTroop.isEventRunning()) {
        return true;
    }
    
    /* See if there are any events that we can run */
    if (this.canRunEvents()) {
      $gameTroop.setupBattleEvent();
      if ($gameTroop.isEventRunning() || SceneManager.isSceneChanging()) {
          return true;
      }
    }
    
    /* No events? Let's check if the battle should end */
    if (this.checkBattleEnd()) {
      return true
    }
    return false;
  };
  
  /* Determines whether events can run or not */
  BattleManager.canRunEvents = function() {
    return true;
  }
  
})(TH.EndPhaseTriggers);