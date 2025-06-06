﻿//=============================================================================
// ツリー型スキル習得システム(Tree-type Skill Learning System)
// FTKR_SkillTreeSystem.js
// プラグインNo : 7
// 作成者　　   : フトコロ(futokoro)
// 作成日　　   : 2017/02/25
// 最終更新日   : 2019/04/22
// バージョン   : v1.18.1
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_STS = true;

var FTKR = FTKR || {};
FTKR.STS = FTKR.STS || {};

//=============================================================================
/*:
 * @plugindesc v1.18.1 ツリー型スキル習得システム
 * @author フトコロ
 *
 * @param --必須設定(Required)--
 * 
 * @param Skill Tree Id
 * @desc スキルツリーを設定した武器タイプIDを設定します。
 * @default 
 * @type number
 * 
 * @param --基本設定(Basic)--
 * 
 * @param Show Skill Command
 * @desc メニューにスキル習得コマンドを表示するか。
 *  1 - 表示する(show), 0 - 表示しない(hide)
 * @default 1
 * @type number
 *
 * @param Command Name
 * @desc スキル習得コマンドのコマンド名を設定します。
 * @default スキル習得
 *
 * @param Skill Menu Switch ID
 * @desc メニュー欄の表示のON/OFFを制御するスイッチIDを指定します。
 * @default 0
 * @type number
 *
 * @param Enable Confirmation
 * @desc スキル習得実行時に確認画面で実行確認するか。
 *  1 - 確認する, 0 - 確認しない
 * @default 1
 * @type number
 *
 * @param Reset When Forgotten Skill
 * @desc スキルを忘れた時にツリーをリセットするか
 * 1 - リセットする, 0 - リセットしない
 * @default 1
 * @type number
 * 
 * @param Learned Actor Var ID
 * @desc スキルを習得したアクターのIDを格納する変数IDを指定します。
 * @default 0
 * @type number
 *
 * @param Learned Skill Var ID
 * @desc 習得したスキルのIDを格納する変数IDを指定します。
 * @default 0
 * @type number
 *
 * @param --習得次数の設定(Learned Count)--
 * 
 * @param Enabled Skill Count
 * @desc スキルの複数回習得機能を有効にするか
 * 1 - 有効にする, 0 - 無効にする
 * @default 0
 * @type number
 * 
 * @param Default Max Count
 * @desc スキルのデフォルト最大習得次数
 * @default 1
 * @type number
 * 
 * @param Skill Learned Icon
 * @desc 習得済のスキルを明示するアイコン
 * @default 87
 * @type number
 * 
 * @param --スキルポイントの設定(Skill Point)--
 * 
 * @param SP Display Name
 * @desc スキルポイントの表示名
 * @default SP
 * 
 * @param Default Max SP
 * @desc スキルポイントの最大値
 * 0 は最大値なし
 * @default 0
 * @type number
 * @min 0
 * 
 * @param Default Required SP
 * @desc スキル習得に必要なスキルポイント
 * (スキル毎に設定しない場合のデフォルト値)
 * @default 1
 * @type number
 * 
 * @param Get Level Up Sp
 * @desc レベルアップ時に入手するSP量
 * @default 1
 * @type number
 * 
 * @param Cost Sp Icon
 * @desc コストをSPに設定した場合に表示するアイコンを指定します。
 * @default 296
 * @type number
 *
 * @param Hide Sp Cost 0
 * @desc SPコストが0の場合にコストウィンドウで非表示にするか
 * 0 - 表示する, 1 - 非表示にする
 * @default 0
 * @type number
 * 
 * @param Display Get Sp
 * @desc 戦闘終了時のSP入手メッセージ
 * %1 - 獲得SP量, %2 - スキルポイント名
 * @default %1 の%2を獲得！
 * 
 * @param Enable Class Sp
 * @desc アクター１人に対して職業毎に個別のSPを持たせるか
 * @type Boolean
 * @on 有効
 * @off 無効
 * @default false
 * 
 * @param --スキル枠の設定(Skill Frame)--
 * 
 * @param Enabled Skill Frame
 * @desc スキル枠を表示するか
 * 1 - 有効(show), 0 - 無効(hide)
 * @default 1
 * @type number
 * 
 * @param Skill Frame Width
 * @desc スキル枠の幅
 * @default 40
 * @type number
 * 
 * @param Skill Frame Height
 * @desc スキル枠の高さ
 * @default 40
 * @type number
 * 
 * @param Skill Icon Offset X
 * @desc スキル枠に対するアイコンのX座標の相対位置
 * @default 4
 * @min -4096
 * @max 4096
 * @type number
 * 
 * @param Skill Icon Offset Y
 * @desc スキル枠に対するアイコンのY座標の相対位置
 * @default 4
 * @min -4096
 * @max 4096
 * @type number
 * 
 * @param --スキルテキスト(Skill Text)--
 * 
 * @param Skill Name Format
 * @desc スキル名の表示内容
 * %1 - スキル名
 * @default 
 * 
 * @param Skill Text Offset X
 * @desc スキル枠に対するスキル名のX座標の相対位置
 * @default 38
 * @min -4096
 * @max 4096
 * @type number
 * 
 * @param Skill Text Offset Y
 * @desc スキル枠に対するスキル名のY座標の相対位置
 * @default 2
 * @min -4096
 * @max 4096
 * @type number
 * 
 * @param --スキル枠の色の設定(Skill Frame Color)--
 * 
 * @param Frame Color isLearned
 * @desc 習得済みスキルの枠の色
 * @default 0
 * @type number
 * 
 * @param Frame Color isLearn OK
 * @desc 習得可能なスキルの枠の色
 * @default 17
 * @type number
 * 
 * @param Frame Color isReqSkill NG
 * @desc 必要スキル未修得のスキルの枠の色
 * @default 15
 * @type number
 * 
 * @param Frame Color isRequired NG
 * @desc 必要コストまたはパラメータ不足のスキルの枠の色
 * @default 16
 * @type number
 * 
 * @param --習得次数の表示設定(Skill Count Frame)--
 * 
 * @param Draw Count Frame
 * @desc スキルカウント枠を表示するか
 * 1 - 有効(show), 0 - 無効(hide)
 * @default 0
 * @type number
 * 
 * @param Count Frame Width
 * @desc スキルカウント枠の幅
 * @default 20
 * @type number
 * 
 * @param Count Frame Height
 * @desc スキルカウント枠の高さ
 * @default 20
 * @type number
 * 
 * @param Count Frame Thick
 * @desc 枠線の太さ
 * @default 2
 * @type number
 * 
 * @param Count Frame Offset X
 * @desc スキル枠に対するカウント枠のX座標の相対位置
 * (カウント有効の場合は 10 がお勧め)
 * @default -10
 * @min -4096
 * @max 4096
 * @type number
 * 
 * @param Count Frame Offset Y
 * @desc スキル枠に対するカウント枠のY座標の相対位置
 * (カウント有効の場合は 0 がお勧め)
 * @default 25
 * @min -4096
 * @max 4096
 * @type number
 * 
 * @param Count Frame Format
 * @desc カウント枠に表示するスキルカウントの表示内容
 * %1 - スキルカウント値
 * @default \}\c[0]%1\{
 * 
 * @param Skill Count Offset X
 * @desc カウント枠に対するスキルカウントのX座標の相対位置
 * @default 5
 * @min -4096
 * @max 4096
 * @type number
 * 
 * @param Skill Count Offset Y
 * @desc カウント枠に対するスキルカウントのY座標の相対位置
 * @default -10
 * @min -4096
 * @max 4096
 * @type number
 * 
 * @param --ツリーの表示設定(Skill Tree Layout)--
 * 
 * @param Draw Line Type
 * @desc ツリーのスキル間の線の引き方
 * 0 - 直線, 1 - カギ線(A), 2 - カギ線(B), 3 - 線なし
 * @default 1
 * @type number
 * 
 * @param Tree Line Thick
 * @desc ツリーの線の太さ
 * @default 2
 * @type number
 * 
 * @param Add Frame To Line
 * @desc ツリーの線に黒枠を付けるか
 * 1 - 付ける, 0 - 付けない
 * @default 0
 * @type number
 * 
 * @param Fit Line Color To Frame
 * @desc スキル間の線の色を枠の色に合わせるか
 * 1 - 合わせる, 0 - 合わせない
 * @default 1
 * @type number
 * 
 * @param --スキルツリーウィンドウの設定(Skill Tree Window)--
 * @default 
 *
 * @param Skill Tree Max Cols
 * @desc スキルを横に並べられる数
 * @default 5
 * @type number
 * 
 * @param Skill Tree Height Space
 * @desc スキルツリーの縦のスキル間隔
 * @default 24
 * @type number
 * 
 * @param --スキル説明ウィンドウの設定(Skill Status Window)--
 * @default 
 * 
 * @param Skill Status Title Format
 * @desc タイトルの表示内容を文字列で記述します。
 * %1 - アクター名, %2 - スキル名
 * @default \c[16][%2]のスキル情報
 * 
 * @param Adjust Skill Desc Width
 * @desc 説明文に制御文字が使えなくなる代わりに枠内に自動で納まるように調整する。(0 - 無効, 1 - 有効)
 * @default 0
 * @type number
 * 
 * @param Prioritize Skill Desc
 * @desc <STS DESC>の設定を、FTKR_SkillExpansionの設定よりも優先させる。
 * @default false
 * @type boolean
 * @on 優先する
 * @off 優先しない
 * 
 * @param --コストウィンドウの設定(Cost Window)--
 * @default 
 *
 * @param Cost Title Format
 * @desc コストタイトルの表示内容を文字列で記述します。
 * @default \c[16]習得コスト：
 *
 * @param Cost Item Format
 * @desc コスト名の表示内容を文字列で記述します。
 *  %1 - コスト名
 * @default %1
 *
 * @param Cost Number Format
 * @desc コスト数値の表示内容を'色番号,文字列'で記述します。
 *  %1 - コスト数値, %2 - コストの手持ち量
 * @default 17,%1(%2)
 *
 * @param Cost Number Width
 * @desc コスト数値の表示幅を指定します。(pixel単位)
 * 0 - 指定しない
 * @default 0
 * @type number
 *
 * @param Cost Max Count Format
 * @desc 最大習得次数に達した場合のコスト数値の表示内容を記述します。
 * @default 
 *
 * @param --前提スキルウィンドウの設定(Pre Skill Window)--
 * @default 
 *
 * @param Preskill Title Format
 * @desc 前提スキルタイトルの表示内容を文字列で記述します。
 * @default \c[16]前提スキル：
 *
 * @param Preskill Item Format
 * @desc 前提スキルの表示内容を文字列で記述します。
 *  %1 - 前提スキル名
 * @default %1
 *
 * @param --確認ウィンドウの設定(Confirmation Window)--
 * @default 
 *
 * @param Conf Title Format
 * @desc スキル習得実行時の確認内容を記述します。
 *  %1 - アクター名, %2 - スキル名
 * @default スキル習得の確認
 * 
 * @param Confirmation Ok Format
 * @desc 確認コマンドの「実行する」の表示内容を記述します。
 * @default 実行する
 *
 * @param Confirmation Cancel Format
 * @desc 確認コマンドの「実行しない」の表示内容を記述します。
 * @default 実行しない
 *
 * @param --習得時のSEの設定(Learned SE)--
 * @default 
 * 
 * @param Learn SE Name
 * @desc スキル習得実行時に鳴らすSEの名前を指定します。
 * @default Sound2
 * @require 1
 * @type file
 * @dir audio/se
 *
 * @param Learn SE Volume
 * @desc スキル習得実行時に鳴らすSEの音量を指定します。
 * @default 90
 * @max 100
 * @type number
 *
 * @param Learn SE Pitch
 * @desc スキル習得実行時に鳴らすSEのピッチを指定します。
 * @default 100
 * @min 50
 * @max 150
 * @type number
 *
 * @param Learn SE Pan
 * @desc スキル習得実行時に鳴らすSEの位相を指定します。
 * @default 0
 * @min -100
 * @max 100
 * @type number
 *
 * @param --コストアイコンの設定(Cost Icon)--
 * @default 
 * 
 * @param Cost Gold Icon
 * @desc コストをお金に設定した場合に表示するアイコンを指定します。
 * @default 297
 * @type number
 *
 * @param Cost Variables Icon
 * @desc コストを変数に設定した場合に表示するアイコンを指定します。
 * @default 294
 * @type number
 *
 * @param --ステータスの表示設定(Actor Status Layout)--
 * @desc この項目を有効にするためには、FTKR_CustomSimpleActorStatus.jsが必要です。
 * 
 * @param Actor Status Text1
 * @desc Text1部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default face
 * 
 * @param Actor Status Text2
 * @desc Text2部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default name,level,sp
 * 
 * @param Actor Status Text3
 * @desc Text3部に表示するステータスを指定します。
 * 詳細はヘルプ参照
 * @default 
 * 
 * @param Actor Status Space
 * @desc 各Textの間隔を指定します。
 * @default 0,0,0,0
 * 
 * @param Actor Status Space In Text
 * @desc Text内で複数表示する場合の間隔を指定します。
 * @default 0
 * @type number
 * 
 * @param Actor Status Width Rate
 * @desc Text1~Text3の表示幅の比率を指定します。
 * 詳細はヘルプ参照
 * @default 3,2,0
 *
 * @param --枠の表示設定(Frame Setting)--
 * @desc この項目を有効にするためには、FTKR_DisplayCommandFrame.jsが必要です。
 * 
 * @param Skill Frame Type
 * @desc スキル枠の表示タイプを設定します
 * 0 - 非表示, 1 ~ 7 - ヘルプ参照
 * @default 1
 * @type number
 * 
 * @param Count Frame Type
 * @desc スキルスキルカウント枠のタイプを設定します
 * 0 - 非表示, 1 ~ 7 - ヘルプ参照
 * @default 1
 * @type number
 * 
 * @param Default Frame Image Index
 * @desc スキルスキルカウント枠に使用する画像番号を設定します
 * <Count Frame Type>で3～5に設定する必要有り
 * @default 
 * @type number
 * 
 * @param Display Tree Type Frame
 * @desc ツリータイプに枠を表示するか
 * (0 - 非表示, 1 - 表示)
 * @default 0
 * @type number
 * 
 * @help
 *-----------------------------------------------------------------------------
 * 概要
 *-----------------------------------------------------------------------------
 * 本プラグインは、ツリー型のスキル習得システムを実装するプラグインです。
 *
 * 1.本プラグインにより、スキル習得システムの専用画面を表示し、
 *   視覚的にスキルを習得することができるようになります。
 * 
 *   専用画面は、以下の方法で表示できます。
 *   a. プラグインパラメータ<Show Skill Command>が 1 の時に
 *      メニュー画面のコマンドから表示 
 *   b. プラグインコマンド<STS Open>または<STS スキルツリー画面表示>を実行
 * 
 * 
 * 2.アクター毎にスキル習得時に使用できるスキルポイント(SP)を実装します。
 * 
 * 
 * プラグインの使い方は、以下のHPを参照してください。
 * https://github.com/futokoro/RPGMaker/blob/master/FTKR_SkillTreeSystem.ja.md
 * 
 * 
 * このプラグインは、コアスクリプトv1.5.0以降専用です。
 * 
 * 
 *-----------------------------------------------------------------------------
 * 設定方法/PluginManager Setting
 *-----------------------------------------------------------------------------
 * 1. プラグインパラメータ<Skill Tree Id>に、スキルツリーを設定する
 *    武器タイプIDを設定してください。
 * 
 *    In the plugin parameter <Skill Tree Id>, Set weapon type ID for
 *    skill tree.
 * 
 * 
 * 2. アクターステータスウィンドウの表示レイアウトを変更したい場合は、
 *    FTKR_CustomSimpleActorStatus.js が必要です。
 * 
 *    If you want to change the Actor Status Layout,
 *    FTKR_CustomSimpleActorStatus.js is required.
 *
 * 
 * 3. スキルツリーやスキルの枠の表示タイプを変更したい場合は、
 *    FTKR_DisplayCommandFrame.js が必要です。
 * 
 *    If you want to change the Skill Frame Type and more,
 *    FTKR_DisplayCommandFrame.js is required.
 * 
 * 
 * 4. 以下のプラグインと組み合わせて使用する場合には、
 *    プラグイン管理画面上の順番を守ってください。
 * 
 *    FTKR_SkillExpansion.js
 *    FTKR_SkillTreeSystem.js(このプラグイン/This)
 * 
 * 
 *-----------------------------------------------------------------------------
 * 本プラグインのライセンスについて(License)
 *-----------------------------------------------------------------------------
 * 本プラグインはMITライセンスのもとで公開しています。
 * This plugin is released under the MIT License.
 * 
 * Copyright (c) 2017,2018 Futokoro
 * http://opensource.org/licenses/mit-license.php
 * 
 * 
 * プラグイン公開元
 * https://github.com/futokoro/RPGMaker/blob/master/README.md
 * 
 * 
 *-----------------------------------------------------------------------------
 * 変更来歴
 *-----------------------------------------------------------------------------
 * 
 * v1.18.1 - 2019/04/22 : 不具合修正
 *    1. FTKR_CustomSimpleActorStatusと組み合わせた時に、Cursor Line Number の設定が
 *       反映されない不具合を修正。
 * 
 * v1.18.0 - 2019/04/13 : 機能追加
 *    1. 習得次数ごとに別のスキルを習得させる機能を追加。
 *    2. プラグインパラメータ Draw Line Type に、スキル間の線を非表示にする機能を追加。
 * 
 * v1.17.1 - 2019/02/24 : 不具合修正
 *    1. プラグインパラメータ Enable Class Sp を有効にするとエラーになる不具合を修正。
 * 
 * v1.17.0 - 2018/12/30 : 機能追加
 *    1. 取得可能なSPに最大値を設定する機能を追加。
 * 
 * v1.16.2 - 2018/09/07 : 機能追加
 *    1. 最大習得次数に達した時にコスト数値の表示内容を変更できる機能を追加。
 * 
 * v1.16.1 - 2018/09/04 : 不具合修正(v1.16.0)
 * 
 * v1.16.0 - 2018/09/04 : 機能追加
 *    1. プラグインパラメータ Cost Title Format と Preskill Title Format の値を
 *       空欄にした場合に、それぞれのウィンドウ上のコストや前提スキルの表示位置を
 *       一段上げるように修正。
 *    2. 拡張プラグインの修正に合わせてリファクタリング。
 * 
 * v1.15.13 - 2018/08/26 : 不具合修正、機能追加
 *    1. FTKR_SkillExpansionと組み合わせている場合に、スキルツリー画面の
 *       スキル説明文が正しく表示できない不具合を修正。
 *    2. FTKR_SkillExpansionと組み合わせていても、スキルツリー側の説明文の
 *       設定を優先して表示する機能を追加。
 * 
 * v1.15.12 - 2018/08/16 : 不具合修正
 *    1. プラグイン適用前のセーブデータを使用した時に画面表示時に
 *       エラーになる不具合を修正。
 * 
 * v1.15.11 - 2018/08/03 : 不具合修正
 *    1. 習得したスキルを忘れさせ再度習得した場合に、ツリーをリセットしても
 *       使用したコストが正しく戻らない不具合を修正。
 * 
 * v1.15.10 - 2018/07/16 : 処理見直し
 *    1. SPの計算処理を見直し。
 *    2. ヘルプの設定方法にFTKR_SkillExpansion.jsを追加。
 * 
 * v1.15.9 - 2018/05/04 : 機能追加
 *    1. 習得次数を取得するスクリプトを追加。(しぐれんさん案)
 * 
 * v1.15.8 - 2018/05/03 : 不具合修正
 *    1. プラグインコマンドが認識しない不具合を修正。
 * 
 * v1.15.7 - 2018/04/30 : 不具合修正
 *    1. メニュー画面に戻る時のフリーズバグの暫定対処見直し。
 * 
 * v1.15.6 - 2018/04/29 : 不具合修正
 *    1. メニュー画面に戻る時のフリーズバグの暫定対処を追加。
 * 
 * v1.15.5 - 2018/04/23 : 仕様変更
 *    1. 他プラグインとの競合回避のため、Scene_STSクラスの継承元を
 *       Scene_MenuBaseに変更
 * 
 * v1.15.4 - 2018/04/18 : 不具合修正
 *    1. スキルの表示条件が反映されない不具合を修正。
 * 
 * v1.15.3 - 2018/04/16 : 仕様変更
 *    1. 他プラグインとの競合回避のため、関数名を変更。
 * 
 * v1.15.2 - 2018/04/03 : エラー判定処理追加、ヘルプに注釈追加
 * 
 * v1.15.1 - 2018/03/25 : 不具合修正
 *    1. FTKR_ExItemConfig_ItemBasic.js未適用時にエラーになる不具合を修正。
 * 
 * v1.15.0 - 2018/03/09 : 機能追加
 *    1. FTKR_ExItemConfig_ItemBasic.jsに対応。
 * 
 * v1.14.0 - 2018/02/22 : 機能追加、不具合修正
 *    1. 職業毎に個別のSPをもてる機能を追加。
 *    2. スキル習得時に他のスキルを忘れさせた場合、ツリーをリセットしても
 *       使用したコストが戻らない不具合を修正。
 * 
 * v1.13.0 - 2018/02/13 : 機能追加
 *    1. スキルを習得した時に、他のスキルを忘れさせる機能を追加。
 * 
 * v1.12.0 - 2017/12/20 : 機能追加
 *    1. スキルのデータを表示する制御文字を追加。
 *    2. スキル習得画面の説明文を、スキル使用時の説明文と変える機能を追加。
 * 
 * v1.11.4 - 2017/11/04 : 不具合修正
 *    1. プラグイン適用前のセーブデータを使用した時に
 *       レベルアップ等でスキルを習得した際に発生するエラーを回避する処理を追加。
 * 
 * v1.11.3 - 2017/10/21 : 不具合修正
 *    1. FTKR_SkillUpgradeSystemとの競合回避。
 * 
 * v1.11.2 - 2017/10/10 : 不具合修正
 *    1. リセット実行時にエラーで止まる不具合を修正。
 * 
 * v1.11.1 - 2017/10/09 : 不具合修正
 *    1. リセット実行時にエラーで止まる不具合を修正。
 * 
 * v1.11.0 - 2017/10/09 : 機能追加、不具合修正
 *    1. スキルツリーリセット時に、コストとして消費したSP以外のアイテムや
 *       お金等も戻るように変更。
 *    2. コストに設定したお金が反映されない不具合を修正。
 * 
 * v1.10.0 - 2017/08/22 : 機能追加
 *    1. スキルツリーの起点スキルに対して行を指定して登録する機能を追加。
 * 
 * v1.9.0 - 2017/07/25 : 機能追加
 *    1. コアスクリプトv1.5.0以前にも仮対応。⇒v1.15.2で削除
 *    2. プラグインパラメータに@type適用
 *    3. 一部記述見直し
 * 
 * v1.8.3 - 2017/07/21 : 不具合修正
 *    1. v1.8.2の変更に対する不具合修正
 * 
 * v1.8.2 - 2017/07/21 : 他プラグインとの競合回避
 *    1. 描画関係の関数名を変更。
 * 
 * v1.8.1 - 2017/06/11 : 不具合修正
 *    1. ツリーリセットを繰り返すと通常よりも多くSPが戻る不具合を修正。
 * 
 * v1.8.0 - 2017/06/09 : コアスクリプトv1.5.0の対応
 * 
 * v1.7.6 - 2017/06/05 : 不具合修正
 *    1. 消費コストの表示が正しく反映されない不具合を修正。
 *    1. ツリーリセット時に通常よりも多くSPが戻る不具合を修正。
 * 
 * v1.7.5 - 2017/06/03 : 不具合修正
 *    1. ツリーリセット時に複数回習得させた分のSPが戻らない不具合を修正。
 * 
 * v1.7.4 - 2017/05/24 : ヘルプ修正
 * 
 * v1.7.3 - 2017/05/18 : 不具合修正
 *    1. 横方向の位置を調整する機能の不具合を修正。
 * 
 * v1.7.2 - 2017/05/13 : 機能追加
 *    1. 戦闘終了時にSP獲得メッセージを表示する機能を追加。
 * 
 * v1.7.1 - 2017/05/12 : 機能追加
 *    1. 縦の表示位置を変更する機能に横方向の位置を調整する機能を追加。
 *    2. カギ線の表示タイプを追加。
 * 
 * v1.7.0 - 2017/05/09 : 機能追加
 *    1. スキルのスキルツリー上の縦の表示位置を変更する機能を追加。
 * 
 * v1.6.7 - 2017/05/05 : 不具合修正
 *    1. スキルツリーの空欄設定が反映されない不具合を修正。
 * 
 * v1.6.6 - 2017/05/05 : 機能追加
 *    1. 説明文とコスト数値の幅調整機能を追加。
 * 
 * v1.6.5 - 2017/04/29 : 機能追加
 *    1. 計算式(eval)にセルフ変数を使用できるように見直し。
 * 
 * v1.6.4 - 2017/04/18 : 不具合修正、機能追加
 *    1. stsCount()を計算式に入れたスキルを敵が使うと正しく計算できない
 *       不具合を修正。
 *    2. スキルの表示条件を設定する機能を追加。
 * 
 * v1.6.3 - 2017/04/07 : 機能追加、ヘルプファイルと合体。
 *    1. タグに日本語表記版を追加。
 *    2. FTKR_SkillTreeSystem_helpの内容を追記。
 *    3. 習得コストと前提スキルウィンドウの常時表示設定の変更機能を削除。
 * 
 * v1.6.2 - 2017/04/02 : 不具合修正、機能追加
 *    1. レベルアップ時に入手するSPが正しく加算されない不具合を修正。
 *    2. ツリーリセット時にSPが戻る機能が正しく動作していない不具合を修正。
 *    3. スキルツリーを追加・削除するプラグインコマンドを追加。
 * 
 * v1.6.1 - 2017/04/01 : ヘルプ修正
 * 
 * v1.6.0 - 2017/03/31 : 仕様変更、機能追加
 *    1. FTKR_SkillExpansion.jsとFTKR_SEP_ShowSkillStatus.jsに移していた
 *       処理を見直し。プラグイン単独で動作可能なように変更。
 *    2. ウィンドウレイアウトの変更機能を削除。
 *    3. FTKR_DisplayCommandFrame.js がない場合でも、枠線を表示できるように
 *       変更。
 *    4. 専用の制御文字を使用する機能を削除、MV標準の制御文字を使用できる
 *       ように変更。
 *    5. 指定したテキスト幅n内に文章strを表示する制御文字\LW[n,str]を追加。
 *    6. スキルの複数回習得のデータ保存をFTKR_SkillExpansion.jsに
 *       依存しない方式に変更。
 *    7. スキルの実行処理部に例外処理を追加。
 *    8. プラグインコマンドに、スキル習得コマンドおよび日本語表記を追加。
 *    9. ヘルプ修正,、ライセンス表記変更
 * 
 * v1.5.0 - 2017/03/24 : 仕様変更、機能追加
 *    1. FTKR_SkillExpansion.js v1.3.0 に合わせて処理を見直し。
 *    2. FTKR_CustomSimpleActorStatus.js がない場合でも、アクター名、
 *       レベル、SP量を表示するように変更。
 *    3. FTKR_DisplayCommandFrame.js がない場合に、枠表示機能が無効になる
 *       ように変更。
 * 
 * v1.4.0 - 2017/03/18 : 仕様変更(不具合修正)
 *    1. FTKR_CustomSimpleActorStatus.js v1.1.0 に合わせて
 *       プラグインパラメータを見直し。
 * 
 * v1.3.1 - 2017/03/18 : 処理追加
 *    1. FTKR_SkillExpansion.js v1.2.2に合わせて処理を追加。
 * 
 * v1.3.0 - 2017/03/16 : 仕様変更、機能追加
 *    1. FTKR_SEP_ShowSkillStatus.js v1.3.0 に合わせて処理を見直し。
 *    2. 習得コストの値にjs計算式を使用できる機能を追加。
 *    3. スキルの習得条件に、他のスキルの習得次数を設定できる機能を追加。
 *    4. スキルを削除した時に習得次数をリセットしない機能を追加。
 *    5. 前提スキルの有無の判定を、習得したことがあるかないかに変更。
 * 
 * v1.2.0 - 2017/03/10 : 仕様変更、機能追加、誤記修正
 *    1. アクターのステータス表示を、FTKR_CustomSimpleActorStatus.jsの
 *       方式に変更。
 *    2. 枠の表示処理を、FTKR_DisplayCommandFrame.jsから読み取る方式に変更。
 *    3. 確認ウィンドウの設定を、本プラグインの設定で上書きできるように変更。
 *    4. 誤記修正
 * 
 * v1.1.4 - 2017/03/07 : 不具合修正、機能追加
 *    1. スキルリセット時にSPが不正な値になる不具合を修正。
 *    2. スキルの習得コストに武器と防具を追加。
 *    3. スキル習得のための前提スキルを表示するウィンドウを追加。
 * 
 * v1.1.3 - 2017/03/05 : 不具合修正
 *    1. スキルの習得コストの情報を読み取るときに、例外処理が抜けていた
 *       不具合を修正。
 * 
 * v1.1.2 - 2017/03/05 : 不具合修正
 *    1. 画像表示時にエラーになる不具合修正。
 * 
 * v1.1.1 - 2017/03/05 : 機能追加、仕様変更
 *    1. ツリータイプ枠に画像を使用できる機能を追加。
 *    2. カーソルと重なっている時に枠画像を別の画像に変更する機能を追加。
 *    3. スキルツリー別に派生スキルを設定できる機能を追加。
 *    4. スキル習得時に、アクターIDとスキルIDを指定した変数に格納する機能を追加。
 *    5. スキル枠画像の表示設定で、スキルタイプと属性による画像変更機能を削除。
 *    6. ヘルプを別ファイルに移動。
 * 
 * v1.1.0 - 2017/03/03 : 機能追加
 *    1. ウィンドウサイズや位置を変更できる機能を追加。
 *    2. ウィンドウに背景画像を表示できる機能を追加。
 *    3. ツリーのスキル枠のサイズや位置、表示テキストなどを変更できる
 *       機能を追加。
 *    4. スキル枠やスキルカウント枠に画像を使用できる機能を追加。
 *    5. SPコストが0の場合に非表示にできる機能を追加。
 *    6. アクターステータスウィンドウの表示内容を変更できる機能を追加。
 *    7. プラグイン内の一部の関数をFTKR_SEP_ShowSkillStatus.jsに移動。
 *    8. ヘルプの記載内容を見直し。
 * 
 * v1.0.4 - 2017/03/02 : 不具合修正
 *    1. ゲーム開始時に、SPとスキルの習得次数がリセットする不具合を修正。
 * 
 * v1.0.3 - 2017/02/28 : 機能追加
 *    1. スキル習得状態と消費したSPをリセットするプラグインコマンドと
 *       アイテム用のタグを追加。
 *    2. アクターとクラス用のタグを変更。
 *    3. 初期状態で習得済みのスキルに対しても習得次数を反映するように修正。
 * 
 * v1.0.2 - 2017/02/26 : 機能追加
 *    1. スキル間の線の色を、スキル枠の色に合わせられる機能を追加。
 *    2. FTKR_SkillExpansion.jsと組み合わせることで、スキルを複数回
 *       習得させることができる機能を追加。
 *    3. プラグインコマンド<STS Get Sp() Actor()>を
 *       <STS Add Sp() Actor()>に変更。
 * 
 * v1.0.1 - 2017/02/26 : 機能追加
 *    1. レベルアップ以外で、SPを取得できる機能を追加。
 * 
 * v1.0.0 - 2017/02/25 : 初版作成
 * 
 *-----------------------------------------------------------------------------
 */
