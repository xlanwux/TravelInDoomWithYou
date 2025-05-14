//==============================================================================
// MpiUrmTacticsSystem.js
//==============================================================================

/*:
 * @plugindesc 戦術システムプラグイン
 * @author 奏ねこま（おとぶき ねこま）
 * 
 * @param Party Command
 * @type string
 * @default 戦術指示
 * @desc パーティコマンドに表示するコマンド名を設定してください。
 *
 * @param Actor Area X
 * @type number
 * @default 120
 * @desc アクター表示領域のX座標を設定してください。
 * 
 * @param Actor Area Y
 * @type number
 * @default 200
 * @desc アクター表示領域のY座標を設定してください。
 * 
 * @param Actor Area Width
 * @type number
 * @default 720
 * @desc アクター表示領域の幅を設定してください。
 * 
 * @param Actor Area Height
 * @type number
 * @default 160
 * @desc アクター表示領域の高さを設定してください。
 * 
 * @param Actor Margin
 * @type number
 * @default 8
 * @desc アクター表示の間隔を設定してください。
 * 
 * @param Max Actors
 * @type number
 * @default 4
 * @desc 表示するアクターの最大数を設定してください。
 * 
 * @param Tactics List Rows
 * @type number
 * @default 4
 * @desc 戦術リストの行数を設定してください。
 * 
 * @help
 * [戦術アイテムの設定]
 *  戦術アイテムとして設定したアイテムのメモ欄に以下のように記述してください。
 * 
 *   <tactics>
 *   name=戦術名（任意）
 *   type=戦術タイプ（manual or auto）
 *   ignore=無効設定（アクターID:スイッチ番号）
 *   action=アクション（実行条件:実行対象:実行スキル）
 *   </tactics>
 * 
 *  ・name設定
 *  「name=」の后ろに記述した文字列が、戦術設定画面に表示される名前になります。
 *  設定を省略した場合、アイテム名が戦術名になります。
 * 
 *  ・type設定
 *  「type=manual」は通常戦闘、「type=auto」は自動戦闘になります。
 * 
 *  ・ignore設定
 *  当該戦術を選択させないアクターと選択させない条件（スイッチ）を設定します。
 *  たとえば「ignore=3:2」と記述すると、スイッチ2番がONのとき、アクター3は当該戦
 *  術を選択できなくなります。常に無視する場合は「ignore=3」のように、スイッチ番
 *  号を省略して記述してください。
 *  ignore設定は複数記述することができます。
 * 
 *  ・action設定
 *  当該戦術で実行するアクションを設定します。
 *  「実行条件」「実行対象」「実行スキル」の3つの指定で1つのアクション設定とし、
 *  実行条件がマッチし、実行対象が存在したとき、実行スキルを使用します。
 *  各項目の指定方法については后述の「アクション設定詳細」を参照してください。
 *  action設定は複数記述することができ、上から順番に評価されます。
 *  評価したアクションについて、実行条件が成立し、実行対象が存在し、実行スキルが
 *  使用可能だった場合にそのスキルが実行されます。
 * 
 *  ※メモ欄の記述例
 *   <tactics>
 *   name=めいれいさせろ
 *   type=manal
 *   ignore=3:2
 *   ignore=4:2
 *   </tactics>
 * 
 *   <tactics>
 *   name=がんがんいこうぜ
 *   type=auto
 *   action=aliveEnemies() > 2:largerHpEnemy():maxTotalDamageSkill()
 *   action=always():randomEnemy():randomSkill()
 *   </tactics>
 * 
 * 【アクション設定詳細】
 *   アクション設定はすべてスクリプトで指定します。RPGツクールMVで使用可能なスク
 *   リプトであれば基本的に使用可能です（実行時の状況によります）。
 *   また、実行条件、実行対象、実行スキルの指定の中でのみ使用できるスクリプトも
 *   あります（下記参照）。
 * 
 *   - 実行条件 ----------------
 *    アクションを行う条件が成立したときに true となるスクリプトを記述します。
 *    [記述例]
 *     always()                     : 常にtrue
 *     friendsMaxHp() < 50          : HP割合が一番大きい味方のHPが50%未満
 *     friendsMinHp() < 10          : HP割合が一番小さい味方のHPが10%未満
 *     friendsMaxMp() < 50          : HP割合が一番大きい味方のMPが50%未満
 *     friendsMinMp() < 10          : HP割合が一番小さい味方のMPが10%未満
 *     friendsHp() < 50             : 味方全体のHP割合の平均が50%未満
 *     friendsMp() < 50             : 味方全体のMP割合の平均が50%未満
 *     aliveEnemies() <= 2          : 敵の数が2体以下
 *     deadFriends() >= 2           : 戦闘不能の味方が2人以上
 *     turnCount() == 5             : 5ターン目
 *     isStateAffected(10)          : 味方のいずれかがステート10番にかかっている
 *     myselfHp() < 50              : 本人のHP割合が50%未満
 *     myselfMp() < 10              : 本人のMP割合が10%未満
 *     myselfTp() < 20              : 本人のTPが20未満
 *     isStateAffectedMyself(10)    : 本人がステート10番にかかっている
 *     isStateAffectedMyself([5,8]) : 本人がステート5番または8番にかかっている
 * 
 *     ※上記例はいずれも実行条件指定でのみ記述可能なスクリプトです。
 *     ※[5,8]のように複数指定できるのは isStateAffectedMySelf のみです。
 * 
 *   - 実行対象 ----------------
 *    アクションを行う対象を取得するスクリプトを記述します。
 *    [記述例]
 *     largerHpFriend()         : HPが一番多い味方
 *     lessHpFriend()           : HPが一番少ない味方
 *     largerHpEnemy()          : HPが一番多い敵
 *     lessHpEnemy()            : HPが一番少ない敵
 *     stateAffectedFriend(10)  : ステート10番にかかっている味方
 *     stateAffectedEnemy(10)   : ステート10番にかかっている敵
 *     largerParamFriend('agi') : 敏捷性が一番高い味方
 *     largerParamEnemy('def')  : 防御力が一番高い敵
 *     randomFriend()           : ランダムに選択された味方
 *     randomEnemy()            : ランダムに選択された敵
 *     myself()                 : 本人
 * 
 *     ※上記例はいずれも実行対象指定でのみ記述可能なスクリプトです。
 *     ※largerParamFriend/largerParamEnemy に指定可能なパラメータには以下のよう
 *       なものがあります（一部記載）。
 *     'hp'  : HP         / 'mp'  : MP         / 'tp'  : TP
 *     'mhp' : 最大HP     / 'mmp' : 最大MP     /
 *     'atk' : 攻撃力     / 'def' : 防御力     /
 *     'mat' : 魔法攻撃力 / 'mdf' : 魔法防御力 /
 *     'agi' : 敏捷性     / 'luk' : 運         /
 *     'hit' : 命中率     / 'eva' : 回避率     /
 * 
 *   - 実行スキル---------------
 *    実行するスキルを取得するスクリプトを記述します。
 *    [記述例]
 *     maxDamageSkill()         : 1発のダメージが一番高いスキル
 *     minDamageSkill()         : 1発のダメージが一番低いスキル
 *     maxTotalDamageSkill()    : 複数回攻撃時の合計ダメージが一番高いスキル
 *     minTotalDamageSkill()    : 複数回攻撃時の合計ダメージが一番低いスキル
 *     justDamageSkill()        : 丁度倒せる程度のダメージを与えるスキル
 *     justRecoverySkill()      : 丁度最大HPになる程度の回復をするスキル
 *     markingSkill('XXX')      : （后述）
 *     randomSkill()            : 使用可能なスキルの中からランダム
 * 
 *     markingSkill('XXX')について。
 *     メモ欄に【XXX1】【XXX2】【XXX3】など、【XXX数字】と書かれたスキルの中から
 *     数字の部分が一番大きなスキルを選択します。XXXの部分は任意です。
 *     例えばメモ欄に【ABC1】と書かれたスキルと【ABC2】と書かれたスキルがある場
 *     合、markingSkill('ABC')とするとこれらのスキルが対象となります。
 *     メモ欄に記述する際、カッコの部分【】も必要です。
 * 
 * [利用規約] ..................................................................
 *  - 本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  - 商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  - 利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  - プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  - 本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [改訂履歴] ..................................................................
 *   Version 1.00  2018/09/23  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2018 Nekoma Otobuki
 */

