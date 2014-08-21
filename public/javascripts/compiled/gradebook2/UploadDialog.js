(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['jquery', 'jst/gradebook_uploads_form', 'jqueryui/dialog'], function($, gradebook_uploads_form) {
    var UploadDialog;

    return UploadDialog = (function() {
      function UploadDialog(context_url) {
        this.context_url = context_url;
        this.init = __bind(this.init, this);
        this.init();
      }

      UploadDialog.prototype.init = function(opts) {
        var dialog, locals,
          _this = this;

        if (opts == null) {
          opts = {
            context_url: this.context_url
          };
        }
        locals = {
          download_gradebook_csv_url: "" + opts.context_url + "/gradebook.csv",
          action: "" + opts.context_url + "/gradebook_uploads",
          authenticityToken: ENV.AUTHENTICITY_TOKEN
        };
        dialog = $(gradebook_uploads_form(locals));
        return dialog.dialog({
          bgiframe: true,
          modal: true,
          width: 720,
          resizable: false,
          close: function() {
            return dialog.remove();
          }
        }).fixDialogButtons();
      };

      return UploadDialog;

    })();
  });

}).call(this);
