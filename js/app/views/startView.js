/**
 * Created by jessebstone on 2/2/15.
 */

// This is a MOCK VIEW - meaning it doesn't do what a Marionette (or backbone) view does - its just a kludge of UI because, well, its just a start screen.
//     MAYBE I'll update it later.

define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var _ = require('underscore');
    var progressbar = require('progressbar');
    var zxcvbn = require('zxcvbn');
    var tmp = require('hbs!app/templates/startView');

    var StartView = mn.ItemView.extend({


        template: tmp,

        append_layout: function(){

            console.log('appending layout');
            $('#main').append(this.el);

        },

        applyPasswordLogic:function(){

            var submit_flag = false;

            var weakColor = [252, 91, 63];  // Red
            var strongColor = [111, 213, 127];  // Green
            var defaultColor = [204, 204, 204];

            var passwordGrades = {
                0: 'Very weak',
                1: 'Weak',
                2: 'Average',
                3: 'Strong',
                4: 'Very strong'
            };

// Interpolate value between two colors.
// Value is number from 0-1. 0 Means color A, 0.5 middle etc.
            function interpolateColor(rgbA, rgbB, value) {
                var rDiff = rgbA[0] - rgbB[0];
                var gDiff = rgbA[1] - rgbB[1];
                var bDiff = rgbA[2] - rgbB[2];
                value = 1 - value;
                return [
                    rgbB[0] + rDiff * value,
                    rgbB[1] + gDiff * value,
                    rgbB[2] + bDiff * value
                ];
            }

            function rgbArrayToString(rgb) {
                return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
            }

            function barColor(progress) {
                return interpolateColor(weakColor, strongColor, progress);
            }

            function onLoad() {
                var body = document.querySelector('.start_body');
                var barContainer = document.querySelector('#strength-bar');
                var strengthBar = new progressbar.Circle(barContainer, {
                    color: '#ddd',
                    trailColor: '#f7f7f7',
                    duration: 1000,
                    easing: 'easeOut',
                    strokeWidth: 5
                });
                barContainer.style.visibility = 'hidden';

                var input = document.querySelector('#password');
                var inputLabel = document.querySelector('#password-label');

                input.onfocus = function(event) {
                    var result = zxcvbn(input.value);
                    inputLabel.dataset.info = passwordGrades[result.score];
                    barContainer.style.visibility = 'visible';
                };

                input.onblur = function(event) {
                    inputLabel.dataset.info = 'New password';
                    barContainer.style.visibility = 'hidden';
                };

                input.addEventListener('input', function passwordChange() {
                    var result = zxcvbn(input.value);
                    var progress = result.score / 4;
                    inputLabel.dataset.info = passwordGrades[result.score];

                    if (progress === 0 && input.value && input.value.length > 0) {
                        progress = 0.1;
                    }

                    if (result.score === 4) {submit_flag = true}
                    else{submit_flag = false}

                    var startColor = +strengthBar.value().toFixed(3) === 0
                        ? rgbArrayToString(defaultColor)
                        : rgbArrayToString(barColor(strengthBar.value()));

                    var endColor = progress === 0
                        ? rgbArrayToString(defaultColor)
                        : rgbArrayToString(barColor(progress));

                    strengthBar.animate(progress, {
                        from: { color: startColor },
                        to: { color: endColor },
                        step: function(state, bar) {
                            input.style.color = state.color;
                            bar.path.setAttribute('stroke', state.color);
                        }
                    });
                });
            }

            onLoad();

            $("#start_view_command").submit(function (e) {
                console.log('start view command entered');
                e.preventDefault();


                if (submit_flag ===true){

                    console.log('firing sequence end');
                    $('#start_body').remove();
                    bb.trigger('sequenceend');

                }


            });

        }


        // initialize:function() {

        //     $('#main').append('<div id="publish"><div id="publish_btn"><a href="#" class=publish_btn>Publish</a></div><div id=publish_indicator></div></div>');
        //
        //
        //
        //
        //     // var bar = new progressbar.Line('#publish_indicator', {
        //     //     strokeWidth: 4,
        //     //     easing: 'easeInOut',
        //     //     duration: 11400,
        //     //     color: '#FFEA82',
        //     //     trailColor: '#eee',
        //     //     trailWidth: 1,
        //     //     svgStyle: {width: '100%', height: '100%'},
        //     //     text: {
        //     //         style: {
        //     //             // Text color.
        //     //             // Default: same as stroke color (options.color)
        //     //             color: '#999',
        //     //             position: 'absolute',
        //     //             right: '0',
        //     //             top: '30px',
        //     //             padding: 0,
        //     //             margin: 0,
        //     //             transform: null
        //     //         },
        //     //         autoStyleContainer: false
        //     //     },
        //     //     from: {color: '#FFEA82'},
        //     //     to: {color: '#ED6A5A'},
        //     //     step: (state, bar) => {bar.setText(Math.round(bar.value() * 100) + ' %')}
        //     //
        //     // });
        //
        //
        //     $('#publish_btn').click(function(){
        //         bar.animate(1,function(){
        //             bb.trigger('sequenceend');
        //             $('#publish').remove();
        //
        //         });
        //     });
        //
        // },






    });


    return {StartView:StartView}

    });




