//=============================================================================
// PromptlyPopup.js
//=============================================================================
//Copyright (c) 2016 Trb
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
//twitter https://twitter.com/Trb_surasura
/*:
 * @plugindesc 複数攻撃時のポップアップを一括表示します
 * @author Trb
 * @version 1.10 2016/5/6 少し修正
 *          1.00 2016/5/5 初版
 * 
 * @help デフォルトではポップアップ→メッセージ表示→ポップアップ→メッセージ表示・・・
 * となっている部分を、一括でポップアップ→メッセージ表示　という方式に変更します。
 * （厳密に言うと完全に一括ではなく「ﾊﾞﾊﾞﾊﾞｯ」という感じです）
 * 
 * 攻撃后のメッセージ(「AにXダメージを与えた！」「Aを倒した！」など)の
 * 表示、非表示をパラメータで設定できます。
 * これは公式プラグインSimpleMsgSideViewのように表示をシンプルにするものでは無く、
 * 攻撃開始時のメッセージ(「○○の攻撃！」など)はそのままで
 * 攻撃の后のメッセージだけを全てカットします。
 * 
 * 
 * @param text
 * @desc 攻撃后のメッセージを表示させるかどうか
 * 1･･･表示する　0･･･表示しない
 * @default 1
 * 
 */
	
