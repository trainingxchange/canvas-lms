(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore', 'jst/assignments/DueDateOverride', 'compiled/models/AssignmentOverride', 'i18n!overrides'], function(Backbone, _, template, AssignmentOverride, I18n) {
    var DueDateOverrideView, _ref;

    return DueDateOverrideView = (function(_super) {
      __extends(DueDateOverrideView, _super);

      function DueDateOverrideView() {
        this.validateBeforeSave = __bind(this.validateBeforeSave, this);
        this.hideAddDueDateButton = __bind(this.hideAddDueDateButton, this);
        this.showAddDueDateButton = __bind(this.showAddDueDateButton, this);
        this.getAllDates = __bind(this.getAllDates, this);
        this.getOverrides = __bind(this.getOverrides, this);
        this.sectionsWithoutOverrides = __bind(this.sectionsWithoutOverrides, this);
        this.containsSectionsWithoutOverrides = __bind(this.containsSectionsWithoutOverrides, this);
        this.getDefaultDueDate = __bind(this.getDefaultDueDate, this);
        this.updateOverrides = __bind(this.updateOverrides, this);
        this.toJSON = __bind(this.toJSON, this);
        this.shouldHideDueDate = __bind(this.shouldHideDueDate, this);        _ref = DueDateOverrideView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DueDateOverrideView.prototype.template = template;

      DueDateOverrideView.prototype.events = {
        'click #add_due_date': 'addDueDate'
      };

      DueDateOverrideView.prototype.className = 'due-date-container';

      DueDateOverrideView.prototype.initialize = function() {
        DueDateOverrideView.__super__.initialize.apply(this, arguments);
        return this.model.overrides.on('remove', this.showAddDueDateButton);
      };

      DueDateOverrideView.prototype.addDueDate = function(event) {
        var assignmentOverride, availableSections, _ref1;

        event.preventDefault();
        availableSections = this.model.availableSections();
        assignmentOverride = this.model.containsSectionsWithoutOverrides() ? AssignmentOverride.defaultDueDate() : new AssignmentOverride({
          course_section_id: (_ref1 = availableSections[0]) != null ? _ref1.id : void 0
        });
        this.model.addOverride(assignmentOverride);
        if (this.shouldHideDueDate()) {
          return this.hideAddDueDateButton();
        }
      };

      DueDateOverrideView.prototype.shouldHideDueDate = function() {
        return this.model.availableSections().length <= 1;
      };

      DueDateOverrideView.prototype.toJSON = function() {
        var json;

        json = DueDateOverrideView.__super__.toJSON.apply(this, arguments);
        json.shouldHideDueDate = this.shouldHideDueDate();
        return json;
      };

      DueDateOverrideView.prototype.updateOverrides = function() {
        return this.options.views['due-date-overrides'].updateOverrides();
      };

      DueDateOverrideView.prototype.getDefaultDueDate = function() {
        return this.model.getDefaultDueDate();
      };

      DueDateOverrideView.prototype.containsSectionsWithoutOverrides = function() {
        return this.model.containsSectionsWithoutOverrides();
      };

      DueDateOverrideView.prototype.sectionsWithoutOverrides = function() {
        return this.model.sectionsWithoutOverrides();
      };

      DueDateOverrideView.prototype.getOverrides = function() {
        return this.model.overrides.toJSON();
      };

      DueDateOverrideView.prototype.getAllDates = function(data) {
        data || (data = {});
        return this.getOverrides().concat(data);
      };

      DueDateOverrideView.prototype.showAddDueDateButton = function() {
        return this.$el.find('#add_due_date').show();
      };

      DueDateOverrideView.prototype.hideAddDueDateButton = function() {
        return this.$el.find('#add_due_date').hide();
      };

      DueDateOverrideView.prototype.validateBeforeSave = function(data, errors) {
        this.options.views['due-date-overrides'].validateBeforeSave(data, errors);
        return errors;
      };

      return DueDateOverrideView;

    })(Backbone.View);
  });

}).call(this);
