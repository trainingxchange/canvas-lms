(function() {
  require(['jquery', 'underscore', 'Backbone'], function($, _, Backbone) {
    var matchesBackboneRoute, routeStripper;

    routeStripper = /^[#\/]/;
    matchesBackboneRoute = function(url) {
      return _.any(Backbone.history.handlers, function(handler) {
        return handler.route.test(url.replace(routeStripper, ''));
      });
    };
    return $(document).on('click', 'a[href]', function(event) {
      var url;

      url = $(this).attr('href');
      if (matchesBackboneRoute(url)) {
        Backbone.history.navigate(url, {
          trigger: true
        });
        return event.preventDefault();
      }
    });
  });

}).call(this);
