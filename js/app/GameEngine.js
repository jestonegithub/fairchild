/**
 * Created by jessebstone on 11/16/15.
 */

var tester = {};  //creating a global object that GameEngine instance will attach to so I can do manual calls for testing...

define(function(require) {
    var _ = require('underscore');
    var bb = require('backbone');
    var mn = require('marionette');
    var time = require('./models/timeModel');
    var an = require('./animations');

    // models
    var sm = require('./models/sharesModel');

    // views
    var sv = require('./views/startView');
    var hv = require('./views/headerView');
    var shv = require('./views/sharesView');
    var scv = require('./views/scrollingView');
    var alv = require('./views/articleLayoutView');

    var iv = require('./views/introView');
    var s1 = require('./views/section1View');
    var s2 = require('./views/section2View');
    var s3 = require('./views/section3View');
    var s4 = require('./views/section4View');






    // The game engine is intended to handle the following:
    //   - determine if there is saved data, and if so, handle loading
    //   - load the app from start if no saved data
    //   - load in the various 'primary' pieces/modules of the game
    //   - create the menu and house the menu logic



 //UTILITIES (move to another module later)

    function randomString() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }


// GAME PROPERTIES

    //SAVE AND START SCREEN
    var savedgame = true;
    var gamestate = {

        chapter:0,
        section:0,
        puzzle:0,
        shares:0

    };

    var skip_start = true;

    //TIMER RELATED PARAMS
    var default_sharing_interval = 2;


    //regions
    var section_region_list = ['section1','section2','section3','section4'];


    //firing events
    var puzzle_fire_events = [

        'setPuzzle1', //section 1
        'setPuzzle2', //section 2
        'setPuzzle3', //section 3
        'none'

    ];

    
    // various models and views to be defined beforehand...

    var sections = [new s1.Section1View(), new s2.Section2View(), new s3.Section3View(), new s4.Section4View()];


    var sharesmodel = new sm.SharesModel({shares:gamestate.shares});
    var sharesview = new shv.SharesView({model:sharesmodel}).render();



    var GameEngine = mn.Application.extend({



        initialize:function(){



        },


        goToStart:function(){

            if (skip_start === true){this.loadArticle()
            }
            else{
                //loads the stand-alone start screen (no associated model) - loadOS method is then called upon custom event firing indicating startsequence over
                this.startview = new sv.StartView().render();
                $('#main').append(this.startview.$el);
                this.startview.applyPasswordLogic(bb);

            }


        },

        loadArticle:function(){

            console.log('heeeer');
            //load page layout
            this.articlelayoutview = new alv.ArticleLayoutView().render();
            this.articlelayoutview.append_layout();

            // load header
            this.headerview = new hv.HeaderView().render();
            this.articlelayoutview.header.show(this.headerview);
            // create and append shares view to header...
            // this.sharesview = new shv.SharesView({model:new sm.SharesModel()});
            $('#shares_container').append(sharesview.$el);


            //handle comments
            $('#comments').click(function(){
                $('#comment_feed').toggle();
                console.log('yi');
            });

            //load scrolling section
            this.scrollingview = new scv.ScrollingView().render();
            this.articlelayoutview.scrolling.show(this.scrollingview);

            //now load in content
            this.loadContent();

            bb.trigger('startSharing');


        },

        loadContent:function(){

            //going to load up Intro
            this.intro = new iv.IntroView().render();
            this.scrollingview.intro.show(this.intro);

            if (savedgame === false){
                gamestate.section= -1;
                this.intro.addHandlers();
            }
            else{



                var current_section_index = gamestate.section;
                var current_section;

                for (i = 0; i < current_section_index+1; i++) {
                    current_section = sections[i];
                    this.scrollingview.getRegion(section_region_list[i]).show(current_section.render());
                }

                //current_chapter.addHandlers();

                //set puzzle handlers for current section
                bb.trigger(puzzle_fire_events[gamestate.section]);



                // //current_chapter.addPuzzleHandlers();
                // this.hideSections();


            }

        },

        loadNextSection:function(){


            gamestate.section = gamestate.section + 1;

            console.log('loading next section');

            var current_section = sections[gamestate.section];
            this.scrollingview.getRegion(section_region_list[gamestate.section]).show(current_section.render());
            bb.trigger(puzzle_fire_events[gamestate.section]);
            // this.hideSections();



            //gamestate.chapter = gamestate.chapter + 1;




        },

        // hideSections:function(){
        //
        //     var current_chapter = gamestate.chapter;
        //     var current_section = gamestate.section;
        //     var section_list = section_lists[current_chapter];
        //
        //
        //     for (i = current_section+1; i < section_list.length; i++) {
        //         $('#'+section_list[i]).hide();
        //     }
        //
        //
        //
        //
        // },



        // PUZZLE LOGIC


        puzzle1Logic:function(){

            //animation divs
            var sda_container = 'section1_scroll_down';
            var arrow1 = 'section1Arrow1';
            var arrow2 = 'section11Arrow2';
            var arrow3 = 'section11Arrow3';

            //appending the scroll down animation object
            an.Animations.scrollDownNow.setSvg(sda_container,arrow1,arrow2,arrow3);

            //hide scroll arrows
            $('#'+sda_container).hide();

            //start with focus on input box as soon as view appears
            //noinspection JSJQueryEfficiency
            // if ($('#puzzle1').is(":visible")){
            //     $('#puzzle1_input').focus();
            // }
            //anytime a user clicks anywhere on terminal the focus stays in the input box (nothing to 'do' outside of the input box)
            //noinspection JSJQueryEfficiency
            $('#section1').click(function(){$('#puzzle1_input').focus();});



            //sets the models 'current_command' value to any submitted text & clears the text box
            $("#puzzle1_form_command").submit(function (e) {
                console.log('here');
                e.preventDefault();
                var command = $('#puzzle1_input').val();

                if (command === 'RDI' || command === 'rdi'){

                    console.log('going to section 2..., killing form functionality');
                    $('#puzzle1_form_command').remove();
                    bb.trigger('sectionend');

                    console.log('arrow1:'+arrow1);
                    $('#'+sda_container).show();
                    an.Animations.scrollDownNow.activate(arrow1,arrow2,arrow3);


                }else{

                    $('#puzzle1_input').val('');
                }


            });



        },


        puzzle2Logic:function(){


            //animation divs
            var sda_container = 'section2_scroll_down';
            var arrow1 = 'section2Arrow1';
            var arrow2 = 'section2Arrow2';
            var arrow3 = 'section2Arrow3';

            //appending the scroll down animation object
            an.Animations.scrollDownNow.setSvg(sda_container,arrow1,arrow2,arrow3);

            //hide scroll arrows
            $('#'+sda_container).hide();

            console.log('setting puzzle 2');
            //start with focus on input box as soon as view appears
            // //noinspection JSJQueryEfficiency
            // if ($('#puzzle2').is(":visible")){
            //     $('#puzzle2_input').focus();
            // }
            // //anytime a user clicks anywhere on terminal the focus stays in the input box (nothing to 'do' outside of the input box)
            // //noinspection JSJQueryEfficiency
            // $('#puzzle2').click(function(){$('#puzzle2_input').focus();});

            //sets the models 'current_command' value to any submitted text & clears the text box
            $("#puzzle2_form_command").submit(function (e) {
                console.log('here');
                e.preventDefault();
                var command = $('#puzzle2_input').val();

                if (command === 'perseverance'){


                    $('#puzzle2_output_string').text('jdhn73f9374jd9jsfsdqqweasseff/filedump.on');
                    //$('#puzzle2_submit').prop('disabled',true);
                    bb.trigger('sectionend');

                    $('#'+sda_container).show();
                    an.Animations.scrollDownNow.activate(arrow1,arrow2,arrow3);


                }
                //else if ((command === '')) {
                //
                //     // $('#puzzle2_output_string').text(' ')
                //
                // }

                else{

                    $('#puzzle2_input').val('');
                    console.log(randomString());
                    $('#puzzle2_output_string').text(randomString()+randomString()+randomString()+randomString()+randomString()+randomString());
                }


            });

        }


    });

    var game = new GameEngine();

    // starts the timer going...
    game.time = time.Timer;
    game.time.startTime();


    game.on('start',function(){
        if (savedgame === false){
            game.goToStart();
        }
        else{game.loadArticle()}
    });

    bb.on('sequenceend',function(){
        _.bind(game.loadArticle,game)();

    }
        ); //will load up the Article once the 'start' sequence is completed
    bb.on('sectionend',_.bind(game.loadNextSection,game));
    bb.on('setPuzzle1',_.bind(game.puzzle1Logic,game));
    bb.on('setPuzzle2',_.bind(game.puzzle2Logic,game));
    bb.on('startSharing',_.bind(function(){

        game.time.addToList('sharing', _.bind(sharesmodel.update_shares,sharesmodel),default_sharing_interval);

    },game));
    
    game.start();


    return GameEngine;
});