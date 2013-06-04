function(doc, req) {
  // !json templates.storycard
  // !code vendor/couchapp/template.js

  
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

      return tmpl(templates.storycard,{
        number: item.itemNumber,
        title: item.name,
        description: item.description.replace(/\n/g,'<br \>'),
        author: item.creatorID,
        complexity: ((item.roughEstimate == -1) ? "<br>" : item.roughEstimate),
        businessvalue: ((item.estimate == -1) ? "<br>" : item.estimate),
        printed: pdate.getDate() + "." + (pdate.getMonth() + 1) + "." + pdate.getFullYear() 
      });
    } else {
      return "No item with the key you entered was found";
    }
  } else {
    return "No Backlog Items found"
  }
}
