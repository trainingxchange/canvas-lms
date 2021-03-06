(function() {
  define(['jquery'], function($) {
    var FakeXHR;

    return FakeXHR = (function() {
      function FakeXHR() {
        this.readyState = 0;
        this.timeout = 0;
        this.withCredentials = false;
      }

      FakeXHR.prototype.setResponse = function(body) {
        var e;

        this.readyState = 4;
        this.responseText = body;
        try {
          this.response = $.parseJSON(body);
        } catch (_error) {
          e = _error;
          this.status = 500;
          this.statusText = "500 Internal Server Error";
          return;
        }
        if (this.response.errors) {
          this.status = 400;
          this.statusText = "400 Bad Request";
        } else {
          this.status = 200;
          this.statusText = "200 OK";
        }
        return this.responseType = "json";
      };

      FakeXHR.prototype.abort = function() {};

      FakeXHR.prototype.getAllResponseHeaders = function() {
        if (this.responseText) {
          return "";
        } else {
          return null;
        }
      };

      FakeXHR.prototype.getResponseHeader = function() {};

      FakeXHR.prototype.open = function() {};

      FakeXHR.prototype.overrideMimeType = function() {};

      FakeXHR.prototype.send = function() {};

      FakeXHR.prototype.setRequestHeader = function() {};

      return FakeXHR;

    })();
  });

}).call(this);
