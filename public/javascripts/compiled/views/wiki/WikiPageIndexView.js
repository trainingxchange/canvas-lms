(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'i18n!pages', 'wikiSidebar', 'compiled/models/WikiPage', 'compiled/views/PaginatedCollectionView', 'compiled/views/wiki/WikiPageEditView', 'compiled/views/wiki/WikiPageIndexItemView', 'jst/wiki/WikiPageIndex', 'compiled/views/StickyHeaderMixin', 'compiled/str/splitAssetString', 'jquery.disableWhileLoading'], function($, I18n, wikiSidebar, WikiPage, PaginatedCollectionView, WikiPageEditView, itemView, template, StickyHeaderMixin, splitAssetString) {
    var WikiPageIndexView, _ref;

    return WikiPageIndexView = (function(_super) {
      __extends(WikiPageIndexView, _super);

      function WikiPageIndexView() {
        this.sortChanged = __bind(this.sortChanged, this);        _ref = WikiPageIndexView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      WikiPageIndexView.mixin(StickyHeaderMixin);

      WikiPageIndexView.mixin({
        events: {
          'click .new_page': 'createNewPage',
          'click .header-row a[data-sort-field]': 'sort'
        },
        els: {
          '.no-pages': '$noPages',
          '.no-pages a:first-child': '$noPagesLink',
          '.header-row a[data-sort-field]': '$sortHeaders'
        }
      });

      WikiPageIndexView.prototype.template = template;

      WikiPageIndexView.prototype.itemView = itemView;

      WikiPageIndexView.optionProperty('default_editing_roles');

      WikiPageIndexView.optionProperty('WIKI_RIGHTS');

      WikiPageIndexView.prototype.initialize = function(options) {
        var _ref1,
          _this = this;

        WikiPageIndexView.__super__.initialize.apply(this, arguments);
        this.WIKI_RIGHTS || (this.WIKI_RIGHTS = {});
        this.itemViewOptions || (this.itemViewOptions = {});
        this.itemViewOptions.indexView = this;
        this.itemViewOptions.collection = this.collection;
        this.itemViewOptions.WIKI_RIGHTS = this.WIKI_RIGHTS;
        this.contextAssetString = options != null ? options.contextAssetString : void 0;
        if (this.contextAssetString) {
          _ref1 = splitAssetString(this.contextAssetString), this.contextName = _ref1[0], this.contextId = _ref1[1];
        }
        this.itemViewOptions.contextName = this.contextName;
        this.collection.on('fetch', function() {
          if (!_this.fetched) {
            _this.fetched = true;
            return _this.render();
          }
        });
        this.collection.on('fetched:last', function() {
          _this.fetchedLast = true;
          return _this.render();
        });
        this.collection.on('sortChanged', this.sortChanged);
        return this.currentSortField = this.collection.currentSortField;
      };

      WikiPageIndexView.prototype.afterRender = function() {
        WikiPageIndexView.__super__.afterRender.apply(this, arguments);
        this.$noPages.redirectClickTo(this.$noPagesLink);
        return this.renderSortHeaders();
      };

      WikiPageIndexView.prototype.sort = function(event) {
        var sortField, sortOrder;

        if (event != null) {
          event.preventDefault();
        }
        sortField = $(event.currentTarget).data('sort-field');
        if (!this.currentSortField) {
          sortOrder = this.collection.sortOrders[sortField];
        }
        return this.$el.disableWhileLoading(this.collection.sortByField(sortField, sortOrder));
      };

      WikiPageIndexView.prototype.sortChanged = function(currentSortField) {
        this.currentSortField = currentSortField;
        return this.renderSortHeaders();
      };

      WikiPageIndexView.prototype.renderSortHeaders = function() {
        var $i, $sortHeader, sortField, sortHeader, sortOrder, sortOrders, _i, _len, _ref1, _results;

        if (!this.$sortHeaders) {
          return;
        }
        sortOrders = this.collection.sortOrders;
        _ref1 = this.$sortHeaders;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          sortHeader = _ref1[_i];
          $sortHeader = $(sortHeader);
          $i = $sortHeader.find('i');
          sortField = $sortHeader.data('sort-field');
          sortOrder = sortOrders[sortField] === 'asc' ? 'up' : 'down';
          if (sortOrder === 'up') {
            $sortHeader.attr('aria-label', I18n.t('headers.sort_ascending', '%{title}, Sort ascending', {
              title: $sortHeader.text()
            }));
          } else {
            $sortHeader.attr('aria-label', I18n.t('headers.sort_descending', '%{title}, Sort descending', {
              title: $sortHeader.text()
            }));
          }
          $sortHeader.toggleClass('sort-field-active', sortField === this.currentSortField);
          $i.removeClass('icon-mini-arrow-up icon-mini-arrow-down');
          _results.push($i.addClass("icon-mini-arrow-" + sortOrder));
        }
        return _results;
      };

      WikiPageIndexView.prototype.createNewPage = function(ev) {
        var _this = this;

        if (ev != null) {
          ev.preventDefault();
        }
        this.$el.hide();
        $('body').removeClass('index');
        $('body').addClass('edit with-right-side');
        this.editModel = new WikiPage({
          editing_roles: this.default_editing_roles
        }, {
          contextAssetString: this.contextAssetString
        });
        this.editView = new WikiPageEditView({
          model: this.editModel,
          wiki_pages_path: ENV.WIKI_PAGES_PATH,
          WIKI_RIGHTS: ENV.WIKI_RIGHTS,
          PAGE_RIGHTS: {
            update: ENV.WIKI_RIGHTS.update_page,
            update_content: ENV.WIKI_RIGHTS.update_page_content,
            read_revisions: ENV.WIKI_RIGHTS.read_revisions
          }
        });
        this.$el.parent().append(this.editView.$el);
        this.editView.render();
        return this.editView.on('cancel', function() {
          _this.editView.$el.remove();
          wikiSidebar.hide();
          $('body').removeClass('edit with-right-side');
          $('body').addClass('index');
          return _this.$el.show();
        });
      };

      WikiPageIndexView.prototype.toJSON = function() {
        var json;

        json = WikiPageIndexView.__super__.toJSON.apply(this, arguments);
        json.CAN = {
          CREATE: !!this.WIKI_RIGHTS.create_page,
          MANAGE: !!this.WIKI_RIGHTS.manage,
          PUBLISH: !!this.WIKI_RIGHTS.manage && this.contextName === 'courses'
        };
        json.CAN.VIEW_TOOLBAR = json.CAN.CREATE;
        json.fetched = !!this.fetched;
        json.fetchedLast = !!this.fetchedLast;
        return json;
      };

      return WikiPageIndexView;

    })(PaginatedCollectionView);
  });

}).call(this);
