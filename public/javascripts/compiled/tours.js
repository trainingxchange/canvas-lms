(function() {
  define(['require'], function(require) {
    return {
      init: function() {
        var tourName, _i, _len, _ref, _results;

        if (!ENV.TOURS) {
          return;
        }
        _ref = ENV.TOURS;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tourName = _ref[_i];
          _results.push(require(["compiled/views/tours/" + tourName], function(tour) {
            return new tour({
              name: tourName
            });
          }));
        }
        return _results;
      }
    };
  });

}).call(this);
