(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jst/content_migrations/ProgressBar'], function(Backbone, template) {
    var ProgressBarView, _ref;

    return ProgressBarView = (function(_super) {
      __extends(ProgressBarView, _super);

      function ProgressBarView() {
        _ref = ProgressBarView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ProgressBarView.prototype.template = template;

      ProgressBarView.prototype.els = {
        '.progress': '$progress'
      };

      ProgressBarView.prototype.afterRender = function() {
        var _this = this;

        return this.model.on('change:completion', function() {
          return _this.render();
        });
      };

      ProgressBarView.prototype.toJSON = function() {
        var json;

        json = ProgressBarView.__super__.toJSON.apply(this, arguments);
        json.completion = this.model.get('completion');
        return json;
      };

      return ProgressBarView;

    })(Backbone.View);
  });

}).call(this);
