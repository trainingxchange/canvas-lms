(function() {
  require(['compiled/react_files/FilesRouter', 'Backbone', 'compiled/str/splitAssetString'], function(FilesRouter, Backbone, splitAssetString) {
    var baseUrl, contextId, contextType, _ref;

    _ref = splitAssetString(ENV.context_asset_string), contextType = _ref[0], contextId = _ref[1];
    contextId = Number(contextId);
    baseUrl = contextType === 'user' ? '/files' : "/" + contextType + "/" + contextId + "/files";
    new FilesRouter({
      contextType: contextType,
      contextId: contextId
    });
    return Backbone.history.start({
      pushState: true,
      hashChange: false,
      root: baseUrl
    });
  });

}).call(this);
