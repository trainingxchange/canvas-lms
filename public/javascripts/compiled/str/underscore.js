(function() {
  define(function() {
    var underscore;

    return underscore = function(string) {
      if (typeof string !== 'string' || string === '') {
        return string;
      }
      return string.replace(/([A-Z])/g, '_$1').replace(/^_/, '').toLowerCase();
    };
  });

}).call(this);
