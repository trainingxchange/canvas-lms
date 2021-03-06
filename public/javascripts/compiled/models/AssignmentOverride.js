(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore', 'jquery', 'compiled/models/Section'], function(Backbone, _, $, Section) {
    var AssignmentOverride, _ref;

    return AssignmentOverride = (function(_super) {
      __extends(AssignmentOverride, _super);

      function AssignmentOverride() {
        this.representsDefaultDueDate = __bind(this.representsDefaultDueDate, this);
        this.getCourseSectionID = __bind(this.getCourseSectionID, this);
        this.isBlank = __bind(this.isBlank, this);        _ref = AssignmentOverride.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AssignmentOverride.prototype.defaults = {
        due_at_overridden: true,
        due_at: null,
        all_day: false,
        all_day_date: null,
        unlock_at_overridden: true,
        unlock_at: null,
        lock_at_overridden: true,
        lock_at: null
      };

      AssignmentOverride.prototype.initialize = function() {
        AssignmentOverride.__super__.initialize.apply(this, arguments);
        return this.on('change:course_section_id', this.clearID, this);
      };

      AssignmentOverride.prototype.clearID = function() {
        return this.set('id', void 0);
      };

      AssignmentOverride.prototype.parse = function(_arg) {
        var assignment_override;

        assignment_override = _arg.assignment_override;
        return assignment_override;
      };

      AssignmentOverride.prototype.toJSON = function() {
        return {
          assignment_override: AssignmentOverride.__super__.toJSON.apply(this, arguments)
        };
      };

      AssignmentOverride.defaultDueDate = function(options) {
        var opts;

        if (options == null) {
          options = {};
        }
        opts = _.extend(options, {
          course_section_id: Section.defaultDueDateSectionID
        });
        return new AssignmentOverride(opts);
      };

      AssignmentOverride.prototype.isBlank = function() {
        return this.get('due_at') == null;
      };

      AssignmentOverride.prototype.getCourseSectionID = function() {
        return this.get('course_section_id');
      };

      AssignmentOverride.prototype.representsDefaultDueDate = function() {
        return this.getCourseSectionID() === Section.defaultDueDateSectionID;
      };

      return AssignmentOverride;

    })(Backbone.Model);
  });

}).call(this);
