(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'Backbone'], function(_arg, _arg1) {
    var CollaboratorCollection, Collection, Model, extend, map, _ref;

    extend = _arg.extend, map = _arg.map;
    Collection = _arg1.Collection, Model = _arg1.Model;
    return CollaboratorCollection = (function(_super) {
      __extends(CollaboratorCollection, _super);

      function CollaboratorCollection() {
        _ref = CollaboratorCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CollaboratorCollection.prototype.model = Model;

      CollaboratorCollection.prototype.comparator = function(model) {
        return model.get('sortable_name') || model.get('name');
      };

      CollaboratorCollection.prototype.parse = function(response) {
        return map(response, function(model) {
          return extend(model, {
            id: model.collaborator_id
          });
        });
      };

      return CollaboratorCollection;

    })(Collection);
  });

}).call(this);
