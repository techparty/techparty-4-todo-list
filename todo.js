var express = require('express'),
	app = express.createServer(),
	db = require('./db');

app.use(express.bodyParser());
app.enable("jsonp callback");

app.get('/bootstrap', function(req, res)
{
	require('./bootstrap').callback(function(error,docs)
	{
		res.send(error||docs);
	});
});

app.get('/todo/:p1?/:p2?', function(req, res)
{
	var params = {};
	if(!req.params.p2 && req.params.p1)
	{
		params._id = req.params.p1;
	}
	else
	{
		params[req.params.p1] = req.params.p2;
	}
	db.todo.find(params, function(err, docs)
	{
		res.send(docs);
	});
});

app.post('/todo', function(req, res)
{
	var record = new db.todo(req.body);
	record.save(function(error, doc){
		if(error)
		{
			res.send(error, 400);
		}
		else
		{
			res.send(doc);
		}
	});
});

app.put('/todo/:id', function(req, res)
{
	db.todo.update({
		_id: req.params.id
	},req.body, function(error, count){
		if(count > 0)
		{
			res.send(req.body);
		}
		else
		{
			res.send("Record not found ("+req.params.id+")", 400);
		}
	});
});

app.delete('/todo/:id', function(req, res)
{
	db.todo.remove({
		_id: req.params.id
	}, function(error, count){
		if(count === 1)
		{
			res.send({success: true}, 200);
		}
		else
		{
			res.send("Record not found ("+req.params.id+")", 400);
		}
	});
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});