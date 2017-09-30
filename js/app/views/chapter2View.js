

define(function (require) {
    var mn = require('marionette');
    var bb = require('backbone');
    //var _ = require('underscore');
    var tmp = require('hbs!app/templates/chapter2View');


    //This is a View - and the root view of the game living in #main

    var Chapter2View = mn.ItemView.extend({

        template: tmp,
        addHandlers : function(){

            $('#chapter2').append('<div id="chpt2_continue_btn" class="continue_center">Continue</div>');
            $('#chpt2_continue_btn').click(function(){

                bb.trigger('chapterend');

            })


        }

    });


    return {Chapter2View:Chapter2View}

});
