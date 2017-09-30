

define(function (require) {
    var mn = require('marionette');
    var bb = require('backbone');
    //var _ = require('underscore');
    var tmp = require('hbs!app/templates/sharesView');


    //This is a View - and the root view of the game living in #main

    var SharesView = mn.ItemView.extend({

        template: tmp,

        modelEvents: {

            'change:shares':'render'

        }
    });


    return {SharesView:SharesView}

});
