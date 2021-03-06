(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'Backbone', 'i18n!discussions'], function(_, Backbone, I18n) {
    var DiscussionEntry, UNKNOWN_AUTHOR, _ref;

    UNKNOWN_AUTHOR = {
      avatar_image_url: null,
      display_name: I18n.t('unknown_author', 'Unknown Author'),
      id: null
    };
    return DiscussionEntry = (function(_super) {
      __extends(DiscussionEntry, _super);

      function DiscussionEntry() {
        _ref = DiscussionEntry.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DiscussionEntry.prototype.author = function() {
        return this.findParticipant(this.get('user_id'));
      };

      DiscussionEntry.prototype.editor = function() {
        return this.findParticipant(this.get('editor_id'));
      };

      DiscussionEntry.prototype.findParticipant = function(user_id) {
        var user, _ref1, _ref2;

        if (user_id && (user = (_ref1 = this.collection) != null ? _ref1.participants.get(user_id) : void 0)) {
          return user.toJSON();
        } else if (user_id === ((_ref2 = ENV.current_user) != null ? _ref2.id : void 0)) {
          return ENV.current_user;
        } else {
          return UNKNOWN_AUTHOR;
        }
      };

      return DiscussionEntry;

    })(Backbone.Model);
  });

}).call(this);
