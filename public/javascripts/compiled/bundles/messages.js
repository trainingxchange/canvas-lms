(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  require(['i18n!messages', 'jquery', 'jst/messages/sendForm', 'compiled/jquery/fixDialogButtons', 'jqueryui/dialog', 'jqueryui/tabs'], function(I18n, $, sendForm) {
    var MessageModal, showDialog;

    $(".tabs").tabs();
    showDialog = function(e) {
      var $message, modal;

      e.preventDefault();
      $message = $(e.target).parents('li.message:first');
      modal = new MessageModal($message, $message.data());
      return modal.open();
    };
    $(document).ready(function() {
      return $('.reply-button').on('click', showDialog);
    });
    return MessageModal = (function() {
      MessageModal.prototype.dialogOptions = {
        autoOpen: false,
        modal: true,
        title: I18n.t('dialog.title', 'Send a reply message')
      };

      function MessageModal($message, _arg) {
        var messageId, secureId;

        secureId = _arg.secureId, messageId = _arg.messageId;
        this.sendMessage = __bind(this.sendMessage, this);
        this.tpl = sendForm({
          location: window.location.href,
          secureId: secureId,
          messageId: messageId,
          subject: "re: " + ($message.find('.h6:first').text()),
          from: $message.find('.message-to').text()
        });
        this.$el = $(this.tpl).dialog(this.dialogOptions);
        this.attachEvents();
      }

      MessageModal.prototype.attachEvents = function() {
        return this.$el.on('submit', this.sendMessage);
      };

      MessageModal.prototype.open = function() {
        return this.$el.dialog('open').fixDialogButtons();
      };

      MessageModal.prototype.close = function() {
        return this.$el.dialog('close');
      };

      MessageModal.prototype.sendMessage = function(e) {
        e.preventDefault();
        this.close();
        $.post(this.$el.attr('action'), this.$el.serialize()).fail(function() {
          return $.flashError(I18n.t('messages.failure', 'There was an error sending your email. Please reload the page and try again.'));
        });
        return $.flashMessage(I18n.t('messages.success', 'Your email is being delivered.'));
      };

      return MessageModal;

    })();
  });

}).call(this);
