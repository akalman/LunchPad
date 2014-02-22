(function() {
    // UI Plugs
    if (Meteor.isClient) {
        Deps.autorun(function(){
            Meteor.subscribe('userData');
        });
    }

    // Set Up
    if (Meteor.isServer) {
        Accounts.onCreateUser(function(options, user) {
            user.gravatarUrl =
                'http://www.gravatar.com/avatar/' +
                    CryptoJS.MD5(user.emails[0].address.toLowerCase()) +
                    '?d=monsterid&s=40';

            user.profile = options.profile || {};

            return user;
        });

        Meteor.publish('userData', function() {
            if(!this.userId) return null;
            return Meteor.users.find(this.userId, {
                fields: { gravatarUrl: 1 }
            });
        });
    }
})();
