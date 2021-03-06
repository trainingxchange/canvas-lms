(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!discussions', 'compiled/views/DialogFormView', 'compiled/models/UserSettings', 'jst/DiscussionTopics/UserSettingsView'], function(I18n, DialogFormView, UserSettings, template) {
    var UserSettingsView, _ref;

    return UserSettingsView = (function(_super) {
      __extends(UserSettingsView, _super);

      function UserSettingsView() {
        _ref = UserSettingsView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      UserSettingsView.prototype.defaults = {
        title: I18n.t("edit_settings", "Edit Discussions Settings")
      };

      UserSettingsView.prototype.template = template;

      UserSettingsView.prototype.initialize = function() {
        UserSettingsView.__super__.initialize.apply(this, arguments);
        this.model || (this.model = new UserSettings);
        this.attachModel();
        return this.fetch();
      };

      UserSettingsView.prototype.attachModel = function() {
        return this.model.on('change', this.render);
      };

      UserSettingsView.prototype.fetch = function() {
        return this.$el.disableWhileLoading(this.model.fetch());
      };

      return UserSettingsView;

    })(DialogFormView);
  });

}).call(this);
