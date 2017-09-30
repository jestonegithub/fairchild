

define(function (require) {
    var mn = require('marionette');
    var bb = require('backbone');
    //var _ = require('underscore');
    var tmp = require('hbs!app/templates/introView');


    //This is a View - and the root view of the game living in #main

    var IntroView = mn.ItemView.extend({

        template: tmp,

        addHandlers: function(){

        $('#intro').append('<div id="intro_continue_btn" class="continue_center">Continue</div>');
        $('#intro_continue_btn').click(function(){

            $('#intro_continue_btn').remove();
            bb.trigger('sectionend');

        })

        }

    });


    return {IntroView:IntroView}

});
