var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false});

var mongoose = require('mongoose');

//Connect to DB
mongoose.connect('mongodb://test:test@ds235418.mlab.com:35418/todo-list');

//Create Schema

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);


/*var data = [
    {item:'get milk'},
    {item:'walk the dog'},
    {item:'kick some coding ass'},
    {item:'finish list'}
]*/

module.exports = function (app) {

    app.get('/todo',function (req,res) {
        //get data from mongo DB and pass to View
        Todo.find({},function (err,data) {
            if(err) throw err
            res.render('todo',{todos:data});

        });


    });


    app.post('/todo',urlEncodedParser,function (req,res) {
//get data from view and add to mongoDB

        var newToDo = Todo(req.body).save(function (err,data) {
            if(err) throw err
            res.json(data);
        })


    });

    app.delete('/todo/:item',urlEncodedParser,function (req,res) {

        //Delete requested item from mongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err,data) {
            if(err) throw err
            res.json(data);
        })

    });


}