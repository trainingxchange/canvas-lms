(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'compiled/views/wiki/WikiPageIndexEditDialog', 'compiled/views/wiki/WikiPageDeleteDialog', 'compiled/views/PublishIconView', 'jst/wiki/WikiPageIndexItem', 'compiled/jquery/redirectClickTo'], function(Backbone, WikiPageIndexEditDialog, WikiPageDeleteDialog, PublishIconView, template) {
    var WikiPageIndexItemView, _ref;

    return WikiPageIndexItemView = (function(_super) {
      __extends(WikiPageIndexItemView, _super);

      function WikiPageIndexItemView() {
        _ref = WikiPageIndexItemView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      WikiPageIndexItemView.prototype.template = template;

      WikiPageIndexItemView.prototype.tagName = 'tr';

      WikiPageIndexItemView.prototype.className = 'clickable';

      WikiPageIndexItemView.prototype.attributes = {
        role: 'row'
      };

      WikiPageIndexItemView.prototype.els = {
        '.wiki-page-link': '$wikiPageLink',
        '.publish-cell': '$publishCell'
      };

      WikiPageIndexItemView.prototype.events = {
        'click a.al-trigger': 'settingsMenu',
        'click .edit-menu-item': 'editPage',
        'click .delete-menu-item': 'deletePage',
        'click .use-as-front-page-menu-item': 'useAsFrontPage'
      };

      WikiPageIndexItemView.optionProperty('indexView');

      WikiPageIndexItemView.optionProperty('collection');

      WikiPageIndexItemView.optionProperty('WIKI_RIGHTS');

      WikiPageIndexItemView.optionProperty('contextName');

      WikiPageIndexItemView.prototype.initialize = function() {
        var _this = this;

        WikiPageIndexItemView.__super__.initialize.apply(this, arguments);
        this.WIKI_RIGHTS || (this.WIKI_RIGHTS = {});
        this.model.set('unpublishable', true);
        return this.model.on('change', function() {
          return _this.render();
        });
      };

      WikiPageIndexItemView.prototype.toJSON = function() {
        var json;

        json = WikiPageIndexItemView.__super__.toJSON.apply(this, arguments);
        json.CAN = {
          MANAGE: !!this.WIKI_RIGHTS.manage,
          PUBLISH: !!this.WIKI_RIGHTS.manage && this.contextName === 'courses'
        };
        return json;
      };

      WikiPageIndexItemView.prototype.render = function() {
        var _ref1;

        if ((_ref1 = this.publishIconView) != null) {
          _ref1.$el.detach();
        }
        WikiPageIndexItemView.__super__.render.apply(this, arguments);
        if (!this.publishIconView) {
          this.publishIconView = new PublishIconView({
            model: this.model
          });
          this.model.view = this;
        }
        this.publishIconView.$el.appendTo(this.$publishCell);
        return this.publishIconView.render();
      };

      WikiPageIndexItemView.prototype.afterRender = function() {
        return this.$el.redirectClickTo(this.$wikiPageLink);
      };

      WikiPageIndexItemView.prototype.settingsMenu = function(ev) {
        return ev != null ? ev.preventDefault() : void 0;
      };

      WikiPageIndexItemView.prototype.editPage = function(ev) {
        var collection, editDialog, indexView;

        if (ev != null) {
          ev.preventDefault();
        }
        editDialog = new WikiPageIndexEditDialog({
          model: this.model
        });
        editDialog.open();
        indexView = this.indexView;
        collection = this.collection;
        return editDialog.on('success', function() {
          indexView.currentSortField = null;
          indexView.renderSortHeaders();
          return collection.fetch({
            page: 'current'
          });
        });
      };

      WikiPageIndexItemView.prototype.deletePage = function(ev) {
        var deleteDialog;

        if (ev != null) {
          ev.preventDefault();
        }
        if (!this.model.get('deletable')) {
          return;
        }
        deleteDialog = new WikiPageDeleteDialog({
          model: this.model
        });
        return deleteDialog.open();
      };

      WikiPageIndexItemView.prototype.useAsFrontPage = function(ev) {
        if (ev != null) {
          ev.preventDefault();
        }
        if (!this.model.get('published')) {
          return;
        }
        return this.model.setFrontPage();
      };

      return WikiPageIndexItemView;

    })(Backbone.View);
  });

}).call(this);
