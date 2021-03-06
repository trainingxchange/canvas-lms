(function() {
  define(['jquery', 'i18n!registration', 'jst/registration/incompleteRegistrationWarning'], function($, I18n, template) {
    if (ENV.INCOMPLETE_REGISTRATION) {
      return $(template({
        email: ENV.USER_EMAIL
      })).appendTo($('body')).dialog({
        title: I18n.t('welcome_to_canvas', 'Welcome to Canvas!'),
        width: 400,
        resizable: false,
        buttons: [
          {
            text: I18n.t('get_started', 'Get Started'),
            click: function() {
              return $(this).dialog('close');
            },
            "class": 'btn-primary'
          }
        ]
      });
    }
  });

}).call(this);
