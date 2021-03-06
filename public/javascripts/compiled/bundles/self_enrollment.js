(function() {
  require(['jquery', 'compiled/views/registration/SelfEnrollmentForm'], function($, SelfEnrollmentForm) {
    var options, _ref;

    options = $.extend({}, (_ref = ENV.SELF_ENROLLMENT_OPTIONS) != null ? _ref : {}, {
      el: '#enroll_form'
    });
    return new SelfEnrollmentForm(options);
  });

}).call(this);
