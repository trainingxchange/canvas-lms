(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'compiled/models/ContentMigrationProgress', 'compiled/collections/ContentMigrationIssueCollection'], function(Backbone, ProgressModel, IssuesCollection) {
    var ProgressingContentMigration, _ref;

    return ProgressingContentMigration = (function(_super) {
      __extends(ProgressingContentMigration, _super);

      function ProgressingContentMigration() {
        _ref = ProgressingContentMigration.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ProgressingContentMigration.prototype.initialize = function(attr, options) {
        var _ref1;

        ProgressingContentMigration.__super__.initialize.apply(this, arguments);
        this.course_id = ((_ref1 = this.collection) != null ? _ref1.course_id : void 0) || (options != null ? options.course_id : void 0) || this.get('course_id');
        this.buildChildren();
        this.pollIfRunning();
        return this.syncProgressUrl();
      };

      ProgressingContentMigration.prototype.buildChildren = function() {
        this.progressModel = new ProgressModel({
          url: this.get('progress_url'),
          course_id: this.course_id
        });
        return this.issuesCollection = new IssuesCollection(null, {
          course_id: this.course_id,
          content_migration_id: this.get('id')
        });
      };

      ProgressingContentMigration.prototype.pollIfRunning = function() {
        if (this.get('workflow_state') === 'running') {
          return this.progressModel.poll();
        }
      };

      ProgressingContentMigration.prototype.syncProgressUrl = function() {
        var _this = this;

        return this.on('change:progress_url', function() {
          return _this.progressModel.set('url', _this.get('progress_url'));
        });
      };

      return ProgressingContentMigration;

    })(Backbone.Model);
  });

}).call(this);
