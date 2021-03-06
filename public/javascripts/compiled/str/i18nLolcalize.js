(function() {
  define([], function() {
    var formatter, i18nLolcalize, letThereBeLols;

    formatter = {
      0: 'toUpperCase',
      1: 'toLowerCase'
    };
    letThereBeLols = function(str) {
      var i, pattern, result, s, token;

      pattern = /(\s*%h?\{[^\}]+\}\s*|\s*[\n\\`\*_\{\}\[\]\(\)\#\+\-!]+\s*|^\s+)/;
      result = (function() {
        var _i, _j, _len, _ref, _ref1, _results;

        _ref = str.split(pattern);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          token = _ref[_i];
          if (token.match(pattern)) {
            _results.push(token);
          } else {
            s = '';
            for (i = _j = 0, _ref1 = token.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
              s += token[i][formatter[i % 2]]();
            }
            s = s.replace(/\.( |$)/, '!!?! ');
            s = s.replace(/^(\w+)$/, '$1!');
            if (s.length > 2) {
              s += " LOL!";
            }
            _results.push(s);
          }
        }
        return _results;
      })();
      return result.join('');
    };
    return i18nLolcalize = function(strOrObj) {
      var key, result, value;

      if (typeof strOrObj === 'string') {
        return letThereBeLols(strOrObj);
      } else {
        result = {};
        for (key in strOrObj) {
          value = strOrObj[key];
          result[key] = letThereBeLols(value);
        }
        return result;
      }
    };
  });

}).call(this);
