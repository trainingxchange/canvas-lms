(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!discussions', 'Backbone', 'compiled/models/Participant'], function(I18n, Backbone, Participant) {
    var ParticipantCollection, _ref;

    return ParticipantCollection = (function(_super) {
      __extends(ParticipantCollection, _super);

      function ParticipantCollection() {
        _ref = ParticipantCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ParticipantCollection.prototype.model = Participant;

      ParticipantCollection.prototype.defaults = {
        currentUser: {},
        unknown: {
          avatar_image_url: null,
          display_name: I18n.t('uknown_author', 'Unknown Author'),
          id: null
        }
      };

      ParticipantCollection.prototype.findOrUnknownAsJSON = function(id) {
        var participant;

        participant = this.get(id);
        if (participant != null) {
          return participant.toJSON();
        } else if (id === ENV.current_user.id) {
          return ENV.current_user;
        } else {
          return this.options.unknown;
        }
      };

      return ParticipantCollection;

    })(Backbone.Collection);
  });

}).call(this);
