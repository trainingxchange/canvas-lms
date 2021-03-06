(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'i18n!accounts', 'compiled/views/ValidatedFormView', 'str/htmlEscape', 'jst/accounts/settings/Quotas', 'compiled/jquery.rails_flash_notifications'], function($, I18n, ValidatedFormView, htmlEscape, template) {
    var QuotasView, _ref;

    return QuotasView = (function(_super) {
      __extends(QuotasView, _super);

      function QuotasView() {
        _ref = QuotasView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      QuotasView.prototype.template = template;

      QuotasView.INTEGER_REGEX = /^[+-]?\d+$/;

      QuotasView.prototype.tag = 'form';

      QuotasView.prototype.id = 'default-quotas';

      QuotasView.prototype.className = 'form-horizontal account_settings';

      QuotasView.prototype.integerFields = ['default_storage_quota_mb', 'default_user_storage_quota_mb', 'default_group_storage_quota_mb'];

      QuotasView.prototype.events = {
        'submit': 'submit'
      };

      QuotasView.prototype.initialize = function() {
        var integerField, _i, _len, _ref1;

        this.events || (this.events = []);
        this.els || (this.els = []);
        _ref1 = this.integerFields;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          integerField = _ref1[_i];
          this.events["input [name=\"" + integerField + "\"]"] = 'validate';
          this.els["[name=\"" + integerField + "\"]"] = "$" + integerField;
        }
        this.on('success', this.submitSuccess);
        this.on('fail', this.submitFail);
        return QuotasView.__super__.initialize.apply(this, arguments);
      };

      QuotasView.prototype.submitSuccess = function() {
        return $.flashMessage(I18n.t('default_account_quotas_updated', 'Default account quotas updated'));
      };

      QuotasView.prototype.submitFail = function(errors) {
        var integerField, unknownFailure, _i, _len, _ref1;

        unknownFailure = true;
        _ref1 = this.integerFields;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          integerField = _ref1[_i];
          if (integerField in errors) {
            unknownFailure = false;
          }
        }
        if (unknownFailure) {
          return $.flashError(I18n.t('default_account_quotas_not_updated', 'Default account quotas were not updated'));
        }
      };

      QuotasView.prototype.validateFormData = function(data) {
        var errors, integerField, _i, _len, _ref1;

        errors = {};
        _ref1 = this.integerFields;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          integerField = _ref1[_i];
          if (!data[integerField].match(this.constructor.INTEGER_REGEX)) {
            errors[integerField] = [
              {
                type: 'integer_required',
                message: I18n.t('integer_required', 'An integer value is required')
              }
            ];
          }
        }
        return errors;
      };

      QuotasView.prototype.validateBeforeSave = function() {
        return {};
      };

      QuotasView.prototype.hideErrors = function() {
        var control_groups;

        control_groups = this.$('div.control-group.error');
        control_groups.removeClass('error');
        return control_groups.find('.help-inline').remove();
      };

      QuotasView.prototype.showErrors = function(errors) {
        var control_group, helpInline, integerField, message, messages, _i, _len, _ref1, _results;

        _ref1 = this.integerFields;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          integerField = _ref1[_i];
          control_group = this["$" + integerField].closest('div.control-group');
          messages = errors[integerField];
          control_group.toggleClass('error', messages != null);
          if (messages) {
            helpInline = $('<span class="help-inline"></span>');
            helpInline.html(((function() {
              var _j, _len1, _results1;

              _results1 = [];
              for (_j = 0, _len1 = messages.length; _j < _len1; _j++) {
                message = messages[_j].message;
                _results1.push(htmlEscape(message));
              }
              return _results1;
            })()).join('<br/>'));
            _results.push(control_group.find('.controls').append(helpInline));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return QuotasView;

    })(ValidatedFormView);
  });

}).call(this);
