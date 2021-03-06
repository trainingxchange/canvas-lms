(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'compiled/views/CollectionView', 'compiled/views/PublishIconView', 'jst/quizzes/QuizItemGroupView', 'compiled/views/quizzes/QuizItemView'], function($, _, CollectionView, PublishIconView, template, QuizItemView) {
    var ItemGroupView, _ref;

    return ItemGroupView = (function(_super) {
      __extends(ItemGroupView, _super);

      function ItemGroupView() {
        this.renderItem = __bind(this.renderItem, this);        _ref = ItemGroupView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ItemGroupView.prototype.template = template;

      ItemGroupView.prototype.itemView = QuizItemView;

      ItemGroupView.prototype.tagName = 'div';

      ItemGroupView.prototype.className = 'item-group-condensed';

      ItemGroupView.prototype.events = {
        'click .ig-header .element_toggler': 'clickHeader'
      };

      ItemGroupView.prototype.clickHeader = function(e) {
        return $(e.currentTarget).find('i').toggleClass('icon-mini-arrow-down').toggleClass('icon-mini-arrow-right');
      };

      ItemGroupView.prototype.isEmpty = function() {
        return this.collection.isEmpty() || this.collection.all(function(m) {
          return m.get('hidden');
        });
      };

      ItemGroupView.prototype.attachCollection = function() {
        return this.collection.on('change:hidden', this.render);
      };

      ItemGroupView.prototype.render = function() {
        ItemGroupView.__super__.render.apply(this, arguments);
        this.$el.find('.no_content').toggle(this.isEmpty());
        return this;
      };

      ItemGroupView.prototype.renderItem = function(model) {
        if (model.get('hidden')) {
          return;
        }
        return ItemGroupView.__super__.renderItem.apply(this, arguments);
      };

      return ItemGroupView;

    })(CollectionView);
  });

}).call(this);
