(function() {
  define(['jquery'], function($) {
    return function() {
      return $('.vdd_tooltip_link').tooltip({
        position: {
          my: 'center bottom',
          at: 'center top-10',
          collision: 'fit fit'
        },
        tooltipClass: 'center bottom vertical',
        content: function() {
          return $($(this).data('tooltipSelector')).html();
        }
      });
    };
  });

}).call(this);
