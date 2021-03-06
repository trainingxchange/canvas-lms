(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/collections/PaginatedCollection', 'compiled/models/RosterUser'], function(PaginatedCollection, RosterUser) {
    var RosterUserCollection, _ref;

    return RosterUserCollection = (function(_super) {
      __extends(RosterUserCollection, _super);

      function RosterUserCollection() {
        _ref = RosterUserCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RosterUserCollection.prototype.model = RosterUser;

      RosterUserCollection.optionProperty('course_id');

      RosterUserCollection.optionProperty('sections');

      RosterUserCollection.prototype.url = function() {
        return "/api/v1/courses/" + this.options.course_id + "/users";
      };

      return RosterUserCollection;

    })(PaginatedCollection);
  });

}).call(this);
