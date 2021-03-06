(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jquery', 'jst/accounts/admin_tools/RestoreContentPane'], function(Backbone, $, template) {
    var RestoreContentPaneView, _ref;

    return RestoreContentPaneView = (function(_super) {
      __extends(RestoreContentPaneView, _super);

      function RestoreContentPaneView() {
        _ref = RestoreContentPaneView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RestoreContentPaneView.child('courseSearchFormView', '#courseSearchForm');

      RestoreContentPaneView.child('courseSearchResultsView', '#courseSearchResults');

      RestoreContentPaneView.prototype.template = template;

      return RestoreContentPaneView;

    })(Backbone.View);
  });

}).call(this);
