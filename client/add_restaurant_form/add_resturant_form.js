function addRestaurant (event) {
    Restaurants.insert({
        name: $('#restaurantName').val()
    });
    $('#addRestaurantForm').modal('hide');
    $('#addRestaurantForm').on('hidden.bs.modal', function() {
        $('#restaurantName').val('');
        Session.set('restaurants_to_add', []);
    });
}

Template.addLunchSpotButtons.events({
    'click button.btn-primary': addRestaurant
});

Template.addRestaurantForm.events({
    'keypress': function (event) {
        if(event.which == 13 /*enter key*/) {
            event.preventDefault();
            addRestaurant(event);
        }
    },
    'keyup input': function (event) {
        if(event.witch != 13 /*enter key*/) {
            var expressionInput = $('#restaurantName').val();
            var searchExpression = new RegExp(expressionInput, 'i');

            var restaurantsToAdd = [];
            if(expressionInput !== '') {
                restaurantsToAdd = Restaurants
                                    .find({ name: searchExpression })
                                    .fetch();
            }

            Session.set('restaurants_to_add', restaurantsToAdd);
        }
    }
});

Template.addRestaurantList.restaurants = function () {
    return Session.get('restaurants_to_add');
};

Template.addRestaurant.rendered = function () {
    $(this.firstNode).fadeIn();
};

