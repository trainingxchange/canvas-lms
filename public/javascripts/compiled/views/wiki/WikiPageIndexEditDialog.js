(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'i18n!pages', 'str/htmlEscape', 'compiled/views/DialogFormView', 'jst/wiki/WikiPageIndexEditDialog'], function($, _, I18n, htmlEscape, DialogFormView, wrapperTemplate) {
    var WikiPageIndexEditDialog, dialogDefaults, _ref;

    dialogDefaults = {
      fixDialogButtons: false,
      title: I18n.t('edit_dialog_title', 'Edit Wiki Page'),
      width: 400,
      height: 190
    };
    return WikiPageIndexEditDialog = (function(_super) {
      __extends(WikiPageIndexEditDialog, _super);

      function WikiPageIndexEditDialog() {
        _ref = WikiPageIndexEditDialog.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      WikiPageIndexEditDialog.prototype.setViewProperties = false;

      WikiPageIndexEditDialog.prototype.className = 'page-edit-dialog';

      WikiPageIndexEditDialog.prototype.wrapperTemplate = wrapperTemplate;

      WikiPageIndexEditDialog.prototype.template = function() {
        return '';
      };

      WikiPageIndexEditDialog.prototype.initialize = function(options) {
        return WikiPageIndexEditDialog.__super__.initialize.call(this, _.extend({}, dialogDefaults, options));
      };

      WikiPageIndexEditDialog.prototype.setupDialog = function() {
        var buttons, form;

        WikiPageIndexEditDialog.__super__.setupDialog.apply(this, arguments);
        form = this;
        buttons = [
          {
            "class": 'btn',
            text: I18n.t('cancel_button', 'Cancel'),
            click: function() {
              return form.$el.dialog('close');
            }
          }, {
            "class": 'btn btn-primary',
            text: I18n.t('save_button', 'Save'),
            'data-text-while-loading': I18n.t('saving_button', 'Saving...'),
            click: function() {
              return form.submit();
            }
          }
        ];
        return this.$el.dialog('option', 'buttons', buttons);
      };

      WikiPageIndexEditDialog.prototype.openAgain = function() {
        WikiPageIndexEditDialog.__super__.openAgain.apply(this, arguments);
        return this.$('[name="title"]').focus();
      };

      return WikiPageIndexEditDialog;

    })(DialogFormView);
  });

}).call(this);
