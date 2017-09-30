

define(function (require) {
    var mn = require('marionette');
    var bb = require('backbone');
    //var _ = require('underscore');
    var tmp = require('hbs!app/templates/section1View');


    //This is a View - and the root view of the game living in #main

    var Section1View = mn.ItemView.extend({

        template: tmp

    });


    return {Section1View:Section1View}

});
