(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['Backbone', 'underscore'], function(Backbone, _) {
    var PaginatedCollection, capitalize, _ref;

    capitalize = function(string) {
      if (string == null) {
        string = '';
      }
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    };
    return PaginatedCollection = (function(_super) {
      __extends(PaginatedCollection, _super);

      function PaginatedCollection() {
        this._setStateAfterFetch = __bind(this._setStateAfterFetch, this);        _ref = PaginatedCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      PaginatedCollection.prototype.nameRegex = /rel="([a-z]+)/;

      PaginatedCollection.prototype.linkRegex = /^<([^>]+)/;

      PaginatedCollection.prototype.pageRegex = /\Wpage=(\d+)/;

      PaginatedCollection.prototype.perPageRegex = /\Wper_page=(\d+)/;

      PaginatedCollection.prototype.initialize = function() {
        PaginatedCollection.__super__.initialize.apply(this, arguments);
        return this.urls = {};
      };

      PaginatedCollection.prototype.fetch = function(options) {
        var dfd, exclusionFlag, xhr, _ref1,
          _this = this;

        if (options == null) {
          options = {};
        }
        options = _.clone(options);
        this.loadedAll = false;
        exclusionFlag = "fetching" + (capitalize(options.page)) + "Page";
        this[exclusionFlag] = true;
        if (options.page != null) {
          if ((_ref1 = this.urls) != null ? _ref1[options.page] : void 0) {
            options.url = this.urls[options.page];
          }
          if (options.remove == null) {
            options.remove = false;
          }
          options.data = '';
        } else {
          if (options.reset == null) {
            options.reset = true;
          }
        }
        this.trigger('beforeFetch', this, options);
        if (options.page != null) {
          this.trigger("beforeFetch:" + options.page, this, options);
        }
        xhr = null;
        options.dataFilter = function(data) {
          _this[exclusionFlag] = false;
          _this._setStateAfterFetch(xhr, options);
          return data;
        };
        dfd = options.dfd || $.Deferred();
        xhr = PaginatedCollection.__super__.fetch.call(this, options).done(function(response, text, xhr) {
          var _ref2;

          _this.trigger('fetch', _this, response, options);
          if (options.page != null) {
            _this.trigger("fetch:" + options.page, _this, response, options);
          }
          if (!((_ref2 = _this.urls) != null ? _ref2.next : void 0)) {
            _this.trigger.apply(_this, ['fetched:last'].concat(__slice.call(arguments)));
            _this.loadedAll = true;
          }
          if (_this.loadAll && (_this.urls.next != null)) {
            return setTimeout(function() {
              return _this.fetch({
                page: 'next',
                dfd: dfd
              });
            });
          } else {
            return dfd.resolve(response, text, xhr);
          }
        });
        dfd.abort = xhr.abort;
        dfd.success = dfd.done;
        dfd.error = dfd.fail;
        return dfd;
      };

      PaginatedCollection.prototype.canFetch = function(page) {
        return (this.urls != null) && (this.urls[page] != null);
      };

      PaginatedCollection.prototype._setStateAfterFetch = function(xhr, options) {
        var firstRequest, match, oldUrls, perPage, setBottom, setTop, url, urlIsNotCached, _base, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;

        if ((_ref1 = this._urlCache) == null) {
          this._urlCache = [];
        }
        urlIsNotCached = (_ref2 = options.url, __indexOf.call(this._urlCache, _ref2) < 0);
        if (!urlIsNotCached) {
          this._urlCache.push(options.url);
        }
        firstRequest = !this.atLeastOnePageFetched;
        setBottom = firstRequest || (((_ref3 = options.page) === 'next' || _ref3 === 'bottom') && urlIsNotCached);
        setTop = firstRequest || (((_ref4 = options.page) === 'prev' || _ref4 === 'top') && urlIsNotCached);
        oldUrls = this.urls;
        this.urls = this._parsePageLinks(xhr);
        if (setBottom && (this.urls.next != null)) {
          this.urls.bottom = this.urls.next;
        } else if (!this.urls.next) {
          delete this.urls.bottom;
        } else {
          this.urls.bottom = oldUrls.bottom;
        }
        if (setTop && (this.urls.prev != null)) {
          this.urls.top = this.urls.prev;
        } else if (!this.urls.prev) {
          delete this.urls.top;
        } else {
          this.urls.top = oldUrls.top;
        }
        url = (_ref5 = this.urls.first) != null ? _ref5 : this.urls.next;
        if (url != null) {
          perPage = parseInt(url.match(this.perPageRegex)[1], 10);
          ((_ref6 = (_base = ((_ref7 = this.options) != null ? _ref7 : this.options = {})).params) != null ? _ref6 : _base.params = {}).per_page = perPage;
        }
        if (this.urls.last && (match = this.urls.last.match(this.pageRegex))) {
          this.totalPages = parseInt(match[1], 10);
        }
        return this.atLeastOnePageFetched = true;
      };

      PaginatedCollection.prototype._parsePageLinks = function(xhr) {
        var linkHeader, _ref1,
          _this = this;

        linkHeader = (_ref1 = xhr.getResponseHeader('link')) != null ? _ref1.split(',') : void 0;
        if (linkHeader == null) {
          linkHeader = [];
        }
        return _.reduce(linkHeader, function(links, link) {
          var key, val;

          key = link.match(_this.nameRegex)[1];
          val = link.match(_this.linkRegex)[1];
          links[key] = val;
          return links;
        }, {});
      };

      return PaginatedCollection;

    })(Backbone.Collection);
  });

}).call(this);
