(function() {
  define(['../register', 'ember', '../../shared/xhr/parse_link_header', 'underscore', '../templates/components/ic-lazy-list'], function(register, Ember, parseLinkHeader, _arg) {
    var $window, IcLazyList, throttle;

    throttle = _arg.throttle;
    $window = Ember.$(window);
    IcLazyList = Ember.Component.extend({
      tagName: 'ic-lazy-list',
      registerWithConstructor: (function() {
        if (this.get('meta.next')) {
          return this.constructor.register(this);
        }
      }).observes('meta.next'),
      unregisterFromConstructor: (function() {
        if (!this.get('meta.next')) {
          return this.constructor.unregister(this);
        }
      }).observes('meta.next'),
      setData: (function() {
        this.set('data', Ember.ArrayProxy.create({
          content: []
        }));
        return this.set('meta', Ember.Object.create());
      }).on('init'),
      loadRecords: (function(href) {
        this.set('isLoading', true);
        return Ember.$.getJSON(href || this.get('href'), this.ajaxCallback.bind(this));
      }).on('didInsertElement'),
      loadNextRecords: function() {
        return this.loadRecords(this.get('meta.next'));
      },
      ajaxCallback: function(res, status, xhr) {
        this.get('data').pushObjects(this.normalize(res, status, xhr));
        this.set('meta', this.extractMeta(res, status, xhr));
        return this.set('isLoading', false);
      },
      normalize: function(res) {
        var key;

        key = this.get('data-key');
        if (key) {
          return res[key];
        } else {
          return res;
        }
      },
      extractMeta: function(res, status, xhr) {
        return parseLinkHeader(xhr);
      }
    });
    IcLazyList.reopenClass({
      views: [],
      register: function(view) {
        this.views.addObject(view);
        if (this.views.length === 1) {
          $window.on('scroll.ic-lazy-list', throttle(this.checkViews.bind(this), 100));
        }
        return Ember.run.scheduleOnce('afterRender', this, 'checkViews');
      },
      unregister: function(view) {
        this.views.removeObject(view);
        if (this.views.length === 0) {
          return $window.off('scroll.ic-lazy-list');
        }
      },
      checkViews: function() {
        var bottom, view, _i, _len, _ref;

        _ref = this.views;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          if (view.get('isLoading')) {
            continue;
          }
          bottom = view.get('element').getBoundingClientRect().bottom;
          if (bottom <= window.innerHeight) {
            view.loadNextRecords();
          }
        }
        return null;
      }
    });
    return register('component', 'ic-lazy-list', IcLazyList);
  });

}).call(this);
