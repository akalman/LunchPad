function addRestaurant (event) {
    Restaurants.insert({
        name: $('#restaurantName').val()
    });
    $('#addRestaurantForm').modal('hide');
    $('#addRestaurantForm').on('hidden.bs.modal', function() {
        $('#restaurantName').val('');
    });
}

Template.addLunchSpotButtons.events({
    'click button.btn-primary': addRestaurant
});

Template.addRestaurantForm.events({
    'keypress': function (event) {
        if(event.which == 13) { // enter key
            event.preventDefault();
            addRestaurant(event);
        }
    }
});

