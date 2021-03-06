(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jst/accounts/user'], function(Backbone, template) {
    var UserView, _ref;

    return UserView = (function(_super) {
      __extends(UserView, _super);

      function UserView() {
        this.changeSelection = __bind(this.changeSelection, this);
        this.click = __bind(this.click, this);        _ref = UserView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      UserView.prototype.tagName = 'tr';

      UserView.prototype.className = 'rosterUser al-hover-container';

      UserView.prototype.template = template;

      UserView.prototype.events = {
        'click': 'click'
      };

      UserView.prototype.attach = function() {
        return this.model.collection.on('selectedModelChange', this.changeSelection);
      };

      UserView.prototype.click = function(e) {
        e.preventDefault();
        return this.model.collection.trigger('selectedModelChange', this.model);
      };

      UserView.prototype.changeSelection = function(u) {
        var _this = this;

        if (u === this.model) {
          return setTimeout((function() {
            return _this.$el.addClass('selected');
          }), 0);
        }
      };

      return UserView;

    })(Backbone.View);
  });

}).call(this);
