(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'Backbone', 'jst/searchView', 'compiled/views/SearchMixin'], function($, Backbone, template, SearchMixin) {
    var SearchView, _ref;

    return SearchView = (function(_super) {
      __extends(SearchView, _super);

      function SearchView() {
        _ref = SearchView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      SearchView.mixin(SearchMixin);

      SearchView.child('inputFilterView', '.inputFilterView');

      SearchView.child('collectionView', '.collectionView');

      SearchView.prototype.template = template;

      SearchView.prototype.toJSON = function() {
        return {
          collection: this.collection
        };
      };

      return SearchView;

    })(Backbone.View);
  });

}).call(this);
