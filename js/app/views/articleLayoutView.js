/**
 * Created by jessebstone on 11/23/15.
 */


define(function (require) {
    var mn = require('marionette');
    var art_tmpl = require('hbs!app/templates/articleLayoutView');


    //This is a LayoutView - and the root view of the game living in #main

    var ArticleLayoutView = mn.LayoutView.extend({

        template: art_tmpl,

        id: "article_wrapper",

        regions: {
            header: "#header",
            scrolling: '#scrolling'

        },

        append_layout: function(){

            $('#main').append(this.el);

        }







    });


    return {ArticleLayoutView:ArticleLayoutView}

});