var Imported = Imported || {};
var Makonet = Makonet || {};

(function(){
    'use strict';

    var plugin = 'MpiUrmTacticsSystem';

    Imported[plugin] = true;
    Makonet[plugin] = {};

    var $mpi = Makonet[plugin];
    $mpi.parameters = PluginManager.parameters(plugin);

    $mpi.party_command     = $mpi.parameters['Party Command'];
    $mpi.actor_area_x      = Number($mpi.parameters['Actor Area X']) || 120;
    $mpi.actor_area_y      = Number($mpi.parameters['Actor Area Y']) || 200;
    $mpi.actor_area_width  = Number($mpi.parameters['Actor Area Width']) || 720;
    $mpi.actor_area_height = Number($mpi.parameters['Actor Area Height']) || 160;
    $mpi.actor_margin      = Number($mpi.parameters['Actor Margin']) || 8;
    $mpi.max_actors        = Number($mpi.parameters['Max Actors']) || 4;
    $mpi.tactics_list_rows = Number($mpi.parameters['Tactics List Rows']) || 4;

    //==============================================================================
    // Private Methods
    //==============================================================================

    function convertVariables(text) {
        if (typeof(text) !== 'string') return text;
        var pattern = '\\\\v\\[(\\d+)\\]';
        while (text.match(RegExp(pattern, 'i'))) {
            text = text.replace(RegExp(pattern, 'gi'), function(){
                return $gameVariables.value(+arguments[1]);
            });
        }
        return text;
    }

    function getTactics(actor) {
        var all_tactics = $gameParty.items().filter(function(item) {
            return item && item.meta['tactics'];
        }).map(function(item) {
            var is_tactics = false;
            var meta = item.note.replace(/<tactics>/, '\n<tactics>\n')
                                .replace(/<\/tactics>/, '\n</tactics>\n')
                                .split(/\n/).filter(function(line) {
                if (line.match(/<tactics>/)) {
                    is_tactics = true;
                    return false;
                }
                if (line.match(/<\/tactics>/)) {
                    is_tactics = false;
                    return false;
                }
                return is_tactics;
            }).join('\0');
            var regexp = /([^\0]+?)=([^\0]+)/g;
            var tactics = {};
            while (regexp.exec(meta)) {
                var key = RegExp.$1.trim();
                var value = RegExp.$2.trim();
                if (['name', 'type'].contains(key)) {
                    tactics[key] = value;
                } else {
                    tactics[key] = tactics[key] || [];
                    tactics[key].push(value);
                }
            }
            tactics['id'] = item.id;
            tactics['name'] = tactics['name'] || item.name;
            tactics['type'] = tactics['type'] || 'manual';
            tactics['action'] = tactics['action'] || [];
            return tactics;
        });

        var enabled_tactics = all_tactics.filter(function(tactics) {
            if (!tactics['ignore']) {
                return true;
            }
            return tactics['ignore'].every(function(ignore) {
                var actor_id = Number(ignore.split(/ *: */)[0]) || 0;
                var switch_id = Number(ignore.split(/ *: */)[1]) || 0;
                return actor.actorId() !== actor_id || (switch_id !== 0 && !$gameSwitches.value(switch_id));
            });
        });

        var valid_tactics = enabled_tactics.filter(function(tactics) {
            return tactics.id === actor._tactics_id;
        });

        return valid_tactics[0] || enabled_tactics[0];
    }

    function checkActionCondition(subject, actionCondition) {
        // 味方／敵のHP割合のうち一番高い／低い値
        var ____Hp = function(members, max) {
            return members.reduce(function(value, member) {
                var func = max ? Math.max : Math.min;
                return func(value, Math.floor(member.hp / member.mhp * 100));
            }, max ? 0 : 100);
        };
        // 味方のHP割合のうち一番高い値
        var friendsMaxHp = function() {
            return ____Hp($gameParty.aliveMembers(), true);
        };
        // 味方のHP割合のうち一番低い値
        var friendsMinHp = function() {
            return ____Hp($gameParty.aliveMembers(), false);
        };

        // 味方／敵のMP割合のうち一番高い／低い値
        var ____Mp = function(members, max) {
            return members.reduce(function(value, member) {
                var func = max ? Math.max : Math.min;
                return func(value, Math.floor(member.mp / member.mmp * 100));
            }, max ? 0 : 100);
        };
        // 味方のMP割合のうち一番高い値
        var friendsMaxMp = function() {
            return ____Mp($gameParty.aliveMembers(), true);
        };
        // 味方のMP割合のうち一番低い値
        var friendsMinMp = function() {
            return ____Mp($gameParty.aliveMembers(), false);
        };

        // 味方全体のHP割合
        var friendsHp = function() {
            return Math.floor($gameParty.aliveMembers().reduce(function(value, actor) {
                return value + Math.floor(actor.hp / actor.mhp * 100);
            }, 0) / $gameParty.members().length);
        };
        // 味方全体のMP割合
        var friendsMp = function() {
            return Math.floor($gameParty.aliveMembers().reduce(function(value, actor) {
                return value + Math.floor(actor.mp / actor.mmp * 100);
            }, 0) / $gameParty.members().length);
        };

        // 敵の残存数
        var aliveEnemies = function() {
            return $gameTroop.aliveMembers().length;
        };
        // 味方の死亡数
        var deadFriends = function() {
            return $gameParty.deadMembers().length;
        };
        // 現在のターン数
        var turnCount = function() {
            return $gameTroop.turnCount();
        };

        // 味方がステートにかかっているか
        var isStateAffected = function(stateId) {
            return $gameParty.aliveMembers().some(function(actor) {
                return actor.isStateAffected(stateId);
            });
        }

        // 本人のHP割合
        var myselfHp = function() {
            return Math.floor(subject.hp / subject.mhp * 100);
        };
        // 本人のMP割合
        var myselfMp = function() {
            return Math.floor(subject.mp / subject.mmp * 100);
        };
        // 本人のTP
        var myselfTp = function() {
            return subject.tp;
        };
        // 本人がステートにかかっているか
        var isStateAffectedMyself = function(stateId) {
            if (stateId instanceof Array) {
                return stateId.some(function(state) {
                    return subject.isStateAffected(state);
                });
            }
            return subject.isStateAffected(stateId);
        };
        // 本人データ
        var myself = function() {
            return subject;
        };

        // いつでも
        var always = function() {
            return true;
        };

        return !!eval('(' + actionCondition + ')');
    }

    function getActionTarget(subject, targetCondition) {
        // 一番HPが多い／少ない味方／敵
        var __Hp__ = function(members, max) {
            var targets = members.slice().sort(function(a, b) {
                return a.hp - b.hp;
            });
            return (max) ? targets.reverse()[0] : targets[0];
        };
        // 一番HPが多い味方
        var largerHpFriend = function() {
            return __Hp__($gameParty.aliveMembers(), true);
        };
        // 一番HPが少ない味方
        var lessHpFriend = function() {
            return __Hp__($gameParty.aliveMembers(), false);
        };
        // 一番HPが多い敵
        var largerHpEnemy = function() {
            return __Hp__($gameTroop.aliveMembers(), true);
        };
        // 一番HPが少ない敵
        var lessHpEnemy = function() {
            return __Hp__($gameTroop.aliveMembers(), false);
        };

        // 指定のステートにかかっている味方／敵
        var stateAffected__ = function(members, stateId) {
            var _members = members.filter(function(member) {
                return member.isStateAffected(stateId);
            });
            return _members[Math.floor(Math.random() * _members.length)];
        };
        // 指定のステートにかかっている味方
        var stateAffectedFriend = function(stateId) {
            return stateAffected__($gameParty.aliveMembers(), stateId);
        };
        // 指定のステートにかかっている敵
        var stateAffectedEnemy = function(stateId) {
            return stateAffected__($gameTroop.aliveMembers(), stateId);
        };

        // 指定の能力値が一番高い味方／敵
        var __Param__ = function(members, param, max) {
            var targets = members.slice().sort(function(a, b) {
                return a[param] - b[param];
            });
            return (max) ? targets.reverse()[0] : targets[0];
        };
        // 指定の能力値が一番高い味方
        var largerParamFriend = function(param) {
            return __Param__($gameParty.aliveMembers(), param, true);
        };
        // 指定の能力値が一番高い敵
        var largerParamEnemy = function(param) {
            return __Param__($gameTroop.aliveMembers(), param, true);
        };

        // ランダムな味方
        var randomFriend = function() {
            var members = $gameParty.aliveMembers();
            return members[Math.floor(Math.random() * members.length)];
        };
        // ランダムな敵
        var randomEnemy = function() {
            var members = $gameTroop.aliveMembers();
            return members[Math.floor(Math.random() * members.length)];
        };

        // 本人
        var myself = function() {
            return subject;
        };

        return eval('(' + targetCondition + ')');
    }

    function getActionSkill(subject, target, skillCondition) {
        var scopes = [];
        if (target.isActor()) {
            scopes = [7, 8];
            if (subject.actorId() === target.actorId()) {
                scopes.push(11);
            }
        } else {
            scopes = [1, 2, 3, 4, 5, 6];
        }
        var actions = subject.makeActionList().filter(function(action) {
            return scopes.contains(action.item().scope) && !action.item().note.match(/【××】/);
        });

        // 単発ダメージが一番大きい／小さいスキル
        var __DamageSkill = function(max) {
            var _actions = actions.sort(function(a, b) {
                return a.makeDamageValue(target, false) - b.makeDamageValue(target, false);
            });
            var action = (max) ? _actions.reverse()[0] : _actions[0];
            return (action) ? action.item() : null;
        };
        // 単発ダメージが一番大きいスキル
        var maxDamageSkill = function() {
            return __DamageSkill(true);
        };
        // 単発ダメージが一番小さいスキル
        var minDamageSkill = function() {
            return __DamageSkill(false);
        };

        // 合計ダメージが一番大きいスキル
        var __TotalDamageSkill = function(max) {
            var _actions = actions.sort(function(a, b) {
                var va = a.makeDamageValue(target, false);
                var na = 1;
                if (a.item().scope === 2) {
                    na = $gameTroop.aliveMembers().length;
                } else if (a.item().scope === 8) {
                    na = $gameParty.aliveMembers().length;
                } else if ([3,4,5,6].contains(a.item().scope)) {
                    na = Math.min(a.item().scope - 2, $gameTroop.aliveMembers().length);
                }
                var vb = b.makeDamageValue(target, false);
                var nb = 1;
                if (b.item().scope === 2) {
                    nb = $gameTroop.aliveMembers().length;
                } else if (b.item().scope === 8) {
                    nb = $gameParty.aliveMembers().length;
                } else if ([3,4,5,6].contains(b.item().scope)) {
                    nb = Math.min(b.item().scope - 2, $gameTroop.aliveMembers().length);
                }
                return va * na - vb * nb;
            });
            var action = (max) ? _actions.reverse()[0] : _actions[0];
            return (action) ? action.item() : null;
        };
        // 合計ダメージが一番大きいスキル
        var maxTotalDamageSkill = function() {
            return __TotalDamageSkill(true);
        };
        // 合計ダメージが一番小さいスキル
        var minTotalDamageSkill = function() {
            return __TotalDamageSkill(false);
        };

        // 丁度よいダメージのスキル
        var justDamageSkill = function() {
            var _applyVariance = Game_Action.prototype.applyVariance;
            Game_Action.prototype.applyVariance = function(damage, variance){
                var dmg = Math.floor(Math.abs(damage) * (100 - variance) / 100);
                return (damage >= 0) ? dmg : dmg * -1;
            };
            var action = actions.sort(function(a, b) {
                var va = a.makeDamageValue(target, false);
                var na = a.item().repeats;
                var vb = b.makeDamageValue(target, false);
                var nb = b.item().repeats;
                return va * na - vb * nb;
            }).filter(function(action) {
                var v = action.makeDamageValue(target, false);
                var n = action.item().repeats;
                return target.hp <= v * n;
            })[0];
            Game_Action.prototype.applyVariance = _applyVariance;
            return (action) ? action.item() : null;
        };

        // 丁度よい回復のスキル
        var justRecoverySkill = function() {
            var _applyVariance = Game_Action.prototype.applyVariance;
            Game_Action.prototype.applyVariance = function(damage, variance){
                var dmg = Math.floor(Math.abs(damage) * (100 - variance) / 100);
                return (damage >= 0) ? dmg : dmg * -1;
            };
            var action = actions.sort(function(a, b) {
                var va = a.makeDamageValue(target, false);
                var na = a.item().repeats;
                var vb = b.makeDamageValue(target, false);
                var nb = b.item().repeats;
                return va * na - vb * nb;
            }).filter(function(action) {
                var v = action.makeDamageValue(target, false);
                var n = action.item().repeats;
                return target.hp - v * n >= target.mhp;
            })[0];
            Game_Action.prototype.applyVariance = _applyVariance;
            return (action) ? action.item() : null;
        };

        // メモ欄に指定の文字列があるスキル
        var markingSkill = function(mark) {
            var action = actions.filter(function(action) {
                return action.item().note.replace(/\n/, '').match('【' + mark + '\\d+】');
            }).sort(function(a, b) {
                var va = a.item().note.replace(/\n/, '').match('【' + mark + '(\\d+)】')[1];
                var vb = b.item().note.replace(/\n/, '').match('【' + mark + '(\\d+)】')[1];
                return vb - va;
            })[0];
            return (action) ? action.item() : null;
        };

        // ランダムなスキル
        var randomSkill = function() {
            return (actions.length > 0) ? actions[Math.floor(Math.random() * actions.length)].item() : null;
        };

        return eval('(' + skillCondition + ')');
    }

    //==============================================================================
    // Scene_Battle
    //==============================================================================
    
    // Scene_Battle.prototype.createPartyCommandWindow
    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            this._partyCommandWindow.setHandler('tactics', this.commandTactics.bind(this));
        };
    }(Scene_Battle.prototype,'createPartyCommandWindow'));

    Scene_Battle.prototype.commandTactics = function() {
        this._partyCommandWindow.hide();
        this._tacticsWindow.activate();
        this._tacticsWindow.show();
    };

    // Scene_Battle.prototype.createAllWindows
    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            this._tacticsWindow = new Window_Tactics();
            this._tacticsWindow.setHandler('cancel', this.onTacticsCancel.bind(this));
            this.addWindow(this._tacticsWindow);
        };
    }(Scene_Battle.prototype,'createAllWindows'));

    Scene_Battle.prototype.onTacticsCancel = function() {
        this._tacticsWindow.hide();
        this._tacticsWindow.deactivate();
        this._partyCommandWindow.show();
        $gameParty.makeActions();
    };

    // Scene_Battle.prototype.isAnyInputWindowActive
    (function(o,p){
        var f=o[p];o[p]=function(){
            return f.apply(this,arguments)
                || this._tacticsWindow.active;
        };
    }(Scene_Battle.prototype,'isAnyInputWindowActive'));

    //==============================================================================
    // Window_PartyCommand
    //==============================================================================
    
    // Window_PartyCommand.prototype.makeCommandList
    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            var enabled = $gameParty.items().some(function(item) {
                return item.meta['tactics'];
            });
            if (enabled) {
                this.addCommand($mpi.party_command, 'tactics');
                var command = this._list.pop();
                var index = this._list.findIndex(function(command) {
                    return (command.symbol === 'fight');
                });
                this._list.splice(index + 1, 0, command);
            }
        };
    }(Window_PartyCommand.prototype,'makeCommandList'));
    
    //==============================================================================
    // Window_Tactics
    //==============================================================================
    
    function Window_Tactics() {
        this.initialize.apply(this, arguments);
    }

    Window_Tactics.prototype = Object.create(Window_Selectable.prototype);
    Window_Tactics.prototype.constructor = Window_Tactics;

    Window_Tactics.prototype.initialize = function() {
        this._actorWindows = [];
        this._slotWindow = null;
        this._listWindow = null;
        Window_Selectable.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this.createAllWindows();
        this._windowSpriteContainer.visible = false;
        this.deactivate();
        this.hide();
    };

    Window_Tactics.prototype.createAllWindows = function() {
        this.createActorWindows();
        this.createSlotWindow();
        this.createListWindow();
    };

    Window_Tactics.prototype.createActorWindows = function() {
        this._actorWindows.forEach(function(child) {
            this.removeChild(child);
        }, this);
        this._actorWindows = [];
        var x = $mpi.actor_area_x;
        var y = $mpi.actor_area_y;
        var width = $mpi.actor_area_width;
        var height = $mpi.actor_area_height;
        var margin = $mpi.actor_margin;
        var max = $mpi.max_actors;
        var window_width = Math.floor((width - margin * (max - 1)) / max);
        var window_height = this.fittingHeight(1);
        $gameParty.members().forEach(function(actor, index) {
            var window_x = index * (window_width + margin);
            var window1 = new Window_Base(x + window_x, y, window_width, window_height);
            var window2 = new Window_Base(x + window_x, y + height - window_height, window_width, window_height);
            this.addChild(window1);
            this.addChild(window2);
            this._actorWindows.push(window1);
            this._actorWindows.push(window2);
            var name = (index === 0) ? actor.name() : actor.currentClass().name;
            window1.drawText(name, 0, 0, window1.contentsWidth(), 'center');
        }, this);
    };

    Window_Tactics.prototype.createSlotWindow = function() {
        if (this._slotWindow) {
            this.removeChild(this._slotWindow);
        }
        var x = $mpi.actor_area_x;
        var y = this._actorWindows[1].y;
        var width = (this._actorWindows[0].width + $mpi.actor_margin) * (this._actorWindows.length / 2) - $mpi.actor_margin;
        var margin = this.standardPadding() * 2 + $mpi.actor_margin;
        this._slotWindow = new Window_TacticsSlot(x, y, width, margin);
        this._slotWindow.setHandler('ok', this.onSlotOk.bind(this));
        this.addChild(this._slotWindow);
    };

    Window_Tactics.prototype.createListWindow = function() {
        var list_height = this.fittingHeight($mpi.tactics_list_rows);
        this._listWindow = new Window_TacticsList(0, Graphics.boxHeight - list_height, Graphics.boxWidth, list_height);
        this._listWindow.setHandler('ok', this.onItemOk.bind(this));
        this._listWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this._listWindow.refresh();
        this.addChild(this._listWindow);
    };

    Window_Tactics.prototype.onSlotOk = function() {
        this._listWindow.setActor($gameParty.members()[this._slotWindow.index()]);
        this._listWindow.select(0);
        this._listWindow.activate();
    };

    Window_Tactics.prototype.onItemOk = function() {
        $gameParty.members()[this._slotWindow.index()]._tactics_id = this._listWindow.item().id;
        this._slotWindow.refresh();
        this._listWindow.setActor(null);
        this._listWindow.deactivate();
        this._slotWindow.activate();
    };
    
    Window_Tactics.prototype.onItemCancel = function() {
        this._listWindow.setActor(null);
        this._listWindow.deactivate();
        this._slotWindow.activate();
    };

    Window_Tactics.prototype.activate = function() {
        this.createActorWindows();
        this.createSlotWindow();
        Window_Selectable.prototype.activate.apply(this, arguments);
    };
    
    Window_Tactics.prototype.deactivate = function() {
        if (this._slotWindow) {
            this._slotWindow.deactivate();
        }
        if (this._listWindow) {
            this._listWindow.deactivate();
        }
        Window_Selectable.prototype.deactivate.apply(this, arguments);
    };
    
    //==============================================================================
    // Window_TacticsSlot
    //==============================================================================

    function Window_TacticsSlot() {
        this.initialize.apply(this, arguments);
    }

    Window_TacticsSlot.prototype = Object.create(Window_HorzCommand.prototype);
    Window_TacticsSlot.prototype.constructor = Window_TacticsSlot;

    Window_TacticsSlot.prototype.initialize = function(x, y, width, margin) {
        this._windowWidth = width;
        this._spacing = margin;
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        this._windowSpriteContainer.visible = false;
    };

    Window_TacticsSlot.prototype.windowWidth = function() {
        return this._windowWidth;
    };
    
    Window_TacticsSlot.prototype.maxCols = function() {
        return $gameParty.members().length;
    };

    Window_TacticsSlot.prototype.spacing = function() {
        return this._spacing;
    };
    
    Window_TacticsSlot.prototype.makeCommandList = function() {
        $gameParty.members().forEach(function(actor, index) {
            var tactics = getTactics(actor);
            if (!actor._tactics_id) {
                actor._tactics_id = tactics.id;
            }
            this.addCommand(tactics.name, '');
        }, this);
    };

    //==============================================================================
    // Window_TacticsList
    //==============================================================================

    function Window_TacticsList() {
        this.initialize.apply(this, arguments);
    }

    Window_TacticsList.prototype = Object.create(Window_ItemList.prototype);
    Window_TacticsList.prototype.constructor = Window_TacticsList;

    Window_TacticsList.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.resetScroll();
        }
    };
    
    Window_TacticsList.prototype.includes = function(item) {
        return item && item.meta['tactics'];
    };

    Window_TacticsList.prototype.isEnabled = function(item) {
        if (!this._actor) {
            return false;
        }
        var actor = new Game_Actor(this._actor.actorId());
        actor._tactics_id = item.id;
        var tactics = getTactics(actor);
        return actor._tactics_id === tactics.id;
    };
    
    Window_TacticsList.prototype.drawItemName = function(item, x, y, width) {
        width = width || 312;
        if (item) {
            var actor = new Game_Actor(1);
            actor._tactics_id = item.id;
            var tactics = getTactics(actor);
            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            this.drawText(tactics['name'], x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };
    
    Window_TacticsList.prototype.drawItemNumber = function(item, x, y, width) {
    };
    
    Window_TacticsList.prototype._updateCursor = function() {
        var _openness = this._openness;
        if (!this.active) {
            this._openness = 0;
        }
        Window.prototype._updateCursor.call(this);
        this._openness = _openness;
    };

    //==============================================================================
    // Game_Actor
    //==============================================================================
    
    // Game_Actor.prototype.isAutoBattle
    (function(o,p){
        var f=o[p];o[p]=function(){
            var tactics = getTactics(this);
            if (this._tactics_id !== tactics.id) {
                this._tactics_id = tactics.id;
            }
            var tactics_auto = (tactics['type'] === 'auto');
            return f.apply(this,arguments) || tactics_auto;
        };
    }(Game_Actor.prototype,'isAutoBattle'));

    //==============================================================================
    // Game_Party
    //==============================================================================

    // Game_Party.prototype.canInput
    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            return true;
        };
    }(Game_Party.prototype,'canInput'));

    //==============================================================================
    // BattleManager
    //==============================================================================

    // BattleManager.startAction
    (function(o,p){
        var f=o[p];o[p]=function(){
            if (this._subject.isActor() && this._subject.isAppeared() && !this._subject.isRestricted()) {
                var tactics = getTactics(this._subject);
                if (tactics['type'] === 'auto') {
                    var target = null;
                    var skill = null;
                    tactics['action'].some(function(action) {
                        var param = action.split(/ *: */);
                        var condition = checkActionCondition(this._subject, param[0]);
                        target = getActionTarget(this._subject, param[1]);
                        if (!!condition && !!target) {
                            skill = getActionSkill(this._subject, target, param[2]);
                        }
                        return !!skill;
                    }, this);
                    this._subject.currentAction().setTarget((target) ? target.index() : $gameTroop.aliveMembers()[0].index());
                    this._subject.currentAction().setSkill((skill) ? skill.id : this._subject.attackSkillId());
                }
            }
            f.apply(this,arguments);
        };
    }(BattleManager,'startAction'));
}());
