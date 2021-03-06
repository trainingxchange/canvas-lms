(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jst/content_migrations/subviews/FolderPicker'], function(Backbone, template) {
    var FolderPickerView, _ref;

    return FolderPickerView = (function(_super) {
      __extends(FolderPickerView, _super);

      function FolderPickerView() {
        _ref = FolderPickerView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      FolderPickerView.prototype.template = template;

      FolderPickerView.optionProperty('folderOptions');

      FolderPickerView.prototype.els = {
        ".migrationUploadTo": "$migrationUploadTo"
      };

      FolderPickerView.prototype.events = {
        "change .migrationUploadTo": "setAttributes"
      };

      FolderPickerView.prototype.setAttributes = function(event) {
        return this.model.set('settings', this.$migrationUploadTo.val() ? {
          folder_id: this.$migrationUploadTo.val()
        } : void 0);
      };

      FolderPickerView.prototype.toJSON = function(json) {
        json = FolderPickerView.__super__.toJSON.apply(this, arguments);
        json.folderOptions = this.folderOptions || ENV.FOLDER_OPTIONS;
        return json;
      };

      FolderPickerView.prototype.validations = function() {
        var errors, settings;

        errors = {};
        settings = this.model.get('settings');
        if (!(settings != null ? settings.folder_id : void 0)) {
          errors.migrationUploadTo = [
            {
              type: "required",
              message: "You must select a folder to upload your migration to"
            }
          ];
        }
        return errors;
      };

      return FolderPickerView;

    })(Backbone.View);
  });

}).call(this);
