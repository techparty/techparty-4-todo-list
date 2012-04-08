var db = require('./db'),
	docs = [];

exports.callback = function(cb)
{
	db.todo.remove({}, function()
	{
		for(var i = 0; i < 10; i++)
		{
			var record = new db.todo({
				title    : 'Todo '+i,
				createdAt: new Date(),
				todoDate : new Date(),
				priority : 'Low',
				status   : 'Completed',
				user     : 'Rodrigo'
			});
			record.save(function(err, doc)
			{
				docs.push(doc);
				if(docs.length === 10)
					cb(err, docs);
			});
		}
	});
}