var App = (function () {
    'use strict';

    var settings;

    return {

        init: function(initialSettings){
            settings = initialSettings;
        },

        getVersion: function (){
            return settings.version;
        }

    };
}());