(function() {
    var Param = PluginManager.parameters('PromptlyPopup');
    var T = Number(Param['text']);
    
/*
<解説>
ポップアップが1体ずつしか表示されないのは、デフォルトでは
『敵Aにポップアップ→敵Aのダメージメッセージ→敵Bにポップアップ→敵Bのダメージメッセージ→･･･』
とポップアップとメッセージが交互に処理されているためで、ポップアップのディレイは主に
このメッセージ表示によるものです。
なので本プラグインではメッセージ用の命令リストとそれ以外の命令リストを別々にすることで
メッセージを最后に一括で表示するようにしています。

*/

var WB_initialize = Window_BattleLog.prototype.initialize;
Window_BattleLog.prototype.initialize = function() {
	WB_initialize.call(this);
	this._methods2 = [];//メソッドリスト2を新しく定義
};

//this._methods が空になったらthis._methods2に対して同じ処理をする
Window_BattleLog.prototype.callNextMethod = function() {
    if (this._methods.length > 0) {
        var method = this._methods.shift();
        if (method.name && this[method.name]) {
            this[method.name].apply(this, method.params);
        } else {
            throw new Error('Method not found: ' + method.name);
        }
    }else if (this._methods2.length > 0) {
         method = this._methods2.shift();
        if (method.name && this[method.name]) {
            this[method.name].apply(this, method.params);
        } else {
            throw new Error('Method not found: ' + method.name);
        }
    }

};

//methods2にプッシュする処理
Window_BattleLog.prototype.push2 = function(methodName) {
    if(T == 1){//パラメータの値が1の時だけプッシュする
        var methodArgs = Array.prototype.slice.call(arguments, 1);
        this._methods2.push({ name: methodName, params: methodArgs });
    }
};




//メッセージ表示に関連する処理を、this.push　からthis.push2　に変更していく

/*
B ver. で変更した部分について
ダメージのメッセージをまとめて表示するようにしましたが、その副作用で
敵が多すぎると全てのメッセージが表示されなくなってしまっています。
最大10行程度しか表示できないようで、5体以上の敵を同時に倒すと
○○の攻撃！
Aにxダメージを与えた！
Aを倒した！
Bにxダメージを与えた！
Bを倒した！
・・・と1体につき2行使うため5体目の途中までしか表示されなくなってしまいます。

もしメッセージを完全にはカットしたくないけど長すぎるのもちょっと・・・という場合は
不要なメッセージをプッシュしている部分だけコメントアウトするといいです。
たとえば、Window_BattleLog.prototypedisplayHpDamageメソッドにある
this.push2('addText', this.makeHpDamageText(target));
だけコメントアウトすれば、「xダメージを与えた！」のメッセージはカットされて
「Aを倒した！」のメッセージは残ります。(逆も然り)
どこのaddTextが何のメッセージなのかはメソッド名から推察して下さい。

*/
Window_BattleLog.prototype.displayCounter = function(target) {
    this.push('performCounter', target);
    this.push2('addText', TextManager.counterAttack.format(target.name()));//(変更した部分に // を付けておきます)
};

Window_BattleLog.prototype.displayReflection = function(target) {
    this.push('performReflection', target);
    this.push2('addText', TextManager.magicReflection.format(target.name()));//
};

Window_BattleLog.prototype.displaySubstitute = function(substitute, target) {
    var substName = substitute.name();
    this.push('performSubstitute', substitute, target);
    this.push2('addText', TextManager.substitute.format(substName, target.name()));//
};

Window_BattleLog.prototype.displayActionResults = function(subject, target) {
    if (target.result().used) {
        this.displayCritical(target);
        this.push('popupDamage', target);
        this.push('popupDamage', subject);
        this.displayDamage(target);
        this.displayAffectedStatus(target);
        this.displayFailure(target);
    }
};

Window_BattleLog.prototype.displayFailure = function(target) {
    if (target.result().isHit() && !target.result().success) {
        this.push2('addText', TextManager.actionFailure.format(target.name()));//
    }
};

Window_BattleLog.prototype.displayCritical = function(target) {
    if (target.result().critical) {
        if (target.isActor()) {
            this.push2('addText', TextManager.criticalToActor);//
        } else {
            this.push2('addText', TextManager.criticalToEnemy);//
        }
    }
};

Window_BattleLog.prototype.displayMiss = function(target) {
    var fmt;
    if (target.result().physical) {
        fmt = target.isActor() ? TextManager.actorNoHit : TextManager.enemyNoHit;
        this.push('performMiss', target);
    } else {
        fmt = TextManager.actionFailure;
    }
    this.push2('addText', fmt.format(target.name()));//
};

Window_BattleLog.prototype.displayEvasion = function(target) {
    var fmt;
    if (target.result().physical) {
        fmt = TextManager.evasion;
        this.push('performEvasion', target);
    } else {
        fmt = TextManager.magicEvasion;
        this.push('performMagicEvasion', target);
    }
    this.push2('addText', fmt.format(target.name()));//
};

Window_BattleLog.prototype.displayHpDamage = function(target) {
    if (target.result().hpAffected) {
        if (target.result().hpDamage > 0 && !target.result().drain) {
            this.push('performDamage', target);
        }
        if (target.result().hpDamage < 0) {
            this.push('performRecovery', target);
        }
        this.push2('addText', this.makeHpDamageText(target));//
    }
};

Window_BattleLog.prototype.displayMpDamage = function(target) {
    if (target.isAlive() && target.result().mpDamage !== 0) {
        if (target.result().mpDamage < 0) {
            this.push('performRecovery', target);
        }
        this.push2('addText', this.makeMpDamageText(target));//
    }
};

Window_BattleLog.prototype.displayTpDamage = function(target) {
    if (target.isAlive() && target.result().tpDamage !== 0) {
        if (target.result().tpDamage < 0) {
            this.push('performRecovery', target);
        }
        this.push2('addText', this.makeTpDamageText(target));//
    }
};

Window_BattleLog.prototype.displayAffectedStatus = function(target) {
    if (target.result().isStatusAffected()) {
        this.displayChangedStates(target);
        this.displayChangedBuffs(target);
    }
};

Window_BattleLog.prototype.displayAddedStates = function(target) {
    target.result().addedStateObjects().forEach(function(state) {
        var stateMsg = target.isActor() ? state.message1 : state.message2;
        if (state.id === target.deathStateId()) {
            this.push('performCollapse', target);
        }
        if (stateMsg) {
            this.push2('addText', target.name() + stateMsg);//
            this.push2('waitForEffect');//
        }
    }, this);
};

Window_BattleLog.prototype.displayBuffs = function(target, buffs, fmt) {
    buffs.forEach(function(paramId) {
        this.push2('addText', fmt.format(target.name(), TextManager.param(paramId)));//
    }, this);
};

BattleManager.invokeAction = function(subject, target) {
    if (Math.random() < this._action.itemCnt(target)) {
        this.invokeCounterAttack(subject, target);
    } else if (Math.random() < this._action.itemMrf(target)) {
        this.invokeMagicReflection(subject, target);
    } else {
        this.invokeNormalAction(subject, target);
    }
    subject.setLastTarget(target);
    this.refreshStatus();
};


//endActionの条件に「methods2が空の時」を追加
BattleManager.updateAction = function() {
    var target = this._targets.shift();
    if (target) {
        this.invokeAction(this._subject, target);
    } else if(!this._logWindow._methods2.length > 0){
        this.endAction();
    }
};

//エネミーにエフェクトを掛けている間ウェイトをかけるための処理ですが
//撃破演出時にウェイトがかかってしまうため常にfalseを返すようにします
Sprite_Enemy.prototype.isEffecting = function() {
    return false;
};

/*
常にfalseを返すようにしているため、たとえばデフォルトだとボスの消滅エフェクトは長めで
余韻が残るようになっていますが、そういうところもウェイトを掛けずにサッと流されてしまいます。
もし特定のエフェクトにのみウェイトを掛けたい場合は false の部分を書き換えて
return this._effectType == 'エフェクト名';にして下さい。
例　ボス消滅にのみウェイトを掛けたい場合　return this._effectType == 'bossCollapse';

その他エフェクトの種類はSprite_Enemy.prototype.updateEffectを見ると分かります。
(複数設定したい場合は　○○ == '××' || ○○ == '△△' || ･･･というように || で繋げていく)
*/




//-----------------------------------------
//多段ヒット技を使った時ポップアップが縦に並ぶようにする処理
//無くても問題ないので、不要だったり他のプラグインと競合する場合は削除して下さい
// Sprite_Battler.prototype.setupDamagePopup = function() {
//     if (this._battler.isDamagePopupRequested()) {
//         if (this._battler.isSpriteVisible()) {
//             var sprite = new Sprite_Damage();
//             sprite.x = this.x + this.damageOffsetX();
//             sprite.y = this.y + this.damageOffsetY();
//             sprite.setup(this._battler);
//             this._damages.forEach(function(Sprite){
// 				Sprite.y -= 26});
//             this._damages.push(sprite);
//             this.parent.addChild(sprite);
//         }
//         this._battler.clearDamagePopup();
//         this._battler.clearResult();
//     }
// };
//-------------------------------------------


})();
            

