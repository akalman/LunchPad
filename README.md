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

