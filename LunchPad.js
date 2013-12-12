
Restaurants = new Meteor.Collection("restaurants");
Players = new Meteor.Collection("players");

if (Meteor.isClient) {

//    Template.hello.events({
//        'click input' : function () {
//            // template data, if any, is available in 'this'
//            if (typeof console !== 'undefined')
//                console.log("You pressed the button");
//        }
//    });
//
//    Template.addRestaurantButton.events({
//        'click input' : function () {
//            // template data, if any, is available in 'this'
//            Restaurants.insert({
//                name: 'rrrrRRRRRRed Robin (yum)'
//            });
//
//            console.log('restaurant added.')
//        }
//    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        Players.insert({
            name: 'John'
        });
    });
}
