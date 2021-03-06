(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'Backbone', 'compiled/models/WikiPageRevision', 'compiled/backbone-ext/DefaultUrlMixin', 'compiled/str/splitAssetString', 'i18n!pages'], function(_, Backbone, WikiPageRevision, DefaultUrlMixin, splitAssetString, I18n) {
    var WikiPage, pageOptions, _ref;

    pageOptions = ['contextAssetString', 'revision'];
    return WikiPage = (function(_super) {
      __extends(WikiPage, _super);

      function WikiPage() {
        _ref = WikiPage.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      WikiPage.mixin(DefaultUrlMixin);

      WikiPage.prototype.resourceName = 'pages';

      WikiPage.prototype.idAttribute = 'url';

      WikiPage.prototype.initialize = function(attributes, options) {
        var _ref1;

        WikiPage.__super__.initialize.apply(this, arguments);
        _.extend(this, _.pick(options || {}, pageOptions));
        if (this.contextAssetString) {
          _ref1 = splitAssetString(this.contextAssetString), this.contextName = _ref1[0], this.contextId = _ref1[1];
        }
        this.on('change:front_page', this.setPublishable);
        this.on('change:published', this.setPublishable);
        return this.setPublishable();
      };

      WikiPage.prototype.setPublishable = function() {
        var deletable, front_page, publishable, published;

        front_page = this.get('front_page');
        published = this.get('published');
        publishable = !front_page || !published;
        deletable = !front_page;
        this.set('publishable', publishable);
        this.set('deletable', deletable);
        if (publishable) {
          return this.unset('publishableMessage');
        } else {
          return this.set('publishableMessage', I18n.t('cannot_unpublish_front_page', 'Cannot unpublish the front page'));
        }
      };

      WikiPage.prototype.disabledMessage = function() {
        return this.get('publishableMessage');
      };

      WikiPage.prototype.urlRoot = function() {
        return "/api/v1/" + (this._contextPath()) + "/pages";
      };

      WikiPage.prototype.url = function() {
        if (this.get('url')) {
          return "" + (this.urlRoot()) + "/" + (this.get('url'));
        } else {
          return this.urlRoot();
        }
      };

      WikiPage.prototype.latestRevision = function(options) {
        var revisionOptions;

        if (!this._latestRevision && this.get('url')) {
          if (!this._latestRevision) {
            revisionOptions = _.extend({}, {
              contextAssetString: this.contextAssetString,
              page: this,
              pageUrl: this.get('url'),
              latest: true,
              summary: true
            }, options);
            this._latestRevision = new WikiPageRevision({
              revision_id: this.revision
            }, revisionOptions);
          }
        }
        return this._latestRevision;
      };

      WikiPage.prototype.parse = function(response, options) {
        if (response.wiki_page) {
          response = _.extend(_.omit(response, 'wiki_page'), response.wiki_page);
        }
        return response;
      };

      WikiPage.prototype.toJSON = function() {
        return {
          wiki_page: WikiPage.__super__.toJSON.apply(this, arguments)
        };
      };

      WikiPage.prototype.present = function() {
        return _.extend({}, this.attributes, {
          contextName: this.contextName,
          contextId: this.contextId,
          new_record: !this.get('url')
        });
      };

      WikiPage.prototype.publish = function() {
        var attrs;

        attrs = {
          wiki_page: {
            published: true
          }
        };
        return this.save(attrs, {
          attrs: attrs,
          wait: true
        });
      };

      WikiPage.prototype.unpublish = function() {
        var attrs;

        attrs = {
          wiki_page: {
            published: false
          }
        };
        return this.save(attrs, {
          attrs: attrs,
          wait: true
        });
      };

      WikiPage.prototype.setFrontPage = function() {
        var attrs;

        attrs = {
          wiki_page: {
            front_page: true
          }
        };
        return this.save(attrs, {
          attrs: attrs,
          wait: true
        });
      };

      WikiPage.prototype.unsetFrontPage = function() {
        var attrs;

        attrs = {
          wiki_page: {
            front_page: false
          }
        };
        return this.save(attrs, {
          attrs: attrs,
          wait: true
        });
      };

      return WikiPage;

    })(Backbone.Model);
  });

}).call(this);
