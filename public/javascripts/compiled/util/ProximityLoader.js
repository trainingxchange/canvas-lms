(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['jquery', 'underscore'], function($, _) {
    var ProximityLoader;

    return ProximityLoader = (function() {
      ProximityLoader.prototype.defaultOptions = {
        callback: $.noop,
        delay: 200,
        dependencies: [],
        threshold: 150
      };

      function ProximityLoader(el, options) {
        if (options == null) {
          options = {};
        }
        this._loadScript = __bind(this._loadScript, this);
        this._onMove = __bind(this._onMove, this);
        this.options = _.extend({}, this.defaultOptions, options);
        this._cacheElements(el);
        this.deferred = $.Deferred().then(this._loadScript);
        if (!this.$el.length) {
          return;
        }
        this._attachEvents();
      }

      ProximityLoader.prototype._cacheElements = function(el) {
        this.$el = $(el);
        return this.$body = $('body');
      };

      ProximityLoader.prototype._attachEvents = function() {
        return this.$body.on(this._eventName(), _.throttle(this._onMove, this.options.delay));
      };

      ProximityLoader.prototype._eventName = function() {
        return "mousemove.proximity." + this.$el.guid;
      };

      ProximityLoader.prototype._dimensions = function() {
        return this.__dimensions || (this.__dimensions = {
          bottom: this.$el.offset().top + this.$el.height() + this.options.threshold,
          left: this.$el.offset().left - this.options.threshold,
          right: this.$el.offset().left + this.$el.width() + this.options.threshold,
          top: this.$el.offset().top - this.options.threshold,
          centerX: this.$el.offset().left + (this.$el.width() / 2),
          centerY: this.$el.offset().top + (this.$el.height() / 2)
        });
      };

      ProximityLoader.prototype._onMove = function(e) {
        if (this._isBounded(e.pageX, e.pageY) && this._hasVelocity(e.pageX, e.pageY)) {
          this.deferred.resolve();
        }
        return this.pageX = e.pageX, this.pageY = e.pageY, e;
      };

      ProximityLoader.prototype._loadScript = function() {
        this.$body.off(this._eventName());
        return require(this.options.dependencies, this.options.callback);
      };

      ProximityLoader.prototype._isBounded = function(x, y) {
        return this._dimensions().left < x && this._dimensions().right > x && this._dimensions().top < y && this._dimensions().bottom > y;
      };

      ProximityLoader.prototype._hasVelocity = function(x, y) {
        return Math.abs(this.pageX - this._dimensions().centerX) > Math.abs(x - this._dimensions().centerX) && Math.abs(this.pageY - this._dimensions().centerY) > Math.abs(y - this._dimensions().centerY);
      };

      return ProximityLoader;

    })();
  });

}).call(this);
