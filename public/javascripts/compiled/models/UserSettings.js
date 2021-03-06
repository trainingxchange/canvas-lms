(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore'], function(Backbone, _) {
    var UserSettings, _ref;

    return UserSettings = (function(_super) {
      __extends(UserSettings, _super);

      function UserSettings() {
        _ref = UserSettings.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      UserSettings.prototype.isNew = function() {
        return false;
      };

      UserSettings.prototype.url = ENV.USER_SETTINGS_URL;

      return UserSettings;

    })(Backbone.Model);
  });

}).call(this);
