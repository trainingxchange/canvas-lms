(function() {
  define(['react'], function(React) {
    var globalDomInjected, window, withGlobalDom;

    window = this;
    globalDomInjected = false;
    return withGlobalDom = function(fn) {
      return function() {
        var key, originals, res;

        if (globalDomInjected) {
          return fn.apply(this, arguments);
        }
        originals = {};
        for (key in React.DOM) {
          if (key in window) {
            originals[key] = window[key];
          }
          window[key] = React.DOM[key];
        }
        globalDomInjected = true;
        res = fn.apply(this, arguments);
        for (key in React.DOM) {
          if (key in originals) {
            window[key] = originals[key];
          } else {
            delete window[key];
          }
        }
        globalDomInjected = false;
        return res;
      };
    };
  });

}).call(this);
