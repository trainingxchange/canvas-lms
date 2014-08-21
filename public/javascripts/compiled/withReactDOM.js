(function() {
  define(['react'], function(React) {
    var withReactDOM;

    return withReactDOM = function(fn) {
      return function() {
        var old, retVal, tag, tagName, _ref, _ref1;

        old = {};
        _ref = React.DOM;
        for (tagName in _ref) {
          tag = _ref[tagName];
          old[tagName] = window[tagName];
          window[tagName] = tag;
        }
        retVal = fn.apply(this, arguments);
        _ref1 = React.DOM;
        for (tagName in _ref1) {
          tag = _ref1[tagName];
          window[tagName] = old[tagName];
        }
        return retVal;
      };
    };
  });

}).call(this);
