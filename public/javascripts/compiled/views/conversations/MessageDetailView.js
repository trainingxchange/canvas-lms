(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!conversations', 'jquery', 'underscore', 'Backbone', 'compiled/models/Message', 'compiled/views/conversations/MessageItemView', 'jst/conversations/messageDetail', 'jst/conversations/noMessage'], function(I18n, $, _, _arg, Message, MessageItemView, template, noMessage) {
    var MessageDetailView, View, _ref;

    View = _arg.View;
    return MessageDetailView = (function(_super) {
      __extends(MessageDetailView, _super);

      function MessageDetailView() {
        _ref = MessageDetailView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MessageDetailView.prototype.tagName = 'div';

      MessageDetailView.prototype.render = function(options) {
        var $template, context,
          _this = this;

        if (options == null) {
          options = {};
        }
        MessageDetailView.__super__.render.apply(this, arguments);
        if (this.model) {
          context = this.model.toJSON().conversation;
          $template = $(template(context));
          this.model.messageCollection.each(function(message) {
            var childView;

            if (!message.get('conversation_id')) {
              message.set('conversation_id', context.id);
            }
            childView = new MessageItemView({
              model: message
            }).render();
            $template.find('.message-content').append(childView.$el);
            _this.listenTo(childView, 'reply', function() {
              return _this.trigger('reply', message);
            });
            _this.listenTo(childView, 'reply-all', function() {
              return _this.trigger('reply-all', message);
            });
            return _this.listenTo(childView, 'forward', function() {
              return _this.trigger('forward', message);
            });
          });
        } else {
          $template = noMessage(options);
        }
        this.$el.html($template);
        this.$el.find('.subject').focus();
        return this;
      };

      return MessageDetailView;

    })(View);
  });

}).call(this);
