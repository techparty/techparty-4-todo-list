exports.request = (type, url, callback, parameters) ->

	Ti.API.info "Type: #{type}"
	Ti.API.info "URL: #{url}"
	Ti.API.info "Parameters: #{parameters}"

	xhr = Ti.Network.createHTTPClient
		onload: ->
			Ti.API.info "Response: #{this.responseText}"
			callback(this.responseText)
		onerror: ->
			Ti.API.info "Error: #{this.responseText}"
			alert "Algum erro ocorreu em sua requisição"
	
	xhr.open type, url
	xhr.send parameters