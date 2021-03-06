(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'Backbone', 'compiled/views/content_migrations/subviews/DaySubstitutionView', 'compiled/models/DaySubstitution', 'jst/content_migrations/subviews/DateShift'], function($, Backbone, DaySubView, DaySubModel, template) {
    var DateShiftView, _ref;

    return DateShiftView = (function(_super) {
      __extends(DateShiftView, _super);

      function DateShiftView() {
        this.updateNewDates = __bind(this.updateNewDates, this);
        this.createDaySubView = __bind(this.createDaySubView, this);
        this.toggleContent = __bind(this.toggleContent, this);        _ref = DateShiftView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      DateShiftView.prototype.template = template;

      DateShiftView.child('daySubstitution', '#daySubstitution');

      DateShiftView.optionProperty('oldStartDate');

      DateShiftView.optionProperty('oldEndDate');

      DateShiftView.optionProperty('addHiddenInput');

      DateShiftView.prototype.els = {
        ".dateShiftContent": "$dateShiftContent",
        "#oldStartDate": "$oldStartDate",
        "#oldEndDate": "$oldEndDate",
        "#newStartDate": "$newStartDate",
        "#newEndDate": "$newEndDate",
        "#daySubstitution": "$daySubstitution"
      };

      DateShiftView.prototype.events = {
        'click #dateShiftCheckbox': 'toggleContent',
        'click #addDaySubstitution': 'createDaySubView'
      };

      DateShiftView.prototype.afterRender = function() {
        var _this = this;

        this.$el.find('input[type=text]').datetime_field({
          addHiddenInput: this.addHiddenInput
        });
        this.$oldStartDate.on('change', function(event) {
          return _this.model.setDateShiftOptions({
            property: 'old_start_date',
            value: event.target.value
          });
        });
        this.$oldEndDate.on('change', function(event) {
          return _this.model.setDateShiftOptions({
            property: 'old_end_date',
            value: event.target.value
          });
        });
        this.$newStartDate.on('change', function(event) {
          return _this.model.setDateShiftOptions({
            property: 'new_start_date',
            value: event.target.value
          });
        });
        this.$newEndDate.on('change', function(event) {
          return _this.model.setDateShiftOptions({
            property: 'new_end_date',
            value: event.target.value
          });
        });
        if (this.oldStartDate) {
          this.$newStartDate.val(this.oldStartDate).trigger('change');
        }
        if (this.oldEndDate) {
          this.$newEndDate.val(this.oldEndDate).trigger('change');
        }
        return this.collection.on('remove', function() {
          return _this.$el.find('#addDaySubstitution').focus();
        });
      };

      DateShiftView.prototype.toggleContent = function(event) {
        var dateShift;

        dateShift = $(event.target).is(':checked');
        this.model.setDateShiftOptions({
          property: 'shift_dates',
          value: dateShift
        });
        this.model.daySubCollection = dateShift ? this.collection : null;
        return this.$dateShiftContent.toggle();
      };

      DateShiftView.prototype.createDaySubView = function(event) {
        var $lastDaySubView, _ref1;

        event.preventDefault();
        this.collection.add(new DaySubModel);
        $lastDaySubView = (_ref1 = this.collection.last()) != null ? _ref1.view.$el : void 0;
        return $lastDaySubView.find('select').first().focus();
      };

      DateShiftView.prototype.updateNewDates = function(course) {
        this.$oldStartDate.val(course.start_at).trigger('change');
        return this.$oldEndDate.val(course.end_at).trigger('change');
      };

      return DateShiftView;

    })(Backbone.View);
  });

}).call(this);
