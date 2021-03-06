(function() {
  define(['compiled/arr/walk'], function(walk) {
    var countTree;

    return countTree = function(obj, prop) {
      var count;

      count = 0;
      if (!obj[prop]) {
        return count;
      }
      walk(obj[prop], prop, function() {
        return count++;
      });
      return count;
    };
  });

}).call(this);
