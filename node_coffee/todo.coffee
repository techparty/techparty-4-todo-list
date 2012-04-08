express = require 'express'
app = express.createServer()
db = require './db'

app.use express.bodyParser()
app.enable "jsonp callback"

app.get '/todo/id/:id', (req, res) ->
	params =
		_id: req.params.id
	
	db.todo.findOne params, (err, docs) ->
		if docs == null
			res.send 204
		else
			res.send docs

app.get '/todo/:user/:property?/:value?', (req, res) ->
	params =
		user: req.params.user

	if req.params.property && req.params.value
		params[req.params.property] = req.params.value;

	db.todo.find params, (err, docs) ->
		res.send docs

app.post '/todo', (req, res) ->
	record = new db.todo req.body
	record.save (error, doc) ->
		if error
			res.send({
				success: false
				error: error
			}, 400)
		else
			res.send({
				success: true
				payload: doc
			}, 200)

app.put '/todo/:id', (req, res) ->
	params =
		_id: req.params.id

	db.todo.update params, req.body, (error, count) ->
		if count > 0
			res.send({
				success	: true
				_id		: req.params.id
				payload	: req.body
			}, 200)
		else
			res.send({
				success	: false
				msg		: 'Record not found'
				_id		: req.params.id
			}, 404)

app.delete '/todo/:id', (req, res) ->
	params =
		_id: req.params.id

	db.todo.remove params, (error, count) ->
		if count == 1
			res.send({
				success	: true
				_id		: req.params.id
			}, 200);
		else
			res.send({
				success	: false
				msg		: 'Record not found'
				_id		: req.params.id
			}, 404)

app.get '/', (req, res) ->
	app.set 'view options', {layout: false, path: '../views'}

	res.render 'rest.jade', url: 'http://'+req.headers.host

port = process.env.PORT || 3000

app.listen port, ->
	console.log "Listening on " + port