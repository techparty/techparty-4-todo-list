process.env.TEST = true;

var vows   = require('vows'),
	assert = require('assert'),
	tobi   = require('tobi'),
	http   = require('http'),
	app    = require('../node_app/todo'),
	client = tobi.createBrowser(3000, 'localhost');

function assertStatus(code)
{
	return function (res, $)
	{
		assert.equal (res.statusCode, code);
	};
}

function responds(cb, payload)
{
	var context = function()
	{
		this.topic = function()
		{
			if(cb)
			{
				this.context.name = cb(this.context.name);
				this.context.title = this.context.name;
			}

			var req    = this.context.name.split(/ +/)
				method = req.shift().toLowerCase(),
				path   = req.join(' ');
			
			if(payload)
			{
				client[method](path, {body:JSON.stringify(payload), headers:{'Content-Type':'application/json'}}, this.callback);
			}
			else
			{
				client[method](path, this.callback);
			}
		}
	}

	context.prototype.withStatus = function(status)
	{
		this['should respond with a ' + status + ' ' + http.STATUS_CODES[status]] = assertStatus(status);
		return this;
	}

	context.prototype.asArray = function(count)
	{
		this['should be an Array'] = function(res, req)
		{
			assert.isArray(res.body)
		};
		if(count !== null)
		{
			this['should be an Array with '+count+' items'] = function(res, req)
			{
				assert.lengthOf(res.body, count)
			};
		}
		return this;
	}

	context.prototype.asObject = function(count)
	{
		this['should be an Object'] = function(res, req)
		{
			assert.isObject(res.body)
		};
		return this;
	}

	context.prototype.withProperty = function(property, value)
	{
		this['should contain property "'+property+'"'] = function(res, req)
		{
			assert.isNotNull(res.body[property])
		};
		if(value !== null)
		{
			this['should contain property "'+property+'" with value "'+value+'"'] = function(res, req)
			{
				assert.equal(res.body[property], value)
			};
		}
		return this;
	}

	context.prototype.getValue = function(cb)
	{
		this['returned value'] = function(res, req)
		{
			cb(res.body, res, req);
			assert.isNotNull(res.body);
		};
		return this;
	}

	return new context();
}

var documents = null;
var suite = vows.describe('REST API');

suite.addBatch({
	'Run Bootstrap': {
		topic: function()
		{
			require('../node_app/bootstrap').callback(this.callback);
		},

		'insert 10 docs': function(e, docs)
		{
			documents = docs;
			assert.lengthOf(docs, 10)
		}
	}
});

suite.addBatch({
	'GET /': responds().withStatus(200),
	'GET /todo/Rodrigo': responds().withStatus(200).asArray(10),
	'GET /todo/Rodrigo/title/Todo%202': responds().withStatus(200).asArray(1),
	'GET /todo/Rodrigo/title/Todo%2020': responds().withStatus(200).asArray(0),
	'GET /todo/id/123': responds().withStatus(204),
	'GET /todo/id/': responds(function(p){return p+documents[0]._id}).withStatus(200).asObject()
});

suite.addBatch({
	'PUT /todo/': responds(function(p){return p+documents[0]._id}, {title: 'Todo_New'}).withStatus(200).asObject()
});

suite.addBatch({
	'GET /todo/Rodrigo': responds().withStatus(200).asArray(10),
	'GET /todo/id/': responds(function(p){return p+documents[0]._id}).withStatus(200).asObject().withProperty('title', 'Todo_New')
});

suite.addBatch({
	'DELETE /todo/': responds(function(p){return p+documents[0]._id}).withStatus(200).asObject()
});

suite.addBatch({
	'GET /todo/Rodrigo': responds().withStatus(200).asArray(9),
	'GET /todo/id/': responds(function(p){return p+documents[0]._id}).withStatus(204)
});

suite.addBatch({
	'POST /todo/': responds(null, {
		title    : 'Todo_POST',
		status   : 'Completed',
		user     : 'Rodrigo'
	}).withStatus(400).asObject().withProperty('success', false),
});

var new_id = null;
suite.addBatch({
	'POST /todo/': responds(null, {
		title    : 'Todo_POST',
		createdAt: new Date(),
		todoDate : new Date(),
		priority : 'Low',
		status   : 'Completed',
		user     : 'Rodrigo'
	}).withStatus(200).asObject().withProperty('success', true).getValue(function(value)
	{
		new_id = value.payload._id;
	})
});

suite.addBatch({
	'GET /todo/Rodrigo': responds().withStatus(200).asArray(10),
	'GET /todo/id/': responds(function(p){return p+new_id}).withStatus(200).asObject().withProperty('title', 'Todo_POST')
});

suite.export(module);