(function() {
  define(['../main'], function(Application) {
    var karmaLoaded, startApp;

    karmaLoaded = window.__karma__;
    Ember.LOG_VERSION = !karmaLoaded;
    return startApp = function() {
      var App;

      App = null;
      Ember.run.join(function() {
        App = Application.create({
          LOG_ACTIVE_GENERATION: !karmaLoaded,
          LOG_MODULE_RESOLVER: !karmaLoaded,
          LOG_TRANSITIONS: !karmaLoaded,
          LOG_TRANSITIONS_INTERNAL: !karmaLoaded,
          LOG_VIEW_LOOKUPS: !karmaLoaded,
          rootElement: '#fixtures',
          history: 'none'
        });
        App.Router.reopen({
          history: 'none'
        });
        App.setupForTesting();
        return App.injectTestHelpers();
      });
      window.App = App;
      return App;
    };
  });

}).call(this);
