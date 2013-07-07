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
	var complexityString = "[";
	var countString = "[";
	while(row = getRow()) {
		if (idx > 1) {
			complexityString += ",";
			countString += ",";
		}
		idx++;
		complexityString += "[" + parseInt(row.key) + "," + row.value.complexity + "]";
		countString += "[" + parseInt(row.key) + "," + row.value.count + "]";
	}
	complexityString += "]";
	countString += "]";
	
	var bodymarkup = tmpl(templates.sprintvelocity, {
		complexityDimension: complexityString,
		countDimension: countString
	});
	
	send(bodymarkup);
	send(templates.foottemplate);
}