(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/collections/PaginatedCollection', 'compiled/models/Outcome'], function(PaginatedCollection, Outcome) {
    var OutcomeCollection, _ref;

    return OutcomeCollection = (function(_super) {
      __extends(OutcomeCollection, _super);

      function OutcomeCollection() {
        _ref = OutcomeCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      OutcomeCollection.prototype.model = Outcome;

      return OutcomeCollection;

    })(PaginatedCollection);
  });

}).call(this);
