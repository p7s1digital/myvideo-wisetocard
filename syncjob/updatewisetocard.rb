#!/usr/bin/ruby

# Script to write the data of a Scrumwise project into a local CouchDB, implemented from 
# the wisetocard project
# additional to the sync all creator information is updated, if a matching entry can be
# found in the usermap document in the same database
# 
# a config yaml file needs be be place to ~/wisetocard.yml with content like
# ---8<----
# scrumwise:
#   username: mail@host.com
#   key: keyfromprojectsettings
# ---8<----
#

begin
  require 'httpclient'
  require 'logger'
  require 'json'
  require 'yaml'

  log = Logger.new("/srv/scripts/wisetocard/logs/sync.log")
  log.level = Logger::INFO
  log.info('Synchronize the scrumwise project into our CouchDB')

  apicl = HTTPClient.new
  couchcl = HTTPClient.new

  config = YAML.load_file(ENV['HOME']+"/wisetocard.yml")

  if not config
    raise "No config file found at #{ENV['HOME']}/wisetocard.yml"
  end

  user = config['scrumwise']['username'] 
  password = config['scrumwise']['key'] 
  apicl.set_auth(nil, user, password)

  orig_data = apicl.get("https://api.scrumwise.com/service/api/v1/getData", {"includeProperties" => "Project.backlogItems,Project.comments,Project.attachments,Project.sprints,Project.tags"}).body
  log.debug("Data from Scrumwise API: #{orig_data}")

  couch_data = couchcl.get("http://localhost:5984/wisetocard/data").body
  log.debug("Data from CouchDB: #{couch_data}")

  usermap = JSON.parse(couchcl.get("http://localhost:5984/wisetocard/usermap").body)

  couch_data = JSON.parse(couch_data)
  revision = couch_data["_rev"]
  log.debug("Revsion: #{revision}")

  # Couch DB needs to know the revision of the document we are updating, so let´s write it into the JSON
  orig_data.sub!('{', '{"_rev":"'+revision+'", ')

  usermap.each do |key, value|
    unless key == "_id" or key == "_rev"
      orig_data.gsub!(key, value)
    end
  end

  result = couchcl.put("http://localhost:5984/wisetocard/data", orig_data)

  log.info("Scrumwise data version #{JSON.parse(orig_data)["dataVersion"]} sync to CouchDB revsion #{revision}")

rescue Exception => e
  log.error("No sync possible, caused by exception #{e}")
end
