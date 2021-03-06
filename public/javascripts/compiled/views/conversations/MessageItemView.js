(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!conversations', 'jquery', 'underscore', 'Backbone', 'jst/conversations/messageItem', 'jst/_avatar'], function(I18n, $, _, _arg, template) {
    var MessageItemView, View, _ref;

    View = _arg.View;
    return MessageItemView = (function(_super) {
      __extends(MessageItemView, _super);

      function MessageItemView() {
        _ref = MessageItemView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MessageItemView.prototype.tagName = 'li';

      MessageItemView.prototype.className = 'message-item-view';

      MessageItemView.prototype.template = template;

      MessageItemView.prototype.els = {
        '.message-participants-toggle': '$toggle',
        '.message-participants': '$participants',
        '.summarized-message-participants': '$summarized',
        '.full-message-participants': '$full',
        '.message-metadata': '$metadata'
      };

      MessageItemView.prototype.events = {
        'blur .actions a': 'onActionBlur',
        'click .al-trigger': 'onMenuOpen',
        'click .delete-btn': 'onDelete',
        'click .forward-btn': 'onForward',
        'click .message-participants-toggle': 'onToggle',
        'click .reply-btn': 'onReply',
        'click .reply-all-btn': 'onReplyAll',
        'focus .actions a': 'onActionFocus'
      };

      MessageItemView.prototype.messages = {
        confirmDelete: I18n.t('confirm.delete_message', 'Are you sure you want to delete your copy of this message? This action cannot be undone.')
      };

      MessageItemView.prototype.initialize = function() {
        MessageItemView.__super__.initialize.apply(this, arguments);
        return this.summarized = this.model.get('summarizedParticipantNames');
      };

      MessageItemView.prototype.toJSON = function() {
        return this.model.toJSON();
      };

      MessageItemView.prototype.afterRender = function() {
        MessageItemView.__super__.afterRender.apply(this, arguments);
        this.updateParticipants(this.summarized);
        return this.$el.attr('data-id', this.model.id);
      };

      MessageItemView.prototype.updateParticipants = function(summarized) {
        var element;

        element = summarized ? this.$summarized : this.$full;
        this.$participants.text(element.text());
        return this.$toggle.text(summarized ? I18n.t('more_participants', '+%{total} more', {
          total: this.model.get('hiddenParticipantCount')
        }) : I18n.t('hide', 'Hide'));
      };

      MessageItemView.prototype.onToggle = function(e) {
        e.preventDefault();
        return this.updateParticipants(this.summarized = !this.summarized);
      };

      MessageItemView.prototype.onReply = function(e) {
        e.preventDefault();
        return this.trigger('reply');
      };

      MessageItemView.prototype.onReplyAll = function(e) {
        e.preventDefault();
        return this.trigger('reply-all');
      };

      MessageItemView.prototype.onDelete = function(e) {
        var url;

        e.preventDefault();
        if (!confirm(this.messages.confirmDelete)) {
          return;
        }
        url = "/api/v1/conversations/" + (this.model.get('conversation_id')) + "/remove_messages";
        $.ajaxJSON(url, 'POST', {
          remove: [this.model.id]
        });
        return this.remove();
      };

      MessageItemView.prototype.onForward = function(e) {
        e.preventDefault();
        return this.trigger('forward');
      };

      MessageItemView.prototype.onMenuOpen = function(e) {
        return e.preventDefault();
      };

      MessageItemView.prototype.onActionFocus = function(e) {
        return this.$metadata.addClass('hover');
      };

      MessageItemView.prototype.onActionBlur = function(e) {
        return this.$metadata.removeClass('hover');
      };

      return MessageItemView;

    })(View);
  });

}).call(this);
