

define(function (require) {
    var mn = require('marionette');
    var bb = require('backbone');
    //var _ = require('underscore');
    var tmp = require('hbs!app/templates/section3View');


    //This is a View - and the root view of the game living in #main

    var Section3View = mn.ItemView.extend({

        template: tmp

    });


    return {Section3View:Section3View}

});
