function(keys, values, rereduce) {
	if(!rereduce) {
		var result = new Object();
		result["complexity"] = sum(values);
		return result;
	}
}