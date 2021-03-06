(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'Backbone', 'compiled/util/UniqueDropdownCollection'], function(_, Backbone, UniqueDropdownCollection) {
    var NeverDropCollection, _ref;

    return NeverDropCollection = (function(_super) {
      __extends(NeverDropCollection, _super);

      function NeverDropCollection() {
        _ref = NeverDropCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      NeverDropCollection.prototype.initialize = function(records, options) {
        var _ref1, _ref2;

        if (options == null) {
          options = {};
        }
        _ref1 = options || {}, this.assignments = _ref1.assignments, this.ag_id = _ref1.ag_id;
        options.possibleValues = ((_ref2 = this.assignments) != null ? _ref2.map(function(a) {
          return a.id;
        }) : void 0) || [];
        options.propertyName = 'chosen_id';
        options.model = Backbone.Model;
        return NeverDropCollection.__super__.initialize.apply(this, arguments);
      };

      NeverDropCollection.prototype.updateAssignments = function(assignments) {
        return this.assignments = assignments;
      };

      NeverDropCollection.prototype.updateAssignmentGroupId = function(id) {
        return this.ag_id = id;
      };

      NeverDropCollection.prototype.toAssignments = function(include_id) {
        var models,
          _this = this;

        models = this.assignments.map(function(m) {
          var available;

          available = _this.availableValues.find(function(am) {
            return m.id === am.id;
          });
          if (available || (m.id === include_id)) {
            return m.toView();
          }
        });
        return _.compact(models);
      };

      NeverDropCollection.prototype.parse = function(resp, opts) {
        var assignment, coll, drop, idx, model_obj, _i, _len;

        coll = [];
        for (idx = _i = 0, _len = resp.length; _i < _len; idx = ++_i) {
          drop = resp[idx];
          if (assignment = this.findAssignment(drop)) {
            model_obj = {
              id: resp.id || idx,
              chosen: assignment.name(),
              chosen_id: assignment.get('id'),
              label_id: this.ag_id || 'new'
            };
            coll.push(model_obj);
          }
        }
        return coll;
      };

      NeverDropCollection.prototype.findAssignment = function(id) {
        return this.assignments.find(function(a) {
          return a.id === id;
        });
      };

      NeverDropCollection.prototype.findNextAvailable = function() {
        var next,
          _this = this;

        next = this.assignments.find(function(a) {
          return _this.availableValues.find(function(av) {
            return a.id === av.id;
          });
        });
        return this.availableValues.get(next.id);
      };

      return NeverDropCollection;

    })(UniqueDropdownCollection);
  });

}).call(this);
