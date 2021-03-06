(function() {
  define(['jquery', 'jquery.disableWhileLoading'], function($) {
    var newCourseForm;

    return newCourseForm = function() {
      var $nameInput, changeEvents, showCourseCodeIfNeeded;

      changeEvents = 'change keyup input';
      showCourseCodeIfNeeded = function() {
        if ($nameInput.val().trim().length > 20) {
          $nameInput.unbind(changeEvents, showCourseCodeIfNeeded);
          return $('#course_code_wrapper').slideDown('fast');
        }
      };
      $nameInput = $('#new_course_form [name="course[name]"]');
      $nameInput.bind(changeEvents, showCourseCodeIfNeeded);
      return $('#new_course_form').submit(function() {
        return $(this).disableWhileLoading($.Deferred());
      });
    };
  });

}).call(this);
