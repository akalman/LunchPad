
Restaurants = new Meteor.Collection("restaurants");
Assignments = new Meteor.Collection("assignments");
Users = new Meteor.Collection("users");

(function() {
    // Helper Data
    function getUsersForRestaurant(restaurant) {
        var assignments = Assignments.find({
            restaurantId: restaurant._id
        });

        return Users.find({
            _id: {$in: assignments.map(function(assignment) {
                return assignment.userId;
            })}
        });
    }

    function getRestaurantForUsers(user) {
        var assignments = Assignments.find({
            userId: user._id
        });

        return Restaurants.find({
            _id: {$in: assignments.map(function(assignment) {
                return assignment.restaurantId;
            })}
        });
    }

    var currentUser;


    // UI Plugs
    if (Meteor.isClient) {
        Template.userInput.user = function() {
            return currentUser;
        };

        Template.userInput.events({
            'change input': function(event) {
                currentUser = event.target.value;
            }
        });

        Template.restaurants.restaurants = function() {
            var restaurants = Restaurants.find({}, {
                sort: []
            }).fetch();

            return _.sortBy(restaurants, function(restaurant) {
                return -getUsersForRestaurant(restaurant).count();
            });
        };

        Template.restaurant.users = function() {
            return getUsersForRestaurant(this);
        };

        Template.addToRestaurantButton.events({
            'click button': function(event) {
                if (currentUser) {
                    var user = Users.findOne({email: currentUser});

                    if (!user) {
                        Users.insert({
                            email: currentUser,
                            gravatarUrl: 'http://www.gravatar.com/avatar/' + CryptoJS.md5(currentUser.toLowerCase()) + '?d=monsterid&s=40'
                        });
                        user = Users.findOne({email: currentUser});
                    }

                    Assignments.insert({
                        restaurantId: this._id,
                        userId: user._id
                    });
                }
            }
        });

        Template.addRestaurantButton.events({
            'click button.btn-primary': function (event) {
                $('#addRestaurantForm').modal('show');
                $('#addRestaurantForm').on('shown.bs.modal', function (event) {
                    $('#restaurantName').focus();
                });
            }
        });
    }

    if (Meteor.isServer) {
        Meteor.startup(function () {
            // code to run on server at startup
    });
    }
})();
