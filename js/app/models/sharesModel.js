/**
 * Created by jessestone on 12/15/15.
 */

define(function (require) {
    var bb = require('backbone');
    var mn = require('marionette');
    var  _ = require('underscore');



    var SharesModel = bb.Model.extend({


        defaults:{

            shares:0

        },

        initialize:function(){



        },

        update_shares:function(){

            //dumb version - just adds 1 share when called

            var current_shares = this.get('shares');
            this.set({'shares': current_shares + 1});



        }





    });


    return {SharesModel:SharesModel}


});