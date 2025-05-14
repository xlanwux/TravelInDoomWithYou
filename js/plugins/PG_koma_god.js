(()=>{
    'use strict';

    Input.keyMapper[18] = 'alt';

    (__setText => {
        Window_Help.prototype.setText = function(text) {
            text = text.replace(/^\[[a-z]+スキル\]/i, '');
            __setText.call(this, text);
        };
    })(Window_Help.prototype.setText);
})();