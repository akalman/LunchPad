
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

    function getRestaurantsForUser(user) {
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
                            gravatarUrl: 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(currentUser.toLowerCase()) + '?d=monsterid&s=40'
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

    // Client Routing
    Router.map(function() {
        this.route('ui', {
            path: '/'
        });
    })

    // Server Routing
    Router.map(function() {
        this.route('get restaurants', {
            path: '/restaurants/trending',
            where: 'server',

            action: function() {
                var data = [],
                    restaurants = Restaurants.find({});

                restaurants.forEach(function(restaurant) {
                    var users = getUsersForRestaurant(restaurant).map(function(user) {
                        return user.email;
                    });

                    if (users.length > 0) {
                        restaurant.users = users;
                        data.push({
                            name: restaurant.name,
                            users: users
                        });
                    }
                });

                this.response.writeHead(200, {'Content-Type': 'application/json'});
                this.response.end(JSON.stringify(data));
            }
        });

        this.route('get all restaurants', {
            path: '/restaurants',
            where: 'server',

            action: function() {
                var restaurants = Restaurants.find({}).fetch();

                this.response.writeHead(200, {'Content-Type': 'application/json'});
                this.response.end(JSON.stringify(restaurants));
            }
        });

        this.route('add assignment', {
            path: 'restaurant/:id/add/:email',
            where: 'server',

            action: function() {
                var email = this.params.email
                if (email) {
                    var user = Users.findOne({email: email});

                    if (!user) {
                        Users.insert({
                            email: email,
                            gravatarUrl: 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email.toLowerCase()) + '?d=monsterid&s=40'
                        });
                        user = Users.findOne({email: email});
                    }

                    Assignments.insert({
                        restaurantId: this.params.id,
                        userId: user._id
                    });
                }
            }
        });
    });


    // Set Up
    if (Meteor.isServer) {
        Meteor.startup(function () {
            // code to run on server at startup
        });
    }
})();
