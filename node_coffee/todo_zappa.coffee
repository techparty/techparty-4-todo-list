db = require './db'

require('zappa') ->
	@use 'bodyParser'

	@get '/todo/id/:id', ->
		params =
			_id: @params.id
		
		db.todo.findOne params, (err, docs) =>
				@send docs or 204

	@get '/todo/:user/:property?/:value?', ->
		params =
			user: @params.user

		if @params.property && @params.value
			params[@params.property] = @params.value;

		db.todo.find params, (err, docs) =>
			@send docs

	@post '/todo', ->
		record = new db.todo @body
		record.save (error, doc) =>
			if error
				@send({
					success: false
					error: error
				}, 400)
			else
				@send({
					success: true
					payload: doc
				}, 200)

	@put '/todo/:id', ->
		params =
			_id: @params.id

		db.todo.update params, @body, (error, count) =>
			if count > 0
				@send({
					success	: true
					_id		: @params.id
					payload	: @body
				}, 200)
			else
				@send({
					success	: false
					msg		: 'Record not found'
					_id		: @params.id
				}, 404)

	@del '/todo/:id', ->
		params =
			_id: @params.id

		db.todo.remove params, (error, count) =>
			if count == 1
				@send({
					success	: true
					_id		: @params.id
				}, 200);
			else
				@send({
					success	: false
					msg		: 'Record not found'
					_id		: @params.id
				}, 404)

	@set 'view options': layout: false
	@set views: "#{__dirname}/../views"
	@get '/', ->
		@render 'rest.jade', url: 'http://'+@request.headers.host