(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/models/Progress'], function(ProgressModel) {
    var ContentMigrationProgress, _ref;

    return ContentMigrationProgress = (function(_super) {
      __extends(ContentMigrationProgress, _super);

      function ContentMigrationProgress() {
        _ref = ContentMigrationProgress.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ContentMigrationProgress.prototype.defaults = {
        timeout: 5000
      };

      return ContentMigrationProgress;

    })(ProgressModel);
  });

}).call(this);
