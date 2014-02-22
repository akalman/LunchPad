(function() {

    Meteor.methods({
        getToday: function() {
            var now = new Date(),
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                finish = new Date(start.getTime() + (24 * 60 * 60 * 1000) - 1);

            return {
                start: start,
                finish: finish
            }
        }
    });

    function getUsersForRestaurant(restaurant) {
        var assignments = Assignments.find({
                restaurantId: restaurant._id
            }),
            users = assignments.map(function(assignment) {
                return assignment.userId;
            }),
            today = Meteor.call('getToday');

        return Meteor.users.find({
            _id: { $in: users }
        });
    }


    // UI Plugs
    if (Meteor.isClient) {
        Template.restaurant.users = function() {
            return getUsersForRestaurant(this);
        };
    }

})();
