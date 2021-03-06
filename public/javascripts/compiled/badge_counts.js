(function() {
  define(['jquery'], function($) {
    return $(document).ready(function() {
      var $badge, type, unread, _ref, _results;

      if (ENV.badge_counts) {
        _ref = ENV.badge_counts;
        _results = [];
        for (type in _ref) {
          unread = _ref[type];
          if (unread > 0) {
            if (type === "submissions") {
              type = "grades";
            }
            $badge = $("<b/>").append(unread).addClass("nav-badge");
            _results.push($("#section-tabs ." + type).append($badge));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    });
  });

}).call(this);
