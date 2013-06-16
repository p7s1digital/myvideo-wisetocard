function(doc) {
  if (doc._id == "data") {
    if (doc.result.projects[0].backlogItems) {
      for(var idx in doc.result.projects[0].backlogItems) {
        var status = doc.result.projects[0].backlogItems[idx].status;
        if(status == "New" || status == "Ready for sprint") {
           item = doc.result.projects[0].backlogItems[idx];
           emit(formatNumber(idx,5), 
		{
			title: item.name, 
			description: item.description,
			number: item.itemNumber,
			complexity: ((item.roughEstimate == -1) ? "<br>" : item.roughEstimate),
			author: item.creatorID
		});
        }
      }
    }
  }
}

function formatNumber(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}