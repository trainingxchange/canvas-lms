(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'i18n!roster', 'Backbone', 'jst/courses/roster/resendInvitations', 'jquery.ajaxJSON', 'compiled/jquery.rails_flash_notifications'], function($, _, I18n, _arg, template) {
    var ResendInvitationsView, View, _ref;

    View = _arg.View;
    return ResendInvitationsView = (function(_super) {
      __extends(ResendInvitationsView, _super);

      function ResendInvitationsView() {
        _ref = ResendInvitationsView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ResendInvitationsView.optionProperty('canResend');

      ResendInvitationsView.optionProperty('resendInvitationsUrl');

      ResendInvitationsView.prototype.events = {
        'click .resend-pending-invitations': 'resendPendingInvitations'
      };

      ResendInvitationsView.prototype.template = template;

      ResendInvitationsView.prototype.toJSON = function() {
        return _.extend({}, this.model.toJSON(), this);
      };

      ResendInvitationsView.prototype.attach = function() {
        return this.model.on('change:pendingInvitationsCount', this.render, this);
      };

      ResendInvitationsView.prototype.resendPendingInvitations = function(e) {
        var xhr,
          _this = this;

        this.sending = true;
        this.render();
        xhr = $.ajaxJSON(this.resendInvitationsUrl, 'POST', {}, function() {
          return $.flashMessage(I18n.t('invitations_re_sent', "Invitations sent successfully"));
        }, function() {
          return $.flashError(I18n.t('error_sending_invitations', "Error sending invitation. Please try again."));
        });
        return $.when(xhr).always((function() {
          return _this.sending = false;
        }), this.render);
      };

      return ResendInvitationsView;

    })(View);
  });

}).call(this);
