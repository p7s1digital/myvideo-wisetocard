#!/usr/bin/ruby
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

  orig_data = apicl.get("https://api.scrumwise.com/service/api/v1/getData", {"includeProperties" => "Project.backlogItems"}).body
  log.debug("Data from Scrumwise API: #{orig_data}")

  couch_data = couchcl.get("http://localhost:5984/wisetocard/data").body
  log.debug("Data from CouchDB: #{couch_data}")

  usermap = JSON.parse(couchcl.get("http://localhost:5984/wisetocard/usermap").body)

  couch_data = JSON.parse(couch_data)
  revision = couch_data["_rev"]
  log.debug("Revsion: #{revision}")

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
