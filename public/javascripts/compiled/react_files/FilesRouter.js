(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['react', 'underscore', 'compiled/react_files/components/FilesApp', 'compiled/str/splitAssetString', 'compiled/models/Folder', 'compiled/collections/FilesCollection', 'Backbone'], function(React, _, FilesApp, splitAssetString, Folder, FilesCollection, Backbone) {
    var FilesRouter, _ref;

    return FilesRouter = (function(_super) {
      __extends(FilesRouter, _super);

      function FilesRouter() {
        _ref = FilesRouter.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      FilesRouter.prototype.initialize = function(options) {
        this.options = options;
        if (!(this.options.contextType && this.options.contextId)) {
          throw new Error('contextType and contextId are required');
        }
      };

      FilesRouter.prototype.routes = {
        '': 'root',
        'folder': 'redirectToRoot',
        'folder*folderPath': 'showFolder',
        'search': 'search'
      };

      FilesRouter.prototype.root = function() {
        return this.showFolder('/');
      };

      FilesRouter.prototype.redirectToRoot = function() {
        return this.navigate('', {
          trigger: true,
          replace: true
        });
      };

      FilesRouter.prototype.showFolder = function(folderPath) {
        var _this = this;

        return Folder.resolvePath(this.options.contextType, this.options.contextId, folderPath).then(function(folders) {
          var currentFolder, rootFolder;

          rootFolder = folders[0];
          window.currentFolder = currentFolder = folders[folders.length - 1];
          return _this._renderApp({
            contextType: _this.options.contextType,
            contextId: _this.options.contextId,
            baseUrl: Backbone.history.root,
            showBreadcrumb: true,
            folderPath: folderPath,
            rootFolder: rootFolder,
            currentFolder: currentFolder
          });
        });
      };

      FilesRouter.prototype._renderApp = function(props) {
        return React.renderComponent(FilesApp(props), document.getElementById('content'));
      };

      FilesRouter.prototype.search = function() {
        var collection;

        collection = new FilesCollection;
        collection.url = "/api/v1/" + this.options.contextType + "/" + this.options.contextId + "/files";
        return this._renderApp({
          showBreadcrumb: false,
          searchResults: collection,
          contextType: this.options.contextType,
          contextId: this.options.contextId
        });
      };

      return FilesRouter;

    })(Backbone.Router);
  });

}).call(this);
