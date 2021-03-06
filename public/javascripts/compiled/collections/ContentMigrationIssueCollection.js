(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/collections/PaginatedCollection'], function(PaginatedCollection) {
    var ContentMigrationIssueCollection, _ref;

    return ContentMigrationIssueCollection = (function(_super) {
      __extends(ContentMigrationIssueCollection, _super);

      function ContentMigrationIssueCollection() {
        _ref = ContentMigrationIssueCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ContentMigrationIssueCollection.optionProperty('course_id');

      ContentMigrationIssueCollection.optionProperty('content_migration_id');

      ContentMigrationIssueCollection.prototype.url = function() {
        return "/api/v1/courses/" + this.course_id + "/content_migrations/" + this.content_migration_id + "/migration_issues";
      };

      return ContentMigrationIssueCollection;

    })(PaginatedCollection);
  });

}).call(this);
