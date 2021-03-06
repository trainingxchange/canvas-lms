(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/collections/PaginatedCollection', 'compiled/models/User'], function(PaginatedCollection, User) {
    var UserCollection, _ref;

    return UserCollection = (function(_super) {
      __extends(UserCollection, _super);

      function UserCollection() {
        _ref = UserCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      UserCollection.prototype.model = User;

      return UserCollection;

    })(PaginatedCollection);
  });

}).call(this);
