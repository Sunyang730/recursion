// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	//string will be adding all the strings together. 
	//key is to create a key array for the obj (either array or object).
	var string = '', key;
	//Check to see if obj is null if so, stop and return.
	if(obj == null){
		return string += 'null';
	}
	//Check to see if obj is a string, if so, just return the string with "".
	if(typeof(obj) == 'string'){
		return string += '"' + obj + '"';
	}
	//Check to see if obj is anything but an object, if so, return directly.
	//If it is an object, then set the key for the object.
	if(typeof(obj) != 'object'){
		return string += obj;
	}else{
		key = Object.keys(obj);
	}
	//If there is nothing in the key then set it according to object or array.
	if(key.length == 0){
		if(Array.isArray(obj)){
			return string += '[]';	
		}else{
			return string += '{}';
		}
		
	}
	//For loop through every elements of the object. 
	for(var i = 0; i < key.length; i++){
		//if the object contains function or undefined value, then continue to the next
		//iteration and do nothing. 
		if(typeof(obj[key[i]]) == 'function' || typeof(obj[key[i]]) == 'undefined')
		{
			continue; 
		}
		//if key is a number, it means that it is an array. Setup the array format.
		if(!isNaN(key[i])){
			if(i < key.length-1){ 
				string += stringifyJSON(obj[key[i]]) +',';
			}else{
				string += stringifyJSON(obj[key[i]]);
			}	
		//if key is not a number, it means it is an object, Setup the object format.
		}else{
			if(i < key.length-1){ 
				string += '"'+ key[i]+ '":' + stringifyJSON(obj[key[i]]) +',';
			}else{
				string += '"'+ key[i]+ '":' + stringifyJSON(obj[key[i]]);
			}	
		}
	}
	//return the string according to its type. Object or array 
	if(Array.isArray(obj)){
		return '[' + string + ']';	
	}else{
		return '{' + string + '}';
	}
	
};