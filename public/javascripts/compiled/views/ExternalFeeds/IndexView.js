(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore', 'jst/ExternalFeeds/IndexView', 'compiled/fn/preventDefault', 'jquery', 'jquery.toJSON'], function(Backbone, _, template, preventDefault, $) {
    var IndexView, _ref;

    return IndexView = (function(_super) {
      __extends(IndexView, _super);

      function IndexView() {
        _ref = IndexView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      IndexView.prototype.template = template;

      IndexView.prototype.el = '#right-side';

      IndexView.prototype.events = {
        'submit #add_external_feed_form': 'submit',
        'click [data-delete-feed-id]': 'deleteFeed'
      };

      IndexView.prototype.initialize = function() {
        IndexView.__super__.initialize.apply(this, arguments);
        this.collection.on('all', this.render, this);
        return this.render();
      };

      IndexView.prototype.render = function() {
        if (this.collection.length || this.options.permissions.create) {
          $('body').addClass('with-right-side');
          return IndexView.__super__.render.apply(this, arguments);
        }
      };

      IndexView.prototype.deleteFeed = preventDefault(function(event) {
        var id;

        id = this.$(event.target).data('deleteFeedId');
        return this.collection.get(id).destroy();
      });

      IndexView.prototype.submit = preventDefault(function(event) {
        var data;

        data = this.$('#add_external_feed_form').toJSON();
        return this.$el.disableWhileLoading(this.collection.create(data, {
          wait: true
        }));
      });

      return IndexView;

    })(Backbone.View);
  });

}).call(this);
