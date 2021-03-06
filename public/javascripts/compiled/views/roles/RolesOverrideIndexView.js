(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'Backbone', 'jst/roles/rolesOverrideIndex'], function($, _, Backbone, template) {
    var RolesOverrideIndexView, _ref;

    return RolesOverrideIndexView = (function(_super) {
      __extends(RolesOverrideIndexView, _super);

      function RolesOverrideIndexView() {
        _ref = RolesOverrideIndexView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RolesOverrideIndexView.prototype.template = template;

      RolesOverrideIndexView.prototype.els = {
        "#role_tabs": "$roleTabs"
      };

      RolesOverrideIndexView.prototype.afterRender = function() {
        return this.$roleTabs.tabs();
      };

      RolesOverrideIndexView.prototype.toJSON = function() {
        return this.options;
      };

      return RolesOverrideIndexView;

    })(Backbone.View);
  });

}).call(this);
