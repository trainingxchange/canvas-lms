(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'i18n!discussions.participant'], function(Backbone, I18n) {
    var Participant, _ref;

    return Participant = (function(_super) {
      __extends(Participant, _super);

      function Participant() {
        _ref = Participant.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Participant.prototype.defaults = {
        avatar_image_url: '',
        display_name: I18n.t('anonymous_user', 'Anonymous'),
        id: null
      };

      return Participant;

    })(Backbone.Model);
  });

}).call(this);
