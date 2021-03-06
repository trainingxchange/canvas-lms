(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore', 'compiled/backbone-ext/DefaultUrlMixin', 'compiled/collections/AssignmentCollection'], function(Backbone, _, DefaultUrlMixin, AssignmentCollection) {
    var AssignmentGroup, _ref;

    return AssignmentGroup = (function(_super) {
      __extends(AssignmentGroup, _super);

      function AssignmentGroup() {
        _ref = AssignmentGroup.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AssignmentGroup.mixin(DefaultUrlMixin);

      AssignmentGroup.prototype.resourceName = 'assignment_groups';

      AssignmentGroup.prototype.urlRoot = function() {
        return this._defaultUrl();
      };

      AssignmentGroup.prototype.initialize = function() {
        var assignments;

        if ((assignments = this.get('assignments')) != null) {
          return this.set('assignments', new AssignmentCollection(assignments));
        }
      };

      AssignmentGroup.prototype.name = function(newName) {
        if (!(arguments.length > 0)) {
          return this.get('name');
        }
        return this.set('name', newName);
      };

      AssignmentGroup.prototype.position = function(newPosition) {
        if (!(arguments.length > 0)) {
          return this.get('position') || 0;
        }
        return this.set('position', newPosition);
      };

      AssignmentGroup.prototype.groupWeight = function(newWeight) {
        if (!(arguments.length > 0)) {
          return this.get('group_weight') || 0;
        }
        return this.set('group_weight', newWeight);
      };

      AssignmentGroup.prototype.rules = function(newRules) {
        if (!(arguments.length > 0)) {
          return this.get('rules');
        }
        return this.set('rules', newRules);
      };

      AssignmentGroup.prototype.removeNeverDrops = function() {
        var rules;

        rules = this.rules();
        if (rules.never_drop) {
          return delete rules.never_drop;
        }
      };

      AssignmentGroup.prototype.hasRules = function() {
        return this.countRules() > 0;
      };

      AssignmentGroup.prototype.countRules = function() {
        var aids, count, k, rules, v;

        rules = this.rules() || {};
        aids = this.assignmentIds();
        count = 0;
        for (k in rules) {
          v = rules[k];
          if (k === "never_drop") {
            count += _.intersection(aids, v).length;
          } else {
            count++;
          }
        }
        return count;
      };

      AssignmentGroup.prototype.assignmentIds = function() {
        var assignments;

        assignments = this.get('assignments');
        if (assignments == null) {
          return [];
        }
        return assignments.pluck('id');
      };

      AssignmentGroup.prototype.hasFrozenAssignments = function() {
        return this.get('assignments').any(function(m) {
          return m.get('frozen');
        });
      };

      return AssignmentGroup;

    })(Backbone.Model);
  });

}).call(this);
