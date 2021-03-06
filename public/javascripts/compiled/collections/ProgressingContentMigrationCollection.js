(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'compiled/collections/ContentMigrationIssueCollection', 'compiled/models/ContentMigrationProgress', 'compiled/models/ProgressingContentMigration', 'compiled/collections/PaginatedCollection'], function(_, MigrationIssueCollection, MigrationProgress, ProgressingContentMigration, PaginatedCollection) {
    var ProgressingContentMigrationCollection, _ref;

    return ProgressingContentMigrationCollection = (function(_super) {
      __extends(ProgressingContentMigrationCollection, _super);

      function ProgressingContentMigrationCollection() {
        _ref = ProgressingContentMigrationCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ProgressingContentMigrationCollection.prototype.model = ProgressingContentMigration;

      ProgressingContentMigrationCollection.optionProperty('course_id');

      ProgressingContentMigrationCollection.prototype.url = function() {
        return "/api/v1/courses/" + this.course_id + "/content_migrations";
      };

      ProgressingContentMigrationCollection.prototype.comparator = function(a, b) {
        if (b.get('created_at') > a.get('created_at')) {
          return 1;
        } else if (b.get('created_at') < a.get('created_at')) {
          return -1;
        } else {
          return 0;
        }
      };

      return ProgressingContentMigrationCollection;

    })(PaginatedCollection);
  });

}).call(this);
