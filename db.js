var mongoose = require('mongoose');

if(process.env.PORT)
{
	mongoose.connect('mongodb://todo:todo@staff.mongohq.com:10082/todo');
}
else
{
	mongoose.connect('mongodb://localhost/todo');
}

var todoSchema = new mongoose.Schema({
	title    : {type: String, required: true},
	createdAt: {type: Date  , required: true},
	todoDate : {type: Date  , required: true},
	priority : {type: String, required: true},
	status   : {type: String, required: true},
	user     : {type: String, required: true}
},{
	strict: true
});

exports.todo = mongoose.model('todo', todoSchema);

exports.ObjectId = mongoose.Schema.ObjectId;