(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'compiled/views/CollectionView', 'compiled/views/assignments/NeverDropView', 'jst/assignments/NeverDropCollection'], function(_, CollectionView, NeverDropView, template) {
    var NeverDropCollectionView, _ref;

    return NeverDropCollectionView = (function(_super) {
      __extends(NeverDropCollectionView, _super);

      function NeverDropCollectionView() {
        this.triggerRender = __bind(this.triggerRender, this);        _ref = NeverDropCollectionView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      NeverDropCollectionView.prototype.itemView = NeverDropView;

      NeverDropCollectionView.prototype.template = template;

      NeverDropCollectionView.prototype.events = {
        'click .add_never_drop': 'addNeverDrop'
      };

      NeverDropCollectionView.prototype.initialize = function() {
        this.on('should-render', _.debounce(this.render, 100));
        return NeverDropCollectionView.__super__.initialize.apply(this, arguments);
      };

      NeverDropCollectionView.prototype.attachCollection = function(options) {
        this.collection.availableValues.on('add', this.triggerRender);
        this.collection.takenValues.on('add', this.triggerRender);
        this.collection.on('add', this.triggerRender);
        this.collection.on('remove', this.triggerRender);
        return this.collection.on('reset', this.triggerRender);
      };

      NeverDropCollectionView.prototype.toJSON = function() {
        var data;

        return data = {
          hasAssignments: this.collection.availableValues.length > 0,
          hasNeverDrops: this.collection.takenValues.length > 0
        };
      };

      NeverDropCollectionView.prototype.triggerRender = function(model, collection, options) {
        return this.trigger('should-render');
      };

      NeverDropCollectionView.prototype.addNeverDrop = function(e) {
        var model;

        e.preventDefault();
        model = {
          label_id: this.collection.ag_id,
          focus: true
        };
        return this.collection.add(model);
      };

      return NeverDropCollectionView;

    })(CollectionView);
  });

}).call(this);
