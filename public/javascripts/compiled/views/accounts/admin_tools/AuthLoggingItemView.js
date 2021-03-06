(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jst/accounts/admin_tools/authLoggingItem', 'i18n!auth_logging'], function(Backbone, template, I18n) {
    var AuthLoggingItemView, _ref;

    return AuthLoggingItemView = (function(_super) {
      __extends(AuthLoggingItemView, _super);

      function AuthLoggingItemView() {
        _ref = AuthLoggingItemView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AuthLoggingItemView.prototype.tagName = 'tr';

      AuthLoggingItemView.prototype.className = 'logitem';

      AuthLoggingItemView.prototype.template = template;

      AuthLoggingItemView.prototype.toJSON = function() {
        var json;

        json = AuthLoggingItemView.__super__.toJSON.apply(this, arguments);
        if (json.event_type === "login") {
          json.event = I18n.t("login", "LOGIN");
        } else if (json.event_type === "logout") {
          json.event = I18n.t("logout", "LOGOUT");
        } else if (json.event_type === "corrupted") {
          json.event = I18n.t("corrupted", "Details Not Available");
        }
        return json;
      };

      return AuthLoggingItemView;

    })(Backbone.View);
  });

}).call(this);
