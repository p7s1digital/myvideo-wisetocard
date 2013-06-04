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

Right now the sync is expecting to have the couchdb on localhost named wisetocard.

Before starting the sync you will need to place a file called wisetocard.yml into the home directory of the user, that will run the sync. The yml should look like this:
>scrumwise:<br>
>&nbsp;&nbsp;username: user@company.com<br>
>&nbsp;&nbsp;key: xxxxxxxxxxxxxxxxxx<br>

You will find the key in the settings of your scrumwise project. If none exists, you can just create it there 

The sync is implemented in Ruby, so you will need a ruby installed and the "httpclient" gem.
Having prepared all this, you can run

    ruby [path_to_project]/syncjob/updatewisetocard.rb

or make this run as a cronjob, i.e. each 10 minutes


Usage
-----
Open a browser and put this into your addressbox
    http://127.0.0.1:5984/wisetocard/_design/wisetocard/_show/storycard/data?item=1
Of course you will have to replace the Host and the item.
The item number can be found in the scrumwise gui of the backlog items


Maintain Users
--------------

As the scrumwise api does not offer a userlist you need to maintain the users in the wisetocard database. Otherwise the userstories will contain an ID as author.
You can maintain them by creating a document with the id 'usermap'. The content may look like:

    {"_id":"usermap","_rev":"4-1d11557e0972b60da7bc77562ab1e424","49386-2-3":"Katha","42883-6-5":"Tom","19836-3-5":"Max"}

I bet you see the pattern.

You will find the ID in the storycards. After you added the field in the 'usermap' document, the next sync run will replace the ID and you will see the correct name in the story card.

