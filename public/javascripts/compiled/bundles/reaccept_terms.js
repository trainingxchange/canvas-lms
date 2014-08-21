(function() {
  require(['jquery', 'compiled/models/User', 'jquery.instructure_forms'], function($, User) {
    return $('.reaccept_terms').formSubmit({
      success: function() {
        return location.reload();
      },
      errorFormatter: User.prototype.normalizeErrors.bind(User.prototype)
    });
  });

}).call(this);
