function(doc, req) {
  // !json templates.storycard
  // !code vendor/couchapp/template.js

  
  if (doc.content.result.projects[0].backlogItems) {

    var itemKey = null;

    for(var idx in doc.content.result.projects[0].backlogItems) {
      if(doc.content.result.projects[0].backlogItems[idx].itemNumber == req.query.item) {
        itemKey = idx;
        break;
      }
    }

    if (itemKey != null) {  
      var item = doc.content.result.projects[0].backlogItems[itemKey];
      var pdate = new Date();

      return tmpl(templates.storycard,{
        number: item.itemNumber,
        title: item.name,
        description: item.description,
        author: "",
        priority: item.priority,
        complexity: item.roughEstimate,
        printed: pdate.getDay() + "." + pdate.getMonth() + "." + pdate.getFullYear() 
      });
    } else {
      return "No item with the key you entered was found";
    }
  } else {
    return "No Backlog Items found"
  }
}
