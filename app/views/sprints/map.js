function(doc) {
	// !code vendor/scripts/utils.js
	if (doc._id == "data") {
		var sprints = new Object();
		
		if (doc.result.projects[0].sprints) {
			for(var idx in doc.result.projects[0].sprints) {
				sprints[doc.result.projects[0].sprints[idx].id] = doc.result.projects[0].sprints[idx].name;
			}
		}
		
		if (doc.result.projects[0].backlogItems) {
			for ( var idx in doc.result.projects[0].backlogItems) {
				item = doc.result.projects[0].backlogItems[idx];
				var sprintname = getSprintName(item, sprints);
				
				if (sprintname) {
					emit(sprintname,  (item.roughEstimate == -1) ? 0 : item.roughEstimate);
				}
			}
		}
	}
}