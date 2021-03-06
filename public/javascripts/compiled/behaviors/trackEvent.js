(function() {
  define(['jquery', 'jquery.google-analytics'], function($) {
    return $('body').on('click', '[data-track-category]', function(event) {
      var trackAction, trackCategory, trackLabel, trackValue, _ref;

      _ref = $(this).data(), trackCategory = _ref.trackCategory, trackLabel = _ref.trackLabel, trackAction = _ref.trackAction, trackValue = _ref.trackValue;
      $.trackEvent(trackCategory, trackAction, trackLabel, trackValue);
      return null;
    });
  });

}).call(this);
