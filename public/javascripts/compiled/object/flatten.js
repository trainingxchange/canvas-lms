(function() {
  define(function() {
    var flatten;

    return flatten = function(obj, options, result, prefix) {
      var flattenable, key, value;

      if (options == null) {
        options = {};
      }
      if (result == null) {
        result = {};
      }
      for (key in obj) {
        value = obj[key];
        key = prefix ? "" + prefix + "[" + key + "]" : key;
        flattenable = typeof value === 'object';
        if ((value.length != null) && options.arrays === false) {
          flattenable = false;
        }
        if (flattenable) {
          flatten(value, options, result, key);
        } else {
          result[key] = value;
        }
      }
      return result;
    };
  });

}).call(this);
