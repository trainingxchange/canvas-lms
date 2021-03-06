(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'Backbone'], function($, Backbone) {
    var SyllabusCollection;

    return SyllabusCollection = (function(_super) {
      __extends(SyllabusCollection, _super);

      function SyllabusCollection(collections) {
        var collection, _i, _len,
          _this = this;

        SyllabusCollection.__super__.constructor.call(this);
        for (_i = 0, _len = collections.length; _i < _len; _i++) {
          collection = collections[_i];
          collection.on('add', function(model, collection, options) {
            return _this.add(model, options);
          });
          collection.on('remove', function(model, collection, options) {
            return _this.remove(model, options);
          });
          collection.on('reset', function(collection, options) {
            var find_collection_models, model, _j, _k, _len1, _len2, _ref, _ref1, _results;

            find_collection_models = function(memo, model) {
              if (model.get('collection') === collection) {
                return memo.push(model);
              } else {
                return memo;
              }
            };
            _ref = _this.reduce(find_collection_models, []);
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              model = _ref[_j];
              _this.remove(model);
            }
            _ref1 = collection.models;
            _results = [];
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              model = _ref1[_k];
              _results.push(_this.add(model));
            }
            return _results;
          });
        }
      }

      SyllabusCollection.prototype.fetch = function() {};

      SyllabusCollection.prototype.comparator = function(model1, model2) {
        var m1end_at, m1start_at, m1title, m2end_at, m2start_at, m2title;

        m1start_at = model1.get('start_at');
        m2start_at = model2.get('start_at');
        m1end_at = model1.get('end_at');
        m2end_at = model2.get('end_at');
        m1title = model1.get('title');
        m2title = model2.get('title');
        if (m1title) {
          m1title = m1title.toLowerCase();
        }
        if (m2title) {
          m2title = m2title.toLowerCase();
        }
        if (m1start_at !== m2start_at) {
          if (!m1start_at) {
            return 1;
          }
          if (!m2start_at) {
            return -1;
          }
          if (m1start_at < m2start_at) {
            return -1;
          } else {
            return 1;
          }
        } else if (m1end_at !== m2end_at) {
          if (!m1end_at) {
            return 1;
          }
          if (!m2end_at) {
            return -1;
          }
          if (m1end_at < m2end_at) {
            return 1;
          } else {
            return -1;
          }
        }
        if (m1title < m2title) {
          return -1;
        } else if (m1title > m2title) {
          return 1;
        }
        return 0;
      };

      return SyllabusCollection;

    })(Backbone.Collection);
  });

}).call(this);
