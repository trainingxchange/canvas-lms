(function() {
  define(function() {
    var markScriptLoaded;

    return markScriptLoaded = function(urls) {
      var id, url, _i, _len, _results;

      _results = [];
      for (_i = 0, _len = urls.length; _i < _len; _i++) {
        url = urls[_i];
        id = tinymce.baseURI.toAbsolute(url) + '.js';
        _results.push(tinymce.ScriptLoader.markDone(id));
      }
      return _results;
    };
  });

}).call(this);
