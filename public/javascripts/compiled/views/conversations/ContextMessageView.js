(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jst/conversations/contextMessage'], function(_arg, template) {
    var ContextMessageView, View, _ref;

    View = _arg.View;
    return ContextMessageView = (function(_super) {
      __extends(ContextMessageView, _super);

      function ContextMessageView() {
        _ref = ContextMessageView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ContextMessageView.prototype.tagName = 'li';

      ContextMessageView.prototype.template = template;

      ContextMessageView.prototype.events = {
        'click a.context-more': 'toggle',
        'click a.delete-btn': 'remove'
      };

      ContextMessageView.prototype.initialize = function() {
        ContextMessageView.__super__.initialize.apply(this, arguments);
        this.model.set({
          isCondensable: this.model.get('body').length > 180
        });
        return this.model.set({
          isCondensed: true
        });
      };

      ContextMessageView.prototype.toJSON = function() {
        var json;

        json = ContextMessageView.__super__.toJSON.apply(this, arguments);
        if (json.isCondensable && json.isCondensed) {
          json.body = json.body.substr(0, 180).replace(/\W\w*$/, '');
        }
        return json;
      };

      ContextMessageView.prototype.toggle = function(e) {
        e.preventDefault();
        this.model.set({
          isCondensed: !this.model.get('isCondensed')
        });
        this.render();
        return this.$('a').focus();
      };

      return ContextMessageView;

    })(View);
  });

}).call(this);
