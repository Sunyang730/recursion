// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var string = '';
  if(obj == null){
  	return 'null';
  }
  var key = Object.keys(obj);


  var joinString = function(index, type){
    if(index>key.length-2){
      if(type == 'array'){
      	if(typeof(obj[key[index]]) == 'array'){
      		var key = Object.keys(obj[key[index]]);


      	}else if(typeof(obj[key[index]]) != 'string'){
          return obj[key[index]];
        }else{
          return '"' + obj[key[index]] + '"';
        }
      }else if(type == 'object'){
        if(obj[key[index]] !='string' || 'number'){
          return '';
        }else if(typeof(obj[key[index]]) != 'string'){
          return '"' + key[index] + '":' + obj[key[index]];
        }else{
          return '"' + key[index] + '":' + '"' + obj[key[index]] + '"';
        }
      }

    }
    if(type == 'array'){
      if(typeof(obj[key[index]]) != 'string'){
        return obj[key[index]] +','+ joinString(index+1, 'array');
      }else{
        return '"' + obj[key[index]] + '"' +  ',' + joinString(index+1, 'array');
      }
    }else if(type == 'object'){
      if(obj[key[index]] != 'string' || 'number'){
        return joinString(index+1, 'object');

      }else if(typeof(obj[key[index]]) != 'string'){
        return '"' + key[index] + '":' + obj[key[index]] + ',' + joinString(index+1, 'object');
      }else{
        return '"' + key[index] + '":' + '"' + obj[key[index]] + '"' + ',' + joinString(index+1, 'object');
      }
    }
  };

  if(Array.isArray(obj) && key.length !=0){
    return string += '[' + joinString(0, 'array') + ']';
  }else if(Array.isArray(obj)){
  	return string += '[]';
  }

  if(typeof(obj) == 'object' && key.length !=0 ){
    return string += '{' + joinString(0, 'object') + '}';
  }else if(typeof(obj) == 'object'){
    return string +='{}';
  }
  if(typeof(obj) == "string"){
    return string += '"'+obj+'"';
  }else{
    return string += obj;
  }

};