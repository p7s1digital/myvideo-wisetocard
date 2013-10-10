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
		
		var teams = new Object();
		if (doc.result.projects[0].tags) {
			var validNames  = ["Beta Team", "Unchained", "Old Republic", "Datacenter"];
			for ( var idx in doc.result.projects[0].tags) {
				if (validNames.indexOf(doc.result.projects[0].tags[idx].name) > -1) {
					teams[doc.result.projects[0].tags[idx].id] = doc.result.projects[0].tags[idx].name;
				}
			}
		}
		
		if (doc.result.projects[0].backlogItems) {
			for ( var idx in doc.result.projects[0].backlogItems) {
				var status = doc.result.projects[0].backlogItems[idx].status;
				if (states.indexOf(status) > -1) {
					item = doc.result.projects[0].backlogItems[idx];
					
					var sprintname = getSprintName(item, sprints);
					var comments = getComments(item);
					var teamName = getTeamName(item, teams);
					
					emit(formatNumber(idx, 5), {
						title : item.name,
						teamName : teamName,
						description : item.description ? item.description.replace(/\n/g,'<br \>') : 'TBD',
						number : item.itemNumber,
						complexity : ((item.estimate == -1) ? "<br>"
								: item.estimate),
						author : item.creatorID,
						sprintNumber : sprintname ? sprintname : 'No Sprint',
						comments : comments
					});
				}
			}
		}
	}
}

function getTeamName(item, teams) {
	var result; 
	for ( var idx in item.tagIDs ) {
		if (teams[item.tagIDs[idx]]) {
			result = teams[item.tagIDs[idx]];
			break;
		}
	}
	return result;
}

function getSprintName(item, sprints) {
	if( sprints[item.sprintID] ) {
		return sprints[item.sprintID];
	} else {
		return null;
	} 
}


function getComments(item) {
	var result = new Object();
	
	if(! item.comments) {
		return null;
	}
	for ( var idx in item.comments) {
		var commentItem = new Object();
		commentItem["value"] = item.comments[idx].text.replace(/\n/g,'<br \>');
		commentItem["author"] = item.comments[idx].creatorID;
		result[idx] = commentItem;
	}
	
	return result;

}


function getCommentsmarkup(row) {
		
		var result = '';
		
		for (var idx in row.value.comments) {
			result = result + tmpl(templates.comment,{
				value : row.value.comments[idx].value,
				author: row.value.comments[idx].author
			});
		}
		
		return result;
}