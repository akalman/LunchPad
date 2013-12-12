if (Meteor.isClient) {
    Template.add_lunch_spot.events({
        'click input': function (event) {
            Restaurants.insert({
                name: $('#restaurant_name').val()
            });
            window.location.hash = '';
            $('#restaurant_name').val('');
        }
    });
}

if (Meteor.isServer) {

}
