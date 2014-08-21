(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['require', 'Backbone', 'jquery', 'underscore', 'compiled/util/deparam', 'compiled/collections/PaginatedCollection', 'compiled/collections/FilesCollection', 'compiled/collections/FoldersCollection'], function(require, Backbone, $, _, deparam, PaginatedCollection, FilesCollection, _THIS_WILL_BE_NULL_) {
    var Folder, _ref;

    return Folder = (function(_super) {
      var getSortProp;

      __extends(Folder, _super);

      function Folder() {
        _ref = Folder.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Folder.prototype.defaults = {
        'name': '',
        sort: 'name',
        order: 'asc'
      };

      Folder.prototype.initialize = function(options) {
        this.contentTypes || (this.contentTypes = options != null ? options.contentTypes : void 0);
        this.setUpFilesAndFoldersIfNeeded();
        this.on('change:sort change:order', this.setQueryStringParams);
        return Folder.__super__.initialize.apply(this, arguments);
      };

      Folder.prototype.parse = function(response) {
        var json;

        json = Folder.__super__.parse.apply(this, arguments);
        this.contentTypes || (this.contentTypes = response.contentTypes);
        this.setUpFilesAndFoldersIfNeeded();
        this.folders.url = response.folders_url;
        this.files.url = response.files_url;
        return json;
      };

      Folder.prototype.setUpFilesAndFoldersIfNeeded = function() {
        var FoldersCollection;

        if (!this.folders) {
          FoldersCollection = require('compiled/collections/FoldersCollection');
          this.folders = new FoldersCollection([], {
            parentFolder: this
          });
        }
        if (!this.files) {
          return this.files = new FilesCollection([], {
            parentFolder: this
          });
        }
      };

      Folder.prototype.expand = function(force) {
        var fetchDfd, selfHasntBeenFetched,
          _this = this;

        if (force == null) {
          force = false;
        }
        this.isExpanded = true;
        this.trigger('expanded');
        if (!(this.expandDfd || force)) {
          this.isExpanding = true;
          this.trigger('beginexpanding');
          this.expandDfd = $.Deferred().done(function() {
            _this.isExpanding = false;
            return _this.trigger('endexpanding');
          });
          selfHasntBeenFetched = this.folders.url === this.folders.constructor.prototype.url || this.files.url === this.files.constructor.prototype.url;
          if (selfHasntBeenFetched || force) {
            fetchDfd = this.fetch();
          }
          return $.when(fetchDfd).done(function() {
            var filesDfd, foldersDfd;

            if (_this.get('folders_count') !== 0) {
              foldersDfd = _this.folders.fetch();
            }
            if (_this.get('files_count') !== 0) {
              filesDfd = _this.files.fetch();
            }
            return $.when(foldersDfd, filesDfd).done(_this.expandDfd.resolve);
          });
        }
      };

      Folder.prototype.collapse = function() {
        this.isExpanded = false;
        return this.trigger('collapsed');
      };

      Folder.prototype.toggle = function() {
        if (this.isExpanded) {
          return this.collapse();
        } else {
          return this.expand();
        }
      };

      Folder.prototype.previewUrl = function() {
        var _ref1;

        if ((_ref1 = this.get('context_type')) === 'Course' || _ref1 === 'Group') {
          return "/" + (this.get('context_type').toLowerCase() + 's') + "/" + (this.get('context_id')) + "/files/{{id}}/preview";
        }
      };

      Folder.resolvePath = function(contextType, contextId, folderPath) {
        var url;

        url = "/api/v1/" + contextType + "/" + contextId + "/folders/by_path" + folderPath;
        return $.get(url).pipe(function(folders) {
          return folders.map(function(folderAttrs) {
            return new Folder(folderAttrs, {
              parse: true
            });
          });
        });
      };

      getSortProp = function(model, sortProp) {
        var _ref1;

        if (sortProp === 'name' && !(model instanceof Folder)) {
          return model.get('display_name');
        } else if (sortProp === 'user') {
          return (_ref1 = model.get('user')) != null ? _ref1.display_name : void 0;
        } else {
          return model.get(sortProp);
        }
      };

      Folder.prototype.childrenSorter = function(a, b) {
        var res, sortProp;

        sortProp = this.get('sort');
        a = getSortProp(a, sortProp);
        b = getSortProp(b, sortProp);
        res = (function() {
          if (a === b) {
            return 0;
          } else if (a > b || a === void 0) {
            return 1;
          } else if (a < b || b === void 0) {
            return -1;
          } else {
            throw new Error("wat? error sorting");
          }
        })();
        if (this.get('order') === 'desc') {
          res = 0 - res;
        }
        return res;
      };

      Folder.prototype.children = function() {
        return (this.folders.toArray().concat(this.files.toArray())).sort(this.childrenSorter.bind(this));
      };

      Folder.prototype.loadAll = function() {
        var loadType,
          _this = this;

        loadType = function(type) {
          var getNextPage;

          getNextPage = function() {
            if (!_this[type].loadedAll) {
              return _this[type].fetch({
                page: 'next'
              }).pipe(getNextPage);
            }
          };
          return getNextPage();
        };
        return $.when.apply($, ['folders', 'files'].map(loadType));
      };

      Folder.prototype.setQueryStringParams = function() {
        var newParams,
          _this = this;

        newParams = {
          include: ['user'],
          per_page: 20,
          sort: this.get('sort'),
          order: this.get('order')
        };
        return ['folders', 'files'].map(function(type) {
          var params, url;

          if (_this[type].loadedAll) {
            return;
          }
          url = new URL(_this[type].url);
          params = deparam(url.search);
          url.search = $.param(_.extend(params, newParams));
          _this[type].url = url.toString();
          return _this[type].reset();
        });
      };

      return Folder;

    })(Backbone.Model);
  });

}).call(this);
