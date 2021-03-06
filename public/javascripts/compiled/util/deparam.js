(function() {
  var __slice = [].slice;

  define(['compiled/object/unflatten'], function(unflatten) {
    var coerceTypes, deparam;

    coerceTypes = {
      'true': true,
      'false': false,
      'null': null
    };
    return deparam = function(params, coerce) {
      var currentQueryString, key, obj, param, val, _i, _len, _ref, _ref1;

      if (!params || typeof params === 'boolean') {
        currentQueryString = window.location.search.replace(/^\?/, '');
        if (!currentQueryString) {
          return {};
        }
        return deparam.apply(null, [currentQueryString].concat(__slice.call(arguments)));
      }
      obj = {};
      _ref = params.replace(/\+/g, " ").split("&");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        _ref1 = param.split('='), key = _ref1[0], val = _ref1[1];
        key = decodeURIComponent(key);
        val = decodeURIComponent(val);
        if (coerce) {
          val = val && !isNaN(val) ? +val : val === 'undefined' ? void 0 : coerceTypes[val] !== void 0 ? coerceTypes[val] : val;
        }
        obj[key] = val;
      }
      return unflatten(obj);
    };
  });

}).call(this);
