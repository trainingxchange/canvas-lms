(function() {
  var __slice = [].slice;

  define(['underscore'], function(_) {
    return {
      cache: {
        prefix: '',
        store: {},
        use: function(store) {
          return this.store = (function() {
            switch (store) {
              case 'memory':
                return {};
              case 'sessionStorage':
                return sessionStorage;
              case 'localStorage':
                return localStorage;
            }
          })();
        },
        toKey: function() {
          var arg, key;

          key = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return this.prefix + ((function() {
            var _i, _len, _ref, _results;

            _ref = _.flatten(key);
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              arg = _ref[_i];
              _results.push(JSON.stringify(arg));
            }
            return _results;
          })()).join('|');
        },
        get: function() {
          var key, val;

          key = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (val = this.store[this.toKey(key)]) {
            return JSON.parse(val);
          } else {
            return null;
          }
        },
        set: function() {
          var key, value, _i;

          key = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), value = arguments[_i++];
          this.store[this.toKey(key)] = JSON.stringify(value);
          return this;
        },
        remove: function() {
          var key;

          key = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return delete this.store[this.toKey(key)];
        }
      }
    };
  });

}).call(this);
