(function() {
  var __slice = [].slice;

  define(function() {
    return function() {
      var Delegator, method, methods, receiver, _i, _len, _results;

      Delegator = arguments[0], receiver = arguments[1], methods = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      _results = [];
      for (_i = 0, _len = methods.length; _i < _len; _i++) {
        method = methods[_i];
        _results.push((function(method) {
          return Delegator.prototype[method] = function() {
            return this[receiver][method].apply(this[receiver], arguments);
          };
        })(method));
      }
      return _results;
    };
  });

}).call(this);
