(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['jquery', 'underscore', 'i18n!calendar', 'jst/calendar/messageParticipants', 'jst/calendar/recipientList'], function($, _, I18n, messageParticipantsTemplate, recipientListTemplate) {
    var MessageParticipantsDialog;

    return MessageParticipantsDialog = (function() {
      function MessageParticipantsDialog(opts) {
        var participantType;

        this.opts = opts;
        this.messageFailed = __bind(this.messageFailed, this);
        this.messageSent = __bind(this.messageSent, this);
        this.sendMessage = __bind(this.sendMessage, this);
        this.loadParticipants = __bind(this.loadParticipants, this);
        if (this.opts.timeslot) {
          this.recipients = _(this.opts.timeslot.child_events).map(function(e) {
            return e.user || e.group;
          });
          participantType = this.recipients[0].short_name === void 0 ? 'Group' : 'User';
          this.$form = $(messageParticipantsTemplate({
            participant_type: participantType
          }));
          this.$form.find('select.message_groups').remove();
        } else {
          this.group = this.opts.group;
          this.$form = $(messageParticipantsTemplate({
            participant_type: this.group.participant_type
          }));
          this.dataSource = this.opts.dataSource;
          this.$select = this.$form.find('select.message_groups').change(this.loadParticipants).val('unregistered');
        }
        this.$form.submit(this.sendMessage);
        this.$participantList = this.$form.find('ul');
        if (this.recipients) {
          this.$participantList.html(recipientListTemplate({
            recipientType: participantType,
            recipients: this.recipients
          }));
        }
      }

      MessageParticipantsDialog.prototype.show = function() {
        this.$form.dialog({
          width: 400,
          resizable: false,
          buttons: [
            {
              text: I18n.t('buttons.cancel', 'Cancel'),
              click: function() {
                return $(this).dialog('close');
              }
            }, {
              text: I18n.t('buttons.send_message', 'Send'),
              'data-text-while-loading': I18n.t('buttons.sending_message', 'Sending...'),
              "class": 'btn-primary',
              click: function() {
                return $(this).submit();
              }
            }
          ],
          close: function() {
            return $(this).remove();
          }
        });
        return this.loadParticipants();
      };

      MessageParticipantsDialog.prototype.participantStatus = function(text) {
        var $status;

        if (text == null) {
          text = null;
        }
        $status = $('<li class="status" />');
        this.$participantList.html($status);
        if (text) {
          return $status.text(text);
        } else {
          return $status.spin();
        }
      };

      MessageParticipantsDialog.prototype.loadParticipants = function() {
        var registrationStatus,
          _this = this;

        if (this.recipients) {
          return;
        }
        registrationStatus = this.$select.val();
        this.loading = true;
        this.participantStatus();
        return this.dataSource.getParticipants(this.group, registrationStatus, function(data) {
          var text;

          delete _this.loading;
          if (data.length) {
            return _this.$participantList.html(recipientListTemplate({
              recipientType: _this.group.participant_type,
              recipients: data
            }));
          } else {
            text = _this.group.participant_type === "Group" ? I18n.t('no_groups', 'No groups found') : I18n.t('no_users', 'No users found');
            return _this.participantStatus(text);
          }
        });
      };

      MessageParticipantsDialog.prototype.sendMessage = function(jsEvent) {
        var data, deferred;

        jsEvent.preventDefault();
        if (this.loading) {
          return;
        }
        data = this.$form.getFormData();
        if (!(data['recipients[]'] && data['body'])) {
          return;
        }
        deferred = $.ajaxJSON('/conversations', 'POST', data, this.messageSent, this.messageFailed);
        return this.$form.disableWhileLoading(deferred, {
          buttons: ['[data-text-while-loading] .ui-button-text']
        });
      };

      MessageParticipantsDialog.prototype.messageSent = function(data) {
        this.$form.dialog('close');
        return $.flashMessage(I18n.t('messages_sent', 'Messages Sent'));
      };

      MessageParticipantsDialog.prototype.messageFailed = function(data) {
        return this.$form.find('.error').text(I18n.t('errors.send_message_failed', 'There was an error sending your message, please try again'));
      };

      return MessageParticipantsDialog;

    })();
  });

}).call(this);
