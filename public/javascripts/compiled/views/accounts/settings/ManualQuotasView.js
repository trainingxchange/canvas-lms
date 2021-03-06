(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'i18n!accounts', 'compiled/models/Course', 'compiled/models/Group', 'compiled/views/ValidatedFormView', 'str/htmlEscape', 'jst/accounts/settings/ManualQuotas', 'compiled/jquery.rails_flash_notifications'], function($, I18n, Course, Group, ValidatedFormView, htmlEscape, template) {
    var ManualQuotasView, _ref;

    return ManualQuotasView = (function(_super) {
      __extends(ManualQuotasView, _super);

      function ManualQuotasView() {
        this.findSuccess = __bind(this.findSuccess, this);
        this.findError = __bind(this.findError, this);        _ref = ManualQuotasView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ManualQuotasView.prototype.template = template;

      ManualQuotasView.INTEGER_REGEX = /^[+-]?\d+$/;

      ManualQuotasView.prototype.tag = 'form';

      ManualQuotasView.prototype.id = 'manual-quotas';

      ManualQuotasView.prototype.className = 'form-horizontal';

      ManualQuotasView.prototype.els = {
        '#manual_quotas_type': '$type',
        '#manual_quotas_id': '$id',
        '#manual_quotas_quota': '$quota',
        '#manual_quotas_result': '$result',
        '#manual_quotas_link': '$link'
      };

      ManualQuotasView.prototype.fields = ['type', 'id', 'quota'];

      ManualQuotasView.prototype.integerFields = ['id', 'quota'];

      ManualQuotasView.prototype.initialize = function() {
        this.events || (this.events = []);
        this.events["input #manual_quotas_id"] = 'validate';
        this.events["input #manual_quotas_quota"] = 'validate';
        this.events["click #manual_quotas_find_button"] = 'findItem';
        this.on('success', this.submitSuccess);
        this.on('fail', this.submitFail);
        return ManualQuotasView.__super__.initialize.apply(this, arguments);
      };

      ManualQuotasView.prototype.afterRender = function() {
        var _this = this;

        this.$id.keypress(function(e) {
          if (e.keyCode === $.ui.keyCode.ENTER) {
            return _this.findItem();
          }
        });
        return this.$result.hide();
      };

      ManualQuotasView.prototype.submitSuccess = function() {
        return $.flashMessage(I18n.t('quota_updated', 'Quota updated'));
      };

      ManualQuotasView.prototype.submitFail = function(errors) {
        return $.flashError(I18n.t('quota_not_updated', 'Quota was not updated'));
      };

      ManualQuotasView.prototype.getFormData = function() {
        var data, field, _i, _len, _ref1;

        data = {};
        _ref1 = this.fields;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          field = _ref1[_i];
          data[field] = this["$" + field].val();
        }
        return data;
      };

      ManualQuotasView.prototype.saveFormData = function() {
        return this.model.save({
          storage_quota_mb: this.$quota.val()
        }, this.saveOpts);
      };

      ManualQuotasView.prototype.validateFormData = function(data) {
        var errors, integerField, _i, _len, _ref1;

        errors = {};
        _ref1 = this.integerFields;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          integerField = _ref1[_i];
          if (!(data[integerField] === '' || data[integerField].match(this.constructor.INTEGER_REGEX))) {
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

      ManualQuotasView.prototype.validateBeforeSave = function() {
        return {};
      };

      ManualQuotasView.prototype.hideErrors = function() {
        var control_groups;

        control_groups = this.$('div.control-group.error');
        control_groups.removeClass('error');
        return control_groups.find('.help-inline').remove();
      };

      ManualQuotasView.prototype.showErrors = function(errors) {
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

      ManualQuotasView.prototype.findItem = function() {
        var data, path, type;

        this.hideErrors();
        data = this.getFormData();
        this.model = null;
        if (data.type === 'course') {
          this.model = new Course({
            id: data.id
          });
          path = '/courses';
          type = I18n.t('course_type', 'course');
        } else if (data.type === 'group') {
          this.model = new Group({
            id: data.id
          });
          path = '/groups';
          type = I18n.t('group_type', 'group');
        }
        if (this.model) {
          this.model.urlRoot = '/api/v1' + path;
          this.model.path = path;
          this.model.type = type;
          this.disablingDfd = new $.Deferred();
          this.$result.hide();
          this.$el.disableWhileLoading(this.disablingDfd);
          return this.model.fetch({
            error: this.findError,
            success: this.findSuccess
          });
        }
      };

      ManualQuotasView.prototype.findError = function(model, error) {
        var errors;

        this.disablingDfd.reject();
        this.hideErrors();
        if (error.status === 401) {
          errors = {
            id: [
              {
                type: 'not_authorized',
                message: I18n.t('find_not_authorized', 'You are not authorized to access that %{type}', {
                  type: model.type
                })
              }
            ]
          };
        } else {
          errors = {
            id: [
              {
                type: 'not_found',
                message: I18n.t('find_not_found', 'Could not find a %{type} with that ID', {
                  type: model.type
                })
              }
            ]
          };
        }
        return this.showErrors(errors);
      };

      ManualQuotasView.prototype.findSuccess = function() {
        this.$link.html(this.model.get('name'));
        this.$link.attr('href', this.model.path + '/' + this.model.get('id'));
        this.$quota.val(this.model.get('storage_quota_mb'));
        this.$result.show();
        return this.disablingDfd.resolve();
      };

      return ManualQuotasView;

    })(ValidatedFormView);
  });

}).call(this);
