(function() {
  require(['jquery', 'compiled/registration/registrationErrors', 'jquery.instructure_forms'], function($, registrationErrors) {
    var $form;

    $form = $('#change_password_form');
    return $form.formSubmit({
      disableWhileLoading: 'spin_on_success',
      errorFormatter: function(errors) {
        var pseudonymId, _ref;

        pseudonymId = $form.find("#pseudonym_id_select").val();
        return registrationErrors(errors, (_ref = ENV.PASSWORD_POLICIES[pseudonymId]) != null ? _ref : ENV.PASSWORD_POLICY);
      },
      success: function() {
        return location.href = '/';
      },
      error: function(errors) {
        if (errors.nonce) {
          return location.href = '/login';
        }
      }
    });
  });

}).call(this);
