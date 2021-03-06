(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone'], function(Backbone) {
    var SpeedgraderLinkView, _ref;

    return SpeedgraderLinkView = (function(_super) {
      __extends(SpeedgraderLinkView, _super);

      function SpeedgraderLinkView() {
        this.toggleSpeedgraderLink = __bind(this.toggleSpeedgraderLink, this);        _ref = SpeedgraderLinkView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      SpeedgraderLinkView.prototype.initialize = function() {
        SpeedgraderLinkView.__super__.initialize.apply(this, arguments);
        return this.model.on('change:published', this.toggleSpeedgraderLink);
      };

      SpeedgraderLinkView.prototype.toggleSpeedgraderLink = function() {
        if (this.model.get('published')) {
          return this.$el.removeClass('hidden');
        } else {
          return this.$el.addClass('hidden');
        }
      };

      return SpeedgraderLinkView;

    })(Backbone.View);
  });

}).call(this);
