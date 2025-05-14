//=============================================================================
// FontCustom.js
//=============================================================================

/*:
 * @plugindesc フォントの種類やサイズを変更します。
 * @author 月雨 春人
 *
 * @param font_family
 * @desc デフォルトのフォントの種類を指定します。
 * @default GameFont
 *
 * @param font_size
 * @desc デフォルトのフォントサイズを指定します。
 * @default 6
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */
 
(function() {

var parameters = PluginManager.parameters('FontCustom');
var font_family = String(parameters["font_family"]);
var font_size = Number(parameters["font_size"]);

Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    dw = dw === undefined ? sw : dw;
    dh = dh === undefined ? sh : dh;
    if (sx >= 0 && sy >= 0 && sw > 0 && sh > 0 && dw > 0 && dh > 0 &&
            sx + sw <= source.width && sy + sh <= source.height) {
        this._context.globalCompositeOperation = 'source-over';
        this._context.drawImage(source._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
        this._setDirty();
    }
};

Window_Base.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
        return 'SimHei, Heiti TC, sans-serif';
    } else if ($gameSystem.isKorean()) {
        return 'Dotum, AppleGothic, sans-serif';
    } else {
        return font_family;
    }
};

Window_Base.prototype.lineHeight = function() {
    return font_size * 6;
};

Window_Base.prototype.standardFontSize = function() {
    return font_size * 4;
};

Window_Base.prototype.standardPadding = function() {
    return font_size * 3;
};

Window_Base.prototype.textPadding = function() {
    return font_size * 1;
};

Window_Base.prototype.calcTextHeight = function(textState, all) {
    var lastFontSize = this.contents.fontSize;
    var textHeight = 0;
    var lines = textState.text.slice(textState.index).split('\n');
    var maxLines = all ? lines.length : 1;

    for (var i = 0; i < maxLines; i++) {
        var maxFontSize = this.contents.fontSize;
        var regExp = /\x1b[\{\}]/g;
        for (;;) {
            var array = regExp.exec(lines[i]);
            if (array) {
                if (array[0] === '\x1b{') {
                    this.makeFontBigger();
                }
                if (array[0] === '\x1b}') {
                    this.makeFontSmaller();
                }
                if (maxFontSize < this.contents.fontSize) {
                    maxFontSize = this.contents.fontSize;
                }
            } else {
                break;
            }
        }
        textHeight += maxFontSize * 6 / 4;
    }

    this.contents.fontSize = lastFontSize;
    return textHeight;
};

})();
