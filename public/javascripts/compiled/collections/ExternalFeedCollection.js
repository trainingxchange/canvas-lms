(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'compiled/models/ExternalFeed', 'compiled/str/splitAssetString'], function(Backbone, ExternalFeed, splitAssetString) {
    var ExternalFeedCollection, _ref;

    return ExternalFeedCollection = (function(_super) {
      __extends(ExternalFeedCollection, _super);

      function ExternalFeedCollection() {
        _ref = ExternalFeedCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ExternalFeedCollection.prototype.model = ExternalFeed;

      return ExternalFeedCollection;

    })(Backbone.Collection);
  });

}).call(this);
