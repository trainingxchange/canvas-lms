(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'Backbone'], function($, Backbone) {
    var NavigationView, _ref;

    return NavigationView = (function(_super) {
      __extends(NavigationView, _super);

      function NavigationView() {
        this.onKeyDown = __bind(this.onKeyDown, this);        _ref = NavigationView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      NavigationView.prototype.keyCodes = {
        32: 'Space',
        38: 'UpArrow',
        40: 'DownArrow'
      };

      NavigationView.prototype.els = {
        '#nav_enabled_list': '$enabled_list',
        '#nav_disabled_list': '$disabled_list'
      };

      NavigationView.prototype.afterRender = function() {
        this.keyCodes = typeof Object.freeze === "function" ? Object.freeze(this.keyCodes) : void 0;
        return $("li.navitem").on('keydown', this.onKeyDown);
      };

      NavigationView.prototype.onKeyDown = function(e) {
        var $target, fn;

        $target = $(e.target);
        fn = "on" + this.keyCodes[e.keyCode] + "Key";
        if (this[fn]) {
          return this[fn].call(this, e, $target) && e.preventDefault();
        }
      };

      NavigationView.prototype.onUpArrowKey = function(e, $target) {
        var prev;

        prev = $target.prev("li.navitem");
        if (this.empty(prev)) {
          prev = $target.children("li.navitem").first();
        }
        if (this.empty(prev) && this.disabled($target)) {
          prev = this.$enabled_list.children("li.navitem").last();
          if (this.empty(prev)) {
            prev = this.$enabled_list;
            prev.attr('tabindex', 0);
            prev.bind('keydown', this.onKeyDown);
          }
        }
        return prev.focus();
      };

      NavigationView.prototype.onDownArrowKey = function(e, $target) {
        var next;

        next = $target.next("li.navitem");
        if (this.empty(next)) {
          next = $target.children("li.navitem").first();
        }
        if (this.empty(next) && this.enabled($target)) {
          next = this.$disabled_list.children("li.navitem").first();
          if (this.empty(next)) {
            next = this.$disabled_list;
            next.attr('tabindex', -1);
            next.bind('keydown', this.onKeyDown);
          }
        }
        return next.focus();
      };

      NavigationView.prototype.onSpaceKey = function(e, $target) {
        var dragObject;

        if (dragObject = this.$el.data('drag')) {
          if (!$target.is(dragObject)) {
            if ($target.is('li.navitem')) {
              $target.after(dragObject);
            } else {
              $target.append(dragObject);
              $target.attr('tabindex', -1);
              $target.unbind('keydown');
            }
          }
          dragObject.attr('aria-grabbed', false);
          this.$el.data('drag', null);
          return dragObject.focus();
        } else if ($target.is('li.navitem')) {
          $target.attr('aria-grabbed', true);
          dragObject = $target;
          this.$el.data('drag', dragObject);
          dragObject.blur();
          return dragObject.focus();
        }
      };

      NavigationView.prototype.empty = function(selector) {
        return selector.length === 0;
      };

      NavigationView.prototype.enabled = function(el) {
        return el.parent().attr("id") === this.$enabled_list.attr("id");
      };

      NavigationView.prototype.disabled = function(el) {
        return el.parent().attr("id") === this.$disabled_list.attr("id");
      };

      return NavigationView;

    })(Backbone.View);
  });

}).call(this);
