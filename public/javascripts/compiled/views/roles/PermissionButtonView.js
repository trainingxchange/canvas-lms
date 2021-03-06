(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'Backbone', 'jst/roles/permissionButton'], function($, _, Backbone, template) {
    var PermissionButtonView, _ref;

    return PermissionButtonView = (function(_super) {
      __extends(PermissionButtonView, _super);

      function PermissionButtonView() {
        _ref = PermissionButtonView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      PermissionButtonView.prototype.template = template;

      PermissionButtonView.prototype.tagName = 'td';

      PermissionButtonView.prototype.className = 'permissionButtonView';

      PermissionButtonView.prototype.events = {
        "change input[type=radio]": "updateRole"
      };

      PermissionButtonView.prototype.initialize = function() {
        PermissionButtonView.__super__.initialize.apply(this, arguments);
        if (this.options.permission_name) {
          return this.permission_name = this.options.permission_name;
        }
      };

      PermissionButtonView.prototype.toJSON = function() {
        var json;

        json = PermissionButtonView.__super__.toJSON.apply(this, arguments);
        json['enableChecked'] = this.isEnabled();
        json['enableAndLockChecked'] = this.isEnabledAndLocked();
        json['disableChecked'] = this.isDisabled();
        json['disableAndLockChecked'] = this.isDisabledAndLocked();
        json['systemDefaultChecked'] = this.isDefault();
        json['systemDefaultLockedChecked'] = this.isDefaultAndLocked();
        json['readOnly'] = this.isReadOnly();
        json['default'] = this.isDefault() || this.isDefaultAndLocked();
        json['addDefaultTitle'] = this.isDefault() || this.isDefaultAndLocked() && !this.isReadOnly();
        return json;
      };

      PermissionButtonView.prototype.afterRender = function() {
        this.setPreviewIcons();
        this.setDataAttributes();
        return this.setTooltips();
      };

      PermissionButtonView.prototype.setDataAttributes = function() {
        this.$el.attr('data-role_name', this.model.id);
        return this.$el.attr('data-permission_name', this.permission_name);
      };

      PermissionButtonView.prototype.setTooltips = function() {
        if (!this.isReadOnly()) {
          this.$el.find('.icon-check').attr('title', 'Enabled').attr('data-tooltip', "");
        }
        if (!this.isReadOnly()) {
          this.$el.find('.icon-x').attr('title', 'Disabled').attr('data-tooltip', "");
        }
        if (!this.isReadOnly()) {
          return this.$el.find('.icon-lock').attr('title', 'Locked').attr('data-tooltip', "");
        }
      };

      PermissionButtonView.prototype.setPreviewIcons = function() {
        if (this.isEnabled()) {
          return this.setEnabledIcon();
        } else if (this.isEnabledAndLocked()) {
          return this.setEnabledLockedIcon();
        } else if (this.isDisabled()) {
          return this.setDisabledIcon();
        } else if (this.isDisabledAndLocked()) {
          return this.setDisabledLockedIcon();
        } else if (this.isDefault()) {
          return this.setDefaultIcon();
        } else if (this.isDefaultAndLocked()) {
          return this.setDefaultAndLockedIcon();
        }
      };

      PermissionButtonView.prototype.updateRole = function(event) {
        event.preventDefault();
        switch ($(event.target).attr('id')) {
          case "button-" + this.cid + "-0":
            this.$el.find('a.btn').removeClass('default_permission');
            this.enable();
            break;
          case "button-" + this.cid + "-1":
            this.$el.find('a.btn').removeClass('default_permission');
            this.enableAndLock();
            break;
          case "button-" + this.cid + "-2":
            this.$el.find('a.btn').removeClass('default_permission');
            this.disable();
            break;
          case "button-" + this.cid + "-3":
            this.$el.find('a.btn').removeClass('default_permission');
            this.disableAndLock();
            break;
          case "button-" + this.cid + "-4":
            this.$el.find('a.btn').addClass('default_permission');
            this.setSystemDefault();
            break;
          case "button-" + this.cid + "-5":
            this.$el.find('a.btn').addClass('default_permission');
            this.setSystemDefaultAndLocked();
            break;
        }
        this.setPreviewIcons();
        this.closeMenu();
        return this.saveModel();
      };

      PermissionButtonView.prototype.saveModel = function() {
        return this.model.save({}, {
          failure: function() {
            return alert('Permission was not be saved!');
          }
        });
      };

      PermissionButtonView.prototype.closeMenu = function() {
        return this.$el.children('.btn-group').removeClass('open');
      };

      PermissionButtonView.prototype.enable = function() {
        this.model.get('permissions')[this.permission_name].enabled = true;
        this.model.get('permissions')[this.permission_name].explicit = true;
        return this.model.get('permissions')[this.permission_name].locked = false;
      };

      PermissionButtonView.prototype.enableAndLock = function() {
        this.model.get('permissions')[this.permission_name].enabled = true;
        this.model.get('permissions')[this.permission_name].explicit = true;
        return this.model.get('permissions')[this.permission_name].locked = true;
      };

      PermissionButtonView.prototype.disable = function() {
        this.model.get('permissions')[this.permission_name].enabled = false;
        this.model.get('permissions')[this.permission_name].explicit = true;
        return this.model.get('permissions')[this.permission_name].locked = false;
      };

      PermissionButtonView.prototype.disableAndLock = function() {
        this.model.get('permissions')[this.permission_name].enabled = false;
        this.model.get('permissions')[this.permission_name].explicit = true;
        return this.model.get('permissions')[this.permission_name].locked = true;
      };

      PermissionButtonView.prototype.setSystemDefault = function() {
        this.model.get('permissions')[this.permission_name].locked = false;
        return this.model.get('permissions')[this.permission_name].explicit = false;
      };

      PermissionButtonView.prototype.setSystemDefaultAndLocked = function() {
        this.model.get('permissions')[this.permission_name].locked = true;
        return this.model.get('permissions')[this.permission_name].explicit = false;
      };

      PermissionButtonView.prototype.isEnabled = function() {
        return this.model.get('permissions')[this.permission_name].enabled && !this.isLocked() && this.isExplicit();
      };

      PermissionButtonView.prototype.isEnabledAndLocked = function() {
        return this.model.get('permissions')[this.permission_name].enabled && this.isLocked() && this.isExplicit();
      };

      PermissionButtonView.prototype.isDisabled = function() {
        return !this.model.get('permissions')[this.permission_name].enabled && !this.isLocked() && this.isExplicit();
      };

      PermissionButtonView.prototype.isDisabledAndLocked = function() {
        return !this.model.get('permissions')[this.permission_name].enabled && this.isLocked() && this.isExplicit();
      };

      PermissionButtonView.prototype.isDefault = function() {
        return !this.isExplicit() && !this.isLocked();
      };

      PermissionButtonView.prototype.isDefaultAndLocked = function() {
        return !this.isExplicit() && this.isLocked();
      };

      PermissionButtonView.prototype.isReadOnly = function() {
        return this.model.get('permissions')[this.permission_name].readonly;
      };

      PermissionButtonView.prototype.isExplicit = function() {
        return this.model.get('permissions')[this.permission_name].explicit;
      };

      PermissionButtonView.prototype.isLocked = function() {
        return this.model.get('permissions')[this.permission_name].locked;
      };

      PermissionButtonView.prototype.setButtonPreview = function(selected_radio) {
        var icons;

        icons = this.$el.find("label[for=button-" + this.cid + "-" + selected_radio + "] i").clone();
        return this.$el.find('a.dropdown-toggle').html(icons);
      };

      PermissionButtonView.prototype.setEnabledIcon = function() {
        return this.setButtonPreview(0);
      };

      PermissionButtonView.prototype.setEnabledLockedIcon = function() {
        return this.setButtonPreview(1);
      };

      PermissionButtonView.prototype.setDisabledIcon = function() {
        return this.setButtonPreview(2);
      };

      PermissionButtonView.prototype.setDisabledLockedIcon = function() {
        return this.setButtonPreview(3);
      };

      PermissionButtonView.prototype.setDefaultIcon = function() {
        if (_.isUndefined(this.model.get('permissions')[this.permission_name].prior_default)) {
          if (this.model.get('permissions')[this.permission_name].enabled) {
            return this.setEnabledIcon();
          } else {
            return this.setDisabledIcon();
          }
        } else {
          if (this.model.get('permissions')[this.permission_name].prior_default) {
            return this.setEnabledIcon();
          } else {
            return this.setDisabledIcon();
          }
        }
      };

      PermissionButtonView.prototype.setDefaultAndLockedIcon = function() {
        if (_.isUndefined(this.model.get('permissions')[this.permission_name].prior_default)) {
          if (this.model.get('permissions')[this.permission_name].enabled) {
            return this.setEnabledLockedIcon();
          } else {
            return this.setDisabledLockedIcon();
          }
        } else {
          if (this.model.get('permissions')[this.permission_name].prior_default) {
            return this.setEnabledLockedIcon();
          } else {
            return this.setDisabledLockedIcon();
          }
        }
      };

      return PermissionButtonView;

    })(Backbone.View);
  });

}).call(this);
