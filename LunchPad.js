
Restaurants = new Meteor.Collection("restaurants");

if (Meteor.isClient) {
    Template.restaurants.restaurants = function() {
        return Restaurants.find({});
    }

    Template.addRestaurantButton.events({
        'click input' : function () {
            // template data, if any, is available in 'this'
            Restaurants.insert({
                name: 'rrrrRRRRRRed Robin (yum)'
            });

            console.log('restaurant added.')
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
