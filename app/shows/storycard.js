function(doc, req) {
  // !json templates.storycard
  // !code vendor/couchapp/template.js
  // !code vendor/scripts/utils.js

  
  if (doc.result.projects[0].backlogItems) {

    var itemKey = null;

    for(var idx in doc.result.projects[0].backlogItems) {
      if(doc.result.projects[0].backlogItems[idx].itemNumber == req.query.item) {
        itemKey = idx;
        break;
      }
    }

    if (itemKey != null) {  
      var item = doc.result.projects[0].backlogItems[itemKey];
      var pdate = new Date();
      
      var storyType = getStoryType(doc, item);

      return tmpl(templates.storycard,{
        number: item.itemNumber,
        title: item.name,
        description: item.description ? item.description.replace(/\n/g,'<br \>') : 'TBD',
        author: item.creatorID,
        complexity: ((item.estimate == -1) ? "<br>" : item.estimate),
        businessvalue: "<br>",
        printed: pdate.getDate() + "." + (pdate.getMonth() + 1) + "." + pdate.getFullYear(),
        storyType: storyType
      });
    } else {
      return "No item with the key you entered was found";
    }
  } else {
    return "No Backlog Items found"
  }
}

function getStoryType(doc, item) {
	if (doc.result.projects[0].tags) {
		
		var tags = new Object();
		var validNames  = ["Portal", "Intern", "SEO", "Kunde"];
		for ( var idx in doc.result.projects[0].tags) {
			if (validNames.indexOf(doc.result.projects[0].tags[idx].name) > -1) {
				tags[doc.result.projects[0].tags[idx].id] = doc.result.projects[0].tags[idx].name;
			}
		}
		
		for ( var idx in item.tagIDs ) {
			if (tags[item.tagIDs[idx]]) {
				return tags[item.tagIDs[idx]];
			}
		}
	}
	
	return null;
}