//===========================================================================
// MpiExtractShowTextEvents.js
//===========================================================================

/*:
 * @plugindesc 「文章の表示」イベントのテキストを、ファイルに出力します。
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @param Map Id
 * @desc 出力するマップIDを指定してください。カンマ区切りで複数指定できます。10-20のように指定すると、その範囲を出力します。
 * @default 
 * 
 * @param Output Folder
 * @desc 出力先のフォルダ名を指定してください。
 * @default output
 * 
 * @help
 * [利用規約] ..................................................................
 *  - 本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  - 商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  - 利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  - プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  - 本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [改訂履歴] ..................................................................
 *   Version 1.00  2017/05/24  First edition.
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2017 Nekoma Otobuki
 */

var Imported = Imported || {};
var Makonet = Makonet || {};

(function(){
    'use strict';

    var plugin = 'MpiExtractShowTextEvents';

    Imported[plugin] = true;
    Makonet[plugin] = {};

    var $mpi        = Makonet[plugin];
    $mpi.parameters = PluginManager.parameters(plugin);

    $mpi.map_id        = $mpi.parameters['Map Id'].replace(/ /, '').split(/,/);
    $mpi.output_folder = $mpi.parameters['Output Folder'];

    $mpi.ext_map_id = [];
    $mpi.map_id.forEach(function(map_id) {
        var id = map_id.split(/-/);
        if (id[1]) {
            var id1 = Math.min(+id[0], +id[1]);
            var id2 = Math.max(+id[0], +id[1]);
            for (var i = id1; i <= id2; i++) {
                $mpi.ext_map_id.push(i);
            }
        } else {
            $mpi.ext_map_id.push(+id[0]);
        }
    });

    var _ = plugin;
    var __ = `$${_}`;

    function makeOutputDirectory() {
        var fs = require('fs');
        var path = StorageManager.localFileDirectoryPath();
        var dir = path.replace(/save\\$/, '') + $mpi.output_folder;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    function outputShowTextEvents(data_map) {
        var fs = require('fs');
        var path = StorageManager.localFileDirectoryPath();
        var dir = path.replace(/save\\$/, '') + $mpi.output_folder + '\\';
        data_map.forEach(function(data_map) {
            var file = dir + 'Map' + data_map.id.padZero(3) + '.txt';
            fs.writeFileSync(file, $dataMapInfos[data_map.id].name + '\r\n', 'utf-8');
            data_map.data.events.forEach(function(event) {
                if (!event) return;
                event.pages.forEach(function(page, page_index) {
                    page.list.forEach(function(command) {
                        if ([101,401,105,405].contains(command.code)) {
                            if ([101,105].contains(command.code)) {
                                fs.appendFileSync(file, `\r\n[id:${event.id.padZero(4)}(${event.name})/p${page_index+1}]\r\n`, 'utf-8');
                            } else {
                                fs.appendFileSync(file, command.parameters[0] + '\r\n', 'utf-8');
                            }
                        }
                    });
                });
            });
        });
    }

    //==============================================================================
    // Scene_Boot
    //==============================================================================

    Object.defineProperty(Scene_Boot.prototype,_,{
        get:function(){return this[__]=this[__]||{}},
        set:function(value){this[__]=value},
        configurable: true
    });

    (function(o,p){
        var f=o[p];o[p]=function(){
            this[_].map_id = $mpi.ext_map_id.slice();
            this[_].data_map = [];
            this[_].map_loaded = !this[_].map_id.length;
            if (!this[_].map_loaded) {
                var map_id = this[_].map_id.shift();
                DataManager.loadMapData(map_id);
                this[_].data_map.unshift({ id: map_id, data: null });
            }
            f.apply(this,arguments);
        };
    }(Scene_Boot.prototype,'initialize'));

    (function(o,p){
        var f=o[p];o[p]=function(){
            var isReady = f.apply(this,arguments);
            if (!this[_].map_loaded) {
                if (DataManager.isMapLoaded()) {
                    var map_id = this[_].map_id.shift();
                    this[_].data_map[0].data = $dataMap;
                    if (map_id) {
                        this[_].data_map.unshift({ id: map_id, data: null });
                        DataManager.loadMapData(map_id);
                    } else {
                        this[_].map_loaded = true;
                        makeOutputDirectory();
                        outputShowTextEvents(this[_].data_map);
                    }
                }
            }
            return isReady && this[_].map_loaded;
        };
    }(Scene_Boot.prototype,'isReady'));
}());
