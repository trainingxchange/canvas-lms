(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['Backbone', 'i18n!discussions', 'underscore', 'jquery'], function(Backbone, I18n, _, $) {
    var CHECK_THROTTLE, MS_UNTIL_READ, MarkAsReadWatcher;

    MS_UNTIL_READ = 2000;
    CHECK_THROTTLE = 1000;
    MarkAsReadWatcher = (function() {
      var $window,
        _this = this;

      MarkAsReadWatcher.unread = [];

      function MarkAsReadWatcher(view) {
        var _this = this;

        this.view = view;
        this.markAsRead = __bind(this.markAsRead, this);
        MarkAsReadWatcher.unread.push(this);
        this.view.model.bind('change:collapsedView', function(model, collapsedView) {
          _this.ignore = collapsedView;
          if (collapsedView) {
            return _this.clearTimer();
          }
        });
      }

      MarkAsReadWatcher.prototype.createTimer = function() {
        return this.timer || (this.timer = setTimeout(this.markAsRead, MS_UNTIL_READ));
      };

      MarkAsReadWatcher.prototype.clearTimer = function() {
        clearTimeout(this.timer);
        return delete this.timer;
      };

      MarkAsReadWatcher.prototype.markAsRead = function() {
        this.view.model.markAsRead();
        MarkAsReadWatcher.unread = _(MarkAsReadWatcher.unread).without(this);
        return MarkAsReadWatcher.trigger('markAsRead', this.view.model);
      };

      $window = $(window);

      MarkAsReadWatcher.init = function() {
        $window.bind('scroll resize', this.checkForVisibleEntries);
        return this.checkForVisibleEntries();
      };

      MarkAsReadWatcher.checkForVisibleEntries = _.throttle(function() {
        var bottomOfViewport, entry, inView, topOfElement, topOfViewport, _i, _len, _ref;

        topOfViewport = $window.scrollTop();
        bottomOfViewport = topOfViewport + $window.height();
        _ref = MarkAsReadWatcher.unread;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entry = _ref[_i];
          if (entry.ignore || entry.view.model.get('forced_read_state')) {
            continue;
          }
          topOfElement = entry.view.$el.offset().top;
          inView = (topOfElement < bottomOfViewport) && (topOfElement + entry.view.$el.height() > topOfViewport);
          entry[inView ? 'createTimer' : 'clearTimer']();
        }
      }, CHECK_THROTTLE);

      return MarkAsReadWatcher;

    }).call(this);
    return _.extend(MarkAsReadWatcher, Backbone.Events);
  });

}).call(this);
