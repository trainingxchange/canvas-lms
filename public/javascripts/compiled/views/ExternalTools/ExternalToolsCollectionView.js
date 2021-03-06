(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'str/htmlEscape', 'jst/ExternalTools/ExternalToolsCollectionView', 'compiled/views/ExternalTools/ExternalToolView', 'compiled/views/PaginatedCollectionView', 'i18n!external_tools'], function($, htmlEscape, template, ExternalToolView, PaginatedCollectionView, I18n) {
    var ExternalToolsCollectionView, _ref;

    return ExternalToolsCollectionView = (function(_super) {
      __extends(ExternalToolsCollectionView, _super);

      function ExternalToolsCollectionView() {
        _ref = ExternalToolsCollectionView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ExternalToolsCollectionView.prototype.template = template;

      ExternalToolsCollectionView.prototype.itemView = ExternalToolView;

      return ExternalToolsCollectionView;

    })(PaginatedCollectionView);
  });

}).call(this);
