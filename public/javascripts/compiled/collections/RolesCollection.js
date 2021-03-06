(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore', 'compiled/models/Role'], function(Backbone, _, Role) {
    var RolesCollection, _ref;

    return RolesCollection = (function(_super) {
      __extends(RolesCollection, _super);

      function RolesCollection() {
        _ref = RolesCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RolesCollection.prototype.model = Role;

      RolesCollection.prototype.sortOrder = ["NoPermissions", "AccountMembership", "StudentEnrollment", "TaEnrollment", "TeacherEnrollment", "DesignerEnrollment", "ObserverEnrollment"];

      RolesCollection.prototype.comparator = function(role) {
        var base_role_type, index, position_string, role_name;

        base_role_type = role.get('base_role_type');
        index = _.indexOf(this.sortOrder, base_role_type);
        role_name = role.get('role');
        position_string = "" + index + "_" + base_role_type + "_" + role_name;
        if (base_role_type === role_name) {
          position_string = "" + index + "_" + base_role_type;
        }
        if (role_name === "AccountAdmin") {
          position_string = "0_" + base_role_type;
        }
        return position_string;
      };

      return RolesCollection;

    })(Backbone.Collection);
  });

}).call(this);
