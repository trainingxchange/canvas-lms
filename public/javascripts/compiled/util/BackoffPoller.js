(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['jquery', 'jquery.ajaxJSON'], function(jQuery) {
    var BackoffPoller;

    return BackoffPoller = (function() {
      function BackoffPoller(url, handler, opts) {
        var _ref, _ref1, _ref2, _ref3, _ref4;

        this.url = url;
        this.handler = handler;
        if (opts == null) {
          opts = {};
        }
        this.handle = __bind(this.handle, this);
        this.poll = __bind(this.poll, this);
        this.baseInterval = (_ref = opts.baseInterval) != null ? _ref : 1000;
        this.backoffFactor = (_ref1 = opts.backoffFactor) != null ? _ref1 : 1.5;
        this.maxAttempts = (_ref2 = opts.maxAttempts) != null ? _ref2 : 8;
        this.handleErrors = (_ref3 = opts.handleErrors) != null ? _ref3 : false;
        this.initialDelay = (_ref4 = opts.initialDelay) != null ? _ref4 : true;
      }

      BackoffPoller.prototype.start = function() {
        if (this.running) {
          this.reset();
        } else {
          this.nextPoll(true);
        }
        return this;
      };

      BackoffPoller.prototype['then'] = function(callback) {
        var _ref;

        if ((_ref = this.callbacks) == null) {
          this.callbacks = [];
        }
        return this.callbacks.push(callback);
      };

      BackoffPoller.prototype.reset = function() {
        this.nextInterval = this.baseInterval;
        return this.attempts = 0;
      };

      BackoffPoller.prototype.stop = function(success) {
        var callback, _i, _len, _ref;

        if (success == null) {
          success = false;
        }
        if (this.running) {
          clearTimeout(this.running);
        }
        delete this.running;
        if (success && this.callbacks) {
          _ref = this.callbacks;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            callback = _ref[_i];
            callback();
          }
        }
        return delete this.callbacks;
      };

      BackoffPoller.prototype.poll = function() {
        var _this = this;

        this.running = true;
        this.attempts++;
        return jQuery.ajaxJSON(this.url, 'GET', {}, this.handle, function(data, xhr) {
          if (_this.handleErrors) {
            return _this.handle(data, xhr);
          } else {
            return _this.stop();
          }
        });
      };

      BackoffPoller.prototype.handle = function(data, xhr) {
        switch (this.handler(data, xhr)) {
          case 'continue':
            return this.nextPoll();
          case 'reset':
            return this.nextPoll(true);
          case 'stop':
            return this.stop(true);
          default:
            return this.stop();
        }
      };

      BackoffPoller.prototype.nextPoll = function(reset) {
        if (reset == null) {
          reset = false;
        }
        if (reset) {
          this.reset();
          if (!this.initialDelay) {
            return this.poll();
          }
        } else {
          this.nextInterval = parseInt(this.nextInterval * this.backoffFactor);
        }
        if (this.attempts >= this.maxAttempts) {
          return this.stop();
        }
        return this.running = setTimeout(this.poll, this.nextInterval);
      };

      return BackoffPoller;

    })();
  });

}).call(this);
