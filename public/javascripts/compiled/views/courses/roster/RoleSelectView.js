(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/views/SelectView', 'jst/courses/roster/roleSelect'], function(SelectView, template) {
    var RoleSelectView, _ref;

    return RoleSelectView = (function(_super) {
      __extends(RoleSelectView, _super);

      function RoleSelectView() {
        _ref = RoleSelectView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RoleSelectView.optionProperty('rolesCollection');

      RoleSelectView.prototype.template = template;

      RoleSelectView.prototype.attach = function() {
        return this.rolesCollection.on('add reset remove change', this.render);
      };

      RoleSelectView.prototype.toJSON = function() {
        var _ref1;

        return {
          roles: this.rolesCollection.toJSON(),
          selectedRole: ((_ref1 = this.el.selectedOptions) != null ? _ref1.length : void 0) ? this.el.selectedOptions[0].value : ""
        };
      };

      return RoleSelectView;

    })(SelectView);
  });

}).call(this);
