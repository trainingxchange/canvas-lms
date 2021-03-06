(function() {
  define(['jquery', 'underscore', 'i18n!validate'], function($, _, I18n) {
    return $.fn.validate = function() {
      var errors, hasErrors;

      errors = {};
      this.find('[required]').each(function() {
        var $input, name, value, _ref;

        $input = $(this);
        name = $input.attr('name');
        value = $input.val();
        if (value === '') {
          return ((_ref = errors[name]) != null ? _ref : errors[name] = []).push({
            name: name,
            type: 'required',
            message: I18n.t('is_required', 'This field is required')
          });
        }
      });
      hasErrors = _.size(errors) > 0;
      if (hasErrors) {
        this.data('errors', errors);
        return false;
      } else {
        this.data('errors', null);
        return true;
      }
    };
  });

}).call(this);
