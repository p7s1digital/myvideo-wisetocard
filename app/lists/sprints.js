function(head, req) {
	// !json templates.headtemplate
	// !json templates.foottemplate
	// !json templates.sprintvelocity
	// !code vendor/couchapp/template.js
	
	start({
		     "headers": {
		     "Content-Type": "text/html; charset=utf-8"
		     }
	});
	
	send(templates.headtemplate);
	
	// This is a bit weird, but to fullfill the graphplotter, a part of the javascript code 
	// is prepared in here and passed to the template
	var row;
	var idx = 1;
	var arrStr = "[";
	while(row = getRow()) {
		if (idx > 1) {
			arrStr += ",";
		}
		idx++;
		arrStr += "[" + parseInt(row.key) + "," + row.value + "]";
	}
	arrStr += "]";
	
	var bodymarkup = tmpl(templates.sprintvelocity, {
		graphdimension: arrStr
	});
	
	send(bodymarkup);
	send(templates.foottemplate);
}