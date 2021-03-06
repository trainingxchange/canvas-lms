(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'str/htmlEscape', 'compiled/models/Outcome', 'compiled/views/outcomes/OutcomeIconBase', 'jquery.disableWhileLoading'], function($, _, h, Outcome, OutcomeIconBase) {
    var OutcomeGroupIconView, _ref;

    return OutcomeGroupIconView = (function(_super) {
      __extends(OutcomeGroupIconView, _super);

      function OutcomeGroupIconView() {
        _ref = OutcomeGroupIconView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      OutcomeGroupIconView.prototype.className = 'outcome-group';

      OutcomeGroupIconView.prototype.attributes = _.extend({}, OutcomeGroupIconView.attributes, {
        'aria-expanded': false
      });

      OutcomeGroupIconView.prototype.onRightArrowKey = function(e, $target) {
        var _this = this;

        $target.attr('aria-expanded', true).attr('tabindex', -1);
        this.triggerSelect();
        return setTimeout(function() {
          return $target.parent().next().find('li[tabindex=0]').focus();
        }, 1000);
      };

      OutcomeGroupIconView.prototype.initDroppable = function() {
        var _this = this;

        return this.$el.droppable({
          scope: 'outcomes',
          hoverClass: 'droppable',
          greedy: true,
          drop: function(e, ui) {
            var disablingDfd, group, model;

            model = ui.draggable.data('view').model;
            group = model instanceof Outcome ? model.outcomeGroup : model;
            if (group.id === _this.model.id) {
              return;
            }
            _this.triggerSelect();
            disablingDfd = new $.Deferred();
            _this.dir.$el.disableWhileLoading(disablingDfd);
            return _this.dir.sidebar.dirForGroup(_this.model).promise().done(function(dir) {
              return dir.moveModelHere(model).done(function() {
                return disablingDfd.resolve();
              });
            });
          }
        });
      };

      OutcomeGroupIconView.prototype.render = function() {
        this.$el.attr('data-id', this.model.get('id'));
        this.$el.html("<a href=\"#\" class=\"ellipsis\" title=\"" + (h(this.model.get('title'))) + "\">\n  <i class=\"icon-folder\"></i>\n  <span>" + (h(this.model.get('title'))) + "</span>\n</a>");
        this.initDroppable();
        return OutcomeGroupIconView.__super__.render.apply(this, arguments);
      };

      return OutcomeGroupIconView;

    })(OutcomeIconBase);
  });

}).call(this);
