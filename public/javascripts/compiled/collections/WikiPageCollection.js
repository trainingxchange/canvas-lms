(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['compiled/collections/PaginatedCollection', 'compiled/models/WikiPage'], function(PaginatedCollection, WikiPage) {
    var WikiPageCollection, _ref;

    return WikiPageCollection = (function(_super) {
      __extends(WikiPageCollection, _super);

      function WikiPageCollection() {
        _ref = WikiPageCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      WikiPageCollection.prototype.model = WikiPage;

      WikiPageCollection.prototype.initialize = function() {
        var _this = this;

        WikiPageCollection.__super__.initialize.apply(this, arguments);
        this.sortOrders = {
          title: 'asc',
          created_at: 'desc',
          updated_at: 'desc'
        };
        this.setSortField('title');
        return this.on('change:front_page', function(model, value) {
          var m, _i, _len, _ref1, _results;

          if (!value) {
            return;
          }
          _ref1 = _this.filter(function(m) {
            return !!m.get('front_page');
          });
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            m = _ref1[_i];
            if (m !== model) {
              _results.push(m.set('front_page', false));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
      };

      WikiPageCollection.prototype.sortByField = function(sortField, sortOrder) {
        if (sortOrder == null) {
          sortOrder = null;
        }
        this.setSortField(sortField, sortOrder);
        return this.fetch();
      };

      WikiPageCollection.prototype.setSortField = function(sortField, sortOrder) {
        if (sortOrder == null) {
          sortOrder = null;
        }
        if (this.sortOrders[sortField] === void 0) {
          throw "" + sortField + " is not a valid sort field";
        }
        if (!sortOrder && this.currentSortField === sortField) {
          sortOrder = this.sortOrders[sortField] === 'asc' ? 'desc' : 'asc';
        }
        this.currentSortField = sortField;
        if (sortOrder) {
          this.sortOrders[this.currentSortField] = sortOrder;
        }
        this.setParams({
          sort: this.currentSortField,
          order: this.sortOrders[this.currentSortField]
        });
        return this.trigger('sortChanged', this.currentSortField, this.sortOrders);
      };

      return WikiPageCollection;

    })(PaginatedCollection);
  });

}).call(this);
