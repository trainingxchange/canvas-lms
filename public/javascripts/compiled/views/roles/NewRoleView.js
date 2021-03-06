(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!editor', 'jquery', 'underscore', 'Backbone', 'jst/roles/newRole', 'compiled/models/Role', 'compiled/models/Account'], function(I18n, $, _, Backbone, template, Role, Account) {
    var NewRoleView, _ref;

    return NewRoleView = (function(_super) {
      __extends(NewRoleView, _super);

      function NewRoleView() {
        _ref = NewRoleView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      NewRoleView.prototype.template = template;

      NewRoleView.prototype.els = {
        "input[type=text]": "$role_name",
        "select": "$base_role_type"
      };

      NewRoleView.prototype.events = {
        "click button": "createRole",
        "submit form": "createRole"
      };

      NewRoleView.prototype.initialize = function() {
        var _ref1, _ref2;

        NewRoleView.__super__.initialize.apply(this, arguments);
        this.base_role_types = (_ref1 = this.options) != null ? _ref1.base_role_types : void 0;
        return this.adminRoles = (_ref2 = this.options) != null ? _ref2.admin_roles : void 0;
      };

      NewRoleView.prototype.toJSON = function() {
        var json;

        json = NewRoleView.__super__.toJSON.apply(this, arguments);
        json['base_role_types'] = this.base_role_types;
        json['adminRoles'] = this.adminRoles;
        return json;
      };

      NewRoleView.prototype.createRole = function(event) {
        var attributes, base_role_type, role_name,
          _this = this;

        event.preventDefault();
        role_name = this.$role_name.val();
        base_role_type = this.$base_role_type.val();
        attributes = {
          base_role_type: base_role_type,
          role: role_name,
          account: ENV.CURRENT_ACCOUNT.account
        };
        this.$el.find("a.dropdown-toggle").after('<img class="loading-icon" src="/images/ajax-reload-animated.gif">');
        return this.collection.create(attributes, {
          success: function(model) {
            return _this.clearForm();
          },
          error: function() {
            alert(I18n.t("role.duplicate_role_error", "Could not create this role because a role with this name already exists. Please try a different name"));
            return _this.clearForm();
          },
          wait: true
        });
      };

      NewRoleView.prototype.clearForm = function() {
        this.$role_name.val('');
        this.$base_role_type.val('');
        return this.$el.find(".loading-icon").remove();
      };

      return NewRoleView;

    })(Backbone.View);
  });

}).call(this);