//=============================================================================

function Window_TreeType() {
  this.initialize.apply(this, arguments);
}

function Window_SkillTree() {
  this.initialize.apply(this, arguments);
}

function Window_StsSkillStatus() {
  this.initialize.apply(this, arguments);
}

function Window_StsConfTitle() {
  this.initialize.apply(this, arguments);
}

function Window_StsConf() {
  this.initialize.apply(this, arguments);
}

function Window_StsCost() {
  this.initialize.apply(this, arguments);
}

function Window_StsPreskill() {
  this.initialize.apply(this, arguments);
}

function Window_StsActorStatus() {
  this.initialize.apply(this, arguments);
}

function Scene_STS() {
  this.initialize.apply(this, arguments);
}

(function() {

    var paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    var paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_SkillTreeSystem');

    FTKR.STS = {
        //必須設定
        skillTreeId       : Number(parameters['Skill Tree Id'] || 0),

        //基本設定
        showCommand       : Number(parameters['Show Skill Command'] || 0),
        commandName       : String(parameters['Command Name'] || '学习技能'),
        menuSwitchId      : Number(parameters['Skill Menu Switch ID'] || 0),
        enableConf        : Number(parameters['Enable Confirmation'] || 0),
        learnedActorVarID : Number(parameters['Learned Actor Var ID'] || 0),
        learnedSkillVarID : Number(parameters['Learned Skill Var ID'] || 0),
        resetWhenForgottenSkill : Number(parameters['Reset When Forgotten Skill'] || 0),

        //習得次数の設定
        enableSkillCount  : Number(parameters['Enabled Skill Count'] || 0),
        defaultMaxCount   : Number(parameters['Default Max Count'] || 0),
        skillLearnedIcon  : Number(parameters['Skill Learned Icon'] || 0)
    };

    //スキルポイント関係
    FTKR.STS.sp = {
        dispName     :String(parameters['SP Display Name'] || 'SP'),
        defaultMaxSp :Number(parameters['Default Max Sp'] || 0),
        defaultReq   :String(parameters['Default Required SP'] || ''),
        getLevelUp   :String(parameters['Get Level Up Sp'] || ''),
        icon         :Number(parameters['Cost Sp Icon'] || 0),
        hideCost0    :Number(parameters['Hide Sp Cost 0'] || 0),
        format       :String(parameters['Display Get Sp'] || ''),
        enableClassSp:(paramParse(parameters['Enable Class Sp']) || false),
    };

    //スキル枠
    FTKR.STS.sFrame = {
        type:Number(parameters['Skill Frame Type'] || 0),
        enabled:Number(parameters['Enabled Skill Frame'] || 0),
        width:Number(parameters['Skill Frame Width'] || 0),
        height:Number(parameters['Skill Frame Height'] || 0),
        icon:{
            offsetX:Number(parameters['Skill Icon Offset X'] || 0),
            offsetY:Number(parameters['Skill Icon Offset Y'] || 0)
        },
        text:{
            format:String(parameters['Skill Name Format'] || ''),
            offsetX:Number(parameters['Skill Text Offset X'] || 0),
            offsetY:Number(parameters['Skill Text Offset Y'] || 0)
        },
        color:{
            isLearned:Number(parameters['Frame Color isLearned'] || 0),
            isLearnOk:Number(parameters['Frame Color isLearn OK'] || 0),
            isReqSkillNg:Number(parameters['Frame Color isReqSkill NG'] || 0),
            isReqNg:Number(parameters['Frame Color isRequired NG'] || 0)
        },
    };

    //スキルカウント枠
    FTKR.STS.cFrame = {
        type:Number(parameters['Count Frame Type'] || 0),
        defIndex:Number(parameters['Default Frame Image Index'] || 0),
        enabled:Number(parameters['Draw Count Frame'] || 0),
        width:Number(parameters['Count Frame Width'] || 0),
        height:Number(parameters['Count Frame Height'] || 0),
        thick:Number(parameters['Count Frame Thick'] || 0),
        offsetX:Number(parameters['Count Frame Offset X'] || 0),
        offsetY:Number(parameters['Count Frame Offset Y'] || 0),
        format:String(parameters['Count Frame Format'] || ''),
        count:{
            offsetX:Number(parameters['Skill Count Offset X'] || 0),
            offsetY:Number(parameters['Skill Count Offset Y'] || 0),
        },
    };

    //ツリーの設定
    FTKR.STS.drawStsLineType = Number(parameters['Draw Line Type'] || 0);
    FTKR.STS.treeLineThick = Number(parameters['Tree Line Thick'] || 0);
    FTKR.STS.addFrameToLine = Number(parameters['Add Frame To Line'] || 0);
    FTKR.STS.lineColor = Number(parameters['Fit Line Color To Frame'] || 0);

    //アクターステータスウィンドウ設定
    FTKR.STS.actorStatus = {
        text1:String(parameters['Actor Status Text1'] || ''),
        text2:String(parameters['Actor Status Text2'] || ''),
        text3:String(parameters['Actor Status Text3'] || ''),
        space:String(parameters['Actor Status Space'] || ''),
        spaceIn:Number(parameters['Actor Status Space In Text'] || 0),
        widthRate:String(parameters['Actor Status Width Rate'] || ''),
    };
    //スキルステータスウィンドウ設定
    FTKR.STS.skillStatus = {
        titleFormat     :String(parameters['Skill Status Title Format'] || ''),
        adjustWidth     :Number(parameters['Adjust Skill Desc Width'] || 0),
        prioritizeDesc  :paramParse(parameters['Prioritize Skill Desc'] || false),
    };
    //ツリータイプウィンドウ設定
    FTKR.STS.treeTypes = {
        enabled:Number(parameters['Display Tree Type Frame'] || 0),
    };
    //コストウィンドウ設定
    FTKR.STS.cost = {
        titleFormat :String(parameters['Cost Title Format'] || ''),
        itemFormat  :String(parameters['Cost Item Format'] || ''),
        numberFormat:String(parameters['Cost Number Format'] || ''),
        numberWidth :Number(parameters['Cost Number Width'] || 0),
        maxFormat   :String(parameters['Cost Max Count Format'] || ''),
    };
    //スキルツリーウィンドウ設定
    FTKR.STS.skillTree = {
        maxCols:Number(parameters['Skill Tree Max Cols'] || 0),
        heightSpace:Number(parameters['Skill Tree Height Space'] || 0),
    };
    //前提スキルウィンドウ設定
    FTKR.STS.preskill = {
        titleFormat:String(parameters['Preskill Title Format'] || ''),
        itemFormat:String(parameters['Preskill Item Format'] || ''),
    };

    //確認ウィンドウ設定
    FTKR.STS.conf = {
      titleformat:String(parameters['Conf Title Format'] || ''),
      okFormat:String(parameters['Confirmation Ok Format'] || ''),
      cancelFormat:String(parameters['Confirmation Cancel Format'] || ''),
    };

    //SE
    FTKR.STS.stsSe = {
      name:String(parameters['Learn SE Name'] || 'Sound2'),
      volume:Number(parameters['Learn SE Volume'] || 0),
      pitch:Number(parameters['Learn SE Pitch'] || 100),
      pan:Number(parameters['Learn SE Pan'] || 0),
    };

    //コストアイコン
    FTKR.STS.icon = {
      gold:Number(parameters['Cost Gold Icon'] || 0),
      var:Number(parameters['Cost Variables Icon'] || 0),
    };

    FTKR.STS.MAX_DEVSKILL_COUNT = 20;

    Game_Action.EFFECT_GET_SP = 999;
    Game_Action.EFFECT_RESET_TREE = 998;
    Game_Action.EFFECT_CLEAR_TREE = 997;


    if (!Window_Base.prototype.reserveFaceImages) {
        console.error('プロジェクトのコアスクリプトを最新版(v1.5.0以降)にアップデートしてください。');
        console.error('Update core scripts of your project to the latest version (v1.5.0 or later).');
        return;
    }

    var current = (function() {
        if (document.currentScript) {
            return document.currentScript.src;
        } else {
            var scripts = document.getElementsByTagName('script'),
            script = scripts[scripts.length-1];
            if (script.src) {
                return script.src;
            }
        }
    })();
    var filename = current ? current.substring(current.lastIndexOf('/')+1, current.length) : '';
    if (filename !== 'FTKR_SkillTreeSystem.js') {
        console.error('スキルツリープラグインのファイル名が間違っています。「FTKR_SkillTreeSystem.js」に直してください。');
        console.error('The file name of SkillTree-plugin is incorrect. Change to "FTKR_SkillTreeSystem.js".');
        return;
    }

    if (!FTKR.STS.skillTreeId) {
        console.error('プラグインパラメータ<Skill Tree Id>を設定してください。');
        console.error('Set the plugin parameter <Skill Tree Id>.');
        return;
    }
    
    //objのメモ欄から <metacode: x> の値を読み取って返す
    var readObjectMeta = function(obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function(metacode){
            var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        }); 
        return match ? match[1] : '';
    };

    //引数の要素の中の重複部分を削除する。
    var duplicateDelete = function(list) {
        var newlist = list.filter( function(x, i, self) {
            return self.indexOf(x) === i;
        });
        return newlist;
    };

    //=============================================================================
    // 自作関数(グローバル)
    //=============================================================================

    FTKR.gameData = FTKR.gameData || {
        user   :null,
        target :null,
        item   :null,
        number :0,
    };

    if (!FTKR.setGameData) {
    FTKR.setGameData = function(user, target, item, number) {
        FTKR.gameData = {
            user   :user || null,
            target :target || null,
            item   :item || null,
            number :number || 0
        };
    };
    }

    if (!FTKR.evalFormula) {
    FTKR.evalFormula = function(formula, classObj) {
        var datas = FTKR.gameData;
        try {
            var s = $gameSwitches._data;
            var v = $gameVariables._data;
            var a = datas.user;
            var b = datas.target;
            var item   = datas.item;
            var number = datas.number;
            if (b) var result = b.result();
            var value = eval(formula);
            if (isNaN(value)) value = 0;
            return value;
        } catch (e) {
            console.error(e);
            return 0;
        }
    };
    }

    //=============================================================================
    // Bitmap
    //=============================================================================

    //座標(x1,y1)から座標(x2,y2)までの線を引く
    Bitmap.prototype.drawStsLine = function(x1, y1, x2, y2, color, thick) {
        var context = this._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
        this._setDirty();
    };

    //枠線を描く
    Bitmap.prototype.drawStsFrame = function(x, y, width, height, thick, color) {
        var context = this._context;
        context.strokeStyle = color;
        context.lineWidth = thick;
        context.strokeRect(x + thick/2, y + thick/2, width - thick, height - thick);
        this._setDirty();
    };

    //=============================================================================
    // Array
    //=============================================================================

    //重複した要素を除いて、Array配列にlist配列の要素を加える。
    Array.prototype.addExceptForDup = function(list) {
        list.forEach( function(item) {
            if (item === null || !this.contains(item)) this.push(item);
        },this);
    };

    //=============================================================================
    // Math
    //=============================================================================

    /*--------------------------
    a,b 二つの値の大小を比較して、
    a > b なら +1
    a < b なら -1
    それ以外の結果なら 0 を返す
    --------------------------*/
    Math.code = function(a, b) {
      if (a > b) {
        return +1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    };

    //=============================================================================
    // BattleManager
    //=============================================================================

    var _STS_BattleManager_makeRewards = BattleManager.makeRewards;
    BattleManager.makeRewards = function() {
        _STS_BattleManager_makeRewards.call(this);
        this._rewards.stsSps = $gameTroop.stsSpTotal();
    };

    var _STS_BattleManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function() {
        _STS_BattleManager_gainRewards.call(this);
        this.gainStsSp();
    };

    BattleManager.gainStsSp = function() {
        var sp = this._rewards.stsSps;
        $gameParty.allMembers().forEach(function(actor) {
            actor.getSp(sp);
        });
    };

    var _STS_BattleManager_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function() {
        _STS_BattleManager_displayRewards.call(this);
        this.displayStsSp();
    };

    BattleManager.displayStsSp = function() {
        var sp = this._rewards.stsSps;
        if (sp > 0) {
            var text = FTKR.STS.sp.format.format(sp, FTKR.STS.sp.dispName);
            if (text) $gameMessage.add('\\.' + text);
        }
    };

    //=============================================================================
    // DataManager
    //=============================================================================

    var _STS_DatabaseLoaded = false;
    var _STS_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_STS_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!_STS_DatabaseLoaded) {
            this.stsTreeListNotetags($dataActors);
            this.stsTreeListNotetags($dataClasses);
            this.stsItemGetSpNotetags($dataItems);
            this.stsTreeDataNotetags($dataWeapons);
            this.stsTreeDataNotetags($dataSkills);
            _STS_DatabaseLoaded = true;
        }
        return true;
    };

    DataManager.stsTreeListNotetags = function(group) {
        var note1a = /<(?:SET STS DATA)>/i;
        var note1b = /<\/(?:SET STS DATA)>/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            var setMode = 'none';
            obj.sts = {
                data:'',
                treeTypes:[],
                initsp:0,
                msp:0
            };
            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (note1a.test(line)) {
                    var text = '';
                    setMode = 'data';
                } else if (note1b.test(line)) {
                    setMode = 'none';
                    obj.sts.data = text;
                } else if (setMode === 'data') {
                    text += line + ';';
                }
            }
            this.setStsActorData(obj);
        }
    };

    DataManager.setStsActorData = function(obj) {
        var stsdata = obj.sts.data;
        if (stsdata) {
            var case1 = /(?:INIT SP):[ ]*(\d+)/i;
            var case1j = /初期 SP:[ ]*(\d+)/i;
            var case2 = /(?:TREETYPE):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case2j = /ツリータイプ:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case3 = /(?:MAX SP):[ ]*(\d+)/i;
            var case3j = /最大 SP:[ ]*(\d+)/i;

            var datas = stsdata.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if(data.match(case1) || data.match(case1j)) {
                    obj.sts.initsp = Number(RegExp.$1);
                } else if(data.match(case2) || data.match(case2j)) {
                    var tTypeIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                    tTypeIds.forEach( function(tTypeId) {
                        var item = $dataWeapons[tTypeId];
                        if (item && item.wtypeId === FTKR.STS.skillTreeId) {
                            obj.sts.treeTypes.push(tTypeId);
                        }
                    });
                } else if(data.match(case3) || data.match(case3j)) {
                    obj.sts.msp = Number(RegExp.$1);
                }
            }
            obj.sts.data = '';
        }
    };

    DataManager.stsItemGetSpNotetags = function(group) {
        var note1 = /<(?:STS GET SP):[ ]*(\d+)>/i;
        var note1j = /<STS SP 入手:[ ]*(\d+)>/i;
        var note2 = /<(?:STS RESET TREE)>/i;
        var note2j = /<STS 全スキルツリー リセット>/i;
        var note3 = /<(?:STS CLEAR TREE)>/i;
        var note3j = /<STS 全スキルツリー 初期化>/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1) || note1j.test(line)) {
                    obj.effects.push(this.setEffect(Game_Action.EFFECT_GET_SP, 0, Number(RegExp.$1), 0));
                } else if (note2.test(line) || note2j.test(line)) {
                    obj.effects.push(this.setEffect(Game_Action.EFFECT_RESET_TREE, 0, 0, 0));
                } else if (note3.test(line) || note3j.test(line)) {
                    obj.effects.push(this.setEffect(Game_Action.EFFECT_CLEAR_TREE, 0, 0, 0));
                }
            }
        }
    };

    DataManager.setEffect = function(code, value1, value2, dataId) {
        return {code:code, value1:value1, value2:value2, dataId:dataId};
    };

    DataManager.stsTreeDataNotetags = function(group) {
        var note1a = /<(?:SET STS DATA)>/i;
        var note1b = /<\/(?:SET STS DATA)>/i;
        var note2a = /<(?:STS DESC)>/i;
        var note2b = /<\/(?:STS DESC)>/i;

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            var setMode = 'none';
            obj.sts = {
                skillIds:[],
                tree:[{},],
                subtree:[],
                data:'',
                required:'',
                costs:[],
                maxCount:FTKR.STS.defaultMaxCount,
                pIndex:0,
                pCIndex:0,
                show:'',
                position:0,
                diffX:0,
                desc:'',
                forgetSkillIds:[],
            };
            obj.sts.costs.push(this.setCost('sp', 0, FTKR.STS.sp.defaultReq));

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (note1a.test(line)) {
                    var text = '';
                    setMode = 'data';
                } else if (note1b.test(line)) {
                    setMode = 'none';
                    obj.sts.data = text;
                } else if (note2a.test(line)) {
                    var text = '';
                    setMode = 'desc';
                } else if (note2b.test(line)) {
                    setMode = 'none';
                    obj.sts.desc = text;
                } else if (setMode === 'data') {
                    text += line + ';';
                  } else if (setMode === 'desc') {
                    text += line + '\n';
                }
            }
            this.setStsData(obj);
        }
    };

    DataManager.setCost = function(type, id, value) {
        return {type:type, id:Number(id), value:value};
    };

    DataManager.setStsData = function(obj) {
        var stsdata = obj.sts.data;
        if (stsdata) {
            var case1 = /(?:REQUIRED):[ ]*(.+)/i;
            var case1j = /習得条件:[ ]*(.+)/i;
            var case2 = /(?:COST SP):[ ]*(.+)/i;
            var case2j = /コスト SP:[ ]*(.+)/i;
            var case2a = /(?:FORGET_SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case2aj = /削除スキル:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case2b = /LEARN_SKILL[ ]*(\d+)[ ]*:[ ]*(\d+)[ ]*(.*)/i;
            var case2bj = /習得スキル[ ]*(\d+)[ ]*:[ ]*(\d+)[ ]*(.*)/i;
            var case3a = /(?:TREE)[ ](\d+)[ ](?:SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case3aj = /ツリータイプ (\d+) スキル:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case3b = /(?:SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case3bj = /スキル:[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case3c = /(?:SKILL)[ ](\d+):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case3cj = /スキル[ ](\d+):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case4 = /(?:COST ITEM\[)(\d+)\]:[ ]*(.+)/i;
            var case4j = /コスト アイテム\[(\d+)\]:[ ]*(.+)/i;
            var case4a = /(?:COST WEAPON\[)(\d+)\]:[ ]*(.+)/i;
            var case4aj = /コスト 武器\[(\d+)\]:[ ]*(.+)/i;
            var case4b = /(?:COST ARMOR\[)(\d+)\]:[ ]*(.+)/i;
            var case4bj = /コスト 防具\[(\d+)\]:[ ]*(.+)/i;
            var case5 = /(?:COST V\[)(\d+)\]:[ ]*(.+)/i;
            var case5j = /コスト V\[(\d+)\]:[ ]*(.+)/i;
            var case6 = /(?:COST GOLD):[ ]*(.+)/i;
            var case6j = /コスト 金:[ ]*(.+)/i;
            var case7 = /(?:MAX COUNT):[ ]*(\d+)/i;
            var case7j = /最大習得次数:[ ]*(\d+)/i;
            var case8 = /(?:Image INDEX):[ ]*(\d+)/i;
            var case8j = /枠画像番号:[ ]*(\d+)/i;
            var case9 = /(?:Image INDEX ON CURSOR):[ ]*(\d+)/i;
            var case9j = /カーソル枠画像番号:[ ]*(\d+)/i;
            var case10 = /(?:SHOW):[ ]*(.+)/i;
            var case10j = /表示条件:[ ]*(.+)/i;
            var case11 = /(?:POSITION):[ ]*(\d+(?:\s*,\s*\d+)*)/i;
            var case11j = /表示位置:[ ]*(\d+(?:\s*,\s*\d+)*)/i;

            var datas = stsdata.split(';');
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                if (data.match(case1) || data.match(case1j)) {
                    obj.sts.required = String(RegExp.$1);
                } else if(data.match(case2) || data.match(case2j)) {
                    obj.sts.costs[0].value = String(RegExp.$1);
                } else if (data.match(case2a) || data.match(case2aj)) {
                    obj.sts.forgetSkillIds = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                } else if (data.match(case2b) || data.match(case2bj)) {
                    if (!obj.sts.learnSkillIds) obj.sts.learnSkillIds = [];
                    var count = Number(RegExp.$1);
                    var skillId1 = Number(RegExp.$2);
                    var forget = RegExp.$3;
                    var skillId2 = forget && forget.match(/-d[ ]*(\d+)/i) ? Number(RegExp.$1) : 0;
                    obj.sts.learnSkillIds[count] = {learn:skillId1,forget:skillId2};
                } else if(data.match(case3a) || data.match(case3aj)) {
                    var treeId = RegExp.$1;
                    var tree = this.readTree(obj, RegExp.$1, RegExp.$2);
                    tree.treeId === 0 ? obj.sts.tree[0] = tree : obj.sts.tree.push(tree);
                } else if(data.match(case3b) || data.match(case3bj)) {
                    var tree = this.readTree(obj, 0, RegExp.$1);
                    obj.sts.tree[0] = tree;
                    obj.sts.skillIds = tree.skillIds;
                } else if(data.match(case3c) || data.match(case3cj)) {
                    var line = Number(RegExp.$1);
                    var tree = this.readTree(obj, 0, RegExp.$2);
                    obj.sts.subtree[line] = tree.skillIds;
                } else if(data.match(case4) || data.match(case4j)) {
                    obj.sts.costs.push(this.setCost('item', RegExp.$1, RegExp.$2));
                } else if(data.match(case4a) || data.match(case4aj)) {
                    obj.sts.costs.push(this.setCost('weapon', RegExp.$1, RegExp.$2));
                } else if(data.match(case4b) || data.match(case4bj)) {
                    obj.sts.costs.push(this.setCost('armor', RegExp.$1, RegExp.$2));
                } else if(data.match(case5) || data.match(case5j)) {
                    obj.sts.costs.push(this.setCost('var', RegExp.$1, RegExp.$2));
                } else if(data.match(case6) || data.match(case6j)) {
                    obj.sts.costs.push(this.setCost('gold', 0, RegExp.$1));
                } else if(data.match(case7) || data.match(case7j)) {
                    obj.sts.maxCount = Number(RegExp.$1);
                } else if(data.match(case8) || data.match(case8j)) {
                    obj.sts.pIndex = Number(RegExp.$1);
                } else if(data.match(case9) || data.match(case9j)) {
                    obj.sts.pCIndex = Number(RegExp.$1);
                } else if (data.match(case10) || data.match(case10j)) {
                    obj.sts.show = String(RegExp.$1);
                } else if (data.match(case11) || data.match(case11j)) {
                    var posis = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                    obj.sts.position = Number(posis[0]);
                    if (posis[1]) obj.sts.diffX = Number(posis[1]);
                }
            }
            obj.sts.data = '';
        }
    };

    DataManager.readTree = function(obj, treeId, regexp) {
        var tree = {
          treeId:Number(treeId),
          skillIds:[]
        };
        var objIds = JSON.parse('[' + regexp.match(/\d+/g) + ']');
        objIds.forEach( function(objId) {
            var item = $dataSkills[objId];
            if (!item || (obj.hasOwnProperty('stypeId') && obj.id === objId)) {
              tree.skillIds.push(null);
            } else {
              tree.skillIds.push(objId);
            }
        });
        return tree;
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    var _STS_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _STS_Game_Actor_initMembers.call(this);
        this._stsSp = 0;
        this.checkInitSts();
    };

    Game_Actor.prototype.checkInitSts = function() {
        if (!this._stsCsp) this._stsCsp = [];
        if (!this._stsLearnSkills) this._stsLearnSkills = [];
        if (!this._stsTrees) this._stsTrees = [];
        if (!this._stsCount) this._stsCount = [];
        if (!this._stsUsedSp) this._stsUsedSp = [];
        if (!this._stsUsedCsp) this._stsUsedCsp = [];
        if (!this._stsUsedItem) this._stsUsedItem = [];
        if (!this._stsUsedWeapon) this._stsUsedWeapon = [];
        if (!this._stsUsedArmor) this._stsUsedArmor = [];
        if (!this._stsUsedVar) this._stsUsedVar = [];
        if (!this._stsUsedGold) this._stsUsedGold = [];
    };

    var _STS_Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _STS_Game_Actor_setup.call(this, actorId);
        if (FTKR.STS.sp.enableClassSp) {
            $dataClasses.forEach( function(dataClass){
                if (dataClass) this.setCsp(dataClass.id, dataClass.sts.initsp);
            },this);
        } else {
            this.setAsp(this.actor().sts.initsp);
        }
    };

    var _STS_Game_Actor_initSkills = Game_Actor.prototype.initSkills;
    Game_Actor.prototype.initSkills = function() {
        this._initStsFlag = true;
        _STS_Game_Actor_initSkills.call(this);
        this._initStsFlag = false;
    };

    var _STS_Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _STS_Game_Actor_levelUp.call(this);
        FTKR.setGameData(this, null, null);
        this.getSp(this.evalStsFormula(FTKR.STS.sp.getLevelUp, 0, 0));
    };

    Game_Actor.prototype.learnCountSkill = function(skillId) {
        if (!this.isLearnedSkill(skillId)) {
            this._skills.push(skillId);
            this._skills.sort(function(a, b) {
                return a - b;
            });
        }
    };
    
    Game_Actor.prototype.forgetCountSkill = function(skillId) {
        var index = this._skills.indexOf(skillId);
        if (index >= 0) {
            this._skills.splice(index, 1);
        }
    };
    
    var _STS_Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
    Game_Actor.prototype.learnSkill = function(skillId) {
        if (!this.isStsLearnedSkill(skillId)) {
            this.setStsSkillCount(skillId, 0);
        }
        _STS_Game_Actor_learnSkill.call(this, skillId);
        this.checkInitSts();
        if (this.isLearnedSkill(skillId) && !this.stsCount(skillId)) {
            if (FTKR.STS.learnedActorVarID) $gameVariables.setValue(FTKR.STS.learnedActorVarID, this.actorId());
            if (FTKR.STS.learnedSkillVarID) $gameVariables.setValue(FTKR.STS.learnedSkillVarID, skillId);
            this.stsCountUp(skillId);
            this._stsLearnSkills[skillId] = true;
            this.checkStsForgetSkills(skillId);
        }
        if (this.stsSkill(skillId).sts.learnSkillIds) {
            var count = this.stsCount(skillId);
            var countSkillId = this.stsSkill(skillId).sts.learnSkillIds[count].learn;
            var forgetSkillId = this.stsSkill(skillId).sts.learnSkillIds[count].forget;
            if (countSkillId) {
                this.learnCountSkill(countSkillId);
            }
            if (forgetSkillId) {
                this.forgetCountSkill(forgetSkillId);
            }
        }
       if (this._initStsFlag) {
            this.stsUsedCost(skillId);
        }
    };

    Game_Actor.prototype.checkStsForgetSkills = function(skillId) {
        var skillIds = this.stsSkill(skillId).sts.forgetSkillIds;
        if (!skillIds || !skillIds.length) return;
        skillIds.forEach( function(id){
            if (!id) return;
            var sid = Number(id);
            if (FTKR.STS.enableSkillCount) {
                var skill = this.stsSkill(sid);
                this.setStsSkillCount(sid, skill.sts.maxCount);
            }
            _STS_Game_Actor_forgetSkill.call(this, sid);
        },this);
    };

    var _STS_Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
    Game_Actor.prototype.forgetSkill = function(skillId) {
        if (FTKR.STS.resetWhenForgottenSkill) {
            this.checkInitSts();
            this.resetStsSkill(skillId);
        }
        if (this.stsSkill(skillId).sts.learnSkillIds) {
            this.stsSkill(skillId).sts.learnSkillIds.forEach(function(forgetSkillId){
                if (forgetSkillId && forgetSkillId.learn) {
                    this.forgetCountSkill(forgetSkillId.learn);
                }
            },this);
        }
        _STS_Game_Actor_forgetSkill.call(this, skillId);
    };

    Game_Actor.prototype.resetStsSkill = function(skillId) {
        this.setStsSkillCount(skillId, 0);
        this._stsLearnSkills[skillId] = false;
    };

    Game_Actor.prototype.stsCount = function(skillId) {
        if (!this._stsCount) this._stsCount = [];
        return this._stsCount[skillId] || 0;
    };

    Game_Actor.prototype.isStsMaxCount = function(skillId) {
        return this.stsSkill(skillId) && this.stsCount(skillId) >= this.stsSkill(skillId).sts.maxCount;
    };

    Game_Actor.prototype.setStsSkillCount = function(skillId, value) {
        if (!this._stsCount) this._stsCount = [];
        this._stsCount[skillId] = value;
    };

    Game_Actor.prototype.stsCountUp = function(skillId) {
        if (FTKR.STS.enableSkillCount) {
            this.setStsSkillCount(skillId, this.stsCount(skillId) + 1);
        } else {
            this.setStsSkillCount(skillId, 1);
        }
    };

    Game_Actor.prototype.stsUsedCost = function(skillId) {
        var skill = this.stsSkill(skillId);
        FTKR.setGameData(this, null, skill);
        skill.sts.costs.forEach( function(cost){
            var value = this.evalStsFormula(cost.value,0,0);
            switch (cost.type) {
                case 'item':
                  this.addStsUsedItem(skill.id, cost.id, value);
                  break;
                case 'var':
                  this.addStsUsedVar(skill.id, cost.id, value);
                  break;
                case 'gold':
                  this.addStsUsedGold(skill.id, value);
                  break;
                case 'weapon':
                  this.addStsUsedWeapon(skill.id, cost.id, value);
                  break;
                case 'armor':
                  this.addStsUsedArmor(skill.id, cost.id, value);
                  break;
                case 'sp':
                  this.addStsUsedSp(skill.id, value);
                  break;
            }
        },this);
    };
    
    Game_Actor.prototype.setStsUsedCsp = function(classId, skillId, value) {
        if (!this._stsUsedCsp) this._stsUsedCsp = [];
        if (!this._stsUsedCsp[classId]) this._stsUsedCsp[classId] = [];
        this._stsUsedCsp[classId][skillId] = value;
    };

    Game_Actor.prototype.setStsUsedSp = function(skillId, value) {
        if (FTKR.STS.sp.enableClassSp) {
            this.setStsUsedCsp(this._classId, skillId, value);
        } else {
            if (!this._stsUsedSp) this._stsUsedSp = [];
            this._stsUsedSp[skillId] = value;
        }
    };

    Game_Actor.prototype.stsUsedCsp = function(classId, skillId) {
        if (!this._stsUsedCsp) this._stsUsedCsp = [];
        if (!this._stsUsedCsp[classId]) this._stsUsedCsp[classId] = [];
        return this._stsUsedCsp[classId][skillId] || 0;
    };

    Game_Actor.prototype.stsUsedSp = function(skillId) {
        if (FTKR.STS.sp.enableClassSp) {
            return this.stsUsedCsp(this._classId, skillId);
        } else {
            if (!this._stsUsedSp) this._stsUsedSp = [];
            return this._stsUsedSp[skillId] || 0;
        }
    };

    Game_Actor.prototype.addStsUsedCsp = function(classId, skillId, value) {
        this.setStsUsedCsp(classId, skillId, this.stsUsedCsp(classId, skillId) + value);
    };

    Game_Actor.prototype.addStsUsedSp = function(skillId, value) {
        this.setStsUsedSp(skillId, this.stsUsedSp(skillId) + value);
    };

    Game_Actor.prototype.setStsUsedGold = function(skillId, value) {
        if (!this._stsUsedGold) this._stsUsedGold = [];
        this._stsUsedGold[skillId] = value;
    };

    Game_Actor.prototype.stsUsedGold = function(skillId) {
        if (!this._stsUsedGold) this._stsUsedGold = [];
        return this._stsUsedGold[skillId] || 0;
    };

    Game_Actor.prototype.addStsUsedGold = function(skillId, value) {
        this.setStsUsedGold(skillId, this.stsUsedGold(skillId) + value);
    };

    Game_Actor.prototype.initStsUsedItem = function(skillId, itemId) {
        if (!this._stsUsedItem) this._stsUsedItem = [];
        if (skillId && !this._stsUsedItem[skillId]) this._stsUsedItem[skillId] = [];
        if (itemId && !this._stsUsedItem[skillId][itemId]) this._stsUsedItem[skillId][itemId] = 0;
    };

    Game_Actor.prototype.setStsUsedItem = function(skillId, itemId, value) {
        this.initStsUsedItem(skillId);
        this._stsUsedItem[skillId][itemId] = value;
    };

    Game_Actor.prototype.stsUsedItems = function(skillId) {
        this.initStsUsedItem(skillId);
        return this._stsUsedItem[skillId];
    };

    Game_Actor.prototype.addStsUsedItem = function(skillId, itemId, value) {
        this.initStsUsedItem(skillId, itemId);
        this.setStsUsedItem(skillId, itemId, this.stsUsedItems(skillId)[itemId] + value);
    };

    Game_Actor.prototype.initStsUsedWeapon = function(skillId, itemId) {
        if (!this._stsUsedWeapon) this._stsUsedWeapon = [];
        if (skillId && !this._stsUsedWeapon[skillId]) this._stsUsedWeapon[skillId] = [];
        if (itemId && !this._stsUsedWeapon[skillId][itemId]) this._stsUsedWeapon[skillId][itemId] = 0;
    };

    Game_Actor.prototype.setStsUsedWeapon = function(skillId, itemId, value) {
        this.initStsUsedWeapon(skillId);
        this._stsUsedWeapon[skillId][itemId] = value;
    };

    Game_Actor.prototype.stsUsedWeapons = function(skillId) {
        this.initStsUsedWeapon(skillId);
        return this._stsUsedWeapon[skillId];
    };

    Game_Actor.prototype.addStsUsedWeapon = function(skillId, itemId, value) {
        this.initStsUsedWeapon(skillId, itemId);
        this.setStsUsedWeapon(skillId, itemId, this.stsUsedWeapons(skillId)[itemId] + value);
    };

    Game_Actor.prototype.initStsUsedArmor = function(skillId, itemId) {
        if (!this._stsUsedArmor) this._stsUsedArmor = [];
        if (skillId && !this._stsUsedArmor[skillId]) this._stsUsedArmor[skillId] = [];
        if (itemId && !this._stsUsedArmor[skillId][itemId]) this._stsUsedArmor[skillId][itemId] = 0;
    };

    Game_Actor.prototype.setStsUsedArmor = function(skillId, itemId, value) {
        this.initStsUsedArmor(skillId);
        this._stsUsedArmor[skillId][itemId] = value;
    };

    Game_Actor.prototype.stsUsedArmors = function(skillId) {
        this.initStsUsedArmor(skillId);
        return this._stsUsedArmor[skillId];
    };

    Game_Actor.prototype.addStsUsedArmor = function(skillId, itemId, value) {
        this.initStsUsedArmor(skillId, itemId);
        this.setStsUsedArmor(skillId, itemId, this.stsUsedArmors(skillId)[itemId] + value);
    };

    Game_Actor.prototype.initStsUsedVar = function(skillId, varId) {
        if (!this._stsUsedVar) this._stsUsedVar = [];
        if (skillId && !this._stsUsedVar[skillId]) this._stsUsedVar[skillId] = [];
        if (varId && !this._stsUsedVar[skillId][varId]) this._stsUsedVar[skillId][varId] = 0;
    };

    Game_Actor.prototype.setStsUsedVar = function(skillId, varId, value) {
        this.initStsUsedVar(skillId);
        this._stsUsedVar[skillId][varId] = value;
    };

    Game_Actor.prototype.stsUsedVars = function(skillId) {
        this.initStsUsedVar(skillId);
        return this._stsUsedVar[skillId];
    };

    Game_Actor.prototype.addStsUsedVar = function(skillId, varId, value) {
        this.initStsUsedVar(skillId, varId);
        this.setStsUsedVar(skillId, varId, this.stsUsedVars(skillId)[varId] + value);
    };

    Game_Actor.prototype.evalStsFormula = function(formula, result1, result2) {
        if (!formula) return result1;
        var result = FTKR.evalFormula(formula);
        return Math.max(Math.floor(result), result2);
    };

    Game_Actor.prototype.payLearnedCost = function(skillId) {
        var skill = this.stsSkill(skillId);
        FTKR.setGameData(this, null, skill);
        this.payLearnedAnyCost(skill.sts.costs);
    };

    Game_Actor.prototype.payLearnedAnyCost = function(costs) {
        costs.forEach( function(cost){
            return this.payStsCost(cost);
        },this);
    };

    Game_Actor.prototype.payStsCost = function(cost) {
        var value = this.evalStsFormula(cost.value,0,0);
        switch (cost.type) {
            case 'item':
              this.addStsUsedItem(FTKR.gameData.item.id, cost.id, value);
              return 0;
            case 'var':
              this.addStsUsedVar(FTKR.gameData.item.id, cost.id, value);
              return 0;
            case 'gold':
              this.addStsUsedGold(FTKR.gameData.item.id, value);
              return $gameParty.loseGold(value);
            case 'weapon':
              this.addStsUsedWeapon(FTKR.gameData.item.id, cost.id, value);
              return $gameParty.loseItem($dataWeapons[cost.id], value);
            case 'armor':
              this.addStsUsedArmor(FTKR.gameData.item.id, cost.id, value);
              return $gameParty.loseItem($dataArmors[cost.id], value);
            case 'sp':
              this.addStsUsedSp(FTKR.gameData.item.id, value);
              return this.loseSp(value);
        }
    };

    Game_Actor.prototype.isPayCostNg = function(cost) {
        var value = this.evalStsFormula(cost.value, 0, 0);
        switch (cost.type) {
          case 'item':
            return $gameParty.numItems($dataItems[cost.id]) < value;
          case 'var':
            return $gameVariables.value(cost.id) < value;
          case 'gold':
            return $gameParty.gold() < value;
          case 'weapon':
            return $gameParty.numItems($dataWeapons[cost.id]) < value;
          case 'armor':
            return $gameParty.numItems($dataArmors[cost.id]) < value;
          case 'sp':
            return this.stsSp() < value;
        }
    };

    Game_Actor.prototype.getCsp = function(classId, value) {
        if(isNaN(value)) value = 0;
        if(isNaN(this._stsCsp[classId])) this._stsCsp[classId] = 0;
        this._stsCsp[classId] = Math.max(this._stsCsp[classId] + Number(value), 0);
        if ( this.maxCsp(classId)) {
            this._stsCsp[classId] = Math.min(this._stsCsp[classId], this.maxCsp(classId));
        }
    };

    Game_Actor.prototype.maxCsp = function(classId) {
        return $dataClasses[classId].sts.msp || FTKR.STS.sp.defaultMaxSp;
    };

    Game_Actor.prototype.getAsp = function(value) {
        if(isNaN(value)) value = 0;
        if(isNaN(this._stsSp)) this._stsSp = 0;
        this._stsSp = Math.max(this._stsSp + Number(value), 0);
        if (this.maxAsp()) {
            this._stsSp = Math.min(this._stsSp, this.maxAsp());
        }
    };

    Game_Actor.prototype.maxAsp = function() {
        return Math.max(this.actor().sts.msp, $dataClasses[this._classId].sts.msp) || FTKR.STS.sp.defaultMaxSp;
    };

    Game_Actor.prototype.getSp = function(value) {
        if (FTKR.STS.sp.enableClassSp) {
            this.getCsp(this._classId, value);
        } else {
            this.getAsp(value);
        }
    };

    Game_Actor.prototype.loseCsp = function(classId, value) {
        this.getCsp(classId, -value);
    };

    Game_Actor.prototype.loseSp = function(value) {
        this.getSp(-value);
    };

    Game_Actor.prototype.setCsp = function(classId, value) {
        if(isNaN(value)) value = 0;
        this._stsCsp[classId] = Math.max(Number(value), 0);
        if ( this.maxCsp(classId)) {
            this._stsCsp[classId] = Math.min(this._stsCsp[classId], this.maxCsp(classId));
        }
    };

    Game_Actor.prototype.setAsp = function(value) {
        if(isNaN(value)) value = 0;
        this._stsSp = Math.max(Number(value), 0);
        if (this.maxAsp()) {
            this._stsSp = Math.min(this._stsSp, this.maxAsp());
        }
    };

    var _Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function() {
        _Game_Actor_refresh.call(this);
        if (FTKR.STS.sp.enableClassSp) {
            var classId = this._classId;
            if (this.maxCsp(classId)) {
                this._stsCsp[classId] = Math.min(this._stsCsp[classId], this.maxCsp(classId));
            }
        } else {
            if (this.maxAsp()) {
                this._stsSp = Math.min(this._stsSp, this.maxAsp());
            }
        }
    };

    Game_Actor.prototype.stsCsp = function(classId) {
        return this._stsCsp[classId] || 0;
    };

    Game_Actor.prototype.stsAsp = function() {
        return this._stsSp || 0;
    };

    Game_Actor.prototype.stsSp = function() {
        return FTKR.STS.sp.enableClassSp ? this.stsCsp(this._classId) : this.stsAsp();
    };

    Game_Actor.prototype.isStsLearnedSkill = function(skillId) {
        return this._stsLearnSkills[skillId];
    };

    Game_Actor.prototype.canStsLearnedSkill = function(skillId) {
        var results = [
            this.getTreeTypes().filter( function(tTypeId) {
                return this.isReqSkillOk(skillId, tTypeId);
            },this).length,
            this.isReqParamOk(skillId),
            this.isPayCostOk(skillId),
            this.isStsLearnedOk(skillId),
        ];
        return $dataSkills[skillId] && results.filter( function(elm) { return !elm; });
    };

    Game_Actor.prototype.isStsLearnedOk = function(skillId) {
      if (FTKR.STS.enableSkillCount) {
        var skill = this.stsSkill(skillId);
        return this.stsCount(skillId) < skill.sts.maxCount;
      } else {
        return !this.isStsLearnedSkill(skillId);
      }
    };

    Game_Actor.prototype.isPayCostOk = function(skillId) {
        var skill = this.stsSkill(skillId);
        FTKR.setGameData(this, null, skill);
        var costs = skill.sts.costs;
        if (!costs.length) return true;
        return !costs.filter( function(cost) {
            return this.isPayCostNg(cost);
        },this).length;
    };

    Game_Actor.prototype.isReqParamOk = function(skillId) {
        var skill = this.stsSkill(skillId);
        FTKR.setGameData(this, null, skill);
        return this.evalStsFormula(skill.sts.required, true, false);
    };

    Game_Actor.prototype.stsLearnSkill = function(skillId) {
        this.payLearnedCost(skillId);
        this.stsCountUp(skillId);
        this.learnSkill(skillId);
    };

    Game_Actor.prototype.stsSkill = function(skillId) {
      return Imported.FTKR_SEP ? this.getSkill(skillId) : $dataSkills[skillId];
    };

    Game_Actor.prototype.getTreeTypes = function() {
      var tTypes = this.actor().sts.treeTypes.concat(this.currentClass().sts.treeTypes, this._stsTrees);
      return !tTypes.length ? [] : duplicateDelete(tTypes);
    };

    Game_Actor.prototype.addTreetype = function(treeTypeId) {
        if (!this._stsTrees.contains(treeTypeId)) this._stsTrees.push(treeTypeId);
    };

    Game_Actor.prototype.reduceTreetype = function(treeTypeId) {
        var index = this._stsTrees.indexOf(treeTypeId);
        if (index > -1) this._stsTrees.splice(index, 1);
    };

    /*-------------------------------------------------------------
      スキルツリーのリセット処理
      flag : 1 - 消費したコストが戻る, 0 - 消費したコストは戻らない
    -------------------------------------------------------------*/
    Game_Actor.prototype.resetAllTree = function(flag) {
        this.getTreeTypes().forEach( function(tType) {
            this.resetTree(flag, tType);
        },this);
    };

    Game_Actor.prototype.resetTree = function(flag, treeType) {
        var totalSp = 0;
        var skillTree = this.getTreeDatas(treeType);
        if (!skillTree.length) return 0;
        skillTree.forEach( function(skill) {
            if (!skill) return;
            if (FTKR.STS.sp.enableClassSp) {
                $dataClasses.forEach( function(dataClass, i){
                    if (!dataClass) return;
                    if (flag) this.getCsp(i, this.stsUsedCsp(i, skill.id));
                    this.setStsUsedCsp(i, skill.id, 0);
                },this);
            } else {
                if (flag) this.getSp(this.stsUsedSp(skill.id));
                this.setStsUsedSp(skill.id, 0);
            }
            if (flag) $gameParty.gainGold(this.stsUsedGold(skill.id));
            this.setStsUsedGold(skill.id, 0);
            this.stsUsedItems(skill.id).forEach( function(itemNum, i){
                if (!itemNum) return;
                if (flag)$gameParty.gainItem($dataItems[i], itemNum);
                this.setStsUsedItem(skill.id, i, 0);
            },this);
            this.stsUsedWeapons(skill.id).forEach( function(itemNum, i){
                if (!itemNum) return;
                if (flag)$gameParty.gainItem($dataWeapons[i], itemNum);
                this.setStsUsedWeapon(skill.id, i, 0);
            },this);
            this.stsUsedArmors(skill.id).forEach( function(itemNum, i){
                if (!itemNum) return;
                if (flag)$gameParty.gainItem($dataArmors[i], itemNum);
                this.setStsUsedArmor(skill.id, i, 0);
            },this);
            this.stsUsedVars(skill.id).forEach( function(itemNum, i){
                if (!itemNum) return;
                if (flag)$gameVariables.setValue(i, itemNum + $gameVariables.value(i));
                this.setStsUsedVar(skill.id, i, 0);
            },this);
            this.forgetSkill(skill.id);
            this.resetStsSkill(skill.id);
        },this);
    };

    //-------------------------------------------------------------

    Game_Actor.prototype.getTreeDatas = function(treeType) {
        var tree = $dataWeapons[treeType];
        return tree ? this.getSkillTree(tree) : [false];
    };

    Game_Actor.prototype.isShowItem = function(item, tree) {
        FTKR.setGameData(this, null, item);
        return this.evalStsFormula(item.sts.show, true, false) &&
            this.getPreskillId(item.id, tree.id).every(function(skillId){
                var skill = this.stsSkill(skillId);
                FTKR.gameData.item = skill;
                return this.evalStsFormula(skill.sts.show, true, false);
            },this);
    };

    Game_Actor.prototype.getSkillTree = function(tree) {
        var results = [];
        var list = tree.sts.skillIds;
        var subtree = tree.sts.subtree;
        var nextlist = [];
        var count = 0;
        while (count < FTKR.STS.MAX_DEVSKILL_COUNT) {
            dupCount = 0;
            var text = '';
            if (subtree[count + 1]) {
              subtree[count + 1].forEach( function(sub, i){
                  if (sub) list[i] = sub;
              });
            }
            for (var i = 0; i < FTKR.STS.skillTree.maxCols - dupCount; i++) {
                var id = list[i];
                if (!id) {
                    results.push(null);
                } else {
                    var item = this.stsSkill(id);
                    if (item.sts.position > count + 1) {
                        results.forEach( function(result, t){
                            if (result && result.id === id) results.splice(t, 1, null);
                        });
                        results.push(null);
                        nextlist.addExceptForDup([id]);
                    } else {
                        var diffX = item.sts.diffX;
                        if (diffX) {
                            for (var d = 0; d < diffX; d++) {
                                results.push(null);
                                dupCount++;
                          }
                        }
                        FTKR.setGameData(this, null, item);
                        if (this.evalStsFormula(item.sts.show, true, false)) {
                            var skillIds = this.getDevSkillId(item, tree);
                            var data = { id:id, next:skillIds, x:i + dupCount, y:count };
                            results.forEach( function(result, t){
                                if (result && result.id === data.id) results.splice(t, 1, null);
                            });
                            results.push(data);
                            nextlist.addExceptForDup(data.next);
                        } else {
                            results.push(null);
                        }
                    }
                }
            }
            if (!nextlist.length && subtree.length - 1 < count + 1) break;
            list = nextlist;
            nextlist = [];
            count++;
        }
        return results;
    };

    //派生スキルのIDリストを取得
    Game_Actor.prototype.getDevSkillId = function(item, tree) {
        var skillIds = item.sts.skillIds;
        if (item.sts.tree.length > 1) {
            var derives = item.sts.tree.filter( function(treeType) {
                return treeType.treeId === tree.id;
            });
            if (derives.length) skillIds = derives[0].skillIds;
        }
        return skillIds;
    };

    //前提スキルのIDリストを取得
    Game_Actor.prototype.getPreskillId = function(skillId, tTypeId) {
        var results = [];
        var tree = $dataWeapons[tTypeId];
        $dataSkills.forEach( function(skill) {
            if (skill) {
                var derives = this.getDevSkillId(skill, tree);
                if (derives.length) {
                    var num = derives.filter( function(id) {
                        return id === skillId; 
                    }).length;
                    if (num) results.push(skill.id);
                }
            }
        },this);
        return results;
    };

    Game_Actor.prototype.isReqSkillOk = function(skillId, tTypeId) {
        return !this.getPreskillId(skillId, tTypeId).filter( function(id) {
            return !this.isStsLearnedSkill(id);
        },this).length;
    };

    //=============================================================================
    // Game_Action
    //=============================================================================

    var _STS_Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect;
    Game_Action.prototype.applyItemEffect = function(target, effect) {
        switch (effect.code) {
            case Game_Action.EFFECT_GET_SP:
                this.itemEffectGetSp(target, effect);
                break;
            case Game_Action.EFFECT_RESET_TREE:
                this.itemEffectResetTree(target, effect);
                break;
            case Game_Action.EFFECT_CLEAR_TREE:
                this.itemEffectClearTree(target, effect);
                break;
        }
        _STS_Game_Action_applyItemEffect.call(this, target, effect);
    };

    Game_Action.prototype.itemEffectGetSp = function(target, effect) {
        var value = effect.value2;
        if (value !== 0) {
            target.getSp(value);
            this.makeSuccess(target);
        }
    };

    Game_Action.prototype.itemEffectResetTree = function(target, effect) {
        target.resetAllTree(1);
        this.makeSuccess(target);
    };

    Game_Action.prototype.itemEffectClearTree = function(target, effect) {
        target.resetAllTree(0);
        this.makeSuccess(target);
    };

    Game_Action.prototype.stsCount = function() {
        if (this.isSkill()) {
            var id= this._item.itemId();
            return this.subject().stsCount(id);
        }
        return 0;
    };

    //=============================================================================
    // Game_Enemy
    //=============================================================================

    Game_Enemy.prototype.stsSp = function() {
        return Number(readObjectMeta(this.enemy(), ['STS GET SP', 'STS SP 入手']));
    };

    Game_Enemy.prototype.stsCount = function(skillId) {
        return 0;
    };

    //=============================================================================
    // Game_Troop
    //=============================================================================

    Game_Troop.prototype.stsSpTotal = function() {
        return this.deadMembers().reduce(function(r, enemy) {
            return r + enemy.stsSp();
        }, 0);
    };

    //=============================================================================
    // Window_Base
    //=============================================================================

    Window_Base.prototype.setLearnSound = function() {
        var sts = FTKR.STS.stsSe;
        this._learnSound = {name:sts.name, volume:sts.volume, pitch:sts.pitch, pan:sts.pan};
    };

    Window_Base.prototype.setSkillId = function(skillId) {
        if (this._skillId === skillId) return;
        this._skillId = skillId;
        this.refresh();
    };

    if (Imported.FTKR_CSS) {
    var _STS_Window_Bas_drawCssActorStatusBase =
        Window_Base.prototype.drawCssActorStatusBase;
    Window_Base.prototype.drawCssActorStatusBase = function(index, actor, x, y, width, status, lss) {
        switch (status) {
            case 'sp': this.drawCssActorSp(actor, x, y, width); return 1;
        }
        return _STS_Window_Bas_drawCssActorStatusBase.call(this,
            index, actor, x, y, width, status, lss);
    };
    }

    // Window_Base.prototype.drawCssActorSp = function(actor, x, y, width) {
    //     this.changeTextColor('#FF00FF');
    //     this.drawText(FTKR.STS.sp.dispName, x, y, width);
    //     this.resetTextColor();
    //     this.drawText(actor.stsSp(), x, y, width, 'right');
    // };

    //アクター名、スキル名が使用できるタイトル文を表示する関数
    Window_Base.prototype.drawStsDescTitle = function(format, x, y, width, skill) {
        var name = skill ? skill.name : '';
        var params = [this._actor._name, name];
        this.drawFormatTextEx(format, x, y, params, width);
    };

    //スキルの説明文を表示する関数
    Window_Base.prototype.drawStsDescription = function(x, y, width, skill) {
        var texts = this.getStsDesc(skill).split('\n');
        texts = texts.map(text => text.replace(/\\[a-z](\[\d+\])?/gi, '')); // added by nekoma.
        var dy = this.lineHeight();
        for (var i = 0; i < texts.length; i++) {
            if (FTKR.STS.skillStatus.adjustWidth) {
                this.drawStsFormatText(texts[i], x, y + dy * i, [], width);
            } else {
                this.drawFormatTextEx(texts[i], x, y + dy * i, []);
            }
        }
    };

    //スキルの説明文を取得する関数
    Window_Base.prototype.getStsDesc = function(skill) {
        var text = FTKR.STS.skillStatus.prioritizeDesc ?
            this.getStsSubDesc(skill) : null;
        if (Imported.FTKR_SEP) {
            var actor = this._actor;
            if (!actor || text) {
                return text ? text : this.ftItemDesc(skill);
            }
            var descs = skill.descs.filter( function(desc) {
                return actor.evalEnabledFormula(desc.enabled, skill);
            });
            var desc = descs.pop();
            return desc ? desc.description : '';
        } else {
            return text ? text : this.ftItemDesc(skill);
        }
    };

    Window_Base.prototype.getStsDescBase = function(skill) {
        var desc = this.getStsSubDesc(skill);
        return desc ? desc : this.ftItemDesc(skill);
    };

    Window_Base.prototype.getStsSubDesc = function(skill) {
        return skill.sts.desc;
    };

    /*-------------------------------------------------------------
      コストデータ(アイコン,名前,必要数,手持ち数)を表示する関数
    -------------------------------------------------------------*/
    Window_Base.prototype.setCost = function(icon, name, base) {
        return {icon:icon, name:name, base:base};
    };

    Window_Base.prototype.setStsCost = function(cost) {
        switch(cost.type) {
            case 'gold':
                return this.setCost(FTKR.STS.icon.gold, $dataSystem.currencyUnit, $gameParty.gold());
            case 'item':
                var item = $dataItems[cost.id];
                return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
            case 'var'://変数
                return this.setCost(FTKR.STS.icon.var, $dataSystem.variables[cost.id], $gameVariables.value(cost.id));
            case 'weapon':
                var item = $dataWeapons[cost.id];
                return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
            case 'armor':
                var item = $dataArmors[cost.id];
              return this.setCost(item.iconIndex, item.name, $gameParty.numItems(item));
            case 'sp':
                return this.setCost(FTKR.STS.sp.icon, FTKR.STS.sp.dispName, this._actor.stsSp());
            default:
                return this.setCost(0, '', 0);
        }
    };

    //斜線描画関数
    Window_Base.prototype.drawDiagLine = function(x1, y1, x2, y2, color, thick) {
        this.contents.drawStsLine(x1, y1, x2, y2, this.textColor(color), thick);
    };

    //アイコンの表示スケールを指定できる表示関数
    Window_Base.prototype.drawIconCustom = function(iconIndex, x, y, scale) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw * scale, ph * scale);
    };

    // 制御文字を使えないフォーマットテキスト描画関数
    Window_Base.prototype.drawStsFormatText = function(fmt, x, y, params, width, position) {
        var text = fmt.format(params[0], params[1], params[2], params[3], params[4]);
        this.drawText(text, x, y, width, position);
    };

    // 制御文字を使えるフォーマットテキスト描画関数
    Window_Base.prototype.drawFormatTextEx = function(fmt, x, y, params) {
        var text = fmt.format(params[0], params[1], params[2], params[3], params[4]);
        return this.drawTextEx(text, x, y);
    };

    /*-------------------------------------------------------------
      制御文字の表示処理の修正
    -------------------------------------------------------------*/
    
    var _STS_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _STS_Window_Base_convertEscapeCharacters.call(this, text);
        text = text.replace(/\x1bSDATA\[(\d+),([^\]]+)\]/gi, function() {
            return $dataSkills[parseInt(arguments[1])][arguments[2]];
        }.bind(this));
        return text;
    };

    var _STS_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        switch (code) {
        case 'LW':
            this.processDrawStsWidth(this.obtainEscapeStsParam(textState), textState);
            break;
        default:
            _STS_Window_Base_processEscapeCharacter.call(this, code, textState);
            break;
        }
    };

    Window_Base.prototype.obtainEscapeStsParam = function(textState) {
        var arr = /^\[([^\]]+)\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            var results = arr[1].split(',');
            return results.map( function(elm) {
                return isNaN(parseInt(elm)) ? elm : parseInt(elm);
            });
        } else {
            return '';
        }
    };

    Window_Base.prototype.processDrawStsWidth = function(args, textState) {
        this.drawText(args[1], textState.x, textState.y, args[0], args[2]);
        textState.x += args[0];
    };

    if (!Window_Base.prototype.ftItemName) {
        Window_Base.prototype.ftItemName = function(item) {
            return !!item ? item.name : '';
        };
    }
    
    if (!Window_Base.prototype.ftItemIcon) {
        Window_Base.prototype.ftItemIcon = function(item) {
            return !!item ? item.iconIndex : 0;
        };
    }
    
    if (!Window_Base.prototype.ftItemDesc) {
        Window_Base.prototype.ftItemDesc = function(item) {
            return !!item ? item.description : '';
        };
    }
    
    //=============================================================================
    // Window_Selectable
    //=============================================================================

    Window_Selectable.prototype.actSelect = function(index) {
        this.activate();
        this.select(index);
        this.refresh();
    };

    if (!Imported.FTKR_CSS) {
        Window_Selectable.prototype.itemHeightSpace = function() {
            return 0;
        };
    
        Window_Selectable.prototype.unitHeight = function() {
            return this.itemHeight() + this.itemHeightSpace();
        };
    
        Window_Selectable.prototype.unitWidth = function() {
            return this.itemWidth() + this.spacing();
        };
    }

    //=============================================================================
    // Window_SkillList
    //=============================================================================

