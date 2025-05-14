//==============================================================================
// MpiGetMapImage
//==============================================================================

/*:
 * @plugindesc マップ全体を画像として出力します。
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @param GetImageTrigger1
 * @desc マップを画像出力するトリガーを指定してください。
 * @default Input.isPressed('control') && Input.isTriggered('pageup')
 * 
 * @param GetImageTrigger2
 * @desc マップを画像出力するトリガーを指定してください。（キャラクター表示OFF）
 * @default Input.isPressed('control') && Input.isTriggered('pagedown')
 * 
 * @param OutputFolder
 * @desc 画像を出力するフォルダを指定してください。
 * @default output
 * 
 * @param TestModeOnly
 * @desc テスト時のみ有効にする場合は true を指定してください。
 * @default true
 * 
 * @help
 * [説明]
 * マップ全体をPNG画像として出力します。
 *
 * [使用方法]
 * プラグインパラメータのGetImageTrigger1またはGetImageTrigger2で指定した条件が
 * 成立した瞬間のマップ全体の画像を、PNG画像に出力します。
 * GetImageTrigger1とGetImageTrigger2のデフォルト設定は、以下のような意味です。
 * 
 * GetImageTrigger1
 *  Input.isPressed('control') && Input.isTriggered('pageup')
 *  Ctrlキー（またはAltキー）を押しながら、PageUpキーが押された瞬間。
 * 
 * GetImageTrigger2
 *  Input.isPressed('control') && Input.isTriggered('pagedown')
 *  Ctrlキー（またはAltキー）を押しながら、PageDownキーが押された瞬間。
 * 
 * [利用規約] ..................................................................
 *  - 本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  - 商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  - 利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  - プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  - 本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [改訂履歴] ..................................................................
 *   Version 1.01  2018/03/09  遠景、および一部の近・遠景関連プラグインに暫定対応。
 *                             Foreground.js（公式プラグイン・神無月サスケ様）
 *                             視差ゼロ遠景のぼかし除去プラグイン（トリアコンタン様）
 *   Version 1.00  2017/05/28  First edition.
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2017 Nekoma Otobuki
 */

var Imported = Imported || {};
var Makonet = Makonet || {};

(function(){
    'use strict';

    var plugin = 'MpiGetMapImage';

    Imported[plugin] = true;
    Makonet[plugin] = {};

    var $mpi = Makonet[plugin];
    $mpi.parameters = PluginManager.parameters(plugin);

    $mpi.getImageTrigger1 = $mpi.parameters['GetImageTrigger1'];
    $mpi.getImageTrigger2 = $mpi.parameters['GetImageTrigger2'];
    $mpi.outputFolder     = $mpi.parameters['OutputFolder'];
    $mpi.testModeOnly     = $mpi.parameters['TestModeOnly'].toLowerCase() === 'true';

    var _ = plugin;
    var $_ = `$${_}`;

    //==============================================================================
    // Private Methods
    //==============================================================================

    function getMapImage() {
        var mapWidth = $gameMap.width();
        var mapHeight = $gameMap.height();
        var screenWidth = Math.floor(Graphics.width / $gameMap.tileWidth());
        var screenHeight = Math.floor(Graphics.height / $gameMap.tileHeight());
        var screenPixcelWidth = screenWidth * $gameMap.tileWidth();
        var screenPixcelHeight = screenHeight * $gameMap.tileHeight();
        var rows = Math.ceil(mapWidth / screenWidth);
        var columns = Math.ceil(mapHeight / screenHeight);
        var displayX = $gameMap.displayX();
        var displayY = $gameMap.displayY();
        var parallaxOx = $gameMap.parallaxOx();
        var parallaxOy = $gameMap.parallaxOy();
        if ($gameMap.foregroundOx) {
            var foregroundOx = $gameMap.foregroundOx();
            var foregroundOy = $gameMap.foregroundOy();
        }
        var mapBitmap = new Bitmap(mapWidth * $gameMap.tileWidth(), mapHeight * $gameMap.tileHeight());
        var spriteset = SceneManager._scene._spriteset;
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                $gameMap._displayX = i * screenWidth;
                $gameMap._displayY = j * screenHeight;
                spriteset.update();
                if (spriteset._parallax.bitmap) {
                    spriteset._parallax.origin.x = parallaxOx + ($gameMap._displayX - displayX) * $gameMap.tileWidth();
                    spriteset._parallax.origin.y = parallaxOy + ($gameMap._displayY - displayY) * $gameMap.tileHeight();
                }
                if (spriteset._foreground && spriteset._foreground.bitmap) {
                    spriteset._foreground.origin.x = foregroundOx + ($gameMap._displayX - displayX) * $gameMap.tileWidth();
                    spriteset._foreground.origin.y = foregroundOy + ($gameMap._displayY - displayY) * $gameMap.tileHeight();
                }
                if (spriteset._parallaxNonBlur && spriteset._parallaxNonBlur.bitmap) {
                    spriteset._parallaxNonBlur.setFrame(
                        parallaxOx + ($gameMap._displayX - displayX) * $gameMap.tileWidth(),
                        parallaxOy + ($gameMap._displayY - displayY) * $gameMap.tileHeight(),
                        Graphics.width, Graphics.height
                    );
                }
                Graphics._renderer.render(SceneManager._scene);
                var bitmap = Bitmap.snap(SceneManager._scene);
                mapBitmap.blt(bitmap, 0, 0, screenPixcelWidth, screenPixcelHeight, screenPixcelWidth * i, screenPixcelHeight * j, screenPixcelWidth, screenPixcelHeight);
            }
        }
        $gameMap._displayX = displayX;
        $gameMap._displayY = displayY;
        spriteset.update();
        Graphics._renderer.render(SceneManager._scene);
        return mapBitmap;
    }

    function getDateString() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return year + month.padZero(2) + day.padZero(2) + hours.padZero(2) + minutes.padZero(2) + seconds.padZero(2);
    }

    function outputMapImage(bitmap) {
        var fs = require('fs');
        var path = StorageManager.localFileDirectoryPath().replace(/save[\\/]$/, '');
        var folder = path + $mpi.outputFolder;
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
        var file = folder + '\\Map' + $gameMap.mapId().padZero(3) + '_' + getDateString() + '.png';
        var data = bitmap._canvas.toDataURL('img/png').replace(/^.*,/, '');
        var buffer = new Buffer(data, 'base64');
        fs.writeFileSync(file, buffer);
    }

    function showCharacters() {
        for (var i = 0; i < this._characterSprites.length; i++) {
            var sprite = this._characterSprites[i];
            if (!sprite.isTile()) {
                sprite.show();
            }
        }
    };

    //==============================================================================
    // Scene_Map
    //==============================================================================

    (function(o,p){
        var f=o[p];o[p]=function(){
            if (Utils.isOptionValid('test') || !$mpi.testModeOnly) {
                var trigger1 = !!eval($mpi.getImageTrigger1);
                var trigger2 = !!eval($mpi.getImageTrigger2);
                if (trigger1 || trigger2) {
                    var mapImage = null;
                    if (trigger1) {
                        mapImage = getMapImage();
                    }
                    if (trigger2) {
                        this._spriteset.hideCharacters();
                        mapImage = getMapImage();
                        showCharacters.call(this._spriteset);
                    }
                    if (mapImage) {
                        outputMapImage(mapImage);
                    }
                }
            }
            f.apply(this,arguments);
        };
    }(Scene_Map.prototype,'update'));
}());
