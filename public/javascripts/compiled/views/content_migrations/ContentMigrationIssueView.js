(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jst/content_migrations/ContentMigrationIssue'], function(Backbone, template) {
    var ContentMigrationIssueView, _ref;

    return ContentMigrationIssueView = (function(_super) {
      __extends(ContentMigrationIssueView, _super);

      function ContentMigrationIssueView() {
        _ref = ContentMigrationIssueView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ContentMigrationIssueView.prototype.className = 'clearfix row-fluid top-padding';

      ContentMigrationIssueView.prototype.template = template;

      ContentMigrationIssueView.prototype.toJSON = function() {
        var json;

        json = ContentMigrationIssueView.__super__.toJSON.apply(this, arguments);
        json.description = this.model.get('description');
        json.fix_issue_url = this.model.get('fix_issue_html_url');
        return json;
      };

      return ContentMigrationIssueView;

    })(Backbone.View);
  });

}).call(this);
