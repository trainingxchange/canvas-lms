(function() {
  define(['jquery', 'i18n!profile', 'compiled/fn/preventDefault', 'jquery.ajaxJSON', 'compiled/jquery.rails_flash_notifications'], function($, I18n, preventDefault) {
    return $(function() {
      var resending;

      resending = false;
      return $('.re_send_confirmation_link').click(preventDefault(function() {
        var $this, text;

        $this = $(this);
        text = $this.text();
        if (resending) {
          return;
        }
        resending = true;
        $this.text(I18n.t('resending', 'resending...'));
        return $.ajaxJSON($this.attr('href'), 'POST', {}, function(data) {
          resending = false;
          $this.text(text);
          return $.flashMessage(I18n.t("done_resending", "Done! Message delivery may take a few minutes."));
        }, function(data) {
          resending = false;
          $this.text(text);
          return $.flashError(I18n.t("failed_resending", "Request failed. Try again."));
        });
      }));
    });
  });

}).call(this);
