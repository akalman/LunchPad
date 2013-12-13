LunchPad
========

LunchPad is an organizational tool designed to help large groups of people tackle the all important task of coordinating where to eat lunch

It is a meteor js application meant to be deployed locally within the group that intends to use it.

Install
--------

### Install Meteor and Meteorite

1. run ```curl http://install.meteor.com | sh```
2. Make sure you have npm installed
3. run ```sudo -H npm install -g meteorite```

### Set Up the Repository

4. clone this repository
5. run mrt install
   NOTE: if you are getting errors here about not being able to find mrt, you need to add your node bin folder to your path.

### Run the Server

6. start the server with ```meteor```

Your LunchPad server is now up and running.  If you wish to access the website via a different port (default is 3000) then you can specify by starting the server with ```meteor -p PORT_NUMBER```.  In addition, if you wish to clear out your database, run ```meteor reset```

Writing Plugins
--------

Since LunchPad is designed to be flexible as possible to allow for use in any group structure, a large feature is the ability to integrate into any other tool the group uses for communication or monitoring.  To achieve this, LunchPad also exposes a simple api meant to provide easy control flow for common user actions.  The routes are as follows

- /restaurants

  returns a list of all restaurants currently in the system
- /restaurants/trending

  returns a short list of the top restaurants ordered by how many people are interested in going there for that day
- restaurant/:restaurantId/add/:userEmail

  adds the user specified by :userEmail to the restaurant specified by :restaurantId
