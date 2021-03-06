(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!context_modules', 'Backbone', 'jquery', 'compiled/collections/ModuleItemCollection'], function(I18n, Backbone, $, ModuleItemCollection) {
    var Module, _ref;

    return Module = (function(_super) {
      __extends(Module, _super);

      function Module() {
        _ref = Module.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Module.prototype.resourceName = 'modules';

      Module.prototype.initialize = function() {
        var items;

        this.course_id = this.get('course_id');
        if (this.collection) {
          this.course_id || (this.course_id = this.collection.course_id);
        }
        items = this.get('items');
        this.itemCollection = new ModuleItemCollection(items, {
          module_id: this.get('id'),
          course_id: this.course_id
        });
        if (!items) {
          this.itemCollection.setParam('per_page', 50);
          this.itemCollection.fetch();
        }
        return Module.__super__.initialize.apply(this, arguments);
      };

      return Module;

    })(Backbone.Model);
  });

}).call(this);
