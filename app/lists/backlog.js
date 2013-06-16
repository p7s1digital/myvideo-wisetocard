function(head, req) {
  // !json templates.backloghead
  // !json templates.backlogitem
  // !json templates.backlogfoot
  // !code vendor/couchapp/template.js

  var row;
  
  start({
     "headers": {
     "Content-Type": "text/html; charset=utf-8"
     }
  });

  send(templates.backloghead);

  while(row = getRow()) {
    var itemcode = tmpl(templates.backlogitem, {
      title: row.value.title,
      number: row.value.number,
      complexity: row.value.complexity,
      description: row.value.description
    });
    send(itemcode);
  }  

  send(templates.backlogfoot);
}