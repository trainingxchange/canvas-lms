(function() {
  define(['ember', '../../shared/components/ic_lazy_list_component', '../../shared/components/form_dialog_component'], function(Ember, ICLazyList, FormDialogComponent) {
    Ember.onLoad('Ember.Application', function(Application) {
      return Application.initializer({
        name: 'SharedComponents',
        initialize: function(container, application) {
          container.register('component:form-dialog', FormDialogComponent);
          return container.register('component:ic-lazy-list', ICLazyList);
        }
      });
    });
    return Ember.Application.extend({
      rootElement: '#content'
    });
  });

}).call(this);
