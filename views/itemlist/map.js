function(doc) {
  if (doc.content.result.projects[0].backlogItems) {
    for (var idx in doc.content.result.projects[0].backlogItems) {
      var item = doc.content.result.projects[0].backlogItems[idx];
      emit(idx, item);
    }
  } 
}
