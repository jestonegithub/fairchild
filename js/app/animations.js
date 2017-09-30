define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var pb = require('progressbar');

    var Animations = {


        scrollDownNow:


            {
                setSvg: function (divID,arrow1ID,arrow2ID,arrow3ID) {

                $('#'+divID).html(

                        '<div class=scroll_down><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">'+
                        '<path fill-opacity="0" stroke-width="1" stroke="#bbb" d="M0 0 L30 32 L60 0"/>'+
                        '<path id='+arrow1ID+' fill-opacity="0" stroke-width="1" stroke="#ED6A5A" d="M0 0 L30 32 L60 0"/>'+
                        '</svg>'+
                        '</div>'+
                        '<div class=scroll_down>'+
                        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">'+
                        '<path fill-opacity="0" stroke-width="0" stroke="#bbb" d="M0 20 L30 52 L60 20"/>'+
                        '<path id='+arrow2ID+' fill-opacity="0" stroke-width="1" stroke="#ED6A5A" d="M0 20 L30 52 L60 20"/>'+
                        '</svg>'+
                        '</div>'+
                        '<div class=scroll_down>'+
                        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">'+
                        '<path fill-opacity="0" stroke-width="0" stroke="#bbb" d="M0 40 L30 72 L60 40"/>'+
                        '<path id='+arrow3ID+' fill-opacity="0" stroke-width="1" stroke="#ED6A5A" d="M0 40 L30 72 L60 40"/>'+
                        '</svg>'+
                        '</div>');


                },


                activate: function (arrow1ID, arrow2ID, arrow3ID) {


                    // Scroll down arrow stuff...
                    var bar = new pb.Path('#'+arrow1ID, {
                        easing: 'easeInOut',
                        duration: 1400
                    });

                    var bar2 = new pb.Path('#'+arrow2ID, {
                        easing: 'easeInOut',
                        duration: 1400
                    });

                    var bar3 = new pb.Path('#'+arrow3ID, {
                        easing: 'easeInOut',
                        duration: 1400
                    });

                    bar.set(0);
                    bar.animate(1.0);
                    bar2.set(0);
                    setTimeout(function () {
                        bar2.animate(1.0)
                    }, 500);
                    bar3.set(0);
                    setTimeout(function () {
                        bar3.animate(1.0)
                    }, 1000);


                }
            }




    };

    return {Animations:Animations}

});




