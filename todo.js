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

app.get('/todo/:user/:p1?/:p2?', function(req, res)
{
	var params = {
		user: req.params.user
	};
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
			res.send({
				success: false,
				error: error
			}, 400);
		}
		else
		{
			res.send({
				success: true,
				payload: doc
			}, 200);
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
			res.send({
				success	: false,
				_id		: req.params.id,
				payload	: req.body
			}, 200);
		}
		else
		{
			res.send({
				success	: false,
				msg		: 'Record not found',
				_id		: req.params.id
			}, 404);
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
			res.send({
				success	: true,
				_id		: req.params.id
			}, 200);
		}
		else
		{
			res.send({
				success	: false,
				msg		: 'Record not found',
				_id		: req.params.id
			}, 404);
		}
	});
});

app.get('/', function(req, res)
{
	app.set('view options', {layout: false});
	res.render('rest.jade', {
		url: 'http://'+req.headers.host
	});
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});