wisetocard
==========
A CouchDB App for printing Story Cards from ScrumWise Backlog items

Installation CouchApp
---------------------

This is an out of the box couchapp development, so prepending you have couchapp installed, just type

    couchapp push wisetocard

To deploy the app to your local couch db.


Installation of the Sync
------------------------

Before starting the sync you will need to place a file called wisetocard.yml into the home directory of the user, that will run the sync. The yml should look like this:
    scrumwise:
      username: Bernd.Loeffeld@magicinternet.de
      key: xxxxxxxxxxxxxxxxxx

You will find the key in the settings of your scrumwise project. If none exists, you can just create it there 

