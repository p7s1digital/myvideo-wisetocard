#!/usr/bin/ruby
require 'httpclient'
require 'logger'
require 'json'

log = Logger.new(STDOUT)
log.level = Logger::DEBUG

log.info('Synchronize the scrumwise project into our CouchDB')

apicl = HTTPClient.new
couchcl = HTTPClient.new

apicl.set_auth(nil, user, password)

orig_data = apicl.get("https://api.scrumwise.com/service/api/v1/getData", {"includeProperties" => "Project.backlogItems"}).body
log.debug("Data from Scrumwise API: #{orig_data}")

couch_data = JSON.parse(couchcl.get("http://localhost:5984/wisetocard/data").body)
revision = couch_data["_rev"]
couch_data = orig_data.sub('{', '{"_rev":"'+revision+'", ')
result = couchcl.put("http://localhost:5984/wisetocard/data", couch_data)



