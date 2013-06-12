function(doc) {
  if (doc._id == "data") {
    if (doc.result.projects[0].backlogItems) {
      for(var idx in doc.result.projects[0].backlogItems) {
        var status = doc.result.projects[0].backlogItems[idx].status;
        if(status == "New" || status == "Ready for sprint") {
           emit(idx, doc.result.projects[0].backlogItems[idx].name);
        }
      }
    }
  }
}