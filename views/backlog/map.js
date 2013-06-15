function(doc) {
  if (doc._id == "data") {
    if (doc.result.projects[0].backlogItems) {
      for(var idx in doc.result.projects[0].backlogItems) {
        var status = doc.result.projects[0].backlogItems[idx].status;
        if(status == "New" || status == "Ready for sprint") {
           item = doc.result.projects[0].backlogItems[idx];
           emit(idx, 
		{
			title: item.name, 
			description: item.description,
			number: item.itemNumber,
			complexity: ((item.roughEstimate == -1) ? "<br>" : item.roughEstimate),
		});
        }
      }
    }
  }
}