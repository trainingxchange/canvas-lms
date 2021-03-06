(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'compiled/views/outcomes/OutcomesDirectoryView', 'compiled/collections/OutcomeCollection', 'compiled/collections/OutcomeGroupCollection'], function($, OutcomesDirectoryView, OutcomeCollection, OutcomeGroupCollection) {
    var AccountDirectoryView, _ref;

    return AccountDirectoryView = (function(_super) {
      __extends(AccountDirectoryView, _super);

      function AccountDirectoryView() {
        _ref = AccountDirectoryView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AccountDirectoryView.prototype.initialize = function(opts) {
        this.outcomes = new OutcomeCollection;
        this.groups = new OutcomeGroupCollection;
        this.groups.url = ENV.ACCOUNT_CHAIN_URL;
        return AccountDirectoryView.__super__.initialize.call(this, opts);
      };

      AccountDirectoryView.prototype.fetchOutcomes = function() {};

      return AccountDirectoryView;

    })(OutcomesDirectoryView);
  });

}).call(this);
