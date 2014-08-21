(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['require', 'underscore', 'Backbone', 'compiled/collections/PaginatedCollection', 'compiled/models/Folder'], function(require, _, Backbone, PaginatedCollection, _THIS_WILL_BE_NULL_) {
    var FoldersCollection, _ref;

    return FoldersCollection = (function(_super) {
      __extends(FoldersCollection, _super);

      function FoldersCollection() {
        _ref = FoldersCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      FoldersCollection.optionProperty('parentFolder');

      require(['compiled/models/Folder'], function(Folder) {
        return FoldersCollection.prototype.model = Folder;
      });

      FoldersCollection.prototype.parse = function(response) {
        var _this = this;

        if (response) {
          _.each(response, function(folder) {
            return folder.contentTypes = _this.parentFolder.contentTypes;
          });
        }
        return FoldersCollection.__super__.parse.apply(this, arguments);
      };

      return FoldersCollection;

    })(PaginatedCollection);
  });

}).call(this);
