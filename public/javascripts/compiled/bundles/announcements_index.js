(function() {
  require(['compiled/collections/AnnouncementsCollection', 'compiled/collections/ExternalFeedCollection', 'compiled/views/announcements/IndexView', 'compiled/views/ExternalFeeds/IndexView'], function(AnnouncementsCollection, ExternalFeedCollection, IndexView, ExternalFeedsIndexView) {
    var collection, externalFeeds;

    collection = new AnnouncementsCollection;
    if (ENV.permissions.create) {
      externalFeeds = new ExternalFeedCollection;
      externalFeeds.fetch();
      new ExternalFeedsIndexView({
        permissions: ENV.permissions,
        collection: externalFeeds
      });
    }
    new IndexView({
      collection: collection,
      permissions: ENV.permissions,
      atom_feed_url: ENV.atom_feed_url
    });
    return collection.fetch();
  });

}).call(this);
