

define(function (require) {
    var mn = require('marionette');
    var _ = require('underscore');
    var header_tmp = require('hbs!app/templates/headerView');


    //This is a View - and the root view of the game living in #main

    var HeaderView = mn.ItemView.extend({

        template: header_tmp,

        append_layout: function(){

        $('#header').append(this.el);

    }

        // modelEvents: {
        //     'change:shares': 'render updateShares',
        //     'change:comments' : 'render updateComments'
        //
        // },
        //
        //
        // updateShares : function(){},
        //
        // updateComments: function(){}

    });


    return {HeaderView:HeaderView}

});
