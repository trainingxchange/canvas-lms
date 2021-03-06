(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'Backbone', 'compiled/views/conversations/AutocompleteView'], function(_, _arg, AutocompleteView) {
    var SearchView, View, _ref;

    View = _arg.View;
    return SearchView = (function(_super) {
      __extends(SearchView, _super);

      function SearchView() {
        this.onSearch = __bind(this.onSearch, this);        _ref = SearchView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      SearchView.prototype.els = {
        '#search-autocomplete': '$autocomplete'
      };

      SearchView.prototype.initialize = function() {
        SearchView.__super__.initialize.apply(this, arguments);
        this.render();
        this.autocompleteView = new AutocompleteView({
          el: this.$autocomplete,
          single: true,
          excludeAll: true
        }).render();
        return this.autocompleteView.on('changeToken', this.onSearch);
      };

      SearchView.prototype.onSearch = function(tokens) {
        return this.trigger('search', _.map(tokens, function(x) {
          return "user_" + x;
        }));
      };

      return SearchView;

    })(View);
  });

}).call(this);
