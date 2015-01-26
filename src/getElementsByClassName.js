// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };
//use document.body, element.childNodes, element.classList

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var array = [];
  //recursive function going through each nodes
  var checkNodes = function(nodes, i){
    //check to see if the function is at the end of the childNodes of the body
    if(i >=document.body.childNodes.length){ 
      return console.log("This is end"); 
    }
    //check to see if classList exist in the childNodes
    if(nodes.childNodes[i].classList){
      //If classList exist then check to see if it matches className
      if(nodes.childNodes[i].classList.contains(className)){
        //push in the array if it does matches
        array.push(nodes.childNodes[i]);
      }
    }
    //If child of the childNodes exist then we have to run the childNodes
    if(nodes.childNodes[i].childNodes.length != 0){
      //Nodes will be the child of childNodes and index will start from 0
      checkNodes(nodes.childNodes[i], 0);  
    }
    //If sibling of the childNodes exist then we will run this
    if(nodes.childNodes[i].nextSibling){
      //Nodes will remain the same but the index will be next nodes
      checkNodes(nodes, i+1);
    } 
    //return all the way out if any condition does not met.
    return;
    
  };

  //call the function with document as our first node since body can also have a ID
  checkNodes(document, 0);
  
  //return the array after finished.
  return array;
}