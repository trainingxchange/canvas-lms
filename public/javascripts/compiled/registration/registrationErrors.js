(function() {
  define(['compiled/models/User', 'compiled/models/Pseudonym', 'compiled/object/flatten'], function(User, Pseudonym, flatten) {
    var registrationErrors;

    return registrationErrors = function(errors, passwordPolicy) {
      if (passwordPolicy == null) {
        passwordPolicy = ENV.PASSWORD_POLICY;
      }
      return flatten({
        user: User.prototype.normalizeErrors(errors.user),
        pseudonym: Pseudonym.prototype.normalizeErrors(errors.pseudonym, passwordPolicy),
        observee: Pseudonym.prototype.normalizeErrors(errors.observee, passwordPolicy)
      }, {
        arrays: false
      });
    };
  });

}).call(this);
