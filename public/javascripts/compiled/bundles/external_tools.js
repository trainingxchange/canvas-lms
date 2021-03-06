(function() {
  require(['compiled/collections/ExternalToolCollection', 'compiled/collections/PaginatedCollection', 'compiled/views/ExternalTools/IndexView', 'compiled/views/ExternalTools/AppCenterView', 'compiled/views/ExternalTools/ExternalToolsCollectionView'], function(ExternalToolCollection, PaginatedCollection, IndexView, AppCenterView, ExternalToolsCollectionView) {
    var appCenterView, apps, externalTools, externalToolsCollectionView;

    externalTools = new ExternalToolCollection;
    externalTools.setParam('per_page', 20);
    apps = new PaginatedCollection;
    apps.resourceName = 'app_center/apps';
    appCenterView = new AppCenterView({
      collection: apps
    });
    externalToolsCollectionView = new ExternalToolsCollectionView({
      collection: externalTools
    });
    this.app = new IndexView({
      externalToolsView: externalToolsCollectionView,
      appCenterView: appCenterView,
      el: '#external_tools',
      appCenterEnabled: ENV.APP_CENTER.enabled
    });
    this.app.render();
    return externalTools.fetch();
  });

}).call(this);
