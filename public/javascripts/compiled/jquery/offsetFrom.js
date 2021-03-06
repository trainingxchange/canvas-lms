(function() {
  define(['jquery'], function($) {
    return $.fn.offsetFrom = function($other) {
      var other, own;

      own = $(this).offset();
      other = $other.offset();
      return {
        top: own.top - other.top,
        left: own.left - other.left
      };
    };
  });

}).call(this);
