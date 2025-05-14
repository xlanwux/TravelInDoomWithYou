//=============================================================================
// PlayBgmBugFix.js
//=============================================================================

/*:
 * @plugindesc BGMのフェードイン実行后に、「BGMの演奏」による音量の変更ができなくなるバグを修正します。
 * @author 奏 ねこま（おとぶき ねこま）
 *
 * @help
 * [修正内容]
 * MEの演奏后など、BGMがフェードインした后に「BGMの演奏」で音量を変更しようとしても
 * 変更されないバグを修正します。
 *
 * *このプラグインには、プラグインコマンドはありません。
 *
 * [ 利用規約 ] ...................................................................
 *  本プラグインの利用者は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  商用、非商用、ゲームの内容（年齢制限など）を問わず利用可能です。
 *  ゲームへの利用の際、報告や出典元の記載等は必須ではありません。
 *  二次配布や転載、ソースコードURLやダウンロードURLへの直接リンクは禁止します。
 *  （プラグインを利用したゲームに同梱する形での結果的な配布はOKです）
 *  不具合対応以外のサポートやリクエストは受け付けておりません。
 *  本プラグインにより生じたいかなる問題においても、一切の責任を負いかねます。
 * [ 改訂履歴 ] ...................................................................
 *   Version 1.00  2016/06/06  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *  Web Site: http://i.gmobb.jp/nekoma/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 */

(function(){
    'use strict';
    
    var _AudioManager_updateBufferParameters = AudioManager.updateBufferParameters;
    AudioManager.updateBufferParameters = function(buffer, configVolume, audio) {
        if (buffer && buffer._gainNode) {
            buffer._gainNode.gain.cancelScheduledValues(0);
        }
        _AudioManager_updateBufferParameters.call(this, buffer, configVolume, audio);
    };
}());