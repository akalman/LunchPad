(function() {

    Meteor.methods({
        addToRestaurantButtonOnClick: function(user, restaurant) {
            if (user) {
                Assignments.insert({
                    restaurantId: restaurant._id,
                    userId: user._id,
                    timestamp: new Date()
                });
            }
        }
    });

    // UI Plugs
    if (Meteor.isClient) {
        Template.addToRestaurantButton.events({
            'click button': function(event) {
                var user = Meteor.user();
                return Meteor.call('addToRestaurantButtonOnClick', user, this);
            }
        });
    }

})();
