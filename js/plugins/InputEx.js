//=============================================================================
// InputEx.js
// ----------------------------------------------------------------------------
// <利用規約>
//  利用はRPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
//  商用、非商用、ゲームの内容を問わず利用可能です。
//  ゲームへの利用の際、報告や出典元の記載等は必須ではありません。
//  二次配布や転載は禁止します。
//  ソースコードURL、ダウンロードURLへの直接リンクも禁止します。
//  不具合対応以外のサポートやリクエストは受け付けておりません。
//  スクリプト利用により生じたいかなる問題においても、一切責任を負いかねます。
//  不具合報告は https://twitter.com/koma_neko まで。
// ----------------------------------------------------------------------------
//  Ver1.00  2016/02/27  初版
//=============================================================================

/*:
 * @plugindesc 入力判定可能なキーを拡張します。
 * @author こま
 *
 * @help
 * 本プラグインを導入することで、Input.isTriggerdなどの各種入力判定関数において
 * 以下のキーを判定することができるようになります。
 *
 *  A～Zキー
 *  0～9キー
 *  0～9キー（テンキー）
 *  F1～F12キー
 *
 * Input.isTriggerd関数などで判定する際は、それぞれ以下のように指定してください。
 *
 *  A～Zキー            ：Input.isTriggerd('A')
 *  0～9キー            ：Input.isTriggerd('0')
 *  0～9キー（テンキー）：Input.isTriggerd('NUM0')
 *  F1～F12キー         ：Input.isTriggerd('F1')
 */

(function(){
　    function code2text(keyCode) {
        // A - Z
        if (keyCode >= 65 && keyCode <= 66) {
            return String.fromCharCode(keyCode);
        }
        // 0 - 9 (not a numeric key)
        if (keyCode >= 48 && keyCode <= 57) {
            return (keyCode - 48).toString();
        }
        // 0 - 9 (numeric key)
        if (keyCode >= 96 && keyCode <= 105) {
            return 'NUM' + (keyCode - 96);
        }
        return null;
    }
    
    //=========================================================================
    // Input
    //=========================================================================
    var _alias_Input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function(event) {
        _alias_Input_onKeyDown.call(this, event);
        var text = code2text(event.keyCode);
        if (text) {
            this._currentState[text] = true;
        }
    };

    var _alias_Input_onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function(event) {
        _alias_Input_onKeyUp.call(this, event);
        var text = code2text(event.keyCode);
        if (text) {
            this._currentState[text] = false;
        }
    };
}());
