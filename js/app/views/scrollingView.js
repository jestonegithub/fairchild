

define(function (require) {
    var mn = require('marionette');
    var scrolling_tmp = require('hbs!app/templates/scrollingView');


    //This is a LayoutView - and the root view of the game living in #main

    var ScrollingView = mn.LayoutView.extend({

        template: scrolling_tmp,

        className:"scrolling",

        regions: {
            intro: "#intro",
            section1: '#section1',
            section2: '#section2',
            section3: '#section3',
            section4: '#section4'

        }




});


    return {ScrollingView:ScrollingView}

});
