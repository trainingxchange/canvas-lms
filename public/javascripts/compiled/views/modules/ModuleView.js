(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'Backbone', 'jst/modules/ModuleView', 'compiled/views/modules/ModuleItemCollectionView', 'i18n!context_modules', 'compiled/views/modules/AddModuleItemDialog', 'compiled/ModuleItemTypes', 'compiled/views/modules/ModuleItemViewRegister'], function($, Backbone, template, ModuleItemCollectionView, I18n, AddModuleItemDialog, MODULE_ITEM_TYPES, ModuleItemViewRegister) {
    var ModuleView, _ref;

    return ModuleView = (function(_super) {
      __extends(ModuleView, _super);

      function ModuleView() {
        _ref = ModuleView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ModuleView.prototype.template = template;

      ModuleView.prototype.className = 'module item-group-condensed';

      ModuleView.prototype.els = {
        '.module_items': '$items'
      };

      ModuleView.prototype.events = {
        'click .add-item-button': 'displayNewItemDialog'
      };

      ModuleView.prototype.displayNewItemDialog = function(event) {
        var addModuleItemDialog;

        event.preventDefault();
        addModuleItemDialog = new AddModuleItemDialog({
          moduleName: 'This modules name',
          moduleItemTypes: MODULE_ITEM_TYPES
        });
        return addModuleItemDialog.open();
      };

      ModuleView.prototype.afterRender = function() {
        this.itemsView = new ModuleItemCollectionView({
          collection: this.model.itemCollection,
          el: this.$items
        });
        this.itemsView.render();
        return ModuleView.__super__.afterRender.apply(this, arguments);
      };

      return ModuleView;

    })(Backbone.View);
  });

}).call(this);
