(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'i18n!pages', 'str/htmlEscape', 'compiled/views/DialogFormView'], function($, _, I18n, htmlEscape, DialogFormView) {
    var WikiPageDeleteDialog, dialogDefaults, _ref;

    dialogDefaults = {
      fixDialogButtons: false,
      title: I18n.t('delete_dialog_title', 'Delete Wiki Page'),
      width: 400,
      height: 160
    };
    return WikiPageDeleteDialog = (function(_super) {
      __extends(WikiPageDeleteDialog, _super);

      function WikiPageDeleteDialog() {
        _ref = WikiPageDeleteDialog.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      WikiPageDeleteDialog.prototype.setViewProperties = false;

      WikiPageDeleteDialog.prototype.wrapperTemplate = function() {
        return '<div class="outlet"></div>';
      };

      WikiPageDeleteDialog.prototype.template = function() {
        return I18n.t('delete_confirmation', 'Are you sure you wish to delete this wiki page?');
      };

      WikiPageDeleteDialog.optionProperty('wiki_pages_path');

      WikiPageDeleteDialog.prototype.initialize = function(options) {
        return WikiPageDeleteDialog.__super__.initialize.call(this, _.extend({}, dialogDefaults, options));
      };

      WikiPageDeleteDialog.prototype.submit = function(event) {
        var destroyDfd, dfd, page_title, wiki_pages_path,
          _this = this;

        if (event != null) {
          event.preventDefault();
        }
        destroyDfd = this.model.destroy({
          wait: true
        });
        dfd = $.Deferred();
        page_title = this.model.get('title');
        wiki_pages_path = this.wiki_pages_path;
        destroyDfd.then(function() {
          var expires, path;

          if (wiki_pages_path) {
            expires = new Date;
            expires.setMinutes(expires.getMinutes() + 1);
            path = '/';
            $.cookie('deleted_page_title', page_title, {
              expires: expires,
              path: path
            });
            return window.location.href = wiki_pages_path;
          } else {
            $.flashMessage(I18n.t('notices.page_deleted', 'The page "%{title}" has been deleted.', {
              title: page_title
            }));
            dfd.resolve();
            return _this.close();
          }
        });
        destroyDfd.fail(function() {
          $.flashError(htmlEscape(I18n.t('notices.delete_failed', 'The page "%{title}" could not be deleted.', {
            title: page_title
          })));
          return dfd.reject();
        });
        return this.$el.disableWhileLoading(dfd);
      };

      WikiPageDeleteDialog.prototype.setupDialog = function() {
        var buttons, form;

        WikiPageDeleteDialog.__super__.setupDialog.apply(this, arguments);
        form = this;
        buttons = [
          {
            "class": 'btn',
            text: I18n.t('cancel_button', 'Cancel'),
            click: function() {
              return form.$el.dialog('close');
            }
          }, {
            "class": 'btn btn-danger',
            text: I18n.t('delete_button', 'Delete'),
            'data-text-while-loading': I18n.t('deleting_button', 'Deleting...'),
            click: function() {
              return form.submit();
            }
          }
        ];
        return this.$el.dialog('option', 'buttons', buttons);
      };

      return WikiPageDeleteDialog;

    })(DialogFormView);
  });

}).call(this);
