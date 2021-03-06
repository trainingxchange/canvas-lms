(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!discussions', 'jquery', 'compiled/fn/preventDefault', 'Backbone'], function(I18n, $, preventDefault, _arg) {
    var ToggleableSubscriptionIconView, View, _ref;

    View = _arg.View;
    return ToggleableSubscriptionIconView = (function(_super) {
      __extends(ToggleableSubscriptionIconView, _super);

      function ToggleableSubscriptionIconView() {
        _ref = ToggleableSubscriptionIconView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ToggleableSubscriptionIconView.prototype.tagName = 'a';

      ToggleableSubscriptionIconView.prototype.attributes = {
        'href': '#'
      };

      ToggleableSubscriptionIconView.prototype.messages = {
        subscribe: I18n.t('subscribe', 'Subscribe to this topic'),
        subscribed: I18n.t('subscribed', 'Subscribed'),
        unsubscribe: I18n.t('unsubscribe', 'Unsubscribe from this topic'),
        unsubscribed: I18n.t('unsubscribed', 'Unsubscribed'),
        initial_post_required: I18n.t('initial_post_required_to_subscribe', 'You must post a reply before subscribing'),
        not_in_group_set: I18n.t('cant_subscribe_not_in_group_set', 'You must be in an associated group to subscribe'),
        not_in_group: I18n.t('cant_subscribe_not_in_group', 'You must be in this group to subscribe')
      };

      ToggleableSubscriptionIconView.prototype.tooltipOptions = {
        items: '*',
        position: {
          my: 'center bottom',
          at: 'center top-10',
          collision: 'none'
        },
        tooltipClass: 'center bottom vertical'
      };

      ToggleableSubscriptionIconView.prototype.events = {
        'click': 'click',
        'hover': 'hover'
      };

      ToggleableSubscriptionIconView.prototype.initialize = function() {
        this.model.on('change:subscribed', this.render);
        this.model.on('change:user_can_see_posts', this.render);
        this.model.on('change:subscription_hold', this.render);
        return ToggleableSubscriptionIconView.__super__.initialize.apply(this, arguments);
      };

      ToggleableSubscriptionIconView.prototype.hover = function(_arg1) {
        var type;

        type = _arg1.type;
        this.hovering = type === 'mouseenter';
        this.displayStateDuringHover = false;
        return this.render();
      };

      ToggleableSubscriptionIconView.prototype.click = function(e) {
        e.preventDefault();
        if (this.subscribed()) {
          this.model.topicUnsubscribe();
          this.displayStateDuringHover = true;
        } else if (this.canSubscribe()) {
          this.model.topicSubscribe();
          this.displayStateDuringHover = true;
        }
        return this.render();
      };

      ToggleableSubscriptionIconView.prototype.subscribed = function() {
        return this.model.get('subscribed') && this.canSubscribe();
      };

      ToggleableSubscriptionIconView.prototype.canSubscribe = function() {
        return !this.subscriptionHold();
      };

      ToggleableSubscriptionIconView.prototype.subscriptionHold = function() {
        return this.model.get('subscription_hold');
      };

      ToggleableSubscriptionIconView.prototype.classAndTextForTooltip = function() {
        if (this.hovering) {
          if (this.subscribed()) {
            if (this.displayStateDuringHover) {
              return ['icon-discussion-check', this.messages['subscribed']];
            } else {
              return ['icon-discussion-x', this.messages['unsubscribe']];
            }
          } else {
            if (this.displayStateDuringHover) {
              return ['icon-discussion', this.messages['unsubscribed']];
            } else if (this.canSubscribe()) {
              return ['icon-discussion-check', this.messages['subscribe']];
            } else {
              return ['icon-discussion-x', this.messages[this.subscriptionHold()]];
            }
          }
        } else {
          return [(this.subscribed() ? 'icon-discussion-check' : 'icon-discussion'), ''];
        }
      };

      ToggleableSubscriptionIconView.prototype.resetTooltipText = function(tooltipText) {
        this.$el.tooltip(this.tooltipOptions);
        this.$el.tooltip('close');
        this.$el.tooltip('option', {
          content: function() {
            return tooltipText;
          }
        });
        return this.$el.tooltip('open');
      };

      ToggleableSubscriptionIconView.prototype.afterRender = function() {
        var newClass, tooltipText, _ref1;

        _ref1 = this.classAndTextForTooltip(), newClass = _ref1[0], tooltipText = _ref1[1];
        this.resetTooltipText(tooltipText);
        this.$el.removeClass('icon-discussion icon-discussion-x icon-discussion-check');
        this.$el.addClass(newClass);
        return this;
      };

      return ToggleableSubscriptionIconView;

    })(View);
  });

}).call(this);
