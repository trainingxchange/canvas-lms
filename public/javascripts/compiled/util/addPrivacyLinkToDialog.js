(function() {
  define(['i18n!site'], function(I18n) {
    var addPrivacyLinkToDialog;

    return addPrivacyLinkToDialog = function($dialog) {
      var $buttonPane, $privacy;

      if (!ENV.ACCOUNT.privacy_policy_url) {
        return;
      }
      $privacy = $('<a>', {
        href: ENV.ACCOUNT.privacy_policy_url,
        style: "padding-left: 1em; line-height: 3em",
        'class': 'privacy_policy_link',
        target: "_blank"
      });
      $buttonPane = $dialog.closest('.ui-dialog').find('.ui-dialog-buttonpane');
      if (!$buttonPane.find('.privacy_policy_link').length) {
        $privacy.text(I18n.t('view_privacy_policy', 'View Privacy Policy'));
        return $buttonPane.append($privacy);
      }
    };
  });

}).call(this);
