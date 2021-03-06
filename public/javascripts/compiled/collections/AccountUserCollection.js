(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/collections/PaginatedCollection', 'compiled/models/AccountUser'], function(PaginatedCollection, AccountUser) {
    var AccountUserCollection, _ref;

    return AccountUserCollection = (function(_super) {
      __extends(AccountUserCollection, _super);

      function AccountUserCollection() {
        _ref = AccountUserCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AccountUserCollection.prototype.model = AccountUser;

      AccountUserCollection.optionProperty('account_id');

      AccountUserCollection.prototype.url = function() {
        return "/api/v1/accounts/" + this.options.account_id + "/users";
      };

      return AccountUserCollection;

    })(PaginatedCollection);
  });

}).call(this);
