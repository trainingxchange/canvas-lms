(function() {
  define(['underscore'], function(_) {
    var unflatten;

    return unflatten = function(obj) {
      return _(obj).reduce(function(newObj, val, key) {
        var cur, i, keys, lastKey;

        keys = key.split('][');
        lastKey = keys.length - 1;
        if (/\[/.test(keys[0]) && /\]$/.test(keys[lastKey])) {
          keys[lastKey] = keys[lastKey].replace(/\]$/, '');
          keys = keys.shift().split('[').concat(keys);
          lastKey = keys.length - 1;
        } else {
          lastKey = 0;
        }
        if (lastKey) {
          i = 0;
          cur = newObj;
          while (i <= lastKey) {
            key = keys[i] === "" ? cur.length : keys[i];
            cur = cur[key] = i < lastKey ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
            i++;
          }
        } else {
          if (_.isArray(newObj[key])) {
            newObj[key].push(val);
          } else if (newObj[key] != null) {
            newObj[key] = [newObj[key], val];
          } else {
            newObj[key] = val;
          }
        }
        return newObj;
      }, {});
    };
  });

}).call(this);
