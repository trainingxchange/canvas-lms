(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/collections/PaginatedCollection'], function(PaginatedCollection) {
    var AuthLoggingCollection, _ref;

    return AuthLoggingCollection = (function(_super) {
      __extends(AuthLoggingCollection, _super);

      function AuthLoggingCollection() {
        _ref = AuthLoggingCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AuthLoggingCollection.prototype.url = function() {
        return "/api/v1/audit/authentication/users/" + this.options.params.user_id;
      };

      return AuthLoggingCollection;

    })(PaginatedCollection);
  });

}).call(this);
