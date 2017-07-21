const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var TodoItems = [ {
      name: 'an item',
      priority: 3,
      completed: false,
      todoItemId: 0
    },
    {
     
      name: 'another item',
      priority: 2,
      completed: false,
      todoItemId: 1
    },
    {
     
      name: 'a done item',
      priority: 1,
      completed: true, 
      todoItemId: 2
    }]
 

// add your code here
//Responds with 200 stastus code and obj 
app.get('/',function (req, res) { 
    res.status(200).send({status: "ok"})
});

//Grabs all the obj in the array
app.get("/api/TodoItems", function (req,res){
    res.status(200).send(TodoItems)
})

//Depending on what number you type, it will grab the object with the Corresponding ID
app.get("/api/TodoItems/:id", function (req,res){
    var num = req.params.id
    //Filters through the array to find matching values.
    var SelectedObj = TodoItems.filter(function(obj){
    return obj.todoItemId  === parseInt(num)
    })
    res.status(200).json(SelectedObj) 
})

//Creates a new object through req.body
app.post("/api/TodoItems/", function (req, res){
   
    console.log(req.body)
    //pushes object to TodoItems array
    TodoItems.push(req.body)
    //sends copy of new object.
    res.status(201).json(req.body)
})

//Deletes Selected object through todoitemsnum
app.delete("/api/TodoItems/:id", function (req, res){
    var num = req.params.id
    //same affect as before filtering to select one obj with corresponding num
    var SelectedObj2 = TodoItems.filter(function(obj){
     return obj.todoItemId  === parseInt(num)
    })
    //removes obj from array through attr, and value.
    var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 
           arr.splice(i,1);
       }
    }
    return arr;
    }
    //Demostrated here.
    removeByAttr(TodoItems, "todoItemId", parseInt(num))
    //sends copy of deleted Object.
    res.status(200).json(SelectedObj2)
})



module.exports = app;
