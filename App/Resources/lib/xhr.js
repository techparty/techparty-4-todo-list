(function() {

  exports.request = function(type, url, callback, parameters) {
    var xhr;
    Ti.API.info("Type: " + type);
    Ti.API.info("URL: " + url);
    Ti.API.info("Parameters: " + parameters);
    xhr = Ti.Network.createHTTPClient({
      onload: function() {
        Ti.API.info("Response: " + this.responseText);
        return callback(this.responseText);
      },
      onerror: function() {
        Ti.API.info("Error: " + this.responseText);
        return alert("Algum erro ocorreu em sua requisição");
      }
    });
    xhr.open(type, url);
    return xhr.send(parameters);
  };

}).call(this);
