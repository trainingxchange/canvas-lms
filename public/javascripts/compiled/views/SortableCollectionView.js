(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jquery', 'underscore', 'compiled/views/CollectionView'], function(Backbone, $, _, CollectionView) {
    var SortableCollectionView, _ref;

    return SortableCollectionView = (function(_super) {
      __extends(SortableCollectionView, _super);

      function SortableCollectionView() {
        this._updateSort = __bind(this._updateSort, this);        _ref = SortableCollectionView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      SortableCollectionView.optionProperty('sortURL');

      SortableCollectionView.prototype.sortOptions = {
        tolerance: 'pointer',
        opacity: 0.9,
        zIndex: 100,
        placeholder: 'sortable-dropzone',
        forcePlaceholderSize: true
      };

      SortableCollectionView.prototype.render = function(sort) {
        if (sort == null) {
          sort = true;
        }
        SortableCollectionView.__super__.render.apply(this, arguments);
        if (sort) {
          this._initSort();
        }
        return this;
      };

      SortableCollectionView.prototype._initSort = function() {
        this.$list.sortable(_.extend({}, this.sortOptions, {
          scope: this.cid
        }));
        this.$list.on('sortupdate', this._updateSort);
        return this.$list.disableSelection();
      };

      SortableCollectionView.prototype._getItemId = function(item) {
        return item.children(":first").data('id');
      };

      SortableCollectionView.prototype._updateSort = function(e, ui) {
        var $s, id, index, model_id, positions, s, _i, _len, _ref1;

        e.stopPropagation();
        positions = {};
        id = this._getItemId(ui.item);
        positions[id] = ui.item.index() + 1;
        _ref1 = ui.item.siblings();
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          s = _ref1[_i];
          $s = $(s);
          model_id = this._getItemId($s);
          index = $s.prevAll().length;
          positions[model_id] = index + 1;
        }
        return this._updatePositions(positions);
      };

      SortableCollectionView.prototype._updatePositions = function(positions) {
        this.collection.each(function(model, index) {
          var new_position;

          new_position = positions[model.id];
          return model.set('position', new_position);
        });
        this.collection.sort();
        return this._sendPositions(this._orderPositions(positions));
      };

      SortableCollectionView.prototype._orderPositions = function(positions) {
        var id, model, order, output, sortable, _i, _len;

        sortable = [];
        for (id in positions) {
          order = positions[id];
          sortable.push([id, order]);
        }
        sortable.sort(function(a, b) {
          return a[1] - b[1];
        });
        output = [];
        for (_i = 0, _len = sortable.length; _i < _len; _i++) {
          model = sortable[_i];
          output.push(model[0]);
        }
        return output;
      };

      SortableCollectionView.prototype._sendPositions = function(ids) {
        return $.post(this.sortURL, {
          order: ids.join(",")
        });
      };

      return SortableCollectionView;

    })(CollectionView);
  });

}).call(this);
