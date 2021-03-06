(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['i18n!media_comments', 'underscore', 'jst/widget/UploadMediaTrackForm', 'vendor/mediaelement-and-player', 'jquery'], function(I18n, _, template, mejs, $) {
    var UploadMediaTrackForm;

    return UploadMediaTrackForm = (function() {
      function UploadMediaTrackForm(mediaCommentId, video_url) {
        var templateVars,
          _this = this;

        this.mediaCommentId = mediaCommentId;
        this.video_url = video_url;
        this.onSubmit = __bind(this.onSubmit, this);
        templateVars = {
          languages: _.map(mejs.language.codes, function(name, code) {
            return {
              name: name,
              code: code
            };
          }),
          video_url: this.video_url,
          is_amazon_url: this.video_url.search(/.mp4/) !== -1
        };
        this.$dialog = $(template(templateVars)).appendTo('body').dialog({
          width: 650,
          resizable: false,
          buttons: [
            {
              'data-text-while-loading': I18n.t('cancel', 'Cancel'),
              text: I18n.t('cancel', 'Cancel'),
              click: function() {
                return _this.$dialog.remove();
              }
            }, {
              "class": 'btn-primary',
              'data-text-while-loading': I18n.t('uploading', 'Uploading...'),
              text: I18n.t('upload', 'Upload'),
              click: this.onSubmit
            }
          ]
        });
      }

      UploadMediaTrackForm.prototype.onSubmit = function() {
        var submitDfd,
          _this = this;

        submitDfd = new $.Deferred();
        submitDfd.fail(function() {
          return _this.$dialog.find('.invalidInputMsg').show();
        });
        this.$dialog.disableWhileLoading(submitDfd);
        return this.getFileContent().fail(function() {
          return submitDfd.reject();
        }).done(function(content) {
          var params;

          params = {
            content: content,
            locale: _this.$dialog.find('[name="locale"]').val()
          };
          if (!(params.content && params.locale)) {
            return submitDfd.reject();
          }
          return $.ajaxJSON("/media_objects/" + _this.mediaCommentId + "/media_tracks", 'POST', params, function() {
            submitDfd.resolve();
            _this.$dialog.dialog('close');
            return $.flashMessage(I18n.t('track_uploaded_successfully', "Track uploaded successfuly, refresh to see it."));
          });
        });
      };

      UploadMediaTrackForm.prototype.getFileContent = function() {
        var dfd, file, reader;

        dfd = new $.Deferred;
        file = this.$dialog.find('input[name="content"]')[0].files[0];
        if (file) {
          reader = new FileReader();
          reader.onload = function(e) {
            var content;

            content = e.target.result;
            return dfd.resolve(content);
          };
          reader.readAsText(file);
        } else {
          dfd.reject();
        }
        return dfd;
      };

      return UploadMediaTrackForm;

    })();
  });

}).call(this);
