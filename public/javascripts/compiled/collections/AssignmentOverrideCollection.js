(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore', 'jquery', 'compiled/models/AssignmentOverride', 'compiled/models/Section'], function(Backbone, _, $, AssignmentOverride, Section) {
    var AssignmentOverrideCollection, _ref;

    return AssignmentOverrideCollection = (function(_super) {
      __extends(AssignmentOverrideCollection, _super);

      function AssignmentOverrideCollection() {
        this.isSimple = __bind(this.isSimple, this);
        this.toJSON = __bind(this.toJSON, this);
        this.blank = __bind(this.blank, this);
        this.containsDefaultDueDate = __bind(this.containsDefaultDueDate, this);
        this.getDefaultDueDate = __bind(this.getDefaultDueDate, this);
        this.courseSectionIDs = __bind(this.courseSectionIDs, this);        _ref = AssignmentOverrideCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AssignmentOverrideCollection.prototype.model = AssignmentOverride;

      AssignmentOverrideCollection.prototype.courseSectionIDs = function() {
        return this.pluck('course_section_id');
      };

      AssignmentOverrideCollection.prototype.comparator = function(override) {
        return override.id;
      };

      AssignmentOverrideCollection.prototype.getDefaultDueDate = function() {
        return this.detect(function(override) {
          return override.getCourseSectionID() === Section.defaultDueDateSectionID;
        });
      };

      AssignmentOverrideCollection.prototype.containsDefaultDueDate = function() {
        return !!this.getDefaultDueDate();
      };

      AssignmentOverrideCollection.prototype.blank = function() {
        return this.select(function(override) {
          return override.isBlank();
        });
      };

      AssignmentOverrideCollection.prototype.toJSON = function() {
        var json;

        json = this.reject(function(override) {
          return override.representsDefaultDueDate();
        });
        return _.map(json, function(override) {
          return override.toJSON().assignment_override;
        });
      };

      AssignmentOverrideCollection.prototype.isSimple = function() {
        return _.difference(this.courseSectionIDs(), [Section.defaultDueDateSectionID]).length === 0;
      };

      return AssignmentOverrideCollection;

    })(Backbone.Collection);
  });

}).call(this);
