function(head, req) {
  // !json templates.headtemplate
  // !json templates.backlogitem
  // !json templates.foottemplate
  // !code vendor/couchapp/template.js

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
      orderTypeClass : 'secondary badge',
      orderNumber: idx
    });
    send(itemcode);
    idx++;
  }  

  send(templates.foottemplate);
}