(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jst/content_migrations/SourceLink'], function(Backbone, template) {
    var SourceLinkView, _ref;

    return SourceLinkView = (function(_super) {
      __extends(SourceLinkView, _super);

      function SourceLinkView() {
        _ref = SourceLinkView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      SourceLinkView.prototype.template = template;

      SourceLinkView.prototype.toJSON = function() {
        var json;

        json = SourceLinkView.__super__.toJSON.apply(this, arguments);
        json.attachment = this.model.get('attachment');
        json.settings = this.model.get('settings');
        return json;
      };

      return SourceLinkView;

    })(Backbone.View);
  });

}).call(this);
