(function() {
    if (Meteor.isServer) {
        Accounts.onCreateUser(function(options, user) {
            var gravatarUrl =
                'http://www.gravatar.com/avatar/' +
                    CryptoJS.MD5(user.emails[0].address.toLowerCase()) +
                    '?d=monsterid&s=40';

            user.profile = options.profile || {};
            user.profile.gravatarUrl = gravatarUrl;

            return user;
        });
    }
})();
