(function() {
  var __slice = [].slice;

  define(['jquery'], function($) {
    $.whenAll = function() {
      var d, dfds;

      dfds = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      dfds = (function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = dfds.length; _i < _len; _i++) {
          d = dfds[_i];
          _results.push((function() {
            var dfd;

            dfd = $.Deferred();
            $.when(d).always(function() {
              var args;

              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              return dfd.resolve.apply(dfd, args);
            });
            return dfd.promise();
          })());
        }
        return _results;
      })();
      return $.when.apply($, dfds);
    };
    return $;
  });

}).call(this);
