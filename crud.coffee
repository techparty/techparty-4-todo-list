mongoose = require 'mongoose'
mongoose.connect 'mongodb://localhost/my_database'
UserSchema = new mongoose.Schema({
	user_name	: {type: String, unique: true}
	name     	: String
	password 	: {type: String, required: true}
},{
	strict: true
})
User = mongoose.model 'User', UserSchema

require('zappa') ->
	@use 'bodyParser', static: __dirname + '/'

	@get '/users/:id?': ->
		params = {}
		params.user_name = @params.id if @params.id
		User.find params, (err, docs) =>
			@send docs

	@post '/users/:id?': ->
		newUser = new User @body
		newUser.save (error, record) =>
			if error
				@send error, 400
			else
				@send record

	@put '/users/:id': ->
		filter = user_name: @params.id
		User.update filter, @body, (error, count) =>
			if count == 1
				@send @body
			else
				@send "Record not found (#{@params.id})", 400

	@del '/users/:id': ->
		filter = user_name: @params.id
		User.remove filter, (error, count) =>
			if count == 1
				@send success: true, 200
			else
				@send "Record not found (#{@params.id})", 400