(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'i18n!groups', 'compiled/views/DialogFormView', 'jst/EmptyDialogFormWrapper', 'jst/groups/manage/groupCategoryEdit', 'str/htmlEscape'], function(_, I18n, DialogFormView, wrapperTemplate, template, h) {
    var GroupCategoryEditView, _ref;

    return GroupCategoryEditView = (function(_super) {
      __extends(GroupCategoryEditView, _super);

      function GroupCategoryEditView() {
        _ref = GroupCategoryEditView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      GroupCategoryEditView.prototype.template = template;

      GroupCategoryEditView.prototype.wrapperTemplate = wrapperTemplate;

      GroupCategoryEditView.prototype.className = "form-dialog group-category-edit";

      GroupCategoryEditView.prototype.defaults = {
        width: 500,
        height: ENV.allow_self_signup ? 360 : 210,
        title: I18n.t('edit_group_set', 'Edit Group Set'),
        fixDialogButtons: false
      };

      GroupCategoryEditView.prototype.els = {
        '.self-signup-help': '$selfSignupHelp',
        '.self-signup-description': '$selfSignup',
        '.self-signup-toggle': '$selfSignupToggle',
        '.self-signup-controls': '$selfSignupControls'
      };

      GroupCategoryEditView.prototype.events = _.extend({}, DialogFormView.prototype.events, {
        'click .dialog_closer': 'close',
        'click .self-signup-toggle': 'toggleSelfSignup'
      });

      GroupCategoryEditView.prototype.afterRender = function() {
        return this.toggleSelfSignup();
      };

      GroupCategoryEditView.prototype.openAgain = function() {
        GroupCategoryEditView.__super__.openAgain.apply(this, arguments);
        this.render();
        return this.$('input:first').focus();
      };

      GroupCategoryEditView.prototype.toggleSelfSignup = function() {
        var disabled;

        disabled = !this.$selfSignupToggle.prop('checked');
        this.$selfSignupControls.css({
          opacity: disabled ? 0.5 : 1
        });
        return this.$selfSignupControls.find(':input').prop('disabled', disabled);
      };

      GroupCategoryEditView.prototype.validateFormData = function(data, errors) {
        if (!this.$("[name=group_limit]")[0].validity.valid) {
          return {
            "group_limit": [
              {
                message: I18n.t('group_limit_number', 'Group limit must be a number')
              }
            ]
          };
        }
      };

      GroupCategoryEditView.prototype.toJSON = function() {
        var json, _ref1;

        json = this.model.present();
        return _.extend({}, {
          ENV: ENV
        }, json, {
          enable_self_signup: json.self_signup,
          restrict_self_signup: json.self_signup === 'restricted',
          group_limit: "<input name=\"group_limit\"\n       type=\"number\"\n       min=\"2\"\n       class=\"input-micro\"\n       value=\"" + (h((_ref1 = json.group_limit) != null ? _ref1 : '')) + "\">"
        });
      };

      return GroupCategoryEditView;

    })(DialogFormView);
  });

}).call(this);
