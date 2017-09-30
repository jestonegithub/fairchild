

define(function (require) {
    var mn = require('marionette');
    var bb = require('backbone');
    //var _ = require('underscore');
    var tmp = require('hbs!app/templates/section2View');


    //This is a View - and the root view of the game living in #main

    var Section2View = mn.ItemView.extend({

        template: tmp

    });


    return {Section2View:Section2View}

});
