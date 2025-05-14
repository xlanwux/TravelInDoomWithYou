(function(){
    (function(o,p) {
        var f=o[p];o[p]=function() {
            if (!this._globalInfo) {
                this._globalInfo = f.apply(this,arguments);
            }
            return this._globalInfo;
        }
    }(DataManager,'loadGlobalInfo'));

    (function(o,p) {
        var f=o[p];o[p]=function() {
            DataManager._globalInfo = null;
            return f.apply(this,arguments);
        }
    }(DataManager,'saveGlobalInfo'));
}());
