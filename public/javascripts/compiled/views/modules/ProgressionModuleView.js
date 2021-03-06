(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!context_modules', 'jquery', 'Backbone', 'jst/modules/ProgressionModuleView'], function(I18n, $, Backbone, template) {
    var ProgressionModuleView, _ref;

    return ProgressionModuleView = (function(_super) {
      __extends(ProgressionModuleView, _super);

      function ProgressionModuleView() {
        _ref = ProgressionModuleView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ProgressionModuleView.prototype.tagName = 'li';

      ProgressionModuleView.prototype.className = 'progressionModule';

      ProgressionModuleView.prototype.template = template;

      ProgressionModuleView.prototype.statuses = {
        "started": I18n.t("module_started", "In Progress"),
        "completed": I18n.t("module_complete", "Complete"),
        "unlocked": I18n.t("module_unlocked", "Unlocked"),
        "locked": I18n.t("module_locked", "Locked")
      };

      ProgressionModuleView.prototype.iconClasses = {
        'ModuleItem': "icon-module",
        'File': "icon-download",
        'Page': "icon-document",
        'Discussion': "icon-discussion",
        'Assignment': "icon-assignment",
        'Quiz': "icon-quiz",
        'ExternalTool': "icon-link"
      };

      ProgressionModuleView.prototype.toJSON = function() {
        var item, json, _i, _len, _ref1;

        json = ProgressionModuleView.__super__.toJSON.apply(this, arguments);
        json.student_id = this.model.collection.student_id;
        json.status_text = this.statuses[json.state];
        json[json.state] = true;
        _ref1 = json.items;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          item = _ref1[_i];
          item.icon_class = this.iconClasses[item.type] || this.iconClasses['ModuleItem'];
        }
        return json;
      };

      ProgressionModuleView.prototype.afterRender = function() {
        ProgressionModuleView.__super__.afterRender.apply(this, arguments);
        return this.model.collection.syncHeight();
      };

      return ProgressionModuleView;

    })(Backbone.View);
  });

}).call(this);
