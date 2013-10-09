function(head, req) {
  // !json templates.headtemplate
  // !json templates.backlogitem
  // !json templates.foottemplate
  // !json templates.comment
  // !code vendor/couchapp/template.js
  // !code vendor/scripts/utils.js

  var row;
  
  start({
     "headers": {
     "Content-Type": "text/html; charset=utf-8"
     }
  });

  send(templates.headtemplate);

  var idx = 1;
  while(row = getRow()) {
    var itemcode = tmpl(templates.backlogitem, {
      title: row.value.title,
      number: row.value.number,
      complexity: row.value.complexity,
      description: row.value.description,
      author: row.value.author,
      orderTypeClass : 'dark label',
      orderNumber: row.value.sprintNumber,
      comments: getCommentsmarkup(row),      
      commentsCount: row.value.comments ? Object.keys(row.value.comments).length : 0,
      team : row.value.teamName 
    });
    send(itemcode);
    idx++;
  }  

  send(templates.foottemplate);
}