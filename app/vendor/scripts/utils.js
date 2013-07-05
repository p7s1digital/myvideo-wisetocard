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
					
					var sprintname = getSprintName(item, sprints);
					var comments = getComments(item);
					
					emit(formatNumber(idx, 5), {
						title : item.name,
						description : item.description.replace(/\n/g,'<br \>'),
						number : item.itemNumber,
						complexity : ((item.roughEstimate == -1) ? "<br>"
								: item.roughEstimate),
						author : item.creatorID,
						sprintNumber : sprintname ? sprintname : 'No Sprint',
						comments : comments
					});
				}
			}
		}
	}
}

function getSprintName(item, sprints) {
	if( sprints[item.sprintID] ) {
		return sprints[item.sprintID];
	} else {
		return null;
	} 
}

function getComments(item) {
//	[{value: "ein Kommentartext", author: "Ein Kommentator"},{value: "zwei Kommentartext", author: "Zwei Kommentator"}];
	
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