//=============================================================================
// Mihil_HiddenItems.js
//=============================================================================
// Copyright (c) 2018-2020 Mihiraghi
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
/*:
 * @plugindesc アイテムをメニューから隠します
 * @author Mihiraghi
 * @Thanks 
 * 
 * @help 指定したIDの武器・防具・アクセサリー・アイテムをアイテムメニューから非表示にします。
 * データベースから隠したいアイテムのメモ欄に
 * <menu_hidden:true>
 * と打ち込んでください。
 * 
 * ※コードレビュー歓迎します。
 * Please feel free to throw me Masakari!
 * 
 * Ver0.0.0 仮作成
 * 
 */


(function() {
    'use strict';

    const _Window_ItemList_includes = Window_ItemList.prototype.includes
    Window_ItemList.prototype.includes = function(item) {
        if(item && item.meta && item.meta.menu_hidden){
            return false;
        } else {
            return _Window_ItemList_includes.apply(this, arguments)
        }        
    }

})();
