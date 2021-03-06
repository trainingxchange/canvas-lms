(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'compiled/models/Section'], function(_arg, Section) {
    var Collection, SectionCollection, _ref;

    Collection = _arg.Collection;
    return SectionCollection = (function(_super) {
      __extends(SectionCollection, _super);

      function SectionCollection() {
        this.ids = __bind(this.ids, this);        _ref = SectionCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      SectionCollection.prototype.model = Section;

      SectionCollection.prototype.ids = function() {
        return this.pluck('id');
      };

      SectionCollection.prototype.comparator = function(section) {
        return section.id;
      };

      return SectionCollection;

    })(Collection);
  });

}).call(this);
