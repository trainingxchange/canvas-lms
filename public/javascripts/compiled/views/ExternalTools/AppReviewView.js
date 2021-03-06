(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'Backbone', 'jst/ExternalTools/AppReviewView'], function($, Backbone, template) {
    var AppReviewView, _ref;

    return AppReviewView = (function(_super) {
      __extends(AppReviewView, _super);

      function AppReviewView() {
        _ref = AppReviewView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AppReviewView.prototype.template = template;

      AppReviewView.prototype.afterRender = function() {
        return this.$('img.avatar_image').error(this.fixAvatar);
      };

      AppReviewView.prototype.fixAvatar = function(event, data) {
        var img;

        img = $(event.currentTarget);
        return img.attr('src', '/images/avatar-50.png');
      };

      AppReviewView.prototype.toJSON = function() {
        var json;

        json = AppReviewView.__super__.toJSON.apply(this, arguments);
        if (!json.user_avatar_url) {
          json.user_avatar_url = '/images/avatar-50.png';
        }
        return json;
      };

      return AppReviewView;

    })(Backbone.View);
  });

}).call(this);
