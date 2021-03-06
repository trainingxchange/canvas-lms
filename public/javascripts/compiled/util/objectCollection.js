(function() {
  define(function() {
    return function(array) {
      array.indexOf = function(needle) {
        var index, item, _i, _len;

        for (index = _i = 0, _len = array.length; _i < _len; index = ++_i) {
          item = array[index];
          if (item === needle) {
            return index;
          }
        }
      };
      -1;
      array.findBy = function(prop, value) {
        var index, item, _i, _len;

        for (index = _i = 0, _len = array.length; _i < _len; index = ++_i) {
          item = array[index];
          if (item[prop] === value) {
            return item;
          }
        }
        return false;
      };
      array.eraseBy = function(prop, value) {
        var item;

        item = array.findBy(prop, value);
        return array.erase(item);
      };
      array.insert = function(item, index) {
        if (index == null) {
          index = 0;
        }
        return array.splice(index, 0, item);
      };
      array.erase = function(victim) {
        var index, prospect, _i, _len, _results;

        _results = [];
        for (index = _i = 0, _len = array.length; _i < _len; index = ++_i) {
          prospect = array[index];
          if (prospect === victim) {
            _results.push(array.splice(index, 1));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      array.sortBy = (function() {
        var sorters;

        sorters = {
          string: function(a, b) {
            if (a < b) {
              return -1;
            } else if (a > b) {
              return 1;
            } else {
              return 0;
            }
          },
          number: function(a, b) {
            return a - b;
          }
        };
        return function(prop) {
          var type;

          if (array.length === 0) {
            return array;
          }
          type = typeof array[0][prop] || 'string';
          return array.sort(function(a, b) {
            return sorters[type](a[prop], b[prop]);
          });
        };
      })();
      return array;
    };
  });

}).call(this);
