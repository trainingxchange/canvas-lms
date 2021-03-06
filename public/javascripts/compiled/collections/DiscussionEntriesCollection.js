(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'compiled/models/DiscussionEntry'], function(Backbone, DiscussionEntry) {
    var DiscussionEntryCollection, _ref;

    return DiscussionEntryCollection = (function(_super) {
      __extends(DiscussionEntryCollection, _super);

      function DiscussionEntryCollection() {
        _ref = DiscussionEntryCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DiscussionEntryCollection.prototype.model = DiscussionEntry;

      return DiscussionEntryCollection;

    })(Backbone.Collection);
  });

}).call(this);
