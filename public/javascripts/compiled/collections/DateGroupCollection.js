(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore', 'jquery', 'compiled/models/DateGroup'], function(Backbone, _, $, DateGroup) {
    var DateGroupCollection, _ref;

    return DateGroupCollection = (function(_super) {
      __extends(DateGroupCollection, _super);

      function DateGroupCollection() {
        _ref = DateGroupCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DateGroupCollection.prototype.model = DateGroup;

      return DateGroupCollection;

    })(Backbone.Collection);
  });

}).call(this);
