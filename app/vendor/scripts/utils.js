function formatNumber(num, length) {
	var r = "" + num;
	while (r.length < length) {
		r = "0" + r;
	}
	return r;
}

function emitStoriesInStates(doc, states) {
	if (doc._id == "data") {
		var sprints = new Object();
		
		if (doc.result.projects[0].sprints) {
			for(var idx in doc.result.projects[0].sprints) {
				sprints[doc.result.projects[0].sprints[idx].id] = doc.result.projects[0].sprints[idx].name;
			}
		}
		
		if (doc.result.projects[0].backlogItems) {
			for ( var idx in doc.result.projects[0].backlogItems) {
				var status = doc.result.projects[0].backlogItems[idx].status;
				if (states.indexOf(status) > -1) {
					item = doc.result.projects[0].backlogItems[idx];
					
					var sprintname;
					if( sprints[item.sprintID] ) {
						sprintname = sprints[item.sprintID];
					} else {
						sprintname = null;
					} 
					
					emit(formatNumber(idx, 5), {
						title : item.name,
						description : item.description,
						number : item.itemNumber,
						complexity : ((item.roughEstimate == -1) ? "<br>"
								: item.roughEstimate),
						author : item.creatorID,
						sprintNumber : sprintname ? sprintname.substring(7) : 0
					});
				}
			}
		}
	}
}