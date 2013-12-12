
Restaurants = new Meteor.Collection("restaurants");
Assignments = new Meteor.Collection("assignments");
Users = new Meteor.Collection("users");

if (Meteor.isClient) {
    Template.restaurants.restaurants = function() {
        return Restaurants.find({});
    }

    Template.restaurant.users = function() {
        var assignments = Assignments.find({
            restaurantId: this._id
        });

        return Users.find({
            _id: {$in: assignments.map(function(assignment) {
                return assignment.userId;
            })}
        });
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
