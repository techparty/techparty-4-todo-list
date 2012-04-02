exports.request = (type, url, callback, parameters) ->
	xhr = Ti.Network.createHTTPClient
		onload: ->
			callback(this.responseText)
		onerror: ->
			alert "Algum erro ocorreu em sua requisição"
	
	xhr.open type, url
	xhr.send parameters