//    var _STS_Window_SkillList_makeItemList = Window_SkillList.prototype.makeItemList;
    Window_SkillList.prototype.makeItemList = function() {
        if (this._actor) {
            this._data = this._actor.skills().filter(function(item) {
                if (item.sts.learnSkillIds) {
                    return false;
                }
                return this.includes(item);
            }, this);
        } else {
            this._data = [];
        }
    };

    //=============================================================================
    // Window_MenuCommand
    //=============================================================================

    var _STS_Window_MenuCommand_addOriginalCommands =
        Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _STS_Window_MenuCommand_addOriginalCommands.call(this);
        if (FTKR.STS.showCommand === 1) {
            if (FTKR.STS.menuSwitchId === 0) {
                this.addCommand(FTKR.STS.commandName, 'learn skill', true);
            } else if (FTKR.STS.menuSwitchId > 0 &&
                $gameSwitches.value(FTKR.STS.menuSwitchId)) {
                this.addCommand(FTKR.STS.commandName, 'learn skill', true);
            }
        }
    };

    //=============================================================================
    // Window_TreeType
    //=============================================================================

    Window_TreeType.prototype = Object.create(Window_Selectable.prototype);
    Window_TreeType.prototype.constructor = Window_TreeType;

    Window_TreeType.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._actor = null;
        this._stypeId = 0;
        this.refresh();
    };

    Window_TreeType.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.resetScroll();
        }
    };

    Window_TreeType.prototype.maxCols = function() {
        return 1;
    };

    Window_TreeType.prototype.maxItems = function() {
        return this._data ? this._data.length : 0;
    };

    Window_TreeType.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_TreeType.prototype.item = function(index) {
        return this._data ? this._data[index] : null;
    };

    Window_TreeType.prototype.includes = function(weaponId) {
        var weapon = $dataWeapons[weaponId];
        FTKR.setGameData(this._actor, null, weapon);
        return weapon && weapon.wtypeId === FTKR.STS.skillTreeId &&
            this._actor.evalStsFormula(weapon.sts.required, true, false);
    };

    Window_TreeType.prototype.makeItemList = function() {
        this._data = [];
        var actor = this._actor;
        if (actor) {
            this._data = actor.getTreeTypes().filter( function(id) {
                return this.includes(id);
            },this);
        }
    };

    Window_TreeType.prototype.drawItem = function(index) {
      if (this._actor) {
        var rect = this.itemRect(index);
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(true);
        var item = $dataWeapons[this.item(index)];
        if (item) {
          this.drawStsFrame(index, item);
          this.drawItemName(item, rect.x, rect.y, rect.width - 3);
        }
        this.changePaintOpacity(true);
      }
    };

    Window_TreeType.prototype.drawStsFrame = function(index, item) {
      if (Imported.FTKR_DCF && FTKR.STS.treeTypes.enabled) {
        var defIndex = item ? item.sts.pIndex : 0;
        var csrIndex = item ? item.sts.pCIndex : 0;
        var item = {
          defColor:0,
          csrColor:0,
          defIndex:defIndex,
          csrIndex:csrIndex,
        };
        this.drawDcfFrame(index, false, false, item);
      }
    };

    Window_TreeType.prototype.setSkillTreeWindow = function(window) {
      this._skillTreeWindow = window;
      this.update();
    };

    Window_TreeType.prototype.setPreskillWindow = function(window) {
      this._preskillWindow = window;
      this.update();
    };

    Window_TreeType.prototype.update = function() {
      Window_Selectable.prototype.update.call(this);
      var tTypeId = this.item(this.index());
      if (tTypeId && this._skillTreeWindow) this._skillTreeWindow.setTtypeId(tTypeId);
      if (tTypeId && this._preskillWindow) this._preskillWindow.setTtypeId(tTypeId);
    };

    Window_TreeType.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (Imported.FTKR_DCF && FTKR.STS.treeTypes.enabled) this.updateDcfFrame(index, FTKR.STS.frame);
    };

    //=============================================================================
    // Window_SkillTree
    //=============================================================================

    Window_SkillTree.prototype = Object.create(Window_Selectable.prototype);
    Window_SkillTree.prototype.constructor = Window_SkillTree;

    Window_SkillTree.prototype.initialize = function(x, y, width, height) {
      Window_Selectable.prototype.initialize.call(this, x, y, width, height);
      this.defineLearnSound();
      this._actor = null;
      this._data = [];
      this.clearWindow();
    };

    Window_SkillTree.prototype.setActor = function(actor) {
      if (this._actor !== actor) {
        this._actor = actor;
        this.clearWindow();
        this.resetScroll();
      }
    };

    Window_SkillTree.prototype.clearWindow = function() {
      this._stsIndex = 0;
      this._tTypeId = null;
      this._skillId = null;
      this.refresh();
    };

    Window_SkillTree.prototype.maxCols = function() {
      return Math.max(FTKR.STS.skillTree.maxCols, 1);
    };

    Window_SkillTree.prototype.itemWidth = function() {
        return FTKR.STS.sFrame.width;
    };

    Window_SkillTree.prototype.itemHeight = function() {
        return FTKR.STS.sFrame.height;
    };

    Window_SkillTree.prototype.wSpacing = function() {
        return Math.max(FTKR.STS.cFrame.offsetX + FTKR.STS.cFrame.width, 0);
    };

    Window_SkillTree.prototype.spacing = function() {
        var allSpacing = this.width - this.padding * 2 - this.wSpacing() - this.itemWidth() * this.maxCols();
        return this.maxCols() > 1 ? allSpacing / (this.maxCols() - 1) : 0;
    };

    Window_SkillTree.prototype.itemHeightSpace = function() {
        return FTKR.STS.skillTree.heightSpace;
    };

    Window_SkillTree.prototype.maxItems = function() {
      return this._data ? this._data.length : 1;
    };

    Window_SkillTree.prototype.item = function() {
      return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_SkillTree.prototype.isCurrentItemEnabled = function() {
      return FTKR.STS.enableConf ? this.item() : this.isLearnOk(this.item());
    };

    Window_SkillTree.prototype.isLearnOk = function(item) {
      return item && this.isEnabled(item) && this._actor.isStsLearnedOk(item.id);
    };

    Window_SkillTree.prototype.isEnabled = function(item) {
      return item && this.isReqSkillOk(item) && this.isReqParamOk(item) && this.isPayCostOk(item);
    };

    Window_SkillTree.prototype.isPayCostOk = function(item) {
      return this._actor.isPayCostOk(item.id);
    };

    Window_SkillTree.prototype.isReqSkillOk = function(item) {
        return this._actor.isReqSkillOk(item.id, this._tTypeId);
    };

    Window_SkillTree.prototype.isReqParamOk = function(item) {
      return this._actor.isReqParamOk(item.id);
    };

    Window_SkillTree.prototype.isShowItem = function(item) {
      return item && (this.isEnabled(item) || this._actor.isStsLearnedSkill(item.id));
    };

    Window_SkillTree.prototype.makeItemList = function() {
        this._data = [];
        var actor = this._actor;
        if (actor && this._tTypeId) this._data = actor.getTreeDatas(this._tTypeId);
    };

    Window_SkillTree.prototype.checkId = function(list, id) {
        return list.filter( function(data) {
            return data && data.id === id;
        });
    };

    Window_SkillTree.prototype.drawItem = function(index) {
        var data = this._data[index];
        if (!data) return false;
        var rect = this.itemRect(index);
        var fcolor = this.setFrameColor(data);
        var skill = this._actor.stsSkill(data.id);
        if (skill) {
            this.changePaintOpacity(this.isShowItem(data));
            this.drawTreeLineRect(data, rect);
            this.drawFrame(index, skill, data);
            this.drawTreeIcon(skill, rect);
            this.drawSkillCountRect(skill, data, rect, fcolor);
            this.drawSkillTextRect(skill, rect, fcolor);
            this.changeTextColor(this.textColor(0));
            this.changePaintOpacity(1);
        }
    };

    Window_SkillTree.prototype.drawTreeIcon = function(skill, rect) {
        var ssi = FTKR.STS.sFrame.icon;
        this.drawIcon(this.ftItemIcon(skill), rect.x + ssi.offsetX, rect.y + ssi.offsetY);
    };

    Window_SkillTree.prototype.drawFrame = function(index, skill, data) {
        if (!FTKR.STS.sFrame.enabled) return;
        var fColor = data ? this.setFrameColor(data) : 0;
        var rect = this.itemRect(index);
        if (Imported.FTKR_DCF) {
            this.drawDcfFrame(index, rect, skill, FTKR.STS.sFrame.type, fColor);
        } else {
            this.drawStsFrame(rect.x, rect.y, rect.width, rect.height, fColor, FTKR.STS.treeLineThick);
        }
    };

    Window_SkillTree.prototype.drawDcfFrame = function(index, rect, skill, type, color) {
        var onCursor = index === this.index();
        var defIndex = skill ? skill.sts.pIndex : 0;
        var csrIndex = skill ? skill.sts.pCIndex : 0;
        var item = {
            defColor:color,
            csrColor:0,
            defIndex:defIndex,
            csrIndex:csrIndex,
        };
        this.drawDcfFrameBase(FTKR.DCF.frame, rect, onCursor, item, type);
    };

    Window_SkillTree.prototype.drawStsFrame = function(x, y, width, height, colorNum, thick) {
        if (colorNum < 0) return false;
        var color = this.textColor(colorNum);
        this.contents.drawStsFrame(x, y, width, height, thick, color);
    };

    Window_SkillTree.prototype.drawSkillTextRect = function(skill, rect, color) {
        this.drawSkillText(skill, rect.x, rect.y, rect.width, color, FTKR.STS.sFrame.text);
    };

    Window_SkillTree.prototype.drawSkillText = function(skill, x, y, width, color, sts) {
        var stx = sts.offsetX;
        this.changeTextColor(this.textColor(color));
        this.drawFormatTextEx(sts.format, x + stx, y + sts.offsetY, [this.ftItemName(skill)]);
    };

    //スキルの習得次数を表示
    Window_SkillTree.prototype.drawSkillCountRect = function(skill, data, rect, color) {
        this.drawSkillCount(this._actor, skill, data, rect.x, rect.y, rect.width, color);
    };
    
    Window_SkillTree.prototype.drawSkillCount = function(actor, skill, data, x, y, width, color){
      var iw = Window_Base._iconWidth;
      var ih = Window_Base._iconHeight;
      var cfl = FTKR.STS.cFrame;
      var scw = cfl.width;
      var sch = cfl.height;
      var scx = x + width + cfl.offsetX;
      var scy = y + cfl.offsetY;
      var thick = cfl.thick;
      var txtw = scw - thick*2;
      var txth = sch - thick*2;
      var rate = sch / iw;
      var sctx = scx + thick + cfl.count.offsetX;
      var scty = scy + thick + cfl.count.offsetY;
      var count = !actor.isStsLearnedSkill(skill.id) ? 0 : actor.stsCount(skill.id);
      if (FTKR.STS.enableSkillCount) {
        if (cfl.enabled) {
          var fcolor = this.setFrameColor(data);
          if (Imported.FTKR_DCF) {
            var rect = {x:scx, y:scy, width:scw, height:sch};
            var item = {defColor:fcolor,defIndex:cfl.defIndex};
            this.drawDcfFrameBase(FTKR.DCF.frame, rect, false, item, cfl.type);
          } else {
            this.drawStsFrame(scx, scy, scw, sch, fcolor, thick);
          }
        }
        this.changeTextColor(this.textColor(color));
        this.drawFormatTextEx(cfl.format, sctx, scty, [count]);
      }
      if (actor.isStsLearnedSkill(skill.id) && !actor.isStsLearnedOk(skill.id)) {
        this.drawIconCustom(FTKR.STS.skillLearnedIcon, scx, scy, rate);
      }
    };

    //スキル間の派生線を表示
    Window_SkillTree.prototype.drawTreeLineRect = function(data, rect) {
        this.drawTreeLine(data, rect.x, rect.y, rect.width, rect.height);
    };

    Window_SkillTree.prototype.drawTreeLine = function(data, x, y, rw, rh) {
        if (!data.next.length) return;
        var x1 = x + rw/2, y1 = y + rh;//派生元座標
        for (var i = 0; i < data.next.length; i++) {
            var next = this.checkId(this._data, data.next[i])[0];
            if (!next) continue;
            var color = FTKR.STS.lineColor ? this.setFrameColor(next) : 0;
            var hs = this.itemHeightSpace();  //縦のスキル枠間の距離
            var x2 = x + rw/2 + (rw + this.spacing()) * (next.x - data.x);//派生先X座標
            var y2 = y + (rh + hs) * (next.y - data.y);//派生先Y座標
            var tlen = hs/2 * Math.code(next.x, data.x);
            var xm1 = x1 + tlen, xm2 = x2 - tlen;   //角部X座標
            switch (FTKR.STS.drawStsLineType) {
                case 1:
                    var ym1 = y2 - hs, ym2 = y2 - hs/2; //角部Y座標
                    this.drawTreeLineBase(x1, y1, x1, ym1, color);
                    this.drawTreeLineBase(x1, ym1, xm1, ym2, color);
                    this.drawTreeLineBase(xm1, ym2, xm2, ym2, color);
                    this.drawTreeLineBase(xm2, ym2, x2, y2, color);
                    break;
                case 2:
                    var ym1 = y1 + hs/2, ym2 = y1 + hs; //角部Y座標
                    this.drawTreeLineBase(x1, y1, xm1, ym1, color);
                    this.drawTreeLineBase(xm1, ym1, xm2, ym1, color);
                    this.drawTreeLineBase(xm2, ym1, x2, ym2, color);
                    this.drawTreeLineBase(x2, ym2, x2, y2, color);
                    break;
                case 3:
                    break;
                case 0:
                default:
                    this.drawTreeLineBase(x1, y1, x2, y2, color);
                    break;
            }
        }
    };

    Window_SkillTree.prototype.drawTreeLineBase = function(x, y, w, h, color) {
        var thick = FTKR.STS.treeLineThick;
        if (FTKR.STS.addFrameToLine) this.drawDiagLine(x, y, w, h, 15, thick + 2);
        this.drawDiagLine(x, y, w, h, color, thick);
    };

    Window_SkillTree.prototype.setFrameColor = function(data) {
        var sts = FTKR.STS.sFrame.color;
        if (this._actor.isStsLearnedSkill(data.id)) {
          return sts.isLearned;
        } else if (this.isLearnOk(data)) {
          return sts.isLearnOk;
        } else if (!this.isReqSkillOk(data)) {
          return sts.isReqSkillNg;
        } else {
          return sts.isReqNg;
        }
    };

    Window_SkillTree.prototype.refresh = function() {
      this.makeItemList();
      this.createContents();
      this.drawAllItems();
    };

    Window_SkillTree.prototype.setTtypeId = function(tTypeId) {
        if (this._tTypeId === tTypeId) return;
        this._tTypeId = tTypeId;
        this.refresh();
    };

    Window_SkillTree.prototype.defineLearnSound = function() {
        this.setLearnSound();
    };

    Window_SkillTree.prototype.setStatusTitleWindow = function(window) {
        this._stsStatusTitleWindow = window;
        this.update();
    };

    Window_SkillTree.prototype.setConfWindow = function(window) {
        this._confWindow = window;
        this.update();
    };

    Window_SkillTree.prototype.setCostWindow = function(window) {
        this._costWindow = window;
        this.update();
    };

    Window_SkillTree.prototype.setPreskillWindow = function(window) {
        this._preskillWindow = window;
        this.update();
    };

    Window_SkillTree.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this._skillId = this.item() ? this.item().id : null;
        if (this._stsStatusTitleWindow) this._stsStatusTitleWindow.setSkillId(this._skillId);
        if (this._confWindow) this._confWindow.setEnabled(this.isLearnOk(this.item()));
        if (this._costWindow) this._costWindow.setSkillId(this._skillId);
        if (this._preskillWindow) this._preskillWindow.setSkillId(this._skillId);
    };

    Window_SkillTree.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (Imported.FTKR_DCF && FTKR.STS.sFrame.enabled) this.updateDcfFrame(index);
    };

    Window_SkillTree.prototype.maxPageRows = function() {
        var pageHeight = this.height - this.padding * 2;
        return Math.floor(pageHeight / this.unitHeight());
    };

    Window_SkillTree.prototype.topRow = function() {
        return Math.floor(this._scrollY / this.unitHeight());
    };

    Window_SkillTree.prototype.setTopRow = function(row) {
        var scrollY = row.clamp(0, this.maxTopRow()) * this.unitHeight();
        if (this._scrollY !== scrollY) {
            this._scrollY = scrollY;
            this.refresh();
            this.updateCursor();
        }
    };

    Window_SkillTree.prototype.itemRect = function(index) {
        var rect = new Rectangle();
        var maxCols = this.maxCols();
        rect.width = this.itemWidth();
        rect.height = this.itemHeight();
        rect.x = index % maxCols * this.unitWidth() - this._scrollX;
        rect.y = Math.floor(index / maxCols) * this.unitHeight() - this._scrollY;
        return rect;
    };

    //=============================================================================
    // Window_StsSkillStatus
    //=============================================================================

    Window_StsSkillStatus.prototype = Object.create(Window_Base.prototype);
    Window_StsSkillStatus.prototype.constructor = Window_StsSkillStatus;

    Window_StsSkillStatus.prototype.initialize = function(x, y, width, height) {
      Window_Base.prototype.initialize.call(this, x, y, width, height);
      this._actor = null;
      this.clearWindow();
    };

    Window_StsSkillStatus.prototype.setActor = function(actor) {
      if (this._actor !== actor) this._actor = actor;
    };

    Window_StsSkillStatus.prototype.clearWindow = function() {
      this._skillId = null;
      this.refresh();
    };

    Window_StsSkillStatus.prototype.refresh = function() {
      this.contents.clear();
      var sts = FTKR.STS.skillStatus;
      this.drawSkillState(sts.titleFormat);
    };

    Window_StsSkillStatus.prototype.drawSkillState = function(format) {
      if (this._actor && this._skillId) {
        var skill = this._actor.stsSkill(this._skillId);
        var y = this.lineHeight();
        var width = this.width - this.padding * 2;
        format ? this.drawStsDescTitle(format, 0, 0, width, skill) : y = 0;
        this.drawStsDescription(0, y, width, skill);
      }
    };

    //=============================================================================
    // Window_StsConfTitle
    //=============================================================================

    Window_StsConfTitle.prototype = Object.create(Window_Base.prototype);
    Window_StsConfTitle.prototype.constructor = Window_StsConfTitle;

    Window_StsConfTitle.prototype.initialize = function(x, y, width, height) {
      Window_Base.prototype.initialize.call(this, x, y, width, height);
      this._actor = null;
      this._skillId = null;
      this.refresh();
    };

    Window_StsConfTitle.prototype.setActor = function(actor) {
      if (this._actor !== actor) this._actor = actor;
    };

    Window_StsConfTitle.prototype.refresh = function () {
      this.contents.clear();
      this.drawStsText(FTKR.STS.conf.titleformat);
    };

    Window_StsConfTitle.prototype.drawStsText = function(format) {
      if (this._actor && this._skillId) {
        var skill = this._actor.stsSkill(this._skillId);
        var width = this.width - this.standardPadding() * 2;
        this.drawStsDescTitle(format, 0, 0, width, skill);
      }
    };

    //=============================================================================
    // Window_StsConf
    //=============================================================================

    Window_StsConf.prototype = Object.create(Window_Selectable.prototype);
    Window_StsConf.prototype.constructor = Window_StsConf;

    Window_StsConf.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.setLearnSound();
        this._actor = null;
        this._data = [];
        this._enabled = false;
        this._dicision = false;
    };

    Window_StsConf.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    Window_StsConf.prototype.maxCols = function() {
        return 2;
    };

    Window_StsConf.prototype.maxItems = function() {
      return this._data ? this._data.length : 1;
    };

    Window_StsConf.prototype.item = function() {
      return this._data && this.index() >= 0 ? this._data[this.index()] : null;
    };

    Window_StsConf.prototype.makeItemList = function() {
      this._data = [
        {dicision:true, disp:FTKR.STS.conf.okFormat},
        {dicision:false, disp:FTKR.STS.conf.cancelFormat}
      ];
    };

    Window_StsConf.prototype.refresh = function() {
      this.makeItemList();
      this.createContents();
      this.drawAllItems();
    };

    Window_StsConf.prototype.isEnabled = function(index) {
      return this._actor && (this._enabled || index > 0);
    };

    Window_StsConf.prototype.isCurrentItemEnabled = function() {
      return this.isEnabled(this.index());
    };

    Window_StsConf.prototype.drawItem = function(index) {
      var rect = this.itemRect(index);
      this.changePaintOpacity(this.isEnabled(index));
      this.drawText(this._data[index].disp, rect.x, rect.y, rect.width, 'center');
      this.changePaintOpacity(1);
    };

    Window_StsConf.prototype.setEnabled = function(enabled) {
      if (this._enabled === enabled) return;
      this._enabled = enabled;
      this.refresh();
    };

    //=============================================================================
    // Window_StsCost
    //=============================================================================

    Window_StsCost.prototype = Object.create(Window_Base.prototype);
    Window_StsCost.prototype.constructor = Window_StsCost;

    Window_StsCost.prototype.initialize = function(x, y, width, height) {
      Window_Base.prototype.initialize.call(this, x, y, width, height);
      this._actor = null;
      this.clearWindow()
    };

    Window_StsCost.prototype.setActor = function(actor) {
      if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
      }
    };

    Window_StsCost.prototype.clearWindow = function() {
      this._skillId = null;
      this.refresh();
    };

    Window_StsCost.prototype.refresh = function() {
        this.contents.clear();
        this.drawAllCost();
    };

    Window_StsCost.prototype.drawAllCost = function() {
        if (this._actor) {
            var skill = this._skillId ? this._actor.stsSkill(this._skillId) : null;
            var width = this.width - this.padding * 2;
            var y = this.lineHeight();
            var len = 0;
            var title = FTKR.STS.cost.titleFormat;
            if (title) {
                len = 1;
                this.drawStsDescTitle(title, 0, 0, width, skill);
            }
            this.drawCostValues(skill, 0, len * y, width);
        }
    };

    Window_StsCost.prototype.drawCostValues = function(skill, x, y, width) {
        if (!this._skillId) return;
        var lh = this.lineHeight();
        for (var i = 0; i< 4; i++) {
            var cost = skill.sts.costs[i];
            if (cost) {
                FTKR.setGameData(this._actor, null, skill);
                if (FTKR.STS.sp.hideCost0 && cost.type === 'sp' && (!cost.value || Number(cost.value) === 0)) continue;
                this.drawStsCost(cost, x, y + lh * i, width, skill.id);
            }
        }
    };

    Window_Base.prototype.drawStsCost = function(cost, x, y, width, skillId) {
        var iw = Window_Base._iconWidth + 4;
        width = width - iw;
        this.drawIcon(this.setStsCost(cost).icon, x + 2, y + 2);
        var params = [
            this._actor.evalStsFormula(cost.value, 0, 0),
            this.setStsCost(cost).base
        ];
        this.drawFormatTextEx(FTKR.STS.cost.itemFormat, x + iw, y, [this.setStsCost(cost).name]);
        var num = FTKR.STS.cost.numberFormat.split(',');
        this.changeTextColor(this.textColor(parseInt(num[0])));
        var numberWidth = FTKR.STS.cost.numberWidth || width + iw;
        var diff = width + iw - numberWidth;
        var value = this._actor.isStsMaxCount(skillId) && FTKR.STS.cost.maxFormat ?
                FTKR.STS.cost.maxFormat : num[1];
        this.drawStsFormatText(value, x + diff, y, params, numberWidth, 'right');
    };

    //=============================================================================
    // Window_StsPreskill
    //=============================================================================

    Window_StsPreskill.prototype = Object.create(Window_Base.prototype);
    Window_StsPreskill.prototype.constructor = Window_StsPreskill;

    Window_StsPreskill.prototype.initialize = function(x, y, width, height) {
      Window_Base.prototype.initialize.call(this, x, y, width, height);
      this._actor = null;
      this.clearWindow()
    };

    Window_StsPreskill.prototype.setActor = function(actor) {
      if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
      }
    };

    Window_StsPreskill.prototype.setTtypeId = function(tTypeId) {
      if (this._tTypeId === tTypeId) return;
      this._tTypeId = tTypeId;
      this.refresh();
    };

    Window_StsPreskill.prototype.clearWindow = function() {
      this._skillId = null;
      this._tTypeId = null;
      this.refresh();
    };

    Window_StsPreskill.prototype.refresh = function() {
        this.contents.clear();
        this.drawAllPreskill();
    };

    Window_StsPreskill.prototype.drawAllPreskill = function(index) {
        if (this._actor) {
            var actor = this._actor;
            var skill = this._skillId ? actor.stsSkill(this._skillId) : null;
            var width = this.width - this.padding * 2;
            var lh = this.lineHeight();
            var len = 0;
            var title = FTKR.STS.preskill.titleFormat;
            if (title) {
                len = 1;
                this.drawStsDescTitle(title, 0, 0, width, skill);
            }
            this.drawPreSkills(0, lh * len, width);
        }
    };

    Window_StsPreskill.prototype.drawPreSkills = function(x, y, width) {
        if (this._skillId && this._tTypeId) {
            var actor = this._actor;
            var lh = this.lineHeight();
            var preskillIds = actor.getPreskillId(this._skillId, this._tTypeId);
            for (var i = 0; i< preskillIds.length; i++) {
                var preskill = actor.stsSkill(preskillIds[i]);
                if (preskill) {
                    this.changePaintOpacity(actor.isStsLearnedSkill(preskill.id));
                    this.drawFormatTextEx(FTKR.STS.preskill.itemFormat, x, y + lh * i, [preskill.name], width);
                    this.changePaintOpacity(1);
                }
            }
        }
    };

    //=============================================================================
    // Window_StsActorStatus
    //=============================================================================

    Window_StsActorStatus.prototype = Object.create(Window_Base.prototype);
    Window_StsActorStatus.prototype.constructor = Window_StsActorStatus;

    Window_StsActorStatus.prototype.initialize = function(x, y, width, height) {
      Window_Base.prototype.initialize.call(this, x, y, width, height);
      this._actor = null;
    };

    Window_StsActorStatus.prototype.setActor = function(actor) {
      if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
      }
    };

    Window_StsActorStatus.prototype.refresh = function() {
      this.contents.clear();
      var sts = FTKR.STS.actorStatus;
      var actor = this._actor;
      if (actor) {
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
        if(Imported.FTKR_CSS) {
          this.drawCssActorStatus(0, actor, 0, 0, w, h, sts);
        } else {
          var y = this.lineHeight();
          this.drawActorFace(actor, 0, 0, w*2/3);
          this.drawActorName(actor, 95, 0, w - 95);
          //this.drawActorLevel(actor, 95, y, w - 95);
          this.drawCp(actor, 95, y, w - 95);
          this.drawSp(actor, 95, y*2, w - 95);
        }
      }
    };

    Window_StsActorStatus.prototype.drawCp = function(actor, x, y, width) {
        var value = $gameParty.numItems($dataWeapons[1]);
        var tw = this.textWidth(String(value));
        this.changeTextColor('#FFFF00');
        this.drawText('CP', x, y, width - tw - 4);
        this.resetTextColor();
        this.drawText(value, x + width - tw, y, tw, 'right');
        
    };
    Window_StsActorStatus.prototype.drawSp = function(actor, x, y, width) {
        var value = $gameParty.numItems($dataWeapons[2]);
        var tw = this.textWidth(String(value));
        this.changeTextColor('#FF00FF');
        this.drawText('SP', x, y, width - tw - 4);
        this.resetTextColor();
        this.drawText(value, x + width - tw, y, tw, 'right');
        
    };Window_StsActorStatus.prototype.drawActorLevel = function(actor, x, y, width) {
        var value = actor.level;
        var tw = this.textWidth(String(value));
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, width - tw - 4);
        this.resetTextColor();
        this.drawText(value, x + width - tw, y, tw, 'right');
    };

    //=============================================================================
    // Scene_Menu
    //=============================================================================

    var _STS_Scene_Menu_createCommandWindow =
      Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
      _STS_Scene_Menu_createCommandWindow.call(this);
      if (FTKR.STS.showCommand === 1) {
        this._commandWindow.setHandler('learn skill', this.commandPersonal.bind(this));
      }
    };

    var _STS_Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
      _STS_Scene_Menu_onPersonalOk.call(this);
      switch (this._commandWindow.currentSymbol()) {
      case 'learn skill':
        SceneManager.push(Scene_STS);
        break;
      }
    };

    //=============================================================================
    // Scene_STS
    //=============================================================================

    Scene_STS.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_STS.prototype.constructor = Scene_STS;

    Scene_STS.prototype.initialize = function() {
      Scene_MenuBase.prototype.initialize.call(this);
    };
    
    Scene_STS.prototype.start = function() {
      Scene_MenuBase.prototype.start.call(this);
      this.refreshActor();
    };

    Scene_STS.prototype.create = function() {
      Scene_MenuBase.prototype.create.call(this);
      this.createStsActorStatusWindow();
      this.createTreeTypeWindow();
      this.createSkillTreeWindow();
      this.createStsSkillStatusWindow();
      if (FTKR.STS.enableConf) {
        this.createStsConfTitleWindow();
        this.createStsConfWindow();
      }
      this.createStsCostWindow();
      this.createStsPreskillWindow();
    };

    Scene_STS.prototype.createStsActorStatusWindow = function() {
      this._stsActorStatusWindow = new Window_StsActorStatus(0, 0, 240, 144);
      this._stsActorStatusWindow.reserveFaceImages();
      this.addWindow(this._stsActorStatusWindow);
    };

    Scene_STS.prototype.createTreeTypeWindow = function() {
      this._stsTreeTypeWindow = new Window_TreeType(0, 144, 240, 288);
      var window = this._stsTreeTypeWindow;
      window.setHandler('ok',       this.onTreeTypeOk.bind(this));
      window.setHandler('cancel',   this.popScene.bind(this));
      window.setHandler('pagedown', this.nextActor.bind(this));
      window.setHandler('pageup',   this.previousActor.bind(this));
      this.addWindow(window);
      window.actSelect(0);
    };

    Scene_STS.prototype.createSkillTreeWindow = function() {
      var wx = 240;
      var wy = 144;
      var ww = Graphics.boxWidth - wx;
      var wh = Graphics.boxHeight - wy;
      this._stsSkillTreeWindow = new Window_SkillTree(wx, wy, ww, wh);
      var window = this._stsSkillTreeWindow;
      window.setHandler('ok',     this.onSkillTreeOk.bind(this));
      window.setHandler('cancel', this.onSkillTreeCancel.bind(this));
      this._stsTreeTypeWindow.setSkillTreeWindow(window);
      this.addWindow(window);
    };

    Scene_STS.prototype.createStsSkillStatusWindow = function() {
      var wx = 240;
      var ww = Graphics.boxWidth - wx;
      this._stsStatusTitleWindow = new Window_StsSkillStatus(wx, 0, ww, 144);
      var window = this._stsStatusTitleWindow;
      this._stsSkillTreeWindow.setStatusTitleWindow(window);
      this.addWindow(window);
    };

    Scene_STS.prototype.createStsConfTitleWindow = function() {
      var wh = this._stsActorStatusWindow.fittingHeight(1);
      this._stsConfTitleWindow = new Window_StsConfTitle(241, 144, 408, wh);
      this.addWindow(this._stsConfTitleWindow);
    };

    Scene_STS.prototype.createStsConfWindow = function() {
      var ctw = this._stsConfTitleWindow;
      var wx = ctw.x;
      var wy = ctw.y + ctw.height;
      var ww = ctw.width;
      var wh = this._stsActorStatusWindow.fittingHeight(1);
      this._stsConfWindow = new Window_StsConf(wx, wy, ww, wh);
      var window = this._stsConfWindow;
      window.setHandler('ok', this.onConfirmationOk.bind(this));
      window.setHandler('cancel', this.onConfirmationCancel.bind(this));
      this._stsSkillTreeWindow.setConfWindow(window);
      this.addWindow(window);
    };

    Scene_STS.prototype.createStsCostWindow = function() {
      var wy = 432;
      var wh = Graphics.boxHeight - wy;
      this._stsCostWindow = new Window_StsCost(0, wy, 240, wh);
      var window = this._stsCostWindow;
      this._stsSkillTreeWindow.setCostWindow(window);
      this.addWindow(window);
    };

    Scene_STS.prototype.createStsPreskillWindow = function() {
      this._stsPreskillWindow = new Window_StsPreskill(241, 288, 408, 300);
      var window = this._stsPreskillWindow;
      this._stsTreeTypeWindow.setPreskillWindow(window);
      this._stsSkillTreeWindow.setPreskillWindow(window);
      this.addWindow(window);
    };

    Scene_STS.prototype.refreshActor = function() {
      var actor = this.actor();
      this._stsActorStatusWindow.setActor(actor);
      this._stsTreeTypeWindow.setActor(actor);
      this._stsStatusTitleWindow.setActor(actor);
      this._stsSkillTreeWindow.setActor(actor);
      var ctw = this._stsConfTitleWindow;
      if (ctw) {
        ctw.setActor(actor);
        ctw.hide();
      }
      var cfw = this._stsConfWindow;
      if (cfw) {
        cfw.setActor(actor);
        cfw.hide();
      }
      var csw = this._stsCostWindow;
      csw.setActor(actor);
      var psw = this._stsPreskillWindow;
      psw.setActor(actor);
      psw.hide();
    };

    Scene_STS.prototype.onActorChange = function() {
        this.refreshActor();
        this._stsTreeTypeWindow.actSelect(0);
    };

    Scene_STS.prototype.onTreeTypeOk = function() {
      this._stsSkillTreeWindow.actSelect(0);
    };

    Scene_STS.prototype.onSkillTreeOk = function() {
      var cfw = this._stsConfWindow;
      var stw = this._stsSkillTreeWindow;
      if (cfw) {
        var ctw = this._stsConfTitleWindow;
        ctw._skillId = stw._skillId;
        ctw.refresh();
        cfw.actSelect(0);
        this.stsConfShow();
        this._stsCostWindow.refresh();
        this._stsPreskillWindow.refresh();
      } else {
        this.stsLearnSkill(stw._skillId, stw._learnSound)
      }
    };

    Scene_STS.prototype.stsLearnSkill = function(skillId, sound) {
      var actor = this.actor();
      actor.stsLearnSkill(skillId);
      AudioManager.playStaticSe(sound);
      var stw = this._stsSkillTreeWindow;
      stw.actSelect(stw.index());
      this._stsActorStatusWindow.refresh();
      this._stsStatusTitleWindow.refresh();
      this._stsCostWindow.refresh();
      this._stsPreskillWindow.refresh();
    };

    Scene_STS.prototype.onSkillTreeCancel = function() {
      this._stsTreeTypeWindow.activate();
      this._stsSkillTreeWindow.deselect();
    };

    Scene_STS.prototype.onConfirmationOk = function() {
      var cfw = this._stsConfWindow;
      if (cfw.item().dicision) {
        cfw.deselect();
        this._stsConfTitleWindow.refresh();
        var stw = this._stsSkillTreeWindow;
        this.stsLearnSkill(stw._skillId, cfw._learnSound)
        this.stsConfHide();
      } else {
        this.onConfirmationCancel();
      }
    };

    Scene_STS.prototype.onConfirmationCancel = function() {
      this._stsConfWindow.deselect();
      var stw = this._stsSkillTreeWindow;
      stw.actSelect(stw.index());
      this.stsConfHide();
    };

    Scene_STS.prototype.stsConfHide = function() {
      this._stsConfWindow.hide();
      this._stsConfTitleWindow.hide();
      this._stsPreskillWindow.hide();
    };

    Scene_STS.prototype.stsConfShow = function() {
      this._stsConfWindow.show();
      this._stsConfTitleWindow.show();
      this._stsPreskillWindow.show();
    };

    Scene_STS.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        if (this.isAllWindowDeactive()) this._stsTreeTypeWindow.activate();
    };

    Scene_STS.prototype.isAllWindowDeactive = function() {
        return this._stsConfWindow ? 
            (this._stsConfWindow.active !== true && 
            this._stsSkillTreeWindow.active !== true &&
            this._stsTreeTypeWindow.active !== true) :
            (this._stsTreeTypeWindow.active !== true && 
            this._stsSkillTreeWindow.active !== true);
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _STS_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _STS_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'STS') {
            var com = args[0];
            var case1 = /(?:TREETYPE\()(.+)\)/i;
            var case1j = /ツリータイプ\((.+)\)/i;
            switch (true) {
                // システム画面を呼び出す
                case /OPEN/i.test(com):
                case /スキルツリー画面表示/i.test(com):
                    SceneManager.push(Scene_STS);
                    break;
                // SPを加算する
                // スキルツリーを追加する
                case /ADD/i.test(com):
                case /加算/i.test(com):
                case /追加/i.test(com):
                    if (args[1].match(/SP\((.+)\)/i)) {
                        var value = this.setNum(RegExp.$1);
                        var actor = this.setActor(args[2]);
                        if (actor) actor.getSp(value);
                    } else if (args[1].match(case1) || args[1].match(case1j)) {
                        var treeTypeId = this.setNum(RegExp.$1);
                        var actor = this.setActor(args[2]);
                        if (actor) actor.addTreetype(treeTypeId);
                    }
                    break;
                // スキル習得次数を取得する
                case /GET/i.test(com):
                case /習得次数取得/i.test(com):
                    if (!args[1].match(/VARCOUNT\((.+)\)/i) && !args[1].match(/変数\((.+)\)/i)) break;
                    var varId = this.setNum(RegExp.$1);
                    if (!varId) break;
                    var actor = this.setActor(args[2]);
                    if (!actor) break;
                    var skillId = this.setSkillId(args[3]);
                    if (skillId) {
                        var skill = actor.stsSkill(skillId);
                        if (skill) $gameVariables.setValue(varId, actor.stsCount(skill.id));
                    }
                    break;
                // スキルツリーを初期化する
                case /RESET/i.test(com):
                case /リセット/i.test(com):
                    var actor = this.setActor(args[1]);
                    if (!actor) break;
                    var sp = 0;
                    if (args[2].match(/ALL/i) || args[2].match(/すべて/i)) {
                      actor.resetAllTree(1);
                    } else if (args[2].match(case1) || args[2].match(case1j)) {
                      actor.resetTree(1, this.setNum(RegExp.$1));
                    }
                    break;
                case /CLEAR/i.test(com):
                case /初期化/i.test(com):
                    var actor = this.setActor(args[1]);
                    if (!actor) break;
                    if (args[2].match(/ALL/i) || args[2].match(/すべて/i)) {
                      actor.resetAllTree(0);
                    } else if (args[2].match(case1) || args[2].match(case1j)) {
                      actor.resetTree(0, this.setNum(RegExp.$1));
                    }
                    break;
                case /Learn/i.test(com):
                case /スキル習得/i.test(com):
                    var actor = this.setActor(args[1]);
                    if (!actor) break;
                    var skillId = this.setSkillId(args[2]);
                    if (skillId && actor.canStsLearnedSkill(skillId)) {
                        actor.stsLearnSkill(skillId);
                    }
                    break;
                // スキルツリーを削除する
                case /REDUCE/i.test(com):
                case /削除/i.test(com):
                    if (args[1].match(case1) || args[1].match(case1j)) {
                        var treeTypeId = this.setNum(RegExp.$1);
                        var actor = this.setActor(args[2]);
                        if (actor) actor.reduceTreetype(treeTypeId);
                    }
                    break;
            }
        }
    };

    Game_Interpreter.prototype.setNum = function(data) {
        if (data.match(/v\[(\d+)\]/i)) {
            return $gameVariables.value(Number(RegExp.$1));
        } else if (data.match(/(\d+)/i)) {
            return Number(RegExp.$1);
        } else {
            return 0;
        }
    };

    Game_Interpreter.prototype.setActor = function(arg) {
        var case1 = /ACTOR\((.+)\)/i;
        var case1j = /アクター\((.+)\)/i;
        if (arg.match(case1) || arg.match(case1j)) {
            return $gameActors.actor(this.setNum(RegExp.$1));
        } else {
            return false;
        }
    };

    Game_Interpreter.prototype.setSkillId = function(arg) {
        var case2 = /SKILL\((.+)\)/i;
        var case2j = /スキル\((.+)\)/i;
        if (arg.match(case2) || arg.match(case2j)) {
            return this.setNum(RegExp.$1);
        } else {
            return false;
        }
    };

}());//EOF
