(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  require(['jquery', 'compiled/util/Popover'], function($, Popover) {
    return $(function() {
      var $select, $warningLink, checkWarningIcon;

      $select = $('select.locale');
      $warningLink = $('i.locale-warning');
      $warningLink.hide();
      checkWarningIcon = function() {
        var _ref;

        if (_ref = $select.val(), __indexOf.call(ENV.crowdsourced_locales, _ref) >= 0) {
          return $warningLink.show();
        } else {
          return $warningLink.hide();
        }
      };
      $select.change(function() {
        return checkWarningIcon();
      });
      return checkWarningIcon();
    });
  });

}).call(this);
