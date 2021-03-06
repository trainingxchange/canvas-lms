(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['jquery', 'underscore', 'vendor/jquery.cookie'], function($, _) {
    var KalturaAnalytics;

    KalturaAnalytics = (function() {
      function KalturaAnalytics(mediaId, mediaElement, pluginSettings) {
        this.mediaId = mediaId;
        this.mediaElement = mediaElement;
        this.pluginSettings = pluginSettings;
        this.addListeners = __bind(this.addListeners, this);
        this.queueApiCall = __bind(this.queueApiCall, this);
        this.setupApiIframes = __bind(this.setupApiIframes, this);
        this.generateApiUrl = __bind(this.generateApiUrl, this);
        this.ensureAnalyticSession = __bind(this.ensureAnalyticSession, this);
        this.queueAnalyticEvent = __bind(this.queueAnalyticEvent, this);
        this.ensureAnalyticSession();
        this.generateApiUrl();
        this.defaultData = {
          service: 'stats',
          action: 'collect',
          'event:entryId': this.mediaId,
          'event:sessionId': this.kaSession,
          'event:isFirstInSession': "false",
          'event:objectType': "KalturaStatsEvent",
          'event:partnerId': this.pluginSettings.partner_id,
          'event:uiconfId': this.pluginSettings.kcw_ui_conf,
          'event:queryStringReferrer': window.location.href
        };
      }

      KalturaAnalytics.prototype.queueAnalyticEvent = function(eventId) {
        var data;

        data = _.clone(this.defaultData);
        data['event:eventType'] = eventId;
        data['event:duration'] = this.mediaElement.duration;
        data['event:currentPoint'] = parseInt(this.mediaElement.currentTime * 1000);
        data['event:eventTimestamp'] = new Date().getTime();
        return this.queueApiCall(this.apiUrl + $.param(data));
      };

      KalturaAnalytics.prototype.ensureAnalyticSession = function() {
        this.kaSession = $.cookie('kaltura_analytic_tracker', void 0, {
          path: '/'
        });
        if (!this.kaSession) {
          this.kaSession = (Math.random().toString(16) + Math.random().toString(16) + Math.random().toString(16)).replace(/\./g, '');
          return $.cookie('kaltura_analytic_tracker', this.kaSession, {
            path: '/'
          });
        }
      };

      KalturaAnalytics.prototype.generateApiUrl = function() {
        var domain;

        if (window.location.protocol === 'http:') {
          domain = "http://" + this.pluginSettings.domain;
        } else {
          domain = "https://" + this.pluginSettings.domain;
        }
        return this.apiUrl = "" + domain + "/api_v3/index.php?";
      };

      KalturaAnalytics.prototype.setupApiIframes = function(count) {
        var f, i, iframe, queue, _i, _ref;

        this.qIndex = 0;
        this.iframes = [];
        for (i = _i = 0, _ref = count - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          iframe = document.createElement('iframe');
          $(iframe).addClass('hidden kaltura-analytics');
          $(document.body).append(iframe);
          queue = [];
          f = (function(iframe, queue) {
            return function() {
              var url;

              if (url = queue.shift()) {
                return iframe.src = url;
              }
            };
          })(iframe, queue);
          this.iframes[i] = {
            iframe: iframe,
            queue: queue,
            pinger: _.throttle(f, 4000)
          };
        }
        return this.iframes;
      };

      KalturaAnalytics.prototype.queueApiCall = function(url) {
        if (!this.iframes) {
          this.setupApiIframes(this.pluginSettings.parallel_api_calls || 3);
        }
        this.iframes[this.qIndex].queue.push(url);
        this.iframes[this.qIndex].pinger();
        this.qIndex = (this.qIndex + 1) % this.iframes.length;
        return this.qIndex;
      };

      KalturaAnalytics.prototype.addListeners = function() {
        var _isFullScreen, _lastTime,
          _this = this;

        this.queueAnalyticEvent(1);
        this.mediaElement.addEventListener('play', function() {
          _this.mediaElement.pauseObserved = false;
          _this.mediaElement.endedObserved = false;
          if (_this.mediaElement.endedOnce) {
            _this.queueAnalyticEvent(mediaId, 16);
            _this.mediaElement.endedOnce = false;
          }
          return _this.queueAnalyticEvent(3);
        });
        this.mediaElement.addEventListener('canplay', function() {
          return _this.queueAnalyticEvent(2);
        });
        this.mediaElement.addEventListener('seeked', function() {
          if (_this.mediaElement.endedObserved) {
            return;
          }
          return _this.queueAnalyticEvent(17);
        });
        this.mediaElement.addEventListener('pause', function() {
          if (_this.mediaElement.pauseObserved) {
            return;
          }
          return _this.mediaElement.pauseObserved = true;
        });
        this.mediaElement.addEventListener('progress', function() {
          if (!_this.mediaElement.endedOnce) {
            return _this.queueAnalyticEvent(12);
          }
        });
        _lastTime = 0;
        _isFullScreen = false;
        return this.mediaElement.addEventListener("playing", (function(e) {
          var interval;

          if (_this.mediaElement.listeningToPlaying) {
            return;
          }
          interval = setInterval(function() {
            var cueTime, currentTime, j, stopPoints;

            if (_this.mediaElement.paused || isNaN(_this.mediaElement.duration) || !_this.mediaElement.duration) {
              return;
            }
            if (_this.mediaElement.isFullScreen !== _isFullScreen) {
              if (!_isFullScreen) {
                _this.queueAnalyticEvent(14);
              } else {
                _this.queueAnalyticEvent(15);
              }
              _isFullScreen = _this.mediaElement.isFullScreen;
            }
            stopPoints = [0.25 * _this.mediaElement.duration, 0.5 * _this.mediaElement.duration, 0.75 * _this.mediaElement.duration, 0.98 * _this.mediaElement.duration];
            currentTime = _this.mediaElement.currentTime;
            if (!isNaN(currentTime) && currentTime > 0) {
              j = stopPoints.length - 1;
              while (j >= 0) {
                cueTime = stopPoints[j];
                if (cueTime > _lastTime && cueTime <= currentTime) {
                  if (j === 0) {
                    _this.queueAnalyticEvent(4);
                  } else if (j === 1) {
                    _this.queueAnalyticEvent(5);
                  } else if (j === 2) {
                    _this.queueAnalyticEvent(6);
                  } else if (j === 3) {
                    _this.queueAnalyticEvent(7);
                  }
                }
                --j;
              }
              return _lastTime = currentTime;
            }
          }, 50);
          return _this.mediaElement.listeningToPlaying = true;
        }), false);
      };

      return KalturaAnalytics;

    })();
    return function(mediaId, mediaElement, pluginSettings) {
      var ka;

      if (pluginSettings && pluginSettings.do_analytics) {
        ka = new KalturaAnalytics(mediaId, mediaElement, pluginSettings);
        ka.addListeners();
        return ka;
      }
    };
  });

}).call(this);
