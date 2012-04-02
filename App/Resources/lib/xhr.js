(function() {

  exports.request = function(type, url, callback, parameters) {
    var xhr;
    xhr = Ti.Network.createHTTPClient({
      onload: function() {
        return callback(this.responseText);
      },
      onerror: function() {
        return alert("Algum erro ocorreu em sua requisição");
      }
    });
    xhr.open(type, url);
    return xhr.send(parameters);
  };

}).call(this);
