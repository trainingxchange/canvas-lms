(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!editor', 'jquery', 'compiled/editor/EditorToggle', 'compiled/str/convertApiUserContent', 'vendor/jquery.ba-tinypubsub'], function(I18n, $, EditorToggle, convertApiUserContent, _arg) {
    var EntryEditor, publish;

    publish = _arg.publish;
    return EntryEditor = (function(_super) {
      __extends(EntryEditor, _super);

      function EntryEditor(view) {
        this.view = view;
        this.onSaveError = __bind(this.onSaveError, this);
        this.onSaveSuccess = __bind(this.onSaveSuccess, this);
        EntryEditor.__super__.constructor.call(this, this.getEditingElement(), {
          switchViews: true
        });
        this.cancelButton = this.createCancelButton();
        this.done.addClass('btn-small');
      }

      EntryEditor.prototype.display = function(opts) {
        EntryEditor.__super__.display.apply(this, arguments);
        this.cancelButton.detach();
        if ((opts != null ? opts.cancel : void 0) !== true) {
          this.view.model.set('replies', []);
          this.view.model.set('updated_at', (new Date).toISOString());
          this.view.model.set('editor', ENV.current_user);
          return this.view.model.save({
            messageNotification: I18n.t('saving', 'Saving...'),
            message: this.content
          }, {
            success: this.onSaveSuccess,
            error: this.onSaveError
          });
        }
      };

      EntryEditor.prototype.createCancelButton = function() {
        var _this = this;

        return $('<a/>').html(I18n.t('cancel', 'Cancel')).css({
          marginLeft: '5px'
        }).attr('href', 'javascript:').addClass('cancel_button').click(function() {
          return _this.display({
            cancel: true
          });
        });
      };

      EntryEditor.prototype.edit = function() {
        this.editingElement(this.getEditingElement());
        EntryEditor.__super__.edit.apply(this, arguments);
        return this.cancelButton.insertAfter(this.done);
      };

      EntryEditor.prototype.getEditingElement = function() {
        return this.view.$('.message:first');
      };

      EntryEditor.prototype.getContent = function() {
        return convertApiUserContent(this.view.model.get('message'), {
          forEditing: true
        });
      };

      EntryEditor.prototype.onSaveSuccess = function() {
        return this.view.model.set('messageNotification', '');
      };

      EntryEditor.prototype.onSaveError = function() {
        this.view.model.set({
          messageNotification: I18n.t('save_failed', 'Failed to save, please try again later')
        });
        return this.edit();
      };

      return EntryEditor;

    })(EditorToggle);
  });

}).call(this);
