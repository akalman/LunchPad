Restaurants = new Meteor.Collection("restaurants");
Assignments = new Meteor.Collection("assignments");

(function() {
    // Helper Data
    function getUsersForRestaurant(restaurant) {
        var assignments = Assignments.find({
            restaurantId: restaurant._id
        });

        return Meteor.users.find({
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


    // UI Plugs
    if (Meteor.isClient) {
        Template.restaurants.restaurants = function() {
            var restaurants = Restaurants.find({}, {
                sort: []
            }).fetch();

            return _.sortBy(restaurants, function(restaurant) {
                return -getUsersForRestaurant(restaurant).count();
            });
        };

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
                    var user = Meteor.users.findOne({email: email});

                    if (!user) {
                        this.response.writeHead(403, {'Content-Type': 'application/json'});
                        this.response.end();
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
