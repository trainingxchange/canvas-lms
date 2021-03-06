(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!assignment', 'Backbone', 'underscore', 'jquery', 'compiled/views/assignments/AssignmentGroupCreateDialog', 'jst/assignments/AssignmentGroupSelector'], function(I18n, Backbone, _, $, AssignmentGroupCreateDialog, template) {
    var AssignmentGroupSelector, _ref;

    return AssignmentGroupSelector = (function(_super) {
      var ASSIGNMENT_GROUP_ID;

      __extends(AssignmentGroupSelector, _super);

      function AssignmentGroupSelector() {
        this._validateAssignmentGroupId = __bind(this._validateAssignmentGroupId, this);
        this.validateBeforeSave = __bind(this.validateBeforeSave, this);
        this.toJSON = __bind(this.toJSON, this);
        this.showAssignmentGroupCreateDialog = __bind(this.showAssignmentGroupCreateDialog, this);        _ref = AssignmentGroupSelector.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      AssignmentGroupSelector.prototype.template = template;

      ASSIGNMENT_GROUP_ID = '#assignment_group_id';

      AssignmentGroupSelector.prototype.els = (function() {
        var els;

        els = {};
        els["" + ASSIGNMENT_GROUP_ID] = '$assignmentGroupId';
        return els;
      })();

      AssignmentGroupSelector.prototype.events = (function() {
        var events;

        events = {};
        events["change " + ASSIGNMENT_GROUP_ID] = 'showAssignmentGroupCreateDialog';
        return events;
      })();

      AssignmentGroupSelector.optionProperty('parentModel');

      AssignmentGroupSelector.optionProperty('assignmentGroups');

      AssignmentGroupSelector.optionProperty('nested');

      AssignmentGroupSelector.prototype.showAssignmentGroupCreateDialog = function() {
        var _this = this;

        if (this.$assignmentGroupId.val() === 'new') {
          this.dialog = new AssignmentGroupCreateDialog().render();
          this.dialog.on('assignmentGroup:created', function(group) {
            var $newGroup;

            $newGroup = $('<option>');
            $newGroup.val(group.id);
            $newGroup.text(group.name);
            _this.$assignmentGroupId.prepend($newGroup);
            return _this.$assignmentGroupId.val(group.id);
          });
          return this.dialog.on('assignmentGroup:canceled', function() {
            return _this.$assignmentGroupId.val(_this.assignmentGroups[0].id);
          });
        }
      };

      AssignmentGroupSelector.prototype.toJSON = function() {
        return {
          assignmentGroups: this.assignmentGroups,
          assignmentGroupId: this.parentModel.assignmentGroupId(),
          frozenAttributes: this.parentModel.frozenAttributes(),
          nested: this.nested
        };
      };

      AssignmentGroupSelector.prototype.fieldSelectors = {
        assignmentGroupSelector: '#assignment_group_id'
      };

      AssignmentGroupSelector.prototype.validateBeforeSave = function(data, errors) {
        errors = this._validateAssignmentGroupId(data, errors);
        return errors;
      };

      AssignmentGroupSelector.prototype._validateAssignmentGroupId = function(data, errors) {
        var agid;

        agid = this.nested ? data.assignment.assignmentGroupId() : data.assignment_group_id;
        if (agid === 'new') {
          errors["assignmentGroupSelector"] = [
            {
              message: I18n.t('assignment_group_must_have_group', 'Please select an assignment group for this assignment')
            }
          ];
        }
        return errors;
      };

      return AssignmentGroupSelector;

    })(Backbone.View);
  });

}).call(this);
