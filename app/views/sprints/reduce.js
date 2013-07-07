function(keys, values, rereduce) {
	if(!rereduce) {
		var result = new Object();
		result["complexity"] = sum(values);
		result["count"] = values.length;
		return result;
	}
}