(function() {
  require(['jquery', 'compiled/collections/ModuleCollection', 'compiled/views/modules/ModuleCollectionView', 'compiled/views/modules/ModuleItemViewRegister', 'compiled/views/modules/item_types/SelectFileView'], function($, ModuleCollection, ModuleCollectionView, ModuleItemViewRegister, SelectFileView) {
    var modules, modulesView;

    $(document.body).addClass('context_modules2');
    modules = new ModuleCollection(null, {
      course_id: ENV.COURSE_ID
    });
    modules.fetch({
      data: {
        include: ['items']
      }
    });
    modulesView = new ModuleCollectionView({
      editable: ENV.CAN_MANAGE_MODULES,
      collection: modules,
      el: '#modules'
    });
    ModuleItemViewRegister.register({
      key: 'File',
      view: new SelectFileView
    });
    return modulesView.render();
  });

}).call(this);
