

define(function (require) {
    var mn = require('marionette');
    var bb = require('backbone');
    //var _ = require('underscore');
    var tmp = require('hbs!app/templates/section4View');


    //This is a View - and the root view of the game living in #main

    var Section4View = mn.ItemView.extend({

        template: tmp

    });


    return {Section4View:Section4View}

});
