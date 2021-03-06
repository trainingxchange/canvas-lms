(function() {
  define(['compiled/str/splitAssetString'], function(splitAssetString) {
    return {
      _contextPath: function() {
        var assetString, contextId, contextType, _ref;

        assetString = this.contextAssetString || ENV.context_asset_string;
        _ref = splitAssetString(assetString), contextType = _ref[0], contextId = _ref[1];
        return "" + contextType + "/" + contextId;
      },
      _defaultUrl: function() {
        var resourceName;

        resourceName = this.resourceName || this.model.prototype.resourceName;
        if (!resourceName) {
          throw new Error("Must define a `resourceName` property on collection or model prototype to use defaultUrl");
        }
        return "/api/v1/" + (this._contextPath()) + "/" + resourceName;
      }
    };
  });

}).call(this);